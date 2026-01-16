// src/components/AutoSuggestInput.js
"use client";
import { useState } from "react";
import { InputWithCount } from "../components/FormInput"; // Import from FormInput

export default function AutoSuggestInput({
  label,
  value,
  onChange,
  suggestions = [],
  placeholder,
  maxLength = 100,
  error,
  showCount = false
}) {
  const [filtered, setFiltered] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleInput = (val) => {
    onChange(val);
    if (val.trim().length > 0) {
      setFiltered(
        suggestions.filter((item) =>
          (item.name || item).toLowerCase().includes(val.toLowerCase())
        )
      );
    } else {
      setFiltered([]);
    }
  };

  const selectSuggestion = (suggestion) => {
    onChange(suggestion.name || suggestion);
    setFiltered([]);
    setFocused(false);
  };

  return (
    <div className="relative">
      <InputWithCount
        label={label}
        type="text"
        value={value}
        onChange={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        placeholder={placeholder}
        maxLength={maxLength}
        error={error}
        showCount={showCount}
      />

      {/* Suggestion Dropdown */}
      {focused && filtered.length > 0 && (
        <div className="absolute z-50 w-full bg-white border  rounded-xl mt-1 max-h-48 overflow-y-auto">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer transition border-b border-[#2E2E2E] last:border-b-0"
              onMouseDown={(e) => e.preventDefault()} // Prevent input blur
              onClick={() => selectSuggestion(item)}
            >
              {item.logo && (
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-5 h-5 rounded-full"
                />
              )}
              <div>
                <p className="text-gray-700 text-sm">{item.name || item}</p>
                {item.field && (
                  <p className="text-gray-400 text-xs">{item.field}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}