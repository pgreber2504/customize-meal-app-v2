import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchOrdersFromServer } from "../../store/actions/index";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = () => {
  const { orders, loader } = useAppSelector((state) => state.order);
  const { token, userId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersFromServer(token, userId));
  }, [token, userId, dispatch]);

  let ordersSpinner: React.ReactNode = <Spinner />;

  if (loader) {
    ordersSpinner = orders.map((order) => (
      <Order
        key={order.id}
        price={Number(order.price.toFixed(2))}
        ingredients={order.ingredients}
      />
    ));
  }

  return ordersSpinner;
};

export default Orders;
