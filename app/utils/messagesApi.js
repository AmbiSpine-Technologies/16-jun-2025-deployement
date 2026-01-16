// Messages/Chat API utility functions
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

// ==================== CONVERSATIONS ====================

// Get all conversations
export const getConversations = async (page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/conversations?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "Conversations fetched" : "Failed to fetch conversations"),
    };
  } catch (error) {
    console.error("Get conversations error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Create or get conversation
export const createOrGetConversation = async (participants, type = "one-on-one", options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        participants,
        type,
        ...options,
      }),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Conversation created" : "Failed to create conversation"),
    };
  } catch (error) {
    console.error("Create conversation error:", error);
    return { success: false, message: error.message };
  }
};

// Get conversation by ID
export const getConversationById = async (conversationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Conversation fetched" : "Failed to fetch conversation"),
    };
  } catch (error) {
    console.error("Get conversation error:", error);
    return { success: false, message: error.message };
  }
};

// ==================== MESSAGES ====================

// Get messages for a conversation
export const getMessages = async (conversationId, page = 1, limit = 50) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/conversations/${conversationId}/messages?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "Messages fetched" : "Failed to fetch messages"),
    };
  } catch (error) {
    console.error("Get messages error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Send message
export const sendMessage = async (conversationId, content, media = null, replyTo = null) => {
  try {
    // Build request body - only include media if it's an object, not null
    const body = {
      content: content || "",
    };
    
    // Only add media if it's an object (not null or empty array)
    if (media && typeof media === 'object' && !Array.isArray(media)) {
      body.media = media;
    } else if (Array.isArray(media) && media.length > 0) {
      // If media is an array, convert to object format if needed
      body.media = media[0]; // Use first item or handle as needed
    }
    
    // Only add replyTo if it exists
    if (replyTo) {
      body.replyTo = replyTo;
    }

    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Message sent" : "Failed to send message"),
    };
  } catch (error) {
    console.error("Send message error:", error);
    return { success: false, message: error.message };
  }
};

// Update message
export const updateMessage = async (messageId, content) => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations/messages/${messageId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Message updated" : "Failed to update message"),
    };
  } catch (error) {
    console.error("Update message error:", error);
    return { success: false, message: error.message };
  }
};

// Delete message
export const deleteMessage = async (messageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations/messages/${messageId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Message deleted" : "Failed to delete message"),
    };
  } catch (error) {
    console.error("Delete message error:", error);
    return { success: false, message: error.message };
  }
};

// Mark message as read
export const markMessageAsRead = async (messageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations/messages/${messageId}/read`, {
      method: "POST",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Message marked as read" : "Failed to mark message"),
    };
  } catch (error) {
    console.error("Mark message as read error:", error);
    return { success: false, message: error.message };
  }
};

// Get unread count for conversation
export const getUnreadCount = async (conversationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/unread`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Unread count fetched" : "Failed to get unread count"),
    };
  } catch (error) {
    console.error("Get unread count error:", error);
    return { success: false, message: error.message };
  }
};


