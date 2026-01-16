
"use client";

import { Bookmark, MoreHorizontal } from "lucide-react";
import { PiShareFatThin } from "react-icons/pi";

export default function TrendingJobs() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "AmbiSpine Technologies",
      logo: "/company1.png",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "SpreadNext",
      logo: "/company2.png",
    },
  ];

  return (
    <section className="w-full px-4">
      <h2 className="text-lg font-medium text-black mb-3 px-2 sm:px-4">
        Trending Jobs For You
      </h2>

      {/* 
        ✔ Mobile: 1 column 
        ✔ Desktop (sm and above): EXACTLY 2 columns (like before)
      */}
      <div className="rounded-xl p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="relative border border-[#cccccc] rounded-xl p-4 flex flex-col gap-4 bg-white hover:shadow-md transition-shadow"
          >
            {/* Menu */}
            <button className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition">
              <MoreHorizontal size={18} />
            </button>

            {/* Top Section */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center">
                <img
                  src={job.logo}
                  alt={job.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              <div className="flex flex-col">
                <p className="font-semibold text-gray-900">{job.title}</p>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 text-gray-600">
              <button className="hover:text-gray-800 transition">
                <Bookmark size={18} />
              </button>

              <button className="hover:text-gray-800 transition">
                <PiShareFatThin size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}