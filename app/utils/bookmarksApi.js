// Bookmarks/Saved Items API utility functions
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

// Get bookmarks
export const getBookmarks = async (filters = {}, page = 1, limit = 20) => {
  try {
    const { type } = filters;
    const queryParams = new URLSearchParams({ page, limit });
    if (type) queryParams.append("type", type);

    const response = await fetch(
      `${API_BASE_URL}/bookmarks?${queryParams}`,
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
      message: data.message || (response.ok ? "Bookmarks fetched" : "Failed to fetch bookmarks"),
    };
  } catch (error) {
    console.error("Get bookmarks error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Toggle bookmark (add or remove)
export const toggleBookmark = async (itemType, itemId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        itemType,
        itemId,
      }),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Bookmark toggled" : "Failed to toggle bookmark"),
    };
  } catch (error) {
    console.error("Toggle bookmark error:", error);
    return { success: false, message: error.message };
  }
};

// Check if item is bookmarked
export const checkBookmark = async (itemType, itemId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bookmarks/check?itemType=${itemType}&itemId=${itemId}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || { isBookmarked: false },
      message: data.message || (response.ok ? "Bookmark status checked" : "Failed to check bookmark"),
    };
  } catch (error) {
    console.error("Check bookmark error:", error);
    return { success: false, message: error.message, data: { isBookmarked: false } };
  }
};

// Remove bookmark
export const removeBookmark = async (bookmarkId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks/${bookmarkId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Bookmark removed" : "Failed to remove bookmark"),
    };
  } catch (error) {
    console.error("Remove bookmark error:", error);
    return { success: false, message: error.message };
  }
};









