"use client";
import { GlobalLoader } from "./components/Loader";

export default function Loading() {
  // This file automatically runs when any route in app/ is loading (Next.js feature)
  return <GlobalLoader text="Spreadnext" />;
}