// Transform backend post format to frontend format

export const transformBackendPostToFrontend = (backendPost, currentUser = null) => {
  if (!backendPost) return null;

  const isLiked = backendPost.isLiked || false;

  return {
    id: backendPost._id || backendPost.id,
    content: backendPost.content || "",
    image: backendPost.media && backendPost.media.length > 0 
      ? backendPost.media.find(m => m.type === "image")?.url || backendPost.media[0].url
      : null,
    images: backendPost.media?.filter(m => m.type === "image").map(m => m.url) || [],
    video: backendPost.media?.find(m => m.type === "video")?.url || null,
    user: {
      id: backendPost.author?._id || backendPost.author?.id,
      name: `${backendPost.author?.firstName || ""} ${backendPost.author?.lastName || ""}`.trim() || backendPost.author?.userName,
      username: backendPost.author?.userName || backendPost.author?.username,
      avatar: backendPost.author?.profileImage || backendPost.author?.avatar || "/profiledefault.jpg",
    },
    location: backendPost.location || "",
    tags: backendPost.tags || [],
    likes: backendPost.likesCount || 0,
    liked: isLiked,
    dislikes: 0, // Backend doesn't have dislikes, keeping for compatibility
    disliked: false,
    commentsCount: backendPost.commentsCount || 0,
    reposts: backendPost.repostsCount || 0,
    comments: [], // Will be loaded separately if needed
    createdAt: backendPost.createdAt || backendPost.timestamps?.createdAt || new Date().toISOString(),
    updatedAt: backendPost.updatedAt || backendPost.editedAt || null,
    isEdited: backendPost.isEdited || false,
    privacy: backendPost.privacy || "public",
    type: "post", // Regular post
  };
};

export const transformBackendCommentToFrontend = (backendComment) => {
  if (!backendComment) return null;

  return {
    id: backendComment._id || backendComment.id,
    content: backendComment.content || "",
    user: {
      id: backendComment.author?._id || backendComment.author?.id,
      name: `${backendComment.author?.firstName || ""} ${backendComment.author?.lastName || ""}`.trim() || backendComment.author?.userName,
      username: backendComment.author?.userName || backendComment.author?.username,
      avatar: backendComment.author?.profileImage || backendComment.author?.avatar || "/profiledefault.jpg",
    },
    likes: backendComment.likesCount || 0,
    liked: backendComment.isLiked || false,
    createdAt: backendComment.createdAt || new Date().toISOString(),
    edited: backendComment.isEdited || false,
    replies: backendComment.replies || [],
    replyTo: backendComment.parentComment ? {
      id: backendComment.parentComment._id || backendComment.parentComment.id,
      name: backendComment.parentComment.author?.userName,
    } : null,
  };
};

export const transformBackendStoryToFrontend = (backendStory) => {
  if (!backendStory) return null;

  return {
    id: backendStory._id || backendStory.id,
    userName: `${backendStory.author?.firstName || ""} ${backendStory.author?.lastName || ""}`.trim() || backendStory.author?.userName,
    avatar: backendStory.author?.profileImage || backendStory.author?.avatar || "/profiledefault.jpg",
    viewed: backendStory.viewed || false,
    items: [{
      id: backendStory._id || backendStory.id,
      type: backendStory.media?.type || "image",
      src: backendStory.media?.url || "",
      thumbnail: backendStory.media?.thumbnail || null,
      duration: 5000, // Default duration
    }],
  };
};

export const transformBackendStoriesToFrontend = (backendStoriesData) => {
  if (!backendStoriesData || !Array.isArray(backendStoriesData.data)) {
    return [];
  }

  // Backend returns stories grouped by author
  const transformed = backendStoriesData.data.map(group => ({
    id: group.author?._id || group.author?.id,
    userName: `${group.author?.firstName || ""} ${group.author?.lastName || ""}`.trim() || group.author?.userName,
    avatar: group.author?.profileImage || group.author?.avatar || "/profiledefault.jpg",
    viewed: false, // Can be enhanced with viewer tracking
    items: group.stories.map(story => ({
      id: story._id || story.id,
      type: story.media?.type || "image",
      src: story.media?.url || "",
      thumbnail: story.media?.thumbnail || null,
      duration: 5000,
    })),
  }));

  return transformed;
};









