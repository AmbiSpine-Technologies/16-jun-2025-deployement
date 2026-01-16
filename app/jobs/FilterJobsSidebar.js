

"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Filter } from "lucide-react";
import { MdFilterAltOff } from "react-icons/md";

import SelectField from "../components/FormSelect";
import {InputWithCount} from "../components/FormInput";
import CheckboxField from "../components/CheckboxField";
import LocationFilter from "./LocationFilter";

const locationSuggestions = [
  "New Delhi, India",
  "Mumbai, India",
  "Bangalore, India",
  "Hyderabad, India",
  "Pune, India",
  "Chennai, India",
  "London, UK",
  "New York, USA",
  "Tokyo, Japan",
];

const initialFilters = {
  location: "",
  salary: [0, 100],
  jobType: {
    fulltime: false,
    parttime: false,
    contract: false,
    internship: false,
    other: false,
  },
  otherJobType: "",
  experienceLevel: "",
  workMode: "",
  industry: "",
  otherIndustry: "",
};

export default function FilterSidebar({ onApplyFilters, onClearFilters }) {
  const [filters, setFilters] = useState(initialFilters);
  const [applied, setApplied] = useState(false);

  /**
   * ✅ FIX: Prevent infinite loop
   * - We only call onApplyFilters when filters actually change,
   *   not on every render.
   */
  useEffect(() => {
    const isModified =
      JSON.stringify(filters) !== JSON.stringify(initialFilters);

    setApplied(isModified);

    if (isModified && typeof onApplyFilters === "function") {
      onApplyFilters(filters);
    }
  }, [filters]);

  /** ✅ useCallback → prevent re-creation of handlers on each render */
  const handleChange = useCallback(
    (field) => (e) => {
      setFilters((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (field) => (e) => {
      setFilters((prev) => ({
        ...prev,
        jobType: { ...prev.jobType, [field]: e.target.checked },
      }));
    },
    []
  );

  /** ✅ Clear filters with single handler */
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setApplied(false);
    if (typeof onClearFilters === "function") {
      onClearFilters(initialFilters);
    }
  }, [onClearFilters]);

  /** ✅ useMemo for autocomplete */
  const filteredSuggestions = useMemo(() => {
    if (!filters.location) return locationSuggestions;
    return locationSuggestions.filter((loc) =>
      loc.toLowerCase().includes(filters.location.toLowerCase())
    );
  }, [filters.location]);

  return (
    <div className="w-full bg-white  rounded-2xl px-5 py-6 my-6 h-fit border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Filter size={18} /> Filters
        </h2>
        {applied && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 flex items-center gap-1 hover:text-red-700"
          >
            <MdFilterAltOff size={16} /> Clear
          </button>
        )}
      </div>

      {/* Location */}
      <LocationFilter
        value={filters.location}
        onChange={(val) =>
          setFilters((prev) => ({ ...prev, location: val }))
        }
        suggestions={filteredSuggestions}
      />

      {/* Salary */}
      <div className="mt-5">
        <label className="text-sm font-medium">Max Salary (LPA)</label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={filters.salary[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              salary: [prev.salary[0], Number(e.target.value)],
            }))
          }
          className="w-full mt-2 accent-blue-600"
        />
        <p className="text-xs text-gray-600">
          {filters.salary[0]}L – {filters.salary[1]}L
        </p>
      </div>

      {/* Job Type */}
      <div className="my-3">
        <label className="">Job Type</label>
        {["fulltime", "parttime", "contract", "internship"].map((type) => (
          <CheckboxField
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            name={type}
            checked={filters.jobType[type]}
            onChange={handleCheckboxChange(type)}
          />
        ))}
      </div>

<div className="space-y-2">
{/* Experience Level */}
      <SelectField
        label="Experience Level"
        options={[
          { label: "Select Experience", value: "" },
          { label: "Fresher", value: "fresher" },
          { label: "1-2 Years", value: "1-2" },
          { label: "3-5 Years", value: "3-5" },
          { label: "5+ Years", value: "5plus" },
        ]}
        value={filters.experienceLevel}
        onChange={handleChange("experienceLevel")}
      />

      {/* Work Mode */}
      <SelectField
        label="Work Mode"
        options={[
          { label: "Select Mode", value: "" },
          { label: "Remote", value: "remote" },
          { label: "Onsite", value: "onsite" },
          { label: "Hybrid", value: "hybrid" },
        ]}
        value={filters.workMode}
        onChange={handleChange("workMode")}
      />

      {/* Industry */}
      <SelectField
        label="Industry"
        options={[
          { label: "Select Industry", value: "" },
          { label: "IT", value: "it" },
          { label: "Finance", value: "finance" },
          { label: "Marketing", value: "marketing" },
          { label: "Healthcare", value: "healthcare" },
          { label: "Education", value: "education" },
          { label: "Other", value: "other" },
        ]}
        value={filters.industry}
        onChange={handleChange("industry")}
      />
      {filters.industry === "other" && (
        <InputWithCount
          placeholder="Specify other industry..."
          value={filters.otherIndustry}
          onChange={handleChange("otherIndustry")}
          InputWithCountClass="text-sm !py-1.5 mt-2"
        />
      )}
</div>
      
    </div>
  );
}
