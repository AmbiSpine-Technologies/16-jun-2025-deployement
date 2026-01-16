"use client";
import React from "react";
import SelectField from "./FormSelect";

// Months list with placeholder
const months = [
  { value: "", label: "-- Select Month --" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function MonthYearSelect({
  label = "Date",
  startYear = 1970,
  endYear = new Date().getFullYear() + 10,
  value = {},
  onChange = () => {},
}) {
  const years = [
    { value: "", label: "-- Select Year --" },
    ...Array.from({ length: endYear - startYear + 1 }, (_, i) => {
      const year = (startYear + i).toString();
      return { value: year, label: year };
    }),
  ];

  return (
    <div className="flex flex-col gap-1">
      {/* ✅ Professional single label */}
      <label className="form-label flex items-center gap-2 text-gray-500 font-medium">{label}</label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          options={months}
          value={value.month || ""}
          onChange={(e) => onChange({ type: "month", value: e.target.value })}
        />
        <SelectField
          options={years}
          value={value.year || ""}
          onChange={(e) => onChange({ type: "year", value: e.target.value })}
        />
      </div>
    </div>
  );
}
