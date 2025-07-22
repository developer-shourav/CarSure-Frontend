import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface WhitelistItem {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface WhitelistState {
    userWhitelists: {
        [userId: string]: WhitelistItem[];
    };
}

const initialState: WhitelistState = {
    userWhitelists: {},
};

const whitelistSlice = createSlice({
    name: "whitelist",
    initialState,
    reducers: {
        addToWhitelist: (state, action: PayloadAction<{ userId: string; item: WhitelistItem }>) => {
            const { userId, item } = action.payload;
            if (!state.userWhitelists[userId]) {
                state.userWhitelists[userId] = [];
            }

            const existing = state.userWhitelists[userId].find(i => i.id === item.id);
            if (!existing) {
                state.userWhitelists[userId].push(item);
            }
        },
        removeFromWhitelist: (state, action: PayloadAction<{ userId: string; id: string }>) => {
            const { userId, id } = action.payload;
            if (state.userWhitelists[userId]) {
                state.userWhitelists[userId] = state.userWhitelists[userId].filter(i => i.id !== id);
            }
        },
    },
});

export const { addToWhitelist, removeFromWhitelist } = whitelistSlice.actions;

export const selectWhitelistItems = (userId: string) => (state: RootState) =>
    state.whitelist.userWhitelists[userId] || [];

export default whitelistSlice.reducer;
