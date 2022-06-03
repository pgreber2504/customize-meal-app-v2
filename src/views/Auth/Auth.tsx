import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OrderFormType } from "../../types/orders";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { auth } from "../../store/actions/auth-actions";
import { Navigate } from "react-router-dom";

import classes from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidation } from "../../utility/utilities";

const Auth = () => {
  const controlInitialState: OrderFormType = {
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "E-mail",
      },
      label: "Enter your E-Mail:",
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      message: "",
      changed: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      label: "Enter your Password:",
      value: "",
      validation: {
        required: true,
        minLength: 6,
        maxLength: 30,
      },
      valid: false,
      message: "",
      changed: false,
    },
  };

  const [control, setControl] = useState<OrderFormType>(controlInitialState);
  const [formValidity, setFormValidity] = useState(false);
  const { token, loader, error } = useAppSelector((state) => state.auth);
  const { signToOrder } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const isAuth = token !== "";

  const formChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const copiedFormElement = {
      ...control[id],
      ...{
        value: event.target.value,
        valid: checkValidation(event.target.value, control[id].validation)
          .isValid,
        message: checkValidation(event.target.value, control[id].validation)
          .message,
        changed: true,
      },
    };

    const copiedOrderForm = { ...control, [id]: copiedFormElement };

    let formValid = true;
    for (let key in copiedOrderForm) {
      formValid = copiedOrderForm[key].valid && formValid;
    }

    setControl(copiedOrderForm);
    setFormValidity(formValid);
  };

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const email = control.email.value;
    const password = control.password.value;

    dispatch(auth(email, password));
  };

  const formArray = [];
  for (const key in control) {
    if (control.hasOwnProperty(key)) {
      formArray.push({
        id: key,
        config: control[key],
      });
    }
  }

  const form = formArray.map((element) => (
    <Input
      key={element.id}
      touched={element.config.changed}
      label={element.config.label}
      message={element.config.message}
      invalid={element.config.valid}
      shouldValidate={element.config.validation}
      changed={(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => formChangeHandler(event, element.id)}
      elementType={element.config.elementType}
      elementConfig={element.config.elementConfig}
      value={element.config.value}
    />
  ));

  let output = <Spinner />;
  let errorMessage = null;
  if (error) {
    const message = error.message!;
    const newMessage = message.replace(/_/g, " ");
    errorMessage = (
      <p
        style={{
          textAlign: "center",
          padding: "10px 0",
          border: "solid 1px red",
          color: "red",
        }}
      >
        {error.code}: {newMessage}
      </p>
    );
    setTimeout(() => {
      errorMessage = null;
    }, 5000);
  }

  let redirect = null;
  if (isAuth && signToOrder) {
    redirect = <Navigate to="/checkout" />;
  } else if (isAuth && !signToOrder) {
    redirect = <Navigate to="/" />;
  }

  if (!loader) {
    output = (
      <React.Fragment>
        {redirect}
        <form onSubmit={(event) => loginHandler(event)}>
          <h1>Please Log in</h1>
          {form}
          <Button disabled={!formValidity} btnType="Success">
            Submit
          </Button>
        </form>
        <span>
          If you don't have account. Please <Link to="/register">Register</Link>
        </span>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.Auth}>
      {errorMessage}
      {output}
    </div>
  );
};

export default Auth;
