"use client";

import { useCallback, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button2 } from "../../components/button/Button2";
import { PostCardComman } from '../../components/common/PostCardComman';

export default function ReusableSection({ 
  title = "Activity",      
  tabs = [],    
  goToTab, // Yeh prop tab switch karne ke liye hai
  allData = {},            
  showAllPath = "/profile",
  gridCols = "md:grid-cols-2" 
}) {
  const [expanded, setExpanded] = useState({});
  // FIX: Agar tabs empty hain to default "Post" ya data ki pehli key uthayein
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].label);
    } else {
      // Agar tabs nahi hain, to allData ki pehli key (jaise 'Post') set karein
      setActiveTab(Object.keys(allData)[0] || "");
    }
  }, [tabs, allData]);

  const toggleExpand = useCallback((id) => 
    setExpanded((p) => ({ ...p, [id]: !p[id] })), []);

  // Data Fetching Logic
  const allPostsForTab = allData[activeTab] || [];
  const currentPosts = allPostsForTab.slice(0, 2); 

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        
        {tabs.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {tabs.map(({ label }) => (
              <Button2
                name={label}
                key={label}
                onClick={() => setActiveTab(label)}
                classNameborder={`capitalize transition ${activeTab === label
                  ? "!text-white !bg-[#0668E0] !font-bold" : "!text-[#0668E0]"
                }`}
              >
                {label}
              </Button2>
            ))}
          </div>
        )}
      </div>

      {currentPosts.length > 0 ? (
        <>
          <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
            {currentPosts.map((post) => (
              <PostCardComman
                key={post.id}
                post={post}
                isExpanded={expanded[post.id]}
                onToggleExpand={toggleExpand}
              />
            ))}
          </div>

          <div className="mt-6 text-center border-b pb-2 border-[#cccccc] pt-4">
            <button
              onClick={() =>  goToTab ? goToTab() : (window.location.href = showAllPath)}
              className="inline-flex hover:cursor-pointer items-center gap-2 px-6 text-gray-500 font-semibold text-sm hover:text-black transition-colors"
            >
              Show all {title}
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>No content available.</p>
        </div>
      )}
    </section>
  );
}