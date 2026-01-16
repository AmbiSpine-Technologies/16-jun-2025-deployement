"use client";
import Link from "next/link";
import { Grid } from "lucide-react";
import Dropdown from "../components/Dropdown";
import { useState } from "react";
import Modal from "../components/Modal";
import CreateSelection from "../components/common/CreatePageSelectionCard";
import CenterHeadingModal from "../components/CenterHeadingModal";
const growthLinks = [
  { name: "Hiring & Talent", href: "/company/hiring-talent" },
  { name: "Mentorship & Learning", href: "#", status: "Coming Soon" },
  { name: "Community & Group Management", href: "#", status: "Coming Soon" },
  { name: "Analytics & Insights", href: "/student-profile/profile-analytics" },
];

const expansionLinks = [
  { name: "Advertise & Partnerships", href: "/advertise-partnerships" },
  { name: "Premium & Advanced Tools", href: "/premium-advanced-tools" },
  // { name: "Admin Center", href: "/admin-center" },

];

export default function ToolsMenu({ isSidebarOpen }) {
  const [ openNewPage , setOpenNewPage] = useState(false);
  return (
    <div>
   <Dropdown
      button={
        <div className="flex items-start gap-2 mb-4 cursor-pointer">
           <img src="/toolse.svg" className="w-5 h-5 " />
          {isSidebarOpen && (
            <span className="text-sm  text-gray-700">Tools</span>
          )}
        </div>
      }
      className={`absolute z-50 w-76 bg-white text-gray-800 rounded-2xl  shadow-lg overflow-hidden ${isSidebarOpen ? "bottom-2 left-52" : "bottom-1 left-8"
            }`}
    >
      {({ close }) => (
        <div className="p-6 space-y-6">

          {/* Growth & Operations */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Growth & Operations
            </h4>
         
            <ul className="space-y-2 text-sm">
  {growthLinks.map((item) => {
    const isComingSoon = item.status === "Coming Soon";

    return (
      <li key={item.name}>
        {isComingSoon ? (
          
          <span className="text-gray-500 flex items-center gap-2">
            {item.name}
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          </span>
        ) : (
          // ✅ Normal working link
          <Link
            href={item.href}
            onClick={close}
            className="text-gray-500 hover:text-gray-700 transition flex items-center gap-2"
          >
            {item.name}
          </Link>
        )}
      </li>
    );
  })}
</ul>

          </div>

          {/* Expansion */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Expansion
            </h4>
            <ul className="space-y-2 text-sm">
              {expansionLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <button onClick={() => {
  close();
  setOpenNewPage(true);
}}  className="text-gray-500 hover:cursor-pointer hover:text-gray-700 transition">
              Create Pages
              </button>
            </ul>
          </div>

        </div>
      )}
    </Dropdown>
      <CenterHeadingModal
        show={openNewPage} 
        onClose={() => setOpenNewPage(false)} 
        title="What would you like to create?"
        widthClass="lg:w-[650px]" // Aapki requirement ke hisab se width
      >
        <CreateSelection  onClose={() => setOpenNewPage(false)}  />
        
      </CenterHeadingModal>
    </div>
 
  );
}
