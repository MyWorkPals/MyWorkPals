import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import { register, reset } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import FormInput from "../components/formComponents/FormInput";

const EmployeeRegister = () => {
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
    if (data.password !== data.password2) {
      openSnackbar({
        vertical: "bottom",
        horizontal: "center",
        snackbarMessage: "Passwords do not match",
      });
    } else {
      data["role"] = "manager";
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
        message={snackbarMessage}
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
