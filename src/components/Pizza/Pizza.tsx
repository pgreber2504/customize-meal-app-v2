import React from "react";
import classes from "./Pizza.module.scss";

type PizzaProps = {
  ingredients: any;
};

const Pizza = ({ ingredients }: PizzaProps) => {
  return <div className={classes.Burger}></div>;
};

export default Pizza;
