"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import PostCard from "./PostCard";
import RepostCard from "./Repost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";
import { addActivity } from "../utils/activityManager";
import ResumeStoryVideoCarousel from './ResumeStoryVideoCarousel';
import ReportModal from './ReportModal';
import FriendSuggestions from './FriendSuggestions';
import JoinCommunity from "./rightSideJoin";
import TrendingJobs from "./TrendingJobs";
import TrendingTopic from "./TrendingTopic";
import Footer from "../components/common/Footer";
import { handleGlobalAction } from "../save-items/handleActions"
import { getPosts } from "../utils/postsApi";

export default function PostsFeed({ }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users?.currentUser || null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportModal, setReportModal] = useState({
    open: false,
    postId: null,
    commentId: null
  });


  const feedContainerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  const [isReporting, setIsReporting] = useState(false);
  const initialStories = [
    // "Add Story" button (usually first)
    {
      id: "add-story",
      userName: "Add Story",
      avatar: "/my-avatar.jpg",
      viewed: false,
      isAddStory: true,
      items: []
    },

    // Regular user stories
    {
      id: 1,
      userName: "Shreya Singh",
      avatar: "https://images.unsplash.com/photo-1762325658409-5d8aa0e43261?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
      viewed: false,
      items: [
        {
          id: "1-a",
          type: "image",
          src: "/story1.jpg",
          duration: 4000
        }
      ]
    },
    {
      id: 2,
      userName: "Rahul Sharma",
      avatar: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
      viewed: true, // This story has been viewed
      items: [
        {
          id: "2-a",
          type: "image",
          src: "/story2.jpg",
          duration: 3500
        },
        {
          id: "2-b",
          type: "video",
          src: "/story2-video.mp4",
          duration: 5000
        }
      ]
    },
    {
      id: 3,
      userName: "Bruce mars",
      avatar: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8fDA%3D",
      viewed: true, // This story has been viewed
      items: [
        {
          id: "2-a",
          type: "image",
          src: "/story2.jpg",
          duration: 3500
        },
        {
          id: "2-b",
          type: "video",
          src: "/story2-video.mp4",
          duration: 5000
        }
      ]
    },
    {
      id: 4,
      userName: "Ayo Models",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWxzfGVufDB8fDB8fHww",
      viewed: true, // This story has been viewed
      items: [
        {
          id: "2-a",
          type: "image",
          src: "/story2.jpg",
          duration: 3500
        },
        {
          id: "2-b",
          type: "video",
          src: "/story2-video.mp4",
          duration: 5000
        }
      ]
    },
    {
      id: 5,
      userName: "Joren Aranas",
      avatar: "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      viewed: true, // This story has been viewed
      items: [
        {
          id: "2-a",
          type: "image",
          src: "/story2.jpg",
          duration: 3500
        },
        {
          id: "2-b",
          type: "video",
          src: "/story2-video.mp4",
          duration: 5000
        }
      ]
    },
  ];

  useEffect(() => {
  const handleScroll = () => {
    if (!feedContainerRef.current) return;
    
    const rect = feedContainerRef.current.getBoundingClientRect();
  
    const stickyThreshold = 82; 
    
    if (rect.top <= stickyThreshold) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  const [stories, setStories] = useState(initialStories);

  // Pehle check karein ki data local storage mein hai ya nahi
const [collections, setCollections] = useState(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("user_collections");
    return saved ? JSON.parse(saved) : [{ id: 1, name: "General", items: [] }];
  }
  return [{ id: 1, name: "General", items: [] }];
});
// 🔥 Direct saved items ke liye alag state
  const [directSaved, setDirectSaved] = useState(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("direct_saved_items");
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      // 🔥 Safety Check: Agar data object hai toh use array mein convert karo
      return Array.isArray(parsed) ? parsed : Object.values(parsed).flat();
    } catch {
      return [];
    }
  }
  return [];
});
  // 2. LocalStorage Sync
  useEffect(() => {
    localStorage.setItem("direct_saved_items", JSON.stringify(directSaved));
  }, [directSaved]);
  
// Jab bhi collections change ho, local storage update karein
useEffect(() => {
  localStorage.setItem("user_collections", JSON.stringify(collections));
}, [collections]);



const onSaveAction = (actionType, data, type) => {
  handleGlobalAction(actionType, data, type, { 
    setCollections,     // Ye wahi naam hona chahiye jo function definition mein hai
    setDirectSaved, 
  
  });
};
  useEffect(() => {
    const fetchStories = async () => {
      const res = await fetch("/api/stories");
      const data = await res.json();
      setStories(data);
    };

    fetchStories();
  }, []);

  // === Fetch Posts from API ===
  useEffect(() => {
    const fetchPostsData = async () => {
      setLoading(true);
      try {
        const result = await getPosts({ page: 1, limit: 50 });
        console.log(result);
        if (result.success && result.data) {
          // Transform backend post data to frontend format
          const transformedPosts = result.data.map(post => ({
            id: post._id,
            author: post.author ? {
              id: post.author._id || post.author.id,
              name: `${post.author.firstName || ''} ${post.author.lastName || ''}`.trim() || post.author.userName || 'Anonymous',
              username: post.author.userName || '',
              avatar: post.author.profileImage || '/default-user-profile.svg',
              verified: post.author.verified || false,
            } : {
              id: currentUser?.id,
              name: currentUser?.name || 'Anonymous',
              username: currentUser?.username || '',
              avatar: currentUser?.avatar || '/default-user-profile.svg',
              verified: false,
            },
            content: post.content || '',
            images: post.media || [],
            videos: post.videos || [],
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            likes: post.likes || [],
            comments: post.comments || [],
            shares: post.shares || 0,
            views: post.views || 0,
            tags: post.tags || [],
            type: post.type || 'post',
            isLiked: post.likes?.some(like => like.userId === currentUser?.id) || false,
            isReposted: post.shares > 0 && post.repostedBy?.includes(currentUser?.id) || false,
          }));
          setPosts(transformedPosts);
          
          // Also update Redux if needed
          if (currentUser) {
            const updatedUser = { ...currentUser, posts: transformedPosts };
            dispatch(updateUser(updatedUser));
          }
        } else {
          // Fallback to Redux posts if API fails
          setPosts(currentUser?.posts || []);
          if (result.message) {
            toast.error(result.message);
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Fallback to Redux posts on error
        setPosts(currentUser?.posts || []);
        toast.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
    
  }, [currentUser?.id, dispatch]);

  const persistPosts = useCallback((updatedPosts) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, posts: updatedPosts };
      dispatch(updateUser(updatedUser));
      window.dispatchEvent(new Event("postsUpdated"));
    }
  }, [currentUser, dispatch]);


  const handleReportSubmit = async (category, details) => {
    setIsReporting(true);

    try {
      const { postId, commentId } = reportModal;

      console.log("Report submitted:", {
        postId,
        commentId,
        category,
        details,
        reportedBy: currentUser?.id
      });

      // ✅ IMPORTANT: Return success object
      const result = { success: true };


      // Add to user activities
      if (currentUser?.id) {
        addActivity(currentUser.id, {
          type: "report",
          postId,
          commentId,
          category,
          details,
          message: `You reported a ${commentId ? 'comment' : 'post'} for ${category}`,
          timestamp: new Date().toISOString(),
        });
      }

      // ✅ Return success - this tells the modal that submission was successful
      return result;

    } catch (error) {
      console.error("Report submission error:", error);

      // toast.error("Failed to submit report. Please try again.");

      // ✅ Throw error - this tells the modal that submission failed
      throw error;
    } finally {
      setIsReporting(false);
    }
  };

  const handleReport = (postId, commentId = null) => {
    setReportModal({
      open: true,
      postId,
      commentId
    });
  };

  // === FIXED: Not Interested Functionality ===
  const handleNotInterested = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    persistPosts(updatedPosts);

    // toast.info("We'll show fewer posts like this");

    if (currentUser?.id) {
      addActivity(currentUser

        .id, {
        type: "not_interested",
        postId,
        message: "You marked a post as not interested",
      });
    }
  };

  // === FIXED: Hide Post Functionality ===
  const handleHidePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    persistPosts(updatedPosts);

    // toast.info("Post hidden from your feed");

    if (currentUser?.id) {
      addActivity(currentUser.id, {
        type: "hide_post",
        postId,
        message: "You hid a post from your feed",
      });
    }
  };

  // === Edit Post Functionality ===
  const handleEditPost = (post) => {
    
    // This would open the edit post modal
    // toast.info(`Editing post: ${post.id}`);
    console.log("Edit post:", post);
    // You can implement the edit modal logic here
  };

  // === Delete Post Functionality ===
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    persistPosts(updatedPosts);

    // toast.success("Post deleted successfully");

    addActivity(currentUser.id, {
      type: "delete_post",
      postId,
      message: "You deleted your post",
    });
  };

  // === Toggle Comments Functionality ===
  const handleToggleComments = (postId, enabled) => {
    const updatedPosts = posts.map(post =>
      post.id === postId
        ? { ...post, commentsEnabled: enabled }
        : post
    );
    setPosts(updatedPosts);
    persistPosts(updatedPosts);
  };

  // === Like Functionality ===
  const handleLike = (postId) => {
    const prevPost = posts.find((p) => p.id === postId);
    const wasLiked = prevPost?.liked;
    const wasDisliked = prevPost?.disliked;

    const updated = posts.map((p) => {
      if (p.id !== postId) return p;

      let likes = p.likes || 0;
      let dislikes = p.dislikes || 0;

      if (wasLiked) likes = Math.max(0, likes - 1);
      else {
        likes += 1;
        if (wasDisliked) dislikes = Math.max(0, dislikes - 1);
      }

      return {
        ...p,
        liked: !wasLiked,
        disliked: false,
        likes,
        dislikes,
      };
    });

    persistPosts(updated);
    setPosts(updated);

    if (!wasLiked) {
      addActivity(currentUser.id, {
        type: "like",
        postId,
        message: "You liked a post.",
      });
    } else {
      addActivity(currentUser.id, {
        type: "unlike",
        postId,
        message: "You removed your like.",
      });
    }
  };



  // === Share ===
  const handleShare = (postId) => {
    const url = `${window.location.origin}/post/${postId}`;
    if (navigator.share) {
      navigator.share({ title: "Post", url }).catch(() => {
        navigator.clipboard.writeText(url);

      });
    } else {
      navigator.clipboard.writeText(url);

    }
  };



const handlePollVote = (postId, optionIndex) => {
  setPosts((prev) =>
    prev.map((p) => {
      if (p.id !== postId) return p;

      let newVotes = [...p.poll.votes];

      // 1. If UNDO is clicked (optionIndex is null)
      if (optionIndex === null) {
        if (p.pollSelection !== null) {
          newVotes[p.pollSelection] = Math.max(0, newVotes[p.pollSelection] - 1);
        }
        return {
          ...p,
          poll: { ...p.poll, votes: newVotes },
          pollVoted: false,
          pollSelection: null,
        };
      }

      // 2. If CHANGING vote (subtract from old, add to new)
      if (p.pollSelection !== null && p.pollSelection !== optionIndex) {
        newVotes[p.pollSelection] = Math.max(0, newVotes[p.pollSelection] - 1);
        newVotes[optionIndex] += 1;
      } 
      // 3. If FIRST TIME voting
      else if (p.pollSelection === null) {
        newVotes[optionIndex] += 1;
      }

      return {
        ...p,
        poll: { ...p.poll, votes: newVotes },
        pollVoted: true,
        pollSelection: optionIndex,
      };
    })
  );
};
  const handleRepost = (postId, quote = null, undo = false) => {
    // Create updated posts synchronously
    const original = posts.find((p) => p.id === postId);
    if (!original) return;

    // Update repost count on original post
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const newRepostCount = undo
          ? Math.max(0, (p.reposts || 0) - 1)
          : (p.reposts || 0) + 1;
        return { ...p, reposts: newRepostCount };
      }
      return p;
    });

    let finalPosts;

    if (!undo) {
      const newRepost = {
        id: Date.now().toString(),
        type: "repost",
        user: {
          name: currentUser?.name || "You",
          username: currentUser?.username || "me",
          avatar: currentUser?.avatar || "",
        },
        originalId: postId,
        originalPost: original,
        quote: quote,
        timestamp: new Date().toISOString(),
        repostType: quote ? "quote" : "direct",
      };

      finalPosts = [newRepost, ...updated];
    } else {
      // Remove repost from feed
      finalPosts = updated.filter(p =>
        !(p.type === "repost" &&
          p.user.username === currentUser?.username &&
          p.originalId === postId)
      );
    }

    // Update local state synchronously
    setPosts(finalPosts);

    // Store posts to persist later
    persistPosts(finalPosts);

    // Store activity to add later
    if (currentUser?.id) {
      addActivity.current = {
        type: undo ? "undo_repost" : "repost",
        postId,
        message: undo
          ? "You removed your repost"
          : quote
            ? "You reposted a post with your thoughts"
            : "You reposted a post",
      };
    }
  };

  useEffect(() => {
    const handle = () => setPosts(currentUser?.posts || []);
    window.addEventListener("postsUpdated", handle);
    return () => window.removeEventListener("postsUpdated", handle);
  }, [currentUser]);

  return (
    <div className="relative  pt-10  text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ReportModal
          open={reportModal.open}
          onClose={() =>
            setReportModal({ open: false, postId: null, commentId: null })
          }
          targetType={reportModal.commentId ? "comment" : "post"}
          onSubmit={handleReportSubmit}
        />

        <div className="p-4">
          <ResumeStoryVideoCarousel stories={stories} />
        </div>


        <div className="flex gap-6 lg:mx-10 mt-2 ">

          {/* LEFT: Posts Column (75% width) */}
          <div className="flex-1 mt-4 lg:max-w-[680px]">
                 <div ref={feedContainerRef}
            style={{ top: '80px' }}
             className={`
      sticky 
      h-[calc(100vh-100px)] 
      bg-white 
      border-[0.3px] border-[#cccccc] rounded-bl-none
  rounded-br-none
  border-b-0 rounded-2xl 
      transition-all duration-300
      ${isSticky ? 'overflow-y-auto custom-scroll' : 'overflow-hidden'} 
    `}>

              <div className="divide-y divide-gray-100">
                {posts.map((post) => {
                  if (!post || !post.id) {
                    return null;
                  }

                  if (post.type === "repost") {
                    const originalPost = posts.find((x) => x && x.id === post.originalId);

                    if (!originalPost) {
                      console.warn('Original post not found for repost:', post.id);
                      return null;
                    }

                      return (
                        <div key={post.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <RepostCard
                            post={post}
                            originalPost={originalPost}
                            onLike={handleLike}
                            liked={post.liked}
                            onRepost={handleRepost}
                            onPollVote={handlePollVote}
                            onShare={handleShare}
                            onReport={handleReport}
                             onSaveAction={onSaveAction}
                              collections={collections}
                              directSaved={directSaved}
                            onNotInterested={handleNotInterested}
                            onHidePost={handleHidePost}
                            onEditPost={handleEditPost}
                            onDeletePost={handleDeletePost}
                           
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div key={post.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <PostCard
                            post={post}
                            mode="feed"
                            onLike={handleLike}           
                            onRepost={handleRepost}
                           liked={post.liked}           
                            collections={collections}
                            // onSaveToCollection={handleSaveToCollection}
                         directSaved={directSaved}
              onSaveAction={onSaveAction}
                            onPollVote={handlePollVote}
                            onShare={handleShare}
                            onReport={handleReport}
                            onNotInterested={handleNotInterested}
                            onHidePost={handleHidePost}
                            onEditPost={handleEditPost}
                            onDeletePost={handleDeletePost}
                            onToggleComments={handleToggleComments}
                          />
                        </div>
                      );
                    }
                  })}
                </div>

              {/* Trending Sections - Scrolls with posts */}
              <div className="mt-6 space-y-6">
                <TrendingTopic />
                <TrendingJobs />
              </div>

            </div>
          </div>

          {/* RIGHT: Sidebar Column (25% width) */}
          <div className="hidden mt-4 lg:block w-[30%]">
            <div
            // className="sticky top-[240px] h-[680px]  border-[0.3px] border-[#cccccc] rounded-2xl    custom-scroll overflow-y-auto pl-2 bg-[#fff]">
            // className="sticky top-[260px] max-h-[85vh]  space-y-4    custom-scroll overflow-y-auto pl-2 
            >
              <FriendSuggestions />
              {/* <JoinCommunity /> */}
              <Footer />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}