import { Link } from "react-router";
import { Button } from "../ui/button";
import { useState } from "react";
import { useInitPaymentMutation } from "@/redux/features/payment/payment.api";
import { toast } from "sonner";

interface BookingCardProps {
  booking: any;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const [loading, setLoading] = useState(false);

  // RTK Query mutation
  const [initPayment] = useInitPaymentMutation();

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await initPayment(booking._id).unwrap();
      console.log(res.paymentUrl);

      if (res.paymentUrl) {
        window.location.href = res.paymentUrl;
      } else {
        toast.error("Failed to initiate payment ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while initiating payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
      {/* Tour Info */}
      <div>
        <h2 className="text-lg font-semibold dark:text-gray-100 text-gray-800">
          {booking.tour?.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Cost per person:{" "}
          <span className="font-medium">${booking.tour?.costFrom}</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Guests: <span className="font-medium">{booking.guestCount}</span>
        </p>
      </div>

      {/* Payment Info */}
      <div className="mt-4 border-t pt-3">
        <p className="text-sm">
          Payment:{" "}
          <span
            className={`font-semibold ${
              booking.payment?.status === "PAID"
                ? "text-green-600"
                : booking.payment?.status === "UNPAID"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {booking.payment?.status}
          </span>{" "}
          (${booking.payment?.amount})
        </p>
        <p className="text-sm mt-1">
          Transaction:{" "}
          <span className="text-gray-600 text-xs break-all">
            {booking.payment?.transactionId || "N/A"}
          </span>
        </p>
      </div>

      {/* Booking Status */}
      <div className="mt-3">
        <p
          className={`text-sm font-semibold ${
            booking.status === "COMPLETE"
              ? "text-green-700"
              : booking.status === "PENDING"
              ? "text-yellow-600"
              : "text-gray-600"
          }`}
        >
          Status: {booking.status}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Booked on {new Date(booking.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 justify-end flex gap-2">
        {booking.payment?.status === "UNPAID" ? (
          <Button
            className="rounded-none cursor-pointer bg-yellow-600 hover:bg-yellow-700"
            size="sm"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Pay Now"}
          </Button>
        ) : (
          <Link to={`/user/bookings/${booking._id}`}>
            <Button className="w-full rounded-none cursor-pointer" size="sm">
              View Details
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
