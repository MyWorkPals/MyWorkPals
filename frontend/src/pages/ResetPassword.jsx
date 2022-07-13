import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import { resetPw, reset } from "../features/auth/authSlice";
import {
  authenticateResetPassword,
  resetResetPwAuth,
} from "../features/auth/resetPwAuthSlice";
import { useState, useEffect } from "react";
import FormInput from "../components/formComponents/FormInput";

const ResetPassword = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updatedUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const {
    user,
    isErrorResetAuth,
    isSuccessResetAuth,
    isLoadingResetAuth,
    messageResetAuth,
  } = useSelector((state) => state.resetPwAuth);

  const token = window.location.pathname.split("/").pop();

  const onSubmit = (data) => {
    if (data.password === data.password2) {
      console.log(user);
      const formData = {
        userId: user.data_id,
        password: data.password,
        password2: data.password2,
      };

      dispatch(resetPw(formData));
    }
  };

  const toLogin = (e) => {
    dispatch(reset());
    navigate("/login");
  };

  const toForgetPassword = (e) => {
    navigate("/forgetPassword");
  };

  useEffect(() => {
    dispatch(authenticateResetPassword(token));

    return () => {
      dispatch(resetResetPwAuth());
    };
  }, []);

  return (
    <Container maxWidth={"md"}>
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={snackbarMessage}
        key={vertical + horizontal}
      /> */}
      <Typography gutterBottom variant="h5" component="div">
        Reset Password
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Enter and confirm your new password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormInput
            name={"password"}
            control={control}
            label={"Password"}
            type={"password"}
          />
          <FormInput
            name={"password2"}
            control={control}
            label={"Confirm Password"}
            type={"password"}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ResetPassword;
