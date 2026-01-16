
"use client";

import { jobspostexperienceOptions, ctcOptions, educationOptions, jobseducationRolls } from "../../../data/data";
import SearchableDropdownFormField from '../../../components/common/FormField/SearchableDropdownFormField'
import FormDropdownFormField from '../../../components/common/FormField/FormDropdownFormField'
import {FormInputField} from '../../../components/common/FormField/FormInputField';


export default function CandidateRequirementStep({ data, onChange, errors = {} }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
 

      {/* 1. Experience Dropdown (Standard Select) */}
      <div className="w-full">
         <FormDropdownFormField
            name="experience"
            value={data.experience || ""}
            onChange={(e) => onChange("experience", e.target.value)}
            options={jobspostexperienceOptions}
            error={errors.experience} 
            placeholder="Experience (Years)"
          />
          {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
      </div>

     <div className="relative">
        <FormDropdownFormField
            name="education"
            value={data.education || ""}
            options={jobseducationRolls}
            error={errors.experience} 
            placeholder="Qualification"
  onChange={(e) => onChange("education", e.target.value)}
            //  onChange={(val) => onChange("education", val)}

          />
            {/* <SearchableDropdownFormField
               
                placeholder="Qualification / Degree (e.g. B.Tech)"
                value={data.education}
                onChange={(val) => onChange("education", val)}
                options={jobseducationRolls}
            /> */}
            {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
          </div>

       <FormInputField
        
            placeholder="Specialization / Branch (Optional)"
            value={data.specialization || ""} 
            onChange={(e) => onChange("specialization", e.target.value)}
          />
      {/* 3. CTC (Salary) Dropdowns - UPDATED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Min CTC Dropdown */}
        <div>
            <SearchableDropdownFormField
          
              value={data.minSalary || ""}
              // ✅ FIX: SearchableDropdown returns value directly (val), not event (e)
              onChange={(val) => onChange("minSalary", val)} 
              options={ctcOptions}
              placeholder="min salary (CTC)"

            />
            {errors.minSalary && <p className="text-red-500 text-xs mt-1">{errors.minSalary}</p>}
        </div>
        
        {/* Max CTC Dropdown */}
        <div>
            <SearchableDropdownFormField 
              value={data.maxSalary || ""}
              // ✅ FIX: SearchableDropdown returns value directly (val)
              onChange={(val) => onChange("maxSalary", val)}
              options={ctcOptions}
              placeholder="max salary (CTC)"
            />
            {errors.maxSalary && <p className="text-red-500 text-xs mt-1">{errors.maxSalary}</p>}
        </div>

      </div>
      
      <p className="text-xs text-gray-500 -mt-3">
        *Select the annual salary range (LPA = Lakhs Per Annum).
      </p>

    </div>
  );
}

