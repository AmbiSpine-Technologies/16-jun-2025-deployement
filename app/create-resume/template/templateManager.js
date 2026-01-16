// templates/templateManager.js
export const templateCategories = {
  // By Industry
  technology: {
    name: "Technology & IT",
    description: "For software developers, engineers, IT professionals",
    icon: "💻",
    templates: [
      "tech-minimal",
      "developer-modern",
      "ai-specialist",
      "cloud-architect",
      "data-scientist",
    ],
  },
  business: {
    name: "Business & Management",
    description: "For managers, executives, business professionals",
    icon: "💼",
    templates: [
      "executive-classic",
      "manager-professional",
      "consultant-modern",
      "operations-leader",
    ],
  },
  creative: {
    name: "Creative & Design",
    description: "For designers, artists, creative professionals",
    icon: "🎨",
    templates: [
      "creative-portfolio",
      "designer-modern",
      "ux-specialist",
      "content-creator",
    ],
  },
  healthcare: {
    name: "Healthcare",
    description: "For doctors, nurses, healthcare professionals",
    icon: "🏥",
    templates: ["healthcare-professional", "medical-modern", "nurse-classic"],
  },
  education: {
    name: "Education & Academia",
    description: "For teachers, professors, researchers",
    icon: "🎓",
    templates: ["academic-traditional", "research-modern", "teacher-friendly"],
  },
  sales: {
    name: "Sales & Marketing",
    description: "For sales professionals, marketers",
    icon: "📈",
    templates: ["sales-dynamic", "marketing-modern", "digital-marketer"],
  },
  finance: {
    name: "Finance & Accounting",
    description: "For finance professionals, accountants",
    icon: "💰",
    templates: ["finance-conservative", "accounting-professional"],
  },
  engineering: {
    name: "Engineering",
    description: "For mechanical, civil, electrical engineers",
    icon: "⚙️",
    templates: ["engineer-technical", "mechanical-classic"],
  },
};

// By Experience Level
export const experienceLevels = {
  entry: {
    name: "Entry Level",
    description: "For freshers and 0-2 years experience",
    templates: ["fresher-modern", "graduate-clean", "internship-focused"],
  },
  mid: {
    name: "Mid Level",
    description: "For 2-5 years experience",
    templates: ["professional-standard", "mid-level-modern"],
  },
  senior: {
    name: "Senior Level",
    description: "For 5+ years experience",
    templates: ["executive-premium", "senior-leader", "director-level"],
  },
  executive: {
    name: "Executive",
    description: "For C-level and leadership roles",
    templates: ["ceo-elegant", "vp-executive", "leadership-premium"],
  },
};

// By Layout Type
export const layoutTypes = {
  single: {
    name: "Single Column",
    description: "Traditional vertical layout",
    templates: ["professional-classic", "academic-traditional"],
  },
  twoColumn: {
    name: "Two Column",
    description: "Modern sidebar layout",
    templates: ["modern-sidebar", "creative-split"],
  },
  hybrid: {
    name: "Hybrid",
    description: "Combination layout",
    templates: ["executive-hybrid", "tech-modern"],
  },
  minimal: {
    name: "Minimal",
    description: "Clean and focused",
    templates: ["minimal-clean", "simple-elegant"],
  },
};

// Complete Template Database
// export const resumeTemplates = {
//   // Technology Templates
//   'tech-minimal': {
//     id: 'tech-minimal',
//     name: 'Tech Minimal',
//     category: 'technology',
//     experienceLevel: 'mid',
//     layout: 'minimal',
//     style: 'modern',
//     description: 'Clean tech-focused design for developers',
//     rating: 4.8,
//     popularity: 95,
//     atsFriendly: true,
//     recommendedFor: ['Software Developer', 'Web Developer', 'App Developer'],
//     features: ['Skills-focused', 'Project showcase', 'Clean typography']
//   },
//   'developer-modern': {
//     id: 'developer-modern',
//     name: 'Developer Modern',
//     category: 'technology',
//     experienceLevel: 'mid',
//     layout: 'twoColumn',
//     style: 'modern',
//     description: 'Modern layout with code-friendly design',
//     rating: 4.7,
//     popularity: 92,
//     atsFriendly: true,
//     recommendedFor: ['Full Stack Developer', 'Backend Engineer', 'DevOps'],
//     features: ['GitHub integration', 'Tech stack highlight', 'Project emphasis']
//   },
//   'ai-specialist': {
//     id: 'ai-specialist',
//     name: 'AI Specialist',
//     category: 'technology',
//     experienceLevel: 'senior',
//     layout: 'hybrid',
//     style: 'modern',
//     description: 'Specialized for AI/ML professionals',
//     rating: 4.9,
//     popularity: 88,
//     atsFriendly: true,
//     recommendedFor: ['AI Engineer', 'Data Scientist', 'ML Researcher'],
//     features: ['Research focus', 'Publication section', 'Algorithm showcase']
//   },

//   // Business Templates
//   'executive-classic': {
//     id: 'executive-classic',
//     name: 'Executive Classic',
//     category: 'business',
//     experienceLevel: 'executive',
//     layout: 'single',
//     style: 'classic',
//     description: 'Elegant design for senior leadership',
//     rating: 4.8,
//     popularity: 90,
//     atsFriendly: true,
//     recommendedFor: ['CEO', 'Director', 'VP', 'Manager'],
//     features: ['Leadership focus', 'Achievement metrics', 'Professional tone']
//   },
//   'manager-professional': {
//     id: 'manager-professional',
//     name: 'Manager Professional',
//     category: 'business',
//     experienceLevel: 'senior',
//     layout: 'twoColumn',
//     style: 'professional',
//     description: 'Professional layout for management roles',
//     rating: 4.6,
//     popularity: 85,
//     atsFriendly: true,
//     recommendedFor: ['Project Manager', 'Team Lead', 'Department Head'],
//     features: ['Team management focus', 'Budget highlights', 'Strategic planning']
//   },

//   // Creative Templates
//   'creative-portfolio': {
//     id: 'creative-portfolio',
//     name: 'Creative Portfolio',
//     category: 'creative',
//     experienceLevel: 'mid',
//     layout: 'twoColumn',
//     style: 'creative',
//     description: 'Visual-focused design for creatives',
//     rating: 4.7,
//     popularity: 89,
//     atsFriendly: false, // Creative templates might be less ATS-friendly
//     recommendedFor: ['Graphic Designer', 'UI/UX Designer', 'Artist'],
//     features: ['Portfolio integration', 'Visual elements', 'Creative layout']
//   },

//   // Add 40+ more templates following same structure...
// };

// In your template manager, ensure IDs match
export const resumeTemplates = {
  professional: {
    id: "professional", // This should match the case in switch statement
    name: "Professional",
    category: "technology",
    experienceLevel: "mid",
    layout: "minimal",
    style: "modern",
    img: "/classic.png",
    description: "Clean tech-focused design for developers",
    rating: 4.8,
    popularity: 95,
    atsFriendly: true,
    recommendedFor: ["Software Developer", "Web Developer"],
  },
  modern: {
    id: "modern", // Should match 'modern' in switch
    name: "Modern",
    category: "technology",
    experienceLevel: "mid",
    layout: "twoColumn",
    style: "modern",
    img: "/modern.png",
    description: "Modern layout with code-friendly design",
    rating: 4.7,
    popularity: 92,
    atsFriendly: true,
    recommendedFor: ["Full Stack Developer", "Backend Engineer"],
  },
  classic: {
    id: "classic", // Should match 'classic' in switch
    name: "Classic",
    category: "business",
    experienceLevel: "executive",
    layout: "single",
    style: "classic",
    img: "/classic.png",
    description: "Elegant design for senior leadership",
    rating: 4.8,
    popularity: 90,
    atsFriendly: true,
    isPremium: true,
    recommendedFor: ["CEO", "Director", "VP"],
    features: [
      "Mentor-approved design",
      "ATS-optimized formatting",
      "Executive-level presentation",
      "Premium typography",
      "Multi-page support",
    ],
  },
  // ...
};
// Template Recommendations by Job Role
export const templateRecommendations = {
  "Software Developer": [
    "tech-minimal",
    "developer-modern",
    "professional-standard",
  ],
  "Data Scientist": ["ai-specialist", "tech-minimal", "research-modern"],
  "Product Manager": [
    "manager-professional",
    "executive-classic",
    "professional-standard",
  ],
  "UX Designer": ["creative-portfolio", "designer-modern", "ux-specialist"],
  "Sales Executive": [
    "sales-dynamic",
    "professional-standard",
    "executive-classic",
  ],
  "Marketing Manager": [
    "marketing-modern",
    "manager-professional",
    "digital-marketer",
  ],
  "HR Manager": [
    "professional-standard",
    "manager-professional",
    "executive-classic",
  ],
  "Financial Analyst": [
    "finance-conservative",
    "professional-standard",
    "accounting-professional",
  ],
  "Mechanical Engineer": [
    "engineer-technical",
    "professional-standard",
    "mechanical-classic",
  ],
  Teacher: [
    "teacher-friendly",
    "academic-traditional",
    "professional-standard",
  ],
};

// ATS-Friendly Templates (Globally Compatible)
export const atsFriendlyTemplates = Object.values(resumeTemplates)
  .filter((template) => template.atsFriendly)
  .map((template) => template.id);

// Industry-Specific Templates
export const getTemplatesByIndustry = (industry) => {
  return Object.values(resumeTemplates).filter(
    (template) => template.category === industry
  );
};

// Experience-Level Templates
export const getTemplatesByExperience = (level) => {
  return Object.values(resumeTemplates).filter(
    (template) => template.experienceLevel === level
  );
};
