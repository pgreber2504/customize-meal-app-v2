import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.scss";

type navItemsProps = {
  click?: () => void;
  isAuth: boolean;
};

const NavigationItems = ({ click, isAuth }: navItemsProps) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem click={click} link="/">
      Burger Builder
    </NavigationItem>
    {isAuth ? (
      <NavigationItem click={click} link="/orders">
        My Orders
      </NavigationItem>
    ) : (
      <NavigationItem click={click} link="/auth">
        Log In
      </NavigationItem>
    )}
    {isAuth ? (
      <NavigationItem click={click} link="/logout">
        Log Out
      </NavigationItem>
    ) : (
      <NavigationItem click={click} link="/register">
        Register
      </NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
