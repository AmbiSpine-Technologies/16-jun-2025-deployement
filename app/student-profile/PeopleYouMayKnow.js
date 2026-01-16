"use client";
import React from "react";
import Link from "next/link";
import LinkButton from "../components/button/Button";
import CollabButton from "../components/CollabButton";
import { FIELD_LIMITS } from "../constents/constents";
import { ProfileAvatar } from "../components/ProfileAvatar";
import { TruncateText } from "../helper/truncateText";

export default function PeopleYouMayKnow({
  users = [],
  currentUserId = null,
  limit = 5,
}) {
  const suggestions = (users && users.length ? users : []).filter(
    (u) => u.id !== currentUserId
  );

  const list = suggestions.slice(0, limit);

  return (
    <div className="bg-white border-[0.3px] border-[#cccccc] rounded-2xl p-4 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[16px] font-semibold text-[#374151]">
          Suggest for you
        </h2>

        {suggestions.length > limit && (
          <Link
            href="/collabs"
            className="text-sm font-medium text-[#4F46E5] hover:underline"
          >
            See all
          </Link>
        )}
      </div>

      {/* List */}
      <div className="space-y-4">
        {list.map((person) => (
          <div
            key={person.id}
            className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] pb-4 last:border-b-0"
          >
            {/* Left Section */}
            <Link
              href={`/in/${person.username}`}
              className="flex gap-3 flex-1"
            >
              <ProfileAvatar
                name={person.name}
                image={person.avatar}
                size="sm"
              />

              <div>
                <h4 className="text-sm font-semibold text-[#111827] leading-snug line-clamp-1">
                  {TruncateText(person.name, FIELD_LIMITS.name)}
                </h4>

                <p className="text-xs text-[#6B7280] mt-0.5 leading-tight line-clamp-2">
                  {TruncateText(person.about || "", 80)}
                </p>
              </div>
            </Link>

            {/* Right Section */}
            <CollabButton
              targetId={person.id}
              collabclass="px-4 h-7 text-sm rounded-full"
            />
          </div>
        ))}

        {list.length === 0 && (
          <p className="text-sm text-gray-400">No suggestions yet.</p>
        )}
      </div>
    </div>
  );
}
