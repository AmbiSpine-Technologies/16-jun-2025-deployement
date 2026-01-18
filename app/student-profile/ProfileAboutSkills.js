
"use client";
import React, { useState, useEffect } from "react";
import { useAppProfile } from "@/app/hooks/useAppProfile"; // Aapka custom hook
import { Pencil, FileText } from "lucide-react";
import Image from "next/image";

const MAX_ABOUT_CHARS = 500;

export default function ProfileAboutSkills() {
    // Sirf profile aur loading ki zaroorat hai yaha
    const { profile, loading } = useAppProfile();

    if (loading) return <div className="p-4 animate-pulse bg-gray-50 rounded-xl h-40" />;

    const hasAbout = profile?.profileSummary && profile.profileSummary.trim().length > 0;

    return (
        <section className="w-full bg-white p-6 ">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg text-gray-800 font-semibold flex items-center gap-2">
                    About
                </h2>
            </div>

            {/* Content Display Logic */}
            {hasAbout ? (
                /* Yaha hum Rich Text Editor ka content render karenge */
                <div 
                    className="text-sm leading-relaxed text-gray-600 prose prose-blue max-w-none"
                    dangerouslySetInnerHTML={{ __html: profile.profileSummary }} 
                />
            ) : (
                /* EMPTY STATE: Jab koi data nahi hai */
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative w-40 h-40 mb-4 opacity-80">
                        <Image 
                            src="/Happy Girl.png" 
                            alt="No profile summary"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <p className="text-gray-500 font-medium text-sm">No profile summary added yet.</p>
                    <p className="text-gray-400 text-xs mt-1 text-center">
                        Add a summary to highlight your personality and goals through your profile settings.
                    </p>
                </div>
            )}
        </section>
    );
}