"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { InputField } from "../components/InputField";
import { useAuth } from "../context/auth-context";
import { toast } from "react-toastify";

export default function SignInForm({ onSuccess }) {
  const { login } = useAuth();  // auth 
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({

    email: "",
    password: "",
    rememberMe: false, 
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.auth);

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      default:
        return "";
    }
  };

  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate field if it's been touched
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  // Handle blur events
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    return !newErrors.email && !newErrors.password;
  };


  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok && data.success) {
        // Store in AuthContext (handles both AuthContext and standard format)
        login(data.token, data.user || data.data);

        // Show success message
        toast.success("Login successful!", { position: "top-right" });
        if (onSuccess) onSuccess();
        // Redirect to feeds page
        setTimeout(() => {
          router.push("/jobs");
        }, 500);
      } else {
        setAuthError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError, { position: "top-right" });
      setIsLoading(false);
    }
  }, [authError]);

  return (
    <div className="w-full max-w-md rounded-2xl p-6 sm:p-8">
      <h2 className="text-3xl sm:text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#000ACE] to-[#c2009b] mb-2">
        Spreadnext
      </h2>

      <p className="text-[#414141] font-medium mb-4 text-sm sm:text-base justify-items-center items-center text-center">
        Login into your Spreadnext account
      </p>

      <div className="flex flex-col gap-4">
        {/* Email/Phone Input */}
        <InputField
          name="email"
          type="text"
          label="Id, Phone number, Email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          error={errors.email}
          touched={touched.email}
          customBorder={true}
          gradientFrom="#000ACE"
          gradientTo="#C2009B"
        />

        {/* Password Input */}
        <div className="relative">
          <InputField
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            customBorder={true}
            gradientFrom="#000ACE"
            gradientTo="#C2009B"
            error={errors.password}
            touched={touched.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <FaRegEye size={18} />
            ) : (
              <FaRegEyeSlash size={18} />
            )}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between text-sm mt-1 gap-2 sm:gap-0">
          {/* <label className="flex items-center gap-1 text-gray-700 justify-center sm:justify-start">
            <input type="checkbox" className="accent-[#116AD1]" />{" "}
            <span className="font-light">Keep Remind Me</span>
          </label> */}

          <label className="flex items-center gap-2 text-gray-700">
  <input
    type="checkbox"
    checked={formData.rememberMe}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        rememberMe: e.target.checked,
      }))
    }
  />
  <span className="font-light">Keep Remind Me</span>
</label>

          <button className="text-[#116AD1] hover:underline text-center sm:text-right">
            Forget Password
          </button>
        </div>

        <div className="text-center flex-col gap-y-0">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="bg-[#0031F5] text-white py-2 px-8 rounded-full border-2 font-medium hover:bg-[#0E5CB8] transition duration-300 mt-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>

        <Link
          href="/signup"
          className="text-center w-full text-[#116AD1] border-2 border-[#116AD1] font-medium focus:ring-2 rounded-full py-2 mt-1 hover:text-blue-900 hover:bg-blue-50 transition text-sm"
        >
          New in Spreadnext ? Signup
        </Link>

        <div className="flex items-center my-1">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-700 text-sm px-2">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex items-center justify-center gap-6">
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <FcGoogle className="w-6 h-6 cursor-pointer" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <FaApple className="w-6 h-6 text-black cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}