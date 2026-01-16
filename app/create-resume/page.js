"use client";

import React from "react";
import FirstPhase from "./FirstPhase";
import { ResumeProvider } from "../context/ResumeContext";

export default function page() {
  return (
    <ResumeProvider>
      <div className="max-h-screen max-w-7xl mx-auto bg-[#fafafa] sm:p-6 lg:p-8">
        <FirstPhase />
      </div>
    </ResumeProvider>
  );
}
