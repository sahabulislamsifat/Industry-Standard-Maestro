import { useGetBookingByIdQuery } from "@/redux/features/booking/booking.api";
import { useParams } from "react-router";

const BookingDetails = () => {
  const { id } = useParams<{ id: any }>();
  const { data: booking, isLoading, isError } = useGetBookingByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading booking details...
        </p>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center shadow">
          <h2 className="text-lg font-semibold text-red-600">
            Something Went Wrong ❌
          </h2>
          <p className="text-gray-600 mt-2">
            We couldn’t load the booking details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Booking Details</h1>

      <div className="border p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">{booking.tour?.title}</h2>
        <p className="text-sm text-gray-500">
          Location: {booking.tour?.location}
        </p>
        <p className="text-sm text-gray-500">
          Duration: {booking.tour?.startDate} - {booking.tour?.endDate}
        </p>
        <p className="text-sm text-gray-500">Guests: {booking.guestCount}</p>

        <div className="mt-4 border-t pt-3">
          <p>
            Payment Status:{" "}
            <span className="font-medium">{booking.payment?.status}</span>
          </p>
          <p>Amount: ${booking.payment?.amount}</p>
          <p>Transaction ID: {booking.payment?.transactionId}</p>
        </div>

        <div className="mt-4">
          <p>
            Status: <span className="font-semibold">{booking.status}</span>
          </p>
          <p>Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
