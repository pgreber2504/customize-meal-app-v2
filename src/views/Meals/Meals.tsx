import React, { useState, useEffect, Fragment } from "react";
import { IngredientType } from "../../types/meals";
import {
  addIngredient,
  resetSignToOrder,
  removeIngredient,
  purchaseInit,
  signToOrder,
} from "../../store/slices/index";
import { fetchIngredientsFromServer } from "../../store/actions/index";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Meals = () => {
  const [orderCheckout, setOrderCheckout] = useState(false);
  const [loader] = useState(false);
  const { ingredients, error, totalPrice } = useAppSelector(
    (state: RootState) => state.burger
  );
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuth = token !== null;

  useEffect(() => {
    if (ingredients) {
      dispatch(fetchIngredientsFromServer());
    } else {
      return;
    }
    dispatch(purchaseInit());
    dispatch(resetSignToOrder());
  }, []);

  const disableButtonHandler = (ingredients: IngredientType) => {
    const copiedIngredients = ingredients;

    const sum = Object.keys(copiedIngredients)
      .map((igKey) => {
        return copiedIngredients[igKey];
      })
      .reduce((arr, el) => {
        return arr + el;
      }, 0);

    return sum > 0;
  };

  const checkoutHandler = () => {
    if (isAuth) {
      setOrderCheckout(true);
    } else {
      dispatch(signToOrder());
      navigate("/auth");
    }
  };

  const closeModalHandler = () => {
    setOrderCheckout(false);
  };

  const continueHandler = () => {
    const queryParams = [];

    for (let i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
      );
    }
    queryParams.push("price=" + totalPrice);
    const queryString = queryParams.join("&");

    navigate(`/checkout?${queryString}`);
  };

  const addIngredientHandler = (type: string) => {
    dispatch(addIngredient(type));
  };

  const removeIngredientHandler = (type: string) => {
    dispatch(removeIngredient(type));
  };

  const disabledInfo = {
    ...ingredients,
  };

  for (let key in Object.keys(disabledInfo)) {
    disabledInfo[key] = disabledInfo[key] <= 0 ? 0 : disabledInfo[key];
  }

  let continueLoader: JSX.Element | undefined;
  let burger = error ? (
    <p style={{ textAlign: "center" }}>
      Something went wrong. <br /> Try Again later!
    </p>
  ) : (
    <Spinner />
  );

  if (ingredients) {
    burger = (
      <Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          disableButton={disabledInfo}
          disabledCheckout={disableButtonHandler(ingredients)}
          price={Number(totalPrice.toFixed(2))}
          added={addIngredientHandler}
          remove={removeIngredientHandler}
          checkout={checkoutHandler}
          isAuth={isAuth}
        />
      </Fragment>
    );

    continueLoader = (
      <OrderSummary
        finalPrice={totalPrice}
        ingredients={ingredients}
        cancel={closeModalHandler}
        continued={continueHandler}
      />
    );
  }

  if (loader) {
    continueLoader = <Spinner />;
  }

  return (
    <Fragment>
      <Modal disabled={orderCheckout} closeModal={closeModalHandler}>
        {continueLoader}
      </Modal>
      {burger}
    </Fragment>
  );
};

export default Meals;
