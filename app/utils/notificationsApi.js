// Notifications API utility functions
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

// Get notifications
export const getNotifications = async (filters = {}, page = 1, limit = 20) => {
  try {
    const { type, read } = filters;
    const queryParams = new URLSearchParams({ page, limit });
    if (type) queryParams.append("type", type);
    if (read !== undefined) queryParams.append("read", read);

    const response = await fetch(
      `${API_BASE_URL}/notifications?${queryParams}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    
    // Log response for debugging
    if (!response.ok) {
      console.error("❌ Notifications API Error:", {
        status: response.status,
        statusText: response.statusText,
        data: data
      });
    }
    
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Notifications fetched" : "Failed to fetch notifications"),
      status: response.status
    };
  } catch (error) {
    console.error("Get notifications error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get unread count
export const getUnreadNotificationsCount = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/unread-count`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || { count: 0 },
      message: data.message || (response.ok ? "Unread count fetched" : "Failed to get unread count"),
    };
  } catch (error) {
    console.error("Get unread count error:", error);
    return { success: false, message: error.message, data: { count: 0 } };
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: "PUT",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Notification marked as read" : "Failed to mark notification"),
    };
  } catch (error) {
    console.error("Mark notification as read error:", error);
    return { success: false, message: error.message };
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: "PUT",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "All notifications marked as read" : "Failed to mark all as read"),
    };
  } catch (error) {
    console.error("Mark all notifications as read error:", error);
    return { success: false, message: error.message };
  }
};

// Delete notification
export const deleteNotification = async (notificationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Notification deleted" : "Failed to delete notification"),
    };
  } catch (error) {
    console.error("Delete notification error:", error);
    return { success: false, message: error.message };
  }
};

// Update notification preferences (if implemented)
export const updateNotificationPreferences = async (preferences) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/preferences`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(preferences),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Preferences updated" : "Failed to update preferences"),
    };
  } catch (error) {
    console.error("Update notification preferences error:", error);
    return { success: false, message: error.message };
  }
};


