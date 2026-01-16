import { useState } from "react";
import { FiTrash2, FiEye, FiEyeOff, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { InputWithCount } from "../components/FormInput";
import MediaUpload from "../components/MediaUpload"; // ✅ Make sure this path is correct
import { validateUrl } from '../utils/validation';

const Certificate = ({ certificate, onUpdate, onRemove, onToggleHidden, showErrors = false }) => {
  const [isOpen, setIsOpen] = useState(!certificate.name);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    onUpdate({ ...certificate, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors(prev => ({ ...prev, media: "Only image files are allowed." }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // 2MB
      setErrors(prev => ({ ...prev, media: "Max file size is 2MB." }));
      return;
    }
    onUpdate({ ...certificate, media: file });
  };

  const validateCard = () => {
    const cardErrors = {};
    if (!certificate.name?.trim()) {
      cardErrors.name = "Certificate name is required";
    }
    if (!certificate.authority?.trim()) {
      cardErrors.authority = "Issuing authority is required";
    }
    return cardErrors;
  };

  const cardErrors = validateCard();

  return (
    <div
      className={`relative p-4 mb-6 transition-all duration-200 ${
        certificate.hidden
          ? "opacity-50"
          : (showErrors && (cardErrors.name || cardErrors.authority))
          ? "border-[#c90000]"
          : ""
      } bg-[#fff]`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-xl text-black">
          {certificate.name || "Untitled Certificate"}
        </h4>
        <div className="flex gap-2">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-indigo-400 p-2">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {/* <button onClick={onToggleHidden} className={`p-2 ${certificate.hidden ? "text-indigo-400" : "text-gray-400 hover:text-indigo-400"}`}>
            {certificate.hidden ? <FiEye /> : <FiEyeOff />}
          </button> */}
          <button onClick={onRemove} className="text-gray-400 hover:text-red-400 p-2">
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      {isOpen && (
        <div className=" mt-4">
          <InputWithCount
            label="Certificate Name *"
            value={certificate.name}
            onChange={(value) => handleFieldChange("name", value)}
            maxLength={100}
            error={showErrors && cardErrors.name}
          />

          <InputWithCount
            label="Issuing Authority *"
            value={certificate.authority}
            onChange={(value) => handleFieldChange("authority", value)}
            maxLength={100}
            error={showErrors && cardErrors.authority}
          />
          <InputWithCount
            label="Issue Date"
            value={certificate.issueDate}
            onChange={(value) => handleFieldChange("issueDate", value)}
            maxLength={50}
            placeholder="e.g., May 2023"
          />
          
          {/* ✅ Image Upload Replacing URL */}
          <MediaUpload
            label="Upload Certificate Image (Optional)"
            accept="image/*"
            maxSizeMB={2}
            initialFile={certificate.media}
            onFileSelect={handleFileChange}
          />
          {errors.media && <p className="text-red-500 text-sm">{errors.media}</p>}


        </div>
      )}
    </div>
  );
};

export default Certificate;
