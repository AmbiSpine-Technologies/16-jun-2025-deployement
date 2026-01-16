"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { InputField } from "../InputField";
import { X } from 'lucide-react'
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function EmailVerification({
  formData,
  handleChange,
  onVerificationChange,
}) {
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSendOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first");
      return;
    }

    // Validate email format

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOtpSent(true);
        setEnteredOtp(""); // Clear previous OTP when resending
        // If modal is already open (resend case), keep it open; otherwise open it
        if (!showModal) {
          setShowModal(true);
        }
        toast.success("OTP sent successfully to your email!");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!enteredOtp) {
      toast.error("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp: enteredOtp }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEmailVerified(true);
        // Notify parent component that email is verified
        if (onVerificationChange) {
          onVerificationChange(true);
        }
        // toast.success("Email verified successfully ✅");
        setShowModal(false);
        setEnteredOtp("");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      // console.error("Error verifying OTP:", error);
      // toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-1 sm:col-span-2 relative">
      {/* Your same input field stays intact */}
      <InputField
        name="email"
        label="Email Id"
        value={formData.email}
        onChange={handleChange}
        error={formData.error}
      />

{!emailVerified && emailRegex.test(formData.email) && (
  <button
    type="button"
    onClick={handleSendOtp}
    disabled={loading}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0038FF] text-sm font-semibold hover:underline "
  >
    {loading ? "Sending..." : otpSent ? "Resend OTP" : "Verify"}
  </button>
)}

      {emailVerified && (
        <p className="text-green-600 text-sm mt-1">✅ Email Verified</p>
      )}

      {/* OTP Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
          <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Security verification
            </h2>
            <X onClick={() => setShowModal(false) } className=" text-gray-500 text-[20px]" />
          </div>

            <p className="text-sm text-gray-700 mb-2 leading-relaxed">
              Enter the code that was sent to your Phone number. Please enter
              the verification code we gave you. It might take a few minutes to
              receive your code.
            </p>
            <p className="text-xs text-gray-500 mb-6">
              last digit ##{formData.email?.slice(-4) || "****"}
            </p>

            <div className="mb-4">
              <InputField
                type="text"
                label="Enter Code"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                maxLength={6}
                // className="w-full px-4 py-3 text-lg border-2 border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-center"
                autoFocus
              />
            </div>

            <div className="mb-6 flex items-center justify-start gap-2">
              <span className="text-sm text-gray-600">
                Didn't receive the code?
              </span>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer font-semibold  underline "
              >
                Resend Code
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleVerifyOtp}
                disabled={loading || !enteredOtp}
                className="bg-[#0031F5] text-white font-semibold py-2.5 hover:cursor-pointer px-8 rounded-full text-base hover:bg-[#0E5CB8] transition-all "
              >
                {loading ? "Verifying..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------------

// "use client";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import MuiInputField from "./MuiInputField";

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// export default function EmailVerification({
//   formData,
//   handleChange,
//   onVerificationChange,
// }) {
//   const [otpSent, setOtpSent] = useState(false);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [enteredOtp, setEnteredOtp] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSendOtp = async () => {
//     if (!formData.email) {
//       toast.error("Please enter your email first");
//       return;
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/user/send-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: formData.email }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setOtpSent(true);
//         setEnteredOtp(""); // Clear previous OTP when resending
//         // If modal is already open (resend case), keep it open; otherwise open it
//         if (!showModal) {
//           setShowModal(true);
//         }
//         toast.success("OTP sent successfully to your email!");
//       } else {
//         toast.error(data.message || "Failed to send OTP");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!enteredOtp) {
//       toast.error("Please enter the OTP");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/user/verify-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: formData.email, otp: enteredOtp }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setEmailVerified(true);
//         // Notify parent component that email is verified
//         if (onVerificationChange) {
//           onVerificationChange(true);
//         }
//         toast.success("Email verified successfully ✅");
//         setShowModal(false);
//         setEnteredOtp("");
//       } else {
//         toast.error(data.message || "Invalid OTP");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="col-span-1 sm:col-span-2 relative">
//       {/* Your same input field stays intact */}
//       <MuiInputField
//         name="email"
//         placeholder="Email Id"
//         value={formData.email}
//         onChange={handleChange}
//       />

//       {!emailVerified && (
//         <button
//           type="button"
//           onClick={handleSendOtp}
//           disabled={loading}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0038FF] text-sm font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? "Sending..." : otpSent ? "Resend OTP" : "Verify"}
//         </button>
//       )}

//       {emailVerified && (
//         <p className="text-green-600 text-sm mt-1">✅ Email Verified</p>
//       )}

//       {/* OTP Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-transparent bg-opacity-0 flex items-center justify-center z-50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-900">
//               Security verification
//             </h2>
//             <p className="text-sm text-gray-700 mb-2 leading-relaxed">
//               Enter the code that was sent to your Phone number. Please enter
//               the verification code we gave you. It might take a few minutes to
//               receive your code.
//             </p>
//             <p className="text-xs text-gray-500 mb-6">
//               last digit ##{formData.email?.slice(-4) || "****"}
//             </p>

//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Enter Code"
//                 value={enteredOtp}
//                 onChange={(e) => setEnteredOtp(e.target.value)}
//                 maxLength={6}
//                 className="w-full px-4 py-3 text-lg border-2 border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-center"
//                 autoFocus
//               />
//             </div>

//             <div className="mb-6 flex items-center justify-start gap-2">
//               <span className="text-sm text-gray-600">
//                 Didn't receive the code?
//               </span>
//               <button
//                 type="button"
//                 onClick={handleSendOtp}
//                 disabled={loading}
//                 className="text-sm text-blue-600 hover:text-blue-800 font-semibold underline disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Resend Code
//               </button>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={handleVerifyOtp}
//                 disabled={loading || !enteredOtp}
//                 className="bg-[#0031F5] text-white font-semibold py-2.5 px-8 rounded-xl text-base hover:bg-[#0E5CB8] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Verifying..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
