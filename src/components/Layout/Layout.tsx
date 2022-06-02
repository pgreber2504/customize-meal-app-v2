import { Fragment, useState } from "react";
import { connect } from "react-redux";

import classes from "./Layout.module.scss";
import SideDrawer from "./SideDrawer/SideDrawer";
import Toolbar from "./Toolbar/Toolbar";

type layoutProps = {
  isAuthenticated: boolean;
  children?: JSX.Element;
};

const Layout = ({ isAuthenticated, children }: layoutProps) => {
  const [clicked, setClicked] = useState(false);

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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
