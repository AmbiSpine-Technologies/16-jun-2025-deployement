// Posts API utility functions
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Get headers with auth token
const getHeaders = (includeAuth = true) => {
   const headers = {};
  // const headers = {
  //   "Content-Type": "application/json",
  // };
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
};

// ==================== POSTS ====================

// Get all posts (feed)
export const getPosts = async (filters = {}) => {
  try {
    const { page = 1, limit = 10, search, author, tags } = filters;
    const queryParams = new URLSearchParams({ page, limit });
    if (search) queryParams.append("search", search);
    if (author) queryParams.append("author", author);
    if (tags) {
      if (Array.isArray(tags)) {
        tags.forEach((tag) => queryParams.append("tags", tag));
      } else {
        queryParams.append("tags", tags);
      }
    }

    const response = await fetch(`${API_BASE_URL}/posts?${queryParams}`, {
      method: "GET",
      headers: getHeaders(false), // Posts can be public
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch posts");
    }
    return data;
  } catch (error) {
    console.error("Get posts error:", error);
    throw error;
  }
};

// Get single post by ID
export const getPostById = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "GET",
      headers: getHeaders(false),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch post");
    }
    return data;
  } catch (error) {
    console.error("Get post by ID error:", error);
    throw error;
  }
};


export const createPost = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/posts/create-post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create post");
    }

    return data;
  } catch (error) {
    console.error("Create post error:", error);
    throw error;
  }
};

// Update a post
export const updatePost = async (postId, postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update post");
    }
    return data;
  } catch (error) {
    console.error("Update post error:", error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: getHeaders(true),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete post");
    }
    return data;
  } catch (error) {
    console.error("Delete post error:", error);
    throw error;
  }
};

// Like/Unlike a post
// export const toggleLikePost = async (postId) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
//       method: "POST",
//       headers: getHeaders(true),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || "Failed to toggle like");
//     }
//     return data;
//   } catch (error) {
//     console.error("Toggle like post error:", error);
//     throw error;
//   }
// };


// Like / React to post
export const reactToPost = async (postId, reaction = "like") => {
  if (!postId) throw new Error("Post ID is required"); // Prevent 'undefined' in URL
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
      method: "POST",
      headers: {
        ...getHeaders(true),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reaction }), // 🔥 IMPORTANT
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to react to post");
    }

    return data;
  } catch (error) {
    console.error("React to post error:", error);
    throw error;
  }
};


// Get reposts of a post
export const getReposts = async (postId, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/reposts?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(false),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch reposts");
    }
    return data;
  } catch (error) {
    console.error("Get reposts error:", error);
    throw error;
  }
};

// ==================== COMMENTS ====================

// Get comments for a post
export const getComments = async (postId, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/comments?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(false),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch comments");
    }
    return data;
  } catch (error) {
    console.error("Get comments error:", error);
    throw error;
  }
};

// Create a comment
export const createComment = async (postId, commentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: "POST",
      // headers: getHeaders(true),
        headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`, // agar auth hai
  },
      body: JSON.stringify(commentData),
    });
 console.log(response, commentData);
    const data = await response.json();
    
    // Return consistent structure
    return {
      success: response.ok && data.success !== false,
      data: data.data || data,
      message: data.message || (response.ok ? "Comment created" : "Failed to create comment"),
      error: data.error || (!response.ok ? data.message : null),
    };
  } catch (error) {
    console.error("Create comment error:", error);
    return {
      success: false,
      message: error.message || "Failed to create comment",
      error: error.message,
    };
  }
};

// Update a comment
export const updateComment = async (commentId, commentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/comments/${commentId}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify(commentData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update comment");
    }
    return data;
  } catch (error) {
    console.error("Update comment error:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/comments/${commentId}`, {
      method: "DELETE",
      headers: getHeaders(true),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete comment");
    }
    return data;
  } catch (error) {
    console.error("Delete comment error:", error);
    throw error;
  }
};

// Like/Unlike a comment
export const toggleLikeComment = async (commentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/comments/${commentId}/like`, {
      method: "POST",
      headers: getHeaders(true),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to toggle like");
    }
    return data;
  } catch (error) {
    console.error("Toggle like comment error:", error);
    throw error;
  }
};

// Get replies to a comment
export const getCommentReplies = async (commentId, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts/comments/${commentId}/replies?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(false),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch replies");
    }
    return data;
  } catch (error) {
    console.error("Get comment replies error:", error);
    throw error;
  }
};

// ==================== REPOSTS ====================

// Create a repost
export const createRepost = async (postId, caption = "") => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/repost`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({ caption }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to repost");
    }
    return data;
  } catch (error) {
    console.error("Create repost error:", error);
    throw error;
  }
};

// Remove a repost
export const removeRepost = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/repost`, {
      method: "DELETE",
      headers: getHeaders(true),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to remove repost");
    }
    return data;
  } catch (error) {
    console.error("Remove repost error:", error);
    throw error;
  }
};

// ==================== STORIES ====================

// Get all stories
export const getStories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/stories/all`, {
      method: "GET",
      headers: getHeaders(false),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch stories");
    }
    return data;
  } catch (error) {
    console.error("Get stories error:", error);
    throw error;
  }
};

// Create a story
export const createStory = async (storyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/stories`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(storyData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create story");
    }
    return data;
  } catch (error) {
    console.error("Create story error:", error);
    throw error;
  }
};

// Get single story by ID
export const getStoryById = async (storyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/stories/${storyId}`, {
      method: "GET",
      headers: getHeaders(false),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch story");
    }
    return data;
  } catch (error) {
    console.error("Get story by ID error:", error);
    throw error;
  }
};

// View a story (mark as viewed)
export const viewStory = async (storyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/stories/${storyId}/view`, {
      method: "POST",
      headers: getHeaders(true),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to view story");
    }
    return data;
  } catch (error) {
    console.error("View story error:", error);
    throw error;
  }
};

// Delete a story
export const deleteStory = async (storyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/stories/${storyId}`, {
      method: "DELETE",
      headers: getHeaders(true),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete story");
    }
    return data;
  } catch (error) {
    console.error("Delete story error:", error);
    throw error;
  }
};

// ==================== REPORTS ====================

// Report a post
export const reportPost = async (postId, reportData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/report`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(reportData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to report post");
    }
    return data;
  } catch (error) {
    console.error("Report post error:", error);
    throw error;
  }
};

// Report a comment
export const reportComment = async (commentId, reportData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/comments/${commentId}/report`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(reportData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to report comment");
    }
    return data;
  } catch (error) {
    console.error("Report comment error:", error);
    throw error;
  }
};

// Report a story
export const reportStory = async (storyId, reportData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/stories/${storyId}/report`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(reportData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to report story");
    }
    return data;
  } catch (error) {
    console.error("Report story error:", error);
    throw error;
  }
};


