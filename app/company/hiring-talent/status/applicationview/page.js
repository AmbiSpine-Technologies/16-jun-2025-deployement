"use client";
import {  Suspense } from "react";
import { GlobalLoader } from "@/app/components/Loader";
import ApplicationClientContent from "./ApplicationClientContent";



export default function ApplicationsContent() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <ApplicationClientContent />
    </Suspense>
  );
}