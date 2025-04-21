import { baseApi } from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

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
} = adminApi;
