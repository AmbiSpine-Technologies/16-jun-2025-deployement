"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "../../../utils/jobsApi";
import { toast } from "react-toastify";
// Import Steps
import BasicJobInfoStep from "./BasicJobInfoStep";
import JobDescriptionStep from "./JobDescriptionStep";
import CandidateRequirementStep from "./CandidateRequirementStep";
import CompanyDetailsStep from "./CompanyDetailsStep"; // New
import ScreeningQuestionsStep from "./ScreeningQuestionsStep"; // New

// Import Validation Logic
import { 
    validateBasicStep, 
    validateDescriptionStep, 
    validateCandidateStep, 
    validateCompanyStep 
} from "./Validation"; // Check path

const STEPS = [
  { id: "basic", title: "Basic Information", subtitle: "Job title, location, and type" },
  { id: "description", title: "Job Description", subtitle: "Role summary, key responsibilities, required skills & benefits" },
  { id: "candidate", title: "Candidate Requirements", subtitle: "Experience & education" },
  { id: "company", title: "Company Details", subtitle: "About your company & branding" },
  { id: "jobpreview", title: "Preview", subtitle: "Review all details before publishing." },
];

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // 1. Basic
    jobTitle: "",
    location: "",
    employmentType: "",
    availability: "", 
    
    // 2. Description
    jobSummary: "",
    responsibilities: "",
    skills: [],
    industry: "",

    // 3. Candidate
    experience: "",
    education: "",
    specialization: "",
    minSalary: "",  // <-- New Field
    maxSalary: "",

    // 4. Company (New)
    companyName: "",
    website: "",
    companyEmail: "",
    companyProfile: "",
    applyEmail: "",
    applyLink: "",

    // 5. Screening (New)
    screeningQuestions: []
  });

  const handleEdit = () => {
    setStep(0); // Step 0 = Basic Info
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };


  const handleNext = () => {
    let isValid = false;

    switch (step) {
        case 0:
            isValid = validateBasicStep(formData, setErrors);
            break;
        case 1:
            isValid = validateDescriptionStep(formData, setErrors);
            break;
        case 2:
            isValid = validateCandidateStep(formData, setErrors);
            break;
        case 3:
            isValid = validateCompanyStep(formData, setErrors);
            break;
        case 4:
            // Screening usually doesn't block, but you can add logic if needed
            isValid = true; 
            break;
        default:
            isValid = true;
    }

    if (isValid) {
      setErrors({});
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("spreadnext_token");
      // Transform formData to match backend job model
      const jobData = {
        title: formData.jobTitle,
        company: formData.companyName || "Your Company",
        location: formData.location,
        workMode: formData.availability === "Remote" ? "Remote" : formData.availability === "Hybrid" ? "Hybrid" : "On-site",
        jobType: formData.employmentType || "Full-time",
        salary: formData.minSalary && formData.maxSalary 
          ? `₹${formData.minSalary}L - ₹${formData.maxSalary}L`
          : formData.minSalary 
          ? `₹${formData.minSalary}L+`
          : "Not specified",
        experience: formData.experience || "0",
        education: formData.education || "Any",
        skills: Array.isArray(formData.skills) ? formData.skills : [],
        description: formData.jobSummary || "",
        responsibilities: formData.responsibilities 
          ? (typeof formData.responsibilities === 'string' 
              ? formData.responsibilities.split('\n').filter(r => r.trim()) 
              : Array.isArray(formData.responsibilities) 
              ? formData.responsibilities 
              : [])
          : [],
        requirements: formData.specialization 
          ? [formData.specialization, ...(formData.skills || []).map(s => `${s} required`)]
          : [],
        benefits: [], // Can be added later
        industry: formData.industry || "Technology",
        companySize: "Mid-size", // Default, can be made dynamic
      };

      const result = await createJob(jobData);
      if (result.success) {
        toast.success("Job posted successfully!");
        router.push("/company/hiring-talent");
      } else {
        toast.error(result.message || "Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl  mt-20 bg-white border border-gray-200 mx-auto p-8 shadow-lg rounded-2xl">
      
      {/* Step Header */}
      <div className="mb-8 border-b pb-4">
        <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{STEPS[step].title}</h1>
            <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                Step {step + 1} of {STEPS.length}
            </span>
        </div>
        <p className="text-gray-500 text-sm">{STEPS[step].subtitle}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5 mt-4 rounded-full overflow-hidden">
            <div 
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            ></div>
        </div>
      </div>

      {/* Render Steps */}
      <div className="min-h-[400px]">
        {step === 0 && <BasicJobInfoStep data={formData} onChange={updateField} errors={errors} />}
        {step === 1 && <JobDescriptionStep data={formData} onChange={updateField} errors={errors} />}
        {step === 2 && <CandidateRequirementStep data={formData} onChange={updateField} errors={errors} />}
        {step === 3 && <CompanyDetailsStep data={formData} onChange={updateField} errors={errors} />}
        {step === 4 && <ScreeningQuestionsStep 
        data={formData} onChange={updateField} 
        onEdit={handleEdit}
     
        />}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between  pt-6 border-t border-gray-100">
        <button
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
          className={`px-6 py-2.5 rounded-full font-medium hover:cursor-pointer transition-all
            ${step === 0 
              ? "opacity-0 cursor-default" 
              : "text-gray-600 hover:bg-gray-100 border border-gray-300"}`}
        >
          ← Back
        </button>

        {step === STEPS.length - 1 ? (
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-2.5 bg-blue-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"
            }`}
          >
            {isSubmitting ? "Publishing..." : "Published Job Post"}
          </button>
        ) : (
          <button 
            onClick={handleNext} 
            className="px-8 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg shadow-blue-200 font-semibold transition-all flex items-center gap-2 transform hover:cursor-pointer hover:scale-105"
          >
            Next Step →
          </button>
        )}
      </div>
    </div>
  );
}