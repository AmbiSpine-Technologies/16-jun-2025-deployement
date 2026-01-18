// export default ATSScoreCard;
"use client"
import React, { useState, useEffect } from 'react';
import { Plus, X, CheckCircle2, User, MapPin, FileText, Briefcase, GraduationCap, Award, Sparkles, Link2, ChevronRight } from 'lucide-react';
import { FiPlus } from 'react-icons/fi';

const ATSScoreCard = ({ onAddFromRecommendation }) => {
  const [resumeData] = useState({
    personalInfo: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1234567890', country: '', state: '', city: '', headline: '' },
    profileSummary: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certificates: [],
    socialLinks: [],
    languages: [], // Added for consistency
    publications: [], // Added for consistency
    awardsAchievements: [] // Added for consistency
  });

  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [atsScore, setAtsScore] = useState(0);
  const [sections, setSections] = useState([]);

  const calculateCompletion = () => {
    const sectionDefinitions = [
      // { name: 'Basic Info', key: 'personalInfo', weight: 15, icon: User, check: () => !!(resumeData.personalInfo.firstName && resumeData.personalInfo.lastName && resumeData.personalInfo.email && resumeData.personalInfo.phone) },
      // { name: 'Location', key: 'location', weight: 8, icon: MapPin, check: () => !!(resumeData.personalInfo.country && resumeData.personalInfo.state && resumeData.personalInfo.city) },
      // { name: 'Headline', key: 'headline', weight: 7, icon: User, check: () => !!resumeData.personalInfo.headline },
      { name: 'Profile Summary', key: 'profileSummary', weight: 10, icon: FileText, check: () => resumeData.profileSummary?.length > 50 },
      { name: 'Work Experience', key: 'workExperience', weight: 25, icon: Briefcase, check: () => resumeData.workExperience?.length > 0 },
      { name: 'Education', key: 'education', weight: 15, icon: GraduationCap, check: () => resumeData.education?.length > 0 },
      // { name: 'Skills', key: 'skills', weight: 10, icon: Award, check: () => resumeData.skills?.length >= 3 },
      { name: 'Projects', key: 'projects', weight: 5, icon: Sparkles, check: () => resumeData.projects?.length > 0 },
      { name: 'Certificates', key: 'certificates', weight: 3, icon: Award, check: () => resumeData.certificates?.length > 0 },
      { name: 'Social Links', key: 'socialLinks', weight: 2, icon: Link2, check: () => resumeData.socialLinks?.length > 0 },
    ];

    let completedWeight = 0;
    const sectionStatus = sectionDefinitions.map(section => {
      const isCompleted = section.check();
      if (isCompleted) completedWeight += section.weight;
      return { ...section, isCompleted };
    });

    return { score: completedWeight, sections: sectionStatus };
  };

  useEffect(() => {
    const { score, sections: calculatedSections } = calculateCompletion();
    setAtsScore(score);
    setSections(calculatedSections);
  }, [resumeData]);

  // Filters only incomplete sections for the UI
  const recommendedSections = sections.filter(s => !s.isCompleted);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (atsScore / 100) * circumference;

  return (
    <div className="w-full max-w-md overflow-hidden bg-white mx-auto">
      <div className="bg-white rounded-2xl p-6 border border-[#cccccc]">
        {/* Progress Circle Section */}
        <div className="flex justify-center mb-6 relative">
          <div className={`relative ${!isPremiumUser ? 'filter blur-sm' : ''}`}>
            <svg className="transform -rotate-90" width="140" height="140">
              <circle cx="70" cy="70" r={radius} stroke="#E5E7EB" strokeWidth="12" fill="none" />
              <circle
                cx="70" cy="70" r={radius} stroke="#22D3EE" strokeWidth="12" fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-700">{Math.round(atsScore)}%</span>
            </div>
          </div>
          {!isPremiumUser && (
            <div className="absolute inset-0 flex items-center justify-center">
                     <div className="flex justify-center mb-6 relative">
          <div className={`relative ${!isPremiumUser ? 'filter blur-sm' : ''}`}>
            <svg className="transform -rotate-90" width="140" height="140">
              {/* Background circle */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#22D3EE"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            {/* Score text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-700">
                {Math.round(atsScore)}%
              </span>
            </div>
          </div>

          {/* Lock overlay for non-premium users */}
          {!isPremiumUser && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
            </div>
          )}
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-700 mb-2">ATS Score</h2>
        <p className="text-center text-xs text-blue-600 font-medium mb-4">
          Improve your score by adding missing details
        </p>

        <div className="border-t border-gray-100 mb-4"></div>

        <h3 className="text-lg font-semibold text-orange-500 mb-4">Recommended </h3>

        {/* Dynamic Action Items - This replaces the static buttons */}
        <div className="space-y-3">
          {recommendedSections.length > 0 ? (
            recommendedSections.map((section) => (
              <div
                key={section.key}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700">{section.name} <span className="text-orange-500 font-semibold">
                  {section.weight}%
                </span></p>
                  </div>
                </div>
                <button 
                onClick={() => onAddFromRecommendation(section.key)}
                 className="flex hover:cursor-pointer items-center gap-1 text-blue-600 font-semibold text-sm">
                  Add <FiPlus size={14} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-green-600 font-medium">✨ All sections completed!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSScoreCard;