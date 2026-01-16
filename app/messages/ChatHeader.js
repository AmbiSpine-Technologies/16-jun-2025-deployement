"use client";
import { useState, useRef } from 'react';
import { Avatar } from "../components/common/Avatar";
import { useChat } from "../context/ChatProvider";
import { EllipsisVertical } from "lucide-react";
import ChatOptionsModal from './ChatOptionsModal';

export default function ChatHeader() {
    const { conversations, activeChatId, selectedChatId, updateConversation, setConversations } = useChat();
    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
    const optionsTriggerRef = useRef(null);
    const chat = conversations.find((c) => c.id === (selectedChatId ?? activeChatId));

    const handleOptionSelect = async (option) => {
        if (!chat) return;

        console.log('Selected option:', option, 'for chat:', chat.id);
        
        switch(option) {
            case 'Label as jobs':
                await handleLabelAsJobs(chat.id);
                break;
            case 'Mark as unread':
                await handleMarkAsUnread(chat.id);
                break;
            case 'Star':
                await handleToggleStar(chat.id);
                break;
            case 'Unstar':
                await handleToggleStar(chat.id);
                break;
            case 'Mute':
                await handleToggleMute(chat.id);
                break;
            case 'Unmute':
                await handleToggleMute(chat.id);
                break;
            case 'Archive':
                await handleArchive(chat.id);
                break;
            case 'Report / Block':
                await handleReportBlock(chat.id);
                break;
            case 'Delete conversation':
                await handleDeleteConversation(chat.id);
                break;
            case 'Manage settings':
                await handleManageSettings();
                break;
            default:
                console.log('Unknown option:', option);
        }
    };

    // Label conversation as "jobs" - adds a label badge in chat list
    const handleLabelAsJobs = async (chatId) => {
        updateConversation(chatId, { 
            labels: ['jobs'],
            // This will show a "jobs" label/badge in the chat list
        });
        
        try {
            // await dispatch(labelConversationAsJobs(chatId));
            console.log('Labeled as jobs:', chatId);
        } catch (error) {
            console.error('Failed to label conversation:', error);
        }
    };

    // Mark as unread - shows unread badge and moves chat to top
    const handleMarkAsUnread = async (chatId) => {
        updateConversation(chatId, { 
            isUnread: true,
            unreadCount: (chat.unreadCount || 0) + 1,
            lastUpdated: new Date().toISOString() // Move to top of list
        });
        
        try {
            // await dispatch(markConversationAsUnread(chatId));
            console.log('Marked as unread:', chatId);
        } catch (error) {
            console.error('Failed to mark as unread:', error);
        }
    };

    // Star/Unstar - adds star icon to chat in list
    const handleToggleStar = async (chatId) => {
        const currentChat = conversations.find(c => c.id === chatId);
        const newStarredState = !currentChat?.isStarred;
        
        updateConversation(chatId, { 
            isStarred: newStarredState,
            lastUpdated: new Date().toISOString() // Reorder if starred
        });
        
        try {
            // await dispatch(toggleStarConversation(chatId));
            console.log('Toggled star:', chatId, newStarredState);
        } catch (error) {
            console.error('Failed to toggle star:', error);
        }
    };

    // Mute/Unmute - shows mute icon and stops notifications
    const handleToggleMute = async (chatId) => {
        const currentChat = conversations.find(c => c.id === chatId);
        const newMutedState = !currentChat?.isMuted;
        
        updateConversation(chatId, { 
            isMuted: newMutedState
        });
        
        try {
            // await dispatch(toggleMuteConversation(chatId));
            console.log('Toggled mute:', chatId, newMutedState);
            
            if (newMutedState) {
                // Show confirmation toast
                console.log('Chat muted - you won\'t receive notifications');
            } else {
                console.log('Chat unmuted');
            }
        } catch (error) {
            console.error('Failed to toggle mute:', error);
        }
    };

    // Archive - moves chat to archived section
    const handleArchive = async (chatId) => {
        updateConversation(chatId, { 
            isArchived: true,
            archivedAt: new Date().toISOString()
        });
        
        try {
            // await dispatch(archiveConversation(chatId));
            console.log('Archived conversation:', chatId);
            // In real app, this would navigate away from archived chat
        } catch (error) {
            console.error('Failed to archive:', error);
        }
    };

    // Report/Block - reports user and blocks future messages
    const handleReportBlock = async (chatId) => {
        if (window.confirm('Are you sure you want to report and block this user? You will no longer receive messages from them.')) {
            updateConversation(chatId, { 
                isBlocked: true,
                reportedAt: new Date().toISOString()
            });
            
            try {
                // await dispatch(reportAndBlockUser(chatId));
                console.log('Reported and blocked:', chatId);
                alert('User has been reported and blocked successfully.');
            } catch (error) {
                console.error('Failed to report/block:', error);
            }
        }
    };

    // Delete - completely removes conversation
    const handleDeleteConversation = async (chatId) => {
        if (window.confirm('Are you sure you want to delete this conversation? All messages will be permanently deleted and this cannot be undone.')) {
            try {
                // Remove from conversations list
                setConversations(prev => prev.filter(chat => chat.id !== chatId));
                
                // await dispatch(deleteConversation(chatId));
                console.log('Deleted conversation:', chatId);
                
                // In real app, you might want to navigate to chat list
                // or show a "conversation deleted" message
            } catch (error) {
                console.error('Failed to delete conversation:', error);
            }
        }
    };

    const handleManageSettings = async () => {
        console.log('Opening manage settings');
        // This would typically open a settings modal or navigate to settings page
        // For now, just show an alert
        alert('Manage settings would open here');
    };

    return (
        <div className="border-b p-4 flex items-center gap-3 bg-[#f0f6f9fb] relative">
            <Avatar className="w-10 h-10 rounded-full bg-gray-300" />

            <div className="flex-1">
                <h2 className="font-semibold text-sm text-gray-800">{chat?.name}</h2>
                <p className="text-xs text-green-600">Active now</p>
            </div>

            <ChatOptionsModal
                isOpen={isOptionsModalOpen}
                onClose={() => setIsOptionsModalOpen(false)}
                triggerRef={optionsTriggerRef}
                onOptionSelect={handleOptionSelect}
                chatName={chat?.name}
                chatData={chat}
            />
              {/* <ChatOptionsModal
                triggerRef={optionsTriggerRef}
                onOptionSelect={handleOptionSelect}
                chatName={chat?.name}
                chatData={chat}
            /> */}
        </div>
    );
}