import * as burgerSliceActions from "../slices/burger-slice";
import { AppDispatch } from "../store";
import axios from "../../config/axios";

export const fetchIngredientsFromServer = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("/ingredients.json");
      const ingredients = {
        salad: response.data.salad,
        bacon: response.data.bacon,
        cheese: response.data.cheese,
        meat: response.data.meat,
      };
      return dispatch(burgerSliceActions.saveIngredients(ingredients));
    } catch (error) {
      return dispatch(burgerSliceActions.saveError(true));
    }
  };
};
