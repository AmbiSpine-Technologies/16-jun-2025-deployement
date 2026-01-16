"use client";

import { useState, useCallback } from "react";
import { Heart, MessageCircle, Repeat2, Bookmark, ArrowRight } from "lucide-react";
import { Button2 } from "../components/button/Button2";
import { ALL_POSTS } from "../data/data";

/* ================= DUMMY DATA ================= */

const TABS = [
  { label: "Post", key: "post" },
  { label: "Tagged", key: "tagged-posts" },
  { label: "Media", key: "media" },
  { label: "Replies", key: "replies" },
];

const TEXT_LIMIT = 150;
const MAX_PREVIEW_POSTS = 2;

export default function PinnedPosts() {
  const [expanded, setExpanded] = useState({});
  const [activeTab, setActiveTab] = useState("Post");

  /* ========= Backend-ready handlers ========= */
  const handleTabChange = useCallback((label) => {
    setActiveTab(label);
  }, []);

  const handleAction = useCallback((type, postId) => {
    // later: API call -> like/comment/repost/save
    console.log(type, postId);
  }, []);

  const toggleExpand = useCallback(
    (id) => setExpanded((p) => ({ ...p, [id]: !p[id] })),
    []
  );

  const handleShowAll = useCallback((tabKey) => {
    // Redirect to activity page with tab key
    // In Next.js: router.push(`/profile/activity/${tabKey}`)
    window.location.href = `/student-profile/activity/${tabKey}`;
  }, []);

  // Get posts for active tab
  const allPostsForTab = ALL_POSTS[activeTab] || [];
  const shouldShowButton = allPostsForTab.length >= 2;
  const currentPosts = allPostsForTab.slice(0, MAX_PREVIEW_POSTS);

  // Get current tab key for redirect
  const currentTabKey = TABS.find(t => t.label === activeTab)?.key || "post";

  return (
    <section className="w-full border-t-[0.3px] border-[#cccccc] bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">Activity</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3">
          {TABS.map(({ label, route }) => (
            <Button2
            name={label}
              key={label}
              onClick={() => handleTabChange(label, route)}
               classNameborder={`capitalize transition ${activeTab === label
                ? "!text-white !bg-[#0668E0] !font-bold"
                : "!text-[#0668E0] "
                }`}
            >
              {label}
            </Button2>
          ))}
        </div>
      </div>

      {/* Posts */}
      {currentPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPosts.map(({ id, user, title, description, images, stats }) => {
              const isExpanded = expanded[id];
              const isLong = description.length > TEXT_LIMIT;

              return (
                <article
                  key={id}
                  className="rounded-2xl border border-[#dadada] p-4 flex flex-col gap-4"
                >
                  {/* User */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="rounded-full" />
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

                  {/* Content */}
                  <div className="text-sm">
                    <p className="font-medium">{title}</p>
                    <p className={`text-xs text-gray-600 ${!isExpanded && "line-clamp-2"}`}>
                      {description}
                    </p>

                    {isLong && (
                      <button
                        onClick={() => toggleExpand(id)}
                        className="text-xs font-medium mt-1"
                      >
                        {isExpanded ? "Show less" : "...more"}
                      </button>
                    )}
                  </div>

                  {/* Media */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="post media"
                          className="h-40 w-full rounded-xl object-cover border"
                        />
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
                    <div className="flex gap-4">
                      <button onClick={() => handleAction("like", id)} className="flex gap-1 items-center hover:text-gray-700">
                        <Heart size={14} /> {stats.likes}
                      </button>
                      <button onClick={() => handleAction("comment", id)} className="flex gap-1 items-center hover:text-gray-700">
                        <MessageCircle size={14} /> {stats.comments}
                      </button>
                      <button onClick={() => handleAction("repost", id)} className="flex gap-1 items-center hover:text-gray-700">
                        <Repeat2 size={14} /> {stats.reposts}
                      </button>
                    </div>

                    <button onClick={() => handleAction("bookmark", id)} className="hover:text-gray-700">
                      <Bookmark size={14} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Show All Button */}
          {shouldShowButton && (
            <div className="mt-6 text-center">
              <button
                onClick={() => handleShowAll(currentTabKey)}
                className="inline-flex items-center gap-2 px-6 text-gray-500 font-medium text-sm hover:text-black transition-colors"
             
             >
                Show all {activeTab}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No {activeTab.toLowerCase()} yet</p>
        </div>
      )}
    </section>
  );
}