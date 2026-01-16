"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// ✅ Gradient border using background-clip approach
const GradientInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fafafa",
    borderRadius: "50px",
    backgroundImage: `
      linear-gradient(#fafafa, #fafafa),
      linear-gradient(90deg, #000ACE, #8B016F)
    `,
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    border: "3px solid transparent",
    borderRadius: "50px",
    transition: "all 0.3s ease",

    "& fieldset": {
      border: "none", // Remove default border
    },

    "&:hover": {
      backgroundImage: `
        linear-gradient(#fafafa, #fafafa),
        linear-gradient(90deg, #8B016F, #000ACE)
      `,
    },

    "&.Mui-focused": {
      backgroundImage: `
        linear-gradient(#fafafa, #fafafa),
        linear-gradient(90deg, #000ACE, #8B016F)
      `,
    },
  },

  "& .MuiOutlinedInput-input": {
    borderRadius: "50px",
  },
}));

const MuiInputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  variant = "outlined",
  fullWidth = true,
  error = "",
  helperText = "",
  sx = {},
  ...props
}) => {
  return (
    <GradientInput
      id={name}
      name={name}
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant={variant}
      fullWidth={fullWidth}
      error={!!error}
      helperText={error || helperText}
      sx={sx}
      {...props}
    />
  );
};

export default MuiInputField;
