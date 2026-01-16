
"use client";
import { useState, useRef, useEffect } from "react";
import { X, Check } from "lucide-react";
import { FormInputField } from '../../../components/common/FormField/FormInputField';

export default function MultiSkillInput({
  label,
  value = [],
  onChange,
  options = [],
  error,
  placeholder = "Type to search skills..."
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // 👈 Track highlighted item
  const containerRef = useRef(null);

  // Filter Logic
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase()) && 
    !value.includes(option)
  );

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const addSkill = (skill) => {
    if (!skill) return;
    // Prevent duplicates (case-insensitive check)
    if (value.some(s => s.toLowerCase() === skill.toLowerCase())) {
        setQuery("");
        return;
    }
    const updatedSkills = [...value, skill];
    onChange(updatedSkills);
    setQuery("");
    setIsOpen(false);
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = value.filter((skill) => skill !== skillToRemove);
    onChange(updatedSkills);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        // 1️⃣ Select the currently highlighted (first by default) option
        addSkill(filteredOptions[activeIndex]);
      } else if (query.trim()) {
        // 2️⃣ If no options, add the raw query as a custom skill
        addSkill(query.trim());
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full space-y-3" ref={containerRef}>
      <div className="relative">
        <FormInputField
          label={label}
          value={query}
          placeholder={value.length === 0 ? placeholder : "Add more skills..."}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          error={error}
          onKeyDown={handleKeyDown} // 👈 Updated handler
        />

        {isOpen && query.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-sm max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)} // Sync mouse with keyboard
                  onClick={() => addSkill(option)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 hover:cursor-pointer text-gray-700 text-sm transition-colors flex items-center justify-between group ${
                    index === activeIndex ? " text-blue-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))
            ) : (
              <button
                type="button"
                onClick={() => addSkill(query)}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 hover:cursor-pointer text-gray-700 text-sm transition-colors flex items-center justify-between group"
              >
                {query}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Selected Tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-800 border border-blue-200"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 hover:cursor-pointer hover:text-blue-900 focus:outline-none"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}