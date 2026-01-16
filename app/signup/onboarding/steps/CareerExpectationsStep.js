"use client";
import React, {useEffect} from "react";
import FormDropdown from "../../../components/FormDropdown";
import SearchableDropdown from "../../../components/SearchableDropdown";
import { availabilityOptions, LookingPosition, industryList, jobRolesList } from "@/app/data/data";

export default function CareerExpectationsStep({ data, updateData, errors, clearError }) {
  const careerExpectations = data.careerExpectations || {};

  // const handleChange = (field, value) => {
  //   updateData("careerExpectations", {
  //     ...careerExpectations,
  //     [field]: value,
  //   });


  //   // ✅ Clear Error when user changes value
  //   if (clearError && errors[field]) {
  //     clearError(field);
  //   }
  // };

  const handleChange = (field, value) => {
  updateData("careerExpectations", {
    ...careerExpectations,
    [field]:
      field === "preferredJobRoles"
        ? Array.isArray(value) ? value : [value] // ✅ FORCE ARRAY
        : value,
  });

  if (clearError && errors[field]) {
    clearError(field);
  }
};
  useEffect(() => {
    if (careerExpectations.lookingForJobOpportunities === undefined) {
      updateData("careerExpectations", {
        ...careerExpectations,
        lookingForJobOpportunities: true, // ✅ DEFAULT TRUE
      });
    }
  }, []);
  // Professional ke liye lookingForJobOpportunities toggle
  const handleJobOpportunityToggle = () => {
    // If undefined, default to true (since they are on this step), otherwise toggle
    const currentValue = careerExpectations.lookingForJobOpportunities !== false; 
    const newValue = !currentValue;
    
    updateData("careerExpectations", {
      ...careerExpectations,
      lookingForJobOpportunities: newValue,
    });
  };

  // Helper component for error messages
  const ErrorMsg = ({ field }) => (
    errors[field] ? <p className="text-red-500 text-xs mt-1 ml-2">{errors[field]}</p> : null
  );

  return (
    <div className="space-y-3">
      
      {/* Career Level */}
      <div>
        <FormDropdown
          label="Looking Position"
          name="LookingPosition"
          value={careerExpectations.LookingPosition || ""}
          onChange={(e) => handleChange("LookingPosition", e.target.value)}
          options={LookingPosition}
        />
        <ErrorMsg field="LookingPosition" />
      </div>

      {/* Industry */}
      <div>
        <SearchableDropdown
          label="Industry"
          value={careerExpectations.industry || ""}
          onChange={(value) => handleChange("industry", value)}
          options={industryList}
          placeholder="Type or select industry..."
        />
        <ErrorMsg field="industry" />
      </div>

      {/* Preferred Job Role */}
      <div >
        {/* <SearchableDropdown
          label="Preferred Job Role"
          value={careerExpectations.preferredJobRoles || ""}
          onChange={(value) => handleChange("preferredJobRoles", value)}
          options={jobRolesList}
          placeholder="Type or select job role..."
        /> */}

        <SearchableDropdown
  label="Preferred Job Role"
  value={careerExpectations.preferredJobRoles?.[0] || ""}
  onChange={(value) => handleChange("preferredJobRoles", value)}
  options={jobRolesList}
  placeholder="Type or select job role..."
/>

        <ErrorMsg field="preferredJobRoles" />
      </div>

      {/* Work Mode / Availability */}
      <div className="">
        <FormDropdown
          label="Work Mode Preference"
          name="availability"
          value={careerExpectations.availability || ""}
          onChange={(e) => handleChange("availability", e.target.value)}
          options={availabilityOptions}
        />
        <ErrorMsg field="availability" />
      </div>

    

<div className="space-y-3 px-2">
  <label className="text-gray-500  text-sm font-medium block">
    Are you looking for job opportunities?
  </label>

  <div className="flex items-center gap-6 px-1">
    {/* YES */}
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="lookingForJobOpportunities"
        value="yes"
        checked={careerExpectations.lookingForJobOpportunities === true}
        onChange={() =>
          handleChange("lookingForJobOpportunities", true)
        }
        className="h-4 w-4 text-blue-600 accent-blue-600 focus:ring-blue-500"
      />
      <span className="text-gray-700">Yes</span>
    </label>

    {/* NO */}
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="lookingForJobOpportunities"
        value="no"
        checked={careerExpectations.lookingForJobOpportunities === false}
        onChange={() =>
          handleChange("lookingForJobOpportunities", false)
        }
        className="h-4 w-4 text-blue-600 accent-blue-600 focus:ring-blue-500"
      />
      <span className="text-gray-700">No</span>
    </label>
  </div>

  {/* Error Message */}
  {errors?.lookingForJobOpportunities && (
    <p className="text-sm text-red-500">
      {errors.lookingForJobOpportunities}
    </p>
  )}
</div>

    </div>
  );
}