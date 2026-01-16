"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const GlobalLoader = ({
  text = "Spreadnext",
  img = "/spreads.svg",
  type = "logo", // 'logo' or 'simple'
}) => {
  if (type === "simple") {
    return (
      <div className="min-h-screen bg-white text-gray-900">
  <div className="flex flex-col items-center justify-center ">
        <motion.div
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        <motion.p
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            repeatType: "reverse",
          }}
          className="text-gray-600 font-medium"
        >
          {text}
        </motion.p>
      </div>
      </div>
    
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
  <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <Image
          src={img}
          alt={text}
          width={100}
          height={100}
          className="mb-6 mx-auto animate-pulse"
        />

        {text && (
          <p className="text-gray-800 text-lg font-semibold">
            {text}
          </p>
        )}

        {/* Optional sub text */}
        {/* <p className="text-gray-500 text-sm mt-2">Please wait...</p> */}
      </motion.div>
    </div>
    </div>
  
  );
};
