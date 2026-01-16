"use client";
import { useState, useMemo } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { resumeTemplates } from "./templateManager";

// Configuration for categories and experience levels
const templateCategories = {
  technology: {
    name: "Technology & IT",
    description: "For software developers, engineers, IT professionals",
    icon: "💻",
  },
  business: {
    name: "Business & Management",
    description: "For managers, executives, business professionals",
    icon: "💼",
  },
  creative: {
    name: "Creative & Design",
    description: "For designers, artists, creative professionals",
    icon: "🎨",
  },
  healthcare: {
    name: "Healthcare",
    description: "For doctors, nurses, healthcare professionals",
    icon: "🏥",
  },
  education: {
    name: "Education",
    description: "For teachers, professors, educational professionals",
    icon: "📚",
  },
  finance: {
    name: "Finance",
    description: "For accountants, analysts, financial professionals",
    icon: "💰",
  },
};

const experienceLevels = {
  entry: {
    name: "Entry Level",
    description: "0-2 years of experience",
  },
  mid: {
    name: "Mid Level",
    description: "2-5 years of experience",
  },
  senior: {
    name: "Senior Level",
    description: "5-10 years of experience",
  },
  executive: {
    name: "Executive",
    description: "10+ years, leadership roles",
  },
};

const primarySkills = [
  "Developer",
  "Engineer",
  "Designer",
  "Manager",
  "Executive",
  "Analyst",
  "Consultant",
  "Specialist",
  "Coordinator",
  "Director",
];

// Template Card Component
function TemplateCard({ template, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(template.id)}
      className={`group cursor-pointer transition-all duration-200 hover:scale-[1.02] rounded-lg relative ${
        isSelected ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
      }`}
    >
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 h-full flex flex-col hover:border-gray-300 transition-all">
        {/* Premium Badge */}
        {template.isPremium && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1 shadow-md">
              <FaCrown className="w-3 h-3" />
              PRO
            </span>
          </div>
        )}

        {/* Template Preview Image */}
        <div className="relative bg-gray-100 aspect-[8.5/11] overflow-hidden">
          {template.img ? (
            <img
              src={template.img}
              className="w-full h-full object-cover object-top"
              alt={template.name}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          )}
          {isSelected && (
            <div className="absolute inset-0  bg-opacity-10 flex items-center justify-center">
              <div className=" text-white rounded-full p-2">
                <FiCheck className="w-6 h-6" />
              </div>
            </div>
          )}
        </div>

        {/* Template Info */}
        <div className="p-3">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
            {template.name}
          </h3>
          {template.rating && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span className="text-yellow-500">⭐</span>
              <span className="font-medium">{template.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Dropdown Component
function FilterDropdown({
  label,
  isOpen,
  onToggle,
  options,
  selectedValue,
  onSelect,
  renderOption,
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-all text-gray-700 font-medium text-xs"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[250px] max-h-[350px] overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-all text-sm ${
                selectedValue === option.value
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {renderOption ? renderOption(option) : option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Modal Component
export default function TemplateModal({
  isOpen,
  onClose,
  onTemplateSelect,
  currentTemplate,
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);

  // Filter templates based on selected criteria
  const filteredTemplates = useMemo(() => {
    let filtered = Object.values(resumeTemplates);

    if (selectedCategory !== "all") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (selectedSkill !== "all") {
      filtered = filtered.filter((t) =>
        t.recommendedFor?.some((role) =>
          role.toLowerCase().includes(selectedSkill.toLowerCase())
        )
      );
    }

    if (selectedExperience !== "all") {
      filtered = filtered.filter(
        (t) => t.experienceLevel === selectedExperience
      );
    }

    return filtered;
  }, [selectedCategory, selectedSkill, selectedExperience]);

  // Group templates by sections
  const { recommendedTemplates, topRatedTemplates, allTemplates } =
    useMemo(() => {
      const recommended = filteredTemplates
        .filter((t) => t.featured || t.rating >= 4.8)
        .slice(0, 3);
      const topRated = filteredTemplates
        .filter((t) => t.rating >= 4.5)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
      return {
        recommendedTemplates: recommended,
        topRatedTemplates: topRated,
        allTemplates: filteredTemplates,
      };
    }, [filteredTemplates]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSkill("all");
    setSelectedExperience("all");
  };

  const closeAllDropdowns = () => {
    setShowCategoryDropdown(false);
    setShowSkillDropdown(false);
    setShowExperienceDropdown(false);
  };

  const handleTemplateSelect = (templateId) => {
    onTemplateSelect(templateId);
    onClose();
  };

  const handleDropdownToggle = (dropdown) => {
    closeAllDropdowns();
    switch (dropdown) {
      case "category":
        setShowCategoryDropdown((prev) => !prev);
        break;
      case "skill":
        setShowSkillDropdown((prev) => !prev);
        break;
      case "experience":
        setShowExperienceDropdown((prev) => !prev);
        break;
    }
  };

  const handleFilterSelect = (type, value) => {
    switch (type) {
      case "category":
        setSelectedCategory(value);
        break;
      case "skill":
        setSelectedSkill(value);
        break;
      case "experience":
        setSelectedExperience(value);
        break;
    }
    closeAllDropdowns();
  };

  // Prepare dropdown options
  const categoryOptions = [
    { value: "all", label: "All Industries" },
    ...Object.entries(templateCategories).map(([key, cat]) => ({
      value: key,
      label: cat.name,
      icon: cat.icon,
    })),
  ];

  const skillOptions = [
    { value: "all", label: "All Skills" },
    ...primarySkills.map((skill) => ({ value: skill, label: skill })),
  ];

  const experienceOptions = [
    { value: "all", label: "All Levels" },
    ...Object.entries(experienceLevels).map(([key, level]) => ({
      value: key,
      label: level.name,
      description: level.description,
    })),
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0d0d0d89] z-50"
        onClick={closeAllDropdowns}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div className="bg-white rounded-2xl max-w-7xl w-full h-[90vh] flex flex-col shadow-2xl pointer-events-auto">
          {/* Header */}
          <div className="flex-shrink-0 relative px-8 py-6 border-b border-gray-200">
            <div className="flex justify-center items-center">
              <div className="text-center">
  <h2 className="text-2xl  font-bold text-gray-900">
                Choose Your Template
              </h2>
              </div>
            
              <button
                onClick={onClose}
                className="text-gray-400 absolute right-4 hover:text-gray-600 text-2xl w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:bg-gray-100"
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex-shrink-0 px-8 py-4 border-b border-gray-200">
            <div className="flex gap-3 items-center">
              <FilterDropdown
                label="Industry"
                isOpen={showCategoryDropdown}
                onToggle={() => handleDropdownToggle("category")}
                options={categoryOptions}
                selectedValue={selectedCategory}
                onSelect={(value) => handleFilterSelect("category", value)}
                renderOption={(option) => (
                  <div className="flex items-center gap-2">
                    {option.icon && <span>{option.icon}</span>}
                    <span>{option.label}</span>
                  </div>
                )}
              />

              <FilterDropdown
                label="Primary skill"
                isOpen={showSkillDropdown}
                onToggle={() => handleDropdownToggle("skill")}
                options={skillOptions}
                selectedValue={selectedSkill}
                onSelect={(value) => handleFilterSelect("skill", value)}
              />

              <FilterDropdown
                label="Experience level"
                isOpen={showExperienceDropdown}
                onToggle={() => handleDropdownToggle("experience")}
                options={experienceOptions}
                selectedValue={selectedExperience}
                onSelect={(value) => handleFilterSelect("experience", value)}
                renderOption={(option) => (
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {option.description}
                      </div>
                    )}
                  </div>
                )}
              />

              {(selectedCategory !== "all" ||
                selectedSkill !== "all" ||
                selectedExperience !== "all") && (
                <button
                  onClick={clearFilters}
                  className="ml-auto px-4 py-2.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-all"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Templates Grid - Scrollable */}
          <div className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50 custom-scroll">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No templates found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
                >
                  Show All Templates
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Recommended for you */}
                {recommendedTemplates.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Recommended for you
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {recommendedTemplates.map((template) => (
                        <TemplateCard
                          key={template.id}
                          template={template}
                          isSelected={currentTemplate === template.id}
                          onSelect={handleTemplateSelect}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Rated */}
                {topRatedTemplates.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Top Rated
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {topRatedTemplates.map((template) => (
                        <TemplateCard
                          key={template.id}
                          template={template}
                          isSelected={currentTemplate === template.id}
                          onSelect={handleTemplateSelect}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* All Templates / For You */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    For You
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {allTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        isSelected={currentTemplate === template.id}
                        onSelect={handleTemplateSelect}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar  {
          width: 8px;
          height: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
}