import { useState, useEffect, useMemo } from 'react';

/**
 * 1. PURE UTILITY FUNCTION (Production Grade)
 * Bina React ke bhi ise kahin bhi use kar sakte hain.
 */
export const formatTimeAgo = (dateStr) => {
  if (!dateStr) return "Never";

  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  // Future date check
  if (seconds < 0) return "Just now";

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const value = Math.floor(seconds / secondsInUnit);
    if (value >= 1) {
      return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

/**
 * 2. CUSTOM HOOK (Real-time Auto Refresh)
 * Ye hook UI ko real-time update rakhta hai.
 */
export const useTimeAgo = (dateStr) => {
  const [timeText, setTimeText] = useState(() => formatTimeAgo(dateStr));

  useEffect(() => {
    if (!dateStr) return;

    // Initial update
    setTimeText(formatTimeAgo(dateStr));

    // Optimization: Har 30-60 seconds mein update karein 
    // kyunki seconds dikhane ki zaroorat nahi hai
    const intervalId = setInterval(() => {
      setTimeText(formatTimeAgo(dateStr));
    }, 60000); // 1 minute interval

    return () => clearInterval(intervalId);
  }, [dateStr]);

  return timeText;
};