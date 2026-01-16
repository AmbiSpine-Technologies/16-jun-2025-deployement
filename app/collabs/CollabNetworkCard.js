"use client";
import { useRouter } from "next/navigation";
import { Users, UserCheck, UserPlus, GraduationCap, FileText } from "lucide-react";

export default function CollabNetworkCard({ stats }) {
  const router = useRouter();

  const items = [
    { label: "Collab", icon: Users, value: stats?.collab || 0, route: "/collabs" },
    { label: "Following", icon: UserCheck, value: stats?.following || 0, route: "/following" },
    { label: "Followers", icon: UserPlus, value: stats?.followers || 0, route: "/followers" },
    { label: "Associated College", icon: GraduationCap, value: stats?.associatedCollege || 0, route: "/colleges" },
    { label: "Pages", icon: FileText, value: stats?.pages || 0, route: "/pages" },
  ];

  return (
    <div className= "bg-white w-full  mt-4  border-[0.3px] border-[#cccccc] rounded-4xl shadow-md px-6 py-6 flex flex-col gap-2 hover:scale-[1.01] transition cursor-pointer">
      <h2 className="text-lg border-b pb-2 border-gray-500 font-semibold mb-3 text-gray-700">Manage collabs</h2>

      <div className="">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => router.push(item.route)}
            className="flex items-center justify-between py-2 cursor-pointer hover:bg-[#e5e7ed] px-2 transition"
          >
            <div className="flex items-center gap-2">
              <item.icon className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <span className="text-sm text-gray-600 font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}