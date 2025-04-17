import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    userCarts: {
        [userId: string]: {
            items: CartItem[];
            coupon?: string;
        };
    };
}

const initialState: CartState = {
    userCarts: {},
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ userId: string; item: CartItem }>) => {
            const { userId, item } = action.payload;
            if (!state.userCarts[userId]) state.userCarts[userId] = { items: [] };

            const existing = state.userCarts[userId].items.find(i => i.id === item.id);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                state.userCarts[userId].items.push(item);
            }
        },
        updateQuantity: (state, action: PayloadAction<{ userId: string; id: string; quantity: number }>) => {
            const { userId, id, quantity } = action.payload;
            const item = state.userCarts[userId]?.items.find(i => i.id === id);
            if (item) item.quantity = quantity;
        },
        removeFromCart: (state, action: PayloadAction<{ userId: string; id: string }>) => {
            const { userId, id } = action.payload;
            if (state.userCarts[userId]) {
                state.userCarts[userId].items = state.userCarts[userId].items.filter(i => i.id !== id);
            }
        },
        applyCoupon: (state, action: PayloadAction<{ userId: string; coupon: string }>) => {
            const { userId, coupon } = action.payload;
            if (!state.userCarts[userId]) state.userCarts[userId] = { items: [] };
            state.userCarts[userId].coupon = coupon;
        },
        clearCart: (state, action: PayloadAction<{ userId: string }>) => {
            const { userId } = action.payload;
            state.userCarts[userId] = { items: [] };
        },
    },
});

export const {
    addToCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    clearCart,
} = cartSlice.actions;

export const selectCartItems = (userId: string) => (state: RootState) =>
    state.cart.userCarts[userId]?.items || [];

export const selectCartTotalQuantity = (userId: string) => (state: RootState) =>
    state.cart.userCarts[userId]?.items.reduce((total, item) => total + item.quantity, 0) || 0;

export default cartSlice.reducer;
