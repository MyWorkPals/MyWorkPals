import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import { register, reset } from "../features/auth/authSlice";
import { useState } from "react";
import FormInput from "../components/formComponents/FormInput";

const EmployeeRegister = () => {
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
    if (data.password !== data.password2) {
      openSnackbar({
        vertical: "bottom",
        horizontal: "center",
        message: "Passwords do not match",
      });
    } else {
      data["role"] = "employee";
      dispatch(register(data));
    }
  };

  const handleBack = () => {
    navigate("/register");
  };

  const toLogin = () => {
    navigate("/login");
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
          <FormInput name={"name"} control={control} label={"Name"} />
          <FormInput name={"email"} control={control} label={"Email"} />
          <FormInput name={"password"} control={control} label={"Password"} />
          <FormInput
            name={"password2"}
            control={control}
            label={"Confirm Password"}
          />

          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Create Account
          </Button>
          <Button variant="text" onClick={toLogin}>
            Already have an account? Login here.
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default EmployeeRegister;
