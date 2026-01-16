"use client";
import { motion } from "framer-motion";
// animations/variants.js
const getVariants = ({
  direction = "up", // up, down, left, right
  duration = 0.6,
  delay = 0,
  scale = 1,
  distance = 20,
} = {}) => {
  let x = 0,
    y = 0;

  switch (direction) {
    case "left":
      x = -distance;
      break;
    case "right":
      x = distance;
      break;
    case "up":
      y = -distance;
      break;
    case "down":
      y = distance;
      break;
    default:
      break;
  }

  return {
    hidden: {
      opacity: 0,
      x,
      y,
      scale: scale < 1 ? scale : 1,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };
};

// card container animation
export function AnimatedWrapper({
  children,
  direction = "up",
  distance = 20,
  duration = 0.6,
  delay = 0,
  scale = 1,
  repeat = false,
  tag: Tag = "div", // allow section, span, etc.
  className = "",
}) {
  return (
    <motion.div
      className={className}
      variants={getVariants({ direction, distance, duration, delay, scale })}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export const containerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// card container animation with staggered children
export function StaggeredContainer({ children, className = "" }) {
  return (
    <motion.div
      className={`${className}`}
      variants={containerStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
