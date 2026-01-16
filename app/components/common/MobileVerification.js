"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import MuiInputField from "./MuiInputField";

export default function MobileVerification({
  formData,
  handleChange,
  children,
}) {
  const [otpSent, setOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [generatedOtp] = useState("123456"); // mock OTP
  const [showModal, setShowModal] = useState(false);

  const handleSendOtp = () => {
    if (!formData.mobileNo) {
      toast.error("Please enter your mobile number first");
      return;
    }
    setOtpSent(true);
    setShowModal(true);
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      setMobileVerified(true);
      toast.success("Mobile verified successfully ✅");
      setShowModal(false);
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="relative">
      {/* 👇 renders your existing input */}
      {children}

      {!mobileVerified && (
        <button
          type="button"
          onClick={handleSendOtp}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0038FF] text-sm font-semibold hover:underline"
        >
          {otpSent ? "Resend OTP" : "Verify"}
        </button>
      )}

      {mobileVerified && (
        <p className="text-green-600 text-sm mt-1">✅ Mobile Verified</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Enter OTP</h2>
            <p className="text-sm text-gray-600 mb-4">
              We've sent a verification code to your mobile number.
            </p>

            <MuiInputField
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              className="mt-4 bg-[#0038FF] text-white px-4 py-2 rounded-full text-sm hover:bg-[#0026b5] w-full"
            >
              Submit
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-gray-500 text-sm hover:underline block text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
