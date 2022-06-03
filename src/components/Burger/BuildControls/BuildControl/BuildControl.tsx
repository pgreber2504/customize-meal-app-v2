import React from "react";
import classes from "./BuildControl.module.scss";

type buildControlProps = {
  label: string;
  added: () => void;
  remove: () => void;
  disabledButton: boolean;
};

const buildControl = ({
  label,
  added,
  disabledButton,
  remove,
}: buildControlProps) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button onClick={added} className={classes.More}>
        More
      </button>
      <button
        disabled={!disabledButton}
        onClick={remove}
        className={classes.Less}
      >
        Less
      </button>
    </div>
  );
};

export default buildControl;
