"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const TakeASpinSlider = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = data.length;

  // 🔹 Auto Slide Every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 2500);
    return () => clearInterval(interval);
  }, [total]);

  const handleDotClick = (index) => setCurrentIndex(index);

  return (
    <section className="relative flex flex-col items-center justify-center">
      {/* 🔹 Image Container - Increased Width */}
      <div className="relative flex items-center justify-center w-full max-w-[180px] h-[200px] sm:h-[250px] md:h-[300px] overflow-visible">
        <AnimatePresence mode="wait">
          {data.map((item, index) => {
            const isCurrent = index === currentIndex;
            const isNext = index === (currentIndex + 1) % total;

            let style = {
              scale: 1,
              rotate: 0,
              x: 0,
              opacity: 1,
              zIndex: 2,
            };

            if (isCurrent) {
              style = { scale: 1, rotate: -4, x: -35, opacity: 1, zIndex: 3 };
            } else if (isNext) {
              style = { scale: 0.9, rotate: 4, x: 35, opacity: 0.8, zIndex: 2 };
            } else {
              style = { scale: 0.8, rotate: 0, opacity: 0, zIndex: 1 };
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={style}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute w-full h-full"
              >
                {/* ✅ Increased image size */}
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="rounded-2xl shadow-lg object-cover border border-gray-100"
                  // sizes="(max-width: 568px) 100vw, 450px"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 🔹 Dots Navigation */}
      <div className="flex gap-2 mt-4">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === currentIndex
                ? "border-[#116AD1] scale-125"
                : "border-[#116AD1]/30"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default TakeASpinSlider;
