"use client"
import { useState } from "react"

export const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  children,
  className="",
  customBorder = false,
  gradientFrom = "#000ACE",
  gradientTo = "#C2009B",
  ...rest
  
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Floating label logic
  const shouldFloat = isFocused || value;

  return (
    <div className="relative w-full">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}

        // 👉 Correct Focus Handling
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          
        }}
          {...rest}
        onChange={onChange}

        // 👉 Gradient Border (optional)
        style={
          customBorder
            ? {
                background: `
                  linear-gradient(white, white) padding-box,
                  linear-gradient(to right, ${gradientFrom}, ${gradientTo}) border-box
                `,
                border: "3px solid transparent",
                borderRadius: "100px",
                outline: "none",
              }
            : {}
        }
        className={`
          w-full px-4 py-3 text-sm rounded-full transition-all duration-200
          placeholder:text-gray-400

          /* ❌ Remove ALL outlines and rings */
          outline-none focus:outline-none focus:ring-0 

          ${
            customBorder
              ? "focus:ring-0 focus:outline-none focus:border-transparent"
              : "border-2 border-[#0338e6] focus:border-blue-700"
          }

          ${error && touched ? "border-red-500 focus:ring-red-300" : ""}
          ${className}
        `}
      />

      {/* FLOATING LABEL */}
      <label
        className={`
          absolute left-4 bg-white px-1 transition-all duration-200 pointer-events-none
          ${
            shouldFloat
              ? "-top-2 text-xs font-semibold " +
                (error ? "text-red-600" : "text-blue-600")
              : "top-3 text-gray-500 text-base"
          }
        `}
      >
        {label}
      </label>


      {/* RIGHT ICON */}
      {children && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {children}
        </div>
      )}

      {/* ERROR TEXT */}
      {error && touched && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

