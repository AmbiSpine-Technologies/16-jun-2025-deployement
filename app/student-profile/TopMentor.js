"use client";

import { useState } from "react";
import { User } from "lucide-react";
import Button from "../components/Button";
import { Button2 } from "../components/button/Button2";
import LinkButton from "../components/button/Button";
import FollowButtonUniversal from "../components/FollowButton";
import CollabButton from "../components/CollabButton";

// Dummy data (will be replaced by backend later)
const initialMentors = [
  {
    id: 1,
    name: "Default Mentor 1",
    description:
      "Lorem Ipsum is a visionary thinker exploring paths where tradition meets innovation. Driven by curiosity, anchored in values, and inspired by the future, shaping stories of progress and resilience.",
    avatar: null,
  },
  {
    id: 2,
    name: "Default Mentor 2",
    description:
      "Lorem Ipsum is a visionary thinker exploring paths where tradition meets innovation. Driven by curiosity, anchored in values, and inspired by the future, shaping stories of progress and resilience.",
    avatar: null,
  },
];

export default function TopMentors() {
  const [mentors, setMentors] = useState(initialMentors);

  return (
    <section className="w-full  border-[0.3px] border-[#cccccc] rounded-2xl bg-white p-5">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900">Top Mentors</h2>

      {/* Mentor List */}
      <div className="mt-5 space-y-2">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="flex gap-1">
            {/* Avatar */}
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
              {mentor.avatar ? (
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="text-gray-500" size={22} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 mb-2">
              <h3 className="text-sm font-medium text-gray-900">
                {mentor.name}
              </h3>
              <p className="mt-1 text-xs text-gray-500 leading-tight line-clamp-2">
                {mentor.description}
              </p>

            </div>

            {/* Collab Button */}
            <CollabButton
              collabclass="!h-8 !w-20"
            />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 flex justify-center">
        <Button2
          name="View all"
          className="!rounded-full !px-6 !py-2 !text-sm"
          onClick={() => {
            // Later: route to mentors page or open modal
            console.log("View all mentors");
          }}
        />
      </div>
    </section>
  );
}
