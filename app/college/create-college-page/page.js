'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormInputField } from "@/app/components/common/FormField/FormInputField";
import FormDropdownFormField from "@/app/components/common/FormField/FormDropdownFormField";
import { Buttonborder } from "@/app/components/Button";
import { Upload, FileText } from "lucide-react";
import TextAreaField from '@/app/components/TextAreaField';
import {
  validatePhone, validateRequired, validateUrl, validateEmail,
} from '../../utils/validation';
import MultiSkillInput from '@/app/company/hiring-talent/job-post/MultiSkillInput';
// import { c } from 'framer-motion/dist/types.d-Cjd591yU';
import { createCollege } from '@/app/utils/collegeApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addCreatedPage } from '@/app/store/slice/collegeSlice'
// --- OPTIONS ---
const COURSE_OPTIONS = ["B.Tech / B.E", "M.Tech", "MCA", "BCA", "Diploma"];

const SKILL_LEVELS = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

const placementcell = [
  { label: "Placement Support", value: "Placement Support" },
  { label: "Internship Programs", value: "Internship Programs" },
];

const COLLEGE_TYPES = [
  { label: "Private University", value: "Private University" },
  { label: "Public University", value: "Public University" },
  { label: "Institute", value: "Institute" },
  { label: "College", value: "College" },
  // { label: "Affiliated College", value: "affiliated" },
];

const ESTABLISHED_YEARS = Array.from({ length: 100 }, (_, i) => ({
  label: `${2024 - i}`, value: `${2024 - i}`
}));

export const STUDENT_RANGE = [
  { label: "Less than 500 students", value: "0-500" },
  { label: "500 - 1,000 students", value: "500-1000" },
  { label: "1,000 - 5,000 students", value: "1000-5000" },
  { label: "5,000 - 10,000 students", value: "5000-10000" },
  { label: "10,000+ students", value: "10000+" },
];

export default function Page() {
  const router = useRouter();
  const [collegeId, setCollegeId] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
 const dispatch = useDispatch();
 
  const [onboardingData, setOnboardingData] = useState({
    name: '',
    logo: null,
    email: "",
    // Form fields for Page 2
    studentRange: '',
    affiliatedUniversity: '',
    website: '',
    city: '',
    type: '',
    established: '',
    tagline: '',
    contactPersonName: '',
    contactNumber: '',
    altEmail: '',
    selectedCourses: [],
    avgSkillLevel: '',
    trainingMode: '', // This is the "Objective"
    verificationDoc: null,
  });


  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setOnboardingData((prev) => ({ ...prev, logo: reader.result }));
      // }; 
      // reader.readAsDataURL(file);
      setOnboardingData(prev => ({
    ...prev,
    logo: file,                      // Actual file for FormData
  }));
    }

  };

  // ✅ FIXED: Generic Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOnboardingData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // ✅ FIXED: Dropdown Handler
  const handleDropdownChange = (name, value) => {
    setOnboardingData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // ✅ FIXED: Course Multi-Select Handler
  const handleCoursesChange = (selectedCourses) => {
    setOnboardingData((prev) => ({ ...prev, selectedCourses }));
    setErrors((prev) => ({ ...prev, selectedCourses: null }));
  };

  // ✅ File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, verificationDoc: 'Only PDF, JPG, PNG allowed' }));
      return;
    }

    setUploading(true);
    setTimeout(() => {
       setOnboardingData(prev => ({
    ...prev,
    verificationDoc: file   // ✅ File object
  }));
      setErrors((prev) => ({ ...prev, verificationDoc: null }));
      setUploading(false);
    }, 1500);
  };

  // ✅ Validation & Submit
  const handleComplete = async () => {

    const newErrors = {};
    if (!onboardingData.name.trim()) newErrors.name = 'College/University is required';
    if (!onboardingData.affiliatedUniversity.trim()) newErrors.affiliatedUniversity = 'University is required';
    if (!onboardingData.studentRange) {
      newErrors.studentRange = "Please select total student strength";
    }
    if (!onboardingData.city.trim()) newErrors.city = 'City is required';
    if (!onboardingData.type) newErrors.type = 'Institute type is required';
    if (!onboardingData.tagline) newErrors.tagline = 'About College  is required';
    if (!onboardingData.contactPersonName.trim()) newErrors.contactPersonName = 'Contact person is required';
    
     if (!validateRequired(onboardingData.email)) {
      newErrors.email = "email  is required";
    } else if (!validateEmail(onboardingData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!validateRequired(onboardingData.contactNumber)) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!validatePhone(onboardingData.contactNumber)) {
      newErrors.contactNumber = "Enter a valid phone number";
    }

    // 🔹 Website validation (REQUIRED + FORMAT)
    if (!validateRequired(onboardingData.website)) {
      newErrors.website = "Website URL is required";
    } else {
      const urlError = validateUrl(onboardingData.website);
      if (urlError) newErrors.website = urlError;
    }

    if (!onboardingData.altEmail.trim()) {
      newErrors.altEmail = 'Official Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(onboardingData.altEmail)) {
      newErrors.altEmail = 'Invalid email format';
    }

    if (!onboardingData.selectedCourses.length) newErrors.selectedCourses = 'Select at least one course';
    if (!onboardingData.avgSkillLevel) newErrors.avgSkillLevel = 'Select skill level';
    if (!onboardingData.trainingMode) newErrors.trainingMode = 'Select objective';
    if (!onboardingData.verificationDoc) newErrors.verificationDoc = 'Document is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

 setSubmitting(true);
     try {
      const formData = new FormData();
       Object.entries(onboardingData).forEach(([key, value]) => {
      formData.append(key, value);
});

// if (onboardingData.logo) {
//   formData.append("logo", onboardingData.logo);
// }

// if (onboardingData.verificationDoc) {
//   formData.append("verificationDoc", onboardingData.verificationDoc);
// }
       const result = await createCollege(formData);

        if (result.success) {
               toast.success(result.message || 'College page created successfully!');
               dispatch(addCreatedPage(result.data));
               router.push(`/college/${result.data._id}`);
             } else {
               toast.error(result.message || 'Failed to create College page');
               // Handle specific errors
               if (result.message?.includes('email')) {
                 setErrors(prev => ({ ...prev, email: result.message }));
               }
             }
     }  catch (error) {
           console.error('Error creating college:', error);
           toast.error('Something went wrong. Please try again.');
         } finally {
           setSubmitting(false);
         }

  };

  return (
    <div className="mt-16 pt-10 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row gap-10">
          <div className='w-full lg:max-w-[65%]  '>
            <div className="  sticky top-3 inset-0 bg-[#fff]  lg:relative  border-[0.3px]
  border-[#cccccc]
  border-b-0
  overflow-hidden
  rounded-2xl
  rounded-bl-none
  rounded-br-none ">
              <div className="h-[calc(100vh-140px)] overflow-y-auto custom-scroll p-8">

                <h2 className="text-2xl font-bold text-gray-800">Academic & Training Details</h2>
                <p className="text-gray-500 mb-8 text-sm">Help us understand your students better for better placements.</p>

                {/* 1. University & Details */}
                <div className="space-y-4">
                  <FormInputField
                    name="name"
                    placeholder="college/university name*"
                    value={onboardingData.name}
                    onChange={handleChange}
                    error={errors.name}
                    touched={!!errors.name} // Pass true if error exists
                  />
                     <FormInputField
                    name="email"
                    placeholder="College email name*"
                    value={onboardingData.email}
                    onChange={handleChange}
                    error={errors.email}
                    touched={!!errors.email} // Pass true if error exists
                  />
                  <FormInputField
                    name="affiliatedUniversity"
                    placeholder="Affiliated University *"
                    value={onboardingData.affiliatedUniversity}
                    onChange={handleChange}
                    error={errors.affiliatedUniversity}
                    touched={!!errors.affiliatedUniversity}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInputField
                      name="website"
                      placeholder="Official Website"
                      value={onboardingData.website}
                      onChange={handleChange}
                      error={errors.website}
                      touched={!!errors.website}
                    />
                    <FormInputField
                      name="city"
                      placeholder="City (e.g. Mumbai) *"
                      value={onboardingData.city}
                      onChange={handleChange}
                      error={errors.city}
                      touched={!!errors.city}
                    />
                  </div>
                  <div className="flex flex-col">
                    <FormDropdownFormField
                      placeholder="Total Student Strength"
                      options={STUDENT_RANGE}
                      value={onboardingData.studentRange}
                      onChange={(e) => handleDropdownChange('studentRange', e.target.value)}
                    />
                    {errors.studentRange && (
                      <p className="text-red-500 text-xs mt-1 px-1">
                        {errors.studentRange}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <FormDropdownFormField
                        placeholder="College Type *"
                        options={COLLEGE_TYPES}
                        value={onboardingData.type}
                        // FIX: Correct name passed here
                        onChange={(e) => handleDropdownChange('type', e.target.value)}
                      />
                      {errors.type && <p className="text-red-500 text-xs mt-1 px-1">{errors.type}</p>}
                    </div>
                    <div>
                      <FormDropdownFormField
                        placeholder="Year Established"
                        options={ESTABLISHED_YEARS}
                        value={onboardingData.established}
                        // FIX: Correct name passed here
                        onChange={(e) => handleDropdownChange('established', e.target.value)}
                      />
                      {errors.established && <p className="text-red-500 text-xs mt-1 px-1">{errors.established}</p>}

                    </div>

                  </div>
                </div>

                {/* 2. About Section */}
                <div className="mt-6">

                  <TextAreaField
                    name="tagline"
                    label="About College"
                    placeholder="Tell us about your college..."
                    rows={3}
                    value={onboardingData.tagline}
                    onChange={(e) => {
                      const val = e.target ? e.target.value : e;
                      setOnboardingData(prev => ({ ...prev, tagline: val }));

                      // ✅ Ye line add karein error hatane ke liye
                      if (errors.tagline) {
                        setErrors(prev => ({ ...prev, tagline: null }));
                      }
                    }}
                    maxLength={2000}
                  />
                  {errors.tagline && <p className="text-red-500 text-xs  px-1">{errors.tagline}</p>}

                </div>

                {/* 3. Contact Details */}
                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Alternative of Contact</h3>
                  <FormInputField
                    name="contactPersonName" // ✅ ADDED NAME PROP
                    placeholder="Alternative Contact Person Name *"
                    value={onboardingData.contactPersonName}
                    onChange={handleChange}
                    error={errors.contactPersonName}
                    touched={!!errors.contactPersonName}
                  />
                  <FormInputField
                    name="contactNumber" // ✅ ADDED NAME PROP
                    placeholder="Alternative Contact Person Number *"
                    value={onboardingData.contactNumber}
                    onChange={handleChange}
                    error={errors.contactNumber}
                    touched={!!errors.contactPersonName}
                  />
                  <FormInputField
                    name="altEmail" // ✅ ADDED NAME PROP
                    placeholder="Official Alternative Email *"
                    type="email"
                    value={onboardingData.altEmail}
                    onChange={handleChange}
                    error={errors.altEmail}
                    touched={!!errors.contactPersonName}
                  />
                </div>

                {/* 4. Academic Info */}
                <div className="mt-8 space-y-3">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Training & Placements</h3>

                  {/* Multi Select */}
                  <div>
                    <MultiSkillInput
                      label="Target Courses / Branches *"
                      value={onboardingData.selectedCourses}
                      onChange={handleCoursesChange}
                      options={COURSE_OPTIONS}
                      placeholder="Search & add courses"
                    />
                    {errors.selectedCourses && <p className="text-red-500 text-xs mt-1">{errors.selectedCourses}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormDropdownFormField
                        placeholder="Average Skill Level *"
                        options={SKILL_LEVELS}
                        value={onboardingData.avgSkillLevel}
                        // FIX: Passing 'avgSkillLevel'
                        onChange={(e) => handleDropdownChange('avgSkillLevel', e.target.value)}
                      />
                      {errors.avgSkillLevel && <p className="text-red-500 text-xs mt-1">{errors.avgSkillLevel}</p>}
                    </div>

                    <div>
                      <FormDropdownFormField
                        placeholder="Primary Objective *"
                        options={placementcell}
                        value={onboardingData.trainingMode}
                        // FIX: Passing 'trainingMode'
                        onChange={(e) => handleDropdownChange('trainingMode', e.target.value)}
                      />
                      {errors.trainingMode && <p className="text-red-500 text-xs mt-1">{errors.trainingMode}</p>}
                    </div>
                  </div>
                </div>
                <div className='mt-3'>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Institute Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="text-[#0a66c2] font-semibold">Upload Logo</div>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>


                {/* 5. Document Upload */}
                <div className={`mt-8 p-6 border-2 border-dashed rounded-xl transition-colors ${errors.verificationDoc ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Institutional Verification Document *</label>
                  <p className="text-xs text-gray-500 mb-4">Upload AISHE Certificate or AICTE Approval (PDF/JPG).</p>

                  <div className="flex items-center justify-center w-full">
                    {!onboardingData.verificationDoc ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className={`w-8 h-8 mb-2 ${errors.verificationDoc ? 'text-red-400' : 'text-gray-400'}`} />
                          <p className="text-sm text-gray-500 font-medium">{uploading ? "Uploading..." : "Click to upload document"}</p>
                        </div>
                        <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.png,.jpg" />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between w-full p-4 bg-white border border-green-200 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <FileText className="text-green-600" />
                          <span className="text-sm font-medium text-gray-800">{onboardingData.verificationDoc.name}</span>
                        </div>
                        <button
                          onClick={() => setOnboardingData(prev => ({ ...prev, verificationDoc: null }))}
                          className="text-xs font-bold text-red-500 hover:text-red-700 underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  {errors.verificationDoc && <p className="text-red-500 text-xs mt-2 font-medium">{errors.verificationDoc}</p>}
                </div>

                {/* Submit Button */}
                <div className="mt-10 flex justify-end pb-4">
                  <Buttonborder
                    onClick={handleComplete}
                      name={submitting ? "Creating..." : "Create College Page"}
                  // classNameborder="!bg-[#0a66c2] !text-white px-10 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Container */}
          <div className="hidden lg:block sticky top-24 h-fit w-[350px]">
            <div className="flex items-center gap-1 mb-2 text-gray-600 font-semibold text-sm">
              <span>Page preview</span>
            </div>

            <div className="p-4 border-[0.3px] border-[#cccccc] rounded-2xl bg-white shadow-sm">
              {/* Header Banner */}
              <div className="h-24 bg-[#DDDDDD] rounded-t-lg"></div>

              <div className="px-4 relative">
                {/* Logo */}
                <div className="-mt-8 mb-3 w-16 h-16 bg-white shadow-md rounded-md flex items-center justify-center overflow-hidden border">
                  {onboardingData.logo ? (
                    <img 
                    // src={onboardingData.logo} 
                     src={URL.createObjectURL(onboardingData.logo)}
                    alt="College Logo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-400">Logo</div>
                  )}
                </div>

                {/* College Info */}
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {onboardingData.name || "College Name"}
                </h2>

                <p className="text-xs text-blue-600 font-medium mt-1">
                  {onboardingData.affiliatedUniversity ? `${onboardingData.affiliatedUniversity}` : "University Affiliation"}
                </p>

                <p className="text-xs text-gray-600 line-clamp-3 mt-2 ">
                  {onboardingData.tagline || "College description and about section will appear here..."}
                </p>

                <Buttonborder name="Follow" classNameborder="mt-4 w-full text-sm" />
              </div>
            </div>

            <p className="text-[10px] text-gray-400 mt-4 px-2">
              * This is a live preview of how your college profile will look to others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}