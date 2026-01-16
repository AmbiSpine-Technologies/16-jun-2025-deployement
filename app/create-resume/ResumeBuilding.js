"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import FormField from "../components/FormField";
import SelectField from "../components/FormSelect";
import { InputWithCount } from "../components/FormInput";

// Reusable data for dates
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = Array.from({ length: 30 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);
const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];

export default function ResumeBuilder() {
  const currentUser = useSelector((state) => state.users?.currentUser);
  const router = useRouter();
  const [showSubModal, setShowSubModal] = useState(false);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      headline: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      portfolio: "",
    },
    profileSummary: "",
  // featureName: selected name for the checker feature
  featureName: "Resume IQ",
  // analysis: store results from local analyzer
  analysis: null,
    projects: [],
    workExperience: [],
    education: [],
    skills: [],
  });

  const [collapsedSections, setCollapsedSections] = useState({});

  // Initialize with sample data
  useEffect(() => {
    setResumeData({
      personalInfo: {
        firstName: "Rupendra",
        lastName: "Vishwakarma",
        headline: "AI Engineer | LLMs, Generative AI, MLOps & SaaS Deployment",
        email: "rupendravishwakarma821@gmail.com",
        phone: "+918103239933",
        address: "2PC Mostly Sunny",
        linkedin: "LinkedIn",
        portfolio: "LeoCoek",
      },
      profileSummary:
        "AI Engineer with expertise in LLMs, Generative AI and MLOps, skillful deploying scalable ML solutions, building RAG pipeline, and generating AVM models into SaaS products on cloud platforms (AVIS/OCP/ADN/AI) with experience as a Full Stack Developer (MERX) with strong skills in building scalable web applications, APIs, and SaaS integrators.",
      projects: [
        {
          id: 1,
          title:
            "Agents AI Chatbot with RAG + LangChain (Full Stack LAN Project)",
          url: "https://example.com/project1",
          organization: "Personal Project",
          city: "",
          country: "",
          startMonth: "January",
          startYear: "2024",
          endMonth: "March",
          endYear: "2024",
          currentlyWorking: false,
          bullets: [
            "Developed AI-powered agent capable of multi-step reasoning and contextual Q&A",
            "Used LangChain + OpenAI GPT-4 APIs with Retrieval Augmented Generation",
          ],
          hidden: false,
        },
      ],
      workExperience: [
        {
          id: 1,
          title: "AI Engineer | LLMs, Generative AI, MLOps & SaaS Deployment",
          company: "Attributors Technology Pvt. Ltd",
          employmentType: "Full-time",
          location: "Remote",
          startMonth: "January",
          startYear: "2023",
          endMonth: "Present",
          endYear: "",
          currentlyWorking: true,
          description: "",
          bullets: [
            "Developed and deployed scalable ML solutions",
            "Built RAG pipelines for enterprise applications",
          ],
          hidden: false,
        },
      ],
      featureName: "Resume IQ",
      analysis: null,
      education: [],
      skills: [],
    });
  }, []);

  // Simple local resume analyzer - computes a score and recommendations
  const analyzeResume = (data) => {
    let score = 50;
    const recommendations = [];

    // Basic checks
    const { personalInfo, profileSummary, workExperience, projects, skills } =
      data;

    if (personalInfo.firstName && personalInfo.lastName) score += 10;
    if (personalInfo.email && personalInfo.email.includes("@")) score += 10;
    if (profileSummary && profileSummary.length > 50) score += 10;
    if (workExperience && workExperience.length > 0) score += 10;
    if (projects && projects.length > 0) score += 5;
    if (skills && skills.length > 0) score += 5;

    // Recommendations
    if (!personalInfo.firstName || !personalInfo.lastName)
      recommendations.push("Add your full name to the header.");
    if (!personalInfo.email || !personalInfo.email.includes("@"))
      recommendations.push("Provide a valid email address.");
    if (!profileSummary || profileSummary.length < 50)
      recommendations.push("Write a 2-3 sentence professional summary highlighting achievements.");
    if (!workExperience || workExperience.length === 0)
      recommendations.push("Add relevant work experience with bullet points that show impact.");
    if (!skills || skills.length === 0)
      recommendations.push("List key skills and tools (e.g. Python, React, MLOps).");

    // Normalize score
    if (score > 100) score = 100;

    return { score, recommendations, analyzedAt: new Date().toISOString() };
  };

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (section, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayUpdate = (section, items) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: items,
    }));
  };

  const addNewItem = (section, template) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...template, id: Date.now() }],
    }));
  };

  const removeItem = (section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const toggleHidden = (section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, hidden: !item.hidden } : item
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-[#070C11] text-white">
      {/* Subscription Modal */}
      {showSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#0F1724] rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">ETA Check — Subscription required</h3>
            <p className="text-gray-300 text-sm mb-4">The ETA Check is a premium feature. Please subscribe to access advanced resume analysis and ETA predictions.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSubModal(false)}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // router.push('/subscription'); // commented for local testing
                }}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Go to Subscription
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
            <div className="flex gap-4">
            <button className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition">
              Save Draft
            </button>
            <button className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Download PDF
            </button>
            <button
              onClick={() => {
                // If user is subscribed, run analyzer; otherwise show subscription modal
                if (currentUser && currentUser.isSubscribed) {
                  const result = analyzeResume(resumeData);
                  setResumeData((prev) => ({ ...prev, analysis: result }));
                } else {
                  setShowSubModal(true);
                }
              }}
              className="px-6 py-2 bg-yellow-600 text-black rounded-lg hover:bg-yellow-700 transition"
            >
              ETA Check
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Edit Form */}
          <div className="bg-[#1A1F2C] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Edit Resume</h2>

            {/* Resume Checker Feature */}
            <ResumeSection
              title="Resume Checker"
              isCollapsed={collapsedSections.resumeChecker}
              onToggle={() => toggleSection("resumeChecker")}
            >
              <div className="space-y-4">
                <FormField label="Feature Name">
                  <select
                    value={resumeData.featureName}
                    onChange={(e) =>
                      setResumeData((prev) => ({
                        ...prev,
                        featureName: e.target.value,
                      }))
                    }
                    className="w-full rounded-[15px] px-3 py-3.5 bg-[#333A44] text-white text-[15px] focus:outline-none focus:ring-1 focus:ring-gray-300"
                  >
                    <option value="ETA Checker, RVA">ETA Checker, RVA</option>
                    <option value="Resume IQ">Resume IQ</option>
                    <option value="Smart Resume Check">Smart Resume Check</option>
                    <option value="TalentScore">TalentScore</option>
                    <option value="ATS Analyzer">ATS Analyzer</option>
                    <option value="Resume Insight">Resume Insight</option>
                    <option value="ReCheck">ReCheck</option>
                    <option value="E.T.A. (Evaluate, Test, Analyze)">E.T.A. (Evaluate, Test, Analyze)</option>
                  </select>
                </FormField>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const result = analyzeResume(resumeData);
                      setResumeData((prev) => ({ ...prev, analysis: result }));
                    }}
                    className="px-5 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Analyze
                  </button>
                  <button
                    onClick={() => setResumeData((prev) => ({ ...prev, analysis: null }))}
                    className="px-5 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
                  >
                    Clear
                  </button>
                </div>

                {resumeData.analysis && (
                  <div className="mt-3 border border-gray-600 rounded-lg p-3 bg-[#22262D]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{resumeData.featureName} Results</h4>
                        <p className="text-sm text-gray-300">Score: {resumeData.analysis.score}%</p>
                        <p className="text-xs text-gray-400">Analyzed at: {new Date(resumeData.analysis.analyzedAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h5 className="text-sm font-medium text-gray-300">Recommendations</h5>
                      <ul className="mt-2 list-disc list-inside text-gray-300 text-sm space-y-1">
                        {resumeData.analysis.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </ResumeSection>

            {/* Personal Information */}
            <ResumeSection
              title="Personal Information"
              isCollapsed={collapsedSections.personalInfo}
              onToggle={() => toggleSection("personalInfo")}
            >
              <div className="space-y-4">
                <InputWithCount
                  label="First Name"
                  value={resumeData.personalInfo.firstName}
                  onChange={(value) =>
                    handleInputChange("personalInfo", "firstName", value)
                  }
                  maxLength={50}
                  validate={(value) =>
                    value.trim().length > 0 ? "" : "First name is required"
                  }
                />

                <InputWithCount
                  label="Last Name"
                  value={resumeData.personalInfo.lastName}
                  onChange={(value) =>
                    handleInputChange("personalInfo", "lastName", value)
                  }
                  maxLength={50}
                  validate={(value) =>
                    value.trim().length > 0 ? "" : "Last name is required"
                  }
                />

                <InputWithCount
                  label="Headline / Target Job Title"
                  value={resumeData.personalInfo.headline}
                  onChange={(value) =>
                    handleInputChange("personalInfo", "headline", value)
                  }
                  maxLength={100}
                />

                <InputWithCount
                  label="Email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(value) =>
                    handleInputChange("personalInfo", "email", value)
                  }
                  maxLength={100}
                  validate={(value) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value)
                      ? ""
                      : "Please enter a valid email";
                  }}
                />

                <InputWithCount
                  label="Phone Number"
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(value) =>
                    handleInputChange("personalInfo", "phone", value)
                  }
                  maxLength={20}
                />

                <InputWithCount
                  label="Address"
                  value={resumeData.personalInfo.address}
                  onChange={(value) =>
                    handleInputChange("personalInfo", "address", value)
                  }
                  maxLength={200}
                />

                <LinkFieldWithEdit
                  label="LinkedIn"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(value) =>
                    handleInputChange("personalInfo", "linkedin", value)
                  }
                />

                <LinkFieldWithEdit
                  label="Portfolio"
                  value={resumeData.personalInfo.portfolio}
                  onChange={(value) =>
                    handleInputChange("personalInfo", "portfolio", value)
                  }
                />
              </div>
            </ResumeSection>

            {/* Profile Summary */}
            <ResumeSection
              title="Profile Summary"
              isCollapsed={collapsedSections.profileSummary}
              onToggle={() => toggleSection("profileSummary")}
            >
              <RichTextEditor
                value={resumeData.profileSummary}
                onChange={(value) =>
                  setResumeData((prev) => ({ ...prev, profileSummary: value }))
                }
                placeholder="Write your professional summary..."
              />
            </ResumeSection>

            {/* Work Experience */}
            <ResumeSection
              title="Work Experience"
              isCollapsed={collapsedSections.workExperience}
              onToggle={() => toggleSection("workExperience")}
            >
              <div className="space-y-6">
                {resumeData.workExperience.map((exp, index) => (
                  <WorkExperienceCard
                    key={exp.id}
                    experience={exp}
                    onUpdate={(updatedExp) => {
                      const updated = [...resumeData.workExperience];
                      updated[index] = { ...updated[index], ...updatedExp };
                      handleArrayUpdate("workExperience", updated);
                    }}
                    onRemove={() => removeItem("workExperience", exp.id)}
                    onToggleHidden={() =>
                      toggleHidden("workExperience", exp.id)
                    }
                  />
                ))}

                <AddNewButton
                  onClick={() =>
                    addNewItem("workExperience", {
                      title: "",
                      company: "",
                      employmentType: "Full-time",
                      location: "",
                      startMonth: MONTHS[new Date().getMonth()],
                      startYear: new Date().getFullYear().toString(),
                      endMonth: "Present",
                      endYear: "",
                      currentlyWorking: true,
                      description: "",
                      bullets: [],
                      hidden: false,
                    })
                  }
                  text="Add Work Experience"
                />
              </div>
            </ResumeSection>

            {/* Projects Section */}
            <ResumeSection
              title="Projects"
              isCollapsed={collapsedSections.projects}
              onToggle={() => toggleSection("projects")}
            >
              <div className="space-y-6">
                {resumeData.projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onUpdate={(updatedProject) => {
                      const updated = [...resumeData.projects];
                      updated[index] = { ...updated[index], ...updatedProject };
                      handleArrayUpdate("projects", updated);
                    }}
                    onRemove={() => removeItem("projects", project.id)}
                    onToggleHidden={() => toggleHidden("projects", project.id)}
                  />
                ))}

                <AddNewButton
                  onClick={() =>
                    addNewItem("projects", {
                      title: "",
                      url: "",
                      organization: "",
                      city: "",
                      country: "",
                      startMonth: MONTHS[new Date().getMonth()],
                      startYear: new Date().getFullYear().toString(),
                      endMonth: "Present",
                      endYear: "",
                      currentlyWorking: true,
                      bullets: [],
                      hidden: false,
                    })
                  }
                  text="Add Project"
                />
              </div>
            </ResumeSection>
          </div>

          {/* Right Side - Preview with same dark theme */}
          <div className="bg-[#1A1F2C] rounded-xl p-6 border border-gray-700">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Work Experience Card Component
const WorkExperienceCard = ({
  experience,
  onUpdate,
  onRemove,
  onToggleHidden,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const handleDateChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const handleBulletsChange = (bullets) => {
    onUpdate({ bullets });
  };

  return (
    <ResumeItemCard
      type="work"
      item={experience}
      isEditing={isEditing}
      onEditToggle={() => setIsEditing(!isEditing)}
      onRemove={onRemove}
      onToggleHidden={onToggleHidden}
    >
      {isEditing ? (
        <div className="space-y-4">
          <InputWithCount
            label="Job Title"
            value={experience.title}
            onChange={(value) => handleFieldChange("title", value)}
            maxLength={100}
            validate={(value) =>
              value.trim().length > 0 ? "" : "Job title is required"
            }
          />

          <InputWithCount
            label="Company"
            value={experience.company}
            onChange={(value) => handleFieldChange("company", value)}
            maxLength={100}
            validate={(value) =>
              value.trim().length > 0 ? "" : "Company name is required"
            }
          />

          <SelectField
            label="Employment Type"
            value={experience.employmentType}
            onChange={(e) =>
              handleFieldChange("employmentType", e.target.value)
            }
            options={EMPLOYMENT_TYPES.map((type) => ({
              label: type,
              value: type,
            }))}
          />

          <InputWithCount
            label="Location"
            value={experience.location}
            onChange={(value) => handleFieldChange("location", value)}
            maxLength={100}
          />

          <DateRangeSelector
            startMonth={experience.startMonth}
            startYear={experience.startYear}
            endMonth={experience.endMonth}
            endYear={experience.endYear}
            currentlyWorking={experience.currentlyWorking}
            onDateChange={handleDateChange}
            workingText="I am currently working here"
          />

          <RichTextEditor
            value={experience.description}
            onChange={(value) => handleFieldChange("description", value)}
            placeholder="Describe your role and responsibilities..."
            small
          />

          <BulletPointsEditor
            bullets={experience.bullets}
            onChange={handleBulletsChange}
            addButtonText="Add Bullet"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <h4 className="font-semibold text-lg text-white">
            {experience.title}
          </h4>
          <p className="text-gray-300 text-sm">
            {experience.company} • {experience.employmentType} •{" "}
            {experience.location}
          </p>
          <p className="text-gray-400 text-sm">
            {experience.startMonth} {experience.startYear} -{" "}
            {experience.currentlyWorking
              ? "Present"
              : `${experience.endMonth} ${experience.endYear}`}
          </p>
          {experience.description && (
            <p className="text-gray-300 text-sm mt-2">
              {experience.description}
            </p>
          )}
          {experience.bullets.length > 0 && (
            <ul className="mt-2 space-y-1">
              {experience.bullets.map((bullet, index) => (
                <li key={index} className="text-gray-300 text-sm flex">
                  <span className="mr-2">•</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </ResumeItemCard>
  );
};

// Reusable Project Card Component
const ProjectCard = ({ project, onUpdate, onRemove, onToggleHidden }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const handleDateChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const handleBulletsChange = (bullets) => {
    onUpdate({ bullets });
  };

  return (
    <ResumeItemCard
      type="project"
      item={project}
      isEditing={isEditing}
      onEditToggle={() => setIsEditing(!isEditing)}
      onRemove={onRemove}
      onToggleHidden={onToggleHidden}
    >
      {isEditing ? (
        <div className="space-y-4">
          <InputWithCount
            label="Project Title"
            value={project.title}
            onChange={(value) => handleFieldChange("title", value)}
            maxLength={100}
            validate={(value) =>
              value.trim().length > 0 ? "" : "Project title is required"
            }
          />

          <LinkFieldWithEdit
            label="Project URL"
            value={project.url}
            onChange={(value) => handleFieldChange("url", value)}
          />

          <InputWithCount
            label="Organization"
            value={project.organization}
            onChange={(value) => handleFieldChange("organization", value)}
            maxLength={100}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputWithCount
              label="City"
              value={project.city}
              onChange={(value) => handleFieldChange("city", value)}
              maxLength={50}
            />
            <InputWithCount
              label="Country"
              value={project.country}
              onChange={(value) => handleFieldChange("country", value)}
              maxLength={50}
            />
          </div>

          <DateRangeSelector
            startMonth={project.startMonth}
            startYear={project.startYear}
            endMonth={project.endMonth}
            endYear={project.endYear}
            currentlyWorking={project.currentlyWorking}
            onDateChange={handleDateChange}
            workingText="I am currently working on this project"
          />

          <BulletPointsEditor
            bullets={project.bullets}
            onChange={handleBulletsChange}
            addButtonText="Add Bullet"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <h4 className="font-semibold text-lg text-white">{project.title}</h4>
          {project.url && (
            <p className="text-blue-400 text-sm">{project.url}</p>
          )}
          <p className="text-gray-300 text-sm">
            {project.organization} {project.city && `• ${project.city}`}{" "}
            {project.country && `• ${project.country}`}
          </p>
          <p className="text-gray-400 text-sm">
            {project.startMonth} {project.startYear} -{" "}
            {project.currentlyWorking
              ? "Present"
              : `${project.endMonth} ${project.endYear}`}
          </p>
          {project.bullets.length > 0 && (
            <ul className="mt-2 space-y-1">
              {project.bullets.map((bullet, index) => (
                <li key={index} className="text-gray-300 text-sm flex">
                  <span className="mr-2">•</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </ResumeItemCard>
  );
};

// Reusable Resume Item Card Component
const ResumeItemCard = ({
  type,
  item,
  isEditing,
  onEditToggle,
  onRemove,
  onToggleHidden,
  children,
}) => {
  const borderColor = type === "work" ? "border-green-500" : "border-blue-500";
  const bgColor = "bg-[#2A2F3C]";

  return (
    <div
      className={`border-l-2 ${borderColor} pl-4 relative ${bgColor} rounded-lg p-4 ${
        item.hidden ? "opacity-50" : ""
      }`}
    >
      {/* Header with Actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {!isEditing && (
            <>
              <h4 className="font-semibold text-lg text-white">
                {item.title || "Untitled"}
              </h4>
              {item.company && (
                <p className="text-gray-300 text-sm">{item.company}</p>
              )}
              {item.organization && (
                <p className="text-gray-300 text-sm">{item.organization}</p>
              )}
            </>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onToggleHidden}
            className={`p-2 rounded ${
              item.hidden
                ? "text-green-400 hover:text-green-300"
                : "text-yellow-400 hover:text-yellow-300"
            }`}
            title={item.hidden ? "Show" : "Hide"}
          >
            {item.hidden ? (
              <FiEye className="w-4 h-4" />
            ) : (
              <FiEyeOff className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onEditToggle}
            className="text-blue-400 hover:text-blue-300 p-2 rounded"
            title={isEditing ? "Cancel" : "Edit"}
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRemove}
            className="text-red-400 hover:text-red-300 p-2 rounded"
            title="Delete"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

// Reusable Date Range Selector Component
const DateRangeSelector = ({
  startMonth,
  startYear,
  endMonth,
  endYear,
  currentlyWorking,
  onDateChange,
  workingText,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormField label="Start Month">
            <select
              value={startMonth}
              onChange={(e) => onDateChange("startMonth", e.target.value)}
              className="w-full rounded-[15px] px-3 py-3.5 bg-[#333A44] text-white text-[15px] focus:outline-none focus:ring-1 focus:ring-gray-300"
            >
              {MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </FormField>
        </div>
        <div>
          <FormField label="Start Year">
            <select
              value={startYear}
              onChange={(e) => onDateChange("startYear", e.target.value)}
              className="w-full rounded-[15px] px-3 py-3.5 bg-[#333A44] text-white text-[15px] focus:outline-none focus:ring-1 focus:ring-gray-300"
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      {!currentlyWorking && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormField label="End Month">
              <select
                value={endMonth}
                onChange={(e) => onDateChange("endMonth", e.target.value)}
                className="w-full rounded-[15px] px-3 py-3.5 bg-[#333A44] text-white text-[15px] focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                {MONTHS.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
                <option value="Present">Present</option>
              </select>
            </FormField>
          </div>
          <div>
            <FormField label="End Year">
              <select
                value={endYear}
                onChange={(e) => onDateChange("endYear", e.target.value)}
                className="w-full rounded-[15px] px-3 py-3.5 bg-[#333A44] text-white text-[15px] focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
                <option value="">Present</option>
              </select>
            </FormField>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={currentlyWorking}
          onChange={(e) => onDateChange("currentlyWorking", e.target.checked)}
          className="rounded"
        />
        <label className="text-sm text-gray-300">{workingText}</label>
      </div>
    </div>
  );
};

// Reusable Bullet Points Editor Component
const BulletPointsEditor = ({ bullets, onChange, addButtonText }) => {
  const addBullet = () => {
    onChange([...bullets, ""]);
  };

  const updateBullet = (index, value) => {
    const updated = [...bullets];
    updated[index] = value;
    onChange(updated);
  };

  const removeBullet = (index) => {
    const updated = bullets.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-300">Bullet Points</label>
      <div className="space-y-2">
        {bullets.map((bullet, index) => (
          <div key={index} className="flex gap-2 items-start">
            <RichTextEditor
              value={bullet}
              onChange={(value) => updateBullet(index, value)}
              placeholder={`Bullet point ${index + 1}`}
              small
            />
            <button
              onClick={() => removeBullet(index)}
              className="text-red-400 hover:text-red-300 px-2 py-2 mt-1"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={addBullet}
          className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
        >
          <FiPlus className="w-3 h-3" /> {addButtonText}
        </button>
      </div>
    </div>
  );
};

// Reusable Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder, small = false }) => {
  const [isEditing, setIsEditing] = useState(!value);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border border-gray-600 rounded-lg p-3">
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 mb-3">
          <button className="p-1.5 rounded hover:bg-gray-600 text-sm">B</button>
          <button className="p-1.5 rounded hover:bg-gray-600 text-sm">I</button>
          <button className="p-1.5 rounded hover:bg-gray-600 text-sm">U</button>
          <button className="p-1.5 rounded hover:bg-gray-600 text-sm">G</button>
          <button className="p-1.5 rounded hover:bg-gray-600 text-sm">❤</button>
          <button className="p-1.5 rounded hover:bg-gray-600 text-sm">=</button>
          <button className="p-1.5 rounded hover:bg-gray-600 text-sm">
            Zx
          </button>
          <div className="flex-1"></div>
          <button className="p-1.5 rounded hover:bg-gray-600 text-sm">
            Write with AI
          </button>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={small ? 2 : 4}
          className="w-full rounded-lg p-3 bg-[#333A44] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder={placeholder}
        />
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={handleCancel}
            className="px-3 py-1.5 text-sm border border-gray-600 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-sm bg-blue-600 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer border border-dashed border-gray-600 rounded-lg p-3 hover:border-gray-400 ${
        small ? "min-h-[60px]" : "min-h-[100px]"
      }`}
    >
      {value ? (
        <p className="text-gray-300 text-sm whitespace-pre-wrap">{value}</p>
      ) : (
        <p className="text-gray-500 text-sm">{placeholder}</p>
      )}
    </div>
  );
};

// Reusable Link Field with Edit Component
const LinkFieldWithEdit = ({ label, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <FormField label={label}>
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 rounded-[15px] px-3 py-3.5 bg-[#333A44] text-white text-[15px] focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <button
            onClick={handleSave}
            className="px-3 py-2 bg-green-600 rounded-lg hover:bg-green-700"
          >
            ✓
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-2 bg-red-600 rounded-lg hover:bg-red-700"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-600 rounded-[15px] px-3 py-3.5 hover:border-gray-400"
        >
          <FiLink className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 truncate flex-1">
            {value || `Add ${label}`}
          </span>
          <FiEdit2 className="w-3 h-3 text-gray-400" />
        </div>
      )}
    </FormField>
  );
};

// Reusable Section Component
const ResumeSection = ({ title, isCollapsed, onToggle, children }) => {
  return (
    <div className="mb-6 border border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 bg-[#2A2F3C] hover:bg-[#333844] transition flex justify-between items-center"
      >
        <span className="font-semibold">{title}</span>
        {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
      </button>
      {!isCollapsed && <div className="p-4">{children}</div>}
    </div>
  );
};

// Reusable Add New Button Component
const AddNewButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-400 transition flex items-center justify-center gap-2"
    >
      <FiPlus className="w-4 h-4" /> {text}
    </button>
  );
};

// Resume Preview Component with Dark Theme
const ResumePreview = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto text-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-300 mt-2">
          {data.personalInfo.headline}
        </p>
        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-400">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.address}</span>
        </div>
        <div className="flex justify-center gap-4 mt-2 text-sm text-blue-400">
          <span>{data.personalInfo.linkedin}</span>
          <span>•</span>
          <span>{data.personalInfo.portfolio}</span>
        </div>
      </div>

      {/* Profile Summary */}
      {data.profileSummary && (
        <PreviewSection title="PROFILE SUMMARY">
          <p className="text-gray-300 leading-relaxed">{data.profileSummary}</p>
        </PreviewSection>
      )}

      {/* Work Experience */}
      {data.workExperience.filter((exp) => !exp.hidden).length > 0 && (
        <PreviewSection title="WORK EXPERIENCE">
          <div className="space-y-4">
            {data.workExperience
              .filter((exp) => !exp.hidden)
              .map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-white">
                      {exp.title}
                    </h3>
                    <span className="text-gray-400 text-sm">
                      {exp.startMonth} {exp.startYear} -{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : `${exp.endMonth} ${exp.endYear}`}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {exp.company} • {exp.employmentType} • {exp.location}
                  </p>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index} className="text-gray-300 text-sm flex">
                          <span className="mr-2">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </PreviewSection>
      )}

      {/* Projects */}
      {data.projects.filter((project) => !project.hidden).length > 0 && (
        <PreviewSection title="PROJECTS">
          <div className="space-y-6">
            {data.projects
              .filter((project) => !project.hidden)
              .map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-white">
                      {project.title}
                    </h3>
                    <span className="text-blue-400 text-sm">
                      {project.startMonth} {project.startYear} -{" "}
                      {project.currentlyWorking
                        ? "Present"
                        : `${project.endMonth} ${project.endYear}`}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {project.organization} {project.city && `• ${project.city}`}{" "}
                    {project.country && `• ${project.country}`}
                  </p>
                  {project.url && (
                    <p className="text-blue-400 text-sm mt-1">{project.url}</p>
                  )}
                  {project.bullets && project.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {project.bullets.map((bullet, index) => (
                        <li key={index} className="text-gray-300 text-sm flex">
                          <span className="mr-2">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </PreviewSection>
      )}
    </div>
  );
};

// Preview Section Component
const PreviewSection = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold border-b-2 border-gray-600 pb-2 mb-4 text-white">
        {title}
      </h2>
      {children}
    </div>
  );
};
