"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import React from "react";
import AdvertisementCard from "../components/AdvertisementCard";
import CollabNetworkCard  from './CollabNetworkCard';
import {
  getFriendSuggestions,
  followUser,
  unfollowUser
} from "@/app/utils/connectionsApi";

import { getAllCompanies } from "@/app/utils/companyApi";
import { getAllColleges } from "@/app/utils/collegeApi";
import FollowButtonUniversal from '@/app/components/FollowButton';

export default function CollabsPage() {
  const router = useRouter();
  const tabs = ["People for you", "Companies for you", "Institute for you", "Invitations"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
const [people, setPeople] = useState([]);
const [companies, setCompanies] = useState([]);
const [institutes, setInstitutes] = useState([]);
const [loading, setLoading] = useState(true);


  const collabs = {
  "People for you": people,
  "Companies for you": companies,
  "Institute for you": institutes,
  Invitations: []
};
  const ads = [
    {
      companyName: "Spreadnext India",
      tagline: "Where Community meets Careers.",
      logo: "https://img.icons8.com/color/96/company.png",
      link: "https://google.com",
    },
   
  ];

  useEffect(() => {
  const fetchCollabs = async () => {
    setLoading(true);
    try {
      // PEOPLE
      const usersRes = await getFriendSuggestions(10);
      if (usersRes.success) {
        const mapped = usersRes.data.map(item => {
          const u = item.user;
          const p = u.profile || {};
          return {
            id: u._id,
            name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
            role: p.recentExperience?.jobTitle || "Professional",
            avatar: p.profileImage || "/default-user-profile.svg",
            type: "user"
          };
        });
        setPeople(mapped);
      }

      // COMPANIES
      const compRes = await getAllCompanies({}, 1, 10);
      if (compRes.success) {
        setCompanies(compRes.data.map(c => ({
          id: c._id,
          name: c.companyName,
          role: c.tagline || "Company",
          avatar: c.logo || "/Company's icon.svg",
          type: "company"
        })));
      }

      // COLLEGES
      const collegeRes = await getAllColleges(1, 10);
      if (collegeRes.success) {
        setInstitutes(collegeRes.data.map(c => ({
          id: c._id,
          name: c.name,
          role: c.type || "Institute",
          avatar: c.logo || "/college icon.svg",
          type: "college"
        })));
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  fetchCollabs();
}, []);

  const handleViewProfile = (id) => router.push(`/profile/${id}`);
  const handleCollaborate = (name) => console.log(`Collaboration request sent to ${name}`);

  return (
    <div className=" bg-[#FAFAFA] ">
    <div className="max-w-7xl mx-auto px-4 py-6 ">
<div className="flex">
  <div className="flex-1  p-6 mt-6">
        {/* <h1 className="text-3xl text-gray-800 font-semibold m-6">Collabs</h1> */}

        {/* tabs */}
        <div className="flex bg-white rounded-2xl border border-[#e5e7ed] p-1 gap-1 mb-3">
          {tabs.map((tab) => (
            <button suppressHydrationWarning
              key={tab}
              onClick={() => setActiveTab(tab)}
                 className={`flex-1 px-3 py-3 text-sm font-medium transition-colors hover:cursor-pointer ${activeTab === tab
                      ? "text-blue-600 border-b-2 -mb-[5px] border-blue-600"
                      : "text-gray-600 "
                      }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* list section */}
        <div className=" border-[0.3px] my-3 border-[#cccccc] !border-b-0  h-[calc(100vh-180px)] overflow-y-auto bg-[#FFF] p-4 rounded-4xl !rounded-br-none  !rounded-bl-none ">
          {collabs[activeTab].length === 0 ? (
            <div className="flex flex-col justify-center items-center  text-gray-500 gap-3">
              <img src="/empty-icon.svg" className="h-72 mt-10" />
              <p>No collaborations here right now</p>
              <span>Something exciting is coming!</span>
            </div>
          ) : (
            <div className="space-y-5 ">
              {collabs[activeTab].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div
                    onClick={() => handleViewProfile(item.id)}
                    className="flex items-center gap-4 hover:cursor-pointer"
                  >
                    <img
                      src={item.avatar}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-700 font-roboto text-lg hover:text-blue-600">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-600">{item.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewProfile(item.id)}
                      className="px-3 py-1 hover:cursor-pointer  rounded-lg  text-gray-700 hover:underline transition"
                    >
                      View Profile
                    </button>
                    <FollowButtonUniversal targetId={item.id} />
                  
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
 {/* right sidebar ads */}
      <div className="w-[30%] space-y-3  mt-12 ">
    <div className="">
            <CollabNetworkCard />
          {ads.map((ad, i) => (
            <AdvertisementCard
              key={i}
              companyName={ad.companyName}
              tagline={ad.tagline}
              logo={ad.logo}
              link={ad.link}
            />
          ))}
          </div>
      </div>
</div>

        </div>
      {/* main left section */}
    

     
    </div>
  );
}