import React from "react";
import PropTypes from "prop-types";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.scss";
import Logo from "../../UI/Logo/Logo";

type toolbarProps = {
  showSideDrawer: () => void;
  isAuth: boolean;
};

const toolbar = ({ isAuth, showSideDrawer }: toolbarProps) => (
  <header className={classes.Toolbar}>
    <div
      onClick={showSideDrawer}
      className={[classes.Menu, classes.MobileOnly].join(" ")}
    >
      <div className={classes.Burger}></div>
    </div>
    <div className={classes.Logo}>
      <Logo />
    </div>

    <div className={classes.DesktopOnly}>
      <NavigationItems isAuth={isAuth} />
    </div>
  </header>
);

toolbar.propTypes = {
  showSideDrawer: PropTypes.func.isRequired,
};

export default toolbar;
