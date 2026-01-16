// "use client";
// import React, { useState } from "react";
// import FormDropdown from "../../../components/FormDropdown";


// export default function ShareInterestStep({ data, updateData }) {
//   const [selectedOptions, setSelectedOptions] = useState({
//     interests: data.interestsAndPreferences?.interests || [],
//     hobbies: data.interestsAndPreferences?.hobbies || [],
//     skills: data.interestsAndPreferences?.skills || [],
//     contentPreference: data.interestsAndPreferences?.contentPreference || "",
//     learningGoals: data.interestsAndPreferences?.learningGoals || [],
//     communityTopics: data.interestsAndPreferences?.communityTopics || [],
//   });

//   const [activeModal, setActiveModal] = useState(null);
//   const [inputValue, setInputValue] = useState("");

//   const options = [
//     {
//       key: "interests",
//       label: "What are your main interests? e.g- Technology, Science",
//       type: "array",
//     },
//     {
//       key: "hobbies",
//       label: "What hobbies do you enjoy? e.g- Reading, PhotoGraphy",
//       type: "array",
//     },
//     {
//       key: "skills",
//       label: "What skills would you like to develop? e.g- Coding, Writing",
//       type: "array",
//     },
//     {
//       key: "contentPreference",
//       label: "What type of content do you prefer?",
//       type: "string",
//     },
//     {
//       key: "learningGoals",
//       label: "What are your learning goals?",
//       type: "array",
//     },
//     {
//       key: "communityTopics",
//       label: "Which community topics interest you?",
//       type: "array",
//     },
//   ];

//   const handleOptionClick = (option) => {
//     setActiveModal(option);
//     setInputValue("");
//   };

//   const handleSave = () => {
//     if (!inputValue.trim()) return;

//     const newSelectedOptions = { ...selectedOptions };

//     if (activeModal.type === "array") {
//       // Add to array if not already present
//       if (!newSelectedOptions[activeModal.key].includes(inputValue.trim())) {
//         newSelectedOptions[activeModal.key] = [
//           ...newSelectedOptions[activeModal.key],
//           inputValue.trim(),
//         ];
//       }
//     } else {
//       newSelectedOptions[activeModal.key] = inputValue.trim();
//     }

//     setSelectedOptions(newSelectedOptions);
//     updateData("interestsAndPreferences", newSelectedOptions);
//     setInputValue("");
//     setActiveModal(null);
//   };

//   const handleRemoveItem = (key, item) => {
//     const newSelectedOptions = { ...selectedOptions };
//     newSelectedOptions[key] = newSelectedOptions[key].filter((i) => i !== item);
//     setSelectedOptions(newSelectedOptions);
//     updateData("interestsAndPreferences", newSelectedOptions);
//   };

//   const isSelected = (key) => {
//     const value = selectedOptions[key];
//     if (Array.isArray(value)) {
//       return value.length > 0;
//     }
//     return !!value;
//   };

//   return (
//     <div className="space-y-3">
//       {options.map((option) => (
//         <div key={option.key}>
//           <button
//             onClick={() => handleOptionClick(option)}
//             className={`w-full h-12 px-6 border-2 border-[#1442dc] rounded-full text-left transition flex items-center justify-between ${
//               isSelected(option.key)
//                 ? "bg-blue-50 text-blue-600 font-semibold"
//                 : "bg-white text-gray-500 hover:bg-blue-50"
//             }`}
//           >
//             <span className="text-sm">{option.label}</span>
//             {isSelected(option.key) && (
//               <span className="text-blue-600 text-lg">✓</span>
//             )}
//           </button>

//           {/* Display selected items */}
//           {option.type === "array" &&
//             selectedOptions[option.key].length > 0 && (
//               <div className="mt-3 flex flex-wrap gap-2">
//                 {selectedOptions[option.key].map((item, idx) => (
//                   <span
//                     key={idx}
//                     className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
//                   >
//                     {item}
//                     <button
//                       onClick={() => handleRemoveItem(option.key, item)}
//                       className="text-blue-600 hover:text-blue-800 font-bold"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}

//           {option.type === "string" && selectedOptions[option.key] && (
//             <div className="mt-3">
//               <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
//                 {selectedOptions[option.key]}
//                 <button
//                   onClick={() => {
//                     const newSelectedOptions = { ...selectedOptions };
//                     newSelectedOptions[option.key] = "";
//                     setSelectedOptions(newSelectedOptions);
//                     updateData("interestsAndPreferences", newSelectedOptions);
//                   }}
//                   className="text-blue-600 hover:text-blue-800 font-bold"
//                 >
//                   ×
//                 </button>
//               </span>
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Modal for input */}
//       {activeModal && (
//         <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl border-2 border-blue-100">
//             <h3 className="text-xl font-semibold text-blue-900 mb-6">
//               {activeModal.label}
//             </h3>

//             <div className="relative mb-6">
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 placeholder=""
//                 className="w-full border-2 border-[#1442dc] rounded-full px-6 h-12 bg-white text-gray-900 focus:outline-none focus:ring-0 peer"
//                 style={{ outline: "none", boxShadow: "none" }}
//                 onKeyPress={(e) => e.key === "Enter" && handleSave()}
//                 autoFocus
//               />
//               <label className="absolute top-[-10px] left-5 bg-white px-2 text-xs font-semibold text-blue-600 transition-all pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:top-[-10px] peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:font-semibold">
//                 Enter your {activeModal.key}
//               </label>
//             </div>

//             <div className="flex gap-5">
//               <button
//                 onClick={handleSave}
//                 className="flex-1 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-semibold shadow-md"
//               >
//                 Add
//               </button>
//               <button
//                 onClick={() => setActiveModal(null)}
//                 className="flex-1 h-10 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import React from "react";
import FormDropdown from "../../../components/FormDropdown";
// import SearchableDropdown from "../../../components/SearchableDropdown"; // Uncomment if you want searchable

export default function ShareInterestStep({ data, updateData, errors, clearError }) {
  const interestData = data.interestsAndPreferences || {};

  const handleChange = (field, value) => {
    updateData("interestsAndPreferences", {
      ...interestData,
      [field]: value,
    });

    if (clearError && errors[field]) {
      clearError(field);
    }
  };

  // Options Data
  const roleIntentionOptions = [
    { value: "", label: "Select Intention" },
    { value: "Explore and learn", label: "Explore and learn" },
    { value: "Share content or ideas", label: "Share content or ideas" },
    { value: "Build an audience", label: "Build an audience" },
    { value: "Collaborate or join communities", label: "Collaborate or join communities" },
  ];

  const contentStyleOptions = [
    { value: "", label: "Select Style Preference" },
    { value: "Text", label: "Text" },
    { value: "Visual", label: "Visual" },
    { value: "Video", label: "Video" },
    { value: "Mixed", label: "Mixed" },
  ];

  const communityClusterOptions = [
    { value: "", label: "Select Community Interest" },
    { value: "Tech & Engineering", label: "Tech & Engineering" },
    { value: "Business & Finance", label: "Business & Finance" },
    { value: "Arts & Design", label: "Arts & Design" },
    { value: "Lifestyle & Culture", label: "Lifestyle & Culture" },
    { value: "Career & Learning", label: "Career & Learning" },
    { value: "Entrepreneurship & Startups", label: "Entrepreneurship & Startups" },
    { value: "Social Causes & Impact", label: "Social Causes & Impact" },
    { value: "Entertainment & Media", label: "Entertainment & Media" },
  ];

  const contributionLevelOptions = [
    { value: "", label: "Select Contribution Level" },
    { value: "I mostly watch", label: "I mostly watch" },
    { value: "I sometimes participate", label: "I sometimes participate" },
    { value: "I occasionally create", label: "I occasionally create" },
    { value: "I regularly create", label: "I regularly create" },
    { value: "I want to become a full-time creator", label: "I want to become a full-time creator" },
  ];

  const skillsToShareOptions = [
    { value: "", label: "Select Skill to Share" },
    { value: "Writing", label: "Writing" },
    { value: "Design", label: "Design" },
    { value: "Editing", label: "Editing" },
    { value: "Teaching / Knowledge Sharing", label: "Teaching / Knowledge Sharing" },
    { value: "Coding", label: "Coding" },
    { value: "Craft / Handmade", label: "Craft / Handmade" },
    { value: "Gaming", label: "Gaming" },
    { value: "Fitness", label: "Fitness" },
    { value: "Storytelling", label: "Storytelling" },
    { value: "Reviews", label: "Reviews" },
    { value: "Motivation", label: "Motivation" },
    { value: "Vlogs", label: "Vlogs" },
    { value: "Finance Tips", label: "Finance Tips" },
  ];

  const professionalIntentOptions = [
    { value: "", label: "Select Professional Intent" },
    { value: "I want to build a portfolio", label: "I want to build a portfolio" },
    { value: "I want to build an audience", label: "I want to build an audience" },
    { value: "I want brand deals", label: "I want brand deals" },
    { value: "I want freelance work", label: "I want freelance work" },
    { value: "I want to earn from content", label: "I want to earn from content" },
    { value: "I just want to learn & explore", label: "I just want to learn & explore" },
  ];

  const ErrorMsg = ({ field }) => (
    errors[field] ? <p className="text-red-500 text-xs mt-1 ml-2">{errors[field]}</p> : null
  );

  return (
    <div className="space-y-4">
      
      {/* 1. Role Intention */}
      <div>
        <FormDropdown
          label="Why You're Joining"
          name="whyJoining"
          value={interestData.whyJoining || ""}
          onChange={(e) => handleChange("whyJoining", e.target.value)}
          options={roleIntentionOptions}
        />
        <ErrorMsg field="whyJoining" />
      </div>

      {/* 2. Content Style Preference */}
      <div>
        <FormDropdown
          label="Content Style Preference"
          name="contentStylePreference"
          value={interestData.contentStylePreference || ""}
          onChange={(e) => handleChange("contentStylePreference", e.target.value)}
          options={contentStyleOptions}
        />
        <ErrorMsg field="contentStylePreference" />
      </div>

      {/* 3. Community Interest Clusters */}
      {/* Note: If you want multi-select, you'll need a custom multi-select component. 
          For FormDropdown, we are treating it as single select for now as per your request. */}
      <div>
        <FormDropdown
          label="Community Interest"
          name="communityInterestClusters"
          // If your backend expects an array, we might need to wrap/unwrap this value
          value={interestData.communityInterestClusters?.[0] || ""} 
          onChange={(e) => handleChange("communityInterestClusters", [e.target.value])} // Saving as array
          options={communityClusterOptions}
        />
        <ErrorMsg field="communityInterestClusters" />
      </div>

      {/* 4. Contribution Level */}
      {/* <div>
        <FormDropdown
          label="Contribution Level (Self-Assessment)"
          name="contributionLevel"
          value={interestData.contributionLevel || ""}
          onChange={(e) => handleChange("contributionLevel", e.target.value)}
          options={contributionLevelOptions}
        />
        <ErrorMsg field="contributionLevel" />
      </div> */}

      {/* 5. Skills or Themes to Share */}
      <div>
        {/* <FormDropdown
          label="Skills or Themes You Want to Share"
          name="skillsOrThemesToShare"
          value={interestData.skillsOrThemesToShare?.[0] || ""}
          onChange={(e) => handleChange("skillsOrThemesToShare", [e.target.value])} // Saving as array
          options={skillsToShareOptions}
        />
        <ErrorMsg field="skillsOrThemesToShare" /> */}
      </div>

      {/* 6. Professional Intent */}
      <div>
        {/* <FormDropdown
          label="Professional Intent"
          name="professionalIntent"
          value={interestData.professionalIntent || ""}
          onChange={(e) => handleChange("professionalIntent", e.target.value)}
          options={professionalIntentOptions}
        />
        <ErrorMsg field="professionalIntent" /> */}
      </div>

    </div>
  );
}