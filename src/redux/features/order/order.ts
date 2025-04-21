import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/orders",
        method: "POST",
        body: orderInfo,
      }),
    }),

    updateAnOrder: builder.mutation({
      query: (updateInfo) => ({
        url: `/orders/${updateInfo.orderId}`,
        method: "PATCH",
        body: updateInfo.data,
      }),
    }),
    deleteAnOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
    }),
    getUserOrders: builder.query({
      query: (userId) => ({
        url: `/orders/${userId}`,
        method: "GET",
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `/orders/verifyPayment/${order_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateAnOrderMutation,
  useDeleteAnOrderMutation,
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useVerifyOrderQuery,
} = orderApi;
