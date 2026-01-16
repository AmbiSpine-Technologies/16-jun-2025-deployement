import {
  HiOutlineNewspaper,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineFolder,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineInformationCircle,
} from "react-icons/hi2";


const tabs = [
  { id: "feed", name: "Feed", icon: <HiOutlineNewspaper className="text-lg" />, available: true },
  { id: "members", name: "Members", icon: <HiOutlineUsers className="text-lg" />, available: true },
  { id: "events", name: "Events", icon: <HiOutlineCalendar className="text-lg" />, available: true },
  { id: "files", name: "Files", icon: <HiOutlineFolder className="text-lg" />, available: true },
  { id: "chat", name: "Chat", icon: <HiOutlineChatBubbleOvalLeft className="text-lg" />, available: true },
  { id: "about", name: "About", icon: <HiOutlineInformationCircle className="text-lg" />, available: true },
];

export default function CommunityTabs({ activeTab, onTabChange }) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <nav className="flex space-x-6 px-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              disabled={!tab.available}
              className={`
                relative flex items-center gap-2 py-4 px-1 whitespace-nowrap
                text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }
                ${!tab.available ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {tab.icon}
              {tab.name}

              {/* Active underline */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 mx-auto w-full h-[2px] bg-blue-600 rounded-full"></span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
