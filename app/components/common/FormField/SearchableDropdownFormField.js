

"use client";
import React, { useState, useRef, useEffect } from "react";

export default function SearchableDropdownFormField({
  label,
  value,
  onChange,
  options,
  placeholder = "Type or select...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = (options || []).filter((option) =>
    String(option).toLowerCase().includes(String(searchTerm || "").toLowerCase())
  );

  const handleSelect = (option) => {
    setSearchTerm(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleSelect(filteredOptions[0]);
      } else {
        setIsOpen(false);
      }
    }
  };

  const showOptions = isOpen && (filteredOptions.length > 0 || searchTerm);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      
      {/* ✅ Label Fix: absolute aur positioning wapas add ki gayi */}
      <label className="absolute top-[-10px] left-5 bg-white px-2 text-xs font-semibold text-gray-700 transition-all pointer-events-none z-10">
        {label}
      </label>

      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full rounded-full !bg-[#f0f0f0] placeholder:!text-[#7E8298] px-6 py-3 border border-gray-400 focus:outline-none  transition-colors"
        style={{
          outline: "none",
          boxShadow: "none",
        }}
      />

      {/* ✅ Dropdown Fix: 'left-0' add kiya aur width ko sahi kiya */}
      {showOptions && (
        <div className="absolute z-50 w-full left-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-xl custom-scroll max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                 className={`px-6 py-3 cursor-pointer border-b border-gray-100 last:border-none text-gray-900 transition-colors 
                ${option.value === value ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}
              `}
              >
                {option}
              </div>
            ))
          ) : (
            <div
              className="px-6 py-3 text-gray-500 italic cursor-pointer hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {searchTerm}
            </div>
          )}
        </div>
      )}
    </div>
  );
}