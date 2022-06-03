import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.scss";

type checkoutSummeryProps = {
  ingredients: any;
  checkoutCancel: () => void;
  checkoutHandler: () => void;
};

const CheckoutSummary = ({
  ingredients,
  checkoutCancel,
  checkoutHandler,
}: checkoutSummeryProps) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Your ORDER:</h1>
      <div style={{ height: "300px", width: "100%", margin: "auto" }}>
        <Burger ingredients={ingredients} />
      </div>
      <div style={{ marginTop: "100px" }}>
        <Button btnType="Danger" clicked={checkoutCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={checkoutHandler}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
