"use client";
import React, { useState, useEffect, use } from "react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  GraduationCap,
  Heart,
  Bookmark,
  Share2,
  Building2,
  Users,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Upload,
  X,
  AlertCircle,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  Star,
  Eye,
  ClipboardList,
  Timer,
  Award,
  ChevronRight,
  Check,
  FileText,
  User,
  BriefcaseIcon,
  Calendar,
  Crown,
} from "lucide-react";
import { Dot } from "lucide-react";
import { Send } from "@mui/icons-material";
import { GlobalLoader} from "../../components/Loader";
import Link from "next/link";
import JobMatchModal from "../JobMatchModal";
import { Buttonborder } from "../../components/Button";
import ApplicationForm from "../ApplicationForm";
import { getJobById } from "@/app/utils/jobsApi";

// ============= ASSESSMENT QUESTIONS =============
const assessmentQuestions = {
  // Premium users के लिए आसान प्रश्न
  premium: {
    "Senior Software Engineer": [
      {
        id: 1,
        question: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Advanced Programming Interface",
          "Application Process Integration",
          "Advanced Process Integration",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "Which language is mainly used for web development?",
        options: ["Python", "JavaScript", "Java", "C++"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "What is the purpose of a database?",
        options: [
          "To store and organize data",
          "To design websites",
          "To write code",
          "To test applications",
        ],
        correctAnswer: 0,
      },
    ],
    "Full Stack Developer": [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "What is CSS used for?",
        options: [
          "Database management",
          "Styling web pages",
          "Server-side programming",
          "Mobile app development",
        ],
        correctAnswer: 1,
      },
    ],
    default: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "Which language is used for styling web pages?",
        options: ["HTML", "Python", "CSS", "JavaScript"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What is the purpose of Git?",
        options: [
          "Database management",
          "Version control",
          "Web hosting",
          "Code compilation",
        ],
        correctAnswer: 1,
      },
    ],
  },
  // Non-premium users के लिए कठिन प्रश्न
  "non-premium": {
    "Senior Software Engineer": [
      {
        id: 1,
        question:
          "What is the time complexity of QuickSort in the average case?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question:
          "Which design pattern is used to create objects without specifying their concrete classes?",
        options: ["Singleton", "Factory", "Observer", "Strategy"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "What does REST stand for in API architecture?",
        options: [
          "Remote Execution State Transfer",
          "Representational State Transfer",
          "Resource Execution State Transfer",
          "Remote State Transfer",
        ],
        correctAnswer: 1,
      },
    ],
    "Full Stack Developer": [
      {
        id: 1,
        question: "Which of the following is NOT a JavaScript framework?",
        options: ["React", "Angular", "Django", "Vue"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "What does CORS stand for?",
        options: [
          "Cross-Origin Resource Sharing",
          "Cross-Origin Request Security",
          "Core Origin Resource Sharing",
          "Cross-Origin Resource Security",
        ],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: "Which database is NoSQL?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
        correctAnswer: 2,
      },
    ],
    default: [
      {
        id: 1,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Which of these is a relational database?",
        options: ["MongoDB", "Redis", "PostgreSQL", "Cassandra"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What is the purpose of Docker?",
        options: [
          "Version control",
          "Containerization",
          "Code compilation",
          "Database management",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "What is React used for?",
        options: [
          "Backend development",
          "Building user interfaces",
          "Database design",
          "Mobile app development (only)",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "Standard Query Language",
          "System Query Language",
        ],
        correctAnswer: 0,
      },
    ],
  },
};

// ============= ASSESSMENT COMPONENT =============
const AssessmentPage = ({ job, onComplete, onCancel, isPremiumUser }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  // User type के अनुसार प्रश्न सेट चुनें
  const userType = isPremiumUser ? "premium" : "non-premium";
  const questions =
    assessmentQuestions[userType][job.title] ||
    assessmentQuestions[userType].default;

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmit();
    }
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const finalScore = (correctCount / questions.length) * 100;
    setScore(finalScore);
    setPassed(finalScore >= 60); // 60% पासिंग स्कोर
    setShowResults(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-[#0000007a]  z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-xl">
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto `}
            >
              <ClipboardList
                className={`w-10 h-10 ${
                  passed ? "text-green-600" : "text-red-600"
                }`}
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {passed ? "Assessment Completed!" : "Assessment Failed!"}
            </h2>

            <div
              className={`rounded-xl p-6 mb-6 ${
                passed ? "bg-green-100" : "bg-red-50"
              }`}
            >
              <div
                className={`text-4xl font-bold  ${
                  passed ? "text-green-600" : "text-red-600"
                }`}
              >
                {score.toFixed(0)}%
              </div>
              <p className="text-base mt-2 text-gray-600 font-medium">Your Score</p>
              <div className="">
                <p
                  className={`font-semibold ${
                    passed ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {passed
                    ? "✓ You passed the assessment!"
                    : "✗ You need 60% or more to apply"}
                </p>
                {/* <p className="text-sm text-gray-600 mt-2">
                  {isPremiumUser
                    ? "Premium User (Easy Questions)"
                    : "Standard User (Regular Questions)"}
                </p> */}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 border border-[#cccccc] rounded-lg">
                <p className="text-base text-gray-600 font-medium mb-1">Total Questions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {questions.length}
                </p>
              </div>
              <div className="text-center p-4 border border-[#cccccc] rounded-lg">
                <p className="text-sm  text-gray-600 font-medium  mb-1">Correct</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((score / 100) * questions.length)}
                </p>
              </div>
              <div className="text-center p-4 border border-[#cccccc] rounded-lg">
                <p className="text-sm text-gray-600 font-medium mb-1">Wrong</p>
                <p className="text-2xl font-bold text-red-600">
                  {questions.length -
                    Math.round((score / 100) * questions.length)}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                {passed
                  ? "Great job! You have successfully completed the assessment. Now you can proceed to submit your application."
                  : "You need to score at least 60% to apply for this position. You can try again or look for other opportunities."}
              </p>
              {!passed && (
                <div className="flex items-center justify-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span>Minimum 60% required to apply for this job</span>
                </div>
              )}
            </div>

              <div>
  <div className="flex justify-between gap-4">

       <button
  onClick={() => passed && onComplete(score, passed)}
  disabled={!passed}
  className="rounded-full"
>
  {passed ? (
    // ✅ ALLOWED BUTTON (normal padding, no span)
    <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition">
      Proceed to Application
    </span>
  ) : (
    // 🚫 DISALLOWED BUTTON (less padding)
    <span className="inline-block px-3 py-1.5 bg-gray-300 text-gray-600 text-sm font-medium rounded-full cursor-not-allowed">
      Cannot Apply
    </span>
  )}
</button>


        

                   <button
 onClick={onCancel}

>

    <span className="inline-block px-4 py-2 border-2 border-blue-700 text-gray-600 text-sm font-medium rounded-full  transition">
       Review Answers
    </span>

</button>
            </div>
              </div>
          
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-[#0000007a] z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Technical Assessment
                </h1>
                <div className="flex text-base items-center gap-3 mt-2">
                  <p className="text-gray-600">
                    {job.title} • {job.company}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Timer className="w-4 h-4" />
                    <span
                      className={`text-base font-bold ${
                        timeLeft < 60 ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Time Remaining</p>
                </div>
                <button
                  onClick={onCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Navigation */}
            <div className="flex gap-2 mb-6">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(idx)}
                  className={`w-7 h-7 rounded-lg flex-shrink-0 font-semibold transition-all ${
                    idx === currentQuestion
                      ? "bg-blue-600 text-white"
                      : selectedAnswers[q.id] !== undefined
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-3">
            <div className="mb-4">
              <span className=" text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
                Question {currentQuestion + 1}
              </span>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-3 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQ.id] === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQ.id, index)}
                    className={`w-full text-left px-3 py-1 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-300 hover:cursor-pointer hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-500"
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span
                        className={`text-lg ${
                          isSelected
                            ? "font-semibold text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors ${
                  currentQuestion === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "border-blue-600  text-gray-600"
                }`}
              >
                Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-sm text-white rounded-full font-medium transition-colors flex items-center gap-2"
                >
                  Submit Assessment
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-4 py-1.5 text-sm bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white rounded-full font-medium transition-colors flex items-center gap-2"
                >
                  Next Question
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Format date to relative time
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  const months = Math.floor(diffDays / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
};

const JobDetailsPage = ({ params }) => {
  const resolvedParams = React.use(params); // ✅ unwrap Promise
  const jobId = resolvedParams.id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(null);
  const [assessmentPassed, setAssessmentPassed] = useState(false);

  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);

  // Transform backend job data to frontend format
  const transformJobData = (jobData) => {
    return {
      id: jobData._id,
      title: jobData.title,
      company: jobData.company,
      companyName: jobData.company,
      companyLogo: jobData.companyLogo || "/spreads.svg",
      companyLogoUrl: jobData.companyLogo || "/spreads.svg",
      companyColor: jobData.companyColor || "bg-blue-600",
      location: jobData.location,
      salary: jobData.salary || "Not specified",
      workMode: jobData.workMode || "On-site",
      jobType: jobData.jobType || "Full-time",
      experience: jobData.experience || "0",
      postedDate: jobData.createdAt ? formatDate(jobData.createdAt) : "Recently",
      skills: jobData.skills || [],
      description: jobData.description || "",
      requirements: jobData.requirements || [],
      responsibilities: jobData.responsibilities || [],
      benefits: jobData.benefits || [],
      views: jobData.views || 0,
      applicants: jobData.applicationsCount || 0,
      matchScore: Math.floor(Math.random() * 30 + 70), // Can be calculated from profile later
      isBookmarked: false,
      isLiked: false,
      isApplied: false,
      companySize: jobData.companySize || "Mid-size",
      industry: jobData.industry || "Technology",
      companyWebsite: jobData.companyWebsite || "#",
      companyEmail: jobData.companyEmail || "",
      companyPhone: jobData.companyPhone || "",
      Companydescription: jobData.companyDescription || jobData.description || "",
    };
  };

  // console.log(" RUPENDRA ", job);
  // Fetch job from API
  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await getJobById(jobId);
        if (result.success && result.data) {
          const transformedJob = transformJobData(result.data);
          setJob(transformedJob);
        } else {
          toast.error(result.message || "Failed to fetch job");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Failed to fetch job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  // useEffect(() => {
  //   // Mock job data (fallback for testing)
  //   const mockJob = {
  //       id: 1,
  //       title: "Senior Software Engineer",
  //       company: "Google",
  //       companyLogo: "G",
  //       location: "Bangalore, Karnataka",
  //       salary: "₹25L - ₹45L",
  //       workMode: "Hybrid",
  //       jobType: "Full-time",
  //       experience: "3-5 years",
  //       postedDate: "2 days ago",
  //       skills: [
  //         "Python",
  //         "Machine Learning",
  //         "AI",
  //         "AWS",
  //         "TypeScript",
  //         "Next.js",
  //       ],
  //       views: 1250,
  //       applicants: 45,
  //       matchScore: 85,
  //       isBookmarked: false,
  //       isLiked: false,
  //       isApplied: false,
  //       companyName: "Google LLC",
  //       companyLogoUrl:
  //         "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  //       Companydescription:
  //         "AmbiSpine Technologies Pvt. Ltd. delivers innovative digital solutions, specializing in web development, scalable applications, and modern technologies to help businesses grow efficiently and securely.",
  //       companySize: "Large (1000+ employees)",
  //       industry: "Technology",
  //       companyWebsite: "https://careers.google.com",
  //       companyEmail: "careers-india@google.com",
  //       companyPhone: "+91-80-67218000",
  //       description: "We are looking for a Senior Engineer to build high-scale E-commerce solutions using AI...",
  //       requirements: [
  //         "Bachelor's degree in Computer Science or related field",
  //         "3+ years of experience in software development",
  //         "Strong proficiency in JavaScript/TypeScript",
  //         "Experience with React and Node.js",
  //         "Knowledge of cloud platforms (AWS/GCP)",
  //         "Excellent problem-solving skills",
  //       ],
  //       benefits: [
  //         "Competitive salary and stock options",
  //         "Comprehensive health insurance",
  //         "Flexible work hours",
  //         "Learning and development budget",
  //         "Annual bonus and performance rewards",
  //         "Employee wellness programs",
  //       ],
  //     };

  //     setJob(mockJob);
  //     setIsBookmarked(mockJob.isBookmarked);
  //     setIsLiked(mockJob.isLiked);
  //   },
  //   // [params?.id],
  //   [jobId]
  // );

  const handleTakeAssessment = () => {
    setShowAssessment(true);
  };

  const handleAssessmentComplete = (score, passed) => {
    setAssessmentScore(score);
    setAssessmentPassed(passed);
    setShowAssessment(false);

    if (passed) {
      setShowApplicationForm(true);
    }
  };

  const handleApplyNow = () => {
    if (!assessmentPassed) {
      setShowAssessment(true);
    } else {
      setShowApplicationForm(true);
    }
  };

  const handleApplicationSubmit = () => {
    setShowApplicationForm(false);
    setJob((prev) => ({ ...prev, isApplied: true }));
  };

  // Apply button disable condition
  const isApplyDisabled = assessmentScore !== null && !assessmentPassed;

  if (loading || !job) {
    return <GlobalLoader />;
  }

  return (
    <div className="mt-16 bg-gray-50 text-gray-900">
      {/* Header Spacing */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-10">
        {/* 🔥 FIX 1: 'items-start' add kiya taaki sticky sidebar sahi kaam kare */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ================= MAIN CONTENT (Left Side) ================= */}
          {/* 🔥 FIX 2: Yahan se 'sticky top-24 self-start' HATA diya hai. Ab ye normal scroll karega. */}
          <div
            className="lg:col-span-2 space-y-6 bg-white border-[0.3px]  rounded-2xl
  rounded-bl-none
  rounded-br-none border-b-0 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto custom-scroll border-[#cccccc] overflow-hidden"
          >
            <div className="bg-[#fff] sticky top-0">
              <button
                onClick={() => window.history.back()}
                className="flex items-center  gap-2 px-6 py-3 hover:cursor-pointer  text-gray-600 hover:text-gray-900 font-medium transition-colors mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Jobs
              </button>
            </div>

            {/* Job Header Card */}
            <div className="w-full items-center justify-between bg-[#ffffff] p-6 mb-2">
              <div className="flex gap-6 mb-6">
                <div className="w-14 h-14 rounded-xl border border-gray-400 bg-white flex items-center justify-center">
                  {job.companyLogoUrl ? (
                    <img
                      src={job.companyLogoUrl}
                      alt={job.companyName}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Building2 className="w-7 h-7 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xl text-gray-700 font-semibold">
                        {job.company}
                      </p>
                      <h1 className="font-bold text-gray-900 mb-2">
                        {job.title}
                      </h1>

                      <div className="flex flex-wrap items-center gap-3 text-gray-600">
                        <span className="flex items-center gap-2  px-1 py-1.5 rounded-lg">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-2  px-1 py-1.5 rounded-lg">
                          <Clock className="w-4 h-4" />
                          {job.postedDate}
                        </span>
                        <span className="flex items-center gap-2  px-1 py-1.5 rounded-lg">
                          <Eye className="w-4 h-4" />
                          {job.views} views
                        </span>
                      </div>
                    </div>
              
                    <div className="relative">
  <div
    className={`
      border px-2 py-1 rounded-full text-sm font-semibold
      ${
        isPremiumUser
          ? " text-blue-600 px-2 py-1 rounded-full text-xs font-semibold"
          : "border-gray-300 text-blue-600 bg-blue-50 blur-[1px]"
      }
    `}
  >
    {job.matchScore}% ATS Match Score
  </div>


</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-1">
                    {job.isApplied && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Applied
                      </span>
                    )}
                    {assessmentPassed && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Assessment Passed
                      </span>
                    )}
                    {assessmentScore !== null && !assessmentPassed && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Assessment Failed ({assessmentScore}%)
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-5 ">
                    <button
                      onClick={handleApplyNow}
                      disabled={job.isApplied || isApplyDisabled}
                      className={`${
                        job.isApplied
                          ? "bg-gray-400 cursor-not-allowed"
                          : isApplyDisabled
                          ? "bg-red-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white px-3 py-1.5 hover:cursor-pointer text-sm rounded-full font-medium transition-colors flex items-center gap-1 leading-none h-9`}
                    >
                      {isApplyDisabled ? (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          Cannot Apply
                        </>
                      ) : assessmentPassed ? (
                        "Apply Now"
                      ) : (
                        "Take Assessment"
                      )}
                      {!isApplyDisabled && <ChevronRight className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={` transition-colors ${
                        isBookmarked
                          ? "bg-blue-50 border-blue-600"
                          : "border-gray-300 hover:border-blue-600"
                      }`}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${
                          isBookmarked
                            ? "fill-blue-600 text-blue-600"
                            : "text-gray-600"
                        }`}
                      />
                    </button>

                    <button className=" border-gray-300 hover:border-blue-600 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {isApplyDisabled && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-700">
                            You cannot apply for this position
                          </p>
                          <p className="text-sm text-red-600 mt-1">
                            Your assessment score ({assessmentScore}%) is below
                            the required 60%. You need to score at least 60% to
                            apply for this job.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 pt-4 border-t border-gray-200">
                {/* Salary */}
                <div className="">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mb-1">
                    <DollarSign className="w-4 h-4" />
                    Salary
                  </div>
                  <p className="font-bold text-gray-900">{job.salary}</p>
                </div>

                {/* Work Mode */}
                <div className="">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mb-1">
                    <Briefcase className="w-4 h-4" />
                    Work Mode
                  </div>
                  <p className="font-bold text-gray-900">{job.workMode}</p>
                </div>

                {/* Job Type */}
                <div className="">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mb-1">
                    <Clock className="w-4 h-4" />
                    Job Type
                  </div>
                  <p className="font-bold text-gray-900">{job.jobType}</p>
                </div>

                {/* Experience */}
                <div className="">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mb-1">
                    <GraduationCap className="w-4 h-4" />
                    Experience
                  </div>
                  <p className="font-bold text-gray-900">{job.experience}</p>
                </div>
              </div>
            </div>

            {/* Profile Match Section */}
            <div className="bg-white border-t border-[#cccccc] p-6 ">
         
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    How your profile and resume fit this job
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Get AI-powered advice on this job and more exclusive
                    features with Premium.
                  </p>
                </div>
                      <div className="flex flex-col items-center">
        <div className="relative w-14 h-14">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="#E5E7EB"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="#2563EB"
              strokeWidth="4"
              fill="none"
              strokeDasharray="150"
              strokeDashoffset="30"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">
            78%
          </span>
        </div>
        <span className="text-xs text-gray-500 mt-1">Match</span>
      </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button
                onClick={(e) => {
                e.stopPropagation(); // Prevent clicking the card itself if needed
                setShowMatchModal(true);
              }}
                 className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 font-medium text-xs hover:bg-blue-50 transition">
                  Show match details
                </button>
                <Link href="/create-resume/resume-building" className="px-4 py-2 rounded-full bg-blue-600 font-semibold text-white  text-xs hover:bg-blue-700 transition">
                  Tailor my resume
                </Link>
              </div>
            </div>

            {/* Job Description */}
            <div className="items-center justify-between bg-[#ffffff] border-t border-[#cccccc] p-6 ">
              {/* ... Description Content ... */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-gray-600" />
                </div>
                <h2 className=" font-bold text-gray-900">Job Description</h2>

                
              </div>
              <div>
                <div 
    className="text-gray-700 text-sm leading-relaxed rich-text-container"
    dangerouslySetInnerHTML={{ __html: job.description }} 
  />

       <div className="mt-4">
  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Responsibilities</h3>
  <div 
    className="text-gray-700 text-sm leading-relaxed responsibilities-content"
    dangerouslySetInnerHTML={{ __html: job.responsibilities }} 
  />
</div>
              </div>

              <div className="space-y-6">
               

                <div>
                </div>
              </div>
            </div>

            {/* Skills Required */}
            <div className="items-center justify-between bg-[#ffffff] border-t border-[#cccccc] p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-gray-600" />
                </div>
                <h2 className=" font-bold text-gray-900">Skills Required</h2>
              </div>
          

              <div className="flex flex-wrap gap-3">
  {job.skills.map((skill, idx) => (
    <Link
      key={idx}
      // Encode the skill to handle spaces or special characters (e.g., C++)
      href={`/jobs?query=${encodeURIComponent(skill)}`} 
      className="text-blue-700 px-3 py-1 text-xs font-semibold border border-gray-400 rounded-full hover:bg-blue-50 transition-colors"
    >
      {skill}
    </Link>
  ))}
</div>
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="lg:col-span-1">
            {/* 🔥 FIX 3: Ye 'sticky top-24' sidebar ko fix karega */}
            <div className=" sticky top-24 h-[calc(100vh-120px)] overflow-y-auto custom-scroll space-y-6">
              {/* About Company */}
              <div className="w-full bg-white border-[0.3px] border-[#cccccc] rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl border border-gray-400 bg-white flex items-center justify-center">
                    {job.companyLogoUrl ? (
                      <img
                        src={job.companyLogoUrl}
                        alt={job.companyName}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <Building2 className="w-7 h-7 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className=" font-bold text-gray-900">
                      {job.companyName}
                    </h3>
                    <p className="text-xs text-gray-600">{job.industry}</p>
                  </div>
                </div>
                {/* <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {job.Companydescription}
                </p> */}

                {/* Info Grid */}
                <div className="space-y-3 mb-6">
                  {/* ... company info ... */}
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Company Size</p>
                      <p className="font-semibold text-gray-800">
                        {job.companySize}
                      </p>
                    </div>
                  </div>
                  {/* ... other info ... */}
                </div>

                <div className="text-center flex justify-center">
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
                  >
                    <Globe className="w-4 h-4" />
                    Visit Website
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="w-full bg-white border-[0.3px] border-[#cccccc] rounded-2xl p-5">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900">
                    Application Stats
                  </h3>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className=" rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Total Views</span>
                      <Eye className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {job.views}
                    </p>
                  </div>

                  <div className=" rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Applicants</span>
                      <Users className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {job.applicants}
                    </p>
                  </div>

                  <div className=" rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Posted</span>
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {job.postedDate}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start gap-2 bg-yellow-50 px-3 py-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700">
                      High interest – apply soon.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Recruiter */}
              <div className="bg-white border-[0.3px] border-[#cccccc] rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Contact Recruiter
                </h3>
                <p className="text-gray-600 text-sm">
                  {" "}
                  Messages will be sent to recruiter email
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <a
                    href={`mailto:${job.companyEmail}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors p-3 rounded-lg hover:bg-blue-50"
                  >
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="font-medium">{job.companyEmail}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals ... */}
      {showAssessment && (
        <AssessmentPage
          job={job}
          onComplete={handleAssessmentComplete}
          onCancel={() => setShowAssessment(false)}
          isPremiumUser={isPremiumUser}
        />
      )}
      {showApplicationForm && (
        <ApplicationForm
          job={job}
          onClose={() => setShowApplicationForm(false)}
          onSubmitSuccess={handleApplicationSubmit}
        />
      )}
      {
   showMatchModal && (
        <JobMatchModal
        isOpen={showMatchModal} 
        onClose={() => setShowMatchModal(false)} 
        job={job}
        />
      )
      }
   
      
    </div>
  );
};

export default JobDetailsPage;





