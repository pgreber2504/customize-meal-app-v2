import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType, BurgerStateType } from "../../types/meals";

const INGREDIENT_PRICES: IngredientType = {
  salad: 0.2,
  cheese: 0.5,
  bacon: 0.7,
  meat: 1.2,
};

const initialState: BurgerStateType = {
  ingredients: {},
  totalPrice: 5.2,
  error: false,
  signToOrder: false,
};

const burgerSlice = createSlice({
  name: "burger",
  initialState: initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients[action.payload] = !state.ingredients[action.payload]
        ? 1
        : (state.ingredients[action.payload] += 1);
      state.totalPrice = state.totalPrice + INGREDIENT_PRICES[action.payload];
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients[action.payload] = !state.ingredients[action.payload]
        ? 1
        : (state.ingredients[action.payload] -= 1);
      state.totalPrice -= INGREDIENT_PRICES[action.payload];
    },

    saveIngredients: (state, action: PayloadAction<IngredientType>) => {
      state.ingredients = action.payload;
      state.totalPrice = initialState.totalPrice;
    },

    saveError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

export const { addIngredient, removeIngredient, saveError, saveIngredients } =
  burgerSlice.actions;

export default burgerSlice.reducer;
