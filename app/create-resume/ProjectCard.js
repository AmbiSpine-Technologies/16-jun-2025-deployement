import { useState } from "react";
import { FiTrash2, FiEye, FiEyeOff, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { InputWithCount } from "../components/FormInput";
import DateRangeSelector from "./DateRangeSelector";
import BulletPointsEditor from "./BulletPointsEditor";
import RichTextEditorInput from "../components/RichTextEditorInput";
import { validateUrl } from "../utils/validation";

const ProjectCard = ({ project, onUpdate, onRemove, onToggleHidden, showErrors = false }) => {
  // Set isOpen to false by default to keep cards closed initially
  const [isOpen, setIsOpen] = useState(!project.title);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    onUpdate({ ...project, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleDateChange = (field, value) => {
    onUpdate({ ...project, [field]: value });
  };

  const handleBulletsChange = (bullets) => {
    onUpdate({ ...project, bullets });
  };

  // Validate URL on blur
  const handleUrlBlur = () => {
    if (project.url && project.url.trim()) {
      const urlError = validateUrl(project.url);
      if (urlError) {
        setErrors(prev => ({ ...prev, url: urlError }));
      }
    }
  };

  // ✅ Card-level validation
  const validateCard = () => {
    const cardErrors = {};

    if (!project.title?.trim()) {
      cardErrors.title = "Project title is required";
    }

    if (project.url && project.url.trim()) {
      const urlError = validateUrl(project.url);
      if (urlError) {
        cardErrors.url = urlError;
      }
    }

    if (!project.description?.trim()) {
      cardErrors.description = "Project description is required";
    }

    return cardErrors;
  };

  const cardErrors = validateCard();
  const hasErrors = Object.keys(cardErrors).length > 0;

  return (
    <div
      className={`relative p-4 mb-6 transition-all duration-200 ${project.hidden
          ? "opacity-50"

          : ""
        } bg-[#fafafa]`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h4 className="font-semibold text-xl text-black">
            {project.title || "Untitled Project"}
          </h4>

        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-indigo-400 transition p-2 rounded-lg"
          >
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {/* <button
            onClick={onToggleHidden}
            className={`p-2 rounded-lg ${project.hidden ? "text-indigo-400" : "text-gray-400 hover:text-indigo-400"
              }`}
          >
            {project.hidden ? <FiEye /> : <FiEyeOff />}
          </button> */}
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-400 p-2 rounded-lg"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="bg-white">
          <InputWithCount
            label="Project Title *"
            value={project.title}
            onChange={(value) => handleFieldChange("title", value)}
            maxLength={100}
            error={showErrors && cardErrors.title}
          />

          <InputWithCount
            label="Project URL"
            value={project.url}
            onChange={(value) => handleFieldChange("url", value)}
            onBlur={handleUrlBlur}
            maxLength={200}
            placeholder="https://your-project.com"
            error={(showErrors && cardErrors.url) || errors.url}
          />

          <InputWithCount
            label="Organization"
            value={project.organization}
            onChange={(value) => handleFieldChange("organization", value)}
            maxLength={100}
            placeholder="e.g., Personal Project, Company Name"
          />


          <DateRangeSelector
            startMonth={project.startMonth}
            startYear={project.startYear}
            endMonth={project.endMonth}
            endYear={project.endYear}
            currentlyWorking={project.currentlyWorking}
            onDateChange={handleDateChange}
            workingText="Currently working on this project"
          />

          <div>
            <label className="text-sm font-medium text-gray-900 mb-3 mt-2 block">
              Project Description *
            </label>

            <RichTextEditorInput
              value={project.description}
              onChange={(value) => handleFieldChange("description", value)}
              placeholder="Describe your project briefly..."
              maxLength={1000}
              showCharCount={true}
            />
            {showErrors && cardErrors.description && (
              <p className="text-red-500 text-sm mt-1">{cardErrors.description}</p>
            )}
          </div>

          {/* <BulletPointsEditor
            bullets={project.bullets || []}
            onChange={handleBulletsChange}
            addButtonText="Add Key Achievement"
            maxBullets={4}
            showCount={true}
          /> */}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;