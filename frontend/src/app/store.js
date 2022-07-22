import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import resetPwAuthReducer from "../features/auth/resetPwAuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resetPwAuth: resetPwAuthReducer,
  },
});
