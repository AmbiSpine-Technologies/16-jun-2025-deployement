"use client";

export default function ConversationItem({ conversation, onClick, isSelected }) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer px-4 py-3 flex items-start gap-3 border-b
      ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"}`}
        >
            <div className="w-10 h-10 rounded-full bg-gray-300" />

            <div className="flex-1">
                <div className="flex justify-between text-sm">
                    <p className="font-medium text-gray-800">{conversation.name}</p>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>

                <p className="text-xs text-gray-600 truncate">
                    {conversation.lastMessage}
                </p>
            </div>

            {conversation.unread > 0 && (
                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    {conversation.unread}
                </span>
            )}
        </div>
    );
}
