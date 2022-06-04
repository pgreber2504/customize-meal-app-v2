import React from "react";
import classes from "./Burger.module.scss";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

type burgerProps = {
  ingredients: any;
};

const Burger = ({ ingredients }: burgerProps) => {
  let currentIngredients: JSX.Element | any[] = Object.keys(ingredients)
    .map((igKey) => {
      return [...Array(ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (currentIngredients.length === 0) {
    currentIngredients = <p>Please add INGREDIENTS!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {currentIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
