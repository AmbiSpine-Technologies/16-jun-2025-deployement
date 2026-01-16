// Activity Feed API utility functions
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

// Get user activities
export const getActivities = async (filters = {}, page = 1, limit = 20) => {
  try {
    const { type } = filters;
    const queryParams = new URLSearchParams({ page, limit });
    if (type) queryParams.append("type", type);

    const response = await fetch(
      `${API_BASE_URL}/activity?${queryParams}`,
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
      message: data.message || (response.ok ? "Activities fetched" : "Failed to fetch activities"),
    };
  } catch (error) {
    console.error("Get activities error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get activities by type
export const getActivitiesByType = async (type, page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/activity/${type}?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "Activities fetched" : "Failed to fetch activities"),
    };
  } catch (error) {
    console.error("Get activities by type error:", error);
    return { success: false, message: error.message, data: [] };
  }
};









