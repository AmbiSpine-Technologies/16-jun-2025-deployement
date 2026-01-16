import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGlobe,
  FaBriefcase,
  FaGraduationCap,
  FaFolderOpen,
  FaCode,
  FaAward,
  FaCertificate,
  FaBook,
  FaMapMarkerAlt,
  FaStar,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { IoTodayOutline } from "react-icons/io5";
import { MdOutlineSportsBasketball } from "react-icons/md";


// Date formatting utility
export const formatMonthYear = (month, year, format = "long") => {
  if (!month || !year) return "";
  
  if (format === "short") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[parseInt(month, 10) - 1] || month;
    return `${monthName} ${year}`;
  } else {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = months[parseInt(month, 10) - 1] || month;
    return `${monthName} ${year}`;
  }
};

// Platform icons utility
export const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'LinkedIn': return <FaLinkedin className="text-gray-600" />;
    case 'GitHub': return <FaGlobe className="text-gray-600" />;
    case 'Twitter': return <FaGlobe className="text-gray-600" />;
    case 'Portfolio': return <FaGlobe className="text-gray-600" />;
    default: return <FaGlobe className="text-gray-600" />;
  }
};


 export function getPlatformIconObject(platform) {
    const platformIcons = {
      linkedin: FaLinkedinIn,
      github: FaGithub,
      twitter: FaTwitter,
      facebook: FaFacebook,
      youtube: FaYoutube,
      instagram: FaInstagram,
      website: FaGlobe,
      portfolio: MdOutlineSportsBasketball
    };

    const IconComponent = platformIcons[platform?.toLowerCase()] || IoTodayOutline;
    return <IconComponent className="text-gray-600" />;
  }

 export const getProficiencyDots = (level) => {
  const levelDots = {
    beginner: 1,
    elementary: 2,
    intermediate: 3,
    advanced: 4,
    native: 5,
  };
  return levelDots[level?.toLowerCase()] || 0;
};


// Location text utility
export const getLocationText = (personalInfo) => {
  const locationParts = [];
  if (personalInfo.city) locationParts.push(personalInfo.city);
  if (personalInfo.state) locationParts.push(personalInfo.state);
  if (personalInfo.country) locationParts.push(personalInfo.country);
  
  return locationParts.length > 0 ? locationParts.join(", ") : null;
};

// Section visibility check
export const shouldShowSection = (items) => {
  return items && items.filter(item => !item.hidden).length > 0;
};

// Language level dots
export const renderLanguageLevel = (level) => {
  const levelDots = {
    beginner: 1,
    intermediate: 3,
    advanced: 4,
    native: 5,
  }[level?.toLowerCase()] || 0;

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`h-3 w-3 rounded-full ${
            i < levelDots ? "bg-blue-500" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Section icons
export const getSectionIcon = (sectionName) => {
  switch (sectionName) {
    case 'workExperience': return <FaBriefcase className="text-gray-600" />;
    case 'education': return <FaGraduationCap className="text-gray-600" />;
    case 'projects': return <FaFolderOpen className="text-gray-600" />;
    case 'skills': return <FaCode className="text-gray-600" />;
    case 'certificates': return <FaCertificate className="text-gray-600" />;
    case 'awards': return <FaAward className="text-gray-600" />;
    case 'publications': return <FaBook className="text-gray-600" />;
    default: return <FaStar className="text-gray-600" />;
  }
};