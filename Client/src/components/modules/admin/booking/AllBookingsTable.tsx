import { useGetAllBookingsQuery } from "@/redux/features/booking/booking.api";
import { Link } from "react-router";

const AllBookingsTable = () => {
  const {
    data: bookings,
    isLoading,
    isError,
  } = useGetAllBookingsQuery(undefined);

  if (isLoading) return <p className="p-6">Loading bookings...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to load bookings.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200 dark:bg-gray-400 text-black">
            <tr>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Tour</th>
              <th className="border px-4 py-2">Guests</th>
              <th className="border px-4 py-2">Payment</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking: any) => (
              <tr key={booking._id}>
                <td className="border px-4 py-2">{booking.user?.name}</td>
                <td className="border px-4 py-2">{booking.tour?.title}</td>
                <td className="border px-4 py-2">{booking.guestCount}</td>
                <td className="border px-4 py-2">{booking.payment?.status}</td>
                <td className="border px-4 py-2">{booking.status}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/admin/bookings/${booking._id}`}
                    className="text-orange-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookingsTable;
