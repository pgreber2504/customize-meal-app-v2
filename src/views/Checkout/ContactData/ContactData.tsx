import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  ChangeEvent,
} from "react";
import { checkValidation } from "../../../utility/utilities";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchPurchase } from "../../../store/actions/index";
import { OrderFormType } from "../../../types/orders";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.scss";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

const ContactData = () => {
  const myRef = useRef<HTMLDivElement>(null!);
  const { ingredients, totalPrice } = useAppSelector((state) => state.burger);
  const { loader } = useAppSelector((state) => state.order);
  const { token, userId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [orderForm, setOrderForm] = useState<OrderFormType>({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      changed: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      changed: false,
    },
    telephone: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Phone Number",
      },
      value: "",
      validation: {
        required: true,
        isNumber: true,
      },
      valid: false,
      changed: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      changed: false,
    },
    postCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumber: true,
      },
      valid: false,
      changed: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      changed: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayVal: "Fastest" },
          { value: "standard", displayVal: "Standard" },
          { value: "cheapest", displayVal: "Cheapest" },
        ],
      },
      validation: {},
      value: "fastest",
      valid: true,
    },
  });
  const [formValidity, setFormValidity] = useState(false);

  useEffect(() => {
    window.scrollTo(0, myRef.current.offsetTop);
  }, []);

  const orderHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const orderValues: { [key: string]: string } = {};

    for (let value in orderForm) {
      orderValues[value] = orderForm[value].value;
    }
    const orders = {
      ingredients: ingredients,
      price: totalPrice,
      customer: orderValues,
      userId: userId,
    };

    dispatch(fetchPurchase(orders, token));
  };

  const formChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const copiedFormElement = {
      ...orderForm[id],
      ...{
        value: event.target.value,
        valid: checkValidation(event.target.value, orderForm[id].validation),
        changed: true,
      },
    };

    const copiedOrderForm = { ...orderForm, [id]: copiedFormElement };

    let formValid = true;

    for (let key in copiedOrderForm) {
      formValid = copiedOrderForm[key].valid && formValid;
    }

    setOrderForm(copiedOrderForm);
    setFormValidity(formValid);
  };

  const formArray = [];

  for (const key in orderForm) {
    formArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let checkoutForm: JSX.Element;

  if (loader === true) {
    checkoutForm = <Spinner />;
  } else {
    checkoutForm = (
      <Fragment>
        <h4>Enter your Contact Data</h4>
        <form onSubmit={orderHandler}>
          {formArray.map((form) => (
            <Input
              touched={form.config.changed}
              invalid={form.config.valid}
              shouldValidate={form.config.validation}
              key={form.id}
              changed={(
                event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
              ) => formChangeHandler(event, form.id)}
              elementType={form.config.elementType}
              elementConfig={form.config.elementConfig}
              value={form.config.value}
              placeholder={form.config.elementConfig.placeholder}
            />
          ))}
          <Button disabled={!formValidity} btnType="Success">
            ORDER
          </Button>
        </form>
      </Fragment>
    );
  }
  return (
    <div ref={myRef} className={classes.ContactData}>
      {checkoutForm}
    </div>
  );
};

export default ContactData;
