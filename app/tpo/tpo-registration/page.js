'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { FormInputField } from "../../components/common/FormField/FormInputField";

import { Buttonborder } from "../../components/Button";
import Modal from '@/app/components/Modal';
import { validatePhone, validateRequired } from '@/app/utils/validation';


export default function Tpo() {
  const router = useRouter();
  const [showVerifyModal, setShowVerifyModal] = useState(false);

// STEP TRACKING: 'email' or 'mobile'
  const [verificationStep, setVerificationStep] = useState('email'); 
  const [otpData, setOtpData] = useState({ emailOtp: '', mobileOtp: '' });


  const [formData, setFormData] = useState({
    name: '', 
    tpoEmail: '',
    tpoMobile: '',
    tpoName: '',
    contactPersonName: '',

  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };



const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    if (!formData.name.trim()) { newErrors.name = "College Name is required."; isValid = false; }
    if (!formData.tpoName.trim()) { newErrors.tpoName = "TPO Name is required."; isValid = false; }
    
    if (!formData.tpoEmail.trim()) { 
        newErrors.tpoEmail = "TPO Email is required."; 
        isValid = false; 
    } else if (!formData.tpoEmail.toLowerCase().startsWith("tpo@")) {
        newErrors.tpoEmail = "Official Email must start with 'tpo@'";
        isValid = false;
    }
      if (!validateRequired(formData.tpoMobile)) {
    newErrors.tpoMobile = "Contact number is required";
  } else if (!validatePhone(formData.tpoMobile)) {
    newErrors.tpoMobile = "Enter a valid phone number";
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
    if (verificationStep === 'email') {
      if (!otpData.emailOtp) return alert("Please enter Email OTP");
      setVerificationStep('mobile'); // Move to mobile step
    } else {
      if (!otpData.mobileOtp) return alert("Please enter Mobile OTP");
      handleFinalVerify();
    }
  };


  const handleFinalVerify = () => {
    const tpoid = "tpoid_" + Date.now();
    // Save current data temporarily
    localStorage.setItem("tpoid", JSON.stringify(formData));
    setVerificationStep('success');
    // Redirect to the new Questions/Onboarding page
    // router.push(`/tpo/tpo-registration/onboarding-details?id=${tpoid}`);
  };


  return (
    <div className=" mt-16 h-[calc(100vh-64px)] font-sans px-4 pt-10 text-gray-900 ">
      <div className="max-w-2xl mx-auto">
        
         <div className=" p-6  inset-0 bg-opacity-50 bg-[#fff] border-[0.3px] border-[#cccccc]
 overflow-hidden rounded-2xl">
              
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">TPO Register For Your Institute</h1>
                <p className="text-sm text-gray-500 mt-1">Join thousands of top colleges hiring the best faculty.</p>
              </div>

          <div className='space-y-3'>
       <FormInputField
                name="name" 
                placeholder="college/university name*"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                touched={!!errors.name} // Pass true if error exists
              />
                  <FormInputField
                name="tpoName" 
                placeholder="TPO Name*"
                value={formData.tpoName}
                onChange={handleChange}
                error={errors.tpoName}
                touched={!!errors.tpoName} // Pass true if error exists
              />
          </div>
         

                  <div className="space-y-3 mt-3">
                      <FormInputField name="tpoEmail" type="email" placeholder="TPO mail id *" value={formData.tpoEmail} onChange={handleChange} error={errors.tpoEmail}
                    touched={!!errors.tpoEmail} />
                      <FormInputField name="tpoMobile" type="tel" placeholder="TPO Phone Number *" value={formData.tpoMobile} onChange={handleChange} error={errors.tpoMobile}
                      touched={!!errors.tpoMobile} />
                  </div>

         
            
              <div className="flex justify-end pt-4">
              <Buttonborder 
                    onClick={handleSubmit} 
                    name="Next: Verification" 
                    classNameborder="!bg-[#0a66c2] !text-white px-8 py-2 rounded-full" 
                />
              </div>

            </div>
      </div>


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
      
           
            </div>
          ) : (
            /* --- OTP VERIFICATION FLOW --- */
            <>
              <div className="text-center mb-6">
                <p className="text-gray-600 font-medium text-left text-sm mt-1">
                  {verificationStep === 'email' 
                    ? `We've sent a code to your email: ${formData.hrEmail}` 
                    : `Now enter the code sent to your mobile: ${formData.tpoMobile}`}
                </p>
              </div>
      
              {verificationStep === 'email' ? (
                <FormInputField
                  label="Email OTP"
                  placeholder="Enter 4-digit code"
                  value={otpData.emailOtp}
                  onChange={(e) => setOtpData({...otpData, emailOtp: e.target.value})}
                />
              ) : (
                <FormInputField
                  label="Mobile OTP"
                  placeholder="Enter 4-digit code"
                  value={otpData.mobileOtp}
                  onChange={(e) => setOtpData({...otpData, mobileOtp: e.target.value})}
                />
              )}
      
              <div className="mt-8 flex gap-3">
                {verificationStep === 'mobile' && (
                  <button 
                    className="flex-1 py-2 hover:cursor-pointer text-sm border border-gray-300 rounded-full text-gray-600 font-semibold transition-colors hover:bg-gray-50" 
                    onClick={() => setVerificationStep('email')}
                  >
                    Back to Email
                  </button>
                )}
                <button 
                  className="flex-1 py-2 bg-[#0013E3] text-white hover:cursor-pointer rounded-full text-sm font-semibold hover:bg-blue-800 transition-all" 
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