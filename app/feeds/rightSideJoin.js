"use client";
import { useState } from "react";
import { Buttonborder } from "../components/Button";

const suggestionsData = [
  {
    id: 1,
    name: "Coding Cup",
    description:
      "Most platform treat company ads mere banners or boosted posts. We believe in quality content.",
    image:
      "https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Gaming Club",
    description:
      "Most platform treat company ads mere banners or boosted posts. We believe in quality content.",
    image:
      "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Mai Senpai",
    description:
      "Most platform treat company ads mere banners or boosted posts. We believe in quality content.",
    image:
      "https://images.unsplash.com/photo-1688888745596-da40843a8d45?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Azunyan U. Wu",
    description:
      "Most platform treat company ads mere banners or boosted posts. We believe in quality content.",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Oarack Babama",
    description:
      "Most platform treat company ads mere banners or boosted posts. We believe in quality content.",
    image:
      "https://images.unsplash.com/photo-1762793193633-c26f3d34e710?w=600&auto=format&fit=crop&q=60",
  },
];

export default function JoinCommunity() {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-white border border-gray-300 rounded-2xl py-3 px-4 md:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-[#cccccc] pb-3">
        <h2 className="text-gray-800 font-semibold text-base">
          Trending Community
        </h2>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          See All
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-5">
        {suggestionsData.map((item) => {
          const isExpanded = expanded[item.id];
          const previewText =
            item.description.length > 60
              ? item.description.slice(0, 60) + "..."
              : item.description;

          return (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3"
            >
              <div className="flex gap-3 items-start">
                <img
                  src={item.image}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />

                <div className="max-w-[160px] sm:max-w-[220px]">
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>

                  {/* Description (1–2 lines + See More) */}
                  <p className="text-xs text-gray-600 leading-snug">
                    {isExpanded ? item.description : previewText}
                  </p>

                  {item.description.length > 40 && (
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="text-[11px] text-blue-600 font-medium hover:underline"
                    >
                      {isExpanded ? "See less" : "See more"}
                    </button>
                  )}
                </div>
              </div>

              <Buttonborder name="Join" />
            </div>
          );
        })}
      </div>
    </div>
  );
}