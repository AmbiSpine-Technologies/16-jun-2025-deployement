"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useChat } from "../context/ChatProvider";
import ConversationItem from "./ConversationItem";
import ConversationFilters from "./ConversationFilters";
import {
  MessageSquarePlus,
  EllipsisVertical,
  BookText,
} from "lucide-react";
import { FormInputField } from "../components/common/FormField/FormInputField";
import ConversationOptionsModal from "./ConversationOptionModal";
import NewChatModal from "./NewChatModal";
import { Suspense } from "react";
import { GlobalLoader } from "@/app/components/Loader";


function ConversationListClient() {
  const {
    conversations,
    selectedChatId,
    setSelectedChatId,
    setShowNewChatPanel,
    setSearchQuery,
    filterType,
    setFilterType,
  } = useChat();
const searchParams = useSearchParams();
  const [showConversationOptions, setShowConversationOptions] = useState(false);

  const [searchText, setSearchText] = useState("");

useEffect(() => {
    if (searchParams.get("share")) {
      setShowNewChatPanel(true); // Automatically open the "New Chat" panel
    }
  }, [searchParams]);

  //  FILTER + SEARCH LOGIC
  const filteredConversations = conversations
    .filter((c) => {
      if (filterType === "job_alerts") return c.category === "job_alerts";
      if (filterType === "groups") return c.type === "group";
      if (filterType === "pages") return c.type === "page"; // Pages filter
      if (filterType === "archived") return c.isArchived;
      if (filterType === "starred") return c.isStarred;
      return true; // Primary
    })
    .filter((c) =>
      c.name.toLowerCase().includes(searchText.toLowerCase())
    ); // search by name

  return (
    <div className="w-full bg-[#fff] relative h-full border-r flex flex-col">
      <div className="p-6 ">
{/* Header */}
      <div className="flex justify-between border-b items-center">
        <h1 className="text-xl font-semibold text-gray-700">Messages</h1>

        <div className="p-4 flex gap-2">
          <button
            onClick={() => setFilterType("pages")}
            className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm
              ${filterType === "pages"
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <BookText size={18} />
            <span>Pages</span>
          </button>


          <button
            onClick={() => setShowNewChatPanel(true)}
            className="w-[40px] hover:cursor-pointer flex items-center justify-center text-gray-700 p-2 rounded-full"
          >
            <MessageSquarePlus size={25} />
          </button>


         <ConversationOptionsModal />
         
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <FormInputField
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="!h-[40px]"
        />
      </div>

      {/* Filters */}
      <ConversationFilters />

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto ">
        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onClick={() => setSelectedChatId(conversation.id)}
            isSelected={selectedChatId === conversation.id}
          />
        ))}
      </div>
      </div>
      

      
      <NewChatModal />
    </div>
  );
}


export default function ConversationList() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <ConversationListClient />
    </Suspense>
  );
}