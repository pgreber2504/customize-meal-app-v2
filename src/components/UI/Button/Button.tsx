import classes from "./Button.module.scss";

type buttonProps = {
  btnType: string;
  clicked: () => void;
  disabled: boolean;
  children?: JSX.Element;
};

const Button = ({ clicked, btnType, disabled, children }: buttonProps) => {
  const allClasses = `${classes.Button} ${classes[btnType]}`;

  return (
    <button className={allClasses} onClick={clicked} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
