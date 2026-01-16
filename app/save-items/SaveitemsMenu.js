"use client"
import { Bookmark, Send, Link, Code, Flag, ExternalLink, EyeOff, BellOff } from "lucide-react";

export default function SaveItemsMenu({
  item,
  type, // 'job' | 'post'
  onAction,
  close
  
}) {
  return (
    <div className="bg-white py-2 ">
      
      {/* 1. UNSAVE */}
      <button
onClick={() => { 
          onAction("unsave", item); 
          close(); // Ab ye error nahi dega
        }}        className="flex items-center gap-3 w-full px-4 py-1 text-gray-700  transition-colors text-left font-medium"
      >
        <Bookmark size={16} className="text-gray-600 fill-gray-600" />
        <span className="text-sm">Unsave</span>
      </button>


      {/* 2. SEND */}
      <button
        onClick={() => { onAction("send", item); close(); }}
        className="flex items-center gap-3 w-full px-4 py-1 hover:cursor-pointer text-gray-700  transition-colors text-left font-medium"
      >
        <Send size={16} className="text-gray-600" />
        <span className="text-sm">Send in a  message</span>
      </button>

      {/* 3. COPY LINK */}
      <button
        onClick={() => { onAction("copy", item); close(); }}
        className="flex items-center gap-3 w-full px-4 py-1 hover:cursor-pointer text-gray-700  transition-colors text-left font-medium"
      >
        <Link size={16} className="text-gray-600" />
        <span className="text-sm">Copy link to {type}</span>
      </button>


      {/* 5. SAFETY ACTION (Report or Mute) */}
      <button
        onClick={() => { onAction("report", item); close(); }}
        className="flex items-center gap-3 w-full px-4 py-1 hover:cursor-pointer text-gray-700  transition-colors text-left font-medium"
      >
        <Flag size={16} className="text-gray-600" />
        <span className="text-sm">Report this {type}</span>
      </button>
    </div>
  );
}
