import ProfessionalTemplate from "./ProfessionalTemplate";
import ModernTemplate from "./ModernTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import CreativeTemplate from "./CreativeTemplate";
import ClassicTemplate from "./ClassicTemplate";
// Import all your templates...

export const templateComponents = {
  professional: ProfessionalTemplate,
  modern: ModernTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  classic: ClassicTemplate,
  // Add all your templates here with exact IDs
};

// Template metadata for PDF generation
export const templateConfigs = {
  professional: {
    name: "Professional",
    layout: "single",
    style: "professional",
    supports: {
      profileImage: true,
      customColors: true,
      customFonts: true,
      twoColumn: false,
    },
  },
  modern: {
    name: "Modern",
    layout: "twoColumn",
    style: "modern",
    supports: {
      profileImage: true,
      customColors: true,
      customFonts: true,
      twoColumn: true,
    },
  },
  classic: {
    name: "Classic",
    layout: "twoColumn",
    style: "classic",
    supports: {
      profileImage: false,
      customColors: true,
      customFonts: true,
      twoColumn: true,
    },
  },
  executive: {
    name: "Executive",
    layout: "single",
    style: "executive",
    supports: {
      profileImage: true,
      customColors: true,
      customFonts: true,
      twoColumn: false,
    },
  },
  creative: {
    name: "Creative",
    layout: "creative",
    style: "creative",
    supports: {
      profileImage: true,
      customColors: true,
      customFonts: true,
      twoColumn: false,
    },
  },
  // Add config for all templates...
};

export const getTemplateComponent = (templateId) => {
  return templateComponents[templateId] || ProfessionalTemplate;
};

export const getTemplateConfig = (templateId) => {
  return templateConfigs[templateId] || templateConfigs.professional;
};
