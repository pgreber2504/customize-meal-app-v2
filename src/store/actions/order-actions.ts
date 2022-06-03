import axios from "../../config/axios";
import * as orderActions from "../slices/order-slice";
import { AppDispatch } from "../store";
import { OrderType } from "../../types/orders";

export const fetchPurchase = (orders: OrderType, token: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(orderActions.purchaseStart());
    try {
      const response = await axios.post("/orders.json?auth=" + token, orders);
      dispatch(
        orderActions.purchaseSuccess({ id: response.data.name, ...orders })
      );
    } catch (error: any) {
      dispatch(orderActions.purchaseFail(error));
    }
  };
};

export const fetchOrdersFromServer = (token: string, userId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(orderActions.fetchOrderStart());
    const queryParameters = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get("/orders.json" + queryParameters)
      .then((res) => {
        const orders = [];
        for (const key in res.data) {
          orders.push({
            ...res.data[key],
            id: key,
          });
        }
        return dispatch(orderActions.fetchOrderSuccess(orders));
      })
      .catch((err) => {
        return dispatch(orderActions.fetchOrderFail(err));
      });
  };
};
