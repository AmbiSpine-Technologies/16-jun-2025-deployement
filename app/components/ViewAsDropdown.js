"use client";

import { Button2 } from "./button/Button2";
import Dropdown from "./Dropdown"; // Maan lete hain file ka naam Dropdown.js hai
import Link from "next/link";
const VIEW_AS_OPTIONS = [
  {
    id: "student",
    title: "Switch as a student",
    subtitle: "Show that you are boosting your skills",
    action: "/switch-student",
  },
  {
    id: "job",
    title: "Find a new job",
    subtitle: "Share your profile with recruiters for best job results",
    action: "/find-job",
  },
  // {
  //   id: "hiring",
  //   title: "Hiring",
  //   subtitle: "You are open to find candidates",
  //   action: "/hiring",
  // },
  {
    id: "mentor",
    title: "Become a Mentor",
    subtitle: "Share your experience to train qualified candidates",
    action: "/mentor",
  },

];

export default function ViewAsDropdown() {
  const handleSelect = (item, close) => {
    // 1. Menu band karo
    close(); 
    // 2. Action perform karo
    console.log("View as:", item.action);
  };

  return (
    <Dropdown
      // 1. Button prop me Button2 pass kiya
      button={<Button2 showIcon={false} name="View as" />}
      // 2. Dropdown menu ki styling
      className="left-0"
    >
      {({ close }) => (
        <div className="w-80 top-0 bg-white border rounded-xl shadow-lg overflow-hidden">
          {VIEW_AS_OPTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item, close)}
              className="w-full px-4 hover:cursor-pointer py-3 text-left hover:bg-gray-100 transition border-b last:border-b-0"
            >
              <p className="text-sm font-medium text-gray-900">
                {item.title}
              </p>
              <p className="text-xs text-gray-500">
                {item.subtitle} 
              </p>
            </button>
          ))}
       <div className="w-full hover:cursor-pointer px-4 py-3 text-left hover:bg-gray-100 transition pb-2  text-sm font-medium text-gray-900">
          <Link href="/hr/hr-registration" className="">
          <p className="text-sm font-medium text-gray-900">
              Hiring
              </p>
           <p className="text-xs text-gray-500">
            You are open to find candidates
              </p>
          </Link>
          </div>

          <div className="w-full hover:cursor-pointer px-4 py-3 text-left hover:bg-gray-100 transition pb-2 border-b last:border-b-0 text-sm font-medium text-gray-900">
          <Link href="/tpo/tpo-registration" className="">
          Switch as TPO (Placement Cell)
          </Link>
          </div>

        </div>
      )}
    </Dropdown>
  );
}