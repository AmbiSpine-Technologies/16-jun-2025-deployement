// Search API utility functions
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

// Global search
export const globalSearch = async (query, type = null, page = 1, limit = 10) => {
  try {
    const queryParams = new URLSearchParams({ q: query, page, limit });
    if (type) queryParams.append("type", type);

    const response = await fetch(
      `${API_BASE_URL}/search?${queryParams}`,
      {
        method: "GET",
        headers: getHeaders(false),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || {},
      message: data.message || (response.ok ? "Search completed" : "Failed to search"),
    };
  } catch (error) {
    console.error("Global search error:", error);
    return { success: false, message: error.message, data: {} };
  }
};

// Search users
export const searchUsers = async (query, page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(false),
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

// Search posts
export const searchPosts = async (query, filters = {}, page = 1, limit = 20) => {
  try {
    const { author, tags } = filters;
    const queryParams = new URLSearchParams({ q: query, page, limit });
    if (author) queryParams.append("author", author);
    if (tags) {
      if (Array.isArray(tags)) {
        tags.forEach((tag) => queryParams.append("tags", tag));
      } else {
        queryParams.append("tags", tags);
      }
    }

    const response = await fetch(
      `${API_BASE_URL}/search/posts?${queryParams}`,
      {
        method: "GET",
        headers: getHeaders(false),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Posts found" : "Failed to search posts"),
    };
  } catch (error) {
    console.error("Search posts error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Search jobs
export const searchJobs = async (query, filters = {}, page = 1, limit = 20) => {
  try {
    const { location, workMode, jobType } = filters;
    const queryParams = new URLSearchParams({ q: query, page, limit });
    if (location) queryParams.append("location", location);
    if (workMode) queryParams.append("workMode", workMode);
    if (jobType) queryParams.append("jobType", jobType);

    const response = await fetch(
      `${API_BASE_URL}/search/jobs?${queryParams}`,
      {
        method: "GET",
        headers: getHeaders(false),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Jobs found" : "Failed to search jobs"),
    };
  } catch (error) {
    console.error("Search jobs error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Search communities
export const searchCommunities = async (query, filters = {}, page = 1, limit = 20) => {
  try {
    const { privacy, category } = filters;
    const queryParams = new URLSearchParams({ q: query, page, limit });
    if (privacy) queryParams.append("privacy", privacy);
    if (category) queryParams.append("category", category);

    const response = await fetch(
      `${API_BASE_URL}/search/communities?${queryParams}`,
      {
        method: "GET",
        headers: getHeaders(false),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Communities found" : "Failed to search communities"),
    };
  } catch (error) {
    console.error("Search communities error:", error);
    return { success: false, message: error.message, data: [] };
  }
};









