
"use client";
import { useState } from "react";
import Link from "next/link";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { FaKey, FaQuestionCircle } from "react-icons/fa";
import Dropdown from "../components/Dropdown";
import { TruncateText } from "../helper/truncateText";
import { FIELD_LIMITS } from "../constents/constents";
import { ArrowLeftRight, LogOut } from 'lucide-react';
import Modal from "../components/Modal";
import SwitchAccountContent from "./SwitchAccountContent ";
import { useSelector } from "react-redux";
import SignInModal from "../signin/SignInModal";
import CenterHeadingModal from '../components/CenterHeadingModal';
import { useAuth } from "../context/auth-context";

export default function ProfileMenu({ isSidebarOpen, onLogout }) {
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const {logout } = useAuth()
  const currentUser = useSelector((state) => state.users?.currentUser)
  const avatarSrc = currentUser?.avatar || "/default-user-profile.svg";
  const userName =
  currentUser?.firstName && currentUser?.lastName
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : "Rupendra Vishwakarma";

  const userid = currentUser?.username || "rupednra";
  const userEmail = currentUser?.email || "rupedra@gmail.com";


  return (
    <div>
      <div className="flex gap-2 items-center">
        <div
          className={`bg-white flex items-center gap-2  transition ${isSidebarOpen ? "justify-start " : "justify-center"
            }`}
        >
          <img
            src={avatarSrc}
            alt={userName}
       
               className={`rounded-full object-cover z-50 ${
              isSidebarOpen
                ? "sm:w-[50px] sm:h-[50px] block "
                : "hidden"
              }`}
            suppressHydrationWarning
          />

          {isSidebarOpen && (
            <div className="flex  items-center gap-4">
              <div>

                <h5 className="hidden sm:block text-sm text-gray-500 font-medium truncate">
                  {TruncateText(userName, 15)}
                </h5>
                <p className="text-xs text-gray-600 ">
                  @{TruncateText(userid, 15)}
                </p>

              </div>
              <div>

              </div>
            </div>
          )}
        </div>
        <Dropdown
          button={
            <LogOut className="text-gray-700  me-1 pe-0.5" size={20} strokeWidth={1.5} />
          }
          className={`absolute z-50 w-76 bg-white text-gray-800 rounded-lg border border-gray-400 shadow-lg overflow-hidden ${isSidebarOpen ? "bottom-2 left-6" : "bottom-1 left-8"
            }`}
        >
          {({ close }) => (
            <div>
              {/* User Info */}
              <div className="p-4 border-b border-gray-400 ">
                <div className=" flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      src={avatarSrc}
                      className="w-14 h-14 rounded-full object-cover border border-gray-300"
                      alt="User avatar"

                    />
                    <div className="min-w-0 flex-1">
                      <h5 className="font-semibold text-sm  text-[#2A3438] truncate">
                        {TruncateText(userName, FIELD_LIMITS.name)}
                      </h5>
                      <p className="text-xs text-[#7F8384] truncate">
                        {TruncateText(userid, FIELD_LIMITS.email)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => setShowSwitchModal(true)}
                      className="text-[#0075AA] text-xs font-semibold hover:cursor-pointer"
                    >

                      Switch
                    </button>
                  </div>
                </div>

              </div>

              {/* Rest of your component remains the same */}
              {/* ... */}
              <div className="flex flex-col py-3 text-sm">

                <button
                  onClick={() => setShowSignIn(true)}
                  className="flex items-center gap-3 px-4 hover:cursor-pointer  font-normal text-[#2A3438] transition"
                >
                  Add and existing accounts
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 hover:cursor-pointer font-normal py-2 text-[#2A3438] transition"
                >
                  Log out @{userName}
                </button>
              </div>
            </div>
          )}
        </Dropdown>
      </div>
      <CenterHeadingModal
        show={showSwitchModal}
        onClose={() => setShowSwitchModal(false)}
        title="Switch account"
        widthClass="max-w-2xl !justify-center !items-center"
      >
        <SwitchAccountContent
          currentUser={currentUser}
          accounts={[
            { name: "Default user 1", username: "default.user.1" },
            // { name: "Default user 2", username: "default.user.2" },
          ]}
          onSwitch={(u) => {
            console.log("Switching to:", u);
            setShowSwitchModal(false);
          }}
        />
      </CenterHeadingModal>

      {showSignIn && (
        <SignInModal onClose={() => setShowSignIn(false)} />
      )}
    </div>

  );
}