
"use client";
import React, { useState, useCallback } from "react";
import { Heart, Repeat2, Forward, SquarePen, ThumbsUp  } from "lucide-react";
import { TbMessageCircle } from "react-icons/tb";
import Dropdown from "../components/Dropdown";
import SaveButton from "../save-items/SaveButton";
import { deletePost , reactToPost, toggleLikePost} from '@/app/utils/postsApi'


const REACTIONS = [
  { label: 'Like', emoji: '👍', color: 'text-blue-600', activeIcon: <ThumbsUp fill="currentColor" /> },
  { label: 'Celebrate', emoji: '👏', color: 'text-green-600' },
  { label: 'Support', emoji: '❤️', color: 'text-red-400' },
  { label: 'Love', emoji: '💖', color: 'text-red-600' },
  { label: 'Insightful', emoji: '💡', color: 'text-yellow-600' },
  { label: 'Funny', emoji: '😆', color: 'text-cyan-600' },
];
  
// const REACTIONS = [
//   { type: "like", label: "Like", emoji: "👍" },
//   { type: "love", label: "Love", emoji: "❤️" },
//   { type: "laugh", label: "Laugh", emoji: "😆" },
//   { type: "angry", label: "Angry", emoji: "😡" },
//   { type: "sad", label: "Sad", emoji: "😢" },
// ];


const PostActions = ({
  post,
  currentUser,
  // Counts (allow overrides for optimistic updates)
  likesCount,
  commentsCount,
  repostCount,
  // Handlers
  onLike,
  onCommentClick, // This triggers the modal in parent
  onRepost,
  onShare,
  onSaveAction,
  // Save specific props
  collections,
  directSaved,
  // Modal triggers for Repost
  onOpenQuoteModal, 
}) => {
 

  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [alreadyReposted, setAlreadyReposted] = useState(false);

  // --- CRITICAL FIX: Guard Clause ---
  // If post is undefined, don't render anything and don't run hooks
  if (!post?.id) return null;

  // const handleReactionSelect = (reaction) => {
  //   setSelectedReaction(reaction);
  //   setShowReactions(false);
  //   onLike?.(post.id, reaction.label);
  // };

  const handleMainLikeClick = async (e) => {
  e.stopPropagation();

  try {
    // Toggle Like
    if (selectedReaction?.type === "like") {
      await reactToPost(post.id, "like"); // backend removes it
      setSelectedReaction(null);
    } else {
      const likeReaction = REACTIONS.find(r => r.type === "like");
      await reactToPost(post.id, "like");
      setSelectedReaction(likeReaction);
    }
  } catch (err) {
    console.error(err);
  }
};

const handleReactionSelect = async (reaction) => {
  if (!reaction?.type) return; // 🔒 guard

  try {
    await reactToPost(post.id, reaction.type);

    setSelectedReaction(reaction);
    setShowReactions(false);

  } catch (err) {
    console.error("Reaction failed:", err);
  }
};
 console.log(post);
  // --- FIX: Optional Chaining in Dependency Array ---
  const handleDirectRepost = useCallback(() => {
    if (alreadyReposted) {
      setAlreadyReposted(false);
      onRepost?.(post.id, null, true);
    } else {
      setAlreadyReposted(true);
      onRepost?.(post.id, null, false);
    }
  }, [alreadyReposted, post?.id, onRepost]);
    
  const handleShareClick = (e) => {
    e.stopPropagation();
    onShare?.(post.id);
  };

  return (
    <div className="flex max-w-[360px] justify-between text-gray-700 text-sm pt-2">
      
      {/* --- LIKE SECTION --- */}
      <div 
        className="relative" 
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        {/* Reaction Popup */}
  
{showReactions && (
  <div className="absolute bottom-full left-0 mb-0 p-1 bg-white shadow-xl border border-gray-100 rounded-full flex items-center gap-1 z-50">
    {REACTIONS.map((reaction) => (
      <button
        key={reaction.label}
        onClick={(e) => {
          e.stopPropagation();
          handleReactionSelect(reaction);
        }}
        className="text-2xl  hover:cursor-pointer  hover:scale-125 transition-transform p-2"
      >
        {reaction.emoji}
      </button>
    ))}
  </div>
)}

<button
  className="flex items-center gap-1 hover:cursor-pointer p-2 rounded-lg"
  onClick={handleMainLikeClick}
>
  {selectedReaction ? (
    <span className={`flex items-center gap-1 font-bold ${selectedReaction.color}`}>
      <span className="text-xl">{selectedReaction.emoji}</span>
    </span>
  ) : (
    <Heart size={24} />
  )}
  <span>{likesCount}</span>
</button>

        {/* Like Button */}
        {/* <button 
          className="flex items-center gap-1 hover:cursor-pointer p-2 rounded-lg transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleReactionSelect();
          }}
        >
          {selectedReaction ? (
            <span className={`flex items-center gap-1 font-bold ${selectedReaction.color}`}>
              <span className="text-xl">{selectedReaction.emoji}</span>
            </span>
          ) : (
            <span className="flex items-center text-[#394E57]">
              <Heart size={24} />
            </span>
          )}
          <span className="text-[#394E57]">{likesCount}</span>
        </button> */}
      </div>

      {/* --- COMMENT SECTION --- */}
      <button
        onClick={(e) => {
            e.stopPropagation();
            onCommentClick?.();
        }}
        className="flex items-center gap-0.5 px-2 py-1 rounded-full text-[#394E57] hover:cursor-pointer hover:text-blue-600 transition"
      >
        <TbMessageCircle size={24} />
        <span className="text-sm">{commentsCount}</span>
      </button>

      {/* --- REPOST SECTION --- */}
      <Dropdown
        button={
          <button className="flex mt-3 items-center hover:cursor-pointer gap-1">
            <Repeat2 size={24} />
            {repostCount}
          </button>
        }
        className="left-2 border top-4 border-gray-300 bg-white shadow-lg rounded-lg p-2 w-56"
      >
        {({ close }) => (
          <div className="flex flex-col gap-3">
            {/* Direct Repost */}
            <button
              className="text-left flex items-start gap-3 hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDirectRepost();
                close();
              }}
            >
              <Repeat2 size={26} />
              <div>
                <h5 className="text-[12px] text-gray-700 font-medium">
                  {alreadyReposted ? "Undo Repost" : "Repost"}
                </h5>
                <p className="text-[10px] text-gray-500">
                  {alreadyReposted
                    ? "Remove this repost from your profile"
                    : "Share this post on your profile"}
                </p>
              </div>
            </button>

            {/* Repost with Quote */}
            <button
              className="text-left flex items-start gap-3 hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onOpenQuoteModal?.(post); // Trigger parent modal
                close();
              }}
            >
              <SquarePen size={26} />
              <div>
                <h5 className="text-[12px] text-gray-700 font-medium">Your Thoughts</h5>
                <p className="text-[10px] text-gray-500">
                  Express yourself — ideas, opinions, updates
                </p>
              </div>
            </button>
          </div>
        )}
      </Dropdown>

      {/* --- SAVE & SHARE SECTION --- */}
      <div className="flex items-center gap-4">
        <SaveButton 
          item={post} 
          type="post"
          directSaved={directSaved}
          collections={collections}
          onAction={(action, data) => onSaveAction?.(action, data, "post")} 
        />

        <button
          className="flex items-center text-gray-800 font-bold cursor-pointer gap-1"
          onClick={handleShareClick}
        >
          <Forward size={24} />
        </button>
      </div>

    </div>
  );
};

// Use memo to prevent re-renders of the bar if only unrelated parent state changes
export default React.memo(PostActions);