
"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import EmojiPicker from "emoji-picker-react";
import { 
  Smile, ImagePlus, BarChart2, X, Heart, MessageCircle, 
  MoreVertical, SendHorizontal, ChevronDown, X as CloseIcon,
  UserRoundPlus, Flag, Trash2, Pencil, Bookmark, Forward, ChevronRight, ChevronUp
} from "lucide-react";
import { Avatar } from "../../components/common/Avatar";
import { Button2 } from "../../components/button/Button2";
import { InputField } from '../../components/InputField';
import FormDropdown from "../../components/FormDropdown";
import Button from "../../components/Button";
import TruncateText from "../../components/common/TruncateText";
import ParseMentions from "../../components/common/ParseMentions";
import { SmartDropdown } from "../../components/Dropdown";
import MediaPane from "./MediaPane";
import { Bookmark as BookmarkIcon, Share2 } from "lucide-react";
import PostActionsCount from './PostActionsCount';
import {CommentItem} from './CommentItem'
import { createPortal } from "react-dom";
import PostActions from '../PostActionsCount';
import { createComment,updateComment, deleteComment, getComments  } from '@/app/utils/postsApi';


/* ===========================
   Menu Item Component

/* ===========================
   Avatar Fallback Component
=========================== */



const MAX_IMAGES = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// Enhanced dummy data
const dummyComments = [
  {
    id: "c1",
    content: "Is that from atla? Looks like the artstyle but i don't recognize the character",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    likes: 465,
    liked: false,
    user: {
      id: "u1",
      name: "Alex Turner",
      avatar: "",
      username: "alexturner"
    },
    replies: [
      {
        id: "r1",
        content: "Legend of Korra. Its Tophs granddaughter.",
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        likes: 883,
        liked: true,
        user: {
          id: "u2",
          name: "Sarah Chen",
          avatar: "",
          username: "sarahchen"
        },
        replies: [
          {
            id: "r1_1",
            content: "Oh wow, you're right! I can see the resemblance now.",
            createdAt: new Date(Date.now() - 900000).toISOString(),
            likes: 42,
            liked: false,
            user: {
              id: "u3",
              name: "Mike Johnson",
              avatar: "",
              username: "mikej"
            },
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: "c2",
    content: "From pilot to prod - Deploy production-ready AI agents that automate your enterprise",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    likes: 324,
    liked: false,
    user: {
      id: "u4",
      name: "Tech Evangelist",
      avatar: "",
      username: "techevangelist"
    },
    replies: []
  },
  {
    id: "c3",
    content: "Building Agentic AI Systems with Solace Agent Mesh",
    createdAt: new Date(Date.now() - 5400000).toISOString(),
    likes: 567,
    liked: true,
    user: {
      id: "u5",
      name: "AI Architect",
      avatar: "",
      username: "aiarchitect"
    },
    replies: [
      {
        id: "r3_1",
        content: "This looks promising! How does it compare to existing solutions?",
        createdAt: new Date(Date.now() - 2700000).toISOString(),
        likes: 89,
        liked: false,
        user: {
          id: "u6",
          name: "Curious Dev",
          avatar: "",
          username: "curiousdev"
        },
        replies: [
          {
            id: "r3_1_1",
            content: "Much more scalable and has better integration options.",
            createdAt: new Date(Date.now() - 1350000).toISOString(),
            likes: 56,
            liked: true,
            user: {
              id: "u5",
              name: "AI Architect",
              avatar: "",
              username: "aiarchitect"
            },
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: "c4",
    content: "Happiness is the key achievement of life. In every generation, through changing traditions, shifting technologies, and evolving mindsets.",
    createdAt: new Date().toISOString(),
    likes: 1200,
    liked: true,
    user: {
      id: "u7",
      name: "Aditya Shrivastava",
      avatar: "",
      username: "adityas"
    },
    replies: [
      {
        id: "r4_1",
        content: "Absolutely agree 💯 Happiness should always be the goal.",
        createdAt: new Date().toISOString(),
        likes: 45,
        liked: false,
        user: {
          id: "u8",
          name: "Rohit Verma",
          avatar: "",
          username: "rohitv"
        },
        replies: []
      },
      {
        id: "r4_2",
        content: "Well said! Times change but happiness stays constant.",
        createdAt: new Date().toISOString(),
        likes: 67,
        liked: true,
        user: {
          id: "u9",
          name: "Neha Singh",
          avatar: "",
          username: "nehasingh"
        },
        replies: [
          {
            id: "r4_2_1",
            content: "Exactly! It's the one thing that transcends all boundaries.",
            createdAt: new Date().toISOString(),
            likes: 23,
            liked: false,
            user: {
              id: "u10",
              name: "Philosophy Lover",
              avatar: "",
              username: "phillover"
            },
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: "c5",
    content: "Technology is evolving fast, but values and mindset should evolve even faster.",
    createdAt: new Date().toISOString(),
    likes: 980,
    liked: false,
    user: {
      id: "u7",
      name: "Aditya Shrivastava",
      avatar: "",
      username: "adityas"
    },
    replies: []
  }
];

export default function PostWithComments({ 
  post, 
  currentUser, 
  onAddComment, 
  onClose 
}) {
  // State Management
  const [commentText, setCommentText] = useState("");
  // const [comments, setComments] = useState(dummyComments);
  const [comments, setComments] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  // Poll related states
  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState("1 Day");
    const [loadingComments, setLoadingComments] = useState(false);
  // UI states
  const [uploadError, setUploadError] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs
  const fileInputRef = useRef(null);
  const commentInputRef = useRef(null);
  const commentsContainerRef = useRef(null);


    useEffect(() => {
    if (!post?.id) return;

    const fetchAllComments = async () => {
      try {
        setLoadingComments(true);

        // Fetch all comments, assuming your API allows a large limit or no pagination
        const res = await getComments(post.id, 1, 1000); // you can set a very high limit
        console.log("ALL COMMENTS FROM BACKEND:", res);

        if (res.success === false) return;

        const backendComments = res.data?.comments || res.comments || [];

        const normalized = backendComments.map(c => ({
          id: c._id,
          content: c.content,
          createdAt: c.createdAt,
          likes: c.likesCount || 0,
          liked: c.isLiked || false,
          user: {
            id: c.author?._id,
            name: `${c.author?.firstName || ""} ${c.author?.lastName || ""}`,
            username: c.author?.userName,
            avatar: c.author?.profileImage || "",
          },
          replies: c.replies || [],
        }));

        setComments(normalized); // store all comments at once

      } catch (err) {
        console.error("Failed to load comments", err);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchAllComments();
  }, [post.id]);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (commentsContainerRef.current) {
        setIsScrolled(commentsContainerRef.current.scrollTop > 50);
      }
    };

    const container = commentsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // File handling functions
  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > MAX_IMAGES) {
      setUploadError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }
    
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`${file.name} exceeds 5MB size limit`);
        return;
      }
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setUploadError(`${file.name} is not a supported image type`);
        return;
      }
    }
    
    setSelectedFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
    setUploadError("");
  }, []);
  
const handleEditComment = useCallback((comment) => {
  setEditingComment(comment);
  setCommentText(comment.content || "");

  // ✅ images
  setImagePreview(comment.images || []);
  setSelectedFiles([]); // new files optional

  // ✅ poll
  if (comment.poll) {
    setShowPoll(true);
    setPollQuestion(comment.poll.question);
    setPollOptions(comment.poll.options.map(o => o.text));
    setPollDuration(comment.poll.duration);
  } else {
    setShowPoll(false);
    setPollQuestion("");
    setPollOptions(["", ""]);
  }

  commentInputRef.current?.focus();
}, []);





// const handleSendComment = useCallback(() => {

//   if (!commentText.trim() && selectedFiles.length === 0 && !showPoll) {
//     setUploadError("Please add text, image or poll");
//     return;
//   }

//   const newComment = {
//     id: `cmt-${Date.now()}`,
//     content: commentText,
//     images: imagePreview,
//     user: currentUser,
//     likes: 0,
//     liked: false,
//     replies: [],
//     createdAt: new Date().toISOString(),
//     poll: showPoll
//       ? {
//           question: pollQuestion,
//           options: pollOptions.map(o => ({ text: o, votes: 0 })),
//           duration: pollDuration,
//           votedUsers: [],
//         }
//       : null,
//   };

//   /* =========================
//      ✏️ EDIT MODE
//   ========================= */
//   if (editingComment) {
//     const updateComments = (list) =>
//       list.map(c => {
//         if (c.id === editingComment.id) {
//           return {
//             ...c,
//             content: commentText,
//             images: imagePreview,
//             poll: newComment.poll,
//             isEdited: true,
//             editedAt: new Date().toISOString(),
//           };
//         }
//         if (c.replies?.length) {
//           return { ...c, replies: updateComments(c.replies) };
//         }
//         return c;
//       });

//     setComments(prev => updateComments(prev));
//   }

//   /* =========================
//      🔁 REPLY MODE (🔥 FIX)
//   ========================= */
//   else if (replyTo) {
//     const addReply = (list) =>
//       list.map(c => {
//         if (c.id === replyTo.id) {
//           return {
//             ...c,
//             replies: [...(c.replies || []), newComment],
//           };
//         }
//         if (c.replies?.length) {
//           return { ...c, replies: addReply(c.replies) };
//         }
//         return c;
//       });

//     setComments(prev => addReply(prev));
//   }

//   /* =========================
//      🆕 NEW COMMENT
//   ========================= */
//   else {
//     setComments(prev => [newComment, ...prev]);
//   }

//   /* =========================
//      🔄 RESET
//   ========================= */
//   setCommentText("");
//   setSelectedFiles([]);
//   setImagePreview([]);
//   setShowPoll(false);
//   setPollQuestion("");
//   setPollOptions(["", ""]);
//   setEditingComment(null);
//   setReplyTo(null);
//   setUploadError("");
// }, [
//   commentText,
//   imagePreview,
//   editingComment,
//   replyTo,
//   showPoll,
//   pollQuestion,
//   pollOptions,
//   pollDuration,
//   currentUser,
// ]);



const handleSendComment = useCallback(async () => {
  if (!commentText.trim()) {
    setUploadError("Comment cannot be empty");
    return;
  }

  const tempId = `temp-${Date.now()}`;

  // UI comment (local)
  const optimisticComment = {
    id: tempId,
    content: commentText,
    user: currentUser,
    likes: 0,
    liked: false,
    replies: [],
    createdAt: new Date().toISOString(),
  };

  const apiPayload = {
  content: commentText,
  ...(replyTo && { parentComment: replyTo.id }),
};
  /* ========= UI UPDATE ========= */
  if (replyTo) {
    setComments(prev =>
      prev.map(c =>
        c.id === replyTo.id
          ? { ...c, replies: [...c.replies, optimisticComment] }
          : c
      )
    );
  } else {
    setComments(prev => [optimisticComment, ...prev]);
  }

  try {
    const res = await createComment(post.id, apiPayload);
    console.log("CREATE COMMENT API:", res);

    if (!res.success) throw new Error(res.message);

    // 🔥 replace temp comment with DB comment
    setComments(prev =>
      prev.map(c =>
        c.id === tempId
          ? {
              ...res.data,
              id: res.data._id, // 🔥 normalize ID
              user: res.data.author,
              replies: [],
            }
          : c
      )
    );

  } catch (err) {
    // rollback
    setComments(prev => prev.filter(c => c.id !== tempId));
    alert(err.message || "Failed to save comment");
  }

  /* ========= RESET ========= */
  setCommentText("");
  setReplyTo(null);
  setUploadError("");

}, [commentText, replyTo, currentUser, post.id]);



const handleVotePoll = useCallback((commentId, optionIndex) => {
  const updatePollVotes = (commentsList) => {
    return commentsList.map(c => {
      if (c.id === commentId) {
        if (!c.poll.votedUsers.includes(currentUser.id)) {
          const updatedOptions = c.poll.options.map((opt, idx) =>
            idx === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
          );
          return {
            ...c,
            poll: {
              ...c.poll,
              options: updatedOptions,
              votedUsers: [...(c.poll.votedUsers || []), currentUser.id]
            }
          };
        }
      }
      if (c.replies?.length) {
        return { ...c, replies: updatePollVotes(c.replies) };
      }
      return c;
    });
  };

  setComments(prev => updatePollVotes(prev));
}, [currentUser.id]);

  // Like handling
  const handleLikeComment = useCallback((commentId) => {
    const updateCommentLikes = (commentList) => {
      return commentList.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1
          };
        }
        if (comment.replies?.length > 0) {
          return {
            ...comment,
            replies: updateCommentLikes(comment.replies)
          };
        }
        return comment;
      });
    };
    
    setComments(prev => updateCommentLikes(prev));
  }, []);

  // Delete handling
  const handleDeleteComment = useCallback((commentId, parentId = null) => {
    if (parentId) {
      const updateReplies = (commentList) => {
        return commentList.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies.filter(reply => reply.id !== commentId)
            };
          }
          if (comment.replies?.length > 0) {
            return {
              ...comment,
              replies: updateReplies(comment.replies)
            };
          }
          return comment;
        });
      };
      
      setComments(prev => updateReplies(prev));
    } else {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    }
  }, []);

  // Reply handling
  const handleReply = useCallback((comment) => {
    setReplyTo(comment);
    commentInputRef.current?.focus();
  }, []);

  // Calculate total comments
  const calculateTotalComments = (comments) => {
    return comments?.reduce((total, comment) => {
      return total + 1 + (comment.replies?.length || 0);
    }, 0);
  };

  const totalComments = calculateTotalComments(comments);

  return createPortal(
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      {/* <div className="flex w-full max-w-6xl h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl"> */}
        <div className="flex flex-col lg:flex-row w-full max-w-6xl h-[100vh] sm:h-[85vh] bg-white rounded-xl overflow-hidden">
        
        {/* Left Panel - Media */}
        <div className="w-full lg:w-1/2 bg-black flex items-center justify-center">
          <MediaPane post={post} />
        </div>

        {/* Right Panel - Comments */}
        <div className="w-full lg:w-1/2 flex flex-col h-full bg-white">
          
          {/* Sticky Header */}
          <div className={`shrink-0 relative p-4 transition-all duration-200 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : ''}`}>
            <button
              onClick={onClose}
              className="absolute right-2 top-2 hover:cursor-pointer p-2 hover:bg-gray-200 rounded-full z-20"
            >
              <CloseIcon size={20} className="text-gray-400 " />
            </button>
            
            <div className="flex items-start gap-1 md:gap-3">
              <Avatar 
                src={post?.author?.avatar || "/default-user-profile.svg"} 
                alt={post?.author?.name}
                className="!w-[60px] !h-[60px]"
              />
              
              <div className="flex-1">
                <div>
                  <p className="font-semibold text-gray-900">{post?.author?.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post?.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                      <div
                      ref={commentsContainerRef}
                      className="flex-1 w-full overflow-y-auto h-[66vh] p-1 md:px-4 py-1 md:py-3 custom-scroll "
                    >
                      {/* POST CONTENT */}
                      <div className="mb-4">
                        <TruncateText text={post.content} shortLimit={120} fullLimit={500}>
                          {(limit) => (
                            <ParseMentions text={post.content.slice(0, limit)} />
                          )}
                        </TruncateText>
                      </div>

                      <PostActionsCount
                        likes={post?.likes || 0}
                        comments={totalComments}
                        reposts={post.reposts || 0}
                        saved={post.saved}
                      />

<PostActions />
                           <div className="md:p-4">
              {comments?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="text-gray-400" size={24} />
                  </div>
                  <p className="font-semibold text-gray-700">No comments yet</p>
                  <p className="text-sm text-gray-500">Start the conversation</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {comments?.map((comment, index) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      currentUser={currentUser}
                      editingComment={editingComment}
                      onReply={handleReply}
                      handleVotePoll={handleVotePoll }
                      onLike={handleLikeComment}
                      onDelete={handleDeleteComment}
                      onEdit={handleEditComment}
                      isLastInThread={index === comments.length - 1}
                    />
                  ))}
                </div>
              )}
            </div>

 {imagePreview.length > 0 && (
            <div className="shrink-0 border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Preview</span>
                <button
                  onClick={() => {
                    setSelectedFiles([]);
                    setImagePreview([]);
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Clear all
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {imagePreview.map((preview, index) => (
                  <div key={index} className="relative flex-shrink-0 group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      onClick={() => {
                        URL.revokeObjectURL(preview);
                        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                        setImagePreview(prev => prev.filter((_, i) => i !== index));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      aria-label="Remove image"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}


{showPoll && (
  <div className=" p-4 bg-white">
    <div className="flex justify-between mb-3">
      <h3 className="font-semibold">Create Poll</h3>
      <button onClick={() => setShowPoll(false)}>
        <X size={18} />
      </button>
    </div>

    <input
      value={pollQuestion}
      onChange={(e) => setPollQuestion(e.target.value)}
      placeholder="Poll question"
      className="w-full border border-gray-300 rounded-full px-3 h-10 mb-3"
      
   style={{
    outline: "none",
    boxShadow: "none",
    WebkitBoxShadow: "none",
  
    appearance: "none",
    WebkitAppearance: "none",
  }}
    />

    {pollOptions.map((opt, i) => (
      <div key={i} className="flex gap-2 mb-2">
        <input
          value={opt}
          onChange={(e) => {
            const copy = [...pollOptions];
            copy[i] = e.target.value;
            setPollOptions(copy);
          }}
          placeholder={`Option ${i + 1}`}
          // className="flex-1 border rounded-full px-3 h-10"
                className="w-full border border-gray-300 rounded-full px-3 h-10 mb-3"
      
   style={{
    outline: "none",
    boxShadow: "none",
    WebkitBoxShadow: "none",
  
    appearance: "none",
    WebkitAppearance: "none",
  }}
        />
        {pollOptions.length > 2 && (
          <button
            onClick={() =>
              setPollOptions(pollOptions.filter((_, idx) => idx !== i))
            }
          >
            <X size={16} />
          </button>
        )}
      </div>
    ))}

    {pollOptions.length < 4 && (
      <button
        onClick={() => setPollOptions([...pollOptions, ""])}
        className="text-blue-600 text-sm mt-2"
      >
        + Add option
      </button>
    )}

    <select
      value={pollDuration}
      onChange={(e) => setPollDuration(e.target.value)}
      // className="w-full border rounded-full h-9 mt-3"
                className="w-full border border-gray-300 rounded-full px-3 h-10 mb-3"

       style={{
    outline: "none",
    boxShadow: "none",
    WebkitBoxShadow: "none",
  
    appearance: "none",
    WebkitAppearance: "none",
  }}
    >
      <option>1 Day</option>
      <option>3 Days</option>
      <option>7 Days</option>
    </select>


  </div>
)}

 </div>

      

                    </div>


           
          

              </div>
            
        <div className="shrink-0 border-t border-gray-200 bg-white relative">


                                 


{/* 🔁 EDIT / REPLY STRIP (OVERLAY) */}
{(editingComment || replyTo) && (
  <div className="absolute -top-10 left-0 right-0 px-4">
    <div className="flex items-center justify-between rounded-lg px-3 py-2 text-sm
      bg-blue-50 text-blue-700 shadow-sm">

      {editingComment && (
        <span>Editing your comment</span>
      )}

      {replyTo && (
        <span>
          Replying to <b>{replyTo.user.name}</b>
        </span>
      )}

      <button
        onClick={() => {
          setEditingComment(null);
          setReplyTo(null);
          setCommentText("");
        }}
        className="text-blue-700 hover:text-blue-900"
      >
        <X size={14} />
      </button>
    </div>
  </div>
)}

            {uploadError && (
              <div className="mb-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {uploadError}
              </div>
            )}

           
            <div className="flex gap-3">
   
              
               <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <div className="flex">
                      <SmartDropdown
  width={350}
  closeOnClick={false}  
  trigger={
    <button
      type="button"
      className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
      aria-label="Add emoji"
    >
      <Smile size={30} />
    </button>
  }
>
  <EmojiPicker
    onEmojiClick={(emojiData) => {
      setCommentText((prev) => prev + emojiData.emoji);
      commentInputRef.current?.focus();
    }}
    searchDisabled={false}
    skinTonesDisabled={true}
    height={350}
    width={350}
  />
</SmartDropdown>
                  <div className="w-full">
                  <input
  ref={commentInputRef}
  type="text"
  // placeholder="Write a comment..."
  placeholder={
  editingComment
    ? "Edit your comment..."
    : replyTo
    ? "Write a reply..."
    : "Write a comment..."
}
  value={commentText}
  onChange={(e) => setCommentText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (commentText.trim() || selectedFiles.length > 0) {
        handleSendComment();
      }
    }
  }}

   style={{
    outline: "none",
    boxShadow: "none",
    WebkitBoxShadow: "none",
    border: "1px solid #d1d5db",
    appearance: "none",
    WebkitAppearance: "none",
  }}
  className="w-full py-3 px-4 rounded-full"
  aria-label="Write a comment"
/>
                    
                          </div>
                    </div>
         
                    {/* Action Buttons inside input */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      
                     
                             <button
                          onClick={handleFileSelect}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:cursor-pointer rounded-full hover:bg-gray-100"
                          disabled={selectedFiles.length >= MAX_IMAGES}
                          aria-label="Add image"
                        >
                          <ImagePlus size={18} />
                        </button>
                      
                    
                           <button
                          onClick={() => setShowPoll(true)}
                          className="p-1.5 text-gray-500 hover:cursor-pointer hover:text-blue-600 rounded-full hover:bg-gray-100"
                          aria-label="Create poll"
                        >
                          <BarChart2 size={18} />
                        </button>
                    </div>
                  </div>
                  
                    <button
                    onClick={handleSendComment}
                    // disabled={!commentText.trim() && selectedFiles.length === 0}
                    className="p-3 rounded-full transition-colors hover:cursor-pointer bg-gray-100 text-gray-400 "
                    aria-label="Send comment"
                  >
                    <SendHorizontal size={20} className="text-blue-700 -rotate-30" />
                  </button>
                </div>
               
                
                {selectedFiles.length > 0 && (
                  <div className="text-xs text-gray-500 px-2">
                    {selectedFiles.length} image{selectedFiles.length !== 1 ? 's' : ''} selected
                  </div>
                )}
              </div>
            </div>

          </div>
            </div>
          </div>

     
      </div>
    </div>,
     document.body
  );
}

