/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelper/AppError";
import { UserModel } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import httpStatus from "http-status-codes";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { getTransactionId } from "../../utils/getTransactionId";

//* Duplicate DB Collections / Replica
//* Replica DB [Create Booking -> Create Payment -> Update Booking -> Error Happen!] -> REAL DB

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId();

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const user = await UserModel.findById(userId);

    if (!user?.phone || !user?.password) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Please update your profile to book a tour."
      );
    }

    const tour = await Tour.findById(payload.tour).select("costFrom");

    if (!tour?.costFrom) {
      throw new AppError(httpStatus.BAD_REQUEST, "No Tour cost found!");
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const amount = Number(tour.costFrom) * Number(payload.guestCount!);

    const booking = await Booking.create(
      [
        {
          user: userId,
          status: BOOKING_STATUS.PENDING,
          ...payload,
        },
      ],
      { session }
    );

    const payment = await Payment.create(
      [
        {
          booking: booking[0].id,
          status: PAYMENT_STATUS.UNPAID,
          transactionId: transactionId,
          amount: amount,
        },
      ],
      { session }
    );

    const updateBooking = await Booking.findByIdAndUpdate(
      booking[0].id,
      { payment: payment[0].id },
      { new: true, runValidators: true, session }
    )
      .populate("user", "name email phones address")
      .populate("tour", "title costFrom")
      .populate("payment");

    const userAddress = (updateBooking?.user as any).address;
    const userEmail = (updateBooking?.user as any).email;
    const userPhoneNumber = (updateBooking?.user as any).phone;
    const userName = (updateBooking?.user as any).name;

    const sslPayload: ISSLCommerz = {
      address: userAddress,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      name: userName,
      amount: amount,
      transactionId: transactionId,
    };

    const sslPayment = await SSLService.sslPaymentInit(sslPayload);

    await session.commitTransaction(); // Transaction
    session.endSession();

    return {
      paymentUrl: sslPayment.GatewayPageURL,
      booking: updateBooking,
    };
  } catch (error) {
    await session.abortTransaction(); // RoleBack
    session.endSession();
    throw error;
  }
};

// Frontend(localhost:5173) - User - Tour - Booking (Pending) - Payment(Unpaid) -> SSLCommerz Page -> Payment Complete -> Backend(localhost:5000/api/v1/payment/success) -> Update Payment(PAID) & Booking(CONFIRM) -> redirect to frontend -> Frontend(localhost:5173/payment/success)

// Frontend(localhost:5173) - User - Tour - Booking (Pending) - Payment(Unpaid) -> SSLCommerz Page -> Payment Fail / Cancel -> Backend(localhost:5000) -> Update Payment(FAIL / CANCEL) & Booking(FAIL / CANCEL) -> redirect to frontend -> Frontend(localhost:5173/payment/cancel or localhost:5173/payment/fail)

//  Get user-specific bookings bu userId
const getUserBookings = async (userId: string) => {
  return await Booking.find({ user: userId })
    .populate("tour", "title costFrom")
    .populate("payment", "status amount transactionId")
    .sort({ createdAt: -1 });
};

// Get booking by Id
const getBookingById = async (bookingId: string, userId: string) => {
  const booking = await Booking.findOne({ _id: bookingId, user: userId })
    .populate("tour")
    .populate("payment")
    .populate("user", "name email phone");
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
  }
  return booking;
};

// booking for admin (without user filter)
const getBookingByIdForAdmin = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId)
    .populate("tour")
    .populate("payment")
    .populate("user", "name email phone");

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
  }
  return booking;
};

// Update booking status (Admin / Super Admin can update)
const updateBookingStatus = async (
  bookingId: string,
  status: BOOKING_STATUS
) => {
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true, runValidators: true }
  )
    .populate("tour")
    .populate("payment")
    .populate("user", "name email phone");

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
  }
  return booking;
};

//  Get all bookings (Admin only)
const getAllBookings = async () => {
  return await Booking.find()
    .populate("user", "name email phone")
    .populate("tour", "title costFrom")
    .populate("payment")
    .sort({ createdAt: -1 });
};

export const bookingService = {
  createBooking,
  getUserBookings,
  getBookingById,
  getBookingByIdForAdmin,
  updateBookingStatus,
  getAllBookings,
};
