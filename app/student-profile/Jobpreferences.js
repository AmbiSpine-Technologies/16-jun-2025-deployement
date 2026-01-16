"use client";
import React, { useState } from "react";
import InputForm from "../components/InputWithCount";
import SelectField from "../components/FormSelect";
import Button from "../components/Button";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const initialFormState = () => ({
  jobType: "",
  workMode: "",
  roles: "",
  location: "",
  expectedSalaryMin: "",
  expectedSalaryMax: "",
  currency: "INR",
  experienceLevel: "", // ✅ fixed: experienceLevel instead of experience
  industry: "",
  noticePeriod: "",
  relocate: "",
  communication: "",
});

export default function JobPreferences() {
  const [preferences, setPreferences] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [jobPref, setJobPref] = useState(initialFormState());
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setJobPref({ ...jobPref, [field]: e.target.value });
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};
    if (!jobPref.jobType) newErrors.jobType = "Job type is required";
    if (!jobPref.workMode) newErrors.workMode = "Work mode is required";
    if (!jobPref.roles) newErrors.roles = "Preferred role is required";
    if (!jobPref.location) newErrors.location = "Location is required";
    if (!jobPref.experienceLevel)
      newErrors.experienceLevel = "Experience is required";

    if (
      jobPref.expectedSalaryMin &&
      jobPref.expectedSalaryMax &&
      Number(jobPref.expectedSalaryMin) > Number(jobPref.expectedSalaryMax)
    ) {
      newErrors.salary = "Min salary cannot be greater than max salary";
    }

    if (!jobPref.noticePeriod) newErrors.noticePeriod = "Notice period is required";
    if (!jobPref.relocate) newErrors.relocate = "Please select relocation option";
    if (!jobPref.communication)
      newErrors.communication = "Communication skill is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.error("Validation Failed:", validationErrors); // ✅ Console me dikhega
      return;
    }

    if (editIndex !== null) {
      const updated = [...preferences];
      updated[editIndex] = jobPref;
      setPreferences(updated);
      setEditIndex(null);
    } else {
      setPreferences([...preferences, jobPref]);
    }

    console.log("Job Preferences Submitted:", jobPref); // ✅ Console me data show

    setJobPref(initialFormState());
    setFormOpen(false);
    setErrors({});
  };

  const handleEdit = (idx) => {
    setJobPref(preferences[idx]);
    setEditIndex(idx);
    setFormOpen(true);
  };

  const handleDelete = (idx) => {
    const updated = preferences.filter((_, i) => i !== idx);
    setPreferences(updated);
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Job Preferences</h3>
        {!formOpen && (
          <Button
            onClick={() => {
              setJobPref(initialFormState());
              setEditIndex(null);
              setFormOpen(true);
            }}
            buttonclass="bg-white text-black border border-gray-500"
          >
            + Add Preference
          </Button>
        )}
      </div>

      {/* Empty State */}
      {!formOpen && preferences.length === 0 && (
        <p className="text-gray-600 italic">
          Add your job preferences to highlight your expectations.
        </p>
      )}

      {/* List */}
      {!formOpen && preferences.length > 0 && (
        <div className="space-y-4">
          {preferences.map((pref, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-gray-600 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    {pref.roles || "Preferred Role Not Added"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {pref.jobType} | {pref.workMode} | {pref.experienceLevel}
                  </p>
                  <p className="text-sm text-gray-600">
                    Location: {pref.location || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Salary: {pref.expectedSalaryMin} - {pref.expectedSalaryMax}{" "}
                    {pref.currency}
                  </p>
                  <p className="text-sm text-gray-600">
                    Industry: {pref.industry || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Notice Period: {pref.noticePeriod || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Relocate: {pref.relocate || "N/A"} | Communication:{" "}
                    {pref.communication || "N/A"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => handleEdit(idx)}
                    buttonclass="!bg-transparent !text-black border border-blue-300"
                  >
                    <CiEdit />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    buttonclass="!bg-transparent !text-red-700 border border-red-300"
                  >
                    <MdDelete />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Type */}
          <SelectField
            label="Job Type *"
            options={[
              { label: "Select Job Type", value: "" },
              { label: "Full-time", value: "full-time" },
              { label: "Part-time", value: "part-time" },
              { label: "Contract", value: "contract" },
              { label: "Internship", value: "internship" },
              { label: "Freelance", value: "freelance" },
            ]}
            value={jobPref.jobType}
            onChange={handleChange("jobType")}
            error={errors.jobType}
          />

          {/* Work Mode */}
          <SelectField
            label="Work Mode *"
            options={[
              { label: "Select Work Mode", value: "" },
              { label: "On-site", value: "on-site" },
              { label: "Remote", value: "remote" },
              { label: "Hybrid", value: "hybrid" },
            ]}
            value={jobPref.workMode}
            onChange={handleChange("workMode")}
            error={errors.workMode}
          />

          {/* Role */}
          <InputForm
            label="Preferred Roles *"
            value={jobPref.roles}
            onChange={handleChange("roles")}
            placeholder="e.g. Frontend Developer"
            error={errors.roles}
          />

          {/* Location */}
          <InputForm
            label="Preferred Location *"
            value={jobPref.location}
            onChange={handleChange("location")}
            placeholder="e.g. Delhi, Bangalore"
            error={errors.location}
          />

          {/* Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputForm
              label="Expected Min Salary (in LPA)"
              type="number"
              value={jobPref.expectedSalaryMin}
              onChange={handleChange("expectedSalaryMin")}
              error={errors.salary}
            />
            <InputForm
              label="Expected Max Salary (in LPA)"
              type="number"
              value={jobPref.expectedSalaryMax}
              onChange={handleChange("expectedSalaryMax")}
              error={errors.salary}
            />
          </div>

          {/* Experience */}
          <SelectField
            label="Experience Level *"
            options={[
              { label: "Select Experience", value: "" },
              { label: "Fresher", value: "fresher" },
              { label: "1-2 Years", value: "1-2" },
              { label: "3-5 Years", value: "3-5" },
              { label: "5+ Years", value: "5plus" },
            ]}
            value={jobPref.experienceLevel}
            onChange={handleChange("experienceLevel")}
            error={errors.experienceLevel}
          />

          {/* Industry */}
          <InputForm
            label="Preferred Industry"
            value={jobPref.industry}
            onChange={handleChange("industry")}
            placeholder="e.g. IT, Finance, Marketing"
          />

          {/* Notice Period */}
          <SelectField
            label="Notice Period *"
            options={[
              { label: "Select Notice Period", value: "" },
              { label: "Immediate", value: "immediate" },
              { label: "15 Days", value: "15days" },
              { label: "1 Month", value: "1month" },
              { label: "2 Months", value: "2months" },
              { label: "3+ Months", value: "3plus" },
            ]}
            value={jobPref.noticePeriod}
            onChange={handleChange("noticePeriod")}
            error={errors.noticePeriod}
          />

          {/* Relocate */}
          <SelectField
            label="Willing to Relocate *"
            options={[
              { label: "Select Option", value: "" },
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
              { label: "Depends on Offer", value: "depends" },
            ]}
            value={jobPref.relocate}
            onChange={handleChange("relocate")}
            error={errors.relocate}
          />

          {/* Communication */}
          <SelectField
            label="Communication Skills *"
            options={[
              { label: "Select Level", value: "" },
              { label: "Excellent", value: "excellent" },
              { label: "Good", value: "good" },
              { label: "Average", value: "average" },
              { label: "Needs Improvement", value: "weak" },
            ]}
            value={jobPref.communication}
            onChange={handleChange("communication")}
            error={errors.communication}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="submit" buttonclass="text-white">
              Save Preference
            </Button>
            <Button
              type="button"
              onClick={() => setFormOpen(false)}
              buttonclass="bg-gray-300 text-black"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
