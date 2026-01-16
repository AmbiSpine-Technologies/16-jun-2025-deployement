"use client";
import { useState } from "react";

export const FormInputField = ({
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
  className = "",
  ...rest
}) => {
  return (
    <div className="relative w-full">
      {/* STATIC LABEL (Not floating) */}
      {label && (
        <label className="text-gray-700 text-sm ps-1 mb-2 pb-4">
          {label} 
        </label>
      )}

      <input name={name} type={type} placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
        className={`
        transition-all duration-200
           text-gray-900

          /* Remove default outlines */
          outline-none focus:ring-0 
          w-full rounded-full !bg-[#f0f0f0] placeholder:!text-[#7E8298] px-6 py-3 border border-gray-400 focus:outline-none 
          /* Focus State */
          

          /* Error State */
          ${error && touched ? "border-red-500 focus:border-red-500" : ""}
          
          ${className}
        `}
      />

      {/* RIGHT ICON */}
      {children && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
          {children}
        </div>
      )}

      {/* ERROR TEXT */}
      {error && touched && (
        <p className="text-red-500 text-xs mt-1 ml-4">{error}</p>
      )}
    </div>
  );
};