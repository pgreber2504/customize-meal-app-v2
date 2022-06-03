import React from "react";

import classes from "./Order.module.scss";

type orderProps = {
  ingredients: any;
  price: number;
};

const Order = ({ ingredients, price }: orderProps) => {
  let newIngredients: any[] = [];

  for (const ingredient in ingredients) {
    newIngredients.push({
      name: ingredient,
      amount: ingredients[ingredient],
    });
  }

  const ingredientOutp = newIngredients.map((ig) => {
    return (
      <span
        style={{
          borderRadius: "30px",
          textAlign: "center",
          textTransform: "capitalize",
          display: "inline-block",
          margin: "2px 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients</p>
      {ingredientOutp}
      <p>
        Total Price: <strong>{price}$</strong>
      </p>
    </div>
  );
};

export default Order;
