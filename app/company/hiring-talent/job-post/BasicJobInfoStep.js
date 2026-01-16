

import SearchableDropdownFormField from "@/app/components/common/FormField/SearchableDropdownFormField";
import FormDropdown from "../../../components/FormDropdown";
import {
  jobTitles,
  roleTypeList,
  availabilityOptions,
} from "../../../data/data";
import FormDropdownFormField from "../../../components/common/FormField/FormDropdownFormField"

export default function BasicJobInfoStep({ data, onChange, errors = {} }) {
  return (
    <div className="space-y-4">

      {/* Job Title */}
      <div className="space-y-8">
        <div>
     <SearchableDropdownFormField
        // label="Job Title"
        value={data.jobTitle}
        onChange={(value) => onChange("jobTitle", value)}
        options={jobTitles}
        placeholder="Job Title"
        
      />
      {errors.jobTitle && (
        <p className="text-red-500 text-sm px-4 mt-2">{errors.jobTitle}</p>
      )}
        </div>


<div>
     <FormDropdownFormField
        // label="Work Mode Preference"
        name="availability"
        value={data.availability}
        onChange={(e) => onChange("availability", e.target.value)}
        options={availabilityOptions}
         placeholder="Select Location"
      
      />
      {errors.availability && (
        <p className="text-red-500 text-sm  px-4 mt-2">{errors.availability}</p>
      )}


</div>

                {/* <textarea
            // value={contact.address}
            // onChange={(e) => updateField("address", e.target.value)}
            maxLength={250}
            rows={4}
            placeholder="Add address"
            className="w-full !bg-[#f0f0f0] rounded-lg px-3 py-3 border border-gray-400 resize-none"
          /> */}

      <div>

      <>
    <SearchableDropdownFormField
      value={data.location}
      onChange={(value) => onChange("location", value)}
      options={["Delhi", "Bangalore", "Mumbai", "Pune"]}
      placeholder="Job Location"
    />

    {errors.location && (
      <p className="text-sm text-red-500  px-4 mt-2">{errors.location}</p>
    )}
  </>
      </div>

  <div>
   {/* Employment Type */}
      <SearchableDropdownFormField
        // label="Preferred Role Type"
        value={data.employmentType}
        onChange={(value) => onChange("employmentType", value)}
        options={roleTypeList}
        placeholder="Full-time / Internship"
      />
      {errors.employmentType && (
        <p className="text-red-500 text-sm">
          {errors.employmentType}
        </p>
      )}
  </div>
   
      </div>
    

      {/* Work Mode */}
    

    </div>
  );
}
