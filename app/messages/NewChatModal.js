"use client";
import { useChat } from "../context/ChatProvider";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FormInputField } from "../components/common/FormField/FormInputField";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { GlobalLoader } from "@/app/components/Loader";

 function NewChatPanelClint() {
  const searchParams = useSearchParams();
  const {
    showNewChatPanel,
    setShowNewChatPanel,
    users,
    conversations,
    setConversations,
    setSelectedChatId,
  } = useChat();

  const [search, setSearch] = useState("");
  const panelRef = useRef(null);

  useEffect(() => {
    if (!showNewChatPanel) return;

    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowNewChatPanel(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNewChatPanel]);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );


const startChat = (user) => {
    const shareLink = searchParams.get("share");
    const shareTitle = searchParams.get("title");
    const shareType = searchParams.get("type"); // URL se type lein
    
    let targetChatId;
    const existing = conversations.find((c) => c.userId === user.id);

    if (existing) {
      targetChatId = existing.id;
    } else {
      const newConv = {
        id: Date.now(),
        userId: user.id,
        name: user.name,
        avatar: user.avatar || "/default-user-profile.svg",
        role: user.role,
        unread: false,
        messages: [],
        lastMessage: "", // Provider logic ke liye safe side
        time: ""
      };
      
      // setConversations ab work karega
      setConversations([newConv, ...conversations]);
      targetChatId = newConv.id;
    }

    if (shareLink) {
      // LinkedIn style rich text
      const richMessage = `Shared ${shareType || 'item'}: ${shareTitle || ''}\n${shareLink}`;
      
      // Thoda delay taaki state update ho jaye agar naya conversation hai
      setTimeout(() => {
        sendMessage(targetChatId, richMessage);
      }, 100);
      
      window.history.replaceState({}, '', '/messages');
    }

    setSelectedChatId(targetChatId);
    setShowNewChatPanel(false);
  }

  // ... rest of your return logic

  return (
    <div
      ref={panelRef}
      className={`absolute top-0 w-full  h-full  bg-white border-r shadow-md
            transition-transform duration-300 flex flex-col overflow-hidden 
            ${showNewChatPanel ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Header - Fixed */}
      <div className="flex items-center justify-between px-6 py-6 border-b flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-600">New Chat</h2>
        <button onClick={() => setShowNewChatPanel(false)}>
          <X className="text-gray-600 hover:cursor-pointer" />
        </button>
      </div>

           <div className="p-4 bg-white">
              <FormInputField
                placeholder="Search"
                value={search}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="!h-[40px]"
              />
            </div>
     
      {/* Scrollable User List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((u) => (
          <button
            key={u.id}
            onClick={() => startChat(u)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left"
          >
            <img
              src={"/default-user-profile.svg"}
              className="w-12 h-12 rounded-full"
              alt={u.name}
            />
            <div>
              <p className="font-medium text-gray-600">{u.name}</p>
              <p className="text-xs text-gray-500">{u.role}</p>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 py-6">No user found</p>
        )}
      </div>
    </div>
  );
}

export default function NewChatPanel() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <NewChatPanelClint />
    </Suspense>
  );
}