// store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Debug log (remove in production if you want)
if (typeof window !== "undefined") {
  console.log("🔗 API Base URL:", API_BASE_URL);
  console.log("🌍 Environment:", process.env.NODE_ENV);
}

// registerUser & loginUser same as before (keep your existing thunks)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/register`,
        userData
      );
      toast.success("Registration successful! Please log in.", {
        position: "top-right",
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message, { position: "top-right" });
      return rejectWithValue({ message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });
      toast.success("Login successful!", { position: "top-right" });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message, { position: "top-right" });
      return rejectWithValue({ message });
    }
  }
);

// **Default user = Rupendra** (for dev/testing). Remove or set to null for production.
const defaultUser = {
  _id: "dev-rupendra-id",
  name: "Rupendra",
  email: "rupendra@example.com",
  role: "user",
  // add other fields you expect in user object
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:
      typeof window !== "undefined" && localStorage.getItem("token")
        ? JSON.parse(
            localStorage.getItem("user") || JSON.stringify(defaultUser)
          )
        : defaultUser,
    // user:null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out successfully!", { position: "top-right" });
    },
    // optional: a reducer to set user (e.g., after login)
    setUser: (state, action) => {
      state.user = action.payload;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (e) {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || state.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        try {
          if (action.payload.token)
            localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } catch (e) {}
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;

