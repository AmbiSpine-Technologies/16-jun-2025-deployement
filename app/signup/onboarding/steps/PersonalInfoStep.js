
"use client";
import React from "react";
// Ensure this path is correct!
import LocationSelector from "../../../components/LocationSelector"; 
// Ensure this path is correct!
import FormDropdown from "@/app/components/FormDropdown"; 

export default function PersonalInfoStep({ data, updateData, errors, clearError }) {
  // Safe access
  const personalInfo = data?.personalInfo || {};

  const handleChange = (field, value) => {
    updateData("personalInfo", {
      ...personalInfo,
      [field]: value,
    });
   
    if (clearError) clearError(field);
  };

  const handleLocationChange = (locationData) => {
    updateData("personalInfo", {
      ...personalInfo,
      country: locationData.country,
      state: locationData.state,
      city: locationData.city,
    });
 if (clearError) {
        if(locationData.country) clearError("country");
        if(locationData.state) clearError("state");
        if(locationData.city) clearError("city");
    }
  };

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  const journeyTypeOptions = [
    { value: "", label: "Select" },
    { value: "Student", label: "Student" },
    { value: "Professional / Jobseeker", label: "Professional / Jobseeker" },
  ];

  const ErrorMsg = ({ field }) => (
    errors[field] ? <p className="text-red-500 text-xs mt-1 ml-2">{errors[field]}</p> : null
  );

  return (
    <div className="space-y-3 w-full">
      <div>
       <LocationSelector
        onLocationChange={handleLocationChange}
        initialData={{
          country: personalInfo.country || "",
          state: personalInfo.state || "",
          city: personalInfo.city || "",
        }}
        errors={errors}
      />

     
      </div>
      
      <div>
   <FormDropdown
        label="Preferred Language"
        name="preferredLanguage"
        value={personalInfo.preferredLanguage || ""}
        onChange={(e) => handleChange("preferredLanguage", e.target.value)}
        options={[
          { value: "", label: "Select Language" },
          { value: "English", label: "English" },
          { value: "Hindi", label: "Hindi" },
        ]}
      />
      <ErrorMsg field="preferredLanguage" />
      </div>
   

      
<div className="relative mt-4">
  {/* Fake placeholder */}
  {!personalInfo.dateOfBirth && (
    <span
      className="absolute left-6 top-1/2 -translate-y-1/2  pb-3 mb-4 bg-[#fff]   text-gray-400 text-sm pointer-events-none"
    >
      DD/MM/YYY
    </span>
  )}

  <input
    type="date"
    name="dateOfBirth"
    value={personalInfo.dateOfBirth || ""}
    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
    className="w-full h-14 px-6 border-2 rounded-full text-sm bg-white text-gray-800 focus:outline-none"
    style={{ borderColor: "#1442dc" }}
  />

  {/* Floating label */}
  <label
    className={`
      absolute left-6 px-2 bg-white font-semibold text-[#1442dc]
      transition-all duration-200 pointer-events-none
      ${
        personalInfo.dateOfBirth
          ? "-top-2 text-xs"
          : "top-1/2 -translate-y-1/2 opacity-0"
      }
    `}
  >
    Date of Birth
  </label>

  <ErrorMsg field="dateOfBirth" />
</div>

      <div>
  <FormDropdown
        label="Gender"
        name="gender"
        value={personalInfo.gender || ""}
        onChange={(e) => handleChange("gender", e.target.value)}
        options={genderOptions}
      />
      <ErrorMsg field="gender" />
      </div>
    
      <div>
 <FormDropdown
        label="Choose what defines your journey now"
        name="journeyType"
        value={personalInfo.journeyType || ""}
        onChange={(e) => handleChange("journeyType", e.target.value)}
        options={journeyTypeOptions}
      />
      <ErrorMsg field="journeyType" />
      </div>
     
    </div>
  );
}