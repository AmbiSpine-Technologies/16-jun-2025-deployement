// hooks/useNavigationWithLoader.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useNavigationWithLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState("");
  const router = useRouter();

  const navigateWithLoader = (path, message = "Loading...", delay = 100) => {
    setLoadingAction(message);
    setIsLoading(true);

    setTimeout(() => {
      router.push(path);
    }, delay);
  };

  return {
    isLoading,
    loadingAction,
    navigateWithLoader,
    setIsLoading,
    setLoadingAction
  };
};