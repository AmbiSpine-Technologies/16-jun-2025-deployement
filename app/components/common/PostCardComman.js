"use client";

import React from "react";
import { Heart, MessageCircle, Repeat2, Bookmark } from "lucide-react";

export  const PostCardComman = ({ 
  post, 
  isExpanded, 
  onToggleExpand, 
  onAction, 
  textLimit = 150 
}) => {
  const { id, user, title, description, images, stats } = post;
  const isLong = description.length > textLimit;

  return (
    <article className="rounded-2xl border border-[#dadada] p-4 flex flex-col gap-4 bg-white">
      {/* User Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm font-medium text-gray-600">
              {user.name[0]}
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="text-sm">
        <p className="font-medium text-gray-800">{title}</p>
        <p className={`text-xs text-gray-600 leading-relaxed ${!isExpanded && "line-clamp-2"}`}>
          {description}
        </p>

        {isLong && (
          <button
            onClick={() => onToggleExpand(id)}
            className="text-xs font-semibold mt-1 text-blue-600 hover:underline"
          >
            {isExpanded ? "Show less" : "...more"}
          </button>
        )}
      </div>

      {/* Media/Images Grid */}
      {images && images.length > 0 && (
        <div className={`grid ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-3`}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="post media"
              className="h-40 w-full rounded-xl object-cover border border-gray-100"
            />
          ))}

        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-50 mt-auto">
        <div className="flex gap-4">
          <button 
            onClick={() => onAction("like", id)} 
            className="flex gap-1 items-center hover:text-red-500 transition-colors"
          >
            <Heart size={14} /> {stats.likes}
          </button>
          <button 
            onClick={() => onAction("comment", id)} 
            className="flex gap-1 items-center hover:text-blue-500 transition-colors"
          >
            <MessageCircle size={14} /> {stats.comments}
          </button>
          <button 
            onClick={() => onAction("repost", id)} 
            className="flex gap-1 items-center hover:text-green-500 transition-colors"
          >
            <Repeat2 size={14} /> {stats.reposts}
          </button>
        </div>

        <button 
          onClick={() => onAction("bookmark", id)} 
          className="hover:text-yellow-600 transition-colors"
        >
          <Bookmark size={14} />
        </button>
      </div>
    </article>
  );
};