
import { useState } from "react";
import { FiTrash2, FiEye, FiEyeOff, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { InputWithCount } from "../components/FormInput";
import RichTextEditorInput from "../components/RichTextEditorInput";
import { validateUrl } from "../utils/validation";
import MonthYearSelect from '../components/MonthYearSelect';

const Publications = ({ publication, onUpdate, onRemove, onToggleHidden, showErrors = false }) => {
  const [isOpen, setIsOpen] = useState(!publication.title);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    onUpdate({ ...publication, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleDateChange = (dateData) => {
    if (dateData.type === "month") {
      onUpdate({ ...publication, publicationMonth: dateData.value });
    } else if (dateData.type === "year") {
      onUpdate({ ...publication, publicationYear: dateData.value });
    }
  };

  // Validate URL on blur
  const handleUrlBlur = () => {
    if (publication.url && publication.url.trim()) {
      const urlError = validateUrl(publication.url);
      if (urlError) {
        setErrors(prev => ({ ...prev, url: urlError }));
      }
    }
  };

  // ✅ Card-level validation
  const validateCard = () => {
    const cardErrors = {};

    if (!publication.title?.trim()) {
      cardErrors.title = "Publication title is required";
    }

    if (!publication.publisher?.trim()) {
      cardErrors.publisher = "Publisher is required";
    }

    if (publication.url && publication.url.trim()) {
      const urlError = validateUrl(publication.url);
      if (urlError) {
        cardErrors.url = urlError;
      }
    }

    return cardErrors;
  };

  const cardErrors = validateCard();

  return (
    <div
      className={`relative p-4 mb-6 transition-all duration-200 ${publication.hidden
          ? "opacity-50"
          : ""
        } bg-[#fff]`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h4 className="font-semibold text-xl text-black">
            {publication.title || "Untitled Publication"}
          </h4>
          {publication.hidden && (
            <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Hidden</span>
          )}
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
            className={`p-2 rounded-lg ${publication.hidden ? "text-indigo-400" : "text-gray-400 hover:text-indigo-400"
              }`}
          >
            {publication.hidden ? <FiEye /> : <FiEyeOff />}
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
        <div className="space-y-0 mt-4">
          <InputWithCount
            label="Publication Title *"
            value={publication.title}
            onChange={(value) => handleFieldChange("title", value)}
            maxLength={200}
            error={showErrors && cardErrors.title}
            placeholder="e.g., Advanced Machine Learning Techniques for Predictive Analytics"
          />

          <InputWithCount
            label="Publisher *"
            value={publication.publisher}
            onChange={(value) => handleFieldChange("publisher", value)}
            maxLength={150}
            error={showErrors && cardErrors.publisher}
            placeholder="e.g., IEEE, ACM, Springer"
          />

          {/* <InputWithCount
            label="Publication URL"
            value={publication.url}
            onChange={(value) => handleFieldChange("url", value)}
            onBlur={handleUrlBlur}
            maxLength={200}
            placeholder="https://doi.org/10.xxxx/xxxxx"
            error={errors || showErrors && cardErrors.url}
          /> */}
          <InputWithCount
            label="Publication URL"
            value={publication.url}
            onChange={(value) => handleFieldChange("url", value)}
            onBlur={handleUrlBlur}
            maxLength={200}
            placeholder="https://doi.org/10.xxxx/xxxxx"
            error={errors.url || (showErrors && cardErrors.url)}
          />
          <div className="mt-1">
            <InputWithCount
              label="Authors"
              value={publication.authors || ""}
              onChange={(value) => handleFieldChange("authors", value)}
              maxLength={1000}
              placeholder="e.g., John Doe, Jane Smith, et al."
            />
          </div>
          <MonthYearSelect
            label="Publication Date"
            value={{
              month: publication.publicationMonth || "",
              year: publication.publicationYear || ""
            }}
            onChange={handleDateChange}
          />

          <div className="mt-2">
            <label className="text-sm font-medium  text-gray-200 mb-2 block">
              Description
            </label>
            <RichTextEditorInput
              value={publication.description}
              onChange={(value) => handleFieldChange("description", value)}
              placeholder="Describe your publication, key findings, methodology, and impact..."
              small
              maxLength={300}
              showCharCount={true}
            />
          </div>


        </div>
      )}
    </div>
  );
};

export default Publications;