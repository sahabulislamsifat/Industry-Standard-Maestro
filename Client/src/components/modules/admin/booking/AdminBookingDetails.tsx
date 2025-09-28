import {
  useGetBookingByIdQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/features/booking/booking.api";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const AdminBookingDetails = () => {
  const { id } = useParams<{ id: any }>();
  const { data: booking, isLoading, isError } = useGetBookingByIdQuery(id);
  const [updateStatus, { isLoading: updating }] =
    useUpdateBookingStatusMutation();
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (booking?.status) {
      setNewStatus(booking.status);
    }
  }, [booking?.status]);

  const handleStatusUpdate = async () => {
    try {
      await updateStatus({ bookingId: id, status: newStatus }).unwrap();
      toast.success("Booking status updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking status");
    }
  };

  if (isLoading) return <p>Loading booking details...</p>;
  if (isError || !booking) return <p>Failed to load booking details.</p>;

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Booking Details</h1>

      <div className="border p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">{booking.tour?.title}</h2>
        <p>
          User: {booking.user?.name} ({booking.user?.email})
        </p>
        <p>Guests: {booking.guestCount}</p>

        {/* Status Update */}
        <div className="mt-4">
          <label className="font-medium">Booking Status:</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="ml-2 border p-1"
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETE">Complete</option>
            <option value="FAILED">Failed</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={updating}
            className="ml-3 px-4 py-1 bg-orange-500 text-white hover:bg-orange-600"
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </div>

        <div className="mt-4 border-t pt-3">
          <p>Payment Status: {booking.payment?.status}</p>
          <p>Amount: ${booking.payment?.amount}</p>
          <p>Transaction ID: {booking.payment?.transactionId || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetails;
