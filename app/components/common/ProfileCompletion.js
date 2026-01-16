import Image from "next/image";
import Link from "next/link";
import TruncateText from "./TruncateText";

export function ProfileCompletionCard({ user }) {
  const radius = 38;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const progress = (user.completion / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-[#cccccc] p-3 text-center">

      {/* Avatar + Progress */}
      <div className="flex items-center gap-2">
        <div className="relative flex justify-center mb-4">
          <svg width="100" height="100" className="-rotate-90">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={stroke}
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#22c55e"
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
            />
          </svg>

          {/* Avatar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt="profile"
              width={65}
              height={65}
              className="rounded-full object-cover border-2 border-white"
            />
          </div>

          {/* Percentage */}
          <span className="absolute -bottom-4 text-sm font-semibold text-green-600">
            {user.completion}%
          </span>
        </div>

        <div className="text-left mt-3">
          <h3 className="text-base font-bold text-gray-900">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600">
            {user.role}
          </p>
          <Link
            // href={`/company/${user.company}`} className="text-sm text-left text-gray-700 mt-2 font-medium">
            href={`#`} className="text-sm text-left text-blue-600 mt-2 font-medium">
            @{user.company}
          </Link>

          {/* Last Updated */}
          <p className="text-xs text-gray-500 mt-1">
            Last updated {user.lastUpdated}
          </p>
        </div>
      </div>

      {/* Name & Role */}


      {/* About */}
      <div className="text-sm text-left px-4  text-gray-600 mt-3">
        <TruncateText text={user.about}>
          {(limit) => user.about.slice(0, limit)}
        </TruncateText>
      </div>

      {/* Company */}


      {/* CTA */}
      <Link
        href={`/profile/${user.username}`}
        className="mt-4 inline-block w-full bg-blue-700 hover:cursor-pointer text-white py-2 rounded-full text-sm font-semibold transition"
      >
        View profile
      </Link>


    </div>
  );
}
