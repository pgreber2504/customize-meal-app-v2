import React from "react";
import { Route, useNavigate, Navigate } from "react-router";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { useAppSelector } from "../../store/hooks";

const Checkout = () => {
  const { ingredients } = useAppSelector((state) => state.burger);
  const { purchased } = useAppSelector((state) => state.order);
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  const checkoutHandler = () => {
    navigate("/checkout/contact-data");
  };

  let checkoutSummary = <Navigate to="/" />;
  const redirect = purchased ? <Navigate to="/" /> : null;

  if (ingredients) {
    checkoutSummary = (
      <div>
        {redirect}
        <CheckoutSummary
          checkoutCancel={backButtonHandler}
          checkoutHandler={checkoutHandler}
          ingredients={ingredients}
        />
        <Route path={"/contact-data"} element={<ContactData />} />
      </div>
    );
  }
  return checkoutSummary;
};

export default Checkout;
