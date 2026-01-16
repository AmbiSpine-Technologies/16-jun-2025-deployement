"use client";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { InputWithCount } from "../components/FormInput";
import TextAreaField from "../components/TextAreaField";
import SelectField from "../components/FormSelect";
import MonthYearSelect from "../components/MonthYearSelect";
import FormAchievements from "../components/FormAchievements";
import { FaExternalLinkAlt, FaGithub, FaBook, FaCode } from "react-icons/fa";
import Modal from "../components/Modal";
import MediaUpload from "../components/MediaUpload";
import { validateUrl } from "../utils/validation";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=2000";

function emptyDate() {
  return { month: "", year: "" };
}

function initialFormState() {
  return {
    id: null,
    title: "",
    category: "",
    description: "",
    technologies: [],
    startDate: emptyDate(),
    endDate: emptyDate(),
    teamSize: "",
    role: "",
    liveDemo: "",
    sourceCode: "",
    documentation: "",
    image: "",
    achievements: [],
    status: "",
  };
}

export default function ProjectSection() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Job Portal Platform",
      category: "Web App",
      description:
        "A comprehensive job portal connecting job seekers with recruiters, featuring community features, skill assessments, and interview scheduling.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
      ],
      startDate: { month: "Mar", year: "2024" },
      endDate: null,
      teamSize: "4",
      role: "Lead Frontend Developer",
      liveDemo: "",
      sourceCode: "",
      documentation: "",
      image: DEFAULT_IMAGE,
      achievements: ["Built reusable components", "Integrated auth & roles"],
    },
    {
      id: 2,
      title: "Portfolio Website",
      category: "Web App",
      description:
        "Personal portfolio to showcase projects and achievements, built with React and Tailwind and deployed on Vercel.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
      startDate: { month: "Jan", year: "2024" },
      endDate: { month: "Feb", year: "2024" },
      teamSize: "1",
      role: "Frontend Developer",
      liveDemo: "https://myportfolio.com",
      sourceCode: "https://github.com/username/portfolio",
      documentation: "",
      image: "",
      achievements: ["Responsive UI", "Performance optimizations"],
    },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [project, setProject] = useState(initialFormState());
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [imageOnlyEdit, setImageOnlyEdit] = useState(false);
  const [imageEditIndex, setImageEditIndex] = useState(null);

  // Fixed handleChange function with proper select handling
  const handleChange = (input, fieldName) => {
    let name, value;

    if (typeof input === "object" && input.target) {
      // Handle regular input events
      name = input.target.name;
      value = input.target.value;
    } else if (typeof input === "object" && input.value !== undefined) {
      // Handle select field objects from SelectField component
      name = fieldName || input.name;
      value = input.value;
    } else {
      // Handle direct value assignments
      name = fieldName;
      value = input;
    }

    if (name) {
      console.log(`Changing ${name} to:`, value);
      setProject((p) => ({ ...p, [name]: value }));

      // Clear error when field is modified
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleTechnologiesChange = (newTech) => {
    console.log("Technologies changed:", newTech);
    setProject((p) => ({ ...p, technologies: newTech }));
  };

  const handleUrlBlur = (fieldName) => {
    const url = project[fieldName];
    if (url && url.trim()) {
      const urlError = validateUrl(url);
      if (urlError) {
        setErrors((prev) => ({ ...prev, [fieldName]: urlError }));
      } else {
        // Clear error if URL is valid
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    }
  };

  const handleDateChange = (field, { type, value }) => {
    setProject((p) => ({
      ...p,
      [field]: { ...p[field], [type]: value },
    }));

    // Clear date error when date is modified
    if (errors.startDate && field === "startDate") {
      setErrors((prev) => ({ ...prev, startDate: "" }));
    }
  };

  const handleImageUpload = (file) => {
    console.log("Image uploaded:", file);
    if (file) {
      try {
        const imageUrl = URL.createObjectURL(file);
        setProject((p) => ({ ...p, image: imageUrl }));

        if (imageOnlyEdit && imageEditIndex !== null) {
          const updatedProjects = [...projects];
          updatedProjects[imageEditIndex] = {
            ...updatedProjects[imageEditIndex],
            image: imageUrl,
          };
          setProjects(updatedProjects);
          setFormOpen(false);
          setImageOnlyEdit(false);
          setImageEditIndex(null);
        }
      } catch (error) {
        console.error("Error creating object URL:", error);
        setProject((p) => ({ ...p, image: file }));
      }
    } else {
      setProject((p) => ({ ...p, image: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!project.title?.trim()) newErrors.title = "Project Title is required.";
    if (!project.category?.trim()) newErrors.category = "Category is required.";
    if (!project.description?.trim())
      newErrors.description = "Description is required.";
    if (!project.startDate?.month || !project.startDate?.year)
      newErrors.startDate = "Start month & year required.";
    if (!project.role?.trim()) newErrors.role = "Role is required.";

    // URL validation
    if (project.liveDemo && project.liveDemo.trim()) {
      const liveDemoError = validateUrl(project.liveDemo);
      if (liveDemoError) newErrors.liveDemo = liveDemoError;
    }

    if (project.sourceCode && project.sourceCode.trim()) {
      const sourceCodeError = validateUrl(project.sourceCode);
      if (sourceCodeError) newErrors.sourceCode = sourceCodeError;
    }

    return newErrors;
  };

  const handleOpenAdd = () => {
    setProject(initialFormState());
    setEditIndex(null);
    setCustomCategory("");
    setErrors({});
    setImageOnlyEdit(false);
    setImageEditIndex(null);
    setFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", project);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      console.log("Validation errors:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    const prepared = { ...project };

    if (editIndex !== null) {
      setProjects((prev) => {
        const p = [...prev];
        p[editIndex] = { ...prepared };
        return p;
      });
    } else {
      prepared.id = Date.now();
      setProjects((prev) => [...prev, prepared]);
    }

    setProject(initialFormState());
    setFormOpen(false);
    setErrors({});
    setCustomCategory("");
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const copy = JSON.parse(JSON.stringify(projects[index]));
    copy.startDate = copy.startDate || emptyDate();
    copy.endDate = copy.endDate || emptyDate();

    console.log("Editing project:", copy);
    setProject(copy);
    setEditIndex(index);
    setImageOnlyEdit(false);
    setImageEditIndex(null);
    setFormOpen(true);
    setErrors({});

    // Set custom category if category is not in predefined list
    if (
      copy.category &&
      ![
        "Web App",
        "Mobile App",
        "Data Science",
        "AI/ML",
        "Desktop App",
        "GameDev",
        "Cloud",
        "IoT",
        "OpenSource",
        "Research",
        "Other",
      ].includes(copy.category)
    ) {
      setCustomCategory(copy.category);
    }
  };

  const handleImageEdit = (index) => {
    const copy = JSON.parse(JSON.stringify(projects[index]));
    setProject({
      ...initialFormState(),
      image: copy.image || "",
    });
    setImageOnlyEdit(true);
    setImageEditIndex(index);
    setFormOpen(true);
    setErrors({});
  };

  const handleDelete = (index) => {
    const p = projects[index];
    if (window.confirm(`Delete project "${p.title}"?`)) {
      setProjects((prev) => prev.filter((_, i) => i !== index));
      if (editIndex === index) {
        setFormOpen(false);
        setEditIndex(null);
      }
      if (imageEditIndex === index) {
        setFormOpen(false);
        setImageOnlyEdit(false);
        setImageEditIndex(null);
      }
    }
  };

  const closeModal = () => {
    setFormOpen(false);
    setImageOnlyEdit(false);
    setImageEditIndex(null);
    setErrors({});
  };

  return (
    <div className="p-6 bg-white  border-t-[0.3px] border-[#cccccc] ">
      <div className="flex justify-between items-center mb-5 text-gray-800">
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-medium">Your Projects</h3>
          <p className="text-xs text-gray-500">
            Showcase your best work, experiments, and collaborations. Projects
            highlight your skills and creativity to employers and peers.
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="">
        {(showAll ? projects : projects.slice(0, 3)).map((proj, idx) => {
          const techToShow = proj.technologies?.slice(0, 3) || [];
          const techRemaining =
            (proj.technologies?.length || 0) - techToShow.length;
          return (
            <div
              key={proj.id ?? idx}
              className="space-y-6 border p-6 my-4 border-[#d5d4d4] rounded-xl bg-white"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="w-52 flex-shrink-0">
                  {proj.image ? (
                    <div className="relative">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      
                    </div>
                  ) : (
                    <div className="w-full relative h-32 bg-white border border-[#d5d4d4] rounded-lg flex items-center justify-center">
                      <FaCode className="w-8 h-8 text-gray-500" />
                    
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-700">{proj.title}</h4>
                      <h6 className="text-gray-600 text-xs font-semibold">
                        {proj.role} • Team: {proj.teamSize || "—"}
                      </h6>
                      <div className="text-sm text-gray-600 mt-2">
                        {proj.category} • {proj.startDate?.month}{" "}
                        {proj.startDate?.year}
                        {proj.endDate && proj.endDate.month && proj.endDate.year
                          ? ` – ${proj.endDate.month} ${proj.endDate.year}`
                          : " • Ongoing"}
                      </div>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-gray-600 line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Tech chips */}
                  {techToShow.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {techToShow.map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-0.5 border border-[#0668E0] text-sm rounded-full text-[#0668E0]"
                        >
                          {t}
                        </span>
                      ))}
                      {techRemaining > 0 && (
                        <span className="px-2 py-0.5 text-sm border border-[#0668E0] rounded-full text-[#0056c0] ">
                          +{techRemaining} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  <div className="mt-3 flex justify-end gap-3 items-center text-sm">
                    {proj.sourceCode && (
                      <a
                        href={proj.sourceCode}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-blue-400"
                      >
                        <FaGithub /> Code
                      </a>
                    )}
                    {proj.liveDemo && (
                      <a
                        href={proj.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-green-400"
                      >
                        <FaExternalLinkAlt /> Demo
                      </a>
                    )}
                    {proj.documentation && (
                      <a
                        href={proj.documentation}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-yellow-400"
                      >
                        <FaBook /> Docs
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {projects.length > 3 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll((s) => !s)}
            className="text-blue-400 hover:underline font-medium hover:cursor-pointer"
          >
            {showAll ? "Show Less" : `+${projects.length - 3} more`}
          </button>
        </div>
      )}

      {/* Image Only Edit Modal */}
      <Modal
        show={formOpen && imageOnlyEdit}
        onClose={closeModal}
        title="Edit Project Image"
        widthClass="max-w-md"
      >
        <MediaUpload
          label="Project Image"
          onFileSelect={handleImageUpload}
          initialFile={project.image}
          maxSizeMB={2}
        />

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 border border-gray-600 rounded-lg text-white hover:bg-gray-800 hover:cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </Modal>

      {/* Full Form Modal */}
      <Modal
        show={formOpen && !imageOnlyEdit}
        onClose={closeModal}
        title={editIndex !== null ? "Edit Project" : "Add Project"}
        widthClass="max-w-2xl"
        heightClass="max-h-[65vh]"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputWithCount
              label="Project Title *"
              name="title"
              value={project.title}
              onChange={(val) => handleChange(val, "title")}
              error={errors.title}
            />

            <SelectField
              label="Category *"
              name="category"
              value={project.category}
              onChange={(value) => handleChange(value, "category")}
              error={errors.category}
              options={[
                { value: "", label: "Please Select" },
                { value: "Web App", label: "Web App" },
                { value: "Mobile App", label: "Mobile App" },
                { value: "Data Science", label: "Data Science" },
                { value: "AI/ML", label: "AI/ML" },
                { value: "Desktop App", label: "Desktop Application" },
                { value: "GameDev", label: "Game Development" },
                { value: "Cloud", label: "Cloud / DevOps Project" },
                { value: "IoT", label: "IoT / Hardware Project" },
                { value: "OpenSource", label: "Open Source Contribution" },
                { value: "Research", label: "Research / Academic Project" },
                { value: "Other", label: "Other" },
              ]}
            />

            {project.category === "Other" && (
              <InputWithCount
                label="Custom Category"
                name="customCategory"
                value={customCategory}
                onChange={(val) => {
                  setCustomCategory(val);
                  setProject((p) => ({ ...p, category: val }));
                }}
                placeholder="Enter custom category"
              />
            )}

            <TextAreaField
              label="Description *"
              name="description"
              value={project.description}
              onChange={(val) => handleChange(val, "description")}
              error={errors.description}
            />

            <FormAchievements
              label="Technologies Used"
              values={project.technologies}
              onChange={handleTechnologiesChange}
              buttonshow={false}
            />

            {/* Fixed Date Selection */}
            <MonthYearSelect
              label="Start Date *"
              value={project.startDate}
              onChange={(val) => handleDateChange("startDate", val)}
            />
            {errors.startDate && (
              <p className="text-sm text-red-500">{errors.startDate}</p>
            )}

            <MonthYearSelect
              label="End Date"
              value={project.endDate}
              onChange={(val) => handleDateChange("endDate", val)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWithCount
                label="Team Size"
                name="teamSize"
                value={project.teamSize}
                onChange={(val) => handleChange(val, "teamSize")}
              />
              <InputWithCount
                label="Your Role *"
                name="role"
                value={project.role}
                onChange={(val) => handleChange(val, "role")}
                error={errors.role}
              />
            </div>

            <InputWithCount
              label="Live Demo URL"
              name="liveDemo"
              value={project.liveDemo}
              onChange={(val) => handleChange(val, "liveDemo")}
              onBlur={() => handleUrlBlur("liveDemo")}
              error={errors.liveDemo}
            />

            <InputWithCount
              label="Source Code URL"
              name="sourceCode"
              value={project.sourceCode}
              onChange={(val) => handleChange(val, "sourceCode")}
              onBlur={() => handleUrlBlur("sourceCode")}
              error={errors.sourceCode}
            />

            <MediaUpload
              label="Project Image"
              onFileSelect={handleImageUpload}
              initialFile={project.image}
              maxSizeMB={2}
            />

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border border-gray-600 rounded-lg text-white hover:bg-gray-800 hover:cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <Button
                type="submit"
                buttonclass="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {editIndex !== null ? "Update Project" : "Save Project"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
