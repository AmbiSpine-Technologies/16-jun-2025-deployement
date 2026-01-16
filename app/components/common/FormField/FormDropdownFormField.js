"use client";
import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function FormDropdownFormField({
  label,
  value,
  onChange,
  options,
  name,
  placeholder = "Select Option",
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // ✅ Fix 1: Value ke basis par Label dhundo
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : "";

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    // Parent ko event object bhejo
    onChange({
      target: { name, value: opt.value },
    });
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      
      {/* ✅ Label Styling (Same as SearchableDropdown) */}
      <label className="absolute top-[-10px] left-5 bg-white px-2 text-xs font-semibold text-blue-600 z-10">
        {label}
      </label>

      {/* ✅ Input Box (Styled like previous components) */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full rounded-full bg-[#f0f0f0] px-6 py-3 border border-gray-400 cursor-pointer flex items-center justify-between transition-colors focus:border-blue-500"
      >
        {/* Selected Value Show Karo */}
        <span className={`text-sm ${displayLabel ? "text-gray-900" : "text-[#7E8298]"}`}>
          {displayLabel || placeholder}
        </span>

        <IoChevronDown 
          className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} 
        />
      </div>

      {/* ✅ Dropdown Menu (Normal Flow - No Absolute) */}
      {/* 'absolute' हटा दिया है ताकि ये कंटेंट को नीचे push करे */}
      {open && (
        <div className="absolute z-50 w-full left-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-sm custom-scroll max-h-60 overflow-y-auto">
          {options.map((opt, i) => (
            <div
              key={i}
              className={`px-6 py-3 cursor-pointer border-b border-gray-100 last:border-none text-gray-900 transition-colors 
                ${opt.value === value ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}
              `}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}