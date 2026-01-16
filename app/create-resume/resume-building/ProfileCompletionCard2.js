import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronRight, X, TrendingUp, User, Briefcase, GraduationCap, Award, FileText, MapPin, Link as LinkIcon, Trophy, BookOpen, Globe, Heart, Sparkles } from 'lucide-react';

// Profile Completion Component
export function ProfileCompletionCard2({ resumeData, onUpdateSection }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Calculate profile completion based on resumeData
  const calculateCompletion = () => {
    const sections = [
      { 
        name: 'Basic Info', 
        key: 'personalInfo', 
        weight: 15, 
        icon: User,
        check: () => {
          const info = resumeData.personalInfo;
          return !!(info.firstName && info.lastName && info.email && info.phone);
        }
      },
      { 
        name: 'Location', 
        key: 'location', 
        weight: 8, 
        icon: MapPin,
        check: () => {
          const info = resumeData.personalInfo;
          return !!(info.country && info.state && info.city);
        }
      },
      { 
        name: 'Headline/Title', 
        key: 'headline', 
        weight: 7, 
        icon: User,
        check: () => !!resumeData.personalInfo.headline
      },
      { 
        name: 'Profile Summary', 
        key: 'profileSummary', 
        weight: 10, 
        icon: FileText,
        check: () => resumeData.profileSummary && resumeData.profileSummary.length > 50
      },
      { 
        name: 'Work Experience', 
        key: 'workExperience', 
        weight: 25, 
        icon: Briefcase,
        check: () => resumeData.workExperience && resumeData.workExperience.length > 0
      },
      { 
        name: 'Education', 
        key: 'education', 
        weight: 15, 
        icon: GraduationCap,
        check: () => resumeData.education && resumeData.education.length > 0
      },
      { 
        name: 'Skills', 
        key: 'skills', 
        weight: 10, 
        icon: Award,
        check: () => resumeData.skills && resumeData.skills.length >= 3
      },
      { 
        name: 'Projects', 
        key: 'projects', 
        weight: 5, 
        icon: Sparkles,
        check: () => resumeData.projects && resumeData.projects.length > 0
      },
      { 
        name: 'Certificates', 
        key: 'certificates', 
        weight: 3, 
        icon: Award,
        check: () => resumeData.certificates && resumeData.certificates.length > 0
      },
      { 
        name: 'Social Links', 
        key: 'socialLinks', 
        weight: 2, 
        icon: LinkIcon,
        check: () => resumeData.socialLinks && resumeData.socialLinks.length > 0
      },
    ];

    let completedWeight = 0;
    const sectionStatus = sections.map(section => {
      const isCompleted = section.check();
      if (isCompleted) completedWeight += section.weight;
      return { ...section, isCompleted };
    });

    return { score: completedWeight, sections: sectionStatus };
  };

  const { score, sections } = calculateCompletion();
  const incompleteSections = sections.filter(s => !s.isCompleted);

  // Circular progress SVG
  const CircularProgress = ({ percentage, size = 120 }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const getColor = (pct) => {
      if (pct >= 80) return '#10b981'; // green
      if (pct >= 50) return '#3b82f6'; // blue
      return '#f59e0b'; // orange
    };

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor(percentage)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
          <span className="text-xs text-gray-500">Complete</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Main Card */}
      <div className="bg-white border border-[#aeadad] rounded-2xl px-6 py-4 duration-300 my-1 p-6">
        <div className="flex justify-between items-start">
          {/* Left side - Progress Circle */}
          <div className="flex gap-4 items-center">
            <CircularProgress percentage={score} size={100} />
            
            <div className="flex flex-col">
              <span className="text-slate-700 font-semibold text-lg">Profile Strength</span>
              <p className="text-sm text-gray-600 mt-1">
                {score >= 80 ? 'Excellent! Your profile stands out' : 
                 score >= 50 ? 'Good start! Add more details' : 
                 'Complete your profile to get noticed'}
              </p>
              {incompleteSections.length > 0 && (
                <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                  <TrendingUp size={14} />
                  <span>+{incompleteSections[0].weight}% if you add {incompleteSections[0].name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right side - View Details Button */}
          <button 
            onClick={() => setShowDetailsModal(true)}
            className="px-3 py-1 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            View Details
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 pt-3 border-t border-slate-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {sections.filter(s => s.isCompleted).length} of {sections.length} sections completed
            </span>
            <span className="text-blue-600 font-medium">
              {incompleteSections.length} remaining
            </span>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Profile Completion</h2>
                <p className="text-sm text-gray-600 mt-1">Complete your profile to increase visibility</p>
              </div>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Score Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CircularProgress percentage={score} size={80} />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{score}% Complete</h3>
                    <p className="text-sm text-gray-600">
                      {score >= 80 ? 'Your profile is looking great!' : 
                       score >= 50 ? `${100 - score}% to go for a complete profile` : 
                       'Let\'s build a strong profile together'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sections List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {sections.map((section, idx) => {
                  const Icon = section.icon;
                  return (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        section.isCompleted 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          section.isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`}>
                          {section.isCompleted ? (
                            <CheckCircle2 size={20} className="text-white" />
                          ) : (
                            <Icon size={20} className="text-gray-500" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${
                              section.isCompleted ? 'text-green-900' : 'text-gray-900'
                            }`}>
                              {section.name}
                            </span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              section.isCompleted 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {section.weight}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {section.isCompleted 
                              ? '✓ Completed' 
                              : `Add this to gain ${section.weight}% profile strength`}
                          </p>
                        </div>
                      </div>

                      {!section.isCompleted && (
                        <button 
                          onClick={() => {
                            setShowDetailsModal(false);
                            onUpdateSection(section.key);
                          }}
                          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add
                          <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tips Section */}
              {incompleteSections.length > 0 && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <TrendingUp size={18} />
                    Quick Tips
                  </h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Profiles with 80%+ completion get 3x more visibility</li>
                    <li>• Adding work experience increases your chances by 40%</li>
                    <li>• Complete profiles receive 5x more connection requests</li>
                    <li>• Add at least 3 skills to showcase your expertise</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t p-4 bg-gray-50">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="w-full py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// DEMO: Usage Example
export default function App() {
  // Your actual resumeData structure
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      headline: "",
      email: "john@example.com",
      phone: "+91 9876543210",
      country: "India",
      state: "Madhya Pradesh",
      city: "Bhopal",
      address: "",
    },
    socialLinks: [],
    certificates: [],
    publications: [],
    awardsAchievements: [],
    profileSummary: "",
    projects: [],
    workExperience: [],
    education: [{
      degree: "B.Tech",
      institution: "ABC University",
      year: "2020"
    }],
    skills: ["JavaScript", "React"],
    interests: [],
    languages: [],
    accomplishments: [],
  });

  const handleUpdateSection = (sectionKey) => {
    alert(`Opening form to update: ${sectionKey}`);
    console.log('Update section:', sectionKey);
    // Here you would:
    // 1. Scroll to the section in your resume form
    // 2. Or open a modal for that specific section
    // 3. Or navigate to edit page with section highlighted
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile Dashboard</h1>
        
        {/* Profile Completion Card */}
        <ProfileCompletionCard2 
          resumeData={resumeData}
          onUpdateSection={handleUpdateSection}
        />

        {/* Demo Controls */}
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-bold text-blue-900 mb-3">Demo: Toggle Sections</h3>
          <p className="text-sm text-blue-800 mb-4">Click to see completion % change:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setResumeData(prev => ({ 
                ...prev, 
                personalInfo: { 
                  ...prev.personalInfo, 
                  headline: prev.personalInfo.headline ? '' : 'Software Developer' 
                }
              }))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Headline ({resumeData.personalInfo.headline ? '✓' : '✗'})
            </button>
            
            <button
              onClick={() => setResumeData(prev => ({ 
                ...prev, 
                profileSummary: prev.profileSummary ? '' : 'I am a passionate software developer with 5 years of experience in building scalable web applications...' 
              }))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Summary ({resumeData.profileSummary ? '✓' : '✗'})
            </button>
            
            <button
              onClick={() => setResumeData(prev => ({ 
                ...prev, 
                workExperience: prev.workExperience.length ? [] : [{
                  title: 'Senior Developer',
                  company: 'Tech Corp',
                  duration: '2020-Present'
                }]
              }))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Experience ({resumeData.workExperience.length ? '✓' : '✗'})
            </button>
            
            <button
              onClick={() => setResumeData(prev => ({ 
                ...prev, 
                projects: prev.projects.length ? [] : [{
                  name: 'E-commerce Platform',
                  description: 'Built with React and Node.js'
                }]
              }))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Projects ({resumeData.projects.length ? '✓' : '✗'})
            </button>
            
            <button
              onClick={() => setResumeData(prev => ({ 
                ...prev, 
                certificates: prev.certificates.length ? [] : [{
                  name: 'AWS Certified Developer',
                  issuer: 'Amazon'
                }]
              }))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Certificates ({resumeData.certificates.length ? '✓' : '✗'})
            </button>

            <button
              onClick={() => setResumeData(prev => ({ 
                ...prev, 
                socialLinks: prev.socialLinks.length ? [] : [{
                  platform: 'LinkedIn',
                  url: 'linkedin.com/in/johndoe'
                }]
              }))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Social Links ({resumeData.socialLinks.length ? '✓' : '✗'})
            </button>
          </div>
        </div>

        {/* Current Data Preview */}
        <div className="mt-6 p-6 bg-white border border-gray-300 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-3">Current Resume Data:</h3>
          <div className="text-xs bg-gray-50 p-4 rounded-lg overflow-auto max-h-60">
            <pre>{JSON.stringify(resumeData, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}