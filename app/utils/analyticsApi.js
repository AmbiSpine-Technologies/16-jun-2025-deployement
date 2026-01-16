// Analytics API utility functions
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

// Get profile analytics
export const getProfileAnalytics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/profile`, {
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
    console.error("Get profile analytics error:", error);
    return { success: false, message: error.message };
  }
};

// Get community analytics
export const getCommunityAnalytics = async (communityId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/community/${communityId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || {},
      message: data.message || (response.ok ? "Community analytics fetched" : "Failed to fetch community analytics"),
    };
  } catch (error) {
    console.error("Get community analytics error:", error);
    return { success: false, message: error.message };
  }
};

// Get job analytics
export const getJobAnalytics = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/job/${jobId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || {},
      message: data.message || (response.ok ? "Job analytics fetched" : "Failed to fetch job analytics"),
    };
  } catch (error) {
    console.error("Get job analytics error:", error);
    return { success: false, message: error.message };
  }
};









