import BookingCard from "@/components/reusable/BookingCard";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetMyBookingsQuery } from "@/redux/features/booking/booking.api";

const MyBookings = () => {
  const { data: currentUser, isLoading: userLoading } = useUserInfoQuery();
  const userId = currentUser?.data?._id;

  const {
    data: bookings,
    isLoading: bookingsLoading,
    isError: bookingsError,
  } = useGetMyBookingsQuery(undefined, { skip: !userId });

  if (userLoading || bookingsLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading your bookings...
        </p>
      </div>
    );
  }

  if (bookingsError) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center shadow">
          <h2 className="text-lg font-semibold text-red-600">
            Something Went Wrong ❌
          </h2>
          <p className="text-gray-600 mt-2">
            We couldn’t load your bookings. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="p-6 max-w-md text-center">
          <h2 className="text-lg font-semibold text-yellow-500 dark:text-yellow-400">
            No Bookings Found ⚠️
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            You have not made any bookings yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking: any) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
