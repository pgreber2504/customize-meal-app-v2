import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";

type orderSummaryProps = {
  ingredients: any;
  finalPrice: number;
  continued: () => void;
  cancel: () => void;
};

const OrderSummary = ({
  ingredients,
  finalPrice,
  cancel,
  continued,
}: orderSummaryProps) => {
  const ingredientsSummary = Object.keys(ingredients).map((igKey, i) => {
    return (
      <li key={"list" + i}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {ingredients[igKey]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>Burger with:</p>
      <ul>{ingredientsSummary}</ul>
      <h4>Price: {finalPrice.toFixed(2)}$</h4>
      <p>Go to Checkout?</p>
      <Button btnType="Success" clicked={continued}>
        YES
      </Button>
      <Button btnType="Danger" clicked={cancel}>
        NO
      </Button>
    </Fragment>
  );
};
export default OrderSummary;
