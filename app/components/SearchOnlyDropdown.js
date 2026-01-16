"use client";
import React, { useState, useRef, useEffect } from "react";

export default function SearchOnlyDropdown({
  label,
  value,
  onChange,
  options,
  placeholder = "Search...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm(""); // Clear search when dropdown closes
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = (options || []).filter((option) =>
    String(option).toLowerCase().includes(String(searchTerm).toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setSearchTerm("");
  };

  // Display selected value or empty
  const displayValue = value || "";

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={isOpen ? searchTerm : displayValue}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleInputFocus}
        placeholder=""
        readOnly={!isOpen}
        className="w-full border-2 border-[#1442dc] rounded-full px-6 h-12 bg-white text-gray-900 focus:outline-none focus:ring-0 peer cursor-pointer"
        style={{
          outline: "none",
          boxShadow: "none",
        }}
      />
      <label
        className={`absolute left-5 bg-white px-2 text-medium font-normal text-blue-600 transition-all pointer-events-none ${
          displayValue || isOpen
            ? "top-[-10px] translate-y-0 text-xs"
            : "top-1/2 -translate-y-1/2 text-sm text-gray-400 font-normal"
        }`}
      >
        {label}
      </label>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-blue-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className="px-6 py-3 hover:bg-blue-50 cursor-pointer transition-colors first:rounded-t-2xl last:rounded-b-2xl text-gray-900"
                style={{
                  color: "#111827",
                }}
              >
                {option}
              </div>
            ))
          ) : (
            <div
              className="px-6 py-3 text-gray-500 italic"
              style={{ color: "#6b7280" }}
            >
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
