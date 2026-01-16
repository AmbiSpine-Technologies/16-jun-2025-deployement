"use client";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import FollowButtonUniversal from "../components/FollowButton";
import LinkButton from "../components/button/Button";

export default function CompanySuggestion({ profileUser }) {
  const dispatch = useDispatch();
  const { currentUser, companies } = useSelector((state) => state.users);

  const activeUser = profileUser || currentUser;

  // Early return if no user or companies
  if (!activeUser || !companies?.length) {
    return (
      <div className="bg-white  border-[0.3px] border-[#cccccc] rounded-2xl p-4 px-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-semibold text-gray-800">
            Suggest for you
          </h2>
        </div>
        <p className="text-gray-600 text-sm">No company matches found.</p>
      </div>
    );
  }

  const recommended = companies
    ?.map((c) => {
      const skillScore = (c.tags || []).filter((tag) =>
        (activeUser.skills || []).includes(tag)
      ).length;

      const fieldMatch = (activeUser.interests || []).some((interest) =>
        c.field?.toLowerCase().includes(interest.toLowerCase())
      );

      const locationMatch = c.location === activeUser.location ? 2 : 0;

      const mutualConnections = (c.employees || []).filter((id) =>
        (activeUser.following || []).includes(id)
      ).length;

      const popularityScore = Math.min((c.followers?.length || 0) / 1000, 5);

      const totalScore =
        skillScore * 4 +
        (fieldMatch ? 3 : 0) +
        locationMatch * 2 +
        mutualConnections * 1 +
        popularityScore * 0.5;

      return { ...c, totalScore, mutualConnections };
    })
    .filter((c) => c.totalScore > 0)
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="bg-white  border-[0.3px] border-[#cccccc] rounded-2xl p-4 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[16px] font-semibold text-gray-800">
          Suggest for you
        </h2>
        
        <Link href="/collabs">
          <button className="text-sm font-medium text-[#4F46E5] hover:underline">
            See all
          </button>
        </Link>
      </div>

      {recommended.length ? (
        recommended.slice(0, 5).map((c) => {
          const isFollowing = (c.followers || []).includes(activeUser.id);

          return (
            <div
              key={c.id}
              className="flex items-center justify-between py-3 border-b last:border-b-0"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <img
                  src={c.logo}
                  alt={c.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {c.name}
                  </h3>
                  <p className="text-xs text-gray-500  max-w-[180px] line-clamp-3">
                    {c.about || c.field}
                  </p>
                </div>
              </div>

              {/* Right */}
              <FollowButtonUniversal
                targetId={c.id}
                targetType="company"
                followclassName="!h-fit"
              />
            </div>
          );
        })
      ) : (
        <p className="text-gray-600 text-sm">No company matches found.</p>
      )}
    </div>
  );

}
