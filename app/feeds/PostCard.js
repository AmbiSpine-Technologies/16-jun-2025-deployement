"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiDislike, BiSmile } from "react-icons/bi";
import { BsBarChartLine, BsThreeDotsVertical } from "react-icons/bs";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaveItem } from "../store/userSlice";
import Dropdown from "../components/Dropdown";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import { Avatar } from "../components/common/Avatar";
import { GrLike } from "react-icons/gr";

import { CiBookmark } from "react-icons/ci";
import { IoMdShareAlt } from "react-icons/io";
import { BiCommentDots } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { HiOutlinePaperClip } from "react-icons/hi2";
import { FiSend } from "react-icons/fi";
import {
  FileText,
  Edit3,
  Trash2,
  Flag,
  UserX,
  EyeOff,
  ThumbsUp,
  MessageCircle,
  ChevronDown,
  Ellipsis,
  ChartNoAxesColumn,
  Heart,
  MessageSquare,
  Repeat2,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { PiDotsThreeOutlineThin, PiShareFatThin } from "react-icons/pi";
import ParseMentions from "../components/common/ParseMentions";
import TruncateText from "../components/common/TruncateText";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiShareFat } from "react-icons/pi";
import { CiRepeat } from "react-icons/ci";
import { LiaCommentDots } from "react-icons/lia";
import { TbMessageCircle } from "react-icons/tb";
// import { CiRepeat } from "react-icons/ci";
import { PiRepeat } from "react-icons/pi";
import { FaHeart } from "react-icons/fa6";
import { CiBookmarkCheck } from "react-icons/ci";
// import { Ellipsis } from 'lucide-react';
import { Bookmark } from "lucide-react";
import { Forward } from "lucide-react";
import { ShieldCheck } from 'lucide-react';
import { Clock } from 'lucide-react';
import { SmartDropdown } from "../components/Dropdown";
import Button from "../components/Button";
import { Smile } from "lucide-react";
import Modal from "../components/Modal";
import PostWithComments from "./comments/PostWithComments";
import { useImagePreview } from "../hooks/useImagePreview";
import { useAuth } from "../context/auth-context";

import { SquarePen } from 'lucide-react';
import CreatePostModal from "../header/CreatePostModal";

import { getImagesArray } from "../utils/imageUtils";
 import { BookmarkMinus } from 'lucide-react';
import { BookmarkPlus } from 'lucide-react';
import CollectionMenu from "../save-items/CollectionMenu";
import SaveButton from "../save-items/SaveButton";
import PostActions from "./PostActionsCount.js"
import { deletePost } from '@/app/utils/postsApi'

export default function PostCard({
  post,
  mode = "feed",
  onLike,
  liked,
  onRepost,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onPollVote,
  onShare,
  onReport,
  onEditPost,
  onDeletePost,
  onHidePost,
  onNotInterested,
  onToggleComments,
  collections,         // <--- Receive here
  onSaveToCollection,  // <--- Receive here
  onCreateCollection,
  onSaveAction,
  directSaved,
}) {
  const router = useRouter();
  const isActivity = mode === "activity";
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users?.currentUser || null);
  const [expanded, setExpanded] = useState(false);
  const [addComments, setAddComments] = useState(false);
const [showReactions, setShowReactions] = useState(false);
const [selectedReaction, setSelectedReaction] = useState(null);
  // State declarations
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [visibleComments, setVisibleComments] = useState(2);
  const [expandedReplies, setExpandedReplies] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [shareCount, setShareCount] = useState(post.shares || 0);
  const [commentsEnabled, setCommentsEnabled] = useState(
    post.commentsEnabled !== false
  );
  const [alreadyReposted, setAlreadyReposted] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState({
    isOpen: false,
    mode: "create", // or repost_with_quote
    originalPost: null,
  })
  // Memoized values
const [isDeleting, setIsDeleting] = useState(false);


  const {
    likes,
    dislikes,
    commentsCount,
    reposts,
    comments,
    topLevelComments,
  } = useMemo(
    () => ({
      likes: post.likes ?? 0,
      dislikes: post.dislikes ?? 0,
      commentsCount: post.comments ? post.comments.length : 0,
      reposts: post.reposts ?? 0,
      comments: post.comments || [],
      // topLevelComments: (post.comments || [])?.filter((c) => !c.replyTo?.id),
      topLevelComments: Array.isArray(post.comments)
  ? post.comments.filter((c) => !c?.replyTo?.id)
  : [],
    }),
    [post]
  );
  const {
    getCardImageStyle,

  } = useImagePreview();
  const { requireAuth } = useAuth();

  // Permission checks
  const { isPostOwner, canEditPost, canDeletePost, NotisPostOwner } =
    useMemo(() => {
      const isOwner =
        currentUser?.id === post.user?.id ||
        currentUser?.username === post.user?.username;
      return {
        isPostOwner: isOwner,
        canEditPost: isOwner,
        canDeletePost: isOwner,
        NotisPostOwner: !isOwner,
      };
    }, [currentUser, post.user]);

  // Time ago function
  const timeAgo = useCallback((dateStr) => {
    const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const key in intervals) {
      const value = Math.floor(seconds / intervals[key]);
      if (value >= 1) {
        return `${value} ${key}${value > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  }, []);

  // Handler functions
  const onShareClick = useCallback(
    (e) => {
      e.stopPropagation();
      setShareCount((prev) => prev + 1);
      onShare?.(post.id);
      // toast.success("Post shared!");
    },
    [post.id, onShare]
  );

  const handleCopyLink = useCallback(
    (e) => {
      e?.stopPropagation?.();
      const url = `${window.location.origin}/post/${post.id}`;
      navigator.clipboard.writeText(url);
    },
    [post.id]
  );

  const handleNotInterested = useCallback(
    (e) => {
      e?.stopPropagation?.();
      onNotInterested?.(post.id);
    },
    [post.id, onNotInterested]
  );

  const handleHidePost = useCallback(
    (e) => {
      e?.stopPropagation?.();
      onHidePost?.(post.id);
    },
    [post.id, onHidePost]
  );

  const handleReport = useCallback(
    (e) => {
      e?.stopPropagation?.();
      onReport?.(post.id);
    },
    [post.id, onReport]
  );

  const handleEditPost = useCallback(
    (e) => {
      e?.stopPropagation?.();
      onEditPost?.(post);
    },
    [post, onEditPost]
  );


//   const handleDeletePost = useCallback(async () => {
//   // if (!confirmDelete) return;

//   try {
//     setIsDeleting(true);
//     await deletePost(confirmDelete);
//     setConfirmDelete(null);

//     // OPTIONAL: remove post from UI
//     // onDeletePost?.(confirmDelete);

//   } catch (error) {
//     console.error(error);
//     alert("Failed to delete post");
//   } finally {
//     setIsDeleting(false);
//   }
// }, [confirmDelete]);

const handleDeletePost = useCallback(async () => {
  if (!confirmDelete) return;

  try {
    setIsDeleting(true);

    const result = await deletePost(confirmDelete);

    if (!result.success) {
      throw new Error(result.message);
    }

    // ✅ Now update UI
    onDeletePost?.(confirmDelete);

    setConfirmDelete(null);
  } catch (err) {
    alert(err.message || "Delete failed");
  } finally {
    setIsDeleting(false);
  }
}, [confirmDelete]);



  const handleSaveFromMenu = useCallback(
    (e) => {
      e?.stopPropagation?.();
      dispatch(toggleSaveItem({ type: "posts", id: post.id }));
    },
    [post.id, post.saved, dispatch]
  );



 


  const onRepostClick = (e) => {
    e.stopPropagation();
    onRepost?.(post.id);
  };


  const handleCommentReport = useCallback(
    (e, comment) => {
      e.stopPropagation();
      onReport?.(post.id, comment.id);
    },
    [post.id, onReport]
  );

  const handleCommentNotInterested = useCallback((e, comment) => {
    e.stopPropagation();
    toast.info("We'll show fewer comments like this");
  }, []);

  const PostMenuDropdownButton = useMemo(
    () => (
      <PiDotsThreeOutlineThin
        className="text-gray-700 hover:text-gray-700 cursor-pointer transition"
        size={22}
      />
    ),
    []
  );

  const PostMenuDropdownContent = useCallback(
    ({ close }) => (
      <div
        className="bg-white border border-gray-200 rounded-lg shadow-lg z-30 w-56"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopyLink(e);
            close();
          }}
          className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
        >
          <FiSend size={14} className="text-gray-500" />
          <span className="text-sm font-medium">Copy link</span>
        </button>

{isPostOwner && (
  <button
    onClick={(e) => {
      e.stopPropagation();

      setShowQuoteModal({
        isOpen: true,
        mode: "edit",
        originalPost: post, // 👈 FULL POST DATA PASS
      });

      close(); // dropdown close
    }}
    className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
  >
    <Edit3 size={14} className="text-blue-500" />
    <span className="text-sm font-medium">Edit post</span>
  </button>
)}

        {!isPostOwner && (
        //   <button
        //     onClick={(e) => {
        //       e.stopPropagation();
        //       handleDeletePost(e);
        //       close();
        //     }}
        //     className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors"
        //   >
        //     <Trash2 size={14} />
        //     <span className="text-sm font-medium">Delete post</span>
        //   </button>
        // )}
<button
      onClick={(e) => {
        e.stopPropagation();
        setConfirmDelete(post.id);
        close();
      }}
      className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 flex items-center gap-3"
    >
      <Trash2 size={14} />
      <span className="text-sm font-medium">Delete post</span>
    </button>
   )}

        {!isPostOwner && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNotInterested(e);
                close();
              }}
              className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
            >
              <EyeOff size={14} className="text-gray-500" />
              <span className="text-sm font-medium">Not interested</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleHidePost(e);
                close();
              }}
              className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
            >
              <UserX size={14} className="text-gray-500" />
              <span className="text-sm font-medium">Hide post</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReport(e);
                close();
              }}
              className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors last:rounded-b-lg border-t border-gray-100 mt-1"
            >
              <Flag size={14} />
              <span className="text-sm font-medium">Report Post</span>
            </button>
          </>
        )}
      </div>
    ),
    [
      handleSaveFromMenu,
      handleCopyLink,
      canEditPost,
      handleEditPost,
      canDeletePost,
      handleDeletePost,
   
 
      NotisPostOwner,
      handleNotInterested,
      handleHidePost,
      handleReport,
      post.saved,
    ]
  );


  // Truncate Logic
  const limit = 250;
  const isLong = post.content.length > limit;
  const displayText = expanded ? post.content : post.content.slice(0, limit);



  const handleDirectRepost = useCallback(() => {
    if (alreadyReposted) {
      // Undo repost logic
      setAlreadyReposted(false);
      onRepost?.(post.id, null, true); // true for undo
    } else {
      onRepost?.(post.id, null, false); // Direct repost
      setAlreadyReposted(true);
    }
  }, [alreadyReposted, post.id, onRepost]);


  const handleRepostWithQuote = useCallback(() => {
    setShowQuoteModal({
      isOpen: true,
      mode: "repost_with_quote",
      originalPost: post,
    });
  }, [post]);
  // Undo Repost Handler
  const handleUndoRepost = useCallback(() => {
    onRepost?.(post.id, null, true); // true for undo
    setAlreadyReposted(false);
    toast.info("Repost removed");
  }, [post.id, onRepost]);

// Check if user has already reposted this post
useEffect(() => {
  // You'll need to check this from your state/backend
  // For now, we'll use a simple check
  const hasReposted = /* Check if current user has reposted this post */ false;
  setAlreadyReposted(hasReposted);
}, [post.id, currentUser]);


  
//    const renderMedia = () => {
//     if (!post) return null;
    
//     switch (post.type) {
//       case "image":
//          if (!post?.media || post.media.length === 0) return null;

//   const images = getImagesFromMedia(post.media);
//   const videos = post.media.filter(m => m.type === "video");

//       if (images.length === 0) return null;
      
//       const imageCount = images.length;
//       console.log(imageCount);
//       // Single image
//       if (imageCount === 1) {
//         return (
//           <div className="">
//              <img 
//                  src={images[0]}
            
//                 className="w-full h-full bg-gray-200 rounded-xl border-2 border-gray-400 object-cover"
//                 alt="Post image"
//                 style={getCardImageStyle('square', 'large')}
//               />
//           </div>
//         );
//       }
      
//       // Multiple images
//       return (
//         <div className="">
//           <div className="flex gap-3 overflow-x-auto  custom-scroll">
//             {images.map((img, index) => (
//               <div 
//                 key={index}
//                 className="flex-shrink-0 rounded-xl overflow-hidden"
               
//               >
//                 <img 
//                   src={img} 
//                   className="w-full h-full object-cover"
//                   alt={`Post image ${index + 1}`}
//                    style={getCardImageStyle('square', 'small')}
//                 />
//               </div>
//             ))}
            
//           </div>
//         </div>
//       );
//       case "video":
//         if (post.video) {
//           return (
//             <div className="rounded-lg overflow-hidden mb-3" onClick={(e) => e.stopPropagation()}>
//               <video
//                 src={post.video}
//                 controls
//                 className="w-full h-[300px] object-cover"
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           );
//         }
//         return null;

//    "use client";

// // Inside your switch/case or renderMedia function
// case "poll":
//   return post.poll ? (
//     <div className="border border-gray-200 rounded-xl p-4 mb-4 bg-white shadow-sm">
//       <h4 className="font-bold text-gray-900 text-sm mb-4 leading-snug">
//         {post.poll.question}
//       </h4>

//       <div className="space-y-2">
//         {post.poll.options.map((option, index) => {
//           const totalVotes = post.poll.votes?.reduce((a, b) => a + b, 0) || 0;
//           const voteCount = post.poll.votes?.[index] || 0;
//           const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
          
//           // isSelected is defined inside this map for each specific button
//           const isSelected = post.pollSelection === index;

//           return (
//             <button
//               key={index}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onPollVote?.(post.id, index);
//               }}
//               className={`relative w-full h-11 rounded-full border transition-all overflow-hidden flex items-center group ${
//                 isSelected ? "border-blue-600 ring-1 ring-blue-600" : "border-blue-500 hover:bg-blue-50"
//               }`}
//             >
//               {/* Progress Background */}
//               {post.poll.votes && (
//                 <div
//                   className={`absolute left-0 top-0 h-full transition-all duration-700 ease-out ${
//                     isSelected ? "bg-blue-100" : "bg-gray-100/50"
//                   }`}
//                   style={{ width: `${percentage}%` }}
//                 />
//               )}

//               <div className="relative z-10 w-full px-4 flex justify-between items-center font-semibold text-sm">
//                 <div className="flex items-center gap-2">
//                   <span className={isSelected ? "text-blue-700" : "text-blue-600"}>
//                     {option}
//                   </span>
//                   {isSelected && (
//                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
//                     </svg>
//                   )}
//                 </div>
//                 {post.poll.votes && <span className="text-gray-700">{percentage}%</span>}
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* FOOTER: Fixed 'isSelected' error by checking pollSelection directly */}
//       <div className="flex items-center gap-2 mt-3">
//         <span className="text-xs text-gray-500">
//           {post.poll.votes?.reduce((a, b) => a + b, 0) || 0} votes
//         </span>
//         <span className="text-gray-300">•</span>
//         <span className="text-xs text-gray-500">{post.poll.timeLeft} left</span>
        
//         {/* If the user has selected ANY option, show Undo */}
//         {post.pollSelection !== null && (
//           <>
//             <span className="text-gray-300">•</span>
//             <button 
//               className="text-xs font-bold text-blue-600 hover:underline"
//               onClick={() => onPollVote?.(post.id, null)} // Pass null to reset
//             >
//               Undo
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   ) : null;

// // ... inside your component logic
// case "poll":
//   return post.poll ? (
//     <div className="border border-gray-200 rounded-xl p-4 mb-4 bg-white shadow-sm">
//       {/* Question Header */}
//       <h4 className="font-bold text-gray-900 text-sm mb-4 leading-snug">
//         {post.poll.question}
//       </h4>

//       <div className="space-y-2">
//         {post.poll.options.map((option, index) => {
//           const totalVotes = post.poll.votes?.reduce((a, b) => a + b, 0) || 0;
//           const voteCount = post.poll.votes?.[index] || 0;
//           const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
//           const isSelected = post.pollSelection === index;

//           return (
//             <button
//               key={index}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onPollVote?.(post.id, index);
//               }}
//               className={`relative w-full h-11 rounded-full border transition-all overflow-hidden flex items-center group ${
//                 isSelected ? "border-blue-600 ring-1 ring-blue-600" : "border-blue-500 hover:bg-blue-50"
//               }`}
//             >
//               {/* Progress Bar Background Fill */}
//               {post.poll.votes && (
//                 <div
//                   className={`absolute left-0 top-0 h-full transition-all duration-700 ease-out ${
//                     isSelected ? "bg-blue-100" : "bg-gray-100/50"
//                   }`}
//                   style={{ width: `${percentage}%` }}
//                 />
//               )}

//               {/* Content Layer */}
//               <div className="relative z-10 w-full px-4 flex justify-between items-center font-semibold text-sm">
//                 <div className="flex items-center gap-2">
//                   <span className={isSelected ? "text-blue-700" : "text-blue-600"}>
//                     {option}
//                   </span>
//                   {isSelected && (
//                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
//                     </svg>
//                   )}
//                 </div>
                
//                 {post.poll.votes && (
//                   <span className="text-gray-700">{percentage}%</span>
//                 )}
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* Footer info */}
//       <div className="flex items-center gap-2 mt-3">
//         <span className="text-xs text-gray-500">
//           {post.poll.votes?.reduce((a, b) => a + b, 0) || 0} votes
//         </span>
//         <span className="text-gray-300">•</span>
//         <span className="text-xs text-gray-500">{post.poll.timeLeft} left</span>
//         {isSelected && (
//           <>
//             <span className="text-gray-300">•</span>
//             <button className="text-xs font-bold text-blue-600 hover:underline">Undo</button>
//           </>
//         )}
//       </div>
//     </div>
//   ) : null;
//       default:
//         return null;
//     }
//   };

const renderMedia = () => {
  // 1. Combine or select the correct array. 
  // The console shows "images", but DB shows "media". This checks both.
  const mediaSource = post.images || post.media || [];

  if (!Array.isArray(mediaSource) || mediaSource.length === 0) return null;

  // 2. Extract image URLs safely
  const images = mediaSource
    .filter(m => m?.type === "image")
    .map(m => m.url || m.secure_url)
    .filter(Boolean);

  const videos = mediaSource
    .filter(m => m?.type === "video")
    .map(m => m.url || m.secure_url)
    .filter(Boolean);

  console.log("Found Images:", images); // Debugging

  /* ============ RENDER LOGIC ============ */
  
  // Single Image
  if (images.length === 1) {
    return (
      <div className="mt-2">
        <img
          src={images[0]}
          alt="Post content"
          className="w-full max-h-[500px] object-cover rounded-xl border border-gray-100 bg-gray-50"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
    );
  }

  // Multiple Images (Carousel)
  if (images.length > 1) {
    return (
      <div className="mt-2 flex gap-2 overflow-x-auto custom-scroll pb-2">
        {images.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] h-[280px] rounded-xl overflow-hidden border border-gray-100 relative"
          >
            <img
              src={img}
              alt={`Post content ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  // Video
  if (videos.length > 0) {
    return (
      <div className="mt-2 rounded-xl overflow-hidden bg-black" onClick={(e) => e.stopPropagation()}>
        <video
          src={videos[0]}
          controls
          className="w-full max-h-[500px] object-contain"
        />
      </div>
    );
  }

  return null;
};



  return (
    <div
      className="bg-white px-3 md:px-6 py-8 border-b-[0.3px] border-[#cccccc] "
    >
      <div className="w-full  flex gap-3 ">

        <img
          src={post?.author?.avatar || "/default-author-profile.svg"}
          alt={post.user?.name}
          className="w-16 h-16 rounded-full object-cover"
        />

           <div className="flex flex-col mt-5">
          <h1 className="text-[18px] flex gap-0.5 font-semibold text-gray-900">{post.author?.name}{ post.author?.verified && ( <ShieldCheck className="text-[#0056e0] w-[20px] " />)}</h1>
            
          {/* <p className="text-[13px] font-medium text-gray-600">@{post.user.username}</p> */}


          <div className="flex items-center gap-3">
            <p className="text-xs text-[#2a2929]">
              {/* {post.author?.jobtitle} */}
               {post.author?.username}
            </p>

            <p className="text-gray-500 text-xs flex items-center gap-1">
              <Clock className="text-gray-500 w-3 -mt-[1px]" />
              <span className="text-[12px] font-medium">
                {timeAgo(post.createdAt)}
              </span>
            </p>
          </div>

        </div>

        <div className="flex end-1 items-start gap-4  ml-auto">
          <div className="flex end-1 gap-1 items-start" >
            <TrendingUp size={20} className="text-gray-900 cursor-pointer end-2" />
            <span className="text-md text-gray-950 font-jost ">11k</span>

          </div>

          <Dropdown button={PostMenuDropdownButton} className="right-0">
            {PostMenuDropdownContent}
          </Dropdown>
          {/* <Ellipsis className="mt-2 text-gray-300 ml-0.5" /> */}
        </div>
      </div>

      {/* {renderContentWithMentions(post.content)} */}
      <div className="ms-[77px] ">
        <div  className="">
          <TruncateText text={post.content}>
            {(limit) => <ParseMentions text={post.content.slice(0, limit)} />}
          </TruncateText>

        <div className="mt-2">
              {renderMedia()}
          </div>
     

        </div>
       

  <PostActions
        post={post}
        currentUser={currentUser}
        likesCount={likes}
        commentsCount={commentsCount}
        repostCount={reposts}
        collections={collections}
        directSaved={directSaved}
        
        // Actions
        onLike={onLike}
        onRepost={onRepost}
        onShare={onShare}
        onSaveAction={onSaveAction}
        
        // Modal Triggers
        onCommentClick={() => setAddComments(true)}
        onOpenQuoteModal={(postData) => {
    setShowQuoteModal({
      isOpen: true,
      mode: "repost_with_quote",
      originalPost: postData,
    });
  }}
      />
    

{confirmDelete && (
  <Modal
    show={true}
    onClose={() => setConfirmDelete(null)}
    title="Delete post?"
    widthClass="!w-[500px]"
    bodycenter="!items-center !mt-0"
  >
    <p className="text-sm text-gray-600 mb-4">
      This action cannot be undone.
    </p>

    <div className="flex justify-end gap-3 pb-4 mt-4">
      <button
        onClick={() => setConfirmDelete(null)}
        className="px-4 py-2 rounded border border-[#cccccc] "
      >
        Cancel
      </button>

      <button
        disabled={isDeleting}
        onClick={handleDeletePost}
        className="px-3 py-1.5 rounded bg-red-600 hover:cursor-pointer text-white hover:bg-red-700 disabled:opacity-60"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  </Modal>
)}

        {/* commentModal */}
        {/* <Modal
        show={addComments}
        onClose={() => setAddComments(false)}
        title="Comments"
        widthClass="max-w-2xl"
      >
        <PostWithComments  />
      </Modal> */}

      </div>




      {addComments && (
        <PostWithComments
          post={post}
          currentUser={currentUser}
          onAddComment={(postId, commentText, replyToId, replyToName) => {
            onAddComment?.(postId, commentText, replyToId, replyToName);
          }}
          onClose={() => setAddComments(false)} // 🔥 THIS WILL WORK NOW
        />
      )}


        <CreatePostModal
  isOpen={showQuoteModal.isOpen}
  mode={showQuoteModal.mode}
  originalPost={showQuoteModal.originalPost}
  onClose={() =>
    setShowQuoteModal({
      isOpen: false,
      mode: "create",
      originalPost: null,
    })
  }
/>


      {/* Actions */}

      {/* Comments */}
    </div>
  );
}
