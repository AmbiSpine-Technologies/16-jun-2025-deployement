"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileAboutSkills from "./ProfileAboutSkills";
import Education from "./Education";
import Experience from "./Experience";
import { Pencil } from "lucide-react";

export default function ProfileTabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("about");

  const tabClass = (tab) =>
    `relative pb-3 text-sm font-medium cursor-pointer transition-colors
     ${activeTab === tab
      ? "text-blue-600"
      : "text-gray-600 hover:text-gray-800"
    }`;

  //changes

  return (
    <div className=" bg-white p-6">
      {/* Tabs Header */}
      <div className="flex items-center justify-between border-b">
        <div className="flex gap-8">
          {/* About */}
          <div onClick={() => setActiveTab("about")} className={tabClass("about")}>
            About
            {activeTab === "about" && (
              <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-blue-600 rounded-full" />
            )}
          </div>

          {/* Education */}
          <div
            onClick={() => setActiveTab("education")}
            className={tabClass("education")}
          >
            Education
            {activeTab === "education" && (
              <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-blue-600 rounded-full" />
            )}
          </div>

          {/* Experience */}
          <div
            onClick={() => setActiveTab("experience")}
            className={tabClass("experience")}
          >
            Experience
            {activeTab === "experience" && (
              <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-blue-600 rounded-full" />
            )}
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => router.push("/create-resume/resume-building")}
          className="flex items-center hover:cursor-pointer justify-between rounded-full border border-blue-500 px-4 py-1 text-sm text-blue-600 hover:bg-blue-50"
        >

          <Pencil size={14} /> Edit
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {activeTab === "about" && <ProfileAboutSkills />}
        {activeTab === "education" && (
          <Education type="education" />
        )}
        {activeTab === "experience" && (
          <Experience type="experience" />
        )}
      </div>
    </div>
  );
}
