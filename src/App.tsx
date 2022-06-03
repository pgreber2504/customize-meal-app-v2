import React, { useEffect, Suspense } from "react";
import Meals from "./views/Meals/Meals";
import Layout from "./components/Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

import Logout from "./views/Auth/Logout/Logout";
import Spinner from "./components/UI/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { autoAuth } from "./store/actions";

const Orders = React.lazy(() => {
  return import("./views/Orders/Order");
});

const Auth = React.lazy(() => {
  return import("./views/Auth/Auth");
});

const Checkout = React.lazy(() => {
  return import("./views/Checkout/Checkout");
});

const Register = React.lazy(() => {
  return import("./views/Auth/Register/Register");
});

function App() {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isAuth = token !== "";

  useEffect(() => {
    dispatch(autoAuth());
  }, [dispatch]);

  let route = (
    <Routes>
      <Route path="/" element={<Meals />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
  if (isAuth) {
    route = (
      <Routes>
        <Route path="/" element={<Meals />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout/*" element={<Checkout />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>{route}</Suspense>
    </Layout>
  );
}

export default App;
