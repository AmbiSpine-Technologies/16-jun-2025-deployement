"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { InputWithCount } from "../components/FormInput";
import TextAreaField from "../components/TextAreaField";
import MonthYearSelect from "../components/MonthYearSelect";
import CheckboxField from "../components/CheckboxField";
import MediaUpload from "../components/MediaUpload";
import { updateSection } from "../store/userSlice";
import { useDispatch } from "react-redux";

const MAX_LENGTHS = {
  title: 150,
  subtitle: 150,
  category: 100,
  role: 100,
  description: 500,
  technologies: 200,
};

const MAX_FILE_SIZE_MB = 5;

const ProjectForm = forwardRef(({ initialData = null, onSave, onCancel }, ref) => {
  const empty = {
    title: "",
    subtitle: "",
    category: "",
    role: "",
    description: "",
    technologies: "",
    startDate: { month: "", year: "" },
    endDate: { month: "", year: "" },
    currentlyWorking: false,
    image: null,
  };

  const [formData, setFormData] = useState(initialData || empty);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(initialData || empty);
    setErrors({});
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(),
    reset: () => {
      setFormData(initialData || empty);
      setErrors({});
    },
  }));

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle date field changes
  const handleDateChange = (field, { type, value }) => {
    setFormData((p) => ({
      ...p,
      [field]: { ...p[field], [type]: value },
    }));
  };

  // ✅ Handle file validation
  const handleFileChange = (file) => {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: `File size must be under ${MAX_FILE_SIZE_MB}MB.`,
      }));
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Only image files are allowed." }));
      return;
    }
    setFormData((p) => ({ ...p, image: file }));
    setErrors((prev) => ({ ...prev, image: null }));
  };

  // ✅ Validation logic
  const validate = () => {
    const e = {};
    if (!formData.title?.trim()) e.title = "Project Title is required.";
    if (!formData.subtitle?.trim()) e.subtitle = "Subtitle is required.";
    if (!formData.category?.trim()) e.category = "Category is required.";
    if (!formData.role?.trim()) e.role = "Role is required.";
    if (!formData.description?.trim()) e.description = "Description is required.";
    if (!formData.technologies?.trim())
      e.technologies = "Technologies used are required.";

    if (!formData.startDate.month || !formData.startDate.year)
      e.startDate = "Start date is required.";

    if (formData.currentlyWorking) {
      // No end date needed
    } else {
      if (!formData.endDate.month || !formData.endDate.year)
        e.endDate = "End date is required.";

      const sYear = parseInt(formData.startDate.year || "0", 10);
      const eYear = parseInt(formData.endDate.year || "0", 10);
      if (eYear < sYear) e.endDate = "End date cannot be before start date.";
    }

    return e;
  };

  // ✅ Handle submit
  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const eObj = validate();
    if (Object.keys(eObj).length) {
      setErrors(eObj);
      return;
    }

    const finalData = {
      ...formData,
      image:
        formData.image instanceof File
          ? URL.createObjectURL(formData.image)
          : formData.image,
    };

    dispatch(
      updateSection({
        section: "projects",
        action: initialData?.id ? "update" : "add",
        id: initialData?.id,
        data: finalData,
      })
    );

    setFormData(empty);
    setErrors({});
    onSave?.(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="px-4 py-4 space-y-3">
        <InputWithCount
          label="Project Title *"
          name="title"
          value={formData.title}
          onChange={(val) => handleChange({ target: { name: "educationLevel", value: val } })}

          maxLength={MAX_LENGTHS.title}
          error={errors.title}
          placeholder="Ex. AI Chatbot Builder"
        />
        <InputWithCount
          label="Education Level *"
          name="educationLevel"
          value={formData.educationLevel}
          onChange={(val) => handleChange({ target: { name: "educationLevel", value: val } })}
          maxLength={MAX_LENGTHS.educationLevel}
          placeholder="Ex. B.Tech, MBA"
          error={errors.educationLevel}
        />
        <InputWithCount
          label="Subtitle *"
          name="subtitle"
          value={formData.subtitle}
                    onChange={(val) => handleChange({ target: { name: "educationLevel", value: val } })}

          maxLength={MAX_LENGTHS.subtitle}
          error={errors.subtitle}
          placeholder="Ex. Built using OpenAI and React"
        />

        <InputWithCount
          label="Category *"
          name="category"
          value={formData.category}
                    onChange={(val) => handleChange({ target: { name: "educationLevel", value: val } })}

          maxLength={MAX_LENGTHS.category}
          error={errors.category}
          placeholder="Ex. AI / Web App / Research"
        />

        <InputWithCount
          label="Role *"
          name="role"
          value={formData.role}
                    onChange={(val) => handleChange({ target: { name: "educationLevel", value: val } })}

          maxLength={MAX_LENGTHS.role}
          error={errors.role}
          placeholder="Ex. Frontend Developer / Team Lead"
        />

        <TextAreaField
          label="Description *"
          name="description"
          value={formData.description}
          onChange={(val) =>
            setFormData((p) => ({ ...p, description: val }))
          }
          maxLength={MAX_LENGTHS.description}
          error={errors.description}
          placeholder="Describe your project, key features, and goals."
        />

        <InputWithCount
          label="Technologies Used *"
          name="technologies"
          value={formData.technologies}
                    onChange={(val) => handleChange({ target: { name: "educationLevel", value: val } })}

          maxLength={MAX_LENGTHS.technologies}
          error={errors.technologies}
          placeholder="Ex. React, Node.js, MongoDB, TailwindCSS"
        />

        <MonthYearSelect
          label="Start Date *"
          value={formData.startDate}
          onChange={(val) => handleDateChange("startDate", val)}
        />
        {errors.startDate && (
          <p className="text-sm text-red-500">{errors.startDate}</p>
        )}

        {!formData.currentlyWorking && (
          <>
            <MonthYearSelect
              label="End Date *"
              value={formData.endDate}
              onChange={(val) => handleDateChange("endDate", val)}
            />
            {errors.endDate && (
              <p className="text-sm text-red-500">{errors.endDate}</p>
            )}
          </>
        )}

        <CheckboxField
          label="Currently Working on this Project"
          name="currentlyWorking"
          checked={formData.currentlyWorking}
                    onChange={(val) => handleChange({ target: { name: "educationLevel", value: val } })}

        />

        <MediaUpload
          label="Upload Project Image (Optional)"
          accept="image/*"
          maxSizeMB={MAX_FILE_SIZE_MB}
          initialFile={formData.image}
          onFileSelect={handleFileChange}
          error={errors.image}
        />
      </div>

      {/* Buttons */}
      <div className="sticky bg-[#10151B] right-0 bottom-0 py-2">
        <div className="px-4 py-3 border-t border-gray-600 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onCancel?.()}
            className="px-4 py-2 rounded-full bg-gray-700 text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
});

export default ProjectForm;
