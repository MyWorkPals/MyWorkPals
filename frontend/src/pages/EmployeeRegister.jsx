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
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Name"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: "Name required" }}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Email"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                type="email"
              />
            )}
            rules={{ required: "Email required" }}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Password"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                type="password"
              />
            )}
            rules={{ required: "Password required" }}
          />

          <Controller
            name="password2"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Confirm Password"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                type="password"
              />
            )}
            rules={{ required: "Confirm Password required" }}
          />

          <div>
            <Button variant="contained" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
          </div>
        </Stack>
      </form>
    </Container>
  );
};

export default EmployeeRegister;
