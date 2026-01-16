// store/slices/communitySlice.js
import { createSlice } from '@reduxjs/toolkit';

const communitySlice = createSlice({
  name: 'communities',
  initialState: {
    communities: [],
    currentCommunity: null,
    loading: false,
    error: null
  },
  reducers: {
    // Create new community
    createCommunityStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createCommunitySuccess: (state, action) => {
      state.loading = false;
      state.communities.push(action.payload);
      state.currentCommunity = action.payload;
    },
    createCommunityFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Get all communities
    setCommunities: (state, action) => {
      state.communities = action.payload;
    },
    
    // Set current community
    setCurrentCommunity: (state, action) => {
      state.currentCommunity = action.payload;
    },
    
    // Update community
    updateCommunity: (state, action) => {
      const index = state.communities.findIndex(comm => comm.id === action.payload.id);
      if (index !== -1) {
        state.communities[index] = action.payload;
      }
      if (state.currentCommunity && state.currentCommunity.id === action.payload.id) {
        state.currentCommunity = action.payload;
      }
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset community state
    resetCommunity: (state) => {
      state.currentCommunity = null;
      state.error = null;
      state.loading = false;
    }
  }
});

export const {
  createCommunityStart,
  createCommunitySuccess,
  createCommunityFailure,
  setCommunities,
  setCurrentCommunity,
  updateCommunity,
  clearError,
  resetCommunity
} = communitySlice.actions;

export default communitySlice.reducer;