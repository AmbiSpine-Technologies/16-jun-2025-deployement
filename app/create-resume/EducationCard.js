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

  // Complete Indian Education Database with Courses and Specializations
  const educationData = {
    "10th": {
      boards: [
        "Central Board of Secondary Education (CBSE)",
        "Indian Certificate of Secondary Education (ICSE)",
        "National Institute of Open Schooling (NIOS)",
        "State Board",
        "Kendriya Vidyalaya",
        "Jawahar Navodaya Vidyalaya",
      ],
      courses: [
        "Secondary School Certificate (SSC)",
        "High School Diploma",
        "Matriculation",
        "Class X",
      ],
      specializations: {},
    },
    "12th": {
      boards: [
        "Central Board of Secondary Education (CBSE)",
        "Indian School Certificate (ISC)",
        "State Board",
        "National Institute of Open Schooling (NIOS)",
      ],
      courses: [
        "Higher Secondary Certificate (HSC) - Science",
        "Higher Secondary Certificate (HSC) - Commerce",
        "Higher Secondary Certificate (HSC) - Arts",
        "Intermediate - MPC (Maths, Physics, Chemistry)",
        "Intermediate - BiPC (Biology, Physics, Chemistry)",
        "Intermediate - CEC (Commerce, Economics, Civics)",
        "Pre-University Course (PUC) - Science",
        "Pre-University Course (PUC) - Commerce",
        "Pre-University Course (PUC) - Arts",
      ],
      specializations: {
        "Higher Secondary Certificate (HSC) - Science": [
          "Physics, Chemistry, Maths (PCM)",
          "Physics, Chemistry, Biology (PCB)",
          "Computer Science",
        ],
        "Higher Secondary Certificate (HSC) - Commerce": [
          "Accountancy",
          "Business Studies",
          "Economics",
        ],
        "Higher Secondary Certificate (HSC) - Arts": [
          "History",
          "Political Science",
          "Economics",
          "Psychology",
          "Sociology",
        ],
      },
    },
    Diploma: {
      boards: [],
      courses: [
        "Diploma in Computer Engineering",
        "Diploma in Mechanical Engineering",
        "Diploma in Civil Engineering",
        "Diploma in Electrical Engineering",
        "Diploma in Electronics & Communication Engineering",
        "Diploma in Information Technology",
        "Diploma in Automobile Engineering",
        "Diploma in Chemical Engineering",
        "Diploma in Architecture",
        "Diploma in Interior Design",
        "Diploma in Fashion Design",
        "Diploma in Graphic Design",
        "Diploma in Hotel Management",
        "Diploma in Pharmacy",
      ],
      specializations: {
        "Diploma in Computer Engineering": [
          "Software Development",
          "Web Development",
          "Database Management",
          "Network Administration",
        ],
        "Diploma in Mechanical Engineering": [
          "Automobile",
          "Production",
          "Manufacturing",
          "CAD/CAM",
        ],
        "Diploma in Civil Engineering": [
          "Construction Management",
          "Surveying",
          "Structural Engineering",
        ],
        "Diploma in Electrical Engineering": [
          "Power Systems",
          "Control Systems",
          "Electronics",
        ],
      },
    },
    Graduate: {
      boards: [],
      courses: [
        // Engineering
        "Bachelor of Technology (B.Tech) in Computer Science",
        "Bachelor of Technology (B.Tech) in Information Technology",
        "Bachelor of Technology (B.Tech) in Electronics & Communication",
        "Bachelor of Technology (B.Tech) in Mechanical Engineering",
        "Bachelor of Technology (B.Tech) in Civil Engineering",
        "Bachelor of Technology (B.Tech) in Electrical Engineering",
        "Bachelor of Technology (B.Tech) in Chemical Engineering",
        "Bachelor of Technology (B.Tech) in Biotechnology",
        "Bachelor of Technology (B.Tech) in Aerospace Engineering",
        "Bachelor of Technology (B.Tech) in Automobile Engineering",
        "Bachelor of Engineering (BE) in Computer Science",
        "Bachelor of Engineering (BE) in Mechanical Engineering",
        "Bachelor of Engineering (BE) in Civil Engineering",
        "Bachelor of Engineering (BE) in Electrical Engineering",

        // Computer Applications
        "Bachelor of Computer Applications (BCA)",
        "Bachelor of Science (B.Sc) in Computer Science",
        "Bachelor of Science (B.Sc) in Information Technology",

        // Science
        "Bachelor of Science (B.Sc) in Physics",
        "Bachelor of Science (B.Sc) in Chemistry",
        "Bachelor of Science (B.Sc) in Mathematics",
        "Bachelor of Science (B.Sc) in Biology",
        "Bachelor of Science (B.Sc) in Biotechnology",
        "Bachelor of Science (B.Sc) in Microbiology",
        "Bachelor of Science (B.Sc) in Zoology",
        "Bachelor of Science (B.Sc) in Botany",
        "Bachelor of Science (B.Sc) in Statistics",
        "Bachelor of Science (B.Sc) in Environmental Science",
        "Bachelor of Science (B.Sc) in Agriculture",
        "Bachelor of Science (B.Sc) in Nursing",

        // Commerce & Management
        "Bachelor of Commerce (B.Com)",
        "Bachelor of Commerce (B.Com) Honors",
        "Bachelor of Business Administration (BBA)",
        "Bachelor of Business Administration (BBA) in Marketing",
        "Bachelor of Business Administration (BBA) in Finance",
        "Bachelor of Business Administration (BBA) in Human Resources",
        "Bachelor of Business Administration (BBA) in International Business",
        "Bachelor of Management Studies (BMS)",
        "Bachelor of Business Management (BBM)",
        "Bachelor of Commerce (B.Com) in Accounting",
        "Bachelor of Commerce (B.Com) in Finance",
        "Bachelor of Commerce (B.Com) in Banking",
        "Bachelor of Commerce (B.Com) in Taxation",

        // Arts & Humanities
        "Bachelor of Arts (BA)",
        "Bachelor of Arts (BA) in English",
        "Bachelor of Arts (BA) in Hindi",
        "Bachelor of Arts (BA) in History",
        "Bachelor of Arts (BA) in Political Science",
        "Bachelor of Arts (BA) in Economics",
        "Bachelor of Arts (BA) in Psychology",
        "Bachelor of Arts (BA) in Sociology",
        "Bachelor of Arts (BA) in Philosophy",
        "Bachelor of Arts (BA) in Geography",
        "Bachelor of Arts (BA) in Journalism",
        "Bachelor of Arts (BA) in Mass Communication",

        // Design & Architecture
        "Bachelor of Architecture (B.Arch)",
        "Bachelor of Design (B.Des) in Fashion Design",
        "Bachelor of Design (B.Des) in Interior Design",
        "Bachelor of Design (B.Des) in Graphic Design",
        "Bachelor of Fine Arts (BFA)",

        // Medical
        "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
        "Bachelor of Dental Surgery (BDS)",
        "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
        "Bachelor of Homeopathic Medicine and Surgery (BHMS)",
        "Bachelor of Pharmacy (B.Pharm)",
        "Bachelor of Physiotherapy (BPT)",

        // Law
        "Bachelor of Laws (LLB)",
        "Bachelor of Arts, Bachelor of Laws (BA LLB)",
        "Bachelor of Business Administration, Bachelor of Laws (BBA LLB)",

        // Hotel Management
        "Bachelor of Hotel Management (BHM)",
        "Bachelor of Science (B.Sc) in Hospitality & Hotel Administration",

        // Mass Communication
        "Bachelor of Journalism and Mass Communication (BJMC)",
        "Bachelor of Mass Media (BMM)",

        // Education
        "Bachelor of Education (B.Ed)",

        // Others
        "Bachelor of Social Work (BSW)",
        "Bachelor of Library and Information Science (BLIS)",
      ],
      specializations: {
        "Bachelor of Technology (B.Tech) in Computer Science": [
          "Artificial Intelligence",
          "Machine Learning",
          "Data Science",
          "Cyber Security",
          "Cloud Computing",
          "Software Engineering",
          "Web Development",
          "Mobile App Development",
        ],
        "Bachelor of Technology (B.Tech) in Information Technology": [
          "Software Development",
          "Network Security",
          "Database Management",
          "Web Technologies",
          "Cloud Computing",
        ],
        "Bachelor of Technology (B.Tech) in Electronics & Communication": [
          "VLSI Design",
          "Embedded Systems",
          "Communication Systems",
          "Signal Processing",
          "Internet of Things",
        ],
        "Bachelor of Technology (B.Tech) in Mechanical Engineering": [
          "Automotive Engineering",
          "Manufacturing",
          "Thermal Engineering",
          "Robotics",
          "CAD/CAM",
        ],
        "Bachelor of Technology (B.Tech) in Civil Engineering": [
          "Structural Engineering",
          "Transportation Engineering",
          "Geotechnical Engineering",
          "Construction Management",
          "Environmental Engineering",
        ],
        "Bachelor of Computer Applications (BCA)": [
          "Software Development",
          "Web Development",
          "Mobile App Development",
          "Database Management",
          "Cloud Computing",
          "Data Analytics",
        ],
        "Bachelor of Science (B.Sc) in Computer Science": [
          "Software Engineering",
          "Data Science",
          "Artificial Intelligence",
          "Cyber Security",
          "Networking",
        ],
        "Bachelor of Commerce (B.Com)": [
          "Accounting & Finance",
          "Banking",
          "Taxation",
          "E-Commerce",
          "Business Analytics",
          "Investment Management",
        ],
        "Bachelor of Commerce (B.Com) Honors": [
          "Advanced Accounting",
          "Corporate Finance",
          "Business Law",
          "Taxation",
        ],
        "Bachelor of Business Administration (BBA)": [
          "Marketing",
          "Finance",
          "Human Resources",
          "International Business",
          "Operations Management",
          "Business Analytics",
          "Entrepreneurship",
        ],
        "Bachelor of Business Administration (BBA) in Marketing": [
          "Digital Marketing",
          "Brand Management",
          "Sales Management",
          "Market Research",
        ],
        "Bachelor of Business Administration (BBA) in Finance": [
          "Investment Banking",
          "Financial Planning",
          "Corporate Finance",
          "Risk Management",
        ],
        "Bachelor of Business Administration (BBA) in Human Resources": [
          "Talent Management",
          "Organizational Behavior",
          "Compensation Management",
          "HR Analytics",
        ],
        "Bachelor of Business Administration (BBA) in International Business": [
          "Global Marketing",
          "International Trade",
          "Cross-Cultural Management",
          "Export-Import Management",
        ],
        "Bachelor of Management Studies (BMS)": [
          "Strategic Management",
          "Business Law",
          "Organizational Behavior",
          "Financial Management",
        ],
        "Bachelor of Arts (BA)": [
          "English Literature",
          "History",
          "Political Science",
          "Economics",
          "Sociology",
          "Psychology",
        ],
        "Bachelor of Arts (BA) in English": [
          "Literature",
          "Linguistics",
          "Creative Writing",
          "Journalism",
          "Communication Studies",
        ],
        "Bachelor of Arts (BA) in Economics": [
          "Econometrics",
          "Development Economics",
          "International Economics",
          "Financial Economics",
          "Behavioral Economics",
        ],
        "Bachelor of Arts (BA) in Psychology": [
          "Clinical Psychology",
          "Counseling Psychology",
          "Organizational Psychology",
          "Child Development",
        ],
        "Bachelor of Science (B.Sc) in Biotechnology": [
          "Genetic Engineering",
          "Bioinformatics",
          "Medical Biotechnology",
          "Industrial Biotechnology",
        ],
        "Bachelor of Science (B.Sc) in Microbiology": [
          "Medical Microbiology",
          "Industrial Microbiology",
          "Food Microbiology",
          "Environmental Microbiology",
        ],
      },
    },
    "Post Graduate": {
      boards: [],
      courses: [
        // Engineering
        "Master of Technology (M.Tech) in Computer Science",
        "Master of Technology (M.Tech) in Information Technology",
        "Master of Technology (M.Tech) in Electronics & Communication",
        "Master of Technology (M.Tech) in Mechanical Engineering",
        "Master of Technology (M.Tech) in Civil Engineering",
        "Master of Technology (M.Tech) in Electrical Engineering",
        "Master of Technology (M.Tech) in VLSI Design",
        "Master of Technology (M.Tech) in Data Science",
        "Master of Technology (M.Tech) in Artificial Intelligence",
        "Master of Engineering (ME) in Computer Science",
        "Master of Engineering (ME) in Structural Engineering",

        // Management
        "Master of Business Administration (MBA)",
        "Master of Business Administration (MBA) in Marketing",
        "Master of Business Administration (MBA) in Finance",
        "Master of Business Administration (MBA) in Human Resources",
        "Master of Business Administration (MBA) in Operations",
        "Master of Business Administration (MBA) in International Business",
        "Master of Business Administration (MBA) in Business Analytics",
        "Post Graduate Diploma in Management (PGDM)",
        "Post Graduate Diploma in Management (PGDM) in Marketing",
        "Post Graduate Diploma in Management (PGDM) in Finance",
        "Post Graduate Diploma in Management (PGDM) in Human Resources",
        "Master of Management Studies (MMS)",

        // Computer Applications
        "Master of Computer Applications (MCA)",
        "Master of Science (M.Sc) in Computer Science",
        "Master of Science (M.Sc) in Information Technology",
        "Master of Science (M.Sc) in Data Science",
        "Master of Science (M.Sc) in Artificial Intelligence",

        // Science
        "Master of Science (M.Sc) in Physics",
        "Master of Science (M.Sc) in Chemistry",
        "Master of Science (M.Sc) in Mathematics",
        "Master of Science (M.Sc) in Biology",
        "Master of Science (M.Sc) in Biotechnology",
        "Master of Science (M.Sc) in Microbiology",
        "Master of Science (M.Sc) in Environmental Science",
        "Master of Science (M.Sc) in Statistics",

        // Commerce
        "Master of Commerce (M.Com)",
        "Master of Commerce (M.Com) in Accounting",
        "Master of Commerce (M.Com) in Finance",
        "Master of Commerce (M.Com) in Banking",

        // Arts & Humanities
        "Master of Arts (MA) in English",
        "Master of Arts (MA) in Hindi",
        "Master of Arts (MA) in History",
        "Master of Arts (MA) in Political Science",
        "Master of Arts (MA) in Economics",
        "Master of Arts (MA) in Psychology",
        "Master of Arts (MA) in Sociology",
        "Master of Arts (MA) in Philosophy",
        "Master of Arts (MA) in Journalism",
        "Master of Arts (MA) in Mass Communication",

        // Design
        "Master of Design (M.Des) in Fashion Design",
        "Master of Design (M.Des) in Interior Design",
        "Master of Design (M.Des) in Product Design",
        "Master of Fine Arts (MFA)",

        // Medical
        "Doctor of Medicine (MD)",
        "Master of Surgery (MS)",
        "Master of Dental Surgery (MDS)",
        "Master of Pharmacy (M.Pharm)",

        // Law
        "Master of Laws (LLM)",

        // Others
        "Master of Social Work (MSW)",
        "Master of Public Health (MPH)",
        "Master of Library and Information Science (MLIS)",
        "Master of Education (M.Ed)",
      ],
      specializations: {
        "Master of Business Administration (MBA)": [
          "Marketing",
          "Finance",
          "Human Resources",
          "Operations Management",
          "International Business",
          "Business Analytics",
          "Supply Chain Management",
          "Entrepreneurship",
          "Digital Marketing",
          "Financial Analysis",
        ],
        "Master of Business Administration (MBA) in Marketing": [
          "Digital Marketing",
          "Brand Management",
          "Sales & Distribution",
          "Consumer Behavior",
          "Market Research",
        ],
        "Master of Business Administration (MBA) in Finance": [
          "Investment Banking",
          "Corporate Finance",
          "Financial Markets",
          "Risk Management",
          "Wealth Management",
        ],
        "Master of Business Administration (MBA) in Human Resources": [
          "Talent Management",
          "Organizational Development",
          "Compensation & Benefits",
          "HR Analytics",
          "Labor Relations",
        ],
        "Master of Business Administration (MBA) in Business Analytics": [
          "Data Science",
          "Machine Learning",
          "Predictive Analytics",
          "Business Intelligence",
          "Big Data",
        ],
        "Post Graduate Diploma in Management (PGDM)": [
          "Marketing",
          "Finance",
          "Human Resources",
          "Operations",
          "International Business",
          "Business Analytics",
        ],
        "Master of Technology (M.Tech) in Computer Science": [
          "Artificial Intelligence",
          "Machine Learning",
          "Data Science",
          "Cyber Security",
          "Cloud Computing",
          "Software Engineering",
          "Internet of Things",
        ],
        "Master of Computer Applications (MCA)": [
          "Software Development",
          "Web Technologies",
          "Mobile Computing",
          "Cloud Computing",
          "Data Analytics",
          "Cyber Security",
        ],
        "Master of Science (M.Sc) in Data Science": [
          "Big Data Analytics",
          "Machine Learning",
          "Business Intelligence",
          "Predictive Analytics",
          "Statistical Modeling",
        ],
        "Master of Science (M.Sc) in Artificial Intelligence": [
          "Machine Learning",
          "Deep Learning",
          "Natural Language Processing",
          "Computer Vision",
          "Robotics",
        ],
        "Master of Commerce (M.Com)": [
          "Advanced Accounting",
          "Corporate Finance",
          "Taxation",
          "Auditing",
          "Financial Management",
        ],
        "Master of Arts (MA) in English": [
          "Literature",
          "Linguistics",
          "Creative Writing",
          "Cultural Studies",
          "Comparative Literature",
        ],
        "Master of Arts (MA) in Economics": [
          "Development Economics",
          "Financial Economics",
          "International Economics",
          "Econometrics",
          "Public Policy",
        ],
      },
    },
  };

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

  const educationLevels = [
    { value: "", label: "Select education level" },
    { value: "10th", label: "10th" },
    { value: "12th", label: "12th" },
    { value: "Diploma", label: "Diploma" },
    { value: "Graduate", label: "Graduate" },
    { value: "Post Graduate", label: "Post Graduate" },
  ];

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