
"use client";
import React, { useState } from "react";
import FormDropdown from "../../../components/FormDropdown";
import SearchableDropdown from "../../../components/SearchableDropdown";
import { jobTitles, jobTitleToRoleMapping, allCurrentRoles, staticSkillOptions } from "../../../data/data";

export default function RecentExperienceStep({ data, updateData, errors, clearError }) {
  const recentExperience = data.recentExperience || {};
  
  // ✅ Local state for typing (taaki har keystroke par skill add na ho)
  const [skillInput, setSkillInput] = useState(""); 
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (field, value) => {
    updateData("recentExperience", {
      ...recentExperience,
      [field]: value,
    });

    if (clearError && errors[field]) {
      clearError(field);
    }
  };

  // ✅ 1. Skill Add Logic (Sirf Tab Call hoga jab Enter dabega ya click hoga)
  const addSkill = (skillToAdd) => {
    const trimmedSkill = skillToAdd.trim();
    if (!trimmedSkill) return;

    const currentSkills = recentExperience.skills || [];
    
    // Duplicate check
    if (!currentSkills.includes(trimmedSkill)) {
      const newSkills = [...currentSkills, trimmedSkill];
      handleChange("skills", newSkills);
    }
    setSkillInput(""); // Clear input box
    setShowSuggestions(false); // Hide dropdown
  };

  // ✅ 2. Handle Enter Key
 
  const removeSkill = (skillToRemove) => {
    const currentSkills = recentExperience.skills || [];
    const newSkills = currentSkills.filter(skill => skill !== skillToRemove);
    handleChange("skills", newSkills);
  };

  const getSuggestedRoles = () => {
    if (!recentExperience.jobTitle) return allCurrentRoles;
    const suggested = jobTitleToRoleMapping[recentExperience.jobTitle];
    if (suggested) {
      const remaining = allCurrentRoles.filter((role) => !suggested.includes(role));
      return [...suggested, ...remaining.sort()];
    }
    return allCurrentRoles;
  };

  const experienceOptions = [
    { value: "", label: "Select Experience" },
    { value: "0-1 Year", label: "0-1 Year" },
    { value: "1-3 Year", label: "1-3 Year" },
    { value: "3-5 Year", label: "3-5 Year" },
    { value: "5 + Year", label: "5 + Year" },
  ];

  const ErrorMsg = ({ field }) => (
    errors[field] ? <p className="text-red-500 text-xs mt-1 ml-2">{errors[field]}</p> : null
  );
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Form submit hone se rokein

        // Suggestions ko filter karein (wahi logic jo dropdown mein hai)
        const filteredSuggestions = staticSkillOptions.filter(
            s => s.toLowerCase().includes(skillInput.toLowerCase()) && 
            !recentExperience.skills?.includes(s)
        );

        if (filteredSuggestions.length > 0) {
            // Case 1: Agar matches mil rahe hain, toh pehla wala select karo
            addSkill(filteredSuggestions[0]);
        } else if (skillInput.trim() !== "") {
            // Case 2: Agar match nahi hai par user ne kuch naya type kiya hai
            addSkill(skillInput.trim());
        }
        
        setShowSuggestions(false);
    }
};



  return (
    <div className="space-y-4">
      
      {/* Job Title */}
      <div>
        <SearchableDropdown
            label="Job Title"
            value={recentExperience.jobTitle || ""}
            onChange={(value) => handleChange("jobTitle", value)}
            options={jobTitles}
            placeholder="Type or select job title..."
        />
        <ErrorMsg field="jobTitle" />
      </div>

      {/* Current Role */}
      <div>
        <SearchableDropdown
            label="Current Role"
            value={recentExperience.currentRole || ""}
            onChange={(value) => handleChange("currentRole", value)}
            options={getSuggestedRoles()}
            placeholder="Type or select current role..."
        />
        <ErrorMsg field="currentRole" />
      </div>

      {/* Experience Years */}
      <div>
        <FormDropdown
            label="Experience (Year)"
            name="experienceYears"
            value={recentExperience.experienceYears || ""}
            onChange={(e) => handleChange("experienceYears", e.target.value)}
            options={experienceOptions}
        />
        <ErrorMsg field="experienceYears" />
      </div>

      {/* ✅ Fixed Skills Section (Custom Input Logic) */}
   
        <div className="relative">
      
        
        <div className="relative group">
  <input
    type="text"
    value={skillInput}
    onChange={(e) => {
        setSkillInput(e.target.value);
        setShowSuggestions(true);
    }}
    onFocus={() => setShowSuggestions(true)}
    // Solution: Blur ko handle karne ke liye mouse down use karein ya handle manually
    onBlur={() => {
       // Isko thoda extra delay dena padta hai ya drop down par onMouseDown use karna padta hai
       setTimeout(() => setShowSuggestions(false), 250); 
    }}
    onKeyDown={handleKeyDown}
    placeholder=" "
    className="w-full border-2 border-[#0013E3] rounded-full px-6 h-12 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 peer transition-all"
  />
  
  {/* ... label code ... */}
  <label className="absolute top-[-10px] left-5 bg-white px-2 text-xs font-semibold text-[#0013E3] transition-all pointer-events-none 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal 
        peer-focus:top-[-10px] peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[#0013E3] peer-focus:font-semibold">
        Skills (Type & Press Enter)
    </label>
  {/* Suggestions Dropdown */}
  {showSuggestions && skillInput && (
    <div className="absolute z-50 w-full bg-white rounded-2xl mt-2 max-h-60 overflow-y-auto shadow-xl border border-gray-100">
        {staticSkillOptions
            .filter(s => s.toLowerCase().includes(skillInput.toLowerCase()) && !recentExperience.skills?.includes(s))
            .map((suggestion, index) => (
                <div 
                    key={index} 
                    // Solution: Use onMouseDown instead of onClick
                    // onMouseDown click se pehle trigger hota hai, toh blur isse cancel nahi karega
                    onMouseDown={(e) => {
                        e.preventDefault(); // prevents blur from stealing focus
                        addSkill(suggestion);
                    }}
                    className={`px-5 py-2.5 cursor-pointer text-gray-700 transition-colors hover:bg-blue-50
                        ${index === 0 ? 'bg-blue-50/50 font-medium' : ''}`}
                >
                    {suggestion}
                </div>
            ))}
        
        {/* "Add New" Logic */}
        {staticSkillOptions.filter(s => s.toLowerCase().includes(skillInput.toLowerCase())).length === 0 && (
            <div 
                onMouseDown={(e) => {
                    e.preventDefault();
                    addSkill(skillInput);
                }}
                className="px-5 py-2.5 text-blue-600 font-medium cursor-pointer hover:bg-blue-50"
            >
                Add new skill: "{skillInput}"
            </div>
        )}
    </div>
  )}
</div>
        {/* Selected Skills Display (Tags) */}
        <div className="flex flex-wrap gap-2 my-2">
            {recentExperience.skills?.map((skill, index) => (
            <span key={index} className=" border text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                {skill}
                <button 
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-blue-500 hover:text-blue-900 font-bold focus:outline-none"
                >
                ×
                </button>
            </span>
            ))}
        </div>
        <ErrorMsg field="skills" />
      </div>

      {/* Portfolio (Optional) */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            name="portfolio"
            value={recentExperience.portfolio || ""}
            onChange={(e) => handleChange("portfolio", e.target.value)}
            placeholder=""
            className="w-full border-2 border-[#1442dc] rounded-full px-6 h-12 pr-12 bg-white text-gray-900 focus:outline-none focus:ring-0 peer"
            style={{ outline: "none", boxShadow: "none" }}
          />
          <label className="absolute top-[-10px] left-5 bg-white px-2 text-xs font-semibold text-blue-600 transition-all pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:top-[-10px] peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:font-semibold">
            Portfolio/ GitHub/ LinkedIn (Optional)
          </label>
          <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl font-bold hover:text-blue-800">
            +
          </button>
        </div>
      </div>

    </div>
  );
}