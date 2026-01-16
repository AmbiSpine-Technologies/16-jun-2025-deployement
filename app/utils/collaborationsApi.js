// Collaborations API utility functions
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

// Get all collaborations
export const getCollaborations = async (filters = {}, page = 1, limit = 10) => {
  try {
    const { userId, search, category } = filters;
    const queryParams = new URLSearchParams({ page, limit });
    if (userId) queryParams.append("userId", userId);
    if (search) queryParams.append("search", search);
    if (category) queryParams.append("category", category);

    const response = await fetch(
      `${API_BASE_URL}/collaborations?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Collaborations fetched" : "Failed to fetch collaborations"),
    };
  } catch (error) {
    console.error("Get collaborations error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Create collaboration
export const createCollaboration = async (collaborationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/collaborations`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(collaborationData),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Collaboration created" : "Failed to create collaboration"),
    };
  } catch (error) {
    console.error("Create collaboration error:", error);
    return { success: false, message: error.message };
  }
};

// Get collaboration by ID
export const getCollaborationById = async (collaborationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/collaborations/${collaborationId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Collaboration fetched" : "Failed to fetch collaboration"),
    };
  } catch (error) {
    console.error("Get collaboration error:", error);
    return { success: false, message: error.message };
  }
};

// Update collaboration
export const updateCollaboration = async (collaborationId, collaborationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/collaborations/${collaborationId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(collaborationData),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Collaboration updated" : "Failed to update collaboration"),
    };
  } catch (error) {
    console.error("Update collaboration error:", error);
    return { success: false, message: error.message };
  }
};

// Join collaboration
export const joinCollaboration = async (collaborationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/collaborations/${collaborationId}/join`, {
      method: "POST",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Joined collaboration" : "Failed to join collaboration"),
    };
  } catch (error) {
    console.error("Join collaboration error:", error);
    return { success: false, message: error.message };
  }
};

// Leave collaboration
export const leaveCollaboration = async (collaborationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/collaborations/${collaborationId}/leave`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Left collaboration" : "Failed to leave collaboration"),
    };
  } catch (error) {
    console.error("Leave collaboration error:", error);
    return { success: false, message: error.message };
  }
};

