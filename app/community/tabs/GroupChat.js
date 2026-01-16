"use client";
import { useState, useEffect, useRef } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";

export default function GroupChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Rupendra",
      avatar: "/circle-based.png",
      text: "Hey everyone! How's your day going?",
      time: "10:24 AM",
      sent: false,
    },
    {
      id: 2,
      sender: "You",
      avatar: "/circle-based.png",
      text: "All good! Working on a new React feature 🔥",
      time: "10:25 AM",
      sent: true,
    },
    {
      id: 3,
      sender: "Amit",
      avatar: "/circle-based.png",
      text: "Nice bro! Show demo when done 😎",
      time: "10:26 AM",
      sent: false,
    },
  ]);

  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "You",
        avatar: "/circle-based.png",
        text: input,
        time: "Now",
        sent: true,
      },
    ]);
    setInput("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col h-[600px]">

      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100 flex items-center gap-3 sticky top-0 z-10">
        <img
          src="/circle-based.png"
          className="w-10 h-10 rounded-full"
          alt="group"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-900">Community Group Chat</h2>
          <p className="text-xs text-green-600">● Online | 12 Members Active</p>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-6">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sent ? "justify-end" : "justify-start"
            }`}
          >
            {!msg.sent && (
              <img src={msg.avatar} className="w-9 h-9 rounded-full" />
            )}

            <div
              className={`max-w-xs p-3 rounded-2xl text-sm ${
                msg.sent
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-[10px] mt-1 opacity-70">{msg.time}</span>
            </div>

            {msg.sent && (
              <img src={msg.avatar} className="w-9 h-9 rounded-full" />
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            <p className="text-gray-500 text-sm">Someone is typing...</p>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t flex items-center gap-3 bg-gray-50">
        <BsEmojiSmile className="text-2xl text-gray-500 cursor-pointer" />

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setTyping(true)}
          onBlur={() => setTyping(false)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none bg-white"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
        >
          <HiOutlinePaperAirplane className="rotate-45 text-xl" />
        </button>
      </div>
    </div>
  );
}
