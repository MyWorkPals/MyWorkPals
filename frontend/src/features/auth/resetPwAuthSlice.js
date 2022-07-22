import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isErrorResetAuth: false,
  isSuccessResetAuth: false,
  isLoadingResetAuth: false,
  messageResetAuth: "",
};

// Reset password
export const authenticateResetPassword = createAsyncThunk(
  "resetPwAuth/authenticateResetPassword",
  async (token, thunkAPI) => {
    try {
      return await authService.authenticateResetPassword(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPwAuthSlice = createSlice({
  name: "resetPwAuth",
  initialState,
  reducers: {
    resetResetPwAuth: (state) => {
      state.isLoadingResetAuth = false;
      state.isSuccessResetAuth = false;
      state.isErrorResetAuth = false;
      state.messageResetAuth = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateResetPassword.pending, (state) => {
        state.isLoadingResetAuth = true;
      })
      .addCase(authenticateResetPassword.fulfilled, (state, action) => {
        state.isSuccessResetAuth = true;
        state.isLoadingResetAuth = false;
        state.user = action.payload;
      })
      .addCase(authenticateResetPassword.rejected, (state, action) => {
        state.isLoadingResetAuth = false;
        state.isErrorResetAuth = true;
        state.messageResetAuth = action.payload;
      });
  },
});

export const { resetResetPwAuth } = resetPwAuthSlice.actions;
export default resetPwAuthSlice.reducer;
