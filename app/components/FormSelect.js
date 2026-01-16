import React from "react";
import FormField from "./FormField";

export default function SelectField({
  label,
  options = [],
  error,
  selectCless,
  ...props
}) {
  return (
    <FormField label={label}>
      <select
        className={`w-full px-3 custom-scroll rounded-full py-2.5 
          border-2 border-[#dbdbdb]
          text-[#717171] font-medium 
          text-[14px] 
          transition-all duration-200
          ${error ? "border-red-500" : ""} 
          ${selectCless}`}
        style={{
          outline: "none",
          boxShadow: "none",
        }}
        {...props}
      >
        {options.map((opt, i) => (
          <option
            key={i}
            className="bg-white text-[#717171] py-3 px-4 hover:bg-blue-50 rounded-xl m-1"
            style={{
              padding: "12px 16px",
              margin: "4px",
              borderRadius: "8px",
            }}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </FormField>
  );
}
