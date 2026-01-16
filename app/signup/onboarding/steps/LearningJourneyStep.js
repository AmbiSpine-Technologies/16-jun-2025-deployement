"use client";
import React, { useEffect } from "react";
import FormDropdown from "../../../components/FormDropdown";
import SearchableDropdown from "../../../components/SearchableDropdown";
import { InputField } from "../../../components/InputField";

export default function LearningJourneyStep({ data, updateData,  errors, clearError }) {
  const learningJourney = data.learningJourney || {};

  const handleChange = (field, value) => {
if (clearError && errors[field]) {
      clearError(field);
    }
    // Sirf lookingForJobOpportunities update karo, journeyType change mat karo
    if (field === "lookingForJobOpportunities") {
      updateData("learningJourney", {
        ...learningJourney,
        lookingForJobOpportunities: value,
      });
      return;
    }
    // Agar education level change ho raha hai to degree clear kar do
    if (field === "educationLevel") {
      updateData("learningJourney", {
        ...learningJourney,
        educationLevel: value,
        degree: "", // Clear degree
        fieldOfStudy: "", // Clear field of study
        specialization: "", // Clear specialization
      });
      return;
    }

    // Agar degree change ho raha hai to specialization clear kar do
    if (field === "degree") {
      updateData("learningJourney", {
        ...learningJourney,
        degree: value,
        specialization: "", // Clear specialization
      });
      return;
    }

    // Agar field of study change ho raha hai to specialization clear kar do
    if (field === "fieldOfStudy") {
      updateData("learningJourney", {
        ...learningJourney,
        fieldOfStudy: value,
        specialization: "", // Clear specialization
      });
      return;
    }

    updateData("learningJourney", {
      ...learningJourney,
      [field]: value,
    });

   
  };

  const educationLevelOptions = [
    { value: "", label: "Select Education Level" },
    { value: "10th", label: "10th" },
    { value: "12th", label: "12th" },
    { value: "Diploma", label: "Diploma" },
    { value: "Under Graduate", label: "Under Graduate" },
    { value: "Post Graduate", label: "Post Graduate" },
    { value: "Doctorate / PhD", label: "Doctorate / PhD" },
    { value: "Other", label: "Other"}
    
  ];

  // Degree options based on education level
  const getDegreeOptions = () => {
    const level = learningJourney.educationLevel;

    if (level === "Under Graduate") {
      return [
        "Bachelor of Technology (B.Tech)",
        "Bachelor of Engineering (B.E.)",
        "Bachelor of Computer Applications (BCA)",
        "Bachelor of Science (B.Sc)",
        "Bachelor of Arts (B.A.)",
        "Bachelor of Commerce (B.Com)",
        "Bachelor of Business Administration (BBA)",
        "Bachelor of Design (B.Des)",
        "Bachelor of Architecture (B.Arch)",
        "Bachelor of Pharmacy (B.Pharm)",
        "Bachelor of Medicine (MBBS)",
        "Bachelor of Dental Surgery (BDS)",
        "Bachelor of Law (LLB)",
        "Bachelor of Education (B.Ed)",
      ];
    } else if (level === "Post Graduate") {
      return [
        "Master of Technology (M.Tech)",
        "Master of Engineering (M.E.)",
        "Master of Computer Applications (MCA)",
        "Master of Science (M.Sc)",
        "Master of Arts (M.A.)",
        "Master of Commerce (M.Com)",
        "Master of Business Administration (MBA)",
        "Master of Design (M.Des)",
        "Master of Architecture (M.Arch)",
        "Master of Pharmacy (M.Pharm)",
        "Master of Medicine (MD/MS)",
        "Master of Dental Surgery (MDS)",
        "Master of Law (LLM)",
        "Master of Education (M.Ed)",
      ];
    } else if (level === "Diploma") {
      return [
        "Diploma in Engineering",
        "Diploma in Computer Science",
        "Diploma in Information Technology",
        "Diploma in Electronics",
        "Diploma in Mechanical Engineering",
        "Diploma in Civil Engineering",
        "Diploma in Business Management",
        "Diploma in Design",
        "Diploma in Digital Marketing",
      ];
    } else if (level === "Doctorate / PhD") {
      return [
        "Doctor of Philosophy (PhD)",
        "Doctor of Science (D.Sc)",
        "Doctor of Engineering (D.Eng)",
        "Doctor of Medicine (DM)",
        "Doctor of Business Administration (DBA)",
      ];
    } else if (level === "12th" || level === "10th") {
      return ["Secondary Education"];
    }

    return [];
  };


  const fieldOfStudyByEducationLevel = {
  "10th": [
    "Secondary Education",
  ],

  "12th": [
    "Science",
    "Commerce",
    "Arts / Humanities",

  ],

  "Diploma": [
    "Computer Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
    "Information Technology",
    "Automobile Engineering",
    "Fashion Design",
    "Interior Design",
    "Hotel Management",
  ],

  "Under Graduate": [
    // Engineering & Tech
    "Computer Science & Engineering",
    "Information Technology",
    "Electronics & Communication Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Data Science",
    "Artificial Intelligence",

    // Commerce & Management
    "Commerce",
    "Business Administration",
    "Finance & Accounting",
    "Economics",

    // Science
    "Physics",
    "Chemistry",
    "Mathematics",
    "Statistics",
    "Biotechnology",

    // Arts & Humanities
    "Arts & Humanities",
    "English Literature",
    "Political Science",
    "Psychology",
    "Sociology",

    // Medical & Allied
    "Medicine",
    "Pharmacy",
    "Nursing",
    "Physiotherapy",

    // Design & Others
    "Design",
    "Fashion Design",
    "Architecture",
    "Law",
    "Education",
  ],

  "Post Graduate": [
    "Computer Science",
    "Data Science",
    "Artificial Intelligence",
    "Cybersecurity",
    "Management Studies",
    "Finance",
    "Marketing",
    "Human Resource Management",
    "Economics",
    "Psychology",
    "Public Administration",
    "International Relations",
    "Education",
    "Law",
    "Architecture",
  ],

  "Doctorate / PhD": [
    "Computer Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Engineering Sciences",
    "Management Research",
    "Economics",
    "Psychology",
    "Political Science",
    "Sociology",
    "Education Research",
    "Medical Sciences",
    "Interdisciplinary Research",
  ],
};

// const getFieldOfStudyOptions = () => {
//   const level = learningJourney.educationLevel;
//   return fieldOfStudyByEducationLevel[level] || [];
// };

const getFieldOfStudyOptions = () => {
  const level = learningJourney.educationLevel;
  const options = fieldOfStudyByEducationLevel[level] || [];
  return [...options];
};
  // Specialization based on Field of Study and Degree
  const getSpecializationOptions = () => {
    const field = learningJourney.fieldOfStudy;
    const degree = learningJourney.degree;

    // Engineering specializations
    if (
      field === "Computer Science & Engineering" ||
      degree?.includes("Computer")
    ) {
      return [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Cloud Computing",
        "Cybersecurity",
        "Web Development",
        "Mobile App Development",
        "Blockchain Technology",
        "Internet of Things (IoT)",
        "Computer Networks",
        "Database Management",
        "Software Engineering",
        "DevOps",
      ];
    }

    if (field === "Information Technology") {
      return [
        "Software Development",
        "Network Security",
        "Cloud Computing",
        "Database Administration",
        "IT Infrastructure",
        "Systems Analysis",
        "Web Technologies",
      ];
    }

    if (field === "Electronics & Communication Engineering") {
      return [
        "VLSI Design",
        "Embedded Systems",
        "Signal Processing",
        "Telecommunications",
        "Microelectronics",
        "Wireless Communication",
      ];
    }

    if (field === "Mechanical Engineering") {
      return [
        "Automotive Engineering",
        "Thermal Engineering",
        "Manufacturing Engineering",
        "Robotics & Automation",
        "CAD/CAM",
        "Industrial Engineering",
      ];
    }

    if (field === "Civil Engineering") {
      return [
        "Structural Engineering",
        "Transportation Engineering",
        "Environmental Engineering",
        "Geotechnical Engineering",
        "Construction Management",
        "Urban Planning",
      ];
    }

    // Business & Management specializations
    if (
      field === "Business Administration" ||
      degree?.includes("MBA") ||
      degree?.includes("BBA")
    ) {
      return [
        "Finance",
        "Marketing",
        "Human Resource Management",
        "Operations Management",
        "International Business",
        "Entrepreneurship",
        "Business Analytics",
        "Supply Chain Management",
        "Information Systems",
        "Strategic Management",
      ];
    }

    // Science specializations
    if (field === "Data Science" || field === "Statistics") {
      return [
        "Machine Learning",
        "Big Data Analytics",
        "Business Intelligence",
        "Predictive Analytics",
        "Data Mining",
        "Statistical Modeling",
      ];
    }

    // Design specializations
    if (field === "Design" || field?.includes("Design")) {
      return [
        "UI/UX Design",
        "Product Design",
        "Graphic Design",
        "Web Design",
        "Motion Graphics",
        "Brand Design",
        "Industrial Design",
      ];
    }

    // Commerce specializations
    if (field === "Commerce" || field === "Finance & Accounting") {
      return [
        "Accounting",
        "Taxation",
        "Banking",
        "Financial Management",
        "Cost Accounting",
        "Auditing",
      ];
    }

    // Medical specializations
    if (field === "Medicine" || degree?.includes("MBBS")) {
      return [
        "General Medicine",
        "Surgery",
        "Pediatrics",
        "Cardiology",
        "Orthopedics",
        "Dermatology",
        "Psychiatry",
      ];
    }

    // General specializations if no specific field matched
    return [
      "General",
      "Core Subject",
      "Applied Studies",
      "Research & Development",
      "Interdisciplinary Studies",
    ];
  };

  const learningModeOptions = [
    { value: "", label: "Select Learning Mode" },
    { value: "Regular", label: "Regular / Full-time" },
    { value: "Online", label: "Online / Distance" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Part-time", label: "Part-time" },
    { value: "Evening", label: "Evening / Weekend" },
  ];

  const ErrorMsg = ({ field }) => (
    errors[field] ? <p className="text-red-500 text-xs mt-1 ml-2">{errors[field]}</p> : null
  );

    useEffect(() => {
      if (learningJourney.lookingForJobOpportunities === undefined) {
        updateData("learningJourney", {
          ...learningJourney,
          lookingForJobOpportunities: true, // ✅ DEFAULT TRUE
        });
      }
    }, []);

  return (
  
    <div className="space-y-3">
      {/* Education Level */}
      <div>
        <FormDropdown
          label="Education Level"
          name="educationLevel"
          value={learningJourney.educationLevel || ""}
          onChange={(e) => handleChange("educationLevel", e.target.value)}
          options={educationLevelOptions}
        />
        <ErrorMsg field="educationLevel" />
      </div>

      {/* Degree */}
      <div>
        <SearchableDropdown
          label="Degree"
          value={learningJourney.degree || ""}
          onChange={(value) => handleChange("degree", value)}
          options={getDegreeOptions()}
          placeholder="Type or select degree..."
        />
        <ErrorMsg field="degree" />
      </div>

      {/* Field of Study */}
     

<div>


{learningJourney.educationLevel === "Other" ? 
 (
  <div>
    <InputField
      label="Please specify your education level"
      name="customEducationLevel"
      value={learningJourney.customEducationLevel || ""}
      onChange={(e) =>
        handleChange("customEducationLevel", e.target.value)
      }
    />
    <ErrorMsg field="customEducationLevel" />
  </div>
) : 
 <div>
        <SearchableDropdown
  label="Field of Study"
  value={learningJourney.fieldOfStudy || ""}
  onChange={(value) => handleChange("fieldOfStudy", value)}
  options={getFieldOfStudyOptions()}
  placeholder={
    learningJourney.educationLevel
      ? "Type or select field of study..."
      : "Select education level first"
  }
/>
        <ErrorMsg field="fieldOfStudy" />
      </div>
}

</div>
      {/* Specialization */}
      <div>
        <SearchableDropdown
          label="Specialization"
          value={learningJourney.specialization || ""}
          onChange={(value) => handleChange("specialization", value)}
          options={getSpecializationOptions()}
          placeholder="Type or select specialization..."
        />
       
        <ErrorMsg field="specialization" />
      </div>

      {/* Learning Mode */}
      <div>
        <FormDropdown
          label="Learning Mode"
          name="learningMode"
          value={learningJourney.learningMode || ""}
          onChange={(e) => handleChange("learningMode", e.target.value)}
          options={learningModeOptions}
        />
        <ErrorMsg field="learningMode" />
      </div>

      

      <div className="space-y-3 px-2">
  <label className="text-gray-500  text-sm font-medium block">
    Are you looking for job opportunities?
  </label>

  <div className="flex items-center gap-6 px-1">
    {/* YES */}
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="lookingForJobOpportunities"
        value="yes"
        checked={learningJourney.lookingForJobOpportunities === true}
        onChange={() =>
          handleChange("lookingForJobOpportunities", true)
        }
        className="h-4 w-4 text-blue-600 accent-blue-600 focus:ring-blue-500"
      />
      <span className="text-gray-700">Yes</span>
    </label>

    {/* NO */}
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="lookingForJobOpportunities"
        value="no"
        checked={learningJourney.lookingForJobOpportunities === false}
        onChange={() =>
          handleChange("lookingForJobOpportunities", false)
        }
        className="h-4 w-4 text-blue-600 accent-blue-600 focus:ring-blue-500"
      />
      <span className="text-gray-700">No</span>
    </label>
  </div>

  {/* Error Message */}
  {errors?.lookingForJobOpportunities && (
    <p className="text-sm text-red-500">
      {errors.lookingForJobOpportunities}
    </p>
  )}
</div>

    </div>
  );
}
