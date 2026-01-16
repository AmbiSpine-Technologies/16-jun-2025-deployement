
"use client";
import { useState } from "react";
import { FiTrash2, FiChevronDown, FiChevronUp,  } from "react-icons/fi";
import { InputWithCount } from "../components/FormInput";
import SelectField from "../components/FormSelect";
import DateRangeSelector from "./DateRangeSelector";
import BulletPointsEditor from "./BulletPointsEditor";
import RichTextEditorInput from "../components/RichTextEditorInput";
import AutoSuggestInput from "./AutoSuggestInput";
import LocationIndiaSearchInput from "../components/common/LocationIndiaSearch";

// Company suggestions data with logos
export const companySuggestions = [
  { name: "Google", logo: "https://logo.clearbit.com/google.com", field: "Technology", type: "Multinational" },
  { name: "Infosys", logo: "https://logo.clearbit.com/infosys.com", field: "IT Services", type: "Public" },
  { name: "TCS", logo: "https://logo.clearbit.com/tcs.com", field: "Consulting & Software", type: "Public" },
  { name: "Wipro", logo: "https://logo.clearbit.com/wipro.com", field: "Technology", type: "Public" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", field: "E-Commerce", type: "Multinational" },
  { name: "Accenture", logo: "https://logo.clearbit.com/accenture.com", field: "Consulting", type: "Multinational" },
  { name: "HDFC Bank", logo: "https://logo.clearbit.com/hdfcbank.com", field: "Finance", type: "Private" },
  { name: "Reliance Industries", logo: "https://logo.clearbit.com/reliance.com", field: "Energy & Telecom", type: "Private" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", field: "Technology", type: "Multinational" },
  { name: "IBM", logo: "https://logo.clearbit.com/ibm.com", field: "Technology", type: "Multinational" },
  { name: "Flipkart", logo: "https://logo.clearbit.com/flipkart.com", field: "E-Commerce", type: "Startup" },
  { name: "Byju's", logo: "https://logo.clearbit.com/byjus.com", field: "Education", type: "Startup" },
];

// Job title suggestions with categories
export const jobTitleSuggestions = [
  { name: "Assistant Manager", type: "Management", level: "Mid-Level" },
  { name: "Senior Assistant Manager", type: "Management", level: "Senior" },
  { name: "Operations Manager", type: "Operations", level: "Mid-Level" },
  { name: "Project Manager", type: "Management", level: "Mid-Level" },
  { name: "Human Resource Manager", type: "HR", level: "Mid-Level" },
  { name: "Marketing Executive", type: "Marketing", level: "Entry-Level" },
  { name: "Data Analyst", type: "Analytics", level: "Entry-Level" },
  { name: "Software Engineer", type: "Engineering", level: "Entry-Level" },
  { name: "Frontend Developer", type: "Engineering", level: "Entry-Level" },
  { name: "Backend Developer", type: "Engineering", level: "Entry-Level" },
  { name: "Business Development Executive", type: "Sales", level: "Entry-Level" },
  { name: "Customer Support Associate", type: "Support", level: "Entry-Level" },
  { name: "Team Lead", type: "Management", level: "Mid-Level" },
  { name: "Product Manager", type: "Product", level: "Mid-Level" },
  { name: "Quality Assurance Engineer", type: "Engineering", level: "Entry-Level" },
];

// Industry field suggestions
export const industryFieldSuggestions = [
  "Information Technology",
  "Operations",
  "Human Resources",
  "Marketing",
  "Finance",
  "Sales",
  "Customer Service",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Engineering",
  "Research & Development",
];

// Position types
const EMPLOYMENT_TYPES = [
  { value: "", label: "Select work type" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
];

const WorkExperienceCard = ({
  experience,
  onUpdate,
  onRemove,
  onToggleHidden,
  showErrors = false
}) => {
  const [isOpen, setIsOpen] = useState(!experience.title);

  const handleFieldChange = (field, value) => {
    onUpdate({ ...experience, [field]: value });
  };

  const handleDateChange = (field, value) => {
    onUpdate({ ...experience, [field]: value });
  };

  const handleBulletsChange = (bullets) => {
    if (bullets.length <= 5) {
      onUpdate({ ...experience, bullets });
    }
  };

  // Validate this specific experience card
  const validateCard = () => {
    const cardErrors = {};

    if (!experience.title?.trim()) {
      cardErrors.title = "Job title is required";
    }

    if (!experience.company?.trim()) {
      cardErrors.company = "Company name is required";
    }

    if (!experience.startMonth || !experience.startYear) {
      cardErrors.startDate = "Start date is required";
    }

    if (!experience.currentlyWorking && (!experience.endMonth || !experience.endYear)) {
      cardErrors.endDate = "End date is required when not currently working";
    }

    return cardErrors;
  };

  const cardErrors = validateCard();
  const hasErrors = Object.keys(cardErrors).length > 0;

  return (
    <div
      className={`relative p-4 mb-6 transition-all duration-200 ${experience.hidden
          ? "opacity-50 "
          : hasErrors && showErrors
            ? "border-red-500"
            : ""
        } bg-white`}
    >
      {/* Header with Company Logo */}
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h4 className="font-semibold text-xl text-black">
            {experience.title || "Untitled Position"}
          </h4>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-indigo-400 transition p-2 rounded-lg"
            title={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
          </button>
          {/* <button
            onClick={onToggleHidden}
            className={`p-2 rounded-lg ${experience.hidden ? "text-indigo-400" : "text-gray-400 hover:text-indigo-400"
              }`}
            title={experience.hidden ? "Show" : "Hide"}
          >
            {experience.hidden ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
          </button> */}
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-400 p-2 rounded-lg"
            title="Delete"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="space-y-2 mt-4">
          {/* Job Title with AutoSuggest */}
          <AutoSuggestInput
            label="Job Title *"
            value={experience.title}
            onChange={(value) => handleFieldChange("title", value)}
            suggestions={jobTitleSuggestions}
            placeholder="e.g., Assistant Manager, Developer..."
            error={showErrors && cardErrors.title}
          />

          {/* Company with AutoSuggest */}
          <AutoSuggestInput
            label="Company *"
            value={experience.company}
            onChange={(value) => handleFieldChange("company", value)}
            suggestions={companySuggestions}
            placeholder="e.g., Google, Infosys, Wipro..."
            error={showErrors && cardErrors.company}
          />


          <InputWithCount
            label="Field / Department"
            value={experience.field}
            onChange={(value) => handleFieldChange("field", value)}
            placeholder="Feild / Department"
            maxLength={100}
          />


          {/* Employment Type */}
          <SelectField
            label="Employment Type"
            value={experience.employmentType}
            onChange={(e) => handleFieldChange("employmentType", e.target.value)}
            options={EMPLOYMENT_TYPES}
          />

          {/* Location */}
          <LocationIndiaSearchInput
            label="Location"
            value={experience.location}
            onChange={(value) => handleFieldChange("location", value)}
            placeholder="e.g., Remote, Bengaluru"
            maxLength={100}
          />

          {/* Date Range with Validation */}
          <DateRangeSelector
            startMonth={experience.startMonth}
            startYear={experience.startYear}
            endMonth={experience.endMonth}
            endYear={experience.endYear}
            currentlyWorking={experience.currentlyWorking}
            onDateChange={handleDateChange}
            workingText="Currently working here"
            errors={{
              startDate: showErrors && cardErrors.startDate,
              endDate: showErrors && cardErrors.endDate
            }}
          />


          {/* Role Description */}
          <div>
            <label className="text-sm font-medium text-gray-200 mb-2 block">
              Role Description
            </label>
            <RichTextEditorInput
              value={experience.description}
              onChange={(value) => handleFieldChange("description", value)}
              placeholder="Describe your role, responsibilities, and achievements..."
              small
              maxLength={1000}
              showCharCount={true}
            />
          </div>

          {/* Key Achievements */}
          {/* <BulletPointsEditor
            bullets={experience.bullets || []}
            onChange={handleBulletsChange}
            addButtonText="Add Key Achievement"
            maxBullets={5}
            showCount={true}
          /> */}
        </div>
      )}
    </div>
  );
};

export default WorkExperienceCard;