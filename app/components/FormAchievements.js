
import React, { useState } from "react";
import FormField from "./FormField";
import { InputWithCount } from "./FormInput";

export default function FormAchievements({
  label,
  icon,
  values = [],
  onChange,
  buttonshow = true,
  maxItemLength = 100,
  maxVisible = 5, // ✅ kitne items chips ke form me dikhenge
  visibleItemsclassName="",
}) {
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input.trim()) {
      onChange([...(values || []), input.trim()]);
      setInput("");
    }
  };

  const removeItem = (index) => {
    onChange(values.filter((_, i) => i !== index));
  };

  // ✅ slicing logic
  const visibleItems = values.slice(0, maxVisible);
  const remainingCount = values.length - maxVisible;

  return (
    <FormField label={label} icon={icon}>
      <div className="space-y-2">
        {/* Input + Add Button */}
        <div className="flex gap-2">
          <InputWithCount
            value={input}
            onChange={(val) => setInput(val)}
            placeholder="Add an item"
            showCount={false}
            maxLength={maxItemLength}
            className={`flex-1 ${buttonshow ? "rounded-r-none" : "rounded-full"}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
          />

          {buttonshow && (
            <button
              type="button"
              onClick={addItem}
              className="px-4 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Add
            </button>
          )}
        </div>

        {/* Items as Chips */}
        <div className="flex flex-wrap gap-2">
          {visibleItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-3 py-1  border border-gray-200 rounded-full ${visibleItemsclassName}`}
            >
              <span className="text-sm text-gray-300">{item}</span>
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="text-gray-300 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>
          ))}

          {/* ✅ Show "+X more" */}
          {remainingCount > 0 && (
            <div className="flex items-center px-3 py-1 border border-gray-300 text-gray-200 rounded-full text-sm">
              +{remainingCount} more
            </div>
          )}
        </div>
      </div>
    </FormField>
  );
}
