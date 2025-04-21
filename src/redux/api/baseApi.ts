/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../features/auth/authSlice';
import toast from 'react-hot-toast';


const baseQuery = fetchBaseQuery({
    baseUrl: 'https://car-sure-backend.vercel.app/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('authorization', `${token}`);
        }

        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 404) {

        const errorMessage = (result.error.data as { message?: string })?.message || 'User not found!';
        toast.error(errorMessage)
    }

    if (result?.error?.status === 401) {
        //* Send Refresh

        const res = await fetch('https://car-sure-backend.vercel.app/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
        });

        const data = await res.json();

        if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;

            api.dispatch(
                setUser({
                    user,
                    token: data.data.accessToken,
                })
            );

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['Users', 'Orders', 'Products'],
    endpoints: () => ({}),
});
