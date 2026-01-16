"use client";
import { useState } from "react";
import {Avatar} from "../components/common/Avatar"; // Make sure path is correct
import FollowButtonUniversal from "../components/FollowButton"; // Make sure path is correct
import Link from "next/link";
import TruncateText from "../components/common/TruncateText";
import ParseMentions from "../components/common/ParseMentions";

// Helper Component for "See More" logic
const ExpandableText = ({ text, limit = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= limit) return <p className="text-sm text-gray-600 mt-1">{text}</p>;

  return (
    <p className="text-sm text-gray-600 leading-snug mt-1">
      {isExpanded ? text : `${text.slice(0, limit)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-500 hover:underline ml-1 text-xs font-medium"
      >
        {isExpanded ? "show less" : "+more"}
      </button>
    </p>
  );
};

export default function TrendingPicks() {
  // Mock Data (Real-time scenario mein ye API se aayega)
  const topics = [
    {
      id: "user_101", // Unique ID for Follow Logic
      name: "Prabha Shrinivasan",
      role: "Content writer | Seo",
      title: "Happiness Is the Key Achievement of Life.",
      desc: `Happiness In every generation, through changing traditions, shifting technologies, and evolving dreams, one truth has quietly guided the human journey. It is not money or fame, but the peace within.`,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
      socialProof: {
        name: "Aditya",
        count: 20,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=faces",
      },
    },
    {
      id: "user_102",
      name: "Rahul Verma",
      role: "Product Designer",
      title: "Design is not just what it looks like.",
      desc: `Design is how it works. Good design adds value faster than it adds cost. In the digital age, empathy is the new currency for designers.`,
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
      socialProof: {
        name: "Simran",
        count: 45,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=faces",
      },
    },
  ];

  return (
    <section className="w-full max-w-3xl px-8 py-2 bg-white font-sans rounded-xl ">
      {/* Header */}
      <h2 className="text-xl font-semibold text-slate-700 mb-6">
        Trending picks for you
      </h2>

      <div className="flex flex-col gap-8">
        {topics.map((item) => (
          <div key={item.id} className="flex gap-4 items-start">
            
            {/* Left: Main Profile Image */}
            <Avatar
              src={item.img}
              name={item.name}
              // Updated to use your new Avatar size logic
              className="border w-16 h-16 border-gray-100 flex-shrink-0"
            />

            {/* Right: Content Area */}
            <div className="flex-1 mt-5">
              <div className="flex justify-between items-start">
                {/* Name & Role */}
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#939CA1] mt-0.5">{item.role}</p>
                </div>

                {/* Follow Button Integrated Here */}
                <FollowButtonUniversal 
                  targetId={item.id} 
                  targetType="user"
                />
              </div>

              {/* Title */}
              <p className="text-sm font-bold text-gray-800 mt-2">
                {item.title}
              </p>

              {/* Description with Logic */}
               <TruncateText text={item.desc} >
                            {(limit) => <ParseMentions text={item.desc.slice(0, limit)} />}
                      </TruncateText>
              {/* <ExpandableText  limit={90} /> */}

              {/* Social Proof (Bottom small icon) */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex -space-x-2">
    
    {/* Static Icon - Using Avatar component */}
    <Avatar 
      src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
      
      name="Generic Icon" // Alt text ke liye zaroori hai
      // Extra styling jo img tag par thi, yahan pass kar di
      className="opacity-60 border !w-6 !h-6  border-white bg-gray-100 p-0.5" 
    />
    
    {/* User Icon - Using Avatar component */}
    <Avatar 
      src={item.socialProof.avatar}
       // New Extra Small size (w-5 h-5)
      name={item.socialProof.name} // Initials fallback ke liye name zaroori hai
      className="border !w-6 !h-6 border-white" // White border overlap effect ke liye
    />

  </div>
                <span className="text-xs text-gray-500 font-medium">
                  {item.socialProof.name}{" "} and 
                  <span className="text-blue-600 px-2">
                    +{item.socialProof.count} more
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Right See More Link */}
      <div className="flex justify-end mt-4">
        <Link href="/trending" className="text-blue-500 text-sm font-medium hover:underline flex items-center">
          See all picks
        </Link>
      </div>
    </section>
  );
}