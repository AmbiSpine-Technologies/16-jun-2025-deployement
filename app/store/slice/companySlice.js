import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyCompanies } from "@/app/utils/companyApi";
import axios from "axios";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  
export const fetchUserOwnedPages = createAsyncThunk(
  "companies/fetchMyPages",
  async (_, { rejectWithValue }) => {
    const response = await getMyCompanies(1, 20); // Pehle 20 pages mangwa lein
    if (response.success) return response.data;
    return rejectWithValue(response.message);
  }
);

export const fetchMyEntities = createAsyncThunk("companies/fetchMy", async (_, { getState }) => {
try {
    const token = localStorage.getItem("token");
    // Agar API_BASE_URL env file mein hai toh process.env.NEXT_PUBLIC_API_BASE_URL use karein
    // Ya fir direct path likhein agar proxy configured hai
    const response = await axios.get(`${API_BASE_URL}/college/my-entities `, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }}
);

const companySlice = createSlice({
  name: "companies",
  initialState: {
    myPages: [],
    loading: false,
  },
  reducers: {
    addCreatedPage: (state, action) => {
      state.myPages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserOwnedPages.fulfilled, (state, action) => {
      state.myPages = action.payload;
      state.loading = false;
    })
    .addCase(fetchMyEntities.pending, (state) => { state.loading = true; })
      .addCase(fetchMyEntities.fulfilled, (state, action) => {
        state.loading = false;
        state.myPages = action.payload; // Ab isme Companies + Colleges dono hain
      });
  }
});

export const { addCreatedPage } = companySlice.actions;
export default companySlice.reducer;