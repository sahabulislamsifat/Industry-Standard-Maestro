import { baseApi } from "@/redux/baseApi";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // User stats
    getUserStats: builder.query<{ totalUsers: number }, void>({
      query: () => ({ url: "/stats/user", method: "GET" }),
      transformResponse: (response: any) => response?.data ?? {},
      providesTags: ["USER"],
    }),

    // Tour stats
    getTourStats: builder.query<
      {
        totalTour: number;
        totalTourByTourType: { _id: string; count: number }[];
        avgTourCost: { _id: null; avgCostFrom: number }[];
        totalTourByDivision: { _id: string; count: number }[];
        totalHighestBookedTour: any[];
      },
      void
    >({
      query: () => ({ url: "/stats/tour", method: "GET" }),
      transformResponse: (response: any) => response?.data ?? {},
      providesTags: ["TOUR"],
    }),

    // Booking stats
    getBookingStats: builder.query<any, void>({
      query: () => ({ url: "/stats/booking", method: "GET" }),
      transformResponse: (response: any) => {
        const data = response?.data ?? {};

        const bookingsData = Array.from({ length: 12 }, (_, i) => ({
          month: months[i],
          bookings: 0,
        }));

        return {
          ...data,
          bookingsData, // UI chart fallback
        };
      },
      providesTags: ["BOOKING"],
    }),

    // Payment stats
    getPaymentStats: builder.query<any, void>({
      query: () => ({ url: "/stats/payment", method: "GET" }),
      transformResponse: (response: any) => {
        const data = response?.data ?? {};

        const totalRevenue =
          Array.isArray(data.totalRevenue) && data.totalRevenue.length > 0
            ? data.totalRevenue[0].totalRevenue
            : 0;

        const avgPaymentAmount =
          Array.isArray(data.avgPaymentAmount) &&
          data.avgPaymentAmount.length > 0
            ? data.avgPaymentAmount[0].avgPaymentAmount
            : 0;

        return {
          ...data,
          totalRevenue,
          avgPaymentAmount,
        };
      },
      providesTags: ["PAYMENT"],
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetTourStatsQuery,
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
} = statsApi;
