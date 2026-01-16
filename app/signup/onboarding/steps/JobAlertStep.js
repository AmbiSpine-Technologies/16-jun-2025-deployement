// "use client";
// import React from "react";
// import FormDropdown from "../../../components/FormDropdown";
// import SearchableDropdown from "../../../components/SearchableDropdown";

// export default function JobAlertStep({ data, updateData,  errors, clearError  }) {
//   const careerExpectations = data.careerExpectations || {};
//   const jobAlert = data.jobAlertPreferences || {};

//   const handleChange = (field, value) => {
//     updateData("jobAlertPreferences", {
//       ...jobAlert,
//       [field]: value,
//     });

//      if (clearError && errors[field]) {
//       clearError(field);
//     }
//   };

//   const handleSalaryChange = (field, value) => {
//     updateData("jobAlertPreferences", {
//       ...jobAlert,
//       salaryRange: {
//         ...jobAlert.salaryRange,
//         [field]: value ? parseInt(value) : null,
//       },
//     });
//   };

//   const handleMultiSelect = (field, value) => {
//     const currentValues = jobAlert[field] || [];
//     const newValues = currentValues.includes(value)
//       ? currentValues.filter((v) => v !== value)
//       : [...currentValues, value];
//     handleChange(field, newValues);
//   };

//   const roleTypeList = [
//     "Internship",
//     "Part-time",
//     "Full-time",
//     "Contract",
//     "Freelance",
//   ];

//   const salaryRangeOptions = [
//     { value: "", label: "Select Salary Range" },
//     { value: "0-50000", label: "₹0 - ₹50,000" },
//     { value: "50000-100000", label: "₹50,000 - ₹1,00,000" },
//     { value: "100000-300000", label: "₹1,00,000 - ₹3,00,000" },
//     { value: "300000-500000", label: "₹3,00,000 - ₹5,00,000" },
//     { value: "500000-1000000", label: "₹5,00,000 - ₹10,00,000" },
//     { value: "1000000-1500000", label: "₹10,00,000 - ₹15,00,000" },
//     { value: "1500000-2000000", label: "₹15,00,000 - ₹20,00,000" },
//     { value: "2000000+", label: "₹20,00,000+" },
//   ];

//   // Comprehensive location list for India and worldwide
//   const locationList = [
//     // Indian Metro Cities
//     "Mumbai",
//     "Delhi",
//     "Bangalore",
//     "Hyderabad",
//     "Chennai",
//     "Kolkata",
//     "Pune",
//     "Ahmedabad",
//     "Jaipur",
//     "Surat",
//     "Lucknow",
//     "Kanpur",
//     "Nagpur",
//     "Indore",
//     "Thane",
//     "Bhopal",
//     "Visakhapatnam",
//     "Pimpri-Chinchwad",
//     "Patna",
//     "Vadodara",
//     "Ghaziabad",
//     "Ludhiana",
//     "Agra",
//     "Nashik",
//     "Faridabad",
//     "Meerut",
//     "Rajkot",
//     "Varanasi",
//     "Srinagar",
//     "Aurangabad",
//     "Dhanbad",
//     "Amritsar",
//     "Navi Mumbai",
//     "Allahabad",
//     "Ranchi",
//     "Howrah",
//     "Coimbatore",
//     "Jabalpur",
//     "Gwalior",
//     "Vijayawada",
//     "Jodhpur",
//     "Madurai",
//     "Raipur",
//     "Kota",
//     "Chandigarh",
//     "Guwahati",
//     "Mysore",
//     "Bhubaneswar",
//     "Dehradun",
//     "Kochi",
//     "Noida",

//     // Work Mode Options
//     "Remote",
//     "Work from Home",
//     "Hybrid",
//     "Anywhere in India",

//     // International Cities (for global opportunities)
//     "United States",
//     "United Kingdom",
//     "Canada",
//     "Australia",
//     "Germany",
//     "Singapore",
//     "Dubai",
//     "Netherlands",
//     "Ireland",
//     "New Zealand",
//     "Switzerland",
//     "Sweden",
//     "France",
//     "Japan",
//     "South Korea",
//   ];

//   // Comprehensive target roles list
//   const targetRolesList = [
//     // Engineering & Development
//     "Software Engineer",
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "Mobile Developer",
//     "DevOps Engineer",
//     "Cloud Engineer",
//     "Data Engineer",
//     "Security Engineer",
//     "QA Engineer",
//     "Solutions Architect",
//     "Site Reliability Engineer",

//     // Data & Analytics
//     "Data Scientist",
//     "Data Analyst",
//     "Machine Learning Engineer",
//     "AI Engineer",
//     "Business Intelligence Analyst",
//     "Analytics Manager",

//     // Product & Project Management
//     "Product Manager",
//     "Technical Product Manager",
//     "Project Manager",
//     "Program Manager",
//     "Scrum Master",
//     "Product Owner",

//     // Design
//     "UX Designer",
//     "UI Designer",
//     "Product Designer",
//     "Graphic Designer",
//     "Visual Designer",
//     "Motion Designer",
//     "UX Researcher",

//     // Marketing & Sales
//     "Marketing Manager",
//     "Digital Marketing Specialist",
//     "Content Marketing Manager",
//     "SEO Specialist",
//     "Social Media Manager",
//     "Growth Manager",
//     "Sales Manager",
//     "Sales Executive",
//     "Business Development Manager",
//     "Account Manager",

//     // Content & Creative
//     "Content Writer",
//     "Copywriter",
//     "Technical Writer",
//     "Content Strategist",
//     "Video Editor",
//     "Creative Director",

//     // Business & Strategy
//     "Business Analyst",
//     "Strategy Consultant",
//     "Management Consultant",
//     "Operations Manager",
//     "Business Operations Analyst",

//     // Finance & Accounting
//     "Financial Analyst",
//     "Accountant",
//     "Finance Manager",
//     "Investment Analyst",
//     "Tax Consultant",
//     "Auditor",

//     // HR & Administration
//     "HR Manager",
//     "Talent Acquisition Specialist",
//     "Recruiter",
//     "HR Business Partner",
//     "Learning & Development Manager",

//     // Customer & Support
//     "Customer Success Manager",
//     "Customer Support Specialist",
//     "Technical Support Engineer",
//     "Client Relations Manager",

//     // Other
//     "Intern",
//     "Management Trainee",
//     "Associate",
//     "Consultant",
//   ];

//     const ErrorMsg = ({ field }) => (
//     errors[field] ? <p className="text-red-500 text-xs mt-1 ml-2">{errors[field]}</p> : null
//   );


//   return (
//     <div className="space-y-3">
//       <SearchableDropdown
//         label="Preferred Role Type"
//         value={jobAlert.preferredRoleTypes || ""}
//         onChange={(value) => handleChange("preferredRoleTypes", value)}
//         options={roleTypeList}
//         placeholder="Select role type..."

//       />

//       <SearchableDropdown
//         label="Location Preference"
//         value={jobAlert.locationPreference || ""}
//         onChange={(value) => handleChange("locationPreference", value)}
//         options={locationList}
//         placeholder="Type city name or select..."
//       />

//       <SearchableDropdown
//         label="Target Role"
//         value={jobAlert.targetRole || ""}
//         onChange={(value) => handleChange("targetRole", value)}
//         options={targetRolesList}
//         placeholder="Type or select target role..."
//       />

//       <FormDropdown
//         label="Expected Salary Range (Annual CTC)"
//         name="salaryRange"
//         value={jobAlert.salaryRange?.range || ""}
//         onChange={(e) => {
//           const range = e.target.value;
//           handleChange("salaryRange", { range });
//         }}
//         options={salaryRangeOptions}
//       />

//       <div className="flex items-center justify-between">
//         <div className="flex-1">
//           <label className="text-gray-900 font-medium text-base block mb-1">
//             Recruiter Visibility
//           </label>
        
//         </div>
//         <button
//           type="button"
//           onClick={() => {
//             updateData("careerExpectations", {
//               ...careerExpectations,
//               recruiterVisibility: !careerExpectations.recruiterVisibility,
//             });
//           }}
//           className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
//             careerExpectations.recruiterVisibility
//               ? "bg-blue-600"
//               : "bg-gray-300"
//           }`}
//         >
//           <span
//             className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
//               careerExpectations.recruiterVisibility
//                 ? "translate-x-6"
//                 : "translate-x-1"
//             }`}
//           />
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";
import React from "react";
import FormDropdown from "../../../components/FormDropdown";
import SearchableDropdown from "../../../components/SearchableDropdown";
import { availabilityOptions } from "@/app/data/data";
export default function JobAlertStep({ data, updateData, errors, clearError }) {
  // const careerExpectations = data.careerExpectations || {};
  const jobAlert = data.jobAlertPreferences || {};

 const handleChange = (field, value) => {
  updateData("jobAlertPreferences", {
    ...jobAlert,
    [field]:
      field === "preferredRoleTypes"
        ? Array.isArray(value) ? value : [value]
        : value,
  });

  if (clearError && errors[field]) {
    clearError(field);
  }
};

  // ✅ Fixed Salary Handling to match Parent State Structure { min, max }
 const handleSalaryChange = (e) => {
  const value = e.target.value;

  let min = null;
  let max = null;

  if (value) {
    if (value.includes("-")) {
      const [minStr, maxStr] = value.split("-");
      min = Number(minStr);
      max = Number(maxStr);
    } else if (value.includes("+")) {
      min = Number(value.replace("+", ""));
      max = null;
    }
  }

  updateData("jobAlertPreferences", {
    ...jobAlert,
    salaryRange: {
      min,
      max,
      currency: "USD",
    },
  });
};


  const roleTypeList = [ "Internship", "Part-time", "Full-time", "Contract", "Freelance" ];

  const salaryRangeOptions = [
    { value: "", label: "Select Salary Range" },
    { value: "0-50000", label: "₹0 - ₹50,000" },
    { value: "50000-100000", label: "₹50,000 - ₹1,00,000" },
    { value: "100000-300000", label: "₹1,00,000 - ₹3,00,000" },
    { value: "300000-500000", label: "₹3,00,000 - ₹5,00,000" },
    { value: "500000-1000000", label: "₹5,00,000 - ₹10,00,000" },
    { value: "1000000-1500000", label: "₹10,00,000 - ₹15,00,000" },
    { value: "1500000-2000000", label: "₹15,00,000 - ₹20,00,000" },
    { value: "2000000+", label: "₹20,00,000+" },
  ];

const availabilityOptionsloc = [
    { value: "Remote", label: "Remote" },
    { value: "Online", label: "Online" },
    { value: "Hybrid", label: "Hybrid" },

]
  const locationList = [ "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai", "Kolkata", "Remote", "Hybrid" ]; // (Shortened for brevity, keep your full list)
  const targetRolesList = [ "Software Engineer", "Product Manager", "Data Scientist", "Designer", "Marketing Manager" ]; // (Shortened for brevity)

  const ErrorMsg = ({ field }) => (
    errors[field] ? <p className="text-red-500 text-xs mt-1 ml-2">{errors[field]}</p> : null
  );
  
  return (
    <div className="space-y-3">
      
      {/* Preferred Role Type */}
      <div>
        <SearchableDropdown
            label="Preferred Role Type"

             value={jobAlert.preferredRoleTypes?.[0] || ""}
  onChange={(value) =>
    handleChange(
      "preferredRoleTypes",
      Array.isArray(value) ? value : [value]
    )
  }
            options={roleTypeList}
            placeholder="Select role type..."
        />
        <ErrorMsg field="preferredRoleTypes" />
      </div>

      {/* Location Preference */}
      <div className="space-y-3">
        <FormDropdown
            label="Location Preference"
            value={jobAlert.locationPreference || ""}
            onChange={(e) => handleChange("locationPreference", e.target.value)}
            options={availabilityOptionsloc}
            placeholder="Type city name or select..."
        />
        
  
        <ErrorMsg field="locationPreference" />
      </div>

      {/* Target Role */}
      <div>
        <SearchableDropdown
            label="Target Role"
            value={jobAlert.targetRole || ""}
            onChange={(value) => handleChange("targetRole", value)}
            options={targetRolesList}
            placeholder="Type or select target role..."
        />
        <ErrorMsg field="targetRole" />
      </div>

      {/* Salary Range */}
      <div>
            <FormDropdown
  label="Expected Salary Range (Annual CTC)"
  name="salaryRange"
  value={
    jobAlert.salaryRange?.min !== null && jobAlert.salaryRange?.max !== null
      ? `${jobAlert.salaryRange.min}-${jobAlert.salaryRange.max}`
      : jobAlert.salaryRange?.min !== null
      ? `${jobAlert.salaryRange.min}+`
      : ""
  }
  onChange={handleSalaryChange}
  options={salaryRangeOptions}
/>
        <ErrorMsg field="salaryRange" />
      </div>

      {/* Recruiter Visibility Toggle */}
    <div className="flex items-center justify-between">
        <label className="text-gray-900 font-medium text-base">
          Recruiter Visibility
        </label>

        <button
          type="button"
          onClick={() =>
            handleChange(
              "recruitvisibility",
              !jobAlert.recruitvisibility
            )
          }
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
            jobAlert.recruitvisibility ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
              jobAlert.recruitvisibility ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

    </div>
  );
}