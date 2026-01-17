// "use client";
// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import Sidebar from "./header/SideBar";
// import Header from "./header/Header";
// import { useSelector } from "react-redux";

// export default function MainLayout({ children }) {
//   const user = useSelector((state) => state.auth.user);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const pathname = usePathname();

//   // 🧭 Routes where header (navbar) should be hidden
//   const hideHeaderRoutes = ["/signin", "/signup", "/signup/onboarding"];
//   const hideHeader = hideHeaderRoutes.includes(pathname);

//   return (
//     <div className="flex flex-col min-h-screen">

//       {!hideHeader && (
//         <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       )}

//       <div className={`flex flex-1 ${!hideHeader ? "mt-10" : ""}`}>
//         {/* Sidebar only when user is logged in */}
//         {user ? (
//           <Sidebar
//             isSidebarOpen={isSidebarOpen}
//             toggleSidebar={toggleSidebar}
//             user={user}
//           />
//         ) : null}

//         <main className="flex-1">{children}</main>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./header/SideBar";
import Header from "./header/Header";
import { useSelector } from "react-redux";
import { useAppProfile } from "@/app/hooks/useAppProfile";
import { GlobalLoader } from "@/app/components/Loader";

export default function MainLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const { isReady, isLoading } = useAppProfile();

  const pathname = usePathname();



  // 🧭 Wo routes jahan Header aur Sidebar DONO nahi dikhne chahiye
  // Note: .startsWith use kiya hai taaki '/signup/onboarding/step2' jaisi sub-routes par bhi work kare
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