// Community API utility functions
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const getHeaders = (includeAuth = true, isFormData = false) => {
  const headers = {};
  // Only set Content-Type for non-FormData requests
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
};

// Get all communities
export const getCommunities = async (filters = {}, page = 1, limit = 10) => {
  try {
    const { search, privacy, category } = filters;
    const queryParams = new URLSearchParams({ page, limit });
    if (search) queryParams.append("search", search);
    if (privacy) queryParams.append("privacy", privacy);
    if (category) queryParams.append("category", category);

    const response = await fetch(
      `${API_BASE_URL}/communities?${queryParams}`,
      {
        method: "GET",
        headers: getHeaders(false), // Public endpoint
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Communities fetched" : "Failed to fetch communities"),
    };
  } catch (error) {
    console.error("Get communities error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Create community
export const createCommunity = async (communityData) => {
  try {
    // Handle FormData if it's a FormData object
    const isFormData = communityData instanceof FormData;
    const headers = getHeaders(true, isFormData); // Include auth, mark as FormData
    
    const response = await fetch(`${API_BASE_URL}/communities`, {
      method: "POST",
      headers: headers,
      body: isFormData ? communityData : JSON.stringify(communityData),
    });
    
    const data = await response.json();
    console.log("📡 Create community API response:", {
      status: response.status,
      statusText: response.statusText,
      data: data
    });
    
    // Handle error responses
    if (!response.ok) {
      return {
        success: false,
        data: null,
        message: data.message || data.error || `Failed to create community (Status: ${response.status})`,
        error: data.error || data.message,
        status: response.status,
      };
    }
    
    // Ensure we have _id for MongoDB ObjectId
    if (data.data) {
      if (data.data._id) {
        data.data.id = data.data._id.toString(); // Add id alias for compatibility
      }
      // Also ensure _id is a string
      if (data.data._id && typeof data.data._id !== 'string') {
        data.data._id = data.data._id.toString();
      }
    }
    
    return {
      success: true,
      data: data.data,
      message: data.message || "Community created successfully",
    };
  } catch (error) {
    console.error("❌ Create community network error:", error);
    return { 
      success: false, 
      data: null,
      message: error.message || "Network error: Failed to connect to server",
      error: error.message,
    };
  }
};

// Get community by ID
export const getCommunityById = async (communityId) => {
  try {
    if (!communityId) {
      return { success: false, message: "Community ID is required" };
    }

    console.log("Fetching community:", `${API_BASE_URL}/communities/${communityId}`);
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}`, {
      method: "GET",
      headers: getHeaders(false), // Can be public
    });
    
    const data = await response.json();
    console.log("Community API response status:", response.status, "data:", data);
    
    if (!response.ok) {
      return {
        success: false,
        data: null,
        message: data.message || `Community not found (Status: ${response.status})`,
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message || "Community fetched",
    };
  } catch (error) {
    console.error("Get community error:", error);
    return { 
      success: false, 
      message: error.message || "Failed to fetch community. Please check your connection.",
      data: null
    };
  }
};

// Update community
export const updateCommunity = async (communityId, communityData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(communityData),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Community updated" : "Failed to update community"),
    };
  } catch (error) {
    console.error("Update community error:", error);
    return { success: false, message: error.message };
  }
};

// Delete community
export const deleteCommunity = async (communityId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Community deleted" : "Failed to delete community"),
    };
  } catch (error) {
    console.error("Delete community error:", error);
    return { success: false, message: error.message };
  }
};

// Join community
export const joinCommunity = async (communityId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}/join`, {
      method: "POST",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Joined community" : "Failed to join community"),
    };
  } catch (error) {
    console.error("Join community error:", error);
    return { success: false, message: error.message };
  }
};

// Leave community
export const leaveCommunity = async (communityId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}/leave`, {
      method: "POST",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Left community" : "Failed to leave community"),
    };
  } catch (error) {
    console.error("Leave community error:", error);
    return { success: false, message: error.message };
  }
};

// Get community members
export const getCommunityMembers = async (communityId, filters = {}, page = 1, limit = 20) => {
  try {
    const { role } = filters;
    const queryParams = new URLSearchParams({ page, limit });
    if (role) queryParams.append("role", role);

    const response = await fetch(
      `${API_BASE_URL}/communities/${communityId}/members?${queryParams}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Members fetched" : "Failed to fetch members"),
    };
  } catch (error) {
    console.error("Get community members error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Update member role
export const updateMemberRole = async (communityId, userId, role) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/communities/${communityId}/members/${userId}`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ role }),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Member role updated" : "Failed to update member role"),
    };
  } catch (error) {
    console.error("Update member role error:", error);
    return { success: false, message: error.message };
  }
};

// Remove member
export const removeMember = async (communityId, userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/communities/${communityId}/members/${userId}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Member removed" : "Failed to remove member"),
    };
  } catch (error) {
    console.error("Remove member error:", error);
    return { success: false, message: error.message };
  }
};

// Get community feed
export const getCommunityFeed = async (communityId, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/communities/${communityId}/feed?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Feed fetched" : "Failed to fetch feed"),
    };
  } catch (error) {
    console.error("Get community feed error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Create community post
export const createCommunityPost = async (communityId, postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}/posts`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Post created" : "Failed to create post"),
    };
  } catch (error) {
    console.error("Create community post error:", error);
    return { success: false, message: error.message };
  }
};

// Get community events
export const getCommunityEvents = async (communityId, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/communities/${communityId}/events?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Events fetched" : "Failed to fetch events"),
    };
  } catch (error) {
    console.error("Get community events error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Create community event
export const createCommunityEvent = async (communityId, eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}/events`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(eventData),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Event created" : "Failed to create event"),
    };
  } catch (error) {
    console.error("Create community event error:", error);
    return { success: false, message: error.message };
  }
};

// Get community files
export const getCommunityFiles = async (communityId, filters = {}, page = 1, limit = 20) => {
  try {
    const { category } = filters;
    const queryParams = new URLSearchParams({ page, limit });
    if (category) queryParams.append("category", category);

    const response = await fetch(
      `${API_BASE_URL}/communities/${communityId}/files?${queryParams}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Files fetched" : "Failed to fetch files"),
    };
  } catch (error) {
    console.error("Get community files error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get community chat messages
export const getCommunityChat = async (communityId, page = 1, limit = 50) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/communities/${communityId}/chat?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Chat messages fetched" : "Failed to fetch chat"),
    };
  } catch (error) {
    console.error("Get community chat error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Send community chat message
export const sendCommunityChat = async (communityId, messageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}/chat`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(messageData),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Message sent" : "Failed to send message"),
    };
  } catch (error) {
    console.error("Send community chat error:", error);
    return { success: false, message: error.message };
  }
};

// Get community analytics
export const getCommunityAnalytics = async (communityId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}/analytics`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || {},
      message: data.message || (response.ok ? "Analytics fetched" : "Failed to fetch analytics"),
    };
  } catch (error) {
    console.error("Get community analytics error:", error);
    return { success: false, message: error.message };
  }
};

// Get community invite link
export const getInviteLink = (communityId) => {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/community/${communityId}`;
};


