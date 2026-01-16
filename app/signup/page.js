
"use client";
import React, { useState, useRef, useEffect } from "react";
import MuiInputField from "../components/common/MuiInputField";
import Image from "next/image";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import EmailVerification from "../components/common/EmailVerification";
import { InputField } from "../components/InputField";
import  Link  from "next/link";
import { setCurrentUser } from "@/app/store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const USERNAME_REGEX =
  /^(?![0-9._])(?!.*[_.]{2})[a-zA-Z0-9._]{3,20}(?<![_.])$/;

export default function Signup() {
  const router = useRouter();
const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  // username status: "" | "checking" | "available" | "taken"
  const [usernameStatus, setUsernameStatus] = useState("");
  const typingTimeoutRef = useRef(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  // mock list of taken usernames (frontend-only)
  // const MOCK_TAKEN = ["anjali", "testuser", "spreadnext", "philo"];

  useEffect(() => {
    // cleanup timer on unmount
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));

    // Reset email verification if email changes
    if (name === "email" && emailVerified) {
      setEmailVerified(false);
    }

    // only run username check on the username field; debounce it
    if (name === "userName") {
  const usernameTrimmed = value.trim();

  if (!usernameTrimmed) {
    setUsernameStatus("");
    return;
  }

    if (!USERNAME_REGEX.test(usernameTrimmed)) {
    setUsernameStatus("invalid");
    return;
  }


  setUsernameStatus("checking");

  if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

  typingTimeoutRef.current = setTimeout(async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/user/check/${usernameTrimmed}`
      );
      const data = await res.json();

      setUsernameStatus(data.available ? "available" : "taken");
    } catch (error) {
      setUsernameStatus("");
    }
  }, 600);
}

  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      mobileNo,
      userName,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !mobileNo ||
      !userName ||
      !email ||
      !password ||
      !confirmPassword
    )
      return toast.error("Please fill all fields");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Enter a valid email");

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    if (!agree) return toast.error("Please accept Terms & Conditions");

    // Optional: prevent signup if username is taken (frontend-only check)
    if (usernameStatus === "taken")
      return toast.error("Username is already taken. Please choose another.");

if (!USERNAME_REGEX.test(userName))
  return toast.error(
    "Username must be 3–20 characters, letters/numbers only, no spaces or special symbols"
  );
    return true;
  };

const handleSubmit = async () => {
  if (!validateForm()) return;

  if (!emailVerified) {
    toast.error("Please verify your email first by clicking the 'Verify' button");
    return;
  }

  setIsSubmitting(true);
  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, isEmailVerified: true }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      toast.error(data.message || "Registration failed. Please try again.");
      return;
    }

    // ✅ 1. Extract token & user
    const token = data.token;
    const user = data.user || data.data;

    if (!token || !user) {
      toast.error("Invalid signup response. Please try again.");
      return;
    }

    // ✅ 2. Save to localStorage
    localStorage.setItem("spreadnext_token", token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ 3. Save to Redux (MOST IMPORTANT)
    dispatch(
      setCurrentUser({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.userName,
        email: user.email,
        profileImage: user.profileImage,
      })
    );

    toast.success("Signup successful! Redirecting to onboarding... 🎉");

    // ✅ 4. Clear form
    setFormData({
      firstName: "",
      lastName: "",
      mobileNo: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setEmailVerified(false);

    // ✅ 5. Redirect once
    setTimeout(() => {
      router.replace("/signup/onboarding");
    }, 1200);

  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col px-12 lg:flex-row bg-white text-[#0a0a0a] m-auto mb-auto">
      {/* Left side */}
      <div className="w-full lg:w-1/2 justify-center px-4 sm:px-8 lg:px-12 py-25 ">
        <h2 className="text-[#1a2ad6] text-left text-lg font-extralight sm:text-4xl mb-6 font-jost">
          <span className="whitespace-nowrap">
            Sign up today, and start building your
          </span>
          <span className="block">Connectivity.</span>
        </h2>

        <Image
          src="/signupillustration.png"
          alt="Signup Illustration"
          width={360}
          height={360}
          className="object-contain mx-20 "
          priority
        />
      </div>

        <div className="flex-1 flex justify-center px-6 md:px-12 max-h-screen m-auto ">
        <div className="max-w-[420px] w-full">
          <h2 className="text-left text-md font-extralight sm:text-4xl mb-6 font-jost">
            Get Start With{" "}
            <span className="font-semibold text-[#000bd2]">Spreadnext</span>
          </h2>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <InputField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <InputField
              name="mobileNo"
              label="Mobile No."
              value={formData.mobileNo}
              onChange={handleChange}
            />

            {/* Username input */}
            <div className="w-full">
              <InputField
                name="userName"
                label="User Name"
                value={formData.userName}
                onChange={handleChange}
              />

              {/* Status messages */}
              {usernameStatus === "checking" && (
                <p className="text-gray-500 text-sm mt-1">
                  Checking availability...
                </p>
              )}
              {usernameStatus === "available" && (
                <p className="text-green-600 text-sm mt-1">
                  ✅ Username is available!
                </p>
              )}
              {usernameStatus === "taken" && (
                <p className="text-red-600 text-sm mt-1">
                  ❌ Username already taken.
                </p>
              )}
              {usernameStatus === "invalid" && (
  <p className="text-sm text-red-500">
    Username can contain letters, numbers, dot & underscore only
  </p>
)}

            </div>

            {/* Email Verification - spans full width */}
            <div className="col-span-1 sm:col-span-2">
              <EmailVerification
                formData={formData}
                handleChange={handleChange}
                onVerificationChange={setEmailVerified}
              />
            </div>

            {/* Password */}
            <div className="col-span-1 sm:col-span-2 relative">
              <InputField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} />
                )}
              </button>
            </div>

            <div className="col-span-1 sm:col-span-2 relative">
              <InputField
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirm ? (
                  <FaRegEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start mt-3">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mt-1 mr-2 accent-[#000ACE]"
            />
            <label htmlFor="agree" className="text-xs mb-2 text-gray-700">

              People who use our service may have uploaded your contact information to <Link href='/#' className="text-[#000ACE] hover:underline">Spreadnext.</Link> <Link href='/#' className="text-[#000ACE] hover:underline">Learnmore.</Link>
              By tapping Submit, you agree to create an account and to <Link href='/#' className="text-[#000ACE] hover:underline">Spreadnext's Terms,  Privacy Policy and Cookies policy. </Link>
              The  describes the ways we can use the information we collect when you create an account. For example, we use this information to provide, personalize and improve our products, <Link href='/#' className="text-[#000ACE] hover:underline">including ads.</Link>
            </label>
          </div>

          {/* Buttons */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#0031F5] text-white font-semibold py-2 hover:cursor-pointer rounded-full hover:bg-[#0E5CB8] transition-all "
          >

            Signup
          </button>

          <button
            onClick={() => router.push("/signin")}
            className="block w-full text-center border border-[#0031F5] rounded-full py-2 mt-3 text-[#0031F5] font-medium hover:bg-[#0031F5]/10"
          >
            Already Have An Account? Signin
          </button>
        </div>
      </div>


    </div>
  );
}
