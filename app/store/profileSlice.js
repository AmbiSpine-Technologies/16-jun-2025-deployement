import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveProfileSummary,
  saveEducation,
  addEducationItem,
  saveWorkExperience,
  addWorkExperienceItem,
  saveCertificates,
  addCertificateItem,
  saveProjects,
  addProjectItem,
} from "@/app/utils/profileApi";




const profileSlice = createSlice({
  name: "profile",
initialState: {
    data: null, // Pura profile object yahan store hoga
    loading: false,
    error: null,
  },
  reducers: {
    resetProfile: () => initialState,
   setProfileData: (state, action) => {
      state.data = action.payload; // Pura data object store karein
    },

addDraftItem: (state, action) => {
  const { section, newItem } = action.payload;
  
  // 1. Check if state.data is null or undefined
  if (!state.data) {
    state.data = {}; 
  }

  // 2. Check if the specific section exists in data, if not, create an empty array
  if (!state.data[section]) {
    state.data[section] = [];
  }

  // 3. Now push the item safely
  state.data[section].push(newItem);

},

   updateItem(state, action) {
    const { section, updates } = action.payload;
    if (state.data) {
      if (section === "personalInfo") {
        state.data.personalInfo = { ...state.data.personalInfo, ...updates };
      } else {
        // Kisi bhi array ya string field ko update karne ke liye
        state.data[section] = updates;
      }
    }
  },

    removeItem(state, action) {
      const { section, id } = action.payload;
      if (state.data && state.data[section]) {
        state.data[section] = state.data[section].filter(i => (i._id || i.id) !== id);
      }
    },

    replaceDraftWithSaved(state, action) {
      const { section, savedItem } = action.payload;
      if (state.data && state.data[section]) {
        const index = state.data[section].findIndex(i => i.isDraft);
        if (index !== -1) {
          state.data[section][index] = { ...savedItem, isDraft: false };
        }
      }
    },
  },
  
  extraReducers: (builder) => {
    builder

    .addCase(fetchProfileByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Pura data bina kisi missing field ke store ho jayega
      })

      // summary
    .addCase(saveSummaryThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Agar sirf summary update karni hai bina pura profile reload kiye:
        if (state.data) {
          state.data.profileSummary = action.payload;
        }
      })

      // education
  .addCase(addEducationThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data && state.data.education) {
          state.data.education.push(action.payload);
        }
      })
      .addCase(saveEducationThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) state.data.education = action.payload;
      })

      // ✅ FIX: Experience (state.data.workExperience use karein)
      .addCase(addExperienceThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data && state.data.workExperience) {
          state.data.workExperience.push(action.payload);
        }
      })
      .addCase(saveExperienceThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) state.data.workExperience = action.payload;
      })

//       // projects
//       .addCase(addProjectThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.projects.push(action.payload);
//       })
//       .addCase(saveProjectsThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.projects = action.payload;
//       })

      // certificates
//       .addCase(addCertificateThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.certificates.push(action.payload);
//       })
//       .addCase(saveCertificatesThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.certificates = action.payload;
//       })

            // common loading handler
     // ✅ 2. addMatcher aakhri mein (Common Loading/Error handling)
      .addMatcher(
        (action) => action.type.startsWith("profile/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("profile/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

  },
});

export const fetchProfileByUsername = createAsyncThunk(
  "profile/fetchByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/username/${username}`);
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message);
      return data.data; // Yeh pura profile object return karega
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const createDraft = () => ({
  id: `temp-${Date.now()}`,
  isDraft: true,
  hidden: false,
});

export const saveSummaryThunk = createAsyncThunk(
  "profile/saveSummary",
  async (summary, { rejectWithValue }) => {
    try {
      const res = await saveProfileSummary(summary);
      // ✅ res.data return karein jo fetch se mil raha hai
      return res.data; 
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addEducationThunk = createAsyncThunk(
  "profile/addEducation",
  async (education, { rejectWithValue }) => {
    try {
      const res = await addEducationItem(education);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const saveEducationThunk = createAsyncThunk(
  "profile/saveEducation",
  async (educations, { rejectWithValue }) => {
    try {
      const res = await saveEducation(educations);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addExperienceThunk = createAsyncThunk(
  "profile/addExperience",
  async (experience, { rejectWithValue }) => {
    try {
      const res = await addWorkExperienceItem(experience);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const saveExperienceThunk = createAsyncThunk(
  "profile/saveExperience",
  async (experiences, { rejectWithValue }) => {
    try {
      const res = await saveWorkExperience(experiences);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


export const { resetProfile, addDraftItem, 
  updateItem, 
  removeItem, 
  setProfileData,
  replaceDraftWithSaved, 
   } = profileSlice.actions;
export default profileSlice.reducer;
