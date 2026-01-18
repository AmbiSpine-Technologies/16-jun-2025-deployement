"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./header/SideBar";
import Header from "./header/Header";
import { useSelector } from "react-redux";
import { useAppProfile } from "@/app/hooks/useAppProfile";

export default function MainLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const { isReady, isLoading } = useAppProfile();

  const pathname = usePathname();

  const isAuthOrOnboarding = 
    pathname === "/signin" || 
    pathname.startsWith("/signup"); 

  return (
    <div className="flex flex-col ">
      
      {/* Header sirf tab dikhega jab Auth/Onboarding page na ho */}
      {!isAuthOrOnboarding && (
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <div className={`flex flex-1 ${!isAuthOrOnboarding ? "" : ""}`}>
        
        {/* Sidebar Logic: User hona chahiye AND Auth/Onboarding page NAHI hona chahiye */}
        {user && !isAuthOrOnboarding ? (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            user={user}
          />
        ) : null}

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}