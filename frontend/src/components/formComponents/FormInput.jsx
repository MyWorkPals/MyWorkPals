import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormInput = ({ name, control, label, helperText, type }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          variant="outlined"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : helperText}
          type={type}
        />
      )}
      rules={{ required: `${label} required` }}
    />
  );
};

export default FormInput;
