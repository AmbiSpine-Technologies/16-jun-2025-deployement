// components/ProfileActivity.jsx
"use client";
import React, { useState } from "react";
// import PostCard from "./post/PostCard";

import RepostCard from "../feeds/Repost";
import { users } from "../constents/constents";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyState from "../components/EmptyState";
import PostCard from "../feeds/PostCard";

export default function ProfileActivity() {
  const user = users[0];
  const [activeTab, setActiveTab] = useState("Posts");
  const [showAll, setShowAll] = useState(false);

  // keep local copy so likes/dislikes update in activity too
  const [posts, setPosts] = useState(user.posts);

  const tabs = ["Posts", "Comments", "Likes", "Repost"];

  const getUserActivityPercentages = () => {
    const counts = { Posts: 0, Comments: 0, Likes: 0, Repost: 0 };
    posts.forEach((p) => (counts[p.activity] = (counts[p.activity] || 0) + 1));
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, Math.round((v / total) * 100)]));
  };

  const percentages = getUserActivityPercentages();
  const filteredPosts = posts.filter((p) => p.activity === activeTab);




  // handlers (like/dislike works in activity)
  const handleLike = (postId) =>
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const liked = !p.liked;
        const currLikes = p.likes ?? 0;
        const currDislikes = p.dislikes ?? 0;
        let newLikes = currLikes + (liked ? 1 : -1);
        let newDislikes = currDislikes;
        let disliked = p.disliked ?? false;
        if (liked && disliked) {
          newDislikes = Math.max(0, newDislikes - 1);
          disliked = false;
        }
        return { ...p, liked, likes: newLikes, disliked, dislikes: newDislikes };
      })
    );

  const handleDislike = (postId) =>
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const disliked = !p.disliked;
        const currDislikes = p.dislikes ?? 0;
        const currLikes = p.likes ?? 0;
        let newDislikes = currDislikes + (disliked ? 1 : -1);
        let newLikes = currLikes;
        let liked = p.liked ?? false;
        if (disliked && liked) {
          newLikes = Math.max(0, newLikes - 1);
          liked = false;
        }
        return { ...p, disliked, dislikes: newDislikes, liked, likes: newLikes };
      })
    );

  // In activity mode comment/repost/share should open post detail (handled inside PostCard),
  // but poll voting we will also let be read-only -> navigate to post.
  // Save hidden in activity

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="h-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Activity</h1>
        </div>

        <div className="flex gap-4 mb-6 border-b-[0.5px] border-gray-400 pb-3 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowAll(false);
              }}
              className={`px-4 py-1 rounded-full focus:outline-none transition ${activeTab === tab
                  ? "bg-gradient-to-r from-[#0f172a] to-[#0b2540] text-white shadow-sm"
                  : "bg-transparent border border-gray-700 text-gray-300 hover:bg-[#071029]"
                }`}
            >
              {tab} ({percentages[tab]}%)
            </button>
          ))}
        </div>
        {
          !filteredPosts?.length && (
            <EmptyState
              image="/Happy Girl.png"
              alt="certificate"
              message="No certifications added yet."
            />
          )
        }
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {(showAll ? filteredPosts : filteredPosts.slice(0, 2)).map((post) => {
            if (post.type === "repost") {
              const original = posts.find((x) => x.id === post.originalId);
              return (
                <RepostCard
                  key={post.id}
                  post={post}
                  originalPost={original}
                  onLike={handleLike}
                  onDislike={handleDislike}
                />
              );
            }
            return (
              <PostCard
                key={post.id}
                post={post}
                mode="activity"
                onLike={handleLike}
                onDislike={handleDislike}

              // other handlers not passed — PostCard will navigate on those clicks (activity behaviour)
              />
            );
          })}
        </div>

        {!showAll && filteredPosts.length > 2 && (
          <div className="mt-6 text-center">
            <Link
              href={`/profile/activity/${activeTab.toLowerCase()}`}
              className="text-blue-600 font-medium underline hover:text-blue-800"
            >
              View All {activeTab} →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
