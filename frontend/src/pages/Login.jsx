import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import { login, reset } from "../features/auth/authSlice";
import { useState } from "react";
import FormInput from "../components/formComponents/FormInput";

const Login = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });

  const { vertical, horizontal, open, message } = snackbarState;

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
        message={message}
        key={vertical + horizontal}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormInput name={"email"} control={control} label={"Email"} />
          <FormInput name={"password"} control={control} label={"Password"} />

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
