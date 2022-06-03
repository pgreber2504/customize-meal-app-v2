import React from "react";
import Button from "../UI/Button/Button";

type loginMessageProps = {
  name: string;
  continued: () => void;
};

const LoginMessage = ({ name, continued }: loginMessageProps) => (
  <React.Fragment>
    <h2>Hello {name}</h2>
    <p>You are successfully loged in.</p>
    <Button btnType="Success" clicked={continued}>
      Continue
    </Button>
  </React.Fragment>
);

export default LoginMessage;
