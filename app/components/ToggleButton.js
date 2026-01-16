"use client";
import React from "react";

export default function ToggleButton({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      className={`
        w-12 h-6 flex items-center rounded-full cursor-pointer transition-all duration-300
        ${value ? "bg-[#064006]" : "bg-gray-700"}
      `}
    >
      <div
        className={`
          w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300
          ${value ? "translate-x-6" : "translate-x-1"}
        `}
      ></div>
    </div>
  );
}
