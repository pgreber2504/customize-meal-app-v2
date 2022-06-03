import classes from "./Backdrop.module.scss";

type backdropProps = {
  disabled: boolean;
  close: () => void;
};

const Backdrop = ({ disabled, close }: backdropProps) =>
  disabled ? <div className={classes.Backdrop} onClick={close}></div> : null;

export default Backdrop;
