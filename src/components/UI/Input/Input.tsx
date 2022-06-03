import React from "react";

import classes from "./Input.module.scss";

type inputProps = {
  invalid: boolean | { isValid?: boolean; message?: string };
  shouldValidate: { [key: string]: number | boolean | string };
  touched: boolean | undefined;
  elementType: string;
  elementConfig: any;
  value: string;
  changed?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  checked?: () => void;
  label?: string;
  message?: string;
};

const input = ({
  invalid,
  shouldValidate,
  touched,
  elementType,
  elementConfig,
  value,
  changed,
  checked,
  label,
  message,
}: inputProps) => {
  let inputElement = null;
  const classesArray = [classes.InputElement];

  if (!invalid && shouldValidate && touched) {
    classesArray.push(classes.Invalid);
  }

  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={classesArray.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classesArray.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classesArray.join(" ")}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map((element: any) => (
            <option key={element.value} value={element.value}>
              {element.displayVal}
            </option>
          ))}
        </select>
      );
      break;
    case "checkbox":
      inputElement = (
        <label style={{ color: "#6c757d" }}>
          <input
            onClick={checked}
            style={{ width: "16px", height: "16px" }}
            type="checkbox"
          />
          {value}
        </label>
      );
      break;
    default:
      inputElement = inputElement = (
        <input
          className={classesArray.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );

      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
      <span className={classes.Message}>{message}</span>
    </div>
  );
};

export default input;
