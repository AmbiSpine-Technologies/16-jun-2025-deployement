

"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LeftSliderForSinUp from "../signup/LeftSliderForSinUp";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import TakeASpinSlider from "../signup/LeftSliderForSinUp";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { InputField } from "../components/InputField";
import SignInForm from "./SiginForm";

const GradientTypingText = () => {
  const text = "your next move, your next legacy...";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      } else {
        // Reset karke fir se start
        setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
        }, 300); // 2 second wait after completion
      }
    }, 100);

    return () => clearInterval(interval);
  }, [index, text]);

  return (
    <motion.p
      className="text-lg text-left font-jost tracking-wide mt-3"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background: "linear-gradient(to right, #8B016F, #020BA7FC, #8B016F)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {displayedText}
      {index < text.length && <span className="animate-pulse">|</span>}
    </motion.p>
  );
};

export default function SpreadsSignIn() {
  const illustrations = [
    {
      id: 1,
      title: "Professional Networking",
      description:
        "Connect with industry professionals and discover new opportunities.",
      img: "/SignInLeftImg1.jpg",
    },
    {
      id: 2,
      title: "Career Growth",
      description: "Climb the career ladder with personalized growth paths.",
      img: "/SignInLeftImg2.jpg",
    },
    {
      id: 3,
      title: "Remote Work",
      description: "Work from anywhere with global opportunities.",
      img: "/SignUpLeftImg1.jpg",
    },
    {
      id: 4,
      title: "Team Collaboration",
      description: "Build strong connections and collaborate effectively.",
      img: "/SignUpLeftImg2.jpg",
    },
    {
      id: 5,
      title: "Success Stories",
      description:
        "Join thousands of professionals achieving their career goals.",
      img: "/SignUpLeftImg3.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white px-[10%]">
      {/* Left Side */}
      <div className="w-full lg:h-full flex flex-col sm:h-screen justify-center items-center px-6 py-20 text-center lg:text-left">
        <h2 className="text-[#040404] text-3xl sm:text-4xl font-semibold font-jost">
          Welcome Back, Builder.
        </h2>
        <p className="text-[#116AD1] mt-3 mb-6 text-base justify-items-center items-center text-center sm:text-lg font-medium font-jost">
          Your world of ideas, identity, and impact begins here.{" "}
          <br className="hidden lg:block align-middle" /> One login — infinite
          possibilities.
        </p>

        <div className="w-full max-w-[500px] h-[250px] sm:h-auto object-cover mx-auto">
          <TakeASpinSlider data={illustrations} />
        </div>

        <div className="mt-6">
          <GradientTypingText />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-full flex justify-center items-center sm:px-10 m-auto">
        <SignInForm />
      </div>
    </div>
  );
}