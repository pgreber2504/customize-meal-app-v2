import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import burgerSlice from "./slices/burger-slice";
import orderSlice from "./slices/order-slice";

const store = configureStore({
  reducer: {
    burger: burgerSlice,
    auth: authSlice,
    order: orderSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
