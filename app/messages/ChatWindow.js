"use client";
import { useState } from "react";
import { useChat } from "../context/ChatProvider";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow() {
  const { conversations, selectedChatId, chatMessages } = useChat();
  const bottomRef = useRef(null);
  const [typingUsers, setTypingUsers] = useState([]);

  const chat = conversations.find((c) => c.id === selectedChatId);

  useEffect(() => {
    if (chatMessages?.length > 0 && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages?.length]);

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <ChatHeader chat={chat} />
      </div>

      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {(chatMessages ?? []).map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <TypingIndicator typingUsers={typingUsers} />


      {/* Fixed Input */}
      <div className="flex-shrink-0">
        <MessageInput chatId={chat.id} />
      </div>
    </div>
  );
}
