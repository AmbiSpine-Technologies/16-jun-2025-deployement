// // services/communityService.js

// // Mock data for communities
// const MOCK_COMMUNITIES = [
//   {
//     id: '1',
//     name: 'React Developers Group',
//     description: 'A community for React developers to share knowledge and collaborate',
//     category: 'skill_development',
//     type: 'public',
//     members: ['1', '2', '3', '4', '5'],
//     createdBy: '1',
//     status: 'active',
//     createdAt: new Date().toISOString(),
//     memberCount: 5
//   },
//   {
//     id: '2', 
//     name: 'Placement Preparation 2024',
//     description: 'Get ready for campus placements with mock interviews and coding practice',
//     category: 'placement_prep',
//     type: 'public',
//     members: ['1', '2', '3'],
//     createdBy: '2',
//     status: 'pending',
//     createdAt: new Date().toISOString(),
//     memberCount: 3
//   }
// ];



// // Community Status Types
// export const COMMUNITY_STATUS = {
//   PENDING: 'pending',
//   ACTIVE: 'active',
//   INACTIVE: 'inactive'
// };

// // Get communities from localStorage
// export const getCommunities = () => {
//   if (typeof window === 'undefined') return [];
  
//   try {
//     const stored = localStorage.getItem('communities');
//     return stored ? JSON.parse(stored) : [];
//   } catch (error) {
//     console.error('Error reading communities:', error);
//     return [];
//   }
// };

// // Get communities by user ID (created or joined)
// export const getUserCommunities = (userId) => {
//   const communities = getCommunities();
//   return communities.filter(community => 
//     community.createdBy === userId || 
//     community.members.includes(userId)
//   );
// };

// // Create new community
// export const createCommunity = async (communityData) => {
//   try {
//     const communities = getCommunities();
//     const newCommunity = {
//       id: Date.now().toString(),
//       ...communityData,
//       members: [communityData.createdBy], // Creator is first member
//       memberCount: 1,
//       status: COMMUNITY_STATUS.PENDING, // Starts as pending
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       inviteCode: generateInviteCode(), // Generate unique invite code
//       posts: [],
//       events: [],
//       files: []
//     };
    
//     const updatedCommunities = [...communities, newCommunity];
//     localStorage.setItem('communities', JSON.stringify(updatedCommunities));
    
//     return { 
//       success: true, 
//       data: newCommunity,
//       message: 'Community created! Share invite link to get 4 more members.'
//     };
//   } catch (error) {
//     console.error('Error creating community:', error);
//     return { success: false, error: 'Failed to create community' };
//   }
// };

// // Join community using invite code
// export const joinCommunity = async (communityId, userId, userName) => {
//   try {
//     const communities = getCommunities();
//     const community = communities.find(c => c.id === communityId);
    
//     if (!community) {
//       return { success: false, error: 'Community not found' };
//     }
    
//     if (community.members.includes(userId)) {
//       return { success: false, error: 'Already a member' };
//     }
    
//     const updatedCommunities = communities.map(community => {
//       if (community.id === communityId) {
//         const updatedMembers = [...community.members, userId];
//         const memberCount = updatedMembers.length;
        
//         // Check if community should be activated
//         const status = memberCount >= 5 ? COMMUNITY_STATUS.ACTIVE : COMMUNITY_STATUS.PENDING;
        
//         return {
//           ...community,
//           members: updatedMembers,
//           memberCount,
//           status,
//           updatedAt: new Date().toISOString()
//         };
//       }
//       return community;
//     });
    
//     localStorage.setItem('communities', JSON.stringify(updatedCommunities));
    
//     const updatedCommunity = updatedCommunities.find(c => c.id === communityId);
//     return { 
//       success: true, 
//       data: updatedCommunity,
//       message: updatedCommunity.status === COMMUNITY_STATUS.ACTIVE 
//         ? 'Community is now active! All features unlocked.' 
//         : `Community needs ${5 - updatedCommunity.memberCount} more members to activate.`
//     };
//   } catch (error) {
//     return { success: false, error: 'Failed to join community' };
//   }
// };

// // Join community by invite code
// export const joinCommunityByInvite = async (inviteCode, userId, userName) => {
//   try {
//     const communities = getCommunities();
//     const community = communities.find(c => c.inviteCode === inviteCode);
    
//     if (!community) {
//       return { success: false, error: 'Invalid invite code' };
//     }
    
//     return await joinCommunity(community.id, userId, userName);
//   } catch (error) {
//     return { success: false, error: 'Failed to join community' };
//   }
// };

// // Get community by ID
// export const getCommunityById = (id) => {
//   const communities = getCommunities();
//   return communities.find(community => community.id === id);
// };

// // Generate unique invite code
// const generateInviteCode = () => {
//   return Math.random().toString(36).substring(2, 8).toUpperCase();
// };

// // Get community invite link
// export const getInviteLink = (communityId) => {
//   if (typeof window === 'undefined') return '';
//   return `${window.location.origin}/community/join?code=${communityId}`;
// };

// // Add post to community
// export const addCommunityPost = async (communityId, postData) => {
//   try {
//     const communities = getCommunities();
//     const updatedCommunities = communities.map(community => {
//       if (community.id === communityId) {
//         const newPost = {
//           id: Date.now().toString(),
//           ...postData,
//           createdAt: new Date().toISOString(),
//           likes: [],
//           comments: []
//         };
        
//         return {
//           ...community,
//           posts: [newPost, ...community.posts],
//           updatedAt: new Date().toISOString()
//         };
//       }
//       return community;
//     });
    
//     localStorage.setItem('communities', JSON.stringify(updatedCommunities));
//     return { success: true };
//   } catch (error) {
//     return { success: false, error: 'Failed to add post' };
//   }
// };



// Community Status Types
export const COMMUNITY_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

// Get store instance properly
const getStore = () => {
  if (typeof window !== 'undefined') {
    return require('../store/store').store;
  }
  return null;
};

// Get communities from localStorage and update Redux store
export const getCommunities = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('communities');
    const communities = stored ? JSON.parse(stored) : [];
    
    // Update Redux store
    const store = getStore();
    if (store) {
      store.dispatch(setCommunities(communities));
    }
    
    return communities;
  } catch (error) {
    console.error('Error reading communities:', error);
    return [];
  }
};

// File ko base64 mein convert karne ka function
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Generate unique invite code
const generateInviteCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Import Redux actions
import { 
  createCommunitySuccess, 
  setCommunities, 
  updateCommunity, 
  setCurrentCommunity 
} from '../store/communitySlice';



// Create new community with Redux integration
export const createCommunity = async (formData) => {
  try {
    console.log("Raw FormData received:", formData);
    
    // FormData se values extract karo
    const communityData = {
      name: formData.get('name'),
      description: formData.get('description') || "",
      rules: formData.get('rules') || "",
      category: formData.get('category'),
      visibility: formData.get('visibility'),
      type: formData.get('type'),
      createdBy: formData.get('createdBy'),
      createdByName: formData.get('createdByName'),
      creatorAvatar: formData.get('creatorAvatar'),
      bannerImage: formData.get('bannerImage'),
      communityIcon: formData.get('communityIcon')
    };
    
    console.log("Extracted community data:", communityData);
    
    const communities = getCommunities();
    
    // File handling - agar file objects hain to unko base64 mein convert karo
    let bannerImageUrl = null;
    let communityIconUrl = null;

    // Banner image ko base64 mein convert karo
    if (communityData.bannerImage instanceof File) {
      console.log("Processing banner image...");
      bannerImageUrl = await convertFileToBase64(communityData.bannerImage);
    }

    // Community icon ko base64 mein convert karo
    if (communityData.communityIcon instanceof File) {
      console.log("Processing community icon...");
      communityIconUrl = await convertFileToBase64(communityData.communityIcon);
    }

    const newCommunity = {
      id: Date.now().toString(),
      name: communityData.name,
      description: communityData.description,
      rules: communityData.rules,
      category: communityData.category,
      visibility: communityData.visibility,
      type: communityData.type,
      createdBy: communityData.createdBy,
      createdByName: communityData.createdByName,
      creatorAvatar: communityData.creatorAvatar,
      bannerImage: bannerImageUrl,
      communityIcon: communityIconUrl,
      members: [communityData.createdBy],
      memberCount: 1,
      status: COMMUNITY_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      inviteCode: generateInviteCode(),
      posts: [],
      events: [],
      files: []
    };
    
    console.log("Final community object:", newCommunity);
    
    const updatedCommunities = [...communities, newCommunity];
    localStorage.setItem('communities', JSON.stringify(updatedCommunities));
    
    // Update Redux store with new community
    const store = getStore();
    if (store) {
      store.dispatch(createCommunitySuccess(newCommunity));
      store.dispatch(setCurrentCommunity(newCommunity));
    }
    
    return { 
      success: true, 
      data: newCommunity,
      message: 'Community created! Share invite link to get 4 more members.'
    };
  } catch (error) {
    console.error('Error creating community:', error);
    return { success: false, error: 'Failed to create community' };
  }
};

// Get community invite link
export const getInviteLink = (communityId) => {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/community/join?code=${communityId}`;
};

// Get community by ID with Redux integration
export const getCommunityById = (id) => {
  const communities = getCommunities();
  const community = communities.find(community => community.id === id);
  
  if (community) {
    const store = getStore();
    if (store) {
      store.dispatch(setCurrentCommunity(community));
    }
  }
  
  return community;
};

// Get user's communities
export const getUserCommunities = (userId) => {
  const communities = getCommunities();
  return communities.filter(community => 
    community.createdBy === userId || 
    community.members.includes(userId)
  );
};

// Join community by invite code
export const joinCommunityByInvite = async (inviteCode, userId, userName) => {
  try {
    const communities = getCommunities();
    const community = communities.find(c => c.inviteCode === inviteCode);
    
    if (!community) {
      return { success: false, error: 'Invalid invite code' };
    }
    
    return await joinCommunity(community.id, userId, userName);
  } catch (error) {
    return { success: false, error: 'Failed to join community' };
  }
};

// Join community
export const joinCommunity = async (communityId, userId, userName) => {
  try {
    const communities = getCommunities();
    const communityIndex = communities.findIndex(c => c.id === communityId);
    
    if (communityIndex === -1) {
      return { success: false, error: 'Community not found' };
    }
    
    const community = communities[communityIndex];
    
    if (community.members.includes(userId)) {
      return { success: false, error: 'Already a member' };
    }
    
    // Create updated community
    const updatedMembers = [...community.members, userId];
    const memberCount = updatedMembers.length;
    const status = memberCount >= 5 ? COMMUNITY_STATUS.ACTIVE : COMMUNITY_STATUS.PENDING;
    
    const updatedCommunity = {
      ...community,
      members: updatedMembers,
      memberCount,
      status,
      updatedAt: new Date().toISOString()
    };
    
    // Update communities array
    const updatedCommunities = [...communities];
    updatedCommunities[communityIndex] = updatedCommunity;
    
    // Save to localStorage
    localStorage.setItem('communities', JSON.stringify(updatedCommunities));
    
    // Update Redux store
    const store = getStore();
    if (store) {
      store.dispatch(updateCommunity(updatedCommunity));
      store.dispatch(setCurrentCommunity(updatedCommunity));
    }
    
    return { 
      success: true, 
      data: updatedCommunity,
      message: updatedCommunity.status === COMMUNITY_STATUS.ACTIVE 
        ? 'Community is now active! All features unlocked.' 
        : `Community needs ${5 - updatedCommunity.memberCount} more members to activate.`
    };
  } catch (error) {
    console.error('Error joining community:', error);
    return { success: false, error: 'Failed to join community' };
  }
};