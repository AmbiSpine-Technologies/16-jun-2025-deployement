"use client";
// import FormField from "../components/FormField";
import MonthYearSelect from "../components/MonthYearSelect"; // ✅ import your reusable component

const DateRangeSelector = ({
  startMonth,
  startYear,
  endMonth,
  endYear,
  currentlyWorking,
  onDateChange,
  workingText = "I am currently working here",
}) => {
  const handleStartChange = ({ type, value }) => {
    if (type === "month") onDateChange("startMonth", value);
    if (type === "year") onDateChange("startYear", value);
  };

  const handleEndChange = ({ type, value }) => {
    if (type === "month") onDateChange("endMonth", value);
    if (type === "year") onDateChange("endYear", value);
  };

  return (
    <div className="space-y-5">
      {/* ✅ START DATE */}
      <MonthYearSelect
        label="Start Date"
        value={{ month: startMonth, year: startYear }}
        onChange={handleStartChange}
        startYear={1980}
        endYear={new Date().getFullYear() + 2}
        
      />

      {/* ✅ END DATE */}
      <div
        className={`${
          currentlyWorking ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        <MonthYearSelect
          label="End Date"
          value={{ month: endMonth, year: endYear }}
          onChange={handleEndChange}
          startYear={1980}
          endYear={new Date().getFullYear() + 2}
        />
      </div>

      {/* ✅ CURRENTLY WORKING CHECKBOX */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="currently-working"
          checked={currentlyWorking}
          onChange={(e) => onDateChange("currentlyWorking", e.target.checked)}
          className="rounded accent-indigo-500"
        />
        <label
          htmlFor="currently-working"
          className="text-sm text-gray-600 font-medium cursor-pointer"
        >
          {workingText}
        </label>
      </div>
    </div>
  );
};

export default DateRangeSelector;
