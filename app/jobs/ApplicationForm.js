import React, { useState, useEffect } from "react";
import {
  X,
  User,
  BriefcaseIcon,
  FileText,
  Upload,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Edit2,
  Linkedin,
  Link as LinkIcon
} from "lucide-react";
import { Avatar } from "../components/common/Avatar";
import { useSelector } from "react-redux";
import { Buttonborder } from "../components/Button";
import { Button2 } from "../components/button/Button2";

const ApplicationForm = ({ job, onClose, onSubmitSuccess }) => {
  // 1. STATE MANAGEMENT
  const [currentStep, setCurrentStep] = useState(1); // Tracks 1, 2, or 3
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const currentUser = useSelector((state) => state.users?.currentUser);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    experience: "3-5",
    currentCtc: "₹12 LPA",
    expectedCtc: "₹18 LPA",
    noticePeriod: "30days",
    coverLetter: "",
    resume: null,
  });

  const [formErrors, setFormErrors] = useState({});
useEffect(() => {
  if (!currentUser) return;

  setFormData((prev) => ({
    ...prev,
    fullName: currentUser.name || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    linkedin: currentUser.socialLinks?.linkedin || "",
    portfolio:
      currentUser.socialLinks?.website ||
      currentUser.socialLinks?.github ||
      "",
    experience: currentUser.experiences?.length
      ? "1-3"
      : "",
  }));
}, [currentUser]);
  // 2. HANDLERS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
      if (formErrors.resume) setFormErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  // 3. STEP-BY-STEP VALIDATION
  const validateStep1 = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    
    // Professional validations
    if (!formData.experience) errors.experience = "Experience is required";
    if (!formData.currentCtc.trim()) errors.currentCtc = "Current CTC is required";
    if (!formData.expectedCtc.trim()) errors.expectedCtc = "Expected CTC is required";
    if (!formData.noticePeriod) errors.noticePeriod = "Notice period is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!formData.resume) errors.resume = "Resume is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 4. NAVIGATION LOGIC
  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmitSuccess && onSubmitSuccess();
    }, 1500);
  };

  // --- UI COMPONENTS ---

  // Success Message
  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted! 🎉</h2>
          <p className="text-gray-600 mb-6">
            Your application for <span className="font-semibold">{job?.title}</span> has been successfully sent.
          </p>
          <button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
            Close
          </button>
        </div>
      </div>
    );
  }

  // Helper for Input Fields to reduce code repetition
  const InputField = ({ label, name, type = "text", placeholder, error }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className={`w-full px-4 py-2.5 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#0000007a]  z-50 overflow-y-auto flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        
        {/* HEADER & PROGRESS BAR */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Apply to {job?.company || "Company"}</h2>
              <p className="text-sm text-gray-500">{job?.title || "Job Title"}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar Visual */}
        <div className="relative pt-1 mb-6">
  <div className="flex mb-2 items-center justify-between">
    <div>
      <span className="text-xs font-semibold inline-block text-blue-600">
        {/* Calculates percentage: Step 1=33%, Step 2=66%, Step 3=100% */}
        {Math.round((currentStep / 3) * 100)}% Complete
      </span>
    </div>
  </div>
  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
    <div 
      style={{ width: `${(currentStep / 3) * 100}%` }} 
      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500 ease-in-out"
    ></div>
  </div>
</div>
        </div>
        {/* BODY - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: BASICS & PROFESSIONAL */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="flex items-center gap-3 pb-4 border-b border-[#cccccc]">
    <Avatar
      src={currentUser?.avatar}
      className="!w-16 !h-16"
    />

    <div className="flex-1 mt-3">
      <h3 className="text-base font-semibold text-gray-900">
        {currentUser?.name || "Rupendra Vishwakarma"}
      </h3>
       <p className="text-sm text-gray-500">
        {currentUser?.headline || "Software Engineer | MERN Stack | AI Enthusiast Software Engineer | MERN Stack | AI Enthusiast"}
      </p>
     
       <p className="text-sm text-gray-500">
        {currentUser?.location || "satna (M.P), India"}
      </p>
    </div>
  </div>
  


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Full Name *" name="fullName" placeholder="John Doe" error={formErrors.fullName} />
                  <InputField label="Email Address *" name="email" type="email" placeholder="john@example.com" error={formErrors.email} />
                  <InputField label="Phone Number *" name="phone" type="tel" placeholder="+91 9876543210" error={formErrors.phone} />
                  <InputField label="LinkedIn Profile" name="linkedin" placeholder="linkedin.com/in/..." />
                  
                  {/* Dropdowns need custom handling, can't use InputField helper easily */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Experience *</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 border ${formErrors.experience ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`}
                    >
                      <option value="">Select</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-8">5-8 years</option>
                      <option value="8+">8+ years</option>
                    </select>
                    {formErrors.experience && <p className="text-red-500 text-xs mt-1">{formErrors.experience}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Notice Period *</label>
                    <select
                      name="noticePeriod"
                      value={formData.noticePeriod}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 border ${formErrors.noticePeriod ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`}
                    >
                      <option value="">Select</option>
                      <option value="immediate">Immediate</option>
                      <option value="15days">15 days</option>
                      <option value="30days">30 days</option>
                      <option value="60days">60 days</option>
                      <option value="90days">90 days</option>
                    </select>
                    {formErrors.noticePeriod && <p className="text-red-500 text-xs mt-1">{formErrors.noticePeriod}</p>}
                  </div>

                  <InputField label="Current CTC *" name="currentCtc" placeholder="₹12 LPA" error={formErrors.currentCtc} />
                  <InputField label="Expected CTC *" name="expectedCtc" placeholder="₹18 LPA" error={formErrors.expectedCtc} />
                </div>
              </div>
            )}

            {/* STEP 2: RESUME & DOCUMENTS */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-[#cccccc] pb-2">
                  <FileText className="w-5 h-5" /> Resume & Cover Letter
                </h3>

                {/* Resume Upload Area */}
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume *</label>
                   <label className={`flex flex-col items-center justify-center w-full h-32 border-2 ${formErrors.resume ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-blue-500 bg-gray-50 hover:bg-blue-50"} border-dashed rounded-lg cursor-pointer transition-all`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className={`w-8 h-8 mb-2 ${formErrors.resume ? "text-red-500" : "text-gray-400"}`} />
                          <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                      </div>
                      <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                   </label>
                   {formErrors.resume && <p className="text-red-500 text-xs mt-1">{formErrors.resume}</p>}
                   
                   {/* File Preview if selected */}
                   {formData.resume && (
                     <div className="mt-3 flex items-center p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm text-blue-800 font-medium truncate flex-1">{formData.resume.name}</span>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                     </div>
                   )}
                </div>

            
              </div>
            )}
            

            {/* STEP 3: PREVIEW (LinkedIn Style) */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                    <div> <Avatar
      src={currentUser?.avatar}
      className="!w-16 !h-16"
    /></div>
                    <div>
                        <h4 className="font-semibold text-blue-900 text-base mt-4">Review your application</h4>
                        <p className="text-sm text-blue-700 mt-1">The employer will also receive a copy of your public profile.</p>
                    </div>
                </div>

                {/* Section: Contact Info */}
                <div className="border rounded-2xl p-4  border-[#cccccc] transition-colors group">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-900">Contact Info</h4>
                        <button type="button" onClick={() => setCurrentStep(1)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors">
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                        <div>
                            <p className="text-gray-500 text-xs">Full Name</p>
                            <p className="font-medium text-gray-900">{formData.fullName}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs">Email</p>
                            <p className="font-medium text-gray-900">{formData.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs">Phone</p>
                            <p className="font-medium text-gray-900">{formData.phone}</p>
                        </div>
                        <div className="md:col-span-2">
                             <p className="text-gray-500 text-xs mb-1">Links</p>
                             <div className="flex gap-3">
                                {formData.linkedin && <a href={formData.linkedin} className="flex items-center gap-1 text-blue-600 hover:underline"><Linkedin className="w-3 h-3"/> LinkedIn</a>}
                                {formData.portfolio && <a href={formData.portfolio} className="flex items-center gap-1 text-blue-600 hover:underline"><LinkIcon className="w-3 h-3"/> Portfolio</a>}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Section: Resume */}
                <div className="border border-[#cccccc] rounded-xl p-4  transition-colors group">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-900">Resume</h4>
                        <button type="button" onClick={() => setCurrentStep(2)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors">
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center text-red-600 font-bold text-xs">PDF</div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 truncate">{formData.resume?.name}</p>
                            <p className="text-xs text-gray-500">Ready to submit</p>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-between items-center">
            {currentStep > 1 ? (
                    <Button2 
                      onClick={handleBack}
                    name="back" />
          //       <button 
                  
          //           className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
          //       >
          //           <ChevronLeft className="w-5 h-5" /> Back
          //       </button>
            ) : (
                <div></div> // Spacer to keep Next button on right
            )}

            {currentStep < 3 ? (
                <Buttonborder 
                name=" Next "
                    onClick={handleNext}
                    // className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-semibold shadow-lg shadow-blue-600/20 transition-all transform hover:scale-105"
                />
                    // <ChevronRight className="w-5 h-5" />
          //       </button>
            ) : (
                <Buttonborder 
                name= {isSubmitting ? "Submitting..." : "Submit Application"}
                    onClick={handleSubmit}
                     disabled={isSubmitting}

                    // className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-semibold shadow-lg shadow-blue-600/20 transition-all transform hover:scale-105"
                />
                // <button 
                //     onClick={handleSubmit}
                //     disabled={isSubmitting}
                //     className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-2.5 rounded-lg font-semibold shadow-lg shadow-green-600/20 transition-all flex items-center gap-2"
                // >
                //     {isSubmitting ? "Submitting..." : "Submit Application"}
                // </button>
            )}
        </div>

      </div>
    </div>
  );
};

export default ApplicationForm;