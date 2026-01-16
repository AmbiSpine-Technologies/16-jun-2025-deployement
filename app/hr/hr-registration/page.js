'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, MapPin, Globe } from 'lucide-react';
import { FormInputField } from "../../components/common/FormField/FormInputField";
import FormDropdownFormField from "../../components/common/FormField/FormDropdownFormField";
import TextAreaField from "../../components/TextAreaField";
import { Buttonborder } from "../../components/Button";
import Modal from '@/app/components/Modal';
import { validatePhone, validateRequired } from '@/app/utils/validation';


export default function hrpage() {
  const router = useRouter();
  const [showVerifyModal, setShowVerifyModal] = useState(false);

// STEP TRACKING: 'email' or 'mobile'
  const [verificationStep, setVerificationStep] = useState('email'); 
  const [otpData, setOtpData] = useState({ emailOtp: '', mobileOtp: '' });


  const [formData, setFormData] = useState({
    name: '',
    
    hrEmail: '',
    tpoMobile: '',
    hrName: '',
    contactPersonName: '', 
  });

  const [errors, setErrors] = useState({});
const [otpErrors, setOtpErrors] = useState({ emailOtp: '', mobileOtp: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    if (!formData.name.trim()) { newErrors.name = "Company Name is required."; isValid = false; }
    if (!formData.hrName.trim()) { newErrors.hrName = "HR Name is required."; isValid = false; }
    
    if (!formData.hrEmail.trim()) { 
        newErrors.hrEmail = "HR Email is required."; 
        isValid = false; 
    } else if (!formData.hrEmail.toLowerCase().startsWith("hr@")) {
        newErrors.hrEmail = "HR Email must start with 'hr@'";
        isValid = false;
    }
      if (!validateRequired(formData.tpoMobile)) {
    newErrors.tpoMobile = "HR Contact number is required";
    isValid = false;
  } else if (!validatePhone(formData.tpoMobile)) {
    newErrors.tpoMobile = "Enter a valid phone number";
    isValid = false;
  }

    setErrors(newErrors);
    return isValid;
  };

const handleSubmit = () => {
    if (validateForm()) {
      setVerificationStep('email'); // Reset to first step
      setShowVerifyModal(true);
    }
  };

  // HANDLES THE TRANSITION FROM EMAIL -> MOBILE -> FINISH
 const handleNextStep = () => {
  // Reset errors before checking
  setOtpErrors({ emailOtp: '', mobileOtp: '' });

  if (verificationStep === 'email') {
    if (!otpData.emailOtp) {
      setOtpErrors(prev => ({ ...prev, emailOtp: "Email OTP is required" }));
      return;
    }
    if (otpData.emailOtp.length < 4) {
      setOtpErrors(prev => ({ ...prev, emailOtp: "Enter a valid 4-digit code" }));
      return;
    }
    setVerificationStep('mobile');
  } 
  else if (verificationStep === 'mobile') {
    if (!otpData.mobileOtp) {
      setOtpErrors(prev => ({ ...prev, mobileOtp: "Mobile OTP is required" }));
      return;
    }
    if (otpData.mobileOtp.length < 4) {
      setOtpErrors(prev => ({ ...prev, mobileOtp: "Enter a valid 4-digit code" }));
      return;
    }
    // Success State trigger karein
    setVerificationStep('success');
  }
};


  // const handleFinalVerify = () => {
  //   const hr_registration = "hr_" + Date.now();

  //     localStorage.setItem(hr_registration, JSON.stringify(formData));
    
  //   // Redirect to the new Questions/Onboarding page

  //   router.push(`/hr/hr-registration/onboarding-details?id=${hr_registration}`);

  // };

  const handleFinalVerify = () => {
  // Logic to save data
  const hr_registration = "hr_" + Date.now();
  localStorage.setItem(hr_registration, JSON.stringify(formData));

  // Step ko 'success' par set karein bajaye turant redirect karne ke
  setVerificationStep('success');
}

  return (
    <div className=" h-[calc(100vh-64px)] mt-10 font-sans px-4 py-16 text-gray-900 ">
      <div className="max-w-2xl mx-auto">
    <div className=" p-6   inset-0 lg:relative bg-[#fff] border-[0.3px]
  border-[#cccccc]
  overflow-hidden
  rounded-2xl
 ">
              
        
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">HR Registration For  Company</h1>
              <p className="text-sm text-gray-500 mt-1">
    Register as an HR to manage hiring, post jobs, and connect with top talent.
  </p>
              </div>

          <div className='space-y-3'>
      <FormInputField
                name="name" 
                placeholder="Company name*"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                touched={!!errors.name} // Pass true if error exists
              />
                  <FormInputField
                name="hrName" 
                placeholder="HR Full Name*"
                value={formData.hrName}
                onChange={handleChange}
                error={errors.hrName}
                touched={!!errors.hrName} // Pass true if error exists
              />


             
                      <FormInputField name="hrEmail" type="email" placeholder="HR mail id *" value={formData.hrEmail} onChange={handleChange} error={errors.hrEmail}
                    touched={!!errors.hrEmail} />
                      <FormInputField name="tpoMobile" type="tel" placeholder="HR Mobile Number *" value={formData.tpoMobile} onChange={handleChange} error={errors.tpoMobile}
                      touched={!!errors.tpoMobile} />
                  


           

              <div className="flex justify-end pt-4">
              <Buttonborder 
                    onClick={handleSubmit} 
                    name="Next: Verification" 
                    classNameborder="!bg-[#0a66c2] !text-white px-8 py-2 rounded-full" 
                />
              </div>
          </div>
          

            </div>

      </div>

     {/* --- TWO-STEP VERIFICATION MODAL --- */}
{/* --- TWO-STEP VERIFICATION MODAL --- */}
<Modal
  show={showVerifyModal}
  onClose={() => setShowVerifyModal(false)}
  // Title dynamic rakha hai: Success par title hide ho jayega modern look ke liye
  title={verificationStep === 'success' ? "" : (verificationStep === 'email' ? "Email Verification" : "Mobile Verification")}
  bodycenter='!mt-0 !items-center'
  widthClass="lg:!w-[500px]"
>
  <div className="pb-6 px-2">
    {verificationStep === 'success' ? (
      /* --- MODERN SUCCESS VIEW --- */
      <div className="flex flex-col items-center text-center py-8 animate-in fade-in zoom-in duration-300">
        {/* Modern Verified Badge Icon with Pulse Effect */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-100 rounded-full scale-150 animate-ping opacity-20"></div>
          <div className="relative bg-[#0013E3] p-5 rounded-full shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Verified!</h2>
        <p className="text-gray-500 max-w-[300px] mb-8">
          Your  profile has been verified successfully. You can now proceed to complete your onboarding.
        </p>

        {/* Action Button - Default style applied */}
        {/* <button 
          onClick={handleFinalVerify}
          className="rounded-full h-11 px-8 font-semibold bg-[#0013E3] text-white hover:bg-blue-800 transition-all shadow-md active:scale-95 w-full md:w-auto"
        >
          Go to Dashboard
        </button> */}
      </div>
    ) : (
      /* --- OTP VERIFICATION FLOW --- */
    <>
        <div className="text-center mb-6">
          <p className="text-gray-600 font-medium text-left text-sm mt-1">
            {verificationStep === 'email' 
              ? `Code sent to: ${formData.hrEmail}` 
              : `Code sent to: ${formData.tpoMobile}`}
          </p>
        </div>

        {verificationStep === 'email' ? (
          <FormInputField
            label="Email OTP"
            placeholder="Enter 4-digit code"
            value={otpData.emailOtp}
            onChange={(e) => {
              setOtpData({...otpData, emailOtp: e.target.value});
              if(otpErrors.emailOtp) setOtpErrors({...otpErrors, emailOtp: ''}); // Clear error on type
            }}
            error={otpErrors.emailOtp}
            touched={!!otpErrors.emailOtp}
          />
        ) : (
          <FormInputField
            label="Mobile OTP"
            placeholder="Enter 4-digit code"
            value={otpData.mobileOtp}
            onChange={(e) => {
              setOtpData({...otpData, mobileOtp: e.target.value});
              if(otpErrors.mobileOtp) setOtpErrors({...otpErrors, mobileOtp: ''}); // Clear error on type
            }}
            error={otpErrors.mobileOtp}
            touched={!!otpErrors.mobileOtp}
          />
        )}

        <div className="mt-8 flex gap-3">
          {verificationStep === 'mobile' && (
            <button 
              className="flex-1 py-2 text-sm border border-gray-300 rounded-full text-gray-600 font-semibold transition-colors hover:bg-gray-50" 
              onClick={() => {
                setVerificationStep('email');
                setOtpErrors({ emailOtp: '', mobileOtp: '' }); // Clear errors when going back
              }}
            >
              Back
            </button>
          )}
          <button 
            className="flex-1 py-2 bg-[#0013E3] text-white rounded-full text-sm font-semibold hover:bg-blue-800 transition-all" 
            onClick={handleNextStep}
          >
            {verificationStep === 'email' ? "Verify Email" : "Verify Mobile & Finish"}
          </button>
        </div>
      </>
    )}
  </div>
</Modal>
    </div>
  );
}