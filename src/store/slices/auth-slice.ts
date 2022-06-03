import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  userId: string;
  error: object | null;
  registerError: object | null;
  loader: boolean;
}

const initialState: AuthState = {
  token: "",
  userId: "",
  error: null,
  registerError: null,
  loader: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.error = null;
      state.loader = true;
    },
    authSuccess: (
      state,
      action: PayloadAction<{ token: string; userId: string }>
    ) => {
      const user = { ...action.payload };
      state.token = user.token;
      state.userId = user.userId;
      state.error = null;
      state.loader = false;
    },
    authFailed: (state, action: PayloadAction<object>) => {
      state.error = action.payload;
      state.loader = false;
    },
    authLogout: (state) => {
      state.token = "";
      state.userId = "";
    },
    registerFailed: (state, action: PayloadAction<object>) => {
      state.registerError = action.payload;
      state.loader = false;
    },
  },
});

export const {
  authFailed,
  authLogout,
  authStart,
  authSuccess,
  registerFailed,
} = authSlice.actions;

export default authSlice.reducer;
