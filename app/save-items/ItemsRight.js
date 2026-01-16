"use client";
import { useRouter } from "next/navigation";
import { Briefcase, FileText as PostIcon, Bookmark, Plus } from "lucide-react";

export default function ItemsRight({ stats, onCreateList }) {
  const router = useRouter();

  // Dynamic stats mapping
  const items = [
    { label: "Jobs", icon: Briefcase, value: stats?.jobs || 0, route: "#", type: "Jobs" },
    { label: "Post", icon: PostIcon, value: stats?.posts || 0, route: "#", type: "Post" },
    { label: "Collections", icon: Bookmark, value: stats?.collections || 0, route: "#", type: "Collections" },
  ];

  return (
    <div className="bg-white w-full border-[0.3px] border-[#cccccc] rounded-3xl shadow-sm px-5 py-5 flex flex-col gap-3">
      {/* Header with Create List Button */}
      <div className="flex items-center justify-between border-b pb-3 border-gray-100 mb-2">
        <h2 className="text-md font-bold flex items-center gap-2 text-gray-700">
          <Bookmark size={18} /> Saved Summary
        </h2>
        <button 
    
          onClick={(e) => {
      e.stopPropagation();
      onCreateList(); // Ye modal trigger karega
    }}
          className="p-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition cursor-pointer"
          title="Create New List"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-1">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2.5 cursor-default px-2 rounded-xl transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-600">{item.label}</span>
            </div>
            <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-bold">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}