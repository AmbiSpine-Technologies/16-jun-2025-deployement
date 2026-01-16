// Jobs API utility functions
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  const token = localStorage.getItem("token") || localStorage.getItem("spreadnext_token");
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

// Get all jobs with filters and pagination
export const getAllJobs = async (filters = {}, page = 1, limit = 12) => {
  try {
    const {
      search,
      location,
      workMode,
      jobType,
      industry,
      companySize,
      skills,
      sortBy,
      order,
    } = filters;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) queryParams.append("search", search);
    if (location) queryParams.append("location", location);
    if (workMode) queryParams.append("workMode", workMode);
    if (jobType) {
      if (Array.isArray(jobType)) {
        queryParams.append("jobType", jobType.join(","));
      } else {
        queryParams.append("jobType", jobType);
      }
    }
    if (industry) {
      if (Array.isArray(industry)) {
        queryParams.append("industry", industry.join(","));
      } else {
        queryParams.append("industry", industry);
      }
    }
    if (companySize) queryParams.append("companySize", companySize);
    if (skills) {
      if (Array.isArray(skills)) {
        queryParams.append("skills", skills.join(","));
      } else {
        queryParams.append("skills", skills);
      }
    }
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (order) queryParams.append("order", order);

    const response = await fetch(`${API_BASE_URL}/jobs/all?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message: data.message || (response.ok ? "Jobs fetched" : "Failed to fetch jobs"),
    };
  } catch (error) {
    console.error("Get all jobs error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get featured jobs
export const getFeaturedJobs = async (limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/jobs/featured?limit=${limit}`,
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
      message: data.message || (response.ok ? "Featured jobs fetched" : "Failed to fetch featured jobs"),
    };
  } catch (error) {
    console.error("Get featured jobs error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get job by ID
export const getJobById = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Job fetched" : "Failed to fetch job"),
    };
  } catch (error) {
    console.error("Get job by ID error:", error);
    return { success: false, message: error.message };
  }
};

// Create job (requires auth)
export const createJob = async (jobData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/create`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(jobData),
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Job created" : "Failed to create job"),
    };
  } catch (error) {
    console.error("Create job error:", error);
    return { success: false, message: error.message };
  }
};

// Update job (requires auth)
export const updateJob = async (jobId, jobData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/update/${jobId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(jobData),
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Job updated" : "Failed to update job"),
    };
  } catch (error) {
    console.error("Update job error:", error);
    return { success: false, message: error.message };
  }
};

// Delete job (requires auth)
export const deleteJob = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/delete/${jobId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Job deleted" : "Failed to delete job"),
    };
  } catch (error) {
    console.error("Delete job error:", error);
    return { success: false, message: error.message };
  }
};

// Get my jobs (requires auth)
export const getMyJobs = async (page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/jobs/my/jobs?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "My jobs fetched" : "Failed to fetch my jobs"),
    };
  } catch (error) {
    console.error("Get my jobs error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Toggle job status (requires auth)
export const toggleJobStatus = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/toggle-status/${jobId}`, {
      method: "PATCH",
      headers: getHeaders(),
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Job status toggled" : "Failed to toggle job status"),
    };
  } catch (error) {
    console.error("Toggle job status error:", error);
    return { success: false, message: error.message };
  }
};

// ==================== JOB APPLICATIONS ====================

// Apply for job (requires auth)
export const applyForJob = async (jobId, applicationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(applicationData),
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Application submitted" : "Failed to submit application"),
    };
  } catch (error) {
    console.error("Apply for job error:", error);
    return { success: false, message: error.message };
  }
};

// Get my applications (requires auth)
export const getMyApplications = async (page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/jobs/applications/my?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "Applications fetched" : "Failed to fetch applications"),
    };
  } catch (error) {
    console.error("Get my applications error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get applications for a job (requires auth - employer only)
export const getJobApplications = async (jobId, page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/jobs/${jobId}/applications?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "Job applications fetched" : "Failed to fetch job applications"),
    };
  } catch (error) {
    console.error("Get job applications error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get application by ID (requires auth)
export const getApplicationById = async (applicationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/applications/${applicationId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Application fetched" : "Failed to fetch application"),
    };
  } catch (error) {
    console.error("Get application by ID error:", error);
    return { success: false, message: error.message };
  }
};

// Update application status (requires auth - employer only)
export const updateApplicationStatus = async (applicationId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/applications/${applicationId}/status`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Application status updated" : "Failed to update application status"),
    };
  } catch (error) {
    console.error("Update application status error:", error);
    return { success: false, message: error.message };
  }
};

// Withdraw application (requires auth)
export const withdrawApplication = async (applicationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/applications/${applicationId}/withdraw`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Application withdrawn" : "Failed to withdraw application"),
    };
  } catch (error) {
    console.error("Withdraw application error:", error);
    return { success: false, message: error.message };
  }
};









