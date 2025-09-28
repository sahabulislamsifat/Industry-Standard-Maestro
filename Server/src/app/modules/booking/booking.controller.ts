import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/createAsync";
import { bookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";
import { BOOKING_STATUS } from "./booking.interface";
import { UserRole } from "../user/user.interface";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload;
  const booking = await bookingService.createBooking(
    req.body,
    decodeToken.userId
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Booking created successfully",
    data: booking,
  });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload;
  const bookings = await bookingService.getUserBookings(decodeToken.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload;
  let booking;

  if (
    decodeToken.role === UserRole.ADMIN ||
    decodeToken.role === UserRole.SUPER_ADMIN
  ) {
    // Admin → view any booking by ID
    booking = await bookingService.getBookingByIdForAdmin(req.params.bookingId);
  } else {
    // User → view only their own bookings
    booking = await bookingService.getBookingById(
      req.params.bookingId,
      decodeToken.userId
    );
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking retrieved successfully",
    data: booking,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await bookingService.getAllBookings();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body as { status: BOOKING_STATUS };
  const { bookingId } = req.params;

  const updated = await bookingService.updateBookingStatus(bookingId, status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking status updated successfully",
    data: updated,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getUserBookings,
  updateBookingStatus,
};
