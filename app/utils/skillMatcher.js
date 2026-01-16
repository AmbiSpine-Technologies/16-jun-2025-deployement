// utils/skillMatcher.js

const SKILL_KEYWORDS = {
  // Frontend
  "react": ["React.js", "Redux", "Next.js", "Hooks"],
  "javascript": ["ES6+", "TypeScript", "Vanilla JS"],
  "css": ["Tailwind CSS", "SASS", "Bootstrap", "Material UI"],
  "frontend": ["HTML5", "CSS3", "React.js", "Vue.js"],
  
  // Backend
  "node": ["Node.js", "Express.js", "NestJS"],
  "python": ["Django", "Flask", "FastAPI"],
  "database": ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  "api": ["REST API", "GraphQL", "Swagger"],
  
  // Design
  "design": ["Figma", "Adobe XD", "Photoshop"],
  "ui": ["Prototyping", "Wireframing"],
  
  // DevOps
  "cloud": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
  "ci/cd": ["Jenkins", "GitHub Actions", "GitLab CI"]
};

export const suggestSkillsFromDescription = (description) => {
  if (!description) return [];
  
  const text = description.toLowerCase();
  const suggested = new Set();

  // Scan description for keywords
  Object.keys(SKILL_KEYWORDS).forEach((keyword) => {
    if (text.includes(keyword)) {
      // If keyword found, add associated skills
      SKILL_KEYWORDS[keyword].forEach(skill => suggested.add(skill));
    }
  });

  return Array.from(suggested);
};