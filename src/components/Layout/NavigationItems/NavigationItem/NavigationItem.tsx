import React from "react";

import classes from "./NavigationItem.module.scss";
import { NavLink } from "react-router-dom";

type navItemProps = {
  click?: () => void;
  link: string;
  children?: string;
};

const NavigationItem = ({ click, link, children }: navItemProps) => (
  <li className={classes.NavigationItem}>
    <NavLink
      onClick={click}
      to={link}
      className={({ isActive }) => (isActive ? classes.active : "")}
    >
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
