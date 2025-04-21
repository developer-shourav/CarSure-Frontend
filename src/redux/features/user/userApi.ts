import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateUserInfo: builder.mutation({
            query: (updateInfo) => ({
                url: "/users/update-info",
                method: "PATCH",
                body: updateInfo,
            }),
            invalidatesTags: ["Users"],
        }),

        userChangePassword: builder.mutation({
            query: (passwordInfo) => ({
                url: "/users/change-password",
                method: "PATCH",
                body: passwordInfo,
            }),
            invalidatesTags: ["Users"],
        }),

        getAllUsers: builder.query({
            query: () => ({
                url: `/users/all`,
                method: "GET",
            }),
            providesTags: ["Users"],
        }),

        getSingleUser: builder.query({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "GET",
            }),
            providesTags: ["Users"],
        }),
    }),
});

export const {
    useUpdateUserInfoMutation,
    useUserChangePasswordMutation,
    useGetAllUsersQuery,
    useGetSingleUserQuery,
} = userApi;
