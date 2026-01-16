// Resume Builder API utility functions
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

// Get user's resumes
export const getResumes = async (page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/resumes?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "Resumes fetched" : "Failed to fetch resumes"),
    };
  } catch (error) {
    console.error("Get resumes error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Create resume
export const createResume = async (resumeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(resumeData),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Resume created" : "Failed to create resume"),
    };
  } catch (error) {
    console.error("Create resume error:", error);
    return { success: false, message: error.message };
  }
};

// Get resume by ID
export const getResumeById = async (resumeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Resume fetched" : "Failed to fetch resume"),
    };
  } catch (error) {
    console.error("Get resume error:", error);
    return { success: false, message: error.message };
  }
};

// Get resume by share token (public)
export const getResumeByShareToken = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes/share/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Resume fetched" : "Failed to fetch resume"),
    };
  } catch (error) {
    console.error("Get resume by share token error:", error);
    return { success: false, message: error.message };
  }
};

// Update resume
export const updateResume = async (resumeId, resumeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(resumeData),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Resume updated" : "Failed to update resume"),
    };
  } catch (error) {
    console.error("Update resume error:", error);
    return { success: false, message: error.message };
  }
};

// Delete resume
export const deleteResume = async (resumeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Resume deleted" : "Failed to delete resume"),
    };
  } catch (error) {
    console.error("Delete resume error:", error);
    return { success: false, message: error.message };
  }
};

// Generate PDF
export const generateResumePDF = async (resumeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}/generate-pdf`, {
      method: "POST",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "PDF generated" : "Failed to generate PDF"),
    };
  } catch (error) {
    console.error("Generate PDF error:", error);
    return { success: false, message: error.message };
  }
};

// Get available templates
export const getResumeTemplates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes/templates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      message: data.message || (response.ok ? "Templates fetched" : "Failed to fetch templates"),
    };
  } catch (error) {
    console.error("Get templates error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Generate share token
export const generateResumeShareToken = async (resumeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}/share`, {
      method: "POST",
      headers: getHeaders(),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Share token generated" : "Failed to generate share token"),
    };
  } catch (error) {
    console.error("Generate share token error:", error);
    return { success: false, message: error.message };
  }
};









