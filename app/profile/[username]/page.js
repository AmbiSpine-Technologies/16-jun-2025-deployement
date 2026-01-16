"use client";
import React, { use, useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import ProfileHeader from "../../student-profile/Profileheader";
import DesignerProfile from "../../student-profile/DesignerProfile";
import PeopleYouMayKnow from "../../student-profile/PeopleYouMayKnow";
import { users } from "../../constents/constents";
import JoinCommunities from "../../student-profile/JoinCommunities";
import CompanySuggestion from "../../student-profile/companySuggestion";
import Edge from "../../student-profile/Edge";
import { GlobalLoader } from "../../components/Loader";
import ProfileAboutSkills from "@/app/student-profile/ProfileAboutSkills";
import TopMentors from "@/app/student-profile/TopMentor";
import PinnedPosts from "@/app/student-profile/PinnedPosts";
import ProfileCompletionCard from "@/app/student-profile/ProfileCompletionCard";
import AboutActivity from "@/app/student-profile/Activity";
import ProfileTabs from "@/app/student-profile/ProfileTabs";
import ProjectSection from "@/app/student-profile/ProjectSection";
import CoursesLicense from "@/app/student-profile/Courses&License";
import ProfileAnalyticsCard from "../../student-profile/ProfileAnalyticsCard";
import SubscriptionPlansComponent from "@/app/pricing/SubscriptionPlansComponent";
import ResumePricing from "@/app/pricing/ResumePricing";
import { getProfileByUsername } from '@/app/utils/profileApi';
import { toast } from "react-toastify";

export default function UserProfilePage({ params }) {
    const [isPending, startTransition] = useTransition();
    const { username } = use(params);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state) => state.users?.currentUser);
    const isOwner = currentUser?.username === username;
  
    // Transform backend profile data to frontend format
    const transformProfileData = (profileData) => {
      if (!profileData) return null;
      // Hum city, state aur country ko combine karke ek achhi location string bana sakte hain
  const pInfo = profileData.personalInfo || {};
  const city = pInfo.city || "";
  const state = pInfo.state || "";
  const country = pInfo.country || "";
  
  // Agar specific 'location' field empty hai, toh city/state use karein
  const fullLocation = pInfo.location || [city, state, country].filter(Boolean).join(", ");

      return {
        id: profileData.userId?._id || profileData.userId?.id,
        username: profileData.userId?.userName || username,
        name: `${profileData.userId?.firstName || ''} ${profileData.userId?.lastName || ''}`.trim() || profileData.userId?.userName || 'User',
        firstName: profileData.userId?.firstName || '',
        lastName: profileData.userId?.lastName || '',
        avatar: profileData.userId?.profileImage || profileData.personalInfo?.profileImage || '/default-user-profile.svg',
        email: profileData.userId?.email || '',
        role: profileData?.personalInfo?.journeyType,
        verified: profileData.userId?.verified || false,
        about: profileData.personalInfo?.headline || profileData.profileSummary || '',
        location: fullLocation,
        website: profileData.personalInfo?.website || '',
        followersCount: profileData.userId?.followers?.length || 0,
        followingCount: profileData.userId?.following?.length || 0,
        collabsCount: 0,
        experience: profileData.workExperience || [],
        educations: profileData.education || [],
        certifications: profileData.certificates || [],
        projects: profileData.projects || [],
        skills: profileData.skills || [],
        interests: profileData.interests || [],
        college: profileData.education?.[0] || null,
        connections: profileData.userId?.connections || [],
        followers: profileData.userId?.followers || [],
        following: profileData.userId?.following || [],
        ...profileData,
       
      };
    };

    // Fetch profile from API
    useEffect(() => {
      const fetchProfile = async () => {
        setLoading(true);
        try {
          const result = await getProfileByUsername(username);
          if (result.success && result.data) {
            const transformedUser = transformProfileData(result.data);
            setUser(transformedUser);
          } else {
            // Fallback to mock data if API fails
            const fallbackUser = users.find((u) => u.username === username);
            if (fallbackUser) {
              setUser(fallbackUser);
              toast.warning("Using cached profile data");
            } else {
              setUser(null);
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          // Fallback to mock data on error
          const fallbackUser = users.find((u) => u.username === username);
          if (fallbackUser) {
            setUser(fallbackUser);
            toast.warning("Using cached profile data");
          } else {
            setUser(null);
          }
        } finally {
          setLoading(false);
        }
      };
  
      if (username) {
        fetchProfile();
      }
    }, [username]);
  
    if (isPending || loading) {
      return <GlobalLoader text="Loading Profile..." />;
    }
  
    if (!user) {
      return (
        <div className="min-h-screen bg-[#070C11] text-white p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold">User not found</h2>
          <p className="text-gray-400 mt-2">
            No profile exists for <strong>{username}</strong>.
          </p>
        </div>
      );
    }
  
  return (
    <div className="min-h-screen  mt-10  p-4 sm:p-6 lg:p-8 sm:mt-6 md:mt-8 lg:mt-10 md:p-6 ">
      <div className="max-w-7xl mx-auto">
        {/* <JoinCommunities /> */}

        <div className="flex justify-center transition-all gap-5 lg:gap-8 duration-300">

          {/* Left/Middle Profile Section  */}
          <section className="w-full md:w-[680px]  xl:w-[800px] flex-shrink-0 space-y-4">
            <ProfileHeader user={user} />
            <PinnedPosts user={user} isOwner={isOwner} />

            <div className="border-[0.3px] border-[#cccccc] rounded-xl sm:rounded-2xl space-y-0 overflow-hidden bg-white">
              <ProfileTabs user={user} isOwner={isOwner} />
              <AboutActivity />
              <ProjectSection />
              <CoursesLicense />
              <Edge user={user} />
            </div>
          </section>

          {/* Right Sidebar Section */}
          <aside className="hidden xl:flex w-[320px] 2xl:w-[340px] flex-col  mt-6 flex-shrink-0 xl:w-[320px]  xl:flex-shrink-0 gap-3 sm:gap-4">
           
            {isOwner && <ProfileAnalyticsCard />}
            {/* <TopMentors /> */}
            <CompanySuggestion profileUser={user} />
            <PeopleYouMayKnow users={users} currentUserId={user.id} limit={5} />
          </aside>
        </div>
      </div>
    </div>
  );
}