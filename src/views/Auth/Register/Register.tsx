import React, { useState } from "react";
import { registerUser } from "../../../store/actions/index";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import classes from "./Register.module.scss";
import Button from "../../../components/UI/Button/Button";
import { checkValidation } from "../../../utility/utilities";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { OrderFormType } from "../../../types/orders";

const Register = () => {
  const [form, setForm] = useState<OrderFormType>({
    email: {
      elementType: "input",
      label: "Enter your E-Mail:",
      elementConfig: {
        type: "email",
        placeholder: "",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      message: "",
      changed: false,
    },
    confirmEmail: {
      elementType: "input",
      label: "Confirm your E-Mail:",
      elementConfig: {
        type: "email",
        placeholder: "",
      },
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
      label: "Enter your Password:",
      elementConfig: {
        type: "password",
        placeholder: "min. 6 characters",
      },
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
    confirmPassword: {
      elementType: "input",
      label: "Confirm your Password:",
      elementConfig: {
        type: "password",
        placeholder: "min. 6 characters",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      message: "",
      changed: false,
    },
    acceptPolicy: {
      elementType: "checkbox",
      elementConfig: {
        type: "checkbox",
      },
      value: "Do You accept our Policy Terms ?",
      checked: false,
      valid: false,
      validation: {
        required: true,
      },
    },
  });
  const [formValidity, setFormValidity] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loader, error: newError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const formChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const newElement = {
      ...form[id],
      ...{
        value: event.target.value,
        valid: checkValidation(event.target.value, form[id].validation).isValid,
        message: checkValidation(event.target.value, form[id].validation)
          .message,
        changed: true,
      },
    };

    const newArr = { ...form, [id]: newElement };

    let formValid = true;
    for (const key in newArr) {
      formValid = form[key].valid && formValid;
    }

    setForm(newArr);
    setFormValidity(formValid);
  };

  const clickHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newElement = {
      ...form[id],
      ...{
        checked: event.target.checked,
        valid: event.target.checked,
      },
    };

    const newArr = { ...form, [id]: newElement };

    let formValid = true;
    for (const key in newArr) {
      formValid = form[key].valid && formValid;
    }

    setForm(newArr);
    setFormValidity(!formValid);
  };

  let header = <h1>Create Account</h1>;

  if (error) {
    header = <h1 style={{ color: "red", border: "1px solid red" }}>{error}</h1>;
  }

  const registerHandler = (event: React.FormEvent) => {
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const confirmEmail = form.confirmEmail.value;

    if (
      email !== confirmEmail ||
      password !== confirmPassword ||
      !form.acceptPolicy.checked
    ) {
      let emailIsValid = true;
      let passwordIsValid = true;

      emailIsValid = email === confirmEmail;
      passwordIsValid = password === confirmPassword;

      if (!form.acceptPolicy.checked) {
        setError("You must accept our policy terms to continue");
      } else {
        setError(null);
      }

      setForm({
        ...form,
        confirmEmail: {
          ...form.confirmEmail,
          valid: emailIsValid,
          message: emailIsValid ? "" : "You entered different email",
        },
        confirmPassword: {
          ...form.confirmPassword,
          valid: passwordIsValid,
          message: passwordIsValid ? "" : "You entered different password",
        },
      });

      setFormValidity(false);
    } else {
      dispatch(registerUser(email, password));

      const newForm = {
        ...form,
        ...{
          acceptPolicy: {
            ...form.acceptPolicy,
            checked: false,
            valid: false,
          },
        },
      };
      setForm(newForm);
      setFormValidity(false);
    }
    event.preventDefault();
  };

  const formArray = [];

  for (let key in form) {
    formArray.push({
      id: key,
      config: form[key],
    });
  }

  let formInput = formArray.map((element) => (
    <Input
      key={element.id}
      label={element.config.label}
      message={element.config.message}
      value={element.config.value}
      checked={(event: React.ChangeEvent<HTMLInputElement>) =>
        clickHandler(event, element.id)
      }
      touched={element.config.changed}
      placeholder={element.config.elementConfig.placeholder}
      elementType={element.config.elementType}
      elementConfig={element.config.elementConfig}
      changed={(event) => formChangedHandler(event, element.id)}
      invalid={element.config.valid}
      shouldValidate={element.config.validation}
    />
  ));

  let output = <Spinner />;
  let errorOutput = null;

  if (newError) {
    const message = newError.message!;
    const newMessage = message.replace(/_/g, " ");
    errorOutput = (
      <p
        style={{
          textAlign: "center",
          padding: "10px 0",
          border: "solid 1px red",
          color: "red",
        }}
      >
        {newError.code}: {newMessage}
      </p>
    );
  }

  if (!loader) {
    output = (
      <form onSubmit={(event) => registerHandler(event)}>
        {header}
        {formInput}
        <Button disabled={!formValidity} btnType="Success">
          Create Account
        </Button>
      </form>
    );
  }

  return (
    <div className={classes.Register}>
      {errorOutput}
      {output}
    </div>
  );
};

export default Register;
