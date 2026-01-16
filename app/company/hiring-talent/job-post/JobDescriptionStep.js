
import { useState, useEffect, useMemo } from "react";
import MultiSkillInput from "./MultiSkillInput"; 
import { industryList, jobTitles as allJobTitles } from "../../../data/data"; // Remove skillOptions import if defined locally
import { suggestSkillsFromDescription } from "../../../utils/skillMatcher";
import SearchableDropdown from "../../../components/SearchableDropdown"; 
import RichTextEditorInput from "../../../components/RichTextEditorInput";
import { InputBox } from "@/app/components/FormInput2";
import SearchableDropdownFormField from "@/app/components/common/FormField/SearchableDropdownFormField";

import { staticSkillOptions } from "../../../data/data";



export default function JobDescriptionStep({
  data,
  onChange,
  errors = {},
}) {
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  // AI Logic: Extract text from HTML to find skills
  useEffect(() => {
    const timer = setTimeout(() => {
        const stripHtml = (html) => {
            if (!html) return "";
            const tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || "";
        };
        
        const plainTextResp = stripHtml(data.responsibilities);
        const plainTextSum = stripHtml(data.jobSummary);
        
        const suggestions = suggestSkillsFromDescription(`${plainTextSum} ${plainTextResp}`);
        setSuggestedSkills(suggestions);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [data.responsibilities, data.jobSummary]);

  // Combine Suggestions with Static Skills
  const combinedSkillOptions = useMemo(() => {
    return Array.from(new Set([...suggestedSkills, ...staticSkillOptions]));
  }, [suggestedSkills]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1️⃣ Job Role / Summary */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Job Role / Summary <span className="text-red-500">*</span></label>
        <RichTextEditorInput 
            value={data.jobSummary}
            onChange={(val) => onChange("jobSummary", val)}
            placeholder="Write a short overview of the role..."
            minWords={10}  // 👈 Added Min Words
            maxWords={500}
        />
        {/* Check if error exists from parent validation */}
        {errors.jobSummary && <p className="text-red-500 text-xs">{errors.jobSummary}</p>}
      </div>

      {/* 2️⃣ Key Responsibilities */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Key Responsibilities <span className="text-red-500">*</span></label>
        <RichTextEditorInput 
            value={data.responsibilities}
            onChange={(val) => onChange("responsibilities", val)}
            placeholder="Write detailed responsibilities here..."
            minWords={10} // 👈 Added Min Words
            maxWords={500}
        />
        {errors.responsibilities && <p className="text-red-500 text-xs">{errors.responsibilities}</p>}
      </div>

      {/* 3️⃣ Skills */}
      <div>
        <MultiSkillInput 
          
          value={data.skills} 
          onChange={(newSkillsArray) => onChange("skills", newSkillsArray)} 
          options={combinedSkillOptions}
          error={errors.skills}
          placeholder="e.g. React, Node.js (Press Enter)"
        />
        
        {/* Suggestion Visual Cue */}
        {suggestedSkills.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            <span className="font-semibold text-green-600">✨ Suggested:</span>{" "}
            {suggestedSkills.slice(0, 5).join(", ")}
          </div>
        )}
      </div>


      <div>
        <SearchableDropdownFormField
            // label="Industry / Department"
            value={data.industry}
            onChange={(value) => onChange("industry", value)}
            options={industryList}
            placeholder="Select Industry"
        />
        {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
      </div>
      
    </div>
  );
}