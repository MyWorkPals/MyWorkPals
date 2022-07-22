import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import { forgetPassword, reset } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import FormInput from "../components/formComponents/FormInput";

const ForgetPassword = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    snackbarMessage: "",
  });

  const { vertical, horizontal, open, snackbarMessage } = snackbarState;

  const openSnackbar = (newState) => {
    setSnackbarState({
      open: true,
      ...newState,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({ ...snackbarState, open: false });
  };

  const onSubmit = (data) => {
    dispatch(forgetPassword(data));
  };

  useEffect(() => {
    if (isError) {
      openSnackbar({
        vertical: "bottom",
        horizontal: "center",
        snackbarMessage: message,
      });
    }

    if (isSuccess) {
      openSnackbar({
        vertical: "bottom",
        horizontal: "center",
        snackbarMessage:
          "Recovery email sent! Use the link in the email to reset your password!",
      });
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, openSnackbar]);

  return (
    <Container maxWidth={"md"}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={snackbarMessage}
        key={vertical + horizontal}
      />
      <Typography gutterBottom variant="h5" component="div">
        Forget Password
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Enter the email address associated with your account and we'll send you
        a link to reset your password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormInput
            name={"email"}
            control={control}
            label={"Email"}
            type={"email"}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
