import React from "react";
import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.scss";

type buildControlsProps = {
  price: number;
  added: (type: string) => void;
  remove: (type: string) => void;
  checkout: () => void;
  disableButton: any;
  disabledCheckout: boolean;
  isAuth: boolean;
};

const buildControls = ({
  price,
  added,
  remove,
  checkout,
  disabledCheckout,
  isAuth,
  disableButton,
}: buildControlsProps) => {
  const label = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
  ];
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price: <strong>{price}$</strong>
      </p>
      {label.map((ctrl: { label: string; type: string }, i: number) => (
        <BuildControl
          key={i + 1}
          label={ctrl.label}
          disabledButton={disableButton[ctrl.type]}
          added={() => added(ctrl.type)}
          remove={() => remove(ctrl.type)}
        />
      ))}
      <button
        onClick={checkout}
        disabled={!disabledCheckout}
        className={classes.Checkout}
      >
        {isAuth ? "Checkout" : "Sign Up to order"}
      </button>
    </div>
  );
};

export default buildControls;
