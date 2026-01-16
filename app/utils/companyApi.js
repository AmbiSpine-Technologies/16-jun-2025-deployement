// Company API utility functions
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const getHeaders = () => {
  const headers = {};
  const token = getAuthToken();

  // const headers = {
  //   "Content-Type": "application/json",
  // };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers; // NO Content-Type
};

// Create a new company
export const createCompany = async (companyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/company/create`, {
      method: "POST",
      headers: getHeaders(),
      // body: JSON.stringify(companyData),
      body:companyData,
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Company created" : "Failed to create company"),
    };
  } catch (error) {
    console.error("Create company error:", error);
    return { success: false, message: error.message };
  }
};

// Get company by ID
export const getCompanyById = async (companyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/company/${companyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Company fetched" : "Failed to fetch company"),
    };
  } catch (error) {
    console.error("Get company by ID error:", error);
    return { success: false, message: error.message };
  }
};

// Update company
export const updateCompany = async (companyId, companyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/company/update/${companyId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(companyData),
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Company updated" : "Failed to update company"),
    };
  } catch (error) {
    console.error("Update company error:", error);
    return { success: false, message: error.message };
  }
};

// Delete company
export const deleteCompany = async (companyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/company/delete/${companyId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Company deleted" : "Failed to delete company"),
    };
  } catch (error) {
    console.error("Delete company error:", error);
    return { success: false, message: error.message };
  }
};

// Get my companies (companies created/managed by user)
export const getMyCompanies = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/company/my/companies?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "My companies fetched" : "Failed to fetch my companies"),
    };
  } catch (error) {
    console.error("Get my companies error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get all companies (public)
export const getAllCompanies = async (filters = {}, page = 1, limit = 12) => {
  try {
    const { search, industry, location, isVerified } = filters;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) queryParams.append("search", search);
    if (industry) queryParams.append("industry", industry);
    if (location) queryParams.append("location", location);
    if (isVerified !== undefined) queryParams.append("isVerified", isVerified);

    const response = await fetch(`${API_BASE_URL}/company/all?${queryParams}`, {
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
      message: data.message || (response.ok ? "Companies fetched" : "Failed to fetch companies"),
    };
  } catch (error) {
    console.error("Get all companies error:", error);
    return { success: false, message: error.message, data: [] };
  }
};


