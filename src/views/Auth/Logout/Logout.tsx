import React, { useEffect } from "react";

import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { authLogout } from "../../../store/slices";

const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authLogout());
  }, [dispatch]);

  return <Navigate to="/" />;
};

export default Logout;
