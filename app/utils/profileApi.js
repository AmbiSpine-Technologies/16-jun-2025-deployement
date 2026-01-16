// Profile API utility functions
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Get profile by username (public endpoint)
export const getProfileByUsername = async (username) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/username/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || "Failed to fetch profile");
    }
  } catch (error) {
    console.error("Error fetching profile by username:", error);
    throw error;
  }
};

// Save profile summary/overview
export const saveProfileSummary = async (profileSummary) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Please login to save profile");
    }

    const response = await fetch(`${API_BASE_URL}/profile/profile-summary`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ profileSummary }),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || "Failed to save profile summary");
    }
  } catch (error) {
    console.error("Error saving profile summary:", error);
    throw error;
  }
};

// Save education array
export const saveEducation = async (educations) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Please login to save education");
    }

    const response = await fetch(`${API_BASE_URL}/profile/education`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(educations),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || "Failed to save education");
    }
  } catch (error) {
    console.error("Error saving education:", error);
    throw error;
  }
};

// Add single education item
export const addEducationItem = async (education) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Please login to add education");
    }

    const response = await fetch(`${API_BASE_URL}/profile/education`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(education),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || "Failed to add education");
    }
  } catch (error) {
    console.error("Error adding education:", error);
    throw error;
  }
};

// Save work experience array
export const saveWorkExperience = async (experiences) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Please login to save work experience");
    }

    const response = await fetch(`${API_BASE_URL}/profile/work-experience`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(experiences),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || "Failed to save work experience");
    }
  } catch (error) {
    console.error("Error saving work experience:", error);
    throw error;
  }
};

// Add single work experience item
export const addWorkExperienceItem = async (experience) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Please login to add work experience");
    }

    const response = await fetch(`${API_BASE_URL}/profile/work-experience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(experience),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || "Failed to add work experience");
    }
  } catch (error) {
    console.error("Error adding work experience:", error);
    throw error;
  }
};

// Save certificates array
export const saveCertificates = async (certificates) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Please login to save certificates");
    }

    const response = await fetch(`${API_BASE_URL}/profile/certificates`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(certificates),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || "Failed to save certificates");
    }
  } catch (error) {
    console.error("Error saving certificates:", error);
    throw error;
  }
};

// Add single certificate item
export const addCertificateItem = async (certificate) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Please login to add certificate");
    }

    const response = await fetch(`${API_BASE_URL}/profile/certificates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(certificate),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || "Failed to add certificate");
    }
  } catch (error) {
    console.error("Error adding certificate:", error);
    throw error;
  }
};

// Save projects array
export const saveProjects = async (projects) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Please login to save projects");
    }

    const response = await fetch(`${API_BASE_URL}/profile/projects`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projects),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || "Failed to save projects");
    }
  } catch (error) {
    console.error("Error saving projects:", error);
    throw error;
  }
};

// Add single project item
export const addProjectItem = async (project) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Please login to add project");
    }

    const response = await fetch(`${API_BASE_URL}/profile/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, data: data.data };
    } else {
      throw new Error(data.message || "Failed to add project");
    }
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};
