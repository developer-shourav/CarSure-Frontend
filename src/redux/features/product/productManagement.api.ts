/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCar, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        console.log(args);
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
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
} = productManagementApi;
