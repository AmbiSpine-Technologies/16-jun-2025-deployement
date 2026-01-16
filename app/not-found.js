// app/not-found.js
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiHome, FiArrowLeft, FiSearch, FiFileText } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* Animated 404 */}
        <div className="relative mb-3">
        
          <div className="relative">
            <h1 className="text-4xl font-bold text-gray-600 mb-4">
              Page Not Found
            </h1>
            <p className="text-base text-gray-700 font-open-sans leading-relaxed">
              Oops! The page you're looking for seems to have wandered off into the digital void. 
              Let's get you back on track.
            </p>

      
          </div>
        </div>

      
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <Image
            src="/not-found-page.png"
            alt="404 Illustration"
            width={300}
            height={250}
            priority
            className="rounded-xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-wrap mt-10 justify-center gap-4">
    
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-blue-800  text-white px-3 py-1 rounded-lg font-medium transition-all hover:cursor-pointer"
          >
            <FiArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
   
      </div>
    </div>
  );
}