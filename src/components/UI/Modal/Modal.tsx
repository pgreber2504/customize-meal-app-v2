import { Fragment } from "react";
import classes from "./Modal.module.scss";

import Backdrop from "../Backdrop/Backdrop";

type modalProps = {
  disabled: boolean;
  closeModal: () => void;
  children?: JSX.Element;
};

const Modal = ({ disabled, closeModal, children }: modalProps) => (
  <Fragment>
    <Backdrop disabled={disabled} close={closeModal} />
    <div
      className={classes.Modal}
      style={{
        transform: disabled ? "translateY(0)" : "translateY(-100vh)",
        opacity: disabled ? "1" : "0",
      }}
    >
      {children}
    </div>
  </Fragment>
);

export default Modal;
