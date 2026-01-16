"use client";

import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Dropdown from "../components/Dropdown";

export default function ConversationOptionModal({
  onOptionSelect,
  chatName = "User",
  chatData = {},
  onLogout,
}) {
  const router = useRouter();

  const options = [
    {
      id: "starred-messages",
      label: "Starred Messages",
      type: "normal",
    },
    {
      id: "mark-all-read",
      label: "Mark all as read",
      type: "normal",
    },
    {
      id: "settings",
      label: "Settings",
      type: "normal",
    },
    {
      id: "logout",
      label: "Logout",
      type: "danger",
    },
  ];

  const handleOptionClick = (optionId) => {
    switch (optionId) {
      case "starred-messages":
        // Navigate to starred messages view
        router.push("/messaging/starred");
        break;

      case "mark-all-read":
        // Integration point: mark all messages as read
        onOptionSelect?.("mark-all-read");
        break;

      case "settings":
        // Navigate to chat / app settings
        router.push("/settings");
        break;

      case "logout":
        // Integration point: auth logout
        if (onLogout) {
          onLogout();
        } else {
          console.warn("Logout handler not provided");
        }
        break;

      default:
        break;
    }
  };

  const getOptionClass = (option) => {
    const base =
      "w-full text-left px-3 py-2.5 text-sm rounded-md transition flex items-center";

    if (option.type === "danger") {
      return `${base} text-red-600 hover:bg-red-50`;
    }

    return `${base} text-gray-700 hover:bg-gray-100`;
  };

  return (
    <Dropdown
      button={
        <div className="w-[40px] h-[40px] text-black flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100">
          <EllipsisVertical size={20} />
        </div>
      }
      className="right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100"
    >
      {({ close }) => (
        <div className="py-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                handleOptionClick(option.id);
                close();
              }}
              className={getOptionClass(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </Dropdown>
  );
}
