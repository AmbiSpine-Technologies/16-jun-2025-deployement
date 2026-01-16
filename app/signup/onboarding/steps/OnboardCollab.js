
"use client";
import React, { useState, useEffect } from "react";
import CollabButton from "../../../components/CollabButton";
import FollowButtonUniversal from "../../../components/FollowButton";
import { getFriendSuggestions,  followUser, unfollowUser } from "../../../utils/connectionsApi";
import { getAllCompanies } from "../../../utils/companyApi";
import { toast } from "react-toastify";
import { GlobalLoader } from "@/app/components/Loader";
import { X } from "lucide-react";
import { Check } from "@mui/icons-material";
import { getAllColleges } from "../../../utils/collegeApi";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function CollabStep({ data, updateData }) {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);


const handleFollowToggle = async (id, type) => {
  const keyMap = {
    user: "followedUsers",
    company: "followedCompanies",
    college: "followedColleges",
  };

  const targetKey = keyMap[type];
  // Yahan check karein ki data.collabConnections hai ya seedha data
  const currentList = data?.collabConnections?.[targetKey] || data?.[targetKey] || [];
  const isFollowed = currentList.includes(id);

  // Optimistic Update
  const newList = isFollowed
    ? currentList.filter((itemId) => itemId !== id)
    : [...currentList, id];

  // Parent ko update bhejein
  updateData("collabConnections", {
    ...data,
    [targetKey]: newList,
  });

  try {
    let result;
    // API Call
    if (isFollowed) {
     result = await unfollowUser(id);
    } else {
     result =  await followUser(id);
    }
      if (!result.success) throw new Error(result.message);
    toast.success(result.message);
  } catch (err) {
    console.error("API Error:", err);
    // Fail hone par rollback
    updateData("collabConnections", { ...data, [targetKey]: currentList });
  }
};
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users (friend suggestions) - handle "Invalid user" error gracefully during onboarding
        try {
          const usersResult = await getFriendSuggestions(10);
          if (usersResult.success && usersResult.data) {
            setUsers(usersResult.data);
          } else if (usersResult.message?.includes("Invalid user") || usersResult.message?.includes("Unauthorized")) {
            // During onboarding, user might not be fully set up yet - this is OK
            console.log("User suggestions not available during onboarding - using empty list");
            setUsers([]);
          }
        } catch (userError) {
          console.log("Friend suggestions not available during onboarding:", userError.message);
          setUsers([]);
        }

        // Fetch companies
        try {
          const companiesResult = await getAllCompanies({}, 1, 10);
          if (companiesResult.success && companiesResult.data) {
            setCompanies(companiesResult.data);
          }
        } catch (companyError) {
          console.log("Companies not available:", companyError.message);
          setCompanies([]);
        }

        // Fetch colleges (using getMyColleges - will return empty if user doesn't own colleges)
        try {
          const collegesResult = await getAllColleges(1, 10);
          if (collegesResult.success && collegesResult.data && collegesResult.data.length > 0) {
            setColleges(collegesResult.data);
          }
        } catch (collegeError) {
          console.log("Colleges endpoint not available, using defaults");
        }
      } catch (error) {
        console.error("Error fetching onboarding data:", error);
        // Don't show error toast during onboarding - user is still setting up
        // toast.error("Failed to load suggestions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


 
  const people = users?.length > 0
  ? users.map((item) => {
      // Backend se aa raha 'user' object nikaalein
      const u = item.user; 
      // Profile details nikaalein (jo populate ho kar aayi hain)
      const p = u.profile || {}; 

      return {
        id: u._id,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.userName,
        // Profile table ke andar se image nikaalein
        avatar: p.profileImage || "/default-user-profile.svg",
        // Profile table se experience ya headline nikaalein
        desc: p.recentExperience?.jobTitle || "Professional",
        headline: p.profileSummary || "Connect to grow.",
        type: "user",
      };
    })
  : [];
  // Transform companies data
  const companyList = companies?.length
    && companies.map((c) => ({
        id: c._id || c.id,
        name: c.companyName || c.name,
        avatar: c.logo || c.companyLogo || "/Company's icon.svg",
        desc: c.tagline || c.industry || "Innovating",
        headline: c.about || c.description || "Join us.",
        type: "company",
      }));

  // Transform colleges data
  const collegesList = colleges?.length
    && colleges.map((c) => ({
        id: c._id || c.id,
        name: c.name,
        avatar: c.logo || c.communityIcon || "/college icon.svg",
        desc: c.type || c.category || "Higher Education",
        headline: c.description || c.headline || "Education Excellence",
        type: "college",
      }));

  if (loading) {
    return (
      <div >
    <GlobalLoader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <SectionBox title="People"  items={people} onAction={handleFollowToggle} followedList={data?.collabConnections?.followedUsers || []} />
        <SectionBox title="Companies" items={companyList} onAction={handleFollowToggle} followedList={data?.collabConnections?.followedCompanies || []} />
        <SectionBox title="Colleges & Universities" items={collegesList} onAction={handleFollowToggle} followedList={data?.collabConnections?.followedColleges || []} />
      </div>
    </div>
  );
}

function SectionBox({ title, items, onAction, followedList }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="p-5 border-[0.3px] border-[#cccccc] rounded-2xl">
      <h3 className="font-semibold text-blue-900 mb-4 text-center">{title}</h3>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[400px] custom-scroll pr-2">
        {items.map((x, index) => {

          const isFollowed = followedList?.includes(x.id);       
          return (
            <div key={x.id || index} className="w-full p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <img src={x.avatar} className="w-8 h-8 rounded-full object-cover" alt={x.name} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">{x.name}</h4>
                  <p className="text-gray-600 text-[12px] line-clamp-1">{x.desc}</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs line-clamp-1 mb-3 min-h-[30px]">{x.headline}</p>
              
              <div className="mt-auto" >
                
                {/* {x.type === "user" ? (
                  <CollabButton targetId={x.id} isFollowing={isFollowed} />
                ) : (
   
                    <button
  onClick={() => onAction(x.id, x.type)} // <-- Yahan x.type add kiya
  className={`text-[12px] flex items-center justify-center gap-1 px-4 py-1 border rounded-full font-semibold transition-all
    ${isFollowed ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
>
  {isFollowed ? (
    <><X size={14} /> <span>Unfollow</span></>
  ) : (
    <><Check size={14} /> <span>Follow</span></>
  )}
</button>
                    

     
                )} */}

<button
  onClick={() => onAction(x.id, x.type)} // <-- Yahan x.type add kiya
  className={`text-[12px] flex items-center hover:cursor-pointer justify-center gap-1 px-4 py-1 border rounded-full font-semibold transition-all
    ${isFollowed ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
>
  {isFollowed ? (
    <><X size={14} /> <span>Unfollow</span></>
  ) : (
    <><Check size={14} /> <span>Follow</span></>
  )}
</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}