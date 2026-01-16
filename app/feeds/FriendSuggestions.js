"use client";
import { useState } from "react";
import CollabButton from "../components/CollabButton";
import { Avatar } from "../components/common/Avatar";

const suggestionsData = [
  {
    id: 1,
    name: "Maxwell Smith",
    username: "@maxwellsmith",
    image:
      "https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "Vermillion D. Gray",
    username: "@vermilliongray",
    image:
      "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "Mai Senpai",
    username: "@maisenpai",
    image:
      "https://images.unsplash.com/photo-1688888745596-da40843a8d45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Azunyan U. Wu",
    username: "@azunyanudesu",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "Oarack Babama",
    username: "@obama21",
    image:
      "https://images.unsplash.com/photo-1762793193633-c26f3d34e710?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
];

export default function FriendSuggestions() {
  const [list, setList] = useState(suggestionsData);

  const handleCollab = (id) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCollabing: !item.isCollabing } : item
      )
    );
  };

  return (
    <div className="w-full items-center justify-between bg-[#ffffff] border-[0.3px] border-[#cccccc] rounded-2xl py-2">
      {/* Header */}
      <div className="flex items-center justify-between my-4 md:px-7 border-b pb-3 border-[#cccccc]">
        <h2 className="text-gray-800 font-semibold text-md">
          Friend Suggestions
        </h2>
        <button className="text-[#5063F4] text-sm font-medium hover:underline">
          See All
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3 md:px-7">
        {list.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between pb-4 last:border-b-0"
          >
            <div className="flex gap-3 items-center">
              <Avatar
                src={item.image}
                className="w-10 h-10 rounded-full object-cover"
                alt={item.name}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">{item.username}</p>
              </div>
            </div>

            <CollabButton
              isCollabing={item.isCollabing}
              onClick={() => handleCollab(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}