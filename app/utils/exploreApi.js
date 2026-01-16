// Explore/Discovery API utility functions
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const getHeaders = (includeAuth = false) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
};

// Get trending content
export const getTrendingContent = async (limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/explore?limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(false),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || {},
      message: data.message || (response.ok ? "Trending content fetched" : "Failed to fetch trending content"),
    };
  } catch (error) {
    console.error("Get trending content error:", error);
    return { success: false, message: error.message, data: {} };
  }
};

// Get trending jobs
export const getTrendingJobs = async (limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/explore/trending-jobs?limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(false),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      message: data.message || (response.ok ? "Trending jobs fetched" : "Failed to fetch trending jobs"),
    };
  } catch (error) {
    console.error("Get trending jobs error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get trending topics
export const getTrendingTopics = async (limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/explore/trending-topics?limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(false),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      message: data.message || (response.ok ? "Trending topics fetched" : "Failed to fetch trending topics"),
    };
  } catch (error) {
    console.error("Get trending topics error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get personalized suggestions
export const getPersonalizedSuggestions = async (limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/explore/suggestions?limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(true),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || {},
      message: data.message || (response.ok ? "Suggestions fetched" : "Failed to fetch suggestions"),
    };
  } catch (error) {
    console.error("Get personalized suggestions error:", error);
    return { success: false, message: error.message, data: {} };
  }
};









