"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import DateRangeSelector from "./DateRangeSelector";
import { InputWithCount } from "../components/FormInput";
import SelectField from "../components/FormSelect";
import { educationData } from '@/app/data/data';

  const educationLevels = [
    { value: "", label: "Select education level" },
    { value: "10th", label: "10th" },
    { value: "12th", label: "12th" },
    { value: "Diploma", label: "Diploma" },
    { value: "Graduate", label: "Graduate" },
    { value: "Post Graduate", label: "Post Graduate" },
  ];

  
const EducationCard = ({
  education,
  onUpdate,
  onRemove,
  onToggleHidden,
  showErrors = false,
}) => {
  const [isOpen, setIsOpen] = useState(!education.degree);
  const [showCourseSuggestions, setShowCourseSuggestions] = useState(false);
  const [showSpecializationSuggestions, setShowSpecializationSuggestions] =
    useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(-1);
  const [selectedSpecializationIndex, setSelectedSpecializationIndex] =
    useState(-1);

  const courseInputRef = useRef(null);
  const specializationInputRef = useRef(null);



  const handleChange = (key, value) => {
    const updates = { [key]: value };

    if (key === "level" && value !== education.level) {
      updates.college = "";
      updates.course = "";
      updates.specialisation = "";
    }

    if (key === "course" && value !== education.course) {
      updates.specialisation = "";
    }

    onUpdate(updates);
  };

  // Course suggestions filtering - FIXED LOGIC
  const getCourseSuggestions = useMemo(() => {
    if (!education.level || !educationData[education.level]) return [];

    const courses = educationData[education.level].courses;
    const input = (education.course || "").trim().toLowerCase();

    if (!input || input.length === 0) {
      return courses.slice(0, 10); // Show only first 10 when empty
    }

    const startsWith = courses.filter((c) => c.toLowerCase().startsWith(input));
    const includes = courses.filter(
      (c) =>
        !c.toLowerCase().startsWith(input) && c.toLowerCase().includes(input)
    );

    return [...startsWith, ...includes].slice(0, 15); // Limit to 15 results
  }, [education.level, education.course]);

  // Specialization suggestions based on selected course - FIXED LOGIC
  const getSpecializationSuggestions = useMemo(() => {
    if (
      !education.level ||
      !education.course ||
      !educationData[education.level]
    )
      return [];

    const specializations =
      educationData[education.level].specializations[education.course] || [];
    const input = (education.specialisation || "").trim().toLowerCase();

    if (!input || input.length === 0) {
      return specializations;
    }

    const startsWith = specializations.filter((s) =>
      s.toLowerCase().startsWith(input)
    );
    const includes = specializations.filter(
      (s) =>
        !s.toLowerCase().startsWith(input) && s.toLowerCase().includes(input)
    );

    return [...startsWith, ...includes];
  }, [education.level, education.course, education.specialisation]);


  const validateCard = () => {
    const cardErrors = {};

    if (!education.level?.trim()) {
      cardErrors.level = "Education level is required";
    }

    if (!education.college?.trim()) {
      cardErrors.college = "College name is required";
    }

    if (!education.course?.trim()) {
      cardErrors.course = "Course is required";
    }

    if (!education.startMonth || !education.startYear) {
      cardErrors.startDate = "Start date is required";
    }

    if (
      !education.currentlyStudying &&
      (!education.endMonth || !education.endYear)
    ) {
      cardErrors.endDate = "End date is required when not currently studying";
    }

    return cardErrors;
  };

  const cardErrors = validateCard();
  const hasErrors = Object.keys(cardErrors).length > 0;

  // Handle keyboard navigation for course suggestions
  const handleCourseKeyDown = (e) => {
    const suggestions = getCourseSuggestions;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedCourseIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
      setShowCourseSuggestions(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedCourseIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
      setShowCourseSuggestions(true);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedCourseIndex >= 0 && suggestions[selectedCourseIndex]) {
        handleChange("course", suggestions[selectedCourseIndex]);
        setShowCourseSuggestions(false);
        setSelectedCourseIndex(-1);
      } else if (suggestions.length > 0) {
        handleChange("course", suggestions[0]);
        setShowCourseSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowCourseSuggestions(false);
      setSelectedCourseIndex(-1);
    }
  };

  // Handle keyboard navigation for specialization suggestions
  const handleSpecializationKeyDown = (e) => {
    const suggestions = getSpecializationSuggestions;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSpecializationIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
      setShowSpecializationSuggestions(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSpecializationIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
      setShowSpecializationSuggestions(true);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (
        selectedSpecializationIndex >= 0 &&
        suggestions[selectedSpecializationIndex]
      ) {
        handleChange(
          "specialisation",
          suggestions[selectedSpecializationIndex]
        );
        setShowSpecializationSuggestions(false);
        setSelectedSpecializationIndex(-1);
      } else if (suggestions.length > 0) {
        handleChange("specialisation", suggestions[0]);
        setShowSpecializationSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSpecializationSuggestions(false);
      setSelectedSpecializationIndex(-1);
    }
  };

  useEffect(() => {
    setSelectedCourseIndex(-1);
  }, [getCourseSuggestions.length]);

  useEffect(() => {
    setSelectedSpecializationIndex(-1);
  }, [getSpecializationSuggestions.length]);

  // Check if course has specializations
  const hasSpecializations = useMemo(() => {
    if (
      !education.level ||
      !education.course ||
      !educationData[education.level]
    )
      return false;
    return (
      educationData[education.level].specializations[education.course]?.length >
      0
    );
  }, [education.level, education.course]);

  return (
    <div
      className={`relative p-4 mb-6  transition-all duration-200 ${education.hidden
          ? "opacity-50"
          : hasErrors && showErrors
            ? "border-red-500"
            : ""
        } bg-white`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <h4 className="font-semibold text-lg text-black truncate">
            {education.course || "New Education"}
          </h4>
          {education.level && (
            <p className="text-gray-400 text-sm mt-1 truncate">
              {educationLevels.find((l) => l.value === education.level)?.label}
              {education.college && ` • ${education.college}`}
            </p>
          )}
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-gray-50 p-2 rounded transition-colors"
            title={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? (
              <FiChevronUp className="w-4 h-4" />
            ) : (
              <FiChevronDown className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={onRemove}
            className="text-red-400 hover:text-red-300 p-2 rounded transition-colors"
            title="Delete"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="space-y-2">
          <SelectField
            label="Level of Education *"
            options={educationLevels}
            value={education.level || ""}
            onChange={(e) => handleChange("level", e.target.value)}
            error={showErrors && cardErrors.level}
          />


          <div className="">
            {/* Level Selection */}
            <InputWithCount
              ref={courseInputRef}
              label="Course / Degree *"
              placeholder="Type your course/degree name..."
              value={education.course || ""}
              onChange={(val) => {
                handleChange("course", val);
                setShowCourseSuggestions(true);
                setSelectedCourseIndex(-1);
              }}
              onFocus={() => {
                if (education.level) {
                  setShowCourseSuggestions(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => setShowCourseSuggestions(false), 300);
              }}
              onKeyDown={handleCourseKeyDown}
              maxLength={150}
              error={showErrors && cardErrors.course}
            />

            {/* Course Suggestions Dropdown */}
            {showCourseSuggestions &&
              education.level &&
              getCourseSuggestions.length > 0 && (
                <div className="absolute z-[100] mt-1 w-full bg-white border border-[#aeadad] rounded-lg max-h-60 overflow-y-auto shadow-2xl">
                  {getCourseSuggestions.map((course, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2.5 text-sm text-gray-300 cursor-pointer border-b border-[#aeadad] last:border-b-0 transition-colors ${index === selectedCourseIndex
                          ? "bg-[#1b2838] text-white"
                          : "hover:bg-[#aeadad]"
                        }`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleChange("course", course);
                        setShowCourseSuggestions(false);
                        setSelectedCourseIndex(-1);
                      }}
                      onMouseEnter={() => setSelectedCourseIndex(index)}
                    >
                      {course}
                    </div>
                  ))}
                </div>
              )}
            {/* Course with Suggestions */}

            {/* College Name (No suggestions) */}
            <div>
              <InputWithCount
                label="College / University / Institute *"
                placeholder="Enter your college/university name..."
                value={education.college || ""}
                onChange={(val) => handleChange("college", val)}
                maxLength={100}
                error={showErrors && cardErrors.college}
              />
              {/* Specialization with Suggestions (Only if course has specializations) */}
              {hasSpecializations && (
                <div className="relative">
                  <InputWithCount
                    ref={specializationInputRef}
                    label="Specialization"
                    placeholder="Select or type your specialization..."
                    value={education.specialisation || ""}
                    onChange={(val) => {
                      handleChange("specialisation", val);
                      setShowSpecializationSuggestions(true);
                      setSelectedSpecializationIndex(-1);
                    }}
                    onFocus={() => {
                      setShowSpecializationSuggestions(true);
                    }}
                    onBlur={() => {
                      setTimeout(
                        () => setShowSpecializationSuggestions(false),
                        300
                      );
                    }}
                    onKeyDown={handleSpecializationKeyDown}
                    maxLength={100}
                  />

                  {/* Specialization Suggestions Dropdown */}
                  {showSpecializationSuggestions &&
                    getSpecializationSuggestions.length > 0 && (
                      <div className="absolute z-[100] mt-1 w-full bg-white border border-[#2a2f35] rounded-lg max-h-60 overflow-y-auto shadow-2xl">
                        {getSpecializationSuggestions.map(
                          (specialization, index) => (
                            <div
                              key={index}
                              className={`px-3 py-2.5 text-sm text-gray-300 cursor-pointer border-b border-[#aeadad] last:border-b-0 transition-colors ${index === selectedSpecializationIndex
                                  ? "bg-white text-black"
                                  : "hover:bg-[#fafafa]"
                                }`}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleChange("specialisation", specialization);
                                setShowSpecializationSuggestions(false);
                                setSelectedSpecializationIndex(-1);
                              }}
                              onMouseEnter={() =>
                                setSelectedSpecializationIndex(index)
                              }
                            >
                              {specialization}
                            </div>
                          )
                        )}
                      </div>
                    )}
                </div>
              )}

            </div>

            {/* Marks */}
            <InputWithCount
              label="Marks / Percentage / CGPA"
              placeholder="e.g., 85%, 8.5 CGPA, 450/500"
              value={education.marks || ""}
              onChange={(value) => handleChange("marks", value)}
              maxLength={50}
            />
          </div>

          {/* Date Range Selector */}
          <DateRangeSelector
            startMonth={education.startMonth}
            startYear={education.startYear}
            endMonth={education.endMonth}
            endYear={education.endYear}
            currentlyWorking={education.currentlyStudying}
            workingText="I am currently studying"
            onDateChange={(key, value) => {
              if (key === "currentlyWorking") {
                handleChange("currentlyStudying", value);
              } else {
                handleChange(key, value);
              }
            }}
            errors={{
              startDate: showErrors && cardErrors.startDate,
              endDate: showErrors && cardErrors.endDate,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EducationCard;