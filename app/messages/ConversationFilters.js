"use client";
import { useChat } from "../context/ChatProvider";

const filters = [
  { label: "Primary", value: "all" },
  { label : "Job alerts", value: "job_alerts" },
  { label: "Groups", value: "groups" },
  { label: "Archived", value: "archived" },
  { label: "Starred", value: "starred" },
  
];

export default function ConversationFilters() {
  const { filterType, setFilterType } = useChat();

  return (
    <div className="px-4 mb-2 flex gap-2 text-sm custom-scroll overflow-x-auto">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilterType(f.value)}
          className={`px-3 py-1 rounded-full border  whitespace-nowrap
            ${
              filterType === f.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700"
            }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
