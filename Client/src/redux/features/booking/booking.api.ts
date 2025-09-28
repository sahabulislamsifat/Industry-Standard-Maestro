import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create booking
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["BOOKING"],
    }),

    // get bookings for logged-in user (my bookings)
    getMyBookings: builder.query({
      query: () => ({
        url: "/booking/my-bookings",
        method: "GET",
      }),
      providesTags: ["BOOKING"],
      transformResponse: (response) => response.data,
    }),

    // get single booking by id
    getBookingById: builder.query({
      query: (bookingId: string) => ({
        url: `/booking/${bookingId}`,
        method: "GET",
      }),
      providesTags: ["BOOKING"],
      transformResponse: (response) => response.data,
    }),

    // get all bookings (for admin panel)
    getAllBookings: builder.query({
      query: () => ({
        url: "/booking",
        method: "GET",
      }),
      providesTags: ["BOOKING"],
      transformResponse: (response) => response.data,
    }),

    // update booking status (admin / super admin)
    updateBookingStatus: builder.mutation({
      query: ({ bookingId, status }) => ({
        url: `/booking/${bookingId}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["BOOKING"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetBookingByIdQuery,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} = bookingApi;
