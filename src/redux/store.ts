import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import whitelistReducer from './features/whitelist/whitelistSlice';
import { baseApi } from "./api/baseApi";

import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// --------Persist config for auth
const persistAuthConfig = {
    key: 'auth',
    storage,
};

// --------Persist config for cart
const persistCartConfig = {
    key: 'cart',
    storage,
};


const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer,
        cart: persistedCartReducer,
        whitelist: whitelistReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const persistor = persistStore(store);
