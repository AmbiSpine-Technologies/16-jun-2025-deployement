"use client";
import React, { useState, useRef, useEffect } from "react";
import FormField from "./FormField";

export function AutoGrowTextarea({ text, handleTextChange, maxChars=1000, maxHeight=400 }) {

  const textareaRef = useRef(null);
  // const maxChars = 1000;
  // const maxHeight = 400; // px

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    // Auto-grow but STOP at maxHeight
    const newHeight = textarea.scrollHeight;
    textarea.style.height =
      newHeight > maxHeight ? maxHeight + "px" : newHeight + "px";
  }, [text]);

  const isLimitExceeded = text.length > maxChars;

  return (
    <div className="w-full relative">
      <textarea
        ref={textareaRef}
        value={text}
        placeholder="What’s on your mind?"
        onChange={handleTextChange}   //  ✔ parent function

        // className={`w-full outline-none focus:outline-none focus:ring-0 focus:border-transparent custom-scroll font-medium resize-none 
        //   overflow-y-auto max-h-[400px]
        //   ${isLimitExceeded ? "text-gray-800" : "text-gray-800"}
        // `}
         className={`
    w-full 
    border-none 
    outline-none 
    focus:outline-none 
    focus:ring-0 
    focus:border-none 
    custom-scroll 
    font-medium 
    resize-none
    overflow-y-auto 
    max-h-[400px]
    text-gray-800
  `}
    style={{
    width: "100%",
    border: "none",
    outline: "none",
    color: "#333",
    boxShadow: "none",
  }}

      />

      {/* Character Counter */}
      <div
        className={`text-right text-sm mt-1 ${
          isLimitExceeded ? "text-red-500" : "text-gray-500"
        }`}
      >
        {text.length}/{maxChars}
      </div>
    </div>
  );
}



export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  rows = 4,
  maxLength = 2000,
  showCount = true,
}) {
  const [count, setCount] = useState(value?.length || 0);

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (showCount && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
    }

    setCount(newValue.length);
    onChange(newValue);
  };

  return (
    <FormField label={label}>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        {...(showCount ? { maxLength } : {})}
        className={` w-full rounded-2xl !bg-[#f0f0f0] placeholder:!text-[#7E8298] px-6 py-3 border border-gray-400 focus:outline-none text-gray-700 text-[14px] resize-none 
          ${error ? "border-red-500" : "border-[#1442dc]"} 
          focus:outline-none focus:none`}
      />

      {(error || showCount) && (
        <div className="flex justify-between items-center mt-2">
          {error && (
            <div className="flex-1">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {showCount && (
            <div className={`text-right -mt-6 ${error ? 'ml-4' : 'w-full'}`}>
              <span className="text-xs text-gray-500">
                {count}/{maxLength}
              </span>
            </div>
          )}
        </div>
      )}
    </FormField>
  );
}