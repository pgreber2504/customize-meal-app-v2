import classes from "./SideDrawer.module.scss";

import Backdrop from "../../UI/Backdrop/Backdrop";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import { Fragment } from "react";

type sideDrawerProps = {
  info: boolean;
  disableBackdrop: () => void;
  isAuth: boolean;
};

const SideDrawer = ({ info, disableBackdrop, isAuth }: sideDrawerProps) => {
  return (
    <Fragment>
      <Backdrop disabled={info} close={disableBackdrop} />
      <div
        className={[
          classes.SideDrawer,
          info ? classes.Open : classes.Closed,
        ].join(" ")}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems click={disableBackdrop} isAuth={isAuth} />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
