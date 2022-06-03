import * as authActions from "../slices/auth-slice";
import { AppDispatch } from "../store";
import axios from "axios";

export const authTokenTimeout = (estimatedTime: number) => {
  return (dispatch: AppDispatch) => {
    setTimeout(() => {
      dispatch(authActions.authLogout());
    }, estimatedTime);
  };
};

export const auth = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.authStart());
    const reqData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkRblKsCpVMvDeFAumLp3st7nZpv_VCfI";

    try {
      const response = await axios.post(url, reqData);
      localStorage.setItem("token", response.data.idToken);
      const expirationTime = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("expirationTime", expirationTime.toISOString());
      localStorage.setItem("userId", response.data.localId);
      dispatch(
        authActions.authSuccess({
          token: response.data.idToken,
          userId: response.data.localId,
        })
      );
      dispatch(authTokenTimeout(response.data.expiresIn * 1000));
    } catch (error: any) {
      dispatch(authActions.authFailed(error.response.data.error));
    }
  };
};

export const registerUser = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.authStart());
    const reqData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkRblKsCpVMvDeFAumLp3st7nZpv_VCfI";

    try {
      const response = await axios.post(url, reqData);
      localStorage.setItem("token", response.data.idToken);
      const expirationTime = new Date(
        new Date().getTime() + response.data.expiresponseIn * 1000
      );
      localStorage.setItem("expirationTime", expirationTime.toString());
      localStorage.setItem("userId", response.data.localId);
      dispatch(
        authActions.authSuccess({
          token: response.data.idToken,
          userId: response.data.localId,
        })
      );
      dispatch(authTokenTimeout(response.data.expiresIn * 1000));
    } catch (error: any) {
      dispatch(authActions.registerFailed(error.response.data.error));
    }
  };
};

export const autoAuth = () => {
  return (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authActions.authLogout());
    } else {
      const expirationTime = localStorage.getItem("expirationTime");
      if (typeof expirationTime !== "string") {
        return;
      }
      const dateExpirationTime = new Date(expirationTime);
      if (dateExpirationTime > new Date()) {
        const userId = localStorage.getItem("userId");
        if (typeof userId !== "string") {
          return;
        }
        dispatch(authActions.authSuccess({ token, userId }));
        const expirationTimeInMilis =
          dateExpirationTime.getTime() - new Date().getTime();
        dispatch(authTokenTimeout(expirationTimeInMilis));
      } else {
        dispatch(authActions.authLogout());
      }
    }
  };
};
