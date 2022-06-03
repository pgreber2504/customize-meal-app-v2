import classes from "./Logo.module.scss";
import appLogo from "../../../assets/images/logo.png";

type logoProps = {
  height?: string;
};

const Logo = ({ height }: logoProps) => (
  <div className={classes.Logo} style={{ height: height }}>
    <img src={appLogo} alt="logo" />
  </div>
);

export default Logo;
