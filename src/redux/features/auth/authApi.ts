import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (users) => ({
              url: "/auth/register",
              method: "POST",
              body: users,
            }),
          }),

        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo,
            }),

        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;