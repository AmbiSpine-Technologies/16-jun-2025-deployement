
"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar } from "../../components/common/Avatar";
import { MoreVertical,
  Heart,
  MessageCircle,
  Trash2,
  Flag,
  UserRoundPlus,
  X,
  Pencil,
  ChevronRight,
  Share2,
  BookmarkIcon, 
  ChevronUp
} from "lucide-react";
import ReportModal from "../ReportModal";

  //  Comment Item

export const CommentItem = ({
  comment,
  currentUser,
  onReply,
  onLike,
  onDelete,
  editingComment,
  handleVotePoll,
  onEdit,
  isReply = false,
  depth = 0,
  isLastInThread = false
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(comment?.liked || false);
  const [likeCount, setLikeCount] = useState(comment?.likes || 0);
  const menuRef = useRef(null);
  const [openReport, setOpenReport] = useState(false)
  // Close menu when clicking outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const isCurrentUser = comment?.user?.id === currentUser?.id;
  const hasReplies = comment?.replies?.length > 0;
  const userName =
  comment?.author
    ? `${comment.author.firstName ?? ""} ${comment.author.lastName ?? ""}`.trim()
    : "Anonymous User";

  const userAvatar = comment?.user?.avatar;

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    onLike?.(comment.id);
  };

  const handleReply = () => {
    onReply?.(comment);
  };

  const maxDepth = 4; // Maximum nesting depth
  const showLine = depth < maxDepth && (hasReplies || !isLastInThread);
  const isNested = depth > 0;

  const handleReportSubmit = async (category, details) => {
  console.log("REPORT COMMENT", {
    targetType: "comment",
    commentId: comment.id,
    category,
    details,
  });

  // TEMP success (backend later)
  await new Promise((res) => setTimeout(res, 800));

  return { success: true };
};

  return (
    <div className={`relative ${!isReply ? 'py-3  transition-colors' : ''}`}>
  

      <div className={`flex gap-3 ${isNested ? 'pl-3' : ''}`}>
        {/* Avatar with vertical line connection */}
        <div className="relative flex-shrink-0">
        
            <Avatar 
              src={userAvatar} 
              alt={userName} 
              size={isNested ? "sm" : "md"}
              className={`$z-10 {isNested ? "!w-8 !h-8" : "!w-10 !h-10"} relative z-10`}
            />
      

          {/* Vertical line from avatar to bottom */}
          {showLine && depth < maxDepth - 1 && !isLastInThread && (
            <div className="absolute left-1/2  top-10 w-[2px] h-[90%]   bg-gray-300 -translate-x-1/2" />
          )}
          
  
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">
                {comment?.createdAt
                  ? new Date(comment.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Just now"}
              </p>
            </div>

            {/* Dropdown Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-full hover:bg-gray-100 hover:cursor-pointer"
              >
                <MoreVertical size={16} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg z-20 overflow-hidden">
                  <MenuItem 
                    icon={<UserRoundPlus size={14} />} 
                    text="Follow" 
                    onClick={() => setShowMenu(false)}
                  />
                  <MenuItem 
                    icon={<Flag size={14} />} 
                    text="Report" 
                     onClick={() => {
    setOpenReport(true);
    setShowMenu(false);
  }}
                  />
                  <MenuItem 
                    icon={<X size={14} />} 
                    text="Don't want to see" 
                    onClick={() => setShowMenu(false)}
                  />
                  
                  {isCurrentUser && (
                    <>
                      <div className="border-t border-gray-100 my-1" />
                
                      <MenuItem 
  icon={<Pencil size={14} />} 
  text="Edit" 
  onClick={() => {
    onEdit?.(comment);
    setShowMenu(false);
  }}
/>
                      <MenuItem 
                        icon={<Trash2 size={14} />} 
                        text="Delete" 
                        onClick={() => {
                          onDelete?.(comment.id);
                          setShowMenu(false);
                        }}
                        destructive
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

   
<p className="mt-2 text-sm text-gray-800 whitespace-pre-wrap flex items-center gap-2">
  {comment?.content 
  &&  (
    <>
      <span>{comment.content}</span>

      {/* 🟡 CURRENTLY EDITING */}
      {editingComment?.id === comment.id && (
        <span className="text-xs text-yellow-600 italic">
          (editing…)
        </span>
      )}

      {/* 🟢 EDITED BEFORE */}
      {editingComment?.id !== comment.id && comment.isEdited && (
        <span className="text-xs text-gray-400 italic">
          (edited)
        </span>
      )}
    </>
  ) }
</p>

          {/* Comment Images (if any) */}
          {comment?.images?.length > 0 && (
            <div className="mt-2 flex gap-2 overflow-x-auto">
              {comment.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Comment image ${idx + 1}`}
                  className="h-32 w-auto rounded-lg object-cover border border-gray-200"
                />
              ))}
            </div>
          )}

{comment?.poll && (
  <div className="mt-3 border border-gray-400 rounded-xl p-3">
    <p className="font-medium text-sm mb-2">{comment.poll.question}</p>

    <div className="space-y-2">
      {comment.poll.options.map((opt, idx) => {
        const hasVoted = comment.poll.votedUsers?.includes(currentUser.id);
        const totalVotes = comment.poll.options.reduce((sum, o) => sum + o.votes, 0);
        const percent = totalVotes ? Math.round((opt.votes / totalVotes) * 100) : 0;
    const votedIndex = comment.poll.votedUsers?.includes(currentUser.id)
  ? comment.poll.options.findIndex((o, i) => o.votes > 0) 
  : -1;

        return (
          <div
            key={idx}
          
            className={`border border-gray-300 rounded-full px-3 py-2 text-sm flex justify-between items-center cursor-pointer ${
  !hasVoted ? "hover:bg-gray-100" : ""
} ${votedIndex === idx ? "bg-blue-100 border-blue-400" : ""}`}

            onClick={() => {
              if (!hasVoted) handleVotePoll(comment.id, idx);
            }}
          >
            <span>{opt.text}</span>
            <span className="text-xs text-gray-500">
              {opt.votes} votes {hasVoted && `(${percent}%)`}
            </span>
          </div>
        );
      })}
    </div>

    <p className="text-xs text-gray-400 mt-2">
      Poll • {comment.poll.duration}
    </p>
  </div>
)}


          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? "text-red-600" : "hover:text-gray-700"}`}
            >
              <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
              {likeCount > 0 && <span>{likeCount}</span>}
              <span className="ml-1">Like</span>
            </button>

            <button
              onClick={handleReply}
              className="flex items-center gap-1 hover:text-gray-700"
            >
              <MessageCircle size={14} />
              Reply
            </button>

         

            {/* Additional Actions */}
           

          </div>

           <div>
  {/* VIEW REPLIES — TOP (only when closed) */}
  {hasReplies && !showReplies && (
    <button
      onClick={() => setShowReplies(true)}
      className="flex items-center gap-1 text-xs hover:cursor-pointer text-blue-600 mt-2 hover:text-blue-700"
    >
      {/* <ChevronRight size={14} /> */}
      View replies ({comment.replies.length})
    </button>
  )}

  {/* REPLIES SECTION */}
  {showReplies && hasReplies && (
    <div className="mt-4 relative">
      {/* VERTICAL THREAD LINE */}
      <div className="absolute left-7 z-0 top-8 bottom-6 w-[2px] bg-gray-300" />

      <div className="space-y-3">
        {comment.replies.map((reply, index) => (
          <CommentItem
            key={reply.id || index}
            comment={reply}
            currentUser={currentUser}
            onReply={onReply}
            onLike={onLike}
            onDelete={(id) => onDelete?.(id, comment.id)}
            isReply
            depth={depth + 1}
            isLastInThread={index === comment.replies.length - 1}
          />
        ))}
      </div>

      {/* CLOSE REPLIES — BOTTOM */}
      <button
        onClick={() => setShowReplies(false)}
        className="mt-2 ml-2 flex items-center hover:cursor-pointer gap-1 text-xs text-blue-600 hover:text-blue-700"
      >
       
        Close replies
      </button>
    </div>
  )}
</div>



       
        </div>
      </div>
     
     <ReportModal
  open={openReport}
  onClose={() => setOpenReport(false)}
  targetType="comment"
  onSubmit={handleReportSubmit}
/>

    </div>
  );
};

  //  Menu Item Component


const MenuItem = ({ icon, text, onClick, destructive = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50 ${
      destructive ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-gray-700"
    }`}
  >
    {icon}
    {text}
  </button>
);

export default CommentItem;
