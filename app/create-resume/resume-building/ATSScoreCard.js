// import React, { useState, useEffect } from 'react';
// import { Plus, X, CheckCircle2, User, MapPin, FileText, Briefcase, GraduationCap, Award, Sparkles, Link2, ChevronRight } from 'lucide-react';
// import { FiPlus } from 'react-icons/fi';

// const ATSScoreCard = ({ onAddFromRecommendation }) => {
//   // Mock resume data - replace with actual props
//   const [resumeData] = useState({
//     personalInfo: {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john@example.com',
//       phone: '+1234567890',
//       country: '',
//       state: '',
//       city: '',
//       headline: ''
//     },
//     profileSummary: '',
//     workExperience: [],
//     education: [],
//     skills: [],
//     projects: [],
//     certificates: [],
//     socialLinks: []
//   });

//   const [isPremiumUser, setIsPremiumUser] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [atsScore, setAtsScore] = useState(0);
//   const [sections, setSections] = useState([]);

//   // Calculate completion based on resume data
//   const calculateCompletion = () => {
//     const sectionDefinitions = [
//       {
//         name: 'Basic Info',
//         key: 'personalInfo',
//         weight: 15,
//         icon: User,
//         check: () => {
//           const info = resumeData.personalInfo;
//           return !!(info.firstName && info.lastName && info.email && info.phone);
//         }
//       },
//       {
//         name: 'Location',
//         key: 'location',
//         weight: 8,
//         icon: MapPin,
//         check: () => {
//           const info = resumeData.personalInfo;
//           return !!(info.country && info.state && info.city);
//         }
//       },
//       {
//         name: 'Headline/Title',
//         key: 'headline',
//         weight: 7,
//         icon: User,
//         check: () => !!resumeData.personalInfo.headline
//       },
//       {
//         name: 'Profile Summary',
//         key: 'profileSummary',
//         weight: 10,
//         icon: FileText,
//         check: () => resumeData.profileSummary && resumeData.profileSummary.length > 50
//       },
//       {
//         name: 'Work Experience',
//         key: 'workExperience',
//         weight: 25,
//         icon: Briefcase,
//         check: () => resumeData.workExperience && resumeData.workExperience.length > 0
//       },
//       {
//         name: 'Education',
//         key: 'education',
//         weight: 15,
//         icon: GraduationCap,
//         check: () => resumeData.education && resumeData.education.length > 0
//       },
//       {
//         name: 'Skills',
//         key: 'skills',
//         weight: 10,
//         icon: Award,
//         check: () => resumeData.skills && resumeData.skills.length >= 3
//       },
//       {
//         name: 'Projects',
//         key: 'projects',
//         weight: 5,
//         icon: Sparkles,
//         check: () => resumeData.projects && resumeData.projects.length > 0
//       },
//       {
//         name: 'Certificates',
//         key: 'certificates',
//         weight: 3,
//         icon: Award,
//         check: () => resumeData.certificates && resumeData.certificates.length > 0
//       },
//       {
//         name: 'Social Links',
//         key: 'socialLinks',
//         weight: 2,
//         icon: Link2,
//         check: () => resumeData.socialLinks && resumeData.socialLinks.length > 0
//       },
//     ];

//     let completedWeight = 0;
//     const sectionStatus = sectionDefinitions.map(section => {
//       const isCompleted = section.check();
//       if (isCompleted) completedWeight += section.weight;
//       return { ...section, isCompleted };
//     });

//     return { score: completedWeight, sections: sectionStatus };
//   };

//   // Update score and sections on mount and when resumeData changes
//   useEffect(() => {
//     const { score, sections: calculatedSections } = calculateCompletion();
//     setAtsScore(score);
//     setSections(calculatedSections);
//   }, [resumeData]);

//   // Get top 3 incomplete sections for recommendations
//   const getRecommendedSections = () => {
//     return sections
//       .filter(s => !s.isCompleted)
//       .sort((a, b) => b.weight - a.weight)
//       .slice(0, 3);
//   };

//   // Calculate stroke dash offset for circular progress
//   const radius = 45;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (atsScore / 100) * circumference;

//   const handleUpdateSection = (sectionKey) => {
//     console.log('Update section:', sectionKey);
//     // This would navigate to the appropriate section in your app
//     // For demo purposes, you can handle navigation here
//     alert(`Navigate to ${sectionKey} section to add information`);
//   };

//   const recommendedSections = getRecommendedSections();

//   return (
//     // <div className="bg-white flex items-center justify-center">
//     <div className="w-full max-w-md overflow-hidden bg-white justify-center">
//       {/* ATS Score Card */}
//       <div className="bg-white rounded-2xl p-6 border border-[#cccccc]">
//         {/* Circular Progress */}
//         <div className="flex justify-center mb-6 relative">
//           <div className={`relative ${!isPremiumUser ? 'filter blur-sm' : ''}`}>
//             <svg className="transform -rotate-90" width="140" height="140">
//               {/* Background circle */}
//               <circle
//                 cx="70"
//                 cy="70"
//                 r={radius}
//                 stroke="#E5E7EB"
//                 strokeWidth="12"
//                 fill="none"
//               />
//               {/* Progress circle */}
//               <circle
//                 cx="70"
//                 cy="70"
//                 r={radius}
//                 stroke="#22D3EE"
//                 strokeWidth="12"
//                 fill="none"
//                 strokeDasharray={circumference}
//                 strokeDashoffset={strokeDashoffset}
//                 strokeLinecap="round"
//                 className="transition-all duration-500"
//               />
//             </svg>
//             {/* Score text */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-3xl font-bold text-gray-700">
//                 {Math.round(atsScore)}%
//               </span>
//             </div>
//           </div>

//           {/* Lock overlay for non-premium users */}
//           {!isPremiumUser && (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="bg-white rounded-full p-3 shadow-lg">
//                 <svg
//                   className="w-6 h-6 text-gray-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Title */}
//         <h2 className="text-center text-xl font-semibold text-gray-700 mb-2">
//           ATS Score
//         </h2>

//         {/* Subtitle */}
//         <p className="text-center text-xs text-blue-600 font-medium mb-4">
//           +15% if you add basic info
//         </p>

//         {/* Divider */}
//         <div className="border-t border-gray-100 mb-4"></div>

//         {/* Recommended Section */}
//         <h3 className="text-lg font-semibold text-orange-500 mb-4">
//           Recommended
//         </h3>

//         {/* Action Items */}
//         <div className="space-y-2">
//           {recommendedSections.map((section) => (
//             <div
//               key={section.key}
//               className="flex items-center justify-between"
//             >
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="text-gray-700 font-medium">
//                   {section.name}
//                 </span>
//                 <span className="text-orange-500 font-semibold">
//                   0%
//                 </span>
//               </div>
//               <button
//                 // onClick={() => setShowDetailsModal(true)}
//                 className="flex text-sm items-center gap-1 text-blue-600 font-semibold transition hover:text-blue-700"
//               >
//                 Add
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//         </div>

//          {/* Recommendations Section */}
//       <div className="bg-white rounded-lg border p-4">
       
//         <div className="space-y-2">
//           {/* Work Experience */}
//           {(!resumeData.workExperience || resumeData.workExperience.length === 0) && (
//             <button
//               onClick={() => onAddFromRecommendation('workExperience')}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors w-full text-left"
//             >
//               <FiPlus size={14} />
//               Add work experience to strengthen your resume
//             </button>
//           )}

//           {/* Education */}
//           {(!resumeData.education || resumeData.education.length === 0) && (
//             <button
//               onClick={() => onAddFromRecommendation('education')}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors w-full text-left"
//             >
//               <FiPlus size={14} />
//               Add education details
//             </button>
//           )}

//           {/* Skills */}
//           {(!resumeData.skills || resumeData.skills.length < 5) && (
//             <button
//               onClick={() => onAddFromRecommendation('skills')}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors w-full text-left"
//             >
//               <FiPlus size={14} />
//               Add more skills (recommended: 5-10)
//             </button>
//           )}

//           {/* Projects */}
//           {(!resumeData.projects || resumeData.projects.length === 0) && (
//             <button
//               onClick={() => onAddFromRecommendation('projects')}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors w-full text-left"
//             >
//               <FiPlus size={14} />
//               Add projects to showcase your work
//             </button>
//           )}

//           {/* Certificates */}
//           {(!resumeData.certificates || resumeData.certificates.length === 0) && (
//             <button
//               onClick={() => onAddFromRecommendation('certificates')}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors w-full text-left"
//             >
//               <FiPlus size={14} />
//               Add certifications to boost credibility
//             </button>
//           )}

//           {/* Languages */}
//           {(!resumeData.languages || resumeData.languages.length < 2) && (
//             <button
//               onClick={() => onAddFromRecommendation('languages')}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors w-full text-left"
//             >
//               <FiPlus size={14} />
//               Add language proficiencies
//             </button>
//           )}

//           {/* Publications */}
//           {(!resumeData.publications || resumeData.publications.length === 0) && (
//             <button
//               onClick={() => onAddFromRecommendation('publications')}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors w-full text-left"
//             >
//               <FiPlus size={14} />
//               Add publications or research work
//             </button>
//           )}

//           {/* Awards & Achievements */}
//           {(!resumeData.awardsAchievements || resumeData.awardsAchievements.length === 0) && (
//             <button
//               onClick={() => onAddFromRecommendation('awardsAchievements')}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors w-full text-left"
//             >
//               <FiPlus size={14} />
//               Add awards or achievements
//             </button>
//           )}
//         </div>

//         {/* Upgrade prompt for non-premium users */}
//         {/* {!isPremiumUser && (
//             <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
//               <p className="text-xs text-gray-700 text-center font-medium">
//                 🔒 Upgrade to Premium to see your detailed ATS Score
//               </p>
//             </div>
//           )} */}
//       </div>

//       {/* Details Modal */}
//       {showDetailsModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-200">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   Complete Your Profile
//                 </h2>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Current Score: <span className="font-bold text-blue-600">{atsScore}%</span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowDetailsModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X size={24} className="text-gray-600" />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="flex-1 overflow-y-auto p-6">
//               <div className="space-y-3">
//                 {sections.map((section, idx) => {
//                   const Icon = section.icon;
//                   return (
//                     <div
//                       key={idx}
//                       className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${section.isCompleted
//                           ? 'bg-green-50 border-green-200'
//                           : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
//                         }`}
//                     >
//                       <div className="flex items-center gap-3 flex-1">
//                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${section.isCompleted ? 'bg-green-500' : 'bg-gray-200'
//                           }`}>
//                           {section.isCompleted ? (
//                             <CheckCircle2 size={20} className="text-white" />
//                           ) : (
//                             <Icon size={20} className="text-gray-500" />
//                           )}
//                         </div>

//                         <div className="flex-1">
//                           <div className="flex items-center gap-2">
//                             <span className={`font-semibold ${section.isCompleted ? 'text-green-900' : 'text-gray-900'
//                               }`}>
//                               {section.name}
//                             </span>
//                             <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${section.isCompleted
//                                 ? 'bg-green-100 text-green-700'
//                                 : 'bg-blue-100 text-blue-700'
//                               }`}>
//                               {section.weight}%
//                             </span>
//                           </div>
//                           <p className="text-xs text-gray-600 mt-0.5">
//                             {section.isCompleted
//                               ? '✓ Completed'
//                               : `Add this to gain ${section.weight}% profile strength`}
//                           </p>
//                         </div>
//                       </div>

//                       {!section.isCompleted && (
//                         <button
//                           onClick={() => {
//                             setShowDetailsModal(false);
//                             handleUpdateSection(section.key);
//                           }}
//                           className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
//                         >
//                           Add
//                           <ChevronRight size={16} />
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="p-6 border-t border-gray-200 bg-gray-50">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">
//                     {sections.filter(s => s.isCompleted).length} of {sections.length} sections completed
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowDetailsModal(false)}
//                   className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//      </div>
//   );
// };

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