import Link from "next/link";
import Image from "next/image"; // ✅ yeh import zaroori hai
import { useState } from "react";

const communities = [
  {
    name: "JavaScript Developers",
    members: "45k+",
    link: "/communities/javascript",
    logo: "/images/js-logo.png", // apna logo path
  },
  {
    name: "UI/UX Designers",
    members: "28k+",
    link: "/communities/uiux",
    logo: "", // ❌ empty string dekhne ke liye
  },
  {
    name: "Startup Network",
    members: "12k+",
    link: "/communities/startup",
    logo: "/images/startup-logo.png",
  },
];

export default function JoinCommunities() {
  return (
    <div className=" p-5 border rounded-[30px]  border-gray-900 pr-2 font-[inter]">
      <h2 className="text-black font-semibold text-lg mb-3 font-[inter]">
        Join Communities
      </h2>

      <div className="space-y-3">
        {communities.map((com, idx) => (
          <CommunityCard key={idx} com={com} />
        ))}
      </div>
    </div>
  );
}

function CommunityCard({ com }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={com.link}
      className="flex items-center gap-3 border mb-2 border-gray-900 rounded-lg px-3 py-2 hover:bg-[#030611] transition"
    >
      {/* Logo / Fallback */}
      {com.logo && !imgError ? (
        <Image
          src={com.logo}
          alt={com.name}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] object-cover border"
          onError={() => setImgError(true)} // ✅ agar URL galat hua to fallback
        />
      ) : (
        <div className="w-[50px] h-[50px] flex items-center justify-center bg-gray-200 text-gray-600 font-semibold rounded-full">
          {com.name.charAt(0)}
        </div>
      )}

      {/* Text */}
      <div>
        <h3 className="font-medium  text-black">{com.name}</h3>
        <p className="text-sm text-gray-900">{com.members} members</p>
      </div>
    </Link>
  );
}
