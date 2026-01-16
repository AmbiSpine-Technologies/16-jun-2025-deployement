"use client";
import React, { use, useTransition, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileHeader from "../Profileheader";
import DesignerProfile from "../DesignerProfile";
import PeopleYouMayKnow from "../PeopleYouMayKnow";
import ProfileAnalytics from "../ProfileAnalyticsCard";
import { users } from "../../constents/constents";
import JoinCommunities from "../JoinCommunities";
import CompanySuggestion from "../companySuggestion";
import Edge from "../Edge";
import { GlobalLoader } from "../../components/Loader";
import { getProfileByUsername } from "../../utils/profileApi";
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
    
    return {
      id: profileData.userId?._id || profileData.userId?.id,
      username: profileData.userId?.userName || username,
      name: `${profileData.userId?.firstName || ''} ${profileData.userId?.lastName || ''}`.trim() || profileData.userId?.userName || 'User',
      firstName: profileData.userId?.firstName || '',
      lastName: profileData.userId?.lastName || '',
      avatar: profileData.userId?.profileImage || profileData.personalInfo?.profileImage || '/default-user-profile.svg',
      email: profileData.userId?.email || '',
      verified: profileData.userId?.verified || false,
      about: profileData.personalInfo?.headline || profileData.profileSummary || '',
      location: profileData.personalInfo?.location || '',
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
    <div className="min-h-screen bg-[#080808] mt-10  p-4 sm:p-6 lg:p-8">
      <div className="flex flex-1 px-16 flex-col md:flex-row transition-all gap-12 lg:gap-20 duration-300">
        <section className="w-full lg:w-2/3 space-y-6">
          <ProfileHeader user={user} />
          <DesignerProfile user={user} />
          <Edge user={user} />
        </section>

        <aside className="w-full lg:max-w-[300px] flex flex-col gap-4">
          {isOwner && <ProfileAnalytics />}
          <ProfileAnalytics />
          <CompanySuggestion profileUser={user} />
          <PeopleYouMayKnow users={users} currentUserId={user.id} limit={2} />
          <JoinCommunities />
        </aside>
      </div>
    </div>
  );
}




// "use client";
// import React, { use, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import ProfileHeader from "../Profileheader";
// import DesignerProfile from "../DesignerProfile";
// import PeopleYouMayKnow from "../PeopleYouMayKnow";
// import ProfileAnalytics from "../ProfileAnalytics";
// import JoinCommunities from "../JoinCommunities";
// import CompanySuggestion from "../companySuggestion";
// import Edge from "../Edge";
// import { GlobalLoader } from "../../components/Loader";
// import { toast } from "react-toastify";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// // Transform API profile data to UI format
// const transformProfileData = (profileData) => {
//   if (!profileData) return null;

//   const user = profileData.userId || {};
//   const personalInfo = profileData.personalInfo || {};
  
//   // Build full name from firstName and lastName
//   const firstName = personalInfo.firstName || "";
//   const lastName = personalInfo.lastName || "";
//   const fullName = `${firstName} ${lastName}`.trim();
  
//   return {
//     id: user._id || user.id || profileData._id,
//     username: user.userName || user.username || "",
//     name: fullName || user.userName || user.email || "User",
//     headline: personalInfo.headline || "",
//     location: personalInfo.location || personalInfo.city || personalInfo.state || "",
//     email: personalInfo.email || user.email || "",
//     phone: personalInfo.phone || "",
//     avatar: profileData.profileImage || user.avatar || "",
//     cover: profileData.coverImage || "",
//     joined: profileData.createdAt 
//       ? new Date(profileData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
//       : "",
//     about: profileData.profileSummary || (() => {
//       // Generate a default overview from onboarding data if profileSummary is empty
//       const parts = [];
//       if (profileData.learningJourney?.educationLevel) {
//         parts.push(`Currently pursuing ${profileData.learningJourney.educationLevel} in ${profileData.learningJourney.fieldOfStudy || 'Engineering'}.`);
//       }
//       if (profileData.recentExperience?.jobTitle) {
//         parts.push(`Working as ${profileData.recentExperience.jobTitle}.`);
//       }
//       if (profileData.careerExpectations?.preferredJobRoles?.length > 0) {
//         parts.push(`Interested in ${profileData.careerExpectations.preferredJobRoles.join(', ')} roles.`);
//       }
//       return parts.length > 0 ? parts.join(' ') : "";
//     })(),
//     socialLinks: (profileData.socialLinks || []).reduce((acc, link) => {
//       if (link.platform && link.url) {
//         acc[link.platform.toLowerCase()] = link.url;
//       }
//       return acc;
//     }, {}),
//     followersCount: profileData.followersCount || 0,
//     followingCount: profileData.followingCount || 0,
//     collabsCount: profileData.collabsCount || 0,
//     followers: profileData.followers || [],
//     following: profileData.following || [],
//     experiences: (() => {
//       // Use workExperience array if available, otherwise create from recentExperience
//       const workExpArray = profileData.workExperience || [];
//       if (workExpArray.length === 0 && profileData.recentExperience?.jobTitle) {
//         // Create a single experience entry from recentExperience
//         const re = profileData.recentExperience;
//         return [{
//           id: 'recent-experience',
//           company: re.company || "",
//           name: re.company || "",
//           position: re.jobTitle || "",
//           jobTitle: re.jobTitle || "",
//           location: re.location || "",
//           startDate: { month: "", year: "" },
//           endDate: { month: "", year: "" },
//           description: re.description || "",
//           bullets: re.skills ? re.skills.split(',').map(s => s.trim()).filter(s => s) : [],
//           keyAchievements: re.skills ? re.skills.split(',').map(s => s.trim()).filter(s => s) : [],
//           employmentType: re.employmentType || "Full-time",
//           currentlyWorking: true,
//         }];
//       }
//       return workExpArray;
//     })().map((exp, idx) => {
//       // Parse date strings to month/year objects
//       const parseDate = (dateStr) => {
//         // Return empty if dateStr is falsy or not a string
//         if (!dateStr || typeof dateStr !== 'string') {
//           return { month: "", year: "" };
//         }
//         // Handle formats: "YYYY-MM", "YYYY-MM-DD", "YYYY"
//         const parts = dateStr.split("-");
//         const year = parts[0] || "";
//         const month = parts[1] || "";
//         const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         return {
//           month: month ? monthNames[parseInt(month)] || month : "",
//           year: year || "",
//         };
//       };

//       // Store original endDate string before parsing to check if currently working
//       const originalEndDate = typeof exp.endDate === 'string' ? exp.endDate : "";
//       const isCurrentlyWorking = originalEndDate === "" || 
//                                   originalEndDate.toLowerCase() === "present" || 
//                                   false;

//       return {
//         id: exp._id || `exp-${idx}`,
//         company: exp.company || "",
//         name: exp.company || "",
//         position: exp.jobTitle || "",
//         jobTitle: exp.jobTitle || "",
//         location: exp.location || "",
//         startDate: parseDate(exp.startDate),
//         endDate: parseDate(exp.endDate),
//         description: exp.description || "",
//         bullets: Array.isArray(exp.bullets) ? exp.bullets : [],
//         keyAchievements: Array.isArray(exp.bullets) ? exp.bullets : [], // Map bullets to keyAchievements
//         employmentType: exp.employmentType || "",
//         currentlyWorking: isCurrentlyWorking,
//       };
//     }),
//     experience: (profileData.workExperience || []).map((exp, idx) => ({
//       id: exp._id || `exp-${idx}`,
//       company: exp.company || "",
//       name: exp.company || "",
//       position: exp.jobTitle || "",
//       location: exp.location || "",
//     })),
//     educations: (() => {
//       // Use education array if available, otherwise create from learningJourney
//       const educationArray = profileData.education || [];
//       if (educationArray.length === 0 && profileData.learningJourney) {
//         // Create a single education entry from learningJourney
//         const lj = profileData.learningJourney;
//         if (lj.educationLevel || lj.fieldOfStudy) {
//           return [{
//             id: 'learning-journey',
//             institution: lj.institution || "",
//             degree: lj.degree || lj.educationLevel || "",
//             educationLevel: lj.educationLevel || "",
//             field: lj.fieldOfStudy || "",
//             fieldOfStudy: lj.fieldOfStudy || "",
//             specialization: lj.specialization || "",
//             startDate: { month: "", year: "" },
//             endDate: { month: "", year: "" },
//             grade: "",
//             description: "",
//             currentlyStudying: true,
//           }];
//         }
//       }
//       return educationArray;
//     })().map((edu, idx) => {
//       // Parse date strings to month/year objects
//       const parseDate = (dateStr) => {
//         // Return empty if dateStr is falsy or not a string
//         if (!dateStr || typeof dateStr !== 'string') {
//           return { month: "", year: "" };
//         }
//         // Handle formats: "YYYY-MM", "YYYY-MM-DD", "YYYY"
//         const parts = dateStr.split("-");
//         const year = parts[0] || "";
//         const month = parts[1] || "";
//         const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         return {
//           month: month ? monthNames[parseInt(month)] || month : "",
//           year: year || "",
//         };
//       };

//       // Store original endDate string before parsing to check if currently studying
//       const originalEndDate = typeof edu.endDate === 'string' ? edu.endDate : "";
//       const isCurrentlyStudying = originalEndDate === "" || 
//                                    originalEndDate.toLowerCase() === "present" || 
//                                    false;

//       return {
//         id: edu._id || `edu-${idx}`,
//         institution: edu.institution || "",
//         degree: edu.degree || "",
//         educationLevel: edu.degree || "", // Map degree to educationLevel
//         field: edu.field || "",
//         fieldOfStudy: edu.field || "", // Map field to fieldOfStudy
//         specialization: edu.specialization || "",
//         startDate: parseDate(edu.startDate),
//         endDate: parseDate(edu.endDate),
//         grade: edu.grade || "",
//         description: edu.description || "",
//         currentlyStudying: isCurrentlyStudying,
//       };
//     }),
//     college: (profileData.education || []).map((edu, idx) => ({
//       id: edu._id || `edu-${idx}`,
//       name: edu.institution || "",
//       degree: edu.degree || "",
//       field: edu.field || "",
//     })),
//     skills: (() => {
//       // Get skills from multiple sources
//       const skillsArray = Array.isArray(profileData.skills) ? profileData.skills : [];
//       // Also check recentExperience.skills (comma-separated string)
//       if (profileData.recentExperience?.skills) {
//         const skillsFromRecent = profileData.recentExperience.skills
//           .split(',')
//           .map(s => s.trim())
//           .filter(s => s.length > 0);
//         // Merge and deduplicate
//         const allSkills = [...skillsArray, ...skillsFromRecent];
//         return [...new Set(allSkills)];
//       }
//       return skillsArray;
//     })(),
//     interests: Array.isArray(profileData.interests) ? profileData.interests : [],
//     // Edge/Overview data
//     proficiency: profileData.skills?.length > 0 ? Math.min(70 + (profileData.skills.length * 5), 95) : 70,
//     mentorConnections: profileData.followingCount || 0,
//     totalInterviews: 0, // This would come from interview tracking API if available
//     successfulInterviews: 0,
//     failedInterviews: 0,
//     // Activity data (posts, comments, likes, reposts)
//     posts: profileData.posts || [],
//     activities: profileData.activities || [],
//     comments: profileData.comments || [],
//     likes: profileData.likes || [],
//     reposts: profileData.reposts || [],
//     projects: (profileData.projects || []).map((proj, idx) => ({
//       id: proj._id || `proj-${idx}`,
//       title: proj.title || "",
//       description: proj.description || "",
//       url: proj.url || "",
//       startDate: proj.startDate || "",
//       endDate: proj.endDate || "",
//       bullets: Array.isArray(proj.bullets) ? proj.bullets : [],
//     })),
//     certifications: (profileData.certificates || []).map((cert, idx) => {
//       // Parse date strings to month/year objects
//       const parseDate = (dateStr) => {
//         // Return empty if dateStr is falsy or not a string
//         if (!dateStr || typeof dateStr !== 'string') {
//           return { month: "", year: "" };
//         }
//         // Handle formats: "YYYY-MM", "YYYY-MM-DD", "YYYY"
//         const parts = dateStr.split("-");
//         const year = parts[0] || "";
//         const month = parts[1] || "";
//         const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         return {
//           month: month ? monthNames[parseInt(month)] || month : "",
//           year: year || "",
//         };
//       };

//       return {
//         id: cert._id || `cert-${idx}`,
//         name: cert.name || "",
//         issuer: cert.issuer || "",
//         provider: cert.issuer || "", // Map issuer to provider
//         issueDate: parseDate(cert.issueDate),
//         expiryDate: parseDate(cert.expiryDate),
//         credentialUrl: cert.credentialUrl || "",
//         credentialId: cert.credentialId || "", // Map credentialId
//         certificateId: cert.credentialId || "", // Also map to certificateId for compatibility
//       };
//     }),
//     verified: profileData.verified || false,
//   };
// };

// export default function UserProfilePage({ params }) {
//   const { username } = use(params);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const currentUser = useSelector((state) => state.users?.currentUser);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!username) {
//         setError("Username is required");
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       setError(null);
      
//       try {
//         const response = await fetch(`${API_BASE_URL}/profile/username/${username}`);
//         const data = await response.json();

//         console.log("Profile API Response:", { 
//           success: data.success, 
//           hasData: !!data.data,
//           username,
//           fullResponse: data
//         });

//         if (response.ok && data.success && data.data) {
//           console.log("Raw Profile Data:", JSON.stringify(data.data, null, 2));
//           const transformedUser = transformProfileData(data.data);
//           console.log("Transformed User:", transformedUser);
//           console.log("Transformed User Details:", {
//             hasAbout: !!transformedUser.about,
//             educationsCount: transformedUser.educations?.length || 0,
//             experiencesCount: transformedUser.experiences?.length || 0,
//             certificationsCount: transformedUser.certifications?.length || 0,
//             skillsCount: transformedUser.skills?.length || 0,
//             projectsCount: transformedUser.projects?.length || 0,
//           });
          
//           if (transformedUser) {
//             setUser(transformedUser);
//           } else {
//             setError("Failed to transform profile data");
//           }
//         } else {
//           const errorMsg = data.message || "Profile not found";
//           console.error("Profile fetch error:", errorMsg);
//           setError(errorMsg);
//           toast.error(errorMsg);
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         const errorMsg = "Failed to load profile. Please try again.";
//         setError(errorMsg);
//         toast.error(errorMsg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [username]);

//   if (loading) {
//     return <GlobalLoader text="Loading Profile..." />;
//   }

//   if (error || !user) {
//     return (
//       <div className="min-h-screen bg-[#070C11] text-white p-4 sm:p-6">
//         <h2 className="text-xl sm:text-2xl font-semibold">User not found</h2>
//         <p className="text-gray-400 mt-2">
//           {error || `No profile exists for ${username}.`}
//         </p>
//       </div>
//     );
//   }

//   const isOwner = currentUser?.id === user?.id || currentUser?.username === user?.username;

//   return (
//     <div className="bg-[#070C11] min-h-screen text-white p-4 sm:p-6 lg:p-8">
//       <div className="flex flex-1 px-16 flex-col md:flex-row transition-all gap-12 lg:gap-20 duration-300">
//         <section className="w-full lg:w-2/3 space-y-6">
//           <ProfileHeader user={user} />
//           <DesignerProfile user={user} />
//           <Edge user={user} />
//         </section>

//         <aside className="w-full lg:max-w-[300px] flex flex-col gap-4">
//           {isOwner && <ProfileAnalytics user={user} />}
//           <CompanySuggestion profileUser={user} />
//           <PeopleYouMayKnow users={user.following || []} currentUserId={user.id} limit={2} />
//           <JoinCommunities />
//         </aside>
//       </div>
//     </div>
//   );
// }