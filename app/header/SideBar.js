"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import ProfileMenu from "./ProfileMenu";
import CreatePostModal from "./CreatePostModal";
import CreateCommunityModal from "../components/CreateCommunityModal";
import ToolsPopup from './toolsePopup';

import {
  House,
  Compass,
  MessageCircleMore,
  Users,
  UserRoundPlus,
  Building2,
  University,
  ChevronLeft,
  Menu,
  CirclePlus,
} from "lucide-react";
import ToolsMenu from "./toolsePopup";

const menuItems = [
  { label: "Home", icon: House, link: "/feeds" },
  // { label: "Explore", icon: Compass, link: "/explore" },
  { label: "Messages", icon: MessageCircleMore, link: "/messages" },
];

const communityItems = [
  { label: "Switch To Community", icon: Users, action: "switch" },
  { label: "Create Community", icon: UserRoundPlus, action: "createCommunity" },
];

const pageItems = [
  { label: "AmbiSpine Technologies", icon: Building2, link: "/pages/ambispine-technologies" },
  { label: "APSU Rewa", icon: University },
];

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth || { user: null });
  const [showToolsPopup, setShowToolsPopup] = useState(false);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);

  const hideOnRoutes = useMemo(
    () => ["/signup", "/signin", "/onboarding", "/", "/explore", "/signin/onboarding"],
    []
  );

  if (hideOnRoutes.includes(pathname)) return null;

  const handleAction = (type) => {
    if (type === "createPost") setIsPostModalOpen(true);
    if (type === "createCommunity") setIsCommunityModalOpen(true);
  };

  return (
    <aside
      className={`sticky top-10 h-[calc(100vh-66px)] max-w-1/5 border-r border-[#cccccc] 
 bg-white transition-all duration-300 scale-z-100 z-30
      ${isSidebarOpen ? "pl-4" : " ps-2"}`}
    >
      {/* Toggle button */}
      {user && (
        <button
          onClick={() => toggleSidebar(!isSidebarOpen)}
          className="absolute -right-[14px] top-7 border bg-white border-gray-300 p-1 rounded-full hover:cursor-pointer z-40"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={16} className="text-gray-700 cursor-pointer" />
          ) : (
            <Menu size={16} className="text-gray-700 cursor-pointer" />
          )}
        </button>
      )}

      <div className="mt-12 flex flex-col justify-between h-full pb-20">
        {/* MENU LIST */}
        <div className="space-y-4 text-gray-700">
          {/* top items */}
          <nav>
            {menuItems.map((item, i) => (
              <SidebarItem
                key={i}
                icon={item.icon}
                label={item.label}
                href={item.link}
                open={isSidebarOpen}
                active={pathname === item.link}
              />
            ))}
          </nav>

          {/* Create Spreads */}
          <SidebarItem
            icon={CirclePlus}
            label="Create Spreads"
            open={isSidebarOpen}
            onClick={() => handleAction("createPost")}
          />

          {/* COMMUNITY SECTION */}
          {/* <div>
            {communityItems.map((item, i) => (
              <SidebarItem
                key={i}
                icon={item.icon}
                label={item.label}
                open={isSidebarOpen}
                onClick={() => handleAction(item.action)}
              />
            ))}
          </div> */}

          {/* PAGES SECTION */}
          <div className="border-b pb-3 border-gray-300">
            {isSidebarOpen && (
              <h3 className="text-xs font-semibold text-gray-500 mb-1 uppercase">Pages</h3>
            )}

            {pageItems.map((item, i) => (
              <SidebarItem
                key={i}
                icon={item.icon}
                label={item.label}
                href={item.link}
                open={isSidebarOpen}
                onClick={() => console.log("open page")}
              />
            ))}
          </div>

          {/* UPGRADE BOX */}
          {isSidebarOpen && (
            <div className="p-2 rounded-xl bg-gray-100 flex flex-col gap-2 mx-1">
              <p className="text-xs text-gray-700">
                Enjoy unlimited access to our app with only a small price monthly.
              </p>
              <button className="text-sm text-blue-700 underline">Go Pro</button>
            </div>
          )}
        </div>


        

        {/* PROFILE MENU */}
        
        <div className={`${isSidebarOpen ? "ml-2 gap-3" : "flex justify-center items-center gap-4 flex-col"}`}>
         <ToolsMenu isSidebarOpen={isSidebarOpen} />
          <ProfileMenu
            isSidebarOpen={isSidebarOpen}
            onLogout={() => console.log("Logout clicked")}
          />
        </div>
      </div>




      {/* MODALS */}
      <CreatePostModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      <CreateCommunityModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
        onCommunityCreated={(c) => console.log("Community created:", c)}
      />
    </aside>
  );
}


function SidebarItem({ icon: Icon, label, href, open, active, onClick }) {
  const Wrapper = href ? Link : "button";

  return (
    <Wrapper
      href={href}
      onClick={onClick}
      className={`
         w-full
        flex items-center gap-2 
        py-2  px-2
         
        cursor-pointer
        transition
        ${active ? "bg-gray-200" : "hover:bg-gray-100"}
        ${!open ? "justify-center" : ""}
      `}
    >
      <Icon size={17} strokeWidth={1.5} />
      {open && <span className="text-xs truncate">{label}</span>}
    </Wrapper>
  );
}
