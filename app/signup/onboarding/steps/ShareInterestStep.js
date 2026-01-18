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