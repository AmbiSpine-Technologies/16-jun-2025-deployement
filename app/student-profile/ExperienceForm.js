
"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { InputWithCount } from "../components/FormInput";
import TextAreaField from "../components/TextAreaField";
import SelectField from "../components/FormSelect";
import FormAchievements from "../components/FormAchievements";
import CheckboxField from "../components/CheckboxField";
import MonthYearSelect from "../components/MonthYearSelect";
import { MapPin } from "lucide-react";
import MediaUpload from "../components/MediaUpload";
import { useDispatch } from "react-redux";
import { updateSection } from "../store/userSlice";

const MAX_SKILLS = 8;
const MAX_ACHIEVEMENTS = 4;
const MAX_LENGTHS = {
  jobTitle: 100,
  company: 100,
  location: 100,
  description: 300,
  skill: 50,
  achievement: 200,
};

const JOB_TITLES = ["Software Engineer", "Frontend Developer", "Backend Developer", "UI/UX Designer", "Data Scientist"];
const COMPANIES = ["Google", "Microsoft", "Amazon", "AmbiSpine Technologies", "Infosys"];
const LOCATIONS = ["London, United Kingdom", "New York, USA", "Bangalore, India", "Remote", "San Francisco, USA"];

const ExperienceForm = forwardRef(({ initialData = null, onSave, onCancel }, ref) => {
  const empty = {
    jobTitle: "",
    company: "",
    employmentType: "",
    location: "",
    startDate: { month: "", year: "" },
    endDate: { month: "", year: "" },
    description: "",
    currentlyWorking: false,
    skills: [],
    keyAchievements: [],
    media: null, // ✅ media field define
  };

  const [formData, setformData] = useState(initialData || empty);
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState({ jobTitle: [], company: [], location: [] });
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setformData(initialData || empty);
    setErrors({});
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(),
    reset: () => setformData(initialData || empty),
  }));

  const handleChange = (input) => {
    const { name, value, type, checked } = input.target;
    const finalValue = type === "checkbox" ? checked : value;
    setformData((p) => ({ ...p, [name]: finalValue }));

    if (["jobTitle", "company", "location"].includes(name)) {
      const dataset = name === "jobTitle" ? JOB_TITLES : name === "company" ? COMPANIES : LOCATIONS;
      const filtered = finalValue
        ? dataset.filter((it) => it.toLowerCase().includes(finalValue.toLowerCase()))
        : [];
      setSuggestions((prev) => ({ ...prev, [name]: filtered }));
    }
  };

  const handleValueChange = (field, value) => {
    setformData((p) => ({ ...p, [field]: value }));
    if (["jobTitle", "company", "location"].includes(field)) {
      const dataset = field === "jobTitle" ? JOB_TITLES : field === "company" ? COMPANIES : LOCATIONS;
      const filtered = value
        ? dataset.filter((it) => it.toLowerCase().includes(value.toLowerCase()))
        : [];
      setSuggestions((prev) => ({ ...prev, [field]: filtered }));
    }
  };

  const handleDateChange = (field, { type, value }) => {
    setformData((p) => ({ ...p, [field]: { ...p[field], [type]: value } }));
  };

  const handleSkillsChange = (newSkills) => {
    setformData((p) => ({ ...p, skills: newSkills.slice(0, MAX_SKILLS) }));
  };

  const handleAchievementsChange = (newAchievements) => {
    setformData((p) => ({ ...p, keyAchievements: newAchievements.slice(0, MAX_ACHIEVEMENTS) }));
  };

  const validate = () => {
    const e = {};
    if (!formData.jobTitle?.trim()) e.jobTitle = "Job title is required";
    if (!formData.company?.trim()) e.company = "Company name is required.";
    if (!formData.employmentType) e.employmentType = "Employment type is required.";
    if (!formData.startDate.month || !formData.startDate.year) e.startDate = "Start date is required.";
    if (!formData.currentlyWorking && (!formData.endDate.month || !formData.endDate.year))
      e.endDate = "Choose End date or 'Currently working'.";
    if (!formData.description?.trim()) e.description = "Job description is required.";
    return e;
  };


  const handleSubmit = (ev) => {
    ev?.preventDefault?.();

    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    // ✅ Avoid shadowing
    const dataToSave = {
      ...formData,
      media:
        formData.media instanceof File
          ? URL.createObjectURL(formData.media) // preview URL for Redux
          : formData.media,
    };

    dispatch(
      updateSection({
        section: "experiences",
        action: initialData?.id ? "update" : "add",
        id: initialData?.id,
        data: dataToSave,
      })
    );

    setformData(empty);
    setErrors({});
    onSave?.(dataToSave);
  };

  const applySuggestion = (field, value) => {
    setformData((p) => ({ ...p, [field]: value }));
    setSuggestions((s) => ({ ...s, [field]: [] }));
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="px-4 py-3 space-y-3">
        {/* Job Title */}
        <div className="relative">
          <InputWithCount
            label="Job Title *"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={(val) => handleValueChange("jobTitle", val)}
            placeholder="Frontend Developer"
            maxLength={MAX_LENGTHS.jobTitle}
            error={errors.jobTitle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}

          />
          {isFocused && suggestions.jobTitle.length > 0 && (
            <div className="absolute z-50 left-0 right-0 bg-[#070C11] rounded-md shadow-md mt-1 overflow-hidden">
              {suggestions.jobTitle.map((s, i) => (
                <div
                  key={i}
                  className="p-2 text-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => applySuggestion("jobTitle", s)}
                >
                  <div className="w-7 h-7 rounded-full bg-[#041424] text-gray-100 flex items-center justify-center text-xs font-semibold">
                    {s[0]}
                  </div>
                  <div className="text-sm text-gray-100">{s}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Company */}
        <div className="relative">
          <InputWithCount
            label="Company *"
            name="company"
            value={formData.company}
            onChange={(val) => handleValueChange("company", val)}
            placeholder="Ex. Google"
            maxLength={MAX_LENGTHS.company}
            error={errors.company}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          />
          {suggestions.company.length > 0 && (
            <div className="absolute z-50 left-0 right-0 bg-[#070C11] rounded-md shadow-md mt-1 overflow-hidden">
              {suggestions.company.map((s, i) => (
                <div
                  key={i}
                  className="p-2  cursor-pointer flex items-center gap-3"
                  onClick={() => applySuggestion("company", s)}
                >
                  <img
                    src={`https://logo.clearbit.com/${s.toLowerCase().replace(/\s+/g, "")}.com`}
                    alt={s}
                    onError={(ev) => (ev.target.style.display = "none")}
                    className="w-7 h-7 rounded-full object-cover border"
                  />
                  <div className="text-sm text-gray-100">{s}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Employment Type */}
        <SelectField
          label="Employment Type *"
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
          error={errors.employmentType}
          options={[
            { value: "", label: "Select" },
            { value: "Full-time", label: "Full-time" },
            { value: "Part-time", label: "Part-time" },
            { value: "Internship", label: "Internship" },
            { value: "Contract", label: "Contract" },
            { value: "Freelance", label: "Freelance" },
          ]}
        />

        {/* Location */}
        <div className="relative">
          <InputWithCount
            label="Location"
            name="location"
            value={formData.location}
            onChange={(val) => handleValueChange("location", val)}
            placeholder="City, Country or Remote"
            maxLength={MAX_LENGTHS.location}
            error={errors.location}
          />
          {suggestions.location.length > 0 && (
            <div className="absolute z-50 left-0 right-0 bg-white rounded-md shadow-md mt-1 overflow-hidden">
              {suggestions.location.map((s, i) => (
                <div
                  key={i}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => applySuggestion("location", s)}
                >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <div className="text-sm text-gray-800">{s}</div>
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
        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}

        <div className="mt-2">
          <CheckboxField
            label="Currently working here"
            name="currentlyWorking"
            checked={formData.currentlyWorking}
            onChange={handleChange}
          />
        </div>

        {!formData.currentlyWorking && (
          <>
            <MonthYearSelect
              label="End Date *"
              value={formData.endDate}
              onChange={(val) => handleDateChange("endDate", val)}
            />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
          </>
        )}

        {/* Description */}
        <TextAreaField
          label="Job Description *"
          name="description"
          value={formData.description || ""}
          onChange={(newValue) => setformData((p) => ({ ...p, description: newValue }))}
          placeholder="What you did, tech, impact..."
          error={errors.description}
          maxLength={MAX_LENGTHS.description}
        />

        {/* Skills */}
        <div>
          <FormAchievements
            label="Skills"
            values={formData.skills}
            onChange={handleSkillsChange}
            buttonshow={false}
            maxItemLength={MAX_LENGTHS.skill}
          />
          <p className="text-xs text-gray-400 mt-1">Max {MAX_SKILLS} skills</p>
        </div>

        {/* Achievements */}
        <div>
          <FormAchievements
            label="Key Achievements"
            values={formData.keyAchievements}
            onChange={handleAchievementsChange}
            buttonshow={false}
            maxItemLength={MAX_LENGTHS.achievement}
          />
          <p className="text-xs text-gray-400 mt-1">Max {MAX_ACHIEVEMENTS} achievements</p>
        </div>
      </div>

      <MediaUpload
        label="Upload Certificate / Media (Optional)"
        accept="image/*"
        maxSizeMB={2}
        initialFile={formData.media} // ✅ Existing file shown in edit mode
        onFileSelect={(file) => setformData((p) => ({ ...p, media: file }))} // ✅ update correct field
      />
      
      {/* Actions */}
      <div className="sticky bg-[#ffffff] right-0 -bottom-5 py-2">
        <div className="px-4 py-3 border-t border-gray-400 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onCancel?.()}
            className="px-4 py-2 rounded-full bg-[#000000] text-white"
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

export default ExperienceForm;
