"use client";

import Link from "next/link";

export default function PromotedCompanyCard({
  companyLogo,
  companyName,
  title,
  subtitle,
  followers = [],
  buttonLabel = "Visit Careers",
  visitLink = "/", 
}) {
  return (
    <div className="w-full max-w-sm border rounded-xl mb-4 bg-white shadow-sm px-4 py-8">

      {/* Cover + Logo */}
      <div className="relative">
        <img
          src={"/profiledefaultcover.jpg"}
          alt={companyName}
          className="h-20 w-full rounded-md object-cover"
        />

        {/* Logo + Promoted Badge */}
        <div className="absolute bottom-[-15px] left-3 flex items-center gap-3">
          <img
            src={companyLogo}
            alt={companyName}
            className="h-12 w-12 rounded-md  object-cover"
          />
           <div className="flex items-center gap-1">
        <span className="text-[10px] text-gray-500 border px-1.5 py-0.5 rounded-full bg-white">
            Promoted
          </span>
          <button className="text-gray-500 hover:text-gray-700 mx-2"></button>

        </div>
        
        </div>
      </div>

      {/* Company Info */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 text-sm">{companyName}</h3>
        <p className="text-sm text-gray-700 mt-1">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>

      {/* Followers Row */}
      <div className="flex items-center my-3">
        <div className="flex -space-x-2">
          {followers.slice(0, 3).map((f, i) => (
            <img
              key={i}
              src={f.avatar}
              alt={f.name}
              className="h-6 w-6 rounded-full border border-white object-cover"
            />
          ))}
        </div>

        <p className="text-xs text-gray-500 ml-2">
          {followers?.[0]?.name} & {followers.length} other connections follow
        </p>
      </div>

      {/* Visit Button */}
      <Link
        href={visitLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center w-full mt-4 text-sm px-3 py-2 border-2 rounded-full text-blue-600 font-medium hover:bg-blue-50 transition"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
