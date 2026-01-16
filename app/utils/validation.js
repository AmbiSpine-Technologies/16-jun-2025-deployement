// utils/validation.js
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  if (!phone) return true; // Phone is optional
  // Basic phone validation - allows international formats
  const phoneRegex = /^[+]?[1-9][\d\s\-()]{8,}$/;
  return phoneRegex.test(phone);
};
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateUrl = (url) => {
  if (!url) return ""; // empty is fine
  const pattern = /^https?:\/\/.+/;
  return pattern.test(url) ? "" : "Please enter a valid URL starting with http:// or https://";
};

export const validateDateRange = (startMonth, startYear, endMonth, endYear, currentlyWorking) => {
  if (!startMonth || !startYear) return false;
  if (!currentlyWorking && (!endMonth || !endYear)) return false;
  
  if (!currentlyWorking) {
    const startDate = new Date(startYear, getMonthNumber(startMonth));
    const endDate = new Date(endYear, getMonthNumber(endMonth));
    return startDate <= endDate;
  }
  
  return true;
};

const getMonthNumber = (month) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months.indexOf(month);
};

// utiles
// Define required fields for each section
const REQUIRED_FIELDS = {
  workExperience: ["title", "company", "startMonth", "startYear"], // endMonth/endYear optional if currentlyWorking
  education: ["degree", "institution", "startYear"], // endYear optional if currentlyStudying
  projects: ["title", "description"],
  certifications: ["name", "issuer"],
};

export const isSectionItemIncomplete = (item, sectionType) => {
  if (!item || !sectionType) return true;

  const requiredFields = REQUIRED_FIELDS[sectionType] || [];

  for (let field of requiredFields) {
    if (!item[field] || !item[field].toString().trim()) {
      return true;
    }
  }

  // Special handling for Work Experience and Education for current status
  if (sectionType === "workExperience" && !item.currentlyWorking) {
    if (!item.endMonth || !item.endYear) return true;
  }

  if (sectionType === "education" && !item.currentlyStudying) {
    if (!item.endYear) return true;
  }

  return false; // all required fields filled
};
