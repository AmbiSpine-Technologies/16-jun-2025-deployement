'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormInputField } from "@/app/components/common/FormField/FormInputField";
import FormDropdownFormField from "@/app/components/common/FormField/FormDropdownFormField";
import { Buttonborder } from "@/app/components/Button";
// import MultiSkillInput from '@/app/recruterpanel/comapnyverify/MultiSkillInput'; // Unused
import { Upload, FileText } from "lucide-react";
import TextAreaField from '@/app/components/TextAreaField';
import {
  validatePhone, validateRequired, validateUrl,
} from '../../utils/validation';
import { createCompany } from '@/app/utils/companyApi';
import { toast } from 'react-toastify';
import { GlobalLoader } from "@/app/components/Loader";

const ORG_SIZE_OPTIONS = [
  { label: "0-1 employees", value: "0-1" },
  { label: "2-10 employees", value: "2-10" },
  { label: "11-50 employees", value: "11-50" },
  { label: "51-200 employees", value: "51-200" },
  { label: "201-500 employees", value: "201-500" },
  { label: "501-1000 employees", value: "501-1000" },
];

const ORG_TYPE_OPTIONS = [
  { label: "Public Company", value: "public" },
  { label: "Self-Employed", value: "self-employed" },
  { label: "Government Agency", value: "gov" },
  { label: "Non Profit", value: "non-profit" },
  { label: "Privately Held", value: "private" },
  { label: "Partnership", value: "partnership" },
];

function CreateCompanyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
 

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [onboardingData, setOnboardingData] = useState({
    // data from previous
    name: '',
    email: '',
    website: '',
    industry: '',
    orgType: '',
    orgSize: '',
    location: '', // Fixed typo from companLocation
    tagline: '',
    contactPersonName: '',
    contactNumber: '',
    altEmail: '',            
  logoFile: null,   
  logoPreview: null, // New field for the UI        // ✅ PREVIEW ONLY
  verificationDoc: null,   // ✅ FILE
    isAuthorized: false,
  });

const handleLogoUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setOnboardingData(prev => ({
    ...prev,
    logoFile: file,                      // Actual file for FormData
    logoPreview: URL.createObjectURL(file), // String for <img> src
  }));
};



  // Get Company/College ID

  // Generic Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOnboardingData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // Checkbox Handler
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setOnboardingData((prev) => ({ ...prev, isAuthorized: isChecked }));
    setErrors((prev) => ({ ...prev, isAuthorized: null }));
  };



  // ✅ FIXED: Dropdown Handler
  const handleDropdownChange = (name, value) => {
    setOnboardingData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    setErrors(prev => ({ ...prev, verificationDoc: "Invalid file type" }));
    return;
  }

  setOnboardingData(prev => ({
    ...prev,
    verificationDoc: file, // store FILE
  }));
};


  // Validation & Submit
  const handleComplete = async () => {
    const newErrors = {};


    if (!onboardingData.name.trim()) { newErrors.name = "Company Name is required."; }
    if (!onboardingData.email.trim()) { newErrors.email = "Company email is required.";  }
    // 1. Website
    if (!validateRequired(onboardingData.website)) {
      newErrors.website = "Website URL is required";
    } else {
      const urlError = validateUrl(onboardingData.website);
      if (urlError) newErrors.website = urlError;
    }

    // 2. Basic Info
    if (!onboardingData.industry) newErrors.industry = 'Industry/Institute type is required';
    if (!onboardingData.location.trim()) newErrors.location = 'Company Location is required';
    if (!onboardingData.orgSize) newErrors.orgSize = 'Organization size is required';
    if (!onboardingData.orgType) newErrors.orgType = 'Organization type is required';
    if (!onboardingData.tagline) newErrors.tagline = 'About Company is required';

    // 3. Contact Info
    if (!onboardingData.contactPersonName.trim()) newErrors.contactPersonName = 'Contact person is required';

    if (!validateRequired(onboardingData.contactNumber)) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!validatePhone(onboardingData.contactNumber)) {
      newErrors.contactNumber = "Enter a valid phone number";
    }

    if (!onboardingData.altEmail.trim()) {
      newErrors.altEmail = 'Official Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(onboardingData.altEmail)) {
      newErrors.altEmail = 'Invalid email format';
    }

    // 4. Docs & Auth
    if (!onboardingData.verificationDoc) newErrors.verificationDoc = 'Document is required';
    if (!onboardingData.isAuthorized) newErrors.isAuthorized = 'You must authorize to proceed';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
    
      const companyData = {
        name: onboardingData.name,
        email: onboardingData.email,
        website: onboardingData.website,
        industry: onboardingData.industry,
        orgType: onboardingData.orgType,
        orgSize: onboardingData.orgSize,
        location: onboardingData.location,
        tagline: onboardingData.tagline,
        description: onboardingData.tagline, // Using tagline as description for now
        contactPersonName: onboardingData.contactPersonName,
        contactNumber: onboardingData.contactNumber,
        altEmail: onboardingData.altEmail,

      };


      Object.entries(companyData).forEach(([key, value]) => {
      formData.append(key, value);
});


// Append files
if (onboardingData.logoFile) {
  formData.append("logo", onboardingData.logoFile);
}
if (onboardingData.verificationDoc) {
  formData.append("verificationDoc", onboardingData.verificationDoc);
}

      // const result = await createCompany(companyData);
     const result = await createCompany(formData);
    
      if (result.success) {
        toast.success(result.message || 'Company created successfully!');
        router.push(`/company/${result.data._id}`);
      } else {
        toast.error(result.message || 'Failed to create company');
        // Handle specific errors
        if (result.message?.includes('email')) {
          setErrors(prev => ({ ...prev, email: result.message }));
        }
      }
    } catch (error) {
      console.error('Error creating company:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16  pt-10 px-4">
      <div className='max-w-7xl mx-auto px-6 md:px-10 lg:px-20'>
      <div className="flex flex-col lg:flex-row gap-10">

       <div className=" sticky top-3 inset-0 bg-[#ffffff] lg:relative   border-[0.3px]
  border-[#cccccc]
  border-b-0
  overflow-hidden
  rounded-2xl
  rounded-bl-none
  rounded-br-none ">

        {/* Scrollable Container */}
        <div className="h-[calc(100vh-140px)] overflow-y-auto custom-scroll p-8">

          <h2 className="text-2xl font-bold text-gray-800">Company Details</h2>
          <p className="text-gray-500 mb-8 text-sm">
            Provide accurate information about your company to build trust and attract the right candidates.
          </p>

          {/* 1. Company Details */}
          <div className="space-y-4">
              <FormInputField
                name="name" 
                placeholder="Company name*"
                value={onboardingData.name}
                onChange={handleChange}
                error={errors.name}
                touched={!!errors.name} // Pass true if error exists
              />
             <FormInputField
                name="email" 
                placeholder="Company email*"
                value={onboardingData.email}
                onChange={handleChange}
                error={errors.email}
                touched={!!errors.email} // Pass true if error exists
              />
            <FormInputField
              name="website"
              placeholder="Url*"
              value={onboardingData.website}
              onChange={handleChange}
              error={errors.website}
              touched={!!errors.website}
            />

            <FormInputField
              name="industry"
              placeholder="Industry*"
              value={onboardingData.industry}
              onChange={handleChange}
              error={errors.industry}
              touched={!!errors.industry}
            />

            <FormInputField
              name="location"
              placeholder="Office Location*"
              value={onboardingData.location}
              onChange={handleChange}
              error={errors.location}
              touched={!!errors.location}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
            <FormDropdownFormField
  name="orgSize"
  placeholder="Organization size *"
  value={onboardingData.orgSize}
  options={ORG_SIZE_OPTIONS}
  onChange={(e) => handleDropdownChange('orgSize', e.target.value)}
  error={errors.orgSize}
/>
                {errors.orgSize && <p className="text-red-500 text-xs mt-1">{errors.orgSize}</p>}
              </div>
              <div>
<FormDropdownFormField
  name="orgType"
  value={onboardingData.orgType}
  options={ORG_TYPE_OPTIONS}
  placeholder="Organization type *"
  onChange={(e) => handleDropdownChange('orgType', e.target.value)}
  error={errors.orgType}
/>
                {errors.orgType && <p className="text-red-500 text-xs mt-1">{errors.orgType}</p>}
              </div>
            </div>




          </div>

          {/* 2. About Section */}
          <div className="mt-6">
            <TextAreaField
              name="tagline"
              label="About Company *"
              placeholder="Tell us about your Company... *"
              rows={3}
              value={onboardingData.tagline}
              onChange={(e) => {
                const val = e.target ? e.target.value : e;
                setOnboardingData(prev => ({ ...prev, tagline: val }));
                setErrors(prev => ({ ...prev, tagline: null }));
              }}
              maxLength={2000}
            />
            {errors.tagline && <p className="text-red-500 text-xs px-1">{errors.tagline}</p>}
          </div>

          {/* 3. Contact Details */}
          <div className="space-y-4 mt-6">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Alternative Details</h3>
            
            <FormInputField
              name="contactPersonName"
              placeholder="Alternative Name *"
              value={onboardingData.contactPersonName}
              onChange={handleChange}
              error={errors.contactPersonName}
              touched={!!errors.contactPersonName}
            />
            
            <FormInputField
              name="contactNumber"
              placeholder="Alternative Contact Number *"
              value={onboardingData.contactNumber}
              onChange={handleChange}
              error={errors.contactNumber}
              touched={!!errors.contactNumber} // Fixed: was pointing to contactPersonName
            />
            
            <FormInputField
              name="altEmail"
              placeholder="Alternative Official Email *"
              type="email"
              value={onboardingData.altEmail}
              onChange={handleChange}
              error={errors.altEmail}
              touched={!!errors.altEmail} // Fixed: was pointing to contactPersonName
            />
          </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Comapny Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="text-[#0a66c2] font-semibold">Upload Logo</div>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>

          {/* 5. Document Upload */}
          <div className={`mt-8 p-6 border-2 border-dashed rounded-xl transition-colors ${errors.verificationDoc ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
            <label className="block text-sm font-bold text-gray-700 mb-1">Company Verification Document *</label>
            <p className="text-xs text-gray-500 mb-4">Upload GST Certificate (PDF/JPG).</p>

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

                    <span className="text-sm font-medium text-gray-800">
  {onboardingData.verificationDoc.name}
</span>
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

          {/* Authorization Checkbox */}
          <div className="mt-6">
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isAuthorized"
                  checked={onboardingData.isAuthorized}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-4 h-4 text-[#0a66c2] border-gray-300 rounded focus:ring-[#0a66c2]"
                />
                <span className="text-sm text-gray-600">
                  I verify that I am an authorized representative of this organization.
                </span>
              </label>
              <a href="#" className="text-[#0a66c2] font-semibold text-sm mt-2 inline-block hover:underline ml-7">
                Read the Pages Terms
              </a>
              {errors.isAuthorized && <p className="text-red-500 text-xs ml-7 mt-1">{errors.isAuthorized}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex justify-end pb-4">
            <Buttonborder
              onClick={handleComplete}
              name={submitting ? "Creating..." : "Create Company Page"}
              classNameborder={`!bg-[#0a66c2] !text-white px-10 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={submitting}
            />
          </div>

        </div>
      </div>

               
  
      <div className="hidden lg:block sticky top-24 h-fit w-[350px]">
            <div className="flex items-center gap-1 mb-2 text-gray-600 font-semibold text-sm">
              <span>Page preview</span>
            </div>

            <div className="p-4 border-[0.3px] border-[#cccccc] rounded-2xl bg-white shadow-sm">
              <div className="h-24 bg-[#DDDDDD] rounded-t-lg"></div>
              <div className="px-4 relative">
                <div className="-mt-8 mb-3 w-16 h-16 bg-white shadow-md rounded-md flex items-center justify-center overflow-hidden border">
                  {onboardingData.logoPreview ? (
                    <img src={onboardingData.logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200"></div>
                  )}
                </div>

                <h2 className="text-lg font-bold text-gray-900">
                  {onboardingData.name || "Company Name"}
                </h2>
                <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                  {onboardingData.tagline || "Your company tagline will appear here..."}
                </p>
                <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold">
                  {onboardingData.industry || "Industry Type"}
                </p>
                
                <Buttonborder name="Follow" classNameborder="mt-4 w-full  text-sm" />
              </div>
            </div>
          </div>

      </div>

      </div>

     
    </div>
  );
}

export default function CreateCompanyPage() {
  return (
    <Suspense fallback={<div><GlobalLoader /></div>}>
      <CreateCompanyPageContent />
    </Suspense>
  );
}