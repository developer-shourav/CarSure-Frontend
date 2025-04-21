/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCar, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/car',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TCar[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Products"],
    }),
    getProductDetails: builder.query({
      query: (id) => {
        return {
          url: `/car/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: '/car',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/car/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/car/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productManagementApi;
