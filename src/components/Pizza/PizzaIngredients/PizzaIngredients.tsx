import React from "react";

import classes from "./BurgerIngredients.module.scss";

type PizzaIngredientsProps = {
  type: string;
};

const BurgerIngredients = ({ type }: PizzaIngredientsProps) => {
  let ingredients = null;

  switch (type) {
    case "dough":
      ingredients = <div className={classes.Dough}></div>;
      break;
    case "cheese":
      ingredients = (
        <div className={classes.Cheese}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "mushrooms":
      ingredients = <div className={classes.Mushrooms}></div>;
      break;
    case "extraCheese":
      ingredients = <div className={classes.ExtraCheese}></div>;
      break;
    case "ham":
      ingredients = <div className={classes.Ham}></div>;
      break;
    case "tomato":
      ingredients = <div className={classes.Tomato}></div>;
      break;
    case "corn":
      ingredients = <div className={classes.Corn}></div>;
      break;

    case "pineapple":
      ingredients = <div className={classes.Pineapple}></div>;
      break;

    case "chicken":
      ingredients = <div className={classes.Chicken}></div>;
      break;
    default:
      ingredients = null;
  }

  return ingredients;
};

export default BurgerIngredients;
