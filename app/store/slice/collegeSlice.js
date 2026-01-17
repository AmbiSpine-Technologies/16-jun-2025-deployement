import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyCompanies } from "@/app/utils/companyApi";

export const fetchUserOwnedPages = createAsyncThunk(
  "companies/fetchMyPages",
  async (_, { rejectWithValue }) => {
    const response = await getMyCompanies(1, 20); // Pehle 20 pages mangwa lein
    if (response.success) return response.data;
    return rejectWithValue(response.message);
  }
);

const companySlice = createSlice({
  name: "colleges",
  initialState: {
    mycollegePages: [],
    loading: false,
  },
  reducers: {
    addCreatedPage: (state, action) => {
      state.mycollegePages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserOwnedPages.fulfilled, (state, action) => {
      state.mycollegePages = action.payload;
      state.loading = false;
    });
  }
});

export const { addCreatedPage } = companySlice.actions;
export default companySlice.reducer;