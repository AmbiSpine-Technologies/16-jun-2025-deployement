"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { InputWithCount } from "../components/FormInput";
import TextAreaField from "../components/TextAreaField";
import CheckboxField from "../components/CheckboxField";
import MonthYearSelect from "../components/MonthYearSelect";
import { MapPin } from "lucide-react";
import MediaUpload from "../components/MediaUpload";
import { useDispatch } from "react-redux";
import { updateSection } from "../store/userSlice";

const MAX_LENGTHS = {
  institution: 150,
  university: 150,
  educationLevel: 100,
  fieldOfStudy: 100,
  specialization: 100,
  location: 100,
  achievements: 500,
};
const MAX_FILE_SIZE_MB = 5;

const UNIVERSITIES = [
  "Harvard University",
  "Stanford University",
  "MIT",
  "IIT",
  "Oxford University",
];
const LOCATIONS = [
  "Cambridge, MA",
  "Bangalore, India",
  "London, UK",
  "New York, USA",
  "Remote",
];

const EducationForm = forwardRef(
  ({ initialData = null, onSave, onCancel }, ref) => {
    const empty = {
      institution: "",
      university: "",
      educationLevel: "",
      fieldOfStudy: "",
      specialization: "",
      location: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      expectedGraduation: { month: "", year: "" },
      currentlyStudying: false,
      achievements: "",
      media: null,
    };

    const [formData, setFormData] = useState(initialData || empty);
    const [errors, setErrors] = useState({});
    const [suggestions, setSuggestions] = useState({
      institution: [],
      university: [],
      location: [],
    });
    const [isFocusedField, setIsFocusedField] = useState("");
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
        setSuggestions({ institution: [], university: [], location: [] });
      },
    }));

    const handleChange = (input, rawValue) => {
      let name, value, type, checked;
      if (typeof input === "string") {
        name = rawValue;
        value = input;
      } else {
        ({ name, value, type, checked } = input.target);
        value = type === "checkbox" ? checked : value;
      }
      const fieldName = input?.target?.name || rawValue || name;
      setFormData((p) => ({ ...p, [fieldName]: value }));

      if (["institution", "university", "location"].includes(fieldName)) {
        const dataset =
          fieldName === "university"
            ? UNIVERSITIES
            : fieldName === "location"
            ? LOCATIONS
            : [];
        const filtered = value
          ? dataset.filter((it) =>
              it.toLowerCase().includes(value.toLowerCase())
            )
          : [];
        setSuggestions((prev) => ({ ...prev, [fieldName]: filtered }));
      }
    };

    const handleDateChange = (field, { type, value }) => {
      setFormData((p) => ({ ...p, [field]: { ...p[field], [type]: value } }));
    };

    const applySuggestion = (field, value) => {
      setFormData((p) => ({ ...p, [field]: value }));
      setSuggestions((s) => ({ ...s, [field]: [] }));
    };

    const handleFileChange = (file) => {
      if (!file) return;
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          media: `File size must be under ${MAX_FILE_SIZE_MB}MB`,
        }));
        return;
      }
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          media: "Only image files are allowed.",
        }));
        return;
      }
      setFormData((p) => ({ ...p, media: file }));
      setErrors((prev) => ({ ...prev, media: null }));
    };

    const validate = () => {
      const e = {};
      if (!formData.institution?.trim())
        e.institution = "Institution name is required.";
      if (!formData.university?.trim())
        e.university = "University / Board is required.";
      if (!formData.educationLevel?.trim())
        e.educationLevel = "Education level is required.";
      if (!formData.fieldOfStudy?.trim())
        e.fieldOfStudy = "Field of study is required.";
      if (!formData.startDate.month || !formData.startDate.year)
        e.startDate = "Start date is required.";

      if (formData.currentlyStudying) {
        if (
          !formData.expectedGraduation.month ||
          !formData.expectedGraduation.year
        )
          e.expectedGraduation = "Expected graduation is required.";
        const sYear = parseInt(formData.startDate.year || "0", 10);
        const eYear = parseInt(formData.expectedGraduation.year || "0", 10);
        if (eYear < sYear)
          e.expectedGraduation =
            "Expected graduation cannot be before start date.";
      } else {
        if (!formData.endDate.month || !formData.endDate.year)
          e.endDate = "End date is required.";
        const sYear = parseInt(formData.startDate.year || "0", 10);
        const eYear = parseInt(formData.endDate.year || "0", 10);
        if (eYear < sYear) e.endDate = "End date cannot be before start date.";
      }

      if (
        formData.media &&
        formData.media.size > MAX_FILE_SIZE_MB * 1024 * 1024
      )
        e.media = `File size must be under ${MAX_FILE_SIZE_MB}MB`;
      return e;
    };

    const handleSubmit = (ev) => {
      ev?.preventDefault?.();
      const e = validate();
      if (Object.keys(e).length) {
        setErrors(e);
        return;
      }

      const finalData = {
        ...formData,
        media:
          formData.media instanceof File
            ? URL.createObjectURL(formData.media) // preview URL
            : formData.media,
      };

      dispatch(
        updateSection({
          section: "educations",
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
        <div className="px-4 py-3 space-y-3">
          {/* Institution */}
          <div className="relative">
            <InputWithCount
              label="Institution Name *"
              name="institution"
              value={formData.institution}
              onChange={(val) =>
                handleChange({ target: { name: "institution", value: val } })
              }
              maxLength={MAX_LENGTHS.institution}
              placeholder="Ex. Harvard University"
              error={errors.institution}
              onFocus={() => setIsFocusedField("institution")}
              onBlur={() => setTimeout(() => setIsFocusedField(""), 100)}
            />
            {isFocusedField === "institution" &&
              suggestions.institution.length > 0 && (
                <div className="absolute z-50 left-0 right-0 bg-[#070C11] rounded-md shadow-md mt-1 overflow-hidden">
                  {suggestions.institution.map((s, i) => (
                    <div
                      key={i}
                      className="p-2 text-gray-100 cursor-pointer text-sm"
                      onClick={() => applySuggestion("institution", s)}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* University */}
          <div className="relative">
            <InputWithCount
              label="University / Board *"
              name="university"
              value={formData.university}
              onChange={(val) =>
                handleChange({ target: { name: "university", value: val } })
              }
              maxLength={MAX_LENGTHS.university}
              placeholder="Ex. MIT / CBSE"
              error={errors.university}
              onFocus={() => setIsFocusedField("university")}
              onBlur={() => setTimeout(() => setIsFocusedField(""), 100)}
            />
            {isFocusedField === "university" &&
              suggestions.university.length > 0 && (
                <div className="absolute z-50 left-0 right-0 bg-[#070C11] rounded-md shadow-md mt-1 overflow-hidden">
                  {suggestions.university.map((s, i) => (
                    <div
                      key={i}
                      className="p-2 text-gray-100 cursor-pointer text-sm"
                      onClick={() => applySuggestion("university", s)}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Other Fields */}
          <InputWithCount
            label="Education Level *"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={(val) =>
              handleChange({ target: { name: "educationLevel", value: val } })
            }
            maxLength={MAX_LENGTHS.educationLevel}
            placeholder="Ex. B.Tech, MBA"
            error={errors.educationLevel}
          />
          <InputWithCount
            label="Field of Study *"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={(val) =>
              handleChange({ target: { name: "fieldOfStudy", value: val } })
            }
            maxLength={MAX_LENGTHS.fieldOfStudy}
            placeholder="Ex. Computer Science"
            error={errors.fieldOfStudy}
          />
          <InputWithCount
            label="Specialization (Optional)"
            name="specialization"
            value={formData.specialization}
            onChange={(val) =>
              handleChange({ target: { name: "specialization", value: val } })
            }
            maxLength={MAX_LENGTHS.specialization}
            placeholder="Ex. AI & ML"
            error={errors.specialization}
          />

          {/* Location */}
          <div className="relative">
            <InputWithCount
              label="Location (Optional)"
              name="location"
              value={formData.location}
              onChange={(val) =>
                handleChange({ target: { name: "location", value: val } })
              }
              maxLength={MAX_LENGTHS.location}
              placeholder="City, Country or Remote"
              error={errors.location}
              onFocus={() => setIsFocusedField("location")}
              onBlur={() => setTimeout(() => setIsFocusedField(""), 100)}
            />
            {isFocusedField === "location" &&
              suggestions.location.length > 0 && (
                <div className="absolute z-50 left-0 right-0 bg-[#070C11] rounded-md shadow-md mt-1 overflow-hidden">
                  {suggestions.location.map((s, i) => (
                    <div
                      key={i}
                      className="p-2 text-gray-100 cursor-pointer text-sm flex items-center gap-2"
                      onClick={() => applySuggestion("location", s)}
                    >
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Dates */}
          <MonthYearSelect
            label="Start Date *"
            value={formData.startDate}
            onChange={(val) => handleDateChange("startDate", val)}
           
          />
          {errors.startDate && (
            <p className="text-sm text-red-500">{errors.startDate}</p>
          )}

          {formData.currentlyStudying ? (
            <>
              <MonthYearSelect
                label="Expected Graduation *"
                value={formData.expectedGraduation}
                onChange={(val) => handleDateChange("expectedGraduation", val)}
              />
              {errors.expectedGraduation && (
                <p className="text-sm text-red-500">
                  {errors.expectedGraduation}
                </p>
              )}
            </>
          ) : (
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

          {/* Currently Studying */}
          <div className="mt-2">
            <CheckboxField
              label="Currently Studying Here"
              name="currentlyStudying"
              checked={formData.currentlyStudying}
              onChange={handleChange}
            />
          </div>

          {/* Achievements */}
          <TextAreaField
            label="Achievements (Optional)"
            name="achievements"
            value={formData.achievements}
            onChange={(val) =>
              setFormData((p) => ({ ...p, achievements: val }))
            }
            maxLength={MAX_LENGTHS.achievements}
            placeholder="Published papers, awards, etc."
            error={errors.achievements}
          />

          {/* Media */}
          <MediaUpload
            label="Upload Certificate / Media (Optional)"
            accept="image/*"
            maxSizeMB={2}
            initialFile={formData.media}
            onFileSelect={handleFileChange}
          />
        </div>

        {/* Actions */}
        <div className="sticky bg-[#ffffff] right-0 -bottom-5 py-2">
          <div className="px-4 py-3 border-t border-gray-400 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onCancel?.()}
              className="px-4 py-2 rounded-full bg-[#333A44] text-white"
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
  }
);

export default EducationForm;
