import { baseApi } from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminDashboardData: builder.query({
            query: () => ({
                url: "/admin/dashboard",
                method: "GET",
            }),
            providesTags: ["Users", "Orders", "Products"],
        }),
        refreshAdminDashboard: builder.mutation({
            query: () => ({
                url: "/admin/dashboard/refresh",
                method: "POST",
            }),
            invalidatesTags: ["Users", "Orders", "Products"],
        }),
        userAccountDeactivation: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/${userId}/block`,
                method: "PATCH",
            }),
            invalidatesTags: ["Users"],
        }),


    }),
});

export const {
    useUserAccountDeactivationMutation,
    useGetAdminDashboardDataQuery,
    useRefreshAdminDashboardMutation,
    useLazyGetAdminDashboardDataQuery
} = adminApi;
