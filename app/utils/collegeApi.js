// College API utility functions
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
  }; 
  // const headers = {
  //   "Content-Type": "application/json",
  // };
  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// ==================== COLLEGE ROUTES ====================

// Create a new college
export const createCollege = async (collegeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/college/create`, {
      method: "POST",
      headers: getHeaders(),
      // body: JSON.stringify(collegeData),
      body : collegeData,
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "College created" : "Failed to create college"),
    };
  } catch (error) {
    console.error("Create college error:", error);
    return { success: false, message: error.message };
  }
};

// Get college by ID
export const getCollegeById = async (collegeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/college/${collegeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "College fetched" : "Failed to fetch college"),
    };
  } catch (error) {
    console.error("Get college by ID error:", error);
    return { success: false, message: error.message };
  }
};

// Update college
export const updateCollege = async (collegeId, collegeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/college/update/${collegeId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(collegeData),
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "College updated" : "Failed to update college"),
    };
  } catch (error) {
    console.error("Update college error:", error);
    return { success: false, message: error.message };
  }
};


// Get all colleges
export const getAllColleges = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/college/colleges?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: getHeaders(), // auth needed if required
      }
    );

    const data = await response.json();

    return {
      success: response.ok,
      data: data.data || [],
      pagination: data.pagination || {},
      message:
        data.message ||
        (response.ok ? "All colleges fetched" : "Failed to fetch colleges"),
    };
  } catch (error) {
    console.error("Get all colleges error:", error);
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};



// Get my colleges
export const getMyColleges = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/college/my/colleges?page=${page}&limit=${limit}`,
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
      message: data.message || (response.ok ? "My colleges fetched" : "Failed to fetch my colleges"),
    };
  } catch (error) {
    console.error("Get my colleges error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// ==================== STUDENT ROUTES ====================

// Create a new student
export const createStudent = async (collegeId, studentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/college/${collegeId}/students`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(studentData),
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Student added" : "Failed to add student"),
    };
  } catch (error) {
    console.error("Create student error:", error);
    return { success: false, message: error.message };
  }
};

// Get students by college
export const getStudentsByCollege = async (collegeId, filters = {}, page = 1, limit = 50) => {
  try {
    const { search, course, branch, status, year, semester, isPremiumUser, sortBy, order } = filters;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) queryParams.append("search", search);
    if (course && course !== "all") queryParams.append("course", course);
    if (branch && branch !== "all") queryParams.append("branch", branch);
    if (status && status !== "all") queryParams.append("status", status);
    if (year) queryParams.append("year", year);
    if (semester) queryParams.append("semester", semester);
    if (isPremiumUser !== undefined) queryParams.append("isPremiumUser", isPremiumUser);
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (order) queryParams.append("order", order);

    const response = await fetch(
      `${API_BASE_URL}/college/${collegeId}/students?${queryParams}`,
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
      message: data.message || (response.ok ? "Students fetched" : "Failed to fetch students"),
    };
  } catch (error) {
    console.error("Get students error:", error);
    return { success: false, message: error.message, data: [] };
  }
};

// Get student by ID
export const getStudentById = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/college/students/${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Student fetched" : "Failed to fetch student"),
    };
  } catch (error) {
    console.error("Get student by ID error:", error);
    return { success: false, message: error.message };
  }
};

// Update student
export const updateStudent = async (collegeId, studentId, studentData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/college/${collegeId}/students/${studentId}`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(studentData),
      }
    );

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Student updated" : "Failed to update student"),
    };
  } catch (error) {
    console.error("Update student error:", error);
    return { success: false, message: error.message };
  }
};

// Delete student
export const deleteStudent = async (collegeId, studentId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/college/${collegeId}/students/${studentId}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message || (response.ok ? "Student deleted" : "Failed to delete student"),
    };
  } catch (error) {
    console.error("Delete student error:", error);
    return { success: false, message: error.message };
  }
};

// Bulk upload students
export const bulkUploadStudents = async (collegeId, studentsArray) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/college/${collegeId}/students/bulk-upload`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ students: studentsArray }),
      }
    );

    const data = await response.json();
    return {
      success: response.ok,
      data: data.data,
      message: data.message || (response.ok ? "Students uploaded" : "Failed to upload students"),
    };
  } catch (error) {
    console.error("Bulk upload students error:", error);
    return { success: false, message: error.message };
  }
};


