import { Fragment, useState } from "react";
import { useAppSelector } from "../../store/hooks";

import classes from "./Layout.module.scss";
import SideDrawer from "./SideDrawer/SideDrawer";
import Toolbar from "./Toolbar/Toolbar";

type layoutProps = {
  children?: JSX.Element;
};

const Layout = ({ children }: layoutProps) => {
  const [clicked, setClicked] = useState(false);
  const { token } = useAppSelector((state) => state.auth);

  const isAuthenticated = token !== "";

  const disableBackdropHandler = () => {
    setClicked(false);
  };

  const enableSideDrawerHandler = () => {
    setClicked(true);
  };

  return (
    <Fragment>
      <SideDrawer
        isAuth={isAuthenticated}
        info={clicked}
        disableBackdrop={disableBackdropHandler}
      />
      <Toolbar
        isAuth={isAuthenticated}
        showSideDrawer={enableSideDrawerHandler}
      />
      <main className={classes.Content}>{children}</main>
    </Fragment>
  );
};

export default Layout;
