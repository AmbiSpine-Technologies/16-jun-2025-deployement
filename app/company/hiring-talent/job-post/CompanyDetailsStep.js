
"use client";
import TextAreaField from "../../../components/TextAreaField";
import { Globe, Mail, Building2 } from "lucide-react";
import FormDropdownFormField from '../../../components/common/FormField/FormDropdownFormField';
import { FormInputField } from '../../../components/common/FormField/FormInputField';

const RECRUITER_COMPANIES = [
  {
    id: "1",
    name: "Google",
    website: "https://careers.google.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg", // Demo Logo URL
    email: "contact@google.com",
    profile: "Google organizes the world's information and makes it universally accessible and useful."
  },
  {
    id: "2",
    name: "Microsoft",
    website: "https://careers.microsoft.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", // Demo Logo URL
    email: "contact@microsoft.com",
    profile: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge."
  },
  {
    id: "3",
    name: "Tech Solutions Inc.",
    website: "https://techsolutions.io",
    logo: "", // No logo example
    email: "hr@techsolutions.io",
    profile: "A leading provider of innovative tech solutions for startups and enterprises."
  }
];

export default function CompanyDetailsStep({
  data,
  onChange,
  errors = {},
}) {

  // ✅ 1. Options ko sahi format me convert kiya (Label/Value)
  const companyOptions = RECRUITER_COMPANIES.map(c => ({
    label: c.name,
    value: c.name
  }));

  // ✅ 2. Selected Company ka Logo dhundo
  const selectedCompanyObj = RECRUITER_COMPANIES.find(c => c.name === data.companyName);
  const currentLogo = selectedCompanyObj?.logo;

  // ✅ Company Switch Logic (Updated for Event Object)
  const handleCompanyChange = (e) => {
    const selectedCompanyName = e.target.value; // Dropdown sends event object
    
    const selectedCompany = RECRUITER_COMPANIES.find(c => c.name === selectedCompanyName);

    if (selectedCompany) {
      onChange("companyName", selectedCompany.name);
      onChange("website", selectedCompany.website);
      onChange("companyEmail", selectedCompany.email);
      onChange("companyProfile", selectedCompany.profile);
    } else {
      onChange("companyName", selectedCompanyName);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Info */}
      <div className="border-gray-300 border rounded-lg p-4 mb-4 bg-gray-50">
      <h3 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
  <Building2 size={16} />
  Select Company Profile
</h3>

<p className="text-xs text-blue-600 mt-1">
  Once selected, company information will be auto-filled from verified records.
</p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ✅ 1. Company Name Selector with Logo inside */}
        <div className="relative z-20">
            <div className="relative w-full">
                <FormDropdownFormField
                    placeholder="Select your Company..."
                    value={data.companyName}
                    name="companyName" // Name pass karna zaroori hai event handling ke liye
                    onChange={handleCompanyChange}
                    options={companyOptions} // ✅ Correct options format passed
                />
                
                {/* ✅ LOGO POSITIONING: Right side, left of the arrow */}
                {currentLogo && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                        <img 
                            src={currentLogo} 
                            alt="logo" 
                            className="w-6 h-6 object-contain rounded-full border border-gray-200 bg-white"
                        />
                    </div>
                )}
            </div>
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
        </div>

        {/* ✅ 2. Website (Read-Only) */}
        <div className="relative">
            <FormInputField
                value={data.website}
                onChange={() => {}} 
                disabled={true} 
                placeholder="Website URL"
                className="!text-gray-500 border-gray-200 cursor-not-allowed"
                customBorder={false}
            >
                <Globe size={18} className="text-gray-400" />
            </FormInputField>
        </div>
      </div>

      {/* ✅ 3. Official Email (Read-Only) */}
      <div className="relative">
        <FormInputField
          value={data.companyEmail}
          onChange={() => {}}
          placeholder="Official Email (Verified)"
          disabled={true}
          className="!text-gray-500 border-gray-200 cursor-not-allowed"
        >
            <Mail size={18} className="text-gray-400" />
        </FormInputField>
      </div>

      {/* ✅ 4. Company Profile (Read-Only) */}
      <div className="relative opacity-75">
        <TextAreaField
            label="About Company"
            value={data.companyProfile}
            onChange={() => {}}
            rows={4}
            disabled={true} 
        />
        <div className="absolute inset-0 bg-gray-50/30 cursor-not-allowed z-10 rounded-lg" />
      </div>

      <hr className="border-gray-200 my-4" />

      {/* ✅ 5. Receive Email (Editable) */}
      <div className="bg-white">
        <p className="text-sm font-semibold text-gray-700 mb-3">Recruitment Settings</p>
        <FormInputField
            type="email"
            placeholder="Receive Resumes on Email e.g. hiring.manager@company.com"
            value={data.applyEmail}
            onChange={(e) => onChange("applyEmail", e.target.value)}
            error={errors.applyEmail}
        >
            <Mail size={18} className="text-blue-500" />
        </FormInputField>

        <p className="text-xs text-gray-400 mt-2 ml-1">
            * This email can be different for every job post.
        </p>
      </div>

    </div>
  );
}