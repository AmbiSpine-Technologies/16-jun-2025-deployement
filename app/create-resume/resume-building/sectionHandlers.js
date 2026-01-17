// File: utils/sectionHandlers.js
import { 
  addEducationThunk, 
  addExperienceThunk, 
  addProjectThunk, 
  addCertificateThunk,
  saveEducationThunk,
  saveExperienceThunk,
  // ... baki thunks
} from "@/app/store/profileSlice";

export const getSectionThunks = (section) => {
  const handlers = {
    education: {
      add: addEducationThunk,
      saveAll: saveEducationThunk,
    },
    workExperience: {
      add: addExperienceThunk,
      saveAll: saveExperienceThunk,
    },
    projects: {
      add: addProjectThunk,
      saveAll: null, // Agar direct array save nahi hai
    },
    certificates: {
      add: addCertificateThunk,
      saveAll: null,
    }
  };

  return handlers[section] || { add: null, saveAll: null };
};