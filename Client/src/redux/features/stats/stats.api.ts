import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // User stats
    getUserStats: builder.query<{ totalUsers: number }, void>({
      query: () => ({ url: "/stats/user", method: "GET" }),
      transformResponse: (response: any) => response.data, // ✅ unwrap 'data'
      providesTags: ["USER"],
    }),

    // Tour stats
    getTourStats: builder.query<
      { totalTours: number; types: { name: string; value: number }[] },
      void
    >({
      query: () => ({ url: "/stats/tour", method: "GET" }),
      transformResponse: (response: any) => response.data, // unwrap
      providesTags: ["TOUR"],
    }),

    // Booking stats
    getBookingStats: builder.query<{ month: string; bookings: number }[], void>(
      {
        query: () => ({ url: "/stats/booking", method: "GET" }),
        transformResponse: (response: any) => response.data, // unwrap
        providesTags: ["BOOKING"],
      }
    ),

    // Payment stats
    getPaymentStats: builder.query<{ month: string; revenue: number }[], void>({
      query: () => ({ url: "/stats/payment", method: "GET" }),
      transformResponse: (response: any) => response.data, // unwrap
      providesTags: ["BOOKING"],
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetTourStatsQuery,
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
} = statsApi;
