"use client";
import { createContext, useContext, useState } from "react";
import conversationsData from "../data/conversations";
import messagesData from "../data/messages";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [conversations, setConversations] = useState(conversationsData);
    const [messages, setMessages] = useState(messagesData);
    const [activeChatId, setActiveChatId] = useState(null);
    const [filterType, setFilterType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [selectedChatId, setSelectedChat] = useState(null);
    const [showNewChatPanel, setShowNewChatPanel] = useState(false);

    // Keep both ids in sync; many components use different names
    const setSelectedChatId = (id) => {
        setSelectedChat(id);
        setActiveChatId(id);
    };

     const updateConversation = (chatId, updates) => {
        setConversations(prev => prev.map(chat => 
            chat.id === chatId ? { ...chat, ...updates } : chat
        ));
    };


    const [users, setUsers] = useState([
        { id: 1, name: "Riya Sharma", role: "Frontend Developer", avatar: "/avatar1.jpg" },
        { id: 2, name: "Arjun Verma", role: "UI/UX Designer", avatar: "/avatar2.jpg" },
        { id: 3, name: "Karan Singh", role: "Backend Developer", avatar: "/avatar3.jpg" },
    ]);


    const selectConversation = (id) => {
        setActiveChatId(id);
        setSelectedChatId(id);
        setConversations((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, unread: 0 } : c
            )
        );
    };

    const sendMessage = (chatId, text, attachments = []) => {
        const newMsg = {
            id: Date.now(),
            chatId,
            sender: "me",
            text,
            attachments,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            status: "sent",
        };

        setMessages((prev) => [...prev, newMsg]);

        // move conversation to top
        setConversations((prev) => {
            const updated = prev.map((c) =>
                c.id === chatId
                    ? { ...c, lastMessage: text, time: newMsg.time }
                    : c
            );
            updated.sort((a, b) => (a.id === chatId ? -1 : 1));
            return updated;
        });
    };

    const filteredConversations = conversations.filter((c) => {
        const matchesFilter = filterType === "all" || c.type === filterType;
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (filterType === "groups") return c.isGroup === true;
        if (filterType === "personal") return !c.isGroup;
        if (filterType === "unread") return c.unread === true;
        if (filterType === "archived") return c.archived === true;
        if (filterType === "starred") return c.starred === true;
        return matchesFilter && matchesSearch;
    });

    const chatMessages = messages.filter((m) => m.chatId === selectedChatId);

    return (
        <ChatContext.Provider
            value={{
                conversations,
                setConversations,
                filteredConversations,
                activeChatId,
                selectedChatId,
                setSelectedChatId,
                chatMessages,
                selectConversation,
                 showNewChatPanel,
                 setShowNewChatPanel,
                sendMessage,
                setFilterType,
                filterType,
                setSearchQuery,
                showNewChatModal,
                setShowNewChatModal,
                users,
                setUsers,
                selectedChatId,
                setSelectedChatId,
                updateConversation,

            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);