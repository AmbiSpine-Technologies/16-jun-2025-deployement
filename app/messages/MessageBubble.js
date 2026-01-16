"use client";
export default function MessageBubble({ message }) {
    const isMe = message.sender === "me";

    return (
        <div
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm
        ${isMe ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
            >
                <p>{message.text}</p>
                {message.attachments?.length > 0 && (
                    <div className="mt-2 space-y-1">
                        {message.attachments.map((file, i) => (
                            <div key={i} className="text-xs underline break-all cursor-pointer">
                                📄 {file.name}
                            </div>
                        ))}
                    </div>
                )}

                <p className="text-[10px] mt-1 opacity-70 text-right">{message.time}</p>
            </div>
        </div>
    );
}
