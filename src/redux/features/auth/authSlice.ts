import { createSlice } from "@reduxjs/toolkit";
import { TAuthState } from "../../../types";
import { RootState } from "../../store";


const initialState: TAuthState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
        },

    },

});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;