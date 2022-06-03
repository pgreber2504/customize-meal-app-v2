import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState, OrderType } from "../../types/orders";

const initialState: OrderState<object> = {
  orders: [],
  loader: false,
  error: null,
  purchased: false,
  signToOrder: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    purchaseSuccess: (state, action: PayloadAction<OrderType>) => {
      state.orders.push(action.payload);
      state.loader = false;
      state.purchased = true;
    },
    purchaseInit: (state) => {
      state.purchased = false;
    },
    purchaseFail: (state, action: PayloadAction<object>) => {
      state.error = action.payload;
    },
    purchaseStart: (state) => {
      state.loader = true;
    },
    fetchOrderStart: (state) => {
      state.loader = true;
    },
    fetchOrderSuccess: (state, action: PayloadAction<OrderType[]>) => {
      state.loader = false;
      state.orders = action.payload;
    },
    fetchOrderFail: (state, action: PayloadAction<object>) => {
      state.loader = false;
      state.error = action.payload;
    },
    signToOrder: (state) => {
      state.signToOrder = true;
    },
    resetSignToOrder: (state) => {
      state.signToOrder = false;
    },
  },
});

export const {
  fetchOrderFail,
  fetchOrderStart,
  fetchOrderSuccess,
  purchaseFail,
  purchaseInit,
  purchaseStart,
  purchaseSuccess,
  resetSignToOrder,
  signToOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
