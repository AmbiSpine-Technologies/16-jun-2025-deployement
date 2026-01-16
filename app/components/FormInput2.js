"use client";
import { useState } from "react";


export function InputBox({
  label = "",
  type = "text",
  value = "",
  placeholder = "",
  name = "",
  onChange = () => {},
  error = "",
  className = "",
  ...props
}) {
  const handleInputChange = (e) => {
    if (typeof onChange === "function") {
      onChange(e);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-gray-700 mb-1">
          {label}
        </label>
      )}

      <input
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`
          w-full border border-gray-400 rounded-lg px-3 py-2 
          text-gray-800 placeholder-gray-600 
          focus:outline-none focus:none focus:none focus:border-transparent
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function InputWithCount2({
  type = "text",
  label,
  value,
  icon,
  error,
  onChange,
  placeholder = "",
  maxLength = 50,
  showCount = true,
  className = "",
  InputWithCountClass = "",
  validate, // ✅ Accept it so we can remove it before spreading
  ...props
}) {
  const [count, setCount] = useState(value?.length || 0);

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    if (newValue.length > maxLength) newValue = newValue.slice(0, maxLength);
    setCount(newValue.length);
    onChange(newValue);
  };

  // ✅ Remove unwanted props before passing to <input>
  const safeProps = { ...props };
  delete safeProps.validate; // 🧹 clean it out

  return (
    <div className="relative w-full">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`
          w-full px-5 py-3
          !bg-[#f0f0f0]
          border border-gray-400
          rounded-lg
          focus:outline-none
          focus:none
          text-[#717171] font-medium 
          text-sm       
          transition-all duration-200
          

           ${InputWithCountClass}
        `}
        {...safeProps} // ✅ clean props only
      />
      {showCount && (
        <div className="text-end text-[10px] mb-1 text-gray-400">
          {count}/{maxLength}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
