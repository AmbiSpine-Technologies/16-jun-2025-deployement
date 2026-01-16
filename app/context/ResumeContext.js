"use client";
import { useCallback } from "react"
import { createContext, useContext, useState } from "react";

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
 const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: "", lastName: "", headline: "", email: "",
      phone: "", country: "", state: "", city: "", address: "", avatar: null
    },
    socialLinks: [],
    certificates: [],
    publications: [],
    awardsAchievements: [],
    profileSummary: "",
    projects: [],
    workExperience: [],
    education: [],
    skills: { technical: [], soft: [] },
    interests: [],
    languages: [],
    accomplishments: [],
  });

  // 2. UI & Customization States
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState("modern");
  const [currentFont, setCurrentFont] = useState("inter");
  const [currentColor, setCurrentColor] = useState("#0013E3");
  const [currentTheme, setCurrentTheme] = useState("modern-pro");
const [profileImage, setProfileImage] = useState(null);

  const handleImageUpdate = (imageUrl) => {
    setProfileImage(imageUrl);
  };

  // 3. Helper function to update nested data easily
  const updateResumeData = useCallback((newData) => {
    setResumeData((prev) => ({
      ...prev,
      ...newData,
    }));
  }, []);

  // 4. Helper for Specific Section Updates (e.g., Personal Info)
  const updatePersonalInfo = useCallback((info) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  }, []);
  return (
    <ResumeContext.Provider
      value={{
    // Data States
        resumeData,
        setResumeData,
        updateResumeData,
        updatePersonalInfo,

        profileImage,
      handleImageUpdate,
        // File States
        uploadedResumeUrl,
        setUploadedResumeUrl,

        // Style States
        currentTemplate,
        setCurrentTemplate,
        currentFont,
        setCurrentFont,
        currentColor,
        setCurrentColor,
        currentTheme,
        setCurrentTheme,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);
