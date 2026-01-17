"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlobalLoader } from "../Loader";

export default function ActionTrigger({
  href,              // optional navigation
  onClick,           // optional action (modal close etc)
  children,
  className = "",
  showLoader = true, // loader optional
  as = "button",     // "button" | "div"
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    onClick?.();

    if (href) {
      if (showLoader) setLoading(true);
      router.push(href);
    }
  };

  if (loading) return <GlobalLoader />;

  const Component = as;

  return (
    <Component
      onClick={handleClick}
      className={className}
      role="button"
    >
      {children}
    </Component>
  );
}
