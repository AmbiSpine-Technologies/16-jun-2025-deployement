"use client";

import { EllipsisVertical } from "lucide-react";
import Dropdown from "../components/Dropdown";
export default function ChatOptionsModal({
  onOptionSelect,
  chatName = "User",
  chatData = {},
}) {
  const options = [
    {
      id: "label-jobs",
      label: chatData.labels?.includes("jobs")
        ? "Remove jobs label"
        : "Label as jobs",
      type: "normal",
      active: chatData.labels?.includes("jobs"),
    },
    { id: "mark-unread", label: "Mark as unread", type: "normal" },
    {
      id: "star",
      label: chatData.isStarred ? "Unstar" : "Star",
      type: "normal",
      active: chatData.isStarred,
    },
    {
      id: "mute",
      label: chatData.isMuted ? "Unmute" : "Mute",
      type: "normal",
      active: chatData.isMuted,
    },
    {
      id: "archive",
      label: chatData.isArchived ? "Unarchive" : "Archive",
      type: "normal",
      active: chatData.isArchived,
    },
    { id: "report-block", label: "Report / Block", type: "danger" },
    { id: "delete", label: "Delete conversation", type: "danger" },
    { id: "settings", label: "Manage settings", type: "normal" },
  ];

  const getOptionClass = (option) => {
    const base = `w-full text-left px-3 py-2.5 text-sm rounded-md transition flex items-center justify-between`;

    if (option.type === "danger") {
      return `${base} text-red-600 hover:bg-red-50`;
    }
    if (option.active) {
      return `${base} text-blue-600 bg-blue-50 hover:bg-blue-100`;
    }
    return `${base} text-gray-700 hover:bg-gray-100`;
  };

  return (
    <Dropdown
      button={
        <div className="w-[40px] flex items-center justify-center  rounded-full text-black cursor-pointer">
          <EllipsisVertical size={20} />
        </div>
      }
      className="right-0 w-60  bg-white rounded-xl shadow-xl border border-gray-100"
    >
      {({ close }) => (
        <div>
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900">
              Chat Options
            </div>
            <div className="text-xs text-gray-600 mt-1">{chatName}</div>
          </div>

          {/* Options List */}
          <div className="py-2">
            {options.map((option) => (
              <div key={option.id}>
                <button
                  onClick={() => {
                    onOptionSelect(option.id);
                    close();
                  }}
                  className={getOptionClass(option)}
                >
                  <span>{option.label}</span>
                  {option.active && (
                    <span className="text-blue-500 text-xs">✓</span>
                  )}
                </button>

                {option.id === "report-block" && (
                  <div className="my-1 border-t border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Dropdown>
  );
}
