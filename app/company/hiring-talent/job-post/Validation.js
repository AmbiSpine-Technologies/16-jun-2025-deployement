
// utils/Validation.js

const PUBLIC_DOMAINS = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"
];

// 1. Basic Info Validation
export const validateBasicStep = (data, setErrors) => {
  const errors = {};

  if (!data.jobTitle?.trim()) errors.jobTitle = "Job title is required";
  if (!data.employmentType) errors.employmentType = "Employment type is required";
  if (!data.availability) errors.availability = "Work mode is required";

  // if ((data.availability === "Onsite" || data.availability === "Hybrid") && !data.location?.trim()) {
  //   errors.location = "Location is required for Onsite / Hybrid";
  // }
 if (!data.location?.trim()) {
    errors.location = "Location is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

export const validateDescriptionStep = (data, setErrors) => {
  const errors = {};

  // 🛑 Helper to check if Rich Text is actually empty (handling <p><br></p>)
  const isRichTextEmpty = (html) => {
    if (!html) return true;
    if (html === "<p><br></p>") return true;
    if (html.trim() === "") return true;
    // Strip tags to see if there is real text
    const textOnly = html.replace(/<[^>]*>/g, '').trim(); 
    return textOnly.length === 0;
  };

  if (isRichTextEmpty(data.jobSummary)) {
    errors.jobSummary = "Job Summary is required";
  }

  if (isRichTextEmpty(data.responsibilities)) {
    errors.responsibilities = "Responsibilities are required";
  }

  // 🛑 Critical Check: Skills must be an array with at least 1 item
  if (!data.skills || !Array.isArray(data.skills) || data.skills.length === 0) {
    errors.skills = "Please add at least one skill";
  }

  if (!data.industry?.trim()) {
    errors.industry = "Select an industry";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};


export const validateCandidateStep = (data, setErrors) => {
  const errors = {};
  
  if (!data.experience) errors.experience = "Experience level is required";
  if (!data.education) errors.education = "Education is required";
  
  // Salary Validation
  if (!data.minSalary) errors.minSalary = "Min CTC required";
  if (!data.maxSalary) errors.maxSalary = "Max CTC required";

  // Check logic: Min should not be greater than Max (Only if both are numbers)
  // isNaN check karein taaki "Not Disclosed" jaisi string par error na aaye
  const min = parseFloat(data.minSalary);
  const max = parseFloat(data.maxSalary);

  if (!isNaN(min) && !isNaN(max)) {
      if (min > max) {
          errors.minSalary = "Min CTC cannot be greater than Max";
      }
  }
  
  setErrors(errors);
  return Object.keys(errors).length === 0;
};

// 4. Company Details Validation
export const validateCompanyStep = (data, setErrors) => {
  const errors = {};

  if (!data.companyName?.trim()) errors.companyName = "Company Name is required";
  if (!data.website?.trim()) errors.website = "Website URL is required";
  if (!data.companyEmail?.trim()) errors.companyEmail = "Official Email is required";
  if (!data.companyProfile?.trim()) errors.companyProfile = "Company Profile is required";

  // Strict Domain Check
  if (data.companyEmail && data.website) {
    const emailDomain = data.companyEmail.split("@")[1]?.toLowerCase();
    
    // Check 1: No Public Domains
    if (PUBLIC_DOMAINS.includes(emailDomain)) {
      errors.companyEmail = "Please use a corporate email (not gmail/yahoo)";
    } 
    // Check 2: Domain Match (Optional but strict)
    else {
      const siteDomain = data.website
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .split("/")[0]
        .toLowerCase();
      
      if (!siteDomain.includes(emailDomain) && !emailDomain.includes(siteDomain)) {
         // Warning level error, or block
         // errors.companyEmail = "Email domain does not match website";
      }
    }
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

// 5. Screening Questions Validation (Optional)
export const validateScreeningStep = (data, setErrors) => {
    // Usually optional, but if you want to enforce at least 1 question:
    // const errors = {};
    // if (data.screeningQuestions.length === 0) errors.screening = "Add at least one question";
    // setErrors(errors);
    // return Object.keys(errors).length === 0;
    return true;
};