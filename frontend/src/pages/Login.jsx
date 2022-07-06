import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import { login, reset } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import FormInput from "../components/formComponents/FormInput";

const Login = () => {
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

  useEffect(() => {
    if (isError) {
      openSnackbar({
        vertical: "bottom",
        horizontal: "center",
        snackbarMessage: message,
      });
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  const toRegister = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth={"md"}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={snackbarMessage}
        key={vertical + horizontal}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormInput
            name={"email"}
            control={control}
            label={"Email"}
            type={"email"}
          />
          <FormInput
            name={"password"}
            control={control}
            label={"Password"}
            type={"password"}
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button variant="text" onClick={toRegister}>
            No account? Create account here.
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
