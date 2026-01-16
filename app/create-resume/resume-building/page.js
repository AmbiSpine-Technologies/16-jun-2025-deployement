"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { FiDownload, FiPlus } from "react-icons/fi";
import ResumeSection from "../ResumeSection";
import WorkExperienceCard from "../WorkExperienceCard";
import ProjectCard from "../ProjectCard";
import { InputWithCount } from "../../components/FormInput";
import ResumePreview from "./ResumePreview";
import EducationCard from "../EducationCard";
import ProfessionalSkillsInterestsSection from "../SkillsSection";
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateUrl,
} from "../../utils/validation";
import WebsiteSocialWebsiteCard from "../WebsiteSocialWebsiteCard";
import Certificate from "../Certificate";
import AwardAchivement from "../AwardsAchivement";
import Publications from "../Publications";
// import { generateResumePDF } from '../../utils/pdfGenerator'; // FIXED: Removed extra space
import { generateResumePDF } from "../../utils/generateResumePDF ";
import TemplateModal from "../template/TemplateModal";
import { resumeTemplates } from "../template/templateManager";
import TopActionBar from "./TopActionBar";
import { estimateETA, analyzeResume, parseResumeText } from "../utils/etaAnalyzer";
// import PremiumTemplateSystem from "./PremiumTemplateSystem";
import PremiumTemplateSystem, { PaymentView } from "../template/PremiumTemplateSystem";
import RichTextEditorInput from "@/app/components/RichTextEditorInput";
import DateRangeSelector from "../DateRangeSelector";
import CheckboxField from "@/app/components/CheckboxField";
import ResumeUploadCard from "../ResumeUploadCard";
import { ResumeProvider } from "@/app/context/ResumeContext";
import { createPortal } from "react-dom";
import LocationIndiaSearchInput, { LocationIndiaSearch } from "@/app/components/common/LocationIndiaSearch";
import { ProfileCompletionCard } from "@/app/components/common/ProfileCompletion";
import { ProfileCompletionCard2 } from "./ProfileCompletionCard2";
import ATSScoreCard from "./ATSScoreCard";
import BackButton from "@/app/components/button/BackButton";


const LocationSelector = dynamic(
  () => import("../../components/LocationSelector"),
  { ssr: false }
);

export default function ResumeBuilder() {
  const [user, setUser] = useState({ isPremium: false }); // User data from database/API
  const currentUser = useSelector((state) => state.users?.currentUser);
  const previewRef = useRef(null);
  const [currentTemplate, setCurrentTemplate] = useState("modern");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedPremiumTemplate, setSelectedPremiumTemplate] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadedAnalysisResult, setUploadedAnalysisResult] = useState(null);
  const [uploadText, setUploadText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentFont, setCurrentFont] = useState("inter");
  const [currentColor, setCurrentColor] = useState("");
  const [currentTheme, setCurrentTheme] = useState("modern-pro");
  const [profileImage, setProfileImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState(null);



  // Fix: Add activeTab state for modal tabs
  const [activeTab, setActiveTab] = useState("Overview");

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      headline: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      address: "",
    },
    socialLinks: [],
    certificates: [],
    publications: [],
    awardsAchievements: [], // FIXED: Combined into single array
    profileSummary: "",
    projects: [],
    workExperience: [],
    education: [],
    skills: [],
    interests: [],
    languages: [],
    accomplishments: [],
  });

  // ============================================
  // 1. Centralized template registry matching your actual data structure
  // ============================================
  const SECTION_TEMPLATES = {
    workExperience: {
      title: "",
      company: "",
      field: "",
      employmentType: "",
      location: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      currentlyWorking: false,
      description: "",
      bullets: [],
      hidden: false,
    },
    education: {
      level: "",
      college: "",
      course: "",
      specialisation: "",
      marks: "",
      currentlyStudying: false,
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      hidden: false,
    },
    skills: {
      name: "",
      level: "beginner",
      hidden: false,
    },

    projects: {
      title: "",
      url: "",
      organization: "",
      city: "",
      country: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      currentlyWorking: false,
      description: "",
      bullets: [],
      hidden: false,
    },
    certificates: {
      name: "",
      authority: "",
      url: "",
      issueDate: "",
      hidden: false,
    },
    socialLinks: {
      platform: "",
      url: "",
      hidden: false,
    },
    publications: {
      title: "",
      publisher: "",
      url: "",
      publicationMonth: "",
       publicationYear: "",
        authors: "",
      description: "",
      hidden: false,
    },
    awardsAchievements: {
      name: "",
      issuer: "",
      media: "",
      description: "",
      hidden: false,
    },

  };

  // ============================================
  // 2. Create refs for all sections
  // ============================================
  const sectionRefs = {
    workExperience: useRef(null),
    profileSummary: useRef(null),
    education: useRef(null),
    skills: useRef(null),
    accomplishments: useRef(null),
    projects: useRef(null),
    certificates: useRef(null),
    socialLinks: useRef(null),
    publications: useRef(null),
    awardsAchievements: useRef(null),
    skillsInterests: useRef(null),
  
  };

  const [errors, setErrors] = useState({});
  const [collapsedSections, setCollapsedSections] = useState({
    personalInfo: false,
    profileSummary: true,
    workExperience: true,
    socialLinks: true,
    education: true,
    projects: true,
    skillsInterests: true,
    certificates: true,
    publications: true,
    accomplishments: true,
    awardsAchievements: true, // FIXED: Single section
  });
  const [canProceed, setCanProceed] = useState(false);
  const [showCardErrors, setShowCardErrors] = useState({});
  const [sectionMessages, setSectionMessages] = useState({});

  // Load data from uploaded file or initialize with empty data
  useEffect(() => {
    const initialData = {
      personalInfo: {
        firstName: currentUser?.name?.split(" ")[0] || "",
        lastName: currentUser?.name?.split(" ")[1] || "",
        headline: "",
        email: currentUser?.email || "",
        phone: "",
        address: "",
        country: "",
        state: "",
        city: "",
        avatar: null,
      },
      profileSummary: "",
      socialLinks: [],
      projects: [],
      workExperience: [],
      education: [],
      skills: {
        technical: [],
        soft: [],
      },
      interests: [],
      languages: [],
      certificates: [],
      publications: [],
      awardsAchievements: [], // FIXED: Single array
      accomplishments: [],
    };

    setResumeData(initialData);
  }, [currentUser]);

  useEffect(() => {
    if (showPreviewModal) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPreviewModal]);

  // ==================
  const handleImageUpdate = (imageUrl, imageFile) => {
    console.log("🔄 Parent: Image update received", { imageUrl, imageFile });

    // Update profile image state
    setProfileImage(imageUrl);

    // Update resume data
    setResumeData((prevData) => ({
      ...prevData,
      personalInfo: {
        ...prevData.personalInfo,
        avatar: imageUrl,
      },
    }));

    // Save to localStorage
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("userProfileImage", reader.result);
        console.log("💾 Image saved to localStorage");
      };
      reader.readAsDataURL(imageFile);
    }
  };
  // ==================

  // ✅ Handle Template Selection with Premium Check
  const handleTemplateSelect = (templateId) => {
    const template = resumeTemplates[templateId];

    console.log("Template selected:", templateId, template);

    // Check if template is premium
    if (template.isPremium && !isPremiumUser) {
      console.log("Premium template selected, opening premium modal");
      setSelectedPremiumTemplate(template);
      setShowPremiumModal(true);
      setShowTemplateModal(false);
      setShowPreviewModal(true);
    } else {
      // Free template or user is already premium
      console.log("Applying template:", templateId);
      setCurrentTemplate(templateId);
      setShowTemplateModal(false);
      setShowPreviewModal(true);
    }
  };

  const handleLocationSelect = (location) => {
    if (location) {
      setSelectedLocation(location.label);
      // location object contains: { label, city, state, country }
    } else {
      setSelectedLocation(""); // When cleared
    }
  };

  // ✅ Handle Premium Subscription Complete
  const handlePremiumSubscriptionComplete = (plan, template) => {
    console.log("Subscription complete:", plan, template);
    setIsPremiumUser(true);
    setCurrentPlan(plan);
    setCurrentTemplate(template.id);
    setShowPremiumModal(false);
  };

  // ✅ Handle Close Premium Modal
  const handleClosePremiumModal = () => {
    setShowPremiumModal(false);
    setSelectedPremiumTemplate(null);
  };

  // Validate form whenever resumeData changes
  useEffect(() => {
    validateForm();
  }, [resumeData]);

  // Add this useEffect to prevent background scroll when modals are open
  useEffect(() => {
    if (showSubscriptionModal || showAnalysisModal) {
      // Prevent scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSubscriptionModal, showAnalysisModal]);


  const isPersonalInfoComplete = () => {
    const { firstName, lastName, headline, email } = resumeData.personalInfo;
    return (
      validateRequired(firstName) &&
      validateRequired(lastName) &&
      validateRequired(headline) &&
      validateRequired(email) &&
      validateEmail(email)
    );
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Info Validation
    if (!validateRequired(resumeData.personalInfo.firstName)) {
      newErrors.firstName = "First name is required";
    }
    if (!validateRequired(resumeData.personalInfo.lastName)) {
      newErrors.lastName = "Last name is required";
    }
    if (!validateRequired(resumeData.personalInfo.headline)) {
      newErrors.headline = "Job title is required";
    }
    if (!validateRequired(resumeData.personalInfo.email)) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(resumeData.personalInfo.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (
      resumeData.personalInfo.phone &&
      !validatePhone(resumeData.personalInfo.phone)
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);

    // Check if can proceed (personal info complete + at least one section has complete data)
    const hasBasicInfo = isPersonalInfoComplete();

    const hasCompleteWorkExperience =
      resumeData.workExperience.length > 0 &&
      resumeData.workExperience.every(
        (exp) =>
          validateRequired(exp.title) &&
          validateRequired(exp.company) &&
          validateRequired(exp.startMonth) &&
          validateRequired(exp.startYear) &&
          (exp.currentlyWorking ||
            (validateRequired(exp.endMonth) && validateRequired(exp.endYear)))
      );

    const hasCompleteEducation =
      resumeData.education.length > 0 &&
      resumeData.education.every(
        (edu) =>
          validateRequired(edu.college) &&
          validateRequired(edu.course) &&
          validateRequired(edu.level) &&
          validateRequired(edu.startMonth) &&
          validateRequired(edu.startYear) &&
          (edu.currentlyStudying ||
            (validateRequired(edu.endMonth) && validateRequired(edu.endYear)))
      );

    const hasCompleteProjects =
      resumeData.projects.length > 0 &&
      resumeData.projects.every(
        (project) =>
          validateRequired(project.title) &&
          validateRequired(project.description)
      );

    // FIXED: Updated to use awardsAchievements instead of separate arrays
    const hasAtLeastOneCompleteSection =
      hasCompleteWorkExperience ||
      hasCompleteEducation ||
      hasCompleteProjects ||
      resumeData.skills.length > 0 ||
      resumeData.certificates.length > 0 ||
      resumeData.publications.length > 0 ||
      resumeData.awardsAchievements.length > 0; // FIXED: Single array

    setCanProceed(hasBasicInfo && hasAtLeastOneCompleteSection);
  };

  // FIXED: Improved hasIncompleteCards function
  const hasIncompleteCards = (section) => {
    if (
      !resumeData[section] ||
      !Array.isArray(resumeData[section]) ||
      resumeData[section].length === 0
    ) {
      return false;
    }

    return resumeData[section].some((item) => {
      if (section === "projects") {
        return !item?.title?.trim() || !item?.description?.trim();
      }
      if (section === "workExperience") {
        return (
          !item?.title?.trim() ||
          !item?.company?.trim() ||
          !item?.startMonth ||
          !item?.startYear ||
          (!item?.currentlyWorking && (!item?.endMonth || !item?.endYear))
        );
      }
      if (section === "education") {
        return (
          !item?.college?.trim() ||
          !item?.course?.trim() ||
          !item?.level ||
          !item?.startMonth ||
          !item?.startYear ||
          (!item?.currentlyStudying && (!item?.endMonth || !item?.endYear))
        );
      }
      if (section === "certificates") {
        return !item?.name?.trim() || !item?.authority?.trim();
      }
      if (section === "publications") {
        return !item?.title?.trim() || !item?.publisher?.trim();
      }
      if (section === "awardsAchievements") {
        // FIXED: Single section
        return !item?.name?.trim() || !item?.description?.trim();
      }
      return false;
    });
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

  // FIXED: Use useCallback to prevent infinite re-renders
  const handleLocationChange = useCallback((locationData) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...locationData,
      },
    }));
  }, []);

  // const addNewItem = (section, template) => {
  //   if (hasIncompleteCards(section)) {
  //     const newShowCardErrors = { ...showCardErrors };
  //     resumeData[section].forEach((item) => {
  //       const cardErrors = validateCard(item, section);
  //       if (Object.keys(cardErrors).length > 0) {
  //         newShowCardErrors[item.id] = true;
  //       }
  //     });
  //     setShowCardErrors(newShowCardErrors);

  //     setSectionMessages((prev) => ({
  //       ...prev,
  //       [section]: `Please complete or delete unfinished entries in "${getSectionDisplayName(
  //         section
  //       )}" before adding new.`,
  //     }));
  //     return;
  //   }

  //   const newItem = {
  //     ...template,
  //     id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  //   };
  //   setResumeData((prev) => ({
  //     ...prev,
  //     [section]: [...prev[section], newItem],
  //   }));

  //   if (resumeData[section].length === 0 && collapsedSections[section]) {
  //     setCollapsedSections((prev) => ({
  //       ...prev,
  //       [section]: false,
  //     }));
  //   }

  //   setSectionMessages((prev) => {
  //     const newMessages = { ...prev };
  //     delete newMessages[section];
  //     return newMessages;
  //   });
  // };

  const addNewItem = (section, template = null) => {
  // Validate incomplete cards
  if (hasIncompleteCards(section)) {
    const newShowCardErrors = { ...showCardErrors };
    resumeData[section].forEach((item) => {
      const cardErrors = validateCard(item, section);
      if (Object.keys(cardErrors).length > 0) {
        newShowCardErrors[item.id] = true;
      }
    });
    setShowCardErrors(newShowCardErrors);

    setSectionMessages((prev) => ({
      ...prev,
      [section]: `Please complete or delete unfinished entries in "${getSectionDisplayName(
        section
      )}" before adding new.`,
    }));
    return false;
  }

  // Use provided template or get from centralized registry
  const itemTemplate = template || SECTION_TEMPLATES[section];
  
  if (!itemTemplate) {
    console.error(`No template found for section: ${section}`);
    return false;
  }

  const newItem = {
    ...itemTemplate,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  };

  setResumeData((prev) => ({
    ...prev,
    [section]: [...prev[section], newItem],
  }));

  // Auto-expand section if it's the first item
  if (resumeData[section].length === 0 && collapsedSections[section]) {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: false,
    }));
  }

  // Clear section error messages
  setSectionMessages((prev) => {
    const newMessages = { ...prev };
    delete newMessages[section];
    return newMessages;
  });

  return true;
};


const handleAddFromRecommendation = (sectionName) => {
  // Expand the section if it's collapsed
  if (collapsedSections[sectionName]) {
    toggleSection(sectionName);
  }

  // Scroll to the section smoothly
  setTimeout(() => {
    sectionRefs[sectionName]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }, 100);

  // Trigger the add action
  setTimeout(() => {
    addNewItem(sectionName);
  }, 200);
};

  const getSectionDisplayName = (section) => {
    const names = {
      workExperience: "Work Experience",
      education: "Education",
      projects: "Projects",
      socialLinks: "Website & Social Links",
      certificates: "Certificates",
      publications: "Publications",
      awardsAchievements: "Awards & Achievements", // FIXED: Updated name
    };
    return names[section] || section;
  };

  const removeItem = (section, id) => {
    setShowCardErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });

    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));

    if (!hasIncompleteCards(section)) {
      setSectionMessages((prev) => {
        const newMessages = { ...prev };
        delete newMessages[section];
        return newMessages;
      });
    }
  };

  const toggleHidden = (section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, hidden: !item.hidden } : item
      ),
    }));
  };

  const downloadResume = async () => {
    if (!canProceed) {
      alert("Please complete your resume before downloading.");
      return;
    }

    try {
      const pdf = await generateResumePDF(resumeData, currentTemplate);

      const fileName =
        `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume_${currentTemplate}.pdf`
          .replace(/\s+/g, "_")
          .toLowerCase();

      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const validateCard = (item, section) => {
    const cardErrors = {};

    if (section === "projects") {
      if (!item?.title?.trim()) cardErrors.title = "Project title is required";
      if (!item?.description?.trim())
        cardErrors.description = "Project description is required";
    }
    if (section === "workExperience") {
      if (!item?.title?.trim()) cardErrors.title = "Job title is required";
      if (!item?.company?.trim())
        cardErrors.company = "Company name is required";
      if (!item?.startMonth || !item?.startYear)
        cardErrors.startDate = "Start date is required";
      if (!item?.currentlyWorking && (!item?.endMonth || !item?.endYear)) {
        cardErrors.endDate = "End date is required when not currently working";
      }
    }
    if (section === "education") {
      if (!item?.college?.trim())
        cardErrors.college = "College name is required";
      if (!item?.course?.trim()) cardErrors.course = "Course is required";
      if (!item?.level) cardErrors.level = "Education level is required";
      if (!item?.startMonth || !item?.startYear)
        cardErrors.startDate = "Start date is required";
      if (!item?.currentlyStudying && (!item?.endMonth || !item?.endYear)) {
        cardErrors.endDate = "End date is required when not currently studying";
      }
    }
    if (section === "certificates") {
      if (!item?.name?.trim()) cardErrors.name = "Certificate name is required";
      if (!item?.authority?.trim())
        cardErrors.authority = "Issuing authority is required";
    }
    if (section === "publications") {
      if (!item?.title?.trim())
        cardErrors.title = "Publication title is required";
      if (!item?.publisher?.trim())
        cardErrors.publisher = "Publisher is required";
    }
    if (section === "awardsAchievements") {
      // FIXED: Single section validation
      if (!item?.name?.trim())
        cardErrors.name = "Award/Achievement name is required";
      if (!item?.description?.trim())
        cardErrors.description = "Description is required";
    }
    return cardErrors;
  };

  const handleNext = () => {
    if (canProceed) {
      console.log("Proceeding with data:", resumeData);
      // Add navigation logic here
    } else {
      if (!isPersonalInfoComplete()) {
        setShowCardErrors((prev) => ({ ...prev, personalInfo: true }));
        alert("Please complete personal information before proceeding.");
      } else {
        const incompleteSections = [];
        [
          "workExperience",
          "education",
          "projects",
          "certificates",
          "publications",
          "awardsAchievements",
        ].forEach((section) => {
          if (resumeData[section]?.length > 0 && hasIncompleteCards(section)) {
            incompleteSections.push(getSectionDisplayName(section));
          }
        });

        if (incompleteSections.length > 0) {
          const newShowCardErrors = { ...showCardErrors };
          incompleteSections.forEach((sectionName) => {
            const sectionKey = Object.keys(collapsedSections).find(
              (key) => getSectionDisplayName(key) === sectionName
            );
            resumeData[sectionKey]?.forEach((item) => {
              const cardErrors = validateCard(item, sectionKey);
              if (Object.keys(cardErrors).length > 0) {
                newShowCardErrors[item.id] = true;
              }
            });
          });
          setShowCardErrors(newShowCardErrors);
          alert(
            `Please complete all required fields in: ${incompleteSections.join(
              ", "
            )}`
          );
        } else {
          alert("Please add at least one section before proceeding.");
        }
      }
    }
  };

  // Share functionality
  const handleShareResume = () => {
    const shareData = {
      title: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume`,
      text: "Check out my resume!",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert("Share functionality requires a secure context (HTTPS)");
    }
  };

  const AddNewButton = ({ onClick, text, section }) => (
    <button
      onClick={() => {
        if (hasIncompleteCards(section)) {
          const newShowCardErrors = { ...showCardErrors };
          resumeData[section]?.forEach(item => {
            const cardErrors = validateCard(item, section);
            if (Object.keys(cardErrors).length > 0) {
              newShowCardErrors[item.id] = true;
            }
          });
          setShowCardErrors(newShowCardErrors);

          setSectionMessages(prev => ({
            ...prev,
            [section]: `Please complete or delete unfinished entries in "${getSectionDisplayName(section)}" before adding new.`
          }));
        } else {
          onClick();
        }
      }}
      className="w-full py-1.5 text-[14px] border-1 border-dashed border-gray-600 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-gray-300"
    >
      <FiPlus className="w-4 h-4" /> {text}
    </button>
  );

  // const handleTemplateSelect = (templateId) => {
  //   setCurrentTemplate(templateId);
  //   setShowTemplateModal(false);
  // };

  return (
    <ResumeProvider>
      <div className=" pt-10 mt-10  font-roboto">
        <div className="max-w-7xl mx-auto px-4">
          {/* ================= MAIN TWO COLUMN LAYOUT ================= */}
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ================= LEFT SECTION – FORM ================= */}
            <div className="w-full lg:max-w-[65%] mx-auto rounded-2xl">
              <div className="p-4 space-y-4 sticky top-4 inset-0 bg-opacity-50 lg:relative  border-[0.3px]
             border-[#cccccc]
              border-b-0
              overflow-hidden
              bg-[#fff]
              rounded-2xl
              rounded-bl-none
              rounded-br-none">

                <div className="  overflow-y-auto custom-scroll h-[calc(100vh-120px)]">
                  {/* Personal Information */}
                  {/* <ResumeSection
                    title="Personal Information *"
                    isCollapsed={collapsedSections.personalInfo}
                    onToggle={() => toggleSection("personalInfo")}
                    onAdd={() => {
                      // Expand section if collapsed
                      if (collapsedSections.personalInfo) {
                        toggleSection("personalInfo");
                      }
                      // Add new item
                      addNewItem("personalInfo", { ...defaultPersonalInfo });
                    }}
                    hasContent={resumeData.personalInfo.length > 0 ? `${resumeData.personalInfo.length}` : null}
                  >

                    <div className="space-y-4">
                      <InputWithCount
                        label="First Name *"
                        value={resumeData.personalInfo.firstName}
                        onChange={(value) =>
                          handleInputChange("personalInfo", "firstName", value)
                        }
                        maxLength={50}
                        showCount={false}
                        error={showCardErrors.personalInfo && errors.firstName}
                      />

                      <InputWithCount
                        label="Last Name *"
                        value={resumeData.personalInfo.lastName}
                        onChange={(value) =>
                          handleInputChange("personalInfo", "lastName", value)
                        }
                        maxLength={50}
                        showCount={false}
                        error={showCardErrors.personalInfo && errors.lastName}
                      />

                      <InputWithCount
                        label="Preferred job title/role *"
                        value={resumeData.personalInfo.headline}
                        onChange={(value) =>
                          handleInputChange("personalInfo", "headline", value)
                        }
                        maxLength={100}
                        showCount={false}
                        placeholder="e.g., Senior Software Engineer | Full Stack Developer"
                        error={showCardErrors.personalInfo && errors.headline}
                      />

                      <InputWithCount
                        label="Email *"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(value) =>
                          handleInputChange("personalInfo", "email", value)
                        }
                        maxLength={100}
                        showCount={false}
                        error={showCardErrors.personalInfo && errors.email}
                      />

                      <InputWithCount
                        label="Phone Number"
                        type="tel"
                        value={resumeData.personalInfo.phone}
                        onChange={(value) =>
                          handleInputChange("personalInfo", "phone", value)
                        }
                        maxLength={20}
                        error={showCardErrors.personalInfo && errors.phone}
                      />

                      <LocationIndiaSearchInput
                        value={location?.label || "Location"}
                        onChange={(loc) => setLocation(loc)}
                      />
                    </div>
                  </ResumeSection> */}
 <div className="mx-4 my-2 sticky z-30">
            <BackButton />
          </div>
                  {/* About */}
                  <div ref={sectionRefs.profileSummary} >
      <ResumeSection
                    title="About"
                    isCollapsed={collapsedSections.profileSummary}
                    onToggle={() => toggleSection("profileSummary")}
                    onAdd={() => {
                      // Just expand the section
                      if (collapsedSections.profileSummary) {
                        toggleSection("profileSummary");
                      }
                    }}
                    hasContent={resumeData.profileSummary?.length > 0 ? 'Added' : null}
                  >

                    <RichTextEditorInput
                      value={resumeData.profileSummary}
                      onChange={(value) =>
                        setResumeData((prev) => ({ ...prev, profileSummary: value }))
                      }
                      placeholder="Write a compelling professional summary..."
                      maxLength={700}
                      showCharCount
                    />
                  </ResumeSection>

                  </div>
            
                  {/* ================= Education ================= */}
                  <div  ref={sectionRefs.education} >
                 <ResumeSection
                    title="Education"
                    isCollapsed={collapsedSections.education}
                    onToggle={() => toggleSection("education")}
                    onAdd={() => {
                      if (collapsedSections.education) {
                        toggleSection("education");
                      }
                      addNewItem("education");
                      
                    }}
                    hasContent={resumeData.education.length > 0 ? `${resumeData.education.length}` : null}
                  >
                    {sectionMessages.education && (
                      <p className="text-red-400 text-sm mb-4">
                        {sectionMessages.education}
                      </p>
                    )}

                    <div className="space-y-6">
                      {resumeData.education.map((edu, index) => (
                        <EducationCard
                          key={edu.id}
                          education={edu}
                          onUpdate={(updatedEdu) => {
                            const updated = [...resumeData.education];
                            updated[index] = { ...updated[index], ...updatedEdu };
                            handleArrayUpdate("education", updated);
                          }}
                          onRemove={() => removeItem("education", edu.id)}
                          onToggleHidden={() =>
                            toggleHidden("education", edu.id)
                          }
                          showErrors={showCardErrors[edu.id] || false}
                        />
                      ))}

                      <AddNewButton
                        onClick={() =>
                          addNewItem("education", {
                            level: "",
                            college: "",
                            course: "",
                            specialisation: "",
                            marks: "",
                            currentlyStudying: false,
                            startMonth: "",
                            startYear: "",
                            endMonth: "",
                            endYear: "",
                            hidden: false,
                          })
                        }
                        text="Add Education"
                        section="education"
                      />
                    </div>
                  </ResumeSection>

                  </div>
 
                  {/* ================= Work Experience ================= */}
                  <div ref={sectionRefs.workExperience}>
 <ResumeSection
                    title="Work Experience"
                    isCollapsed={collapsedSections.workExperience}
                    onToggle={() => toggleSection("workExperience")}
                    onAdd={() => {
                      if (collapsedSections.workExperience) {
                        toggleSection("workExperience");
                      }
                      
                      addNewItem("workExperience");
                    }}
                    hasContent={resumeData.workExperience?.length > 0 ? `${resumeData.workExperience.length}` : null}
                  >
                    {sectionMessages.workExperience && (
                      <p className="text-red-400 text-sm mb-4">
                        {sectionMessages.workExperience}
                      </p>
                    )}

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
                          showErrors={showCardErrors[exp.id] || false}
                        />
                      ))}

                      <AddNewButton
                        onClick={() =>
                          addNewItem("workExperience", {
                            title: "",
                            company: "",
                            field: "",
                            employmentType: "",
                            location: "",
                            startMonth: "",
                            startYear: "",
                            endMonth: "",
                            endYear: "",
                            currentlyWorking: false,
                            description: "",
                            bullets: [],
                            hidden: false,
                          })
                        }
                        text="Add Work Experience"
                        section="workExperience"
                      />
                    </div>
                  </ResumeSection>
                  </div>
                 

                  {/* ================= Projects ================= */}
                   <div ref={sectionRefs.projects}>
  <ResumeSection
                    title="Projects"
                    isCollapsed={collapsedSections.projects}
                    onToggle={() => toggleSection("projects")}
                    onAdd={() => {
                      if (collapsedSections.projects) {
                        toggleSection("projects");
                      }
                      addNewItem("projects");
                    }}
                    hasContent={resumeData.projects.length > 0 ? `${resumeData.projects.length}` : null}
                  >
                    {sectionMessages.projects && (
                      <p className="text-red-400 text-sm mb-4">
                        {sectionMessages.projects}
                      </p>
                    )}

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
                          onToggleHidden={() =>
                            toggleHidden("projects", project.id)
                          }
                          showErrors={showCardErrors[project.id] || false}
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
                            startMonth: "",
                            startYear: "",
                            endMonth: "",
                            endYear: "",
                            currentlyWorking: false,
                            description: "",
                            bullets: [],
                            hidden: false,
                          })
                        }
                        text="Add Project"
                        section="projects"
                      />
                    </div>
                  </ResumeSection>

                   </div>
                
                  {/* ================= Website & Social Links ================= */}
                  <div ref={sectionRefs.socialLinks}>
      <ResumeSection
                    title="Website & Social Links"
                    isCollapsed={collapsedSections.socialLinks}
                    onToggle={() => toggleSection("socialLinks")}
                    onAdd={() => {
                      if (collapsedSections.socialLinks) {
                        toggleSection("socialLinks");
                      }
                      addNewItem("socialLinks");
                    }}
                    hasContent={resumeData.socialLinks.length > 0 ? `${resumeData.socialLinks.length}` : null}
                  >
                    <div className="space-y-6">
                      {resumeData.socialLinks.map((social, index) => (
                        <WebsiteSocialWebsiteCard
                          key={social.id}
                          value={social}
                          onChange={(updatedSocial) => {
                            const updated = [...resumeData.socialLinks];
                            updated[index] = { ...updated[index], ...updatedSocial };
                            handleArrayUpdate("socialLinks", updated);
                          }}
                          onRemove={() => removeItem("socialLinks", social.id)}
                        />
                      ))}

                      <AddNewButton
                        onClick={() =>
                          addNewItem("socialLinks", {
                            platform: "Portfolio",
                            customName: "",
                            url: "",
                          })
                        }
                        text="Add Social Link"
                        section="socialLinks"
                      />
                    </div>
                  </ResumeSection>

                  </div>
            
                  {/* ================= Certificates ================= */}
                  <div ref={sectionRefs.certificates}>
     <ResumeSection
                    title="Certificates"
                    isCollapsed={collapsedSections.certificates}
                    onToggle={() => toggleSection("certificates")}
                    onAdd={() => {
                      if (collapsedSections.certificates) {
                        toggleSection("certificates");
                      }
                      addNewItem("certificates");
                    }}
                    hasContent={resumeData.certificates.length > 0 ? `${resumeData.certificates.length}` : null}
                  >
                    {sectionMessages.certificates && (
                      <p className="text-red-400 text-sm mb-4">
                        {sectionMessages.certificates}
                      </p>
                    )}

                    <div className="space-y-6">
                      {resumeData.certificates.map((certificate, index) => (
                        <Certificate
                          key={certificate.id}
                          certificate={certificate}
                          onUpdate={(updatedCert) => {
                            const updated = [...resumeData.certificates];
                            updated[index] = {
                              ...updated[index],
                              ...updatedCert,
                            };
                            handleArrayUpdate("certificates", updated);
                          }}
                          onRemove={() =>
                            removeItem("certificates", certificate.id)
                          }
                          onToggleHidden={() =>
                            toggleHidden("certificates", certificate.id)
                          }
                          showErrors={showCardErrors[certificate.id] || false}
                        />
                      ))}

                      <AddNewButton
                        onClick={() =>
                          addNewItem("certificates", {
                            name: "",
                            authority: "",
                            url: "",
                            issueDate: "",
                            hidden: false,
                          })
                        }
                        text="Add Certificate"
                        section="certificates"
                      />
                    </div>
                  </ResumeSection>

                  </div>
             
                  {/* ================= Publications ================= */}
                   <div ref={sectionRefs.publications}>
   <ResumeSection
                    title="Publications"
                    isCollapsed={collapsedSections.publications}
                    onToggle={() => toggleSection("publications")}
                    onAdd={() => {
                      if (collapsedSections.publications) {
                        toggleSection("publications");
                      }
                      addNewItem("publications");
                    }}
                    hasContent={resumeData.publications.length > 0 ? `${resumeData.publications.length}` : null}
                  >
                    {sectionMessages.publications && (
                      <p className="text-red-400 text-sm mb-4">
                        {sectionMessages.publications}
                      </p>
                    )}

                    <div className="space-y-6">
                      {resumeData.publications.map((publication, index) => (
                        <Publications
                          key={publication.id}
                          publication={publication}
                          onUpdate={(updatedPub) => {
                            const updated = [...resumeData.publications];
                            updated[index] = {
                              ...updated[index],
                              ...updatedPub,
                            };
                            handleArrayUpdate("publications", updated);
                          }}
                          onRemove={() =>
                            removeItem("publications", publication.id)
                          }
                          onToggleHidden={() =>
                            toggleHidden("publications", publication.id)
                          }
                          showErrors={showCardErrors[publication.id] || false}
                        />
                      ))}

                      <AddNewButton
                        onClick={() =>
                          addNewItem("publications", {
                            title: "",
                            publisher: "",
                            url: "",
                            publicationMonth: "",
                            publicationYear: "",
                            description: "",
                            authors: "",
                            hidden: false,
                          })
                        }
                        text="Add Publication"
                        section="publications"
                      />
                    </div>
                  </ResumeSection>

                   </div>
               
                  {/* ================= Achievements ================= */}
                  <div ref={sectionRefs.awardsAchievements}>
   <ResumeSection
                    title="Achievements"
                    isCollapsed={collapsedSections.awardsAchievements}
                    onToggle={() => toggleSection("awardsAchievements")}
                    onAdd={() => {
                      if (collapsedSections.awardsAchievements) {
                        toggleSection("awardsAchievements");
                      }
                      addNewItem("awardsAchievements");
                    }}
                    hasContent={resumeData.awardsAchievements.length > 0 ? `${resumeData.awardsAchievements.length}` : null}
                  >
                    {sectionMessages.awardsAchievements && (
                      <p className="text-red-400 text-sm mb-4">
                        {sectionMessages.awardsAchievements}
                      </p>
                    )}

                    <div className="space-y-6">
                      {resumeData.awardsAchievements.map((item, index) => (
                        <AwardAchivement
                          key={item.id}
                          item={item}
                          onUpdate={(updated) => {
                            const updatedItems = [
                              ...resumeData.awardsAchievements,
                            ];
                            updatedItems[index] = {
                              ...updatedItems[index],
                              ...updated,
                            };
                            handleArrayUpdate(
                              "awardsAchievements",
                              updatedItems
                            );
                          }}
                          onRemove={() =>
                            removeItem("awardsAchievements", item.id)
                          }
                          onToggleHidden={() =>
                            toggleHidden("awardsAchievements", item.id)
                          }
                          showErrors={showCardErrors[item.id] || false}
                        />
                      ))}

                      <AddNewButton
                        onClick={() =>
                          addNewItem("awardsAchievements", {
                            name: "",
                            issuer: "",
                            media: "",
                            description: "",
                            hidden: false,
                          })
                        }
                        text="Add Award / Achievement"
                        section="awardsAchievements"
                      />
                    </div>
                  </ResumeSection>

                  </div>
               
                  {/* ================= Skills & Interests ================= */}
                   <div ref={sectionRefs.skillsInterests}>
   <ResumeSection
                    title="Skills & Interests"
                    isCollapsed={collapsedSections.skillsInterests}
                    onToggle={() => toggleSection("skillsInterests")}
                    onAdd={() => {
                      if (collapsedSections.skillsInterests) {
                        toggleSection("skillsInterests");
                      }
                    }}
                    hasContent={
                      (() => {
                        const skills = resumeData.skills?.length || 0;
                        const interests = resumeData.interests?.length || 0;
                        const total = skills + interests;
                        return total > 0 ? `${total}` : null;
                      })()
                    }  >
                    <ProfessionalSkillsInterestsSection
                      skills={resumeData.skills}
                      interests={resumeData.interests}
                      languages={resumeData.languages}
                      onSkillsUpdate={(updatedSkills) =>
                        handleArrayUpdate("skills", updatedSkills)
                      }
                      onInterestsUpdate={(updatedInterests) =>
                        handleArrayUpdate("interests", updatedInterests)
                      }
                      onLanguagesUpdate={(updatedLanguages) =>
                        handleArrayUpdate("languages", updatedLanguages)
                      }
                    />
                  </ResumeSection>

                   </div>
               
                  {/* ================= Accomplishments ================= */}
                  <div ref={sectionRefs.accomplishments}>
                  <ResumeSection
                    title="Accomplishments"
                    isCollapsed={collapsedSections.accomplishments}
                    onToggle={() => toggleSection("accomplishments")}
                    onAdd={() => {
                      if (collapsedSections.accomplishments) {
                        toggleSection("accomplishments");
                      }
                      addNewItem("accomplishments", {
                        title: "",
                        patentNumber: "",
                        inventors: "",
                        status: "issued",
                        issueDate: "",
                        url: "",
                        description: "",
                        hidden: false,
                      });
                    }}
                    hasContent={resumeData.accomplishments.length > 0 ? `${resumeData.accomplishments.length}` : null}
                  >
                    {sectionMessages.accomplishments && (
                      <p className="text-red-400 text-sm mb-4">
                        {sectionMessages.accomplishments}
                      </p>
                    )}

                    <div className="space-y-6">
                      {resumeData.accomplishments.map((item, index) => (
                        <div key={item.id} className="space-y-4">

                          {/* Accomplishment Title */}
                          <InputWithCount
                            label="Patent title"
                            placeholder="Ex: Techniques for ascribing..."
                            value={item.title}
                            onChange={(value) => {
                              const updated = [...resumeData.accomplishments];
                              updated[index].title = value;
                              handleArrayUpdate("accomplishments", updated);
                            }}
                            required
                          />

                          {/* Patent / Application Number */}
                          <InputWithCount
                            label="Patent or application number"
                            placeholder="Ex: US 9229900"
                            value={item.patentNumber}
                            onChange={(value) => {
                              const updated = [...resumeData.accomplishments];
                              updated[index].patentNumber = value;
                              handleArrayUpdate("accomplishments", updated);
                            }}
                            required
                          />

                          {/* Inventors */}
                          <InputWithCount
                            label="Inventor(s)"
                            placeholder="Add inventor names"
                            value={item.inventors}
                            onChange={(value) => {
                              const updated = [...resumeData.accomplishments];
                              updated[index].inventors = value;
                              handleArrayUpdate("accomplishments", updated);
                            }}
                          />

                          {/* Status */}
                          <CheckboxField
                            label="Status"
                            options={[
                              { label: "Patent issued", value: "issued" },
                              { label: "Patent pending", value: "pending" },
                            ]}
                            value={item.status}
                            onChange={(value) => {
                              const updated = [...resumeData.accomplishments];
                              updated[index].status = value;
                              handleArrayUpdate("accomplishments", updated);
                            }}
                          />

                          {/* Issue Date */}
                          <DateRangeSelector
                            label="Issue date"
                            type="date"
                            value={item.issueDate}
                            onChange={(value) => {
                              const updated = [...resumeData.accomplishments];
                              updated[index].issueDate = value;
                              handleArrayUpdate("accomplishments", updated);
                            }}
                          />

                          {/* URL */}
                          <WebsiteSocialWebsiteCard
                            label="Accomplishment URL"
                            placeholder="https://"
                            value={item.url}
                            onChange={(value) => {
                              const updated = [...resumeData.accomplishments];
                              updated[index].url = value;
                              handleArrayUpdate("accomplishments", updated);
                            }}
                          />

                          {/* Description */}
                          <RichTextEditorInput
                            label="Description"
                            placeholder="Describe your accomplishment..."
                            value={item.description}
                            onChange={(value) => {
                              const updated = [...resumeData.accomplishments];
                              updated[index].description = value;
                              handleArrayUpdate("accomplishments", updated);
                            }}
                            maxLength={2000}
                          />
                        </div>
                      ))}

                      {/* Add New Accomplishment */}
                      <AddNewButton
                        onClick={() =>
                          addNewItem("accomplishments", {
                            title: "",
                            patentNumber: "",
                            inventors: "",
                            status: "issued",
                            issueDate: "",
                            url: "",
                            description: "",
                            hidden: false,
                          })
                        }
                        text="Add Accomplishment"
                        section="accomplishments"
                      />
                    </div>
                  </ResumeSection>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT SECTION ================= */}
            <div className="w-full lg:max-w-[30%] mx-auto space-y-4 ">
              <div className="overflow-y-auto  custom-scroll h-[calc(100vh-120px)] mt-4">
                    
 <ATSScoreCard
                resumeData={resumeData} 
                onAddFromRecommendation={handleAddFromRecommendation} />

     {/* Resume upload card */}
              <div className=" mt-3.5 rounded-xl min-h-[400px]">
                <ResumeUploadCard
                  uploadedResumeUrl={uploadedResumeUrl}
                  setUploadedResumeUrl={setUploadedResumeUrl} // pass setter too
                  onPreviewClick={() => setShowPreviewModal(true)}
                />

                {showPreviewModal &&
                  createPortal(
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-40 p-2 sm:p-4">
                      <div className="bg-white z-40 relative rounded-xl p-3 sm:p-4 md:p-6 border border-[#D1D9E6] w-full max-w-[95vw] lg:max-w-[90vw] h-[95vh] sm:h-[98vh] overflow-y-auto custom-scroll shadow-xl">

                        {/* Close Button */}
                        <button
                          onClick={() => setShowPreviewModal(false)}
                          className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-50 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-black transition-colors"
                        >
                          <span className="text-lg sm:text-xl">✕</span>
                        </button>

                        {/* Main Content Container */}
                        <div className="flex flex-col lg:flex-row justify-center gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12">

                          {/* RESUME PREVIEW SECTION */}
                          <div className="w-full lg:w-auto lg:flex-1 lg:max-w-3xl rounded-xl border border-gray-200 overflow-hidden relative">
                            <ResumePreview
                              data={resumeData}
                              template={currentTemplate}
                              currentFont={currentFont}
                              profileImage={profileImage}
                              currentColor={currentColor}
                              onImageUpdate={handleImageUpdate}
                            />

                            {/* Watermark for non-premium users */}
                            {!isPremiumUser && (
                              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
                                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold rotate-[-30deg] text-gray-600">
                                  SpreadNext
                                </span>
                              </div>
                            )}
                          </div>

                          {/* ACTION BAR SECTION */}
                          <div className="w-full lg:w-auto lg:flex-shrink-0">
                            <TopActionBar
                              canProceed={canProceed}
                              downloadResume={downloadResume}
                              handleNext={handleNext}
                              setShowTemplateModal={(value) => {
                                setShowTemplateModal(value);
                                if (value) setShowPreviewModal(false);
                              }}
                              onShare={handleShareResume}
                              currentFont={currentFont}
                              currentColor={currentColor}
                              currentTheme={currentTheme}
                              currentTemplate={currentTemplate}
                              onFontChange={setCurrentFont}
                              onColorChange={setCurrentColor}
                              onThemeChange={setCurrentTheme}
                              onTemplateChange={setCurrentTemplate}
                              isSubscribed={isPremiumUser || currentUser?.isSubscribed}
                              etaLocked={(resumeTemplates[currentTemplate]?.isPremium === true) && !(isPremiumUser || currentUser?.isSubscribed)}
                              onShowSubscription={() => {
                                setShowSubscriptionModal(true);
                                setShowPreviewModal(false);
                              }}
                              onETACheck={() => {
                                const result = analyzeResume ? analyzeResume(resumeData) : { score: 0, recommendations: [] };
                                const eta = estimateETA(resumeData);
                                const merged = { ...result, eta };
                                setAnalysisResult(merged);
                                setShowAnalysisModal(true);
                                setShowPreviewModal(false);
                              }}
                              currentPlan={currentPlan}
                              resumeData={resumeData}
                              onAddSection={(sectionKey) => {
                                // Navigate to that specific section
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>,
                    document.body
                  )
                }
              </div>

              </div>
          
             
         
            </div>
          </div>
        </div>

        {/* ================= MODALS ================= */}
        <TemplateModal
          isOpen={showTemplateModal}
          onClose={() => setShowTemplateModal(false)}
          onTemplateSelect={handleTemplateSelect}
          currentTemplate={currentTemplate}
        />

        {showPremiumModal && selectedPremiumTemplate && (
          <PremiumTemplateSystem
            template={selectedPremiumTemplate}
            onClose={handleClosePremiumModal}
            onSubscriptionComplete={handlePremiumSubscriptionComplete}
          />
        )}

        {/* Premium Modal */}
        {/* {showPremiumModal && (
          <PaymentView
            onClose={() => setShowPremiumModal(false)}
          />
        )} */}

        {/* Subscription modal (simple) */}
        {showSubscriptionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-[#0F1724] rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-2">Subscription required</h3>
              <p className="text-gray-300 text-sm mb-4">ETA Check is a premium feature. Please subscribe to access it.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowSubscriptionModal(false)} className="px-4 py-2 border border-gray-600 rounded">Cancel</button>
                <button onClick={() => { /* window.location.href = '/subscription'; commented for local testing */ }} className="px-4 py-2 bg-blue-600 rounded">Go to Subscription</button>
              </div>
            </div>
          </div>
        )}

        {showAnalysisModal && analysisResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
            <div className="relative w-full max-w-4xl">
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="absolute right-4 top-2 text-gray-900 hover:font-bold text-lg z-20"
              >
                ✕
              </button>
              <div
                className={`rounded-2xl p-6 w-full transition-all duration-300 bg-white border border-[#aeadad] ${((resumeTemplates[currentTemplate]?.isPremium !== true) &&
                  !(isPremiumUser || currentUser?.isSubscribed))
                  ? "filter blur-sm pointer-events-none"
                  : "filter-none"
                  }`}
              >

                {/* HEADER */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 tracking-wide flex items-center gap-2">
                    ATS Score Analysis
                  </h2>
                </div>

                {/* TABS */}
                <div className="flex gap-5 border-b border-white/10 pb-2">
                  {[
                    { label: "Overview", icon: <svg className='inline w-4 h-4 mr-1' fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z" /><path d="M12 12V4m0 0L3 9m9-5l9 5" /></svg> },
                    { label: "Detailed Metrics", icon: <svg className='inline w-4 h-4 mr-1' fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> },
                    { label: "Recommendations", icon: <svg className='inline w-4 h-4 mr-1' fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg> }
                  ].map((tab) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(tab.label)}
                      className={`pb-2 px-3 text-sm tracking-wide flex items-center gap-1 transition-all duration-200 rounded-t-md ${activeTab === tab.label
                        ? "text-blue-400 border-b-2 border-blue-500 bg-white/5 shadow"
                        : "text-gray-400 hover:text-blue-300 hover:bg-white/5"
                        }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* ============ TAB 1 – OVERVIEW ============ */}
                {activeTab === "Overview" && (
                  <div className="mt-6 relative">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 pointer-events-none z-0 animate-gradient-x" />
                    {/* Soft background pattern */}
                    <div className="absolute inset-0 pointer-events-none z-0" />
                    {/* Score Box */}
                    <div className="bg-gradient-to-br from-[#6366f1]/95 via-[#7c3aed]/90 to-[#4f46e5]/95 rounded-2xl border border-white/10 p-8 mb-8 shadow-[0_8px_40px_0_rgba(80,80,200,0.25)] flex flex-col md:flex-row items-center gap-10 relative overflow-hidden" style={{ backdropFilter: 'blur(12px)' }}>
                      {/* Glassy reflection overlay */}
                      <div className="absolute left-0 top-0 w-full h-1/3 pointer-events-none z-10" style={{ background: 'linear-gradient(90deg,rgba(255,255,255,0.13) 0%,rgba(255,255,255,0.04) 100%)', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }} />
                      {/* Animated border glow */}
                      <div className="absolute -inset-1 rounded-2xl pointer-events-none z-0 animate-pulse" style={{ background: 'linear-gradient(120deg,#6366f1cc 0%,#7c3aedcc 100%)', filter: 'blur(18px)', opacity: 0.22 }} />
                      {/* Circular Score with sparkles and floating badge */}
                      <div className="relative z-20">
                        <svg width="132" height="132" viewBox="0 0 132 132">
                          <circle cx="66" cy="66" r="58" stroke="#232946" strokeWidth="10" fill="none" />
                          <circle
                            cx="66"
                            cy="66"
                            r="58"
                            stroke="url(#ats-bluple)"
                            strokeWidth="14"
                            strokeDasharray={2 * Math.PI * 58}
                            strokeDashoffset={2 * Math.PI * 58 * (1 - (analysisResult.score || 0) / 100)}
                            strokeLinecap="round"
                            fill="none"
                            className="transition-all duration-700 drop-shadow-2xl animate-glow"
                          />
                          <defs>
                            <linearGradient id="ats-bluple" x1="0" y1="0" x2="132" y2="132">
                              <stop offset="0%" stopColor="#6366f1" />
                              <stop offset="50%" stopColor="#7c3aed" />
                              <stop offset="100%" stopColor="#4f46e5" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {/* Sparkles */}
                        <span className="absolute left-8 top-8 animate-ping-slow text-blue-200/80">✨</span>
                        <span className="absolute right-8 bottom-8 animate-ping-slow text-purple-300/80">✨</span>
                        {/* Floating badge */}
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg animate-float z-30 border border-white/20">ATS SCORE</span>
                        <span className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-extrabold text-white animate-pulse drop-shadow-lg">{analysisResult.score}</span>
                          <span className="mt-1 text-blue-200 animate-float"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2v20m0 0l-4-4m4 4l4-4" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                        </span>
                      </div>
                      <div className="flex-1 z-20">
                        <p className="text-white text-lg mb-1 font-semibold tracking-wide">Overall Score</p>
                        <p className={`text-4xl font-bold ${analysisResult.score > 70 ? 'text-green-400' : analysisResult.score > 40 ? 'text-yellow-400' : 'text-red-400'} drop-shadow`}>{analysisResult.score}/100</p>
                        <p className="text-xs text-gray-200 mt-1">
                          {analysisResult.score > 70 ? 'Excellent! Your resume is ATS-ready.' : analysisResult.score > 40 ? 'Decent, but can be improved.' : 'Needs Work — Improve your resume for better ATS results'}
                        </p>
                      </div>
                    </div>

                    {/* Small Stats */}
                    <div className="grid grid-cols-3 gap-4 space-y-2">
                      {[
                        { label: "Word Count", value: analysisResult.wordCount || "0" },
                        { label: "Skills Detected", value: analysisResult.skills?.length || 0 },
                        { label: "Sections Complete", value: `${analysisResult.sectionsComplete || 0}/6` },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-xl border border-[#dbdbdb] p-4 text-center"
                        >
                          <p className="text-gray-500 text-sm">{item.label}</p>
                          <p className="text-gray-700 text-lg font-semibold">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ============ TAB 2 – DETAILED METRICS ============ */}
                {activeTab === "Detailed Metrics" && (
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {[
                      { label: "Section Completeness", score: analysisResult.sectionScore || 0 },
                      { label: "Skills Match", score: analysisResult.skillsScore || 0 },
                      { label: "Content Length", score: analysisResult.lengthScore || 0 },
                      { label: "Formatting", score: analysisResult.formatScore || 50 },
                      { label: "Contact Info", score: analysisResult.contactScore || 50 },
                    ].map((m, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-[#aeadad]">
                        <p className="text-gray-800 text-sm">{m.label}</p>
                        <p className="text-blue-400 text-2xl font-bold">{m.score}%</p>
                      </div>
                    ))}

                    <div className="col-span-3 mt-4">
                      <p className="text-black text-sm mb-2">Resume Sections Status</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          "Contact Info",
                          "Professional Summary",
                          "Work Experience",
                          "Education",
                          "Skills",
                          "Projects",
                        ].map((sec, idx) => (
                          <div
                            key={idx}
                            className="bg-white border border-[#aeadad] rounded-lg p-3 text-gray-600 text-sm"
                          >
                            {sec}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============ TAB 3 – RECOMMENDATIONS ============ */}
                {activeTab === "Recommendations" && (
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-3">
                      {analysisResult.recommendations.map((r, i) => (
                        <div key={i} className="bg-gradient-to-r from-blue-500/80 to-cyan-400/80 rounded-full px-4 py-2 text-black text-xs font-semibold shadow hover:scale-105 transition-transform duration-200 cursor-pointer">
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </ResumeProvider>
  );
}
