// ------------------------ Payment API
import { baseApi } from "@/redux/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initPayment: builder.mutation({
      query: (bookingId: string) => ({
        url: `/payment/init-payment/${bookingId}`,
        method: "POST",
      }),
      transformResponse: (response: any) => response?.data ?? {},
    }),

    successPayment: builder.mutation({
      query: (payload) => ({
        url: "/payment/success",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: any) => response?.data ?? {},
    }),

    failPayment: builder.mutation({
      query: (payload) => ({
        url: "/payment/fail",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: any) => response?.data ?? {},
    }),

    cancelPayment: builder.mutation({
      query: (payload) => ({
        url: "/payment/cancel",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: any) => response?.data ?? {},
    }),

    getInvoice: builder.query({
      query: (paymentId: string) => ({
        url: `/payment/invoice/${paymentId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data ?? {},
    }),
  }),
});

export const {
  useInitPaymentMutation,
  useSuccessPaymentMutation,
  useFailPaymentMutation,
  useCancelPaymentMutation,
  useGetInvoiceQuery,
} = paymentApi;
