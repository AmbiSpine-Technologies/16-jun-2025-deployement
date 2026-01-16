// Connections/Network API utility functions
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Follow user
export const followUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/connections/${userId}`, {
      method: "POST",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "User followed" : "Failed to follow user"),
    };
  } catch (error) {
    console.error("Follow user error:", error);
    return { success: false, message: error.message };
  }
};

// Unfollow user
export const unfollowUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/connections/${userId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "User unfollowed" : "Failed to unfollow user"),
    };
  } catch (error) {
    console.error("Unfollow user error:", error);
    return { success: false, message: error.message };
  }
};

// Get followers
export const getFollowers = async (userId, page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/connections/${userId}/followers?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "Followers fetched" : "Failed to fetch followers"),
    };
  } catch (error) {
    console.error("Get followers error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get following
export const getFollowing = async (userId, page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/connections/${userId}/following?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "Following fetched" : "Failed to fetch following"),
    };
  } catch (error) {
    console.error("Get following error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Check connection status
export const checkConnection = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/connections/${userId}/check`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || {},
      message: data.message || (response.ok ? "Connection status fetched" : "Failed to check connection"),
    };
  } catch (error) {
    console.error("Check connection error:", error);
    return { success: false, message: error.message };
  }
};

// Get friend suggestions
export const getFriendSuggestions = async (limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/connections/suggestions?limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      message: data.message || (response.ok ? "Suggestions fetched" : "Failed to fetch suggestions"),
    };
  } catch (error) {
    console.error("Get friend suggestions error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Search users
export const searchUsers = async (query, page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/connections/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "Users found" : "Failed to search users"),
    };
  } catch (error) {
    console.error("Search users error:", error);
    return { success: false, message: error.message, data: [] };
  }
};









