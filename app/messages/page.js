import { ChatProvider } from "../context/ChatProvider";

import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import React from "react";

export default function Page() {
  return (
    <ChatProvider>
      <div className="mt-16">
        <div className="h-[calc(100vh-100px)] grid grid-cols-[450px_1fr] overflow-hidden">
          <ConversationList />
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
}

