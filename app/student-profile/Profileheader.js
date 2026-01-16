"use client";
import React, { useMemo, useEffect, useCallback } from "react";
import { MdEmail, MdVerifiedUser } from "react-icons/md";
import { FaRegCalendarAlt, FaUniversity } from "react-icons/fa";
import Link from "next/link";
import ProfileTopSection from "./ProfileTopSection";
import { useDispatch, useSelector } from "react-redux";
import { TruncateText } from "../helper/truncateText";
import { FIELD_LIMITS } from "../constents/constents";
import { MapPin } from "lucide-react";
import { Button2 } from "../components/button/Button2";
import ViewAsDropdown from "../components/ViewAsDropdown";


export default function ProfileHeader({ user }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.users?.currentUser);
  const isOwner = currentUser?.id === user?.id;
  // const displayUser = isOwner ? currentUser : user;
  const displayUser = user
; console.log(" display users 3 ", user);
  // State initialization
  const [isFollowing, setIsFollowing] = React.useState(false);

  // Combined stats state
  const [stats, setStats] = React.useState({
    followers: 0,
    following: 0,
    collabs: 0
  });

  // Single useEffect for all data updates
  useEffect(() => {
    if (!displayUser) return;

    setStats({
      followers: displayUser.followersCount || 0,
      following: displayUser.followingCount || 0,
      collabs: displayUser.collabsCount || 0
    });

    setIsFollowing(Boolean(currentUser?.following?.includes(user?.id)));
  }, [displayUser, currentUser?.following, user?.id]);

  // Memoized right column items
  const rightColumnItems = useMemo(() => {
    if (!displayUser) return [];

    const items = [
      ...(displayUser.experience || []),
      ...(displayUser.college
        ? Array.isArray(displayUser.college)
          ? displayUser.college
          : [displayUser.college]
        : [])
    ];

    return items.slice(0, 2).map(item => ({
      ...item,
      logo: item.logo || "/placeholder.png",
      company: item.company || item.name || ""
    }));
  }, [displayUser]);

  const WebsiteLink = useCallback(() => {
    if (!user?.website) return null;

    const url = user.website.startsWith("http") ? user.website : `https://${user.website}`;

    return (
      <div
        onClick={() => window.open(url, "_blank")}
        className="flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 flex-shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c4.97 0 9 4.03 9 9 0 4.97-4.03 9-9 9s-9-4.03-9-9c0-4.97 4.03-9 9-9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.502 5 12 5c4.498 0 8.268 2.943 9.542 7M12 19c-2.63-3.2-3.862-6.4-3.725-9.6M12 19c2.63-3.2 3.862-6.4 3.725-9.6"
          />
        </svg>
        <span className="text-xs sm:text-sm font-medium text-blue-800">
          Visit my Website
        </span>
      </div>
    );
  }, [user?.website]);

  // Early return with loading state
  if (!displayUser) {
    return (
      <div className="p-4 text-gray-400 text-center text-sm sm:text-base">
        Loading profile...
      </div>
    );
  }

  // Stats links configuration
  const statsLinks = [
    { label: "Collabs", count: stats.collabs, href: "/collabs" },
    { label: "Followers", count: stats.followers, href: "/network-manager/followers" },
    { label: "Following", count: stats.following, href: "/network-manager/following" }
  ];

 
  // Contact info items configuration
  const contactInfo = [
    displayUser.location && {
      icon: <MapPin size={14} className="text-[#585a5e] flex-shrink-0" />,
      text: TruncateText(displayUser.location, FIELD_LIMITS.location)
    },
    displayUser.email && {
      icon: <MdEmail size={14} className="flex-shrink-0" />,
      text: displayUser.email,
      className: "text-blue-600 hover:underline cursor-pointer"
    },
    displayUser.joined && {
      icon: <FaRegCalendarAlt size={14} className="flex-shrink-0" />,
      text: `Joined ${displayUser.joined}`
    }
  ].filter(Boolean);

  return (
    <div className="mt-5  border-[0.3px] border-[#cccccc] rounded-2xl  bg-white">
      <div className="mb-14">
        <ProfileTopSection user={displayUser} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 lg:px-10 pb-4 sm:pb-6">
        {/* Main Content Section */}
        <div className="w-full lg:w-[65%]">
          {/* Name and Verification */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 flex gap-2 items-center font-josefin">
              {TruncateText(displayUser.name, FIELD_LIMITS.name)}
              {displayUser.verified && (
                <MdVerifiedUser className="text-blue-500 text-lg sm:text-xl flex-shrink-0" />
              )}

            </h2>
            <p className='text-[10px] mt-2 text-[#303a53]' >{displayUser.role}</p>
          </div>

          {/* Headline */}
          {displayUser.headline && (
            <p className="text-xs sm:text-[13px] md:text-sm text-[#303a53] break-words mt-1 sm:mt-2">
              {displayUser.headline}
            </p>
          )}

          {/* Contact Information */}
          {contactInfo.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-600 text-[10px] sm:text-xs font-medium my-2 sm:my-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-1 min-w-0">
                  {item.icon}
                  <p className={`${item.className || ""} truncate`}>{item.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Stats – followers, following, collabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4 text-[11px] sm:text-[12px] text-[#6b7280] font-medium">
            <Link
              href="/network-manager/followers"
              className="hover:underline whitespace-nowrap"
            >
              <span className="font-semibold text-[#111827]">
                {stats.followers}
              </span>{" "}
              Followers
            </Link>

            <span className="text-[#9ca3af]">•</span>

            <Link
              href="/network-manager/following"
              className="hover:underline whitespace-nowrap"
            >
              <span className="font-semibold text-[#111827]">
                {stats.following}
              </span>{" "}
              Following
            </Link>

            <span className="text-[#9ca3af]">•</span>

            <Link
              href="/collabs"
              className="hover:underline whitespace-nowrap"
            >
              <span className="font-semibold text-[#111827]">
                {stats.collabs}
              </span>{" "}
              Collabs
            </Link>
          </div>

          {/* View As Dropdown */}
          <div className="flex items-center mt-3 sm:mt-4 mb-3 sm:mb-4 gap-3">
            <ViewAsDropdown />
          </div>
        </div>

        {/* Organization Section */}
        {displayUser?.organization && (
          <aside className="w-full lg:w-[35%] mt-2 lg:mt-0">
            <div className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100">
              {/* Logo */}
              <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0 bg-white rounded-lg border border-gray-200">
                <img
                  src={displayUser.organization.logo || "/spreads.svg"}
                  alt={displayUser.organization.name}
                  className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                />
              </div>

              {/* Name & Website */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900 truncate">
                  {displayUser.organization.name}
                </span>

                {displayUser.organization.website && (
                  <a
                    href={
                      displayUser.organization.website.startsWith("http")
                        ? displayUser.organization.website
                        : `https://${displayUser.organization.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs md:text-sm text-gray-500 hover:text-blue-600 break-all mt-0.5"
                  >
                    {displayUser.organization.website}
                  </a>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}