import React from "react";
import FormField from "./FormField";

export default function CheckboxField({ 
  label, 
  name, 
  checked, 
  onChange, 
  error 
}) {
  return (
    <FormField>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={`w-4 h-4 bg-transparent accent-blue-600 border border-gray-300 rounded-xs  focus:border focus:border-blue-300 focus:outline 
            ${error ? "border-red-500" : ""}`}
        />
        <span className="text-gray-600">{label}</span>
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </FormField>
  );
}
