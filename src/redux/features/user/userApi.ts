import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateUserInfo: builder.mutation({
            query: (updateInfo) => ({
                url: "/users/update-info",
                method: "PATCH",
                body: updateInfo,
            }),
        }),
        userChangePassword: builder.mutation({
            query: (passwordInfo) => ({
                url: "/users/change-password",
                method: "PATCH",
                body: passwordInfo,
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `/users`,
                method: "GET",
            }),
        }),
        getSingleUser: builder.query({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useUpdateUserInfoMutation, useUserChangePasswordMutation, useGetAllUsersQuery, useGetSingleUserQuery
} = userApi;
