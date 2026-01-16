// import { 
//    Briefcase,
// } from 'lucide-react';
// export const JobsTab = () => (
//   <div className="space-y-4">
//     {/* Hiring Banner */}
//     <div className="bg-white p-4 flex flex-col sm:flex-row items-center pt-10 justify-between gap-4">
//       <div className="flex items-center gap-4">
//         <div className="w-12 h-12 bg-[#f8c77e] rounded-md flex items-center justify-center text-white shadow-sm">
//           <Briefcase className="text-gray-700" size={24} fill="white" />
//         </div>
//         <div>
//           <h3 className="font-bold text-gray-900">Are you hiring?</h3>
//           <p className="text-sm text-gray-600">
//             Attract qualified applicants by posting and showcasing jobs on your
//             page.
//           </p>
//         </div>
//       </div>
//       <button className="whitespace-nowrap border border-[#0a66c2] text-[#0a66c2] px-4 py-1.5 rounded-full font-semibold hover:bg-blue-50 transition">
//         Post a free job
//       </button>
//     </div>

//     {/* Empty State */}
//     <div className="bg-white rounded-xl border border-gray-300 p-12 shadow-sm flex flex-col items-center justify-center text-center">
//       <div className="w-16 h-16 bg-[#f8c77e] rounded-xl flex items-center justify-center mb-4 relative">
//         <Briefcase className="text-gray-700" size={32} fill="white" />
//         <div className="absolute top-0 right-0 w-full h-full bg-white opacity-20 rounded-xl"></div>
//       </div>
//       <h3 className="text-lg font-semibold text-gray-900">
//         There are no open job posts for your company right now.
//       </h3>
//       <p className="text-gray-500 mt-2 text-sm">
//         Post a job to attract talent interested in your company.
//       </p>
//     </div>
//   </div>
// );


"use client";
import React from "react";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link"
/* ================= DUMMY JOBS DATA ================= */
const DUMMY_JOBS = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    location: "Indore, MP (Remote)",
    type: "Full-time",
    postedAt: "2 days ago",
    applicants: 45
  },
  {
    id: 2,
    role: "UI/UX Designer",
    location: "Bangalore, India",
    type: "Contract",
    postedAt: "5 hours ago",
    applicants: 12
  }
];

export const JobsTab = ({ jobs = DUMMY_JOBS }) => {
  const hasJobs = jobs && jobs.length > 0;

  return (
    <div className="mt-6">
      {/* 1. Hiring Banner - Hamesha dikhega taaki admin job post kar sake */}
      <div className="bg-white p-6 border-[0.5px] border-[#cccccc] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 ">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f8c77e] rounded-xl flex items-center justify-center shadow-inner">
            <Briefcase className="text-gray-700" size={24} fill="white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Are you hiring?</h3>
            <p className="text-sm text-gray-600">
              Attract qualified applicants by posting and showcasing jobs on your page.
            </p>
          </div>
        </div>
        <button className="whitespace-nowrap border-2 border-[#0013E3] text-[#0013E3] px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-all active:scale-95">
          Post a free job
        </button>
      </div>

      {/* 2. Condition: Jobs List or Empty State */}
      {hasJobs ? (
        <div className="grid grid-cols-1 gap-3">
          <h2 className="text-md font-bold text-gray-800 px-1 mt-2">Active Openings</h2>
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white border border-[#cccccc] p-5 rounded-2xl  transition-colors cursor-pointer group shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 ">
                    {job.role}
                  </h4>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {job.type}
                    </span>
                  </div>
                </div>
                <ArrowRight size={18} className="text-gray-400 group-hover:text-[#0013E3] transition-transform group-hover:translate-x-1" />
              </div>
              
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <p className="text-[11px] text-gray-400">Posted {job.postedAt}</p>
                <Link href="/company/hiring-talent/status/applicationview" className="text-xs font-bold text-[#0013E3] hover:underline">
                  Applied applicants ({job.applicants})
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 3. Empty State (Wahi jo aapne diya tha) */
        <div className="bg-white rounded-2xl border border-gray-300 p-12 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#f8c77e] rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
            <Briefcase className="text-gray-700 z-10" size={32} fill="white" />
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            There are no open job posts for your company right now.
          </h3>
          <p className="text-gray-500 mt-2 text-sm max-w-xs">
            Post a job to attract talent interested in your company.
          </p>
          
          {/* Aapki default style button use ki hai */}
          <button className="mt-6 rounded-full h-11 px-8 font-semibold bg-[#0013E3] text-white hover:bg-blue-800 transition-all">
            Post a job
          </button>
        </div>
      )}
    </div>
  );
};