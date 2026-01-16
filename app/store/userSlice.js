// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { users as initialUsers, companies, colleges } from "../constents/constents";
import { saveState, loadState } from "../utils/localStorage";
import { updateSectionHelper } from "../utils/sectionUpdater";

// load persisted
const persistedState = loadState();

// determine default current user (persisted takes precedence if present)
const defaultCurrent =
  (persistedState && persistedState.currentUser) ||
  initialUsers.find((u) => u.id === "u12345") ||
  initialUsers[0] ||
  null;

const initialState = {
  users: (persistedState && persistedState.users) || initialUsers,
  currentUser: defaultCurrent,
  companies: companies || [],
  colleges: colleges || [],
  notifications: (persistedState && persistedState.notifications) || [],
  collabs: (persistedState && persistedState.collabs) || [],
};

const ensureArrays = (u) => ({
  ...u,
  followers: Array.isArray(u?.followers) ? u?.followers : [],
  following: Array.isArray(u?.following) ? u?.following : [],
  connections: Array.isArray(u?.connections) ? u?.connections : [],
  followersCount: typeof u?.followersCount === "number" ? u?.followersCount : (u?.followers ? u?.followers.length : 0),
  followingCount: typeof u?.followingCount === "number" ? u?.followingCount : (u?.following ? u?.following.length : 0),
  connectionsCount: typeof u?.connectionsCount === "nu?mber" ? u?.connectionsCount : (u?.connections ? u?.connections.length : 0),
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

    setUsers(state, action) {
      state.users = action.payload.map(ensureArrays);
      saveState(state);
    },
    setCurrentUser(state, action) {
      state.currentUser = ensureArrays(action.payload);
      saveState(state);
    },

    // update current user fields (partial)
    updateUser(state, action) {
      if (!state.currentUser) return;
      const updated = { ...state.currentUser, ...action.payload };
      state.currentUser = ensureArrays(updated);
      state.users = state.users.map((u) => (u.id === updated.id ? ensureArrays(updated) : u));
      saveState(state);
    },

    // update any user by id (partial)
    updateUserById(state, action) {
      const { id, updates } = action.payload;
      state.users = state.users.map((u) => {
        if (u.id !== id) return u;
        const merged = ensureArrays({ ...u, ...updates });
        // adjust counts if arrays changed
        merged.followersCount = merged.followers.length;
        merged.followingCount = merged.following.length;
        merged.connectionsCount = merged.connections.length;
        return merged;
      });
      if (state.currentUser?.id === id) {
        const found = state.users.find((u) => u.id === id);
        state.currentUser = found ? ensureArrays(found) : state.currentUser;
      }
      saveState(state);
    },
    // save 
    toggleSaveItem(state, action) {
      const { type, id } = action.payload || {};
      if (!type || !id) return;
      if (!state.currentUser) return;

      // ensure structure
      if (!state.currentUser.saved) state.currentUser.saved = {};
      if (!Array.isArray(state.currentUser.saved[type])) state.currentUser.saved[type] = [];

      const arr = state.currentUser.saved[type];
      const idx = arr.indexOf(id);
      const added = idx === -1;

      if (added) arr.push(id);
      else arr.splice(idx, 1);

      // universal flag update (for all data types)
      if (Array.isArray(state.currentUser[type])) {
        const item = state.currentUser[type].find((x) => x.id === id);
        if (item) item.saved = !!added;
      }

      // sync with users array (keep currentUser consistent everywhere)
      state.users = state.users.map((u) => {
        if (u.id !== state.currentUser.id) return u;
        return ensureArrays({
          ...u,
          saved: state.currentUser.saved,
          [type]: state.currentUser[type] || u[type],
        });
      });
    }
    ,


 // store/userSlice.js

followEntitySuccess: (state, action) => {
  const { followerId, targetId, targetType } = action.payload;
  
  // ✅ College handle karne ke liye logic update kiya
  let targetList;
  if (targetType === "user") targetList = state.users;
  else if (targetType === "company") targetList = state.companies;
  else if (targetType === "college") targetList = state.colleges; // Add this

  if (!targetList) return; // Safety check

  const target = targetList.find((t) => t.id === targetId);
  const currentUser = state.currentUser;

  if (!target || !currentUser) return;

  target.followers = Array.isArray(target.followers) ? target.followers : [];
  currentUser.following = Array.isArray(currentUser.following) ? currentUser.following : [];

  if (!target.followers.includes(followerId)) {
    target.followers.push(followerId);
    target.followersCount = target.followers.length;
  }

  if (!currentUser.following.includes(targetId)) {
    currentUser.following.push(targetId);
    currentUser.followingCount = currentUser.following.length;
  }

  state.notifications.unshift({
    id: Date.now(),
    type: "follow",
    from: followerId,
    to: targetId,
    targetType,
    message: targetType === "user" ? "started following you." : `started following your ${targetType}.`,
    read: false,
    createdAt: new Date().toISOString(),
  });

  saveState(state);
},

unfollowEntitySuccess: (state, action) => {
  const { followerId, targetId, targetType } = action.payload;
  
  // ✅ Same mapping for unfollow
  let targetList;
  if (targetType === "user") targetList = state.users;
  else if (targetType === "company") targetList = state.companies;
  else if (targetType === "college") targetList = state.colleges;

  if (!targetList) return;

  const target = targetList.find((t) => t.id === targetId);
  const currentUser = state.currentUser;
  
  if (!target || !currentUser) return;

  target.followers = (target.followers || []).filter((id) => id !== followerId);
  target.followersCount = Math.max(0, target.followers.length);

  currentUser.following = (currentUser.following || []).filter((id) => id !== targetId);
  currentUser.followingCount = Math.max(0, currentUser.following.length);

  saveState(state);
},

    // --- SEND COLLAB REQUEST
    sendCollabRequest(state, action) {
      const { targetId, currentUserId } = action.payload;
      if (!targetId || !currentUserId) return;
      if (targetId === currentUserId) return;

      // don't send if already connected
      const fromUser = state.users.find((u) => u.id === currentUserId);
      if (fromUser && fromUser.connections?.includes(targetId)) return;

      // check existing pending or accepted collab between them
      const existing = state.collabs.find(
        (c) =>
          ((c.from === currentUserId && c.to === targetId) ||
            (c.from === targetId && c.to === currentUserId)) &&
          (c.status === "pending" || c.status === "accepted")
      );
      if (existing) return; // avoid duplicate
      const id = Date.now();
      const collabObj = {
        id,
        type: "collab-request",
        from: currentUserId,
        to: targetId,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      state.collabs.unshift(collabObj);

      // create notification
      state.notifications.unshift({
        id,
        type: "collab-request",
        from: currentUserId,
        to: targetId,
        message: "wants to collaborate with you.",
        status: "pending",
        read: false,
        createdAt: collabObj.createdAt,
      });


      saveState(state);
    },

    // --- ACCEPT COLLAB (notificationId = collabId)
    acceptCollab(state, { payload: { notificationId, currentUserId } }) {
      const collab = state.collabs.find((c) => c.id === notificationId);
      if (!collab || collab.to !== currentUserId || collab.status !== "pending") return;

      collab.status = "accepted";

      // add connections
      const fromId = collab.from;
      const toId = collab.to;
      state.users.forEach((u) => {
        if (u.id === fromId || u.id === toId) {
          u.connections = Array.from(new Set([...u.connections, fromId === u.id ? toId : fromId]));
          u.connectionsCount = u.connections.length;
        }
      });

      // notification to sender
      state.notifications.unshift({
        id: Date.now(),
        type: "collab-accepted",
        from: currentUserId,
        to: fromId,
        message: "accepted your collab request.",
        read: false,
        createdAt: new Date().toISOString(),
      });

      saveState(state);
    },
    // rejected
    rejectCollab(state, action) {
      const { notificationId, currentUserId } = action.payload;
      if (!notificationId || !currentUserId) return;

      const collab = state.collabs.find((c) => c.id === notificationId);
      if (!collab) return;
      if (collab.to !== currentUserId) return; // only receiver can reject
      if (collab.status !== "pending") return;

      collab.status = "rejected";

      // update notification too
      const notif = state.notifications.find((n) => n.id === notificationId);
      if (notif) notif.status = "rejected";

      // optional: notify sender that request was rejected
      state.notifications.unshift({
        id: Date.now(),
        type: "collab-rejected",
        from: currentUserId,
        to: collab.from,
        message: "rejected your collab request.",
        read: false,
        createdAt: new Date().toISOString(),
      });

      saveState(state);
    },

    // user 
    //  updateSection(state, action) {
    //   const newState = updateSectionHelper(state, action.payload);
    //   saveState(newState);
    //   return newState;
    // },
    updateSection(state, action) {
      const newState = updateSectionHelper(state, action.payload);
      return newState; // no need to call saveState here — handled in helper
    },

    // mark all notifications read
    markNotificationsRead(state) {
      state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
      saveState(state);
    },
    clearAllNotifications(state) {
      state.notifications = [];
      saveState(state);
    },

  },
});

export const {
  setUsers,
  setCurrentUser,
  updateUser,
  updateUserById,
  followUser,
  unfollowUser,
  sendCollabRequest,
  acceptCollab,
  rejectCollab,
  markNotificationsRead,
  clearAllNotifications,
  updateSection,
  toggleSaveItem,
  followEntitySuccess,
  unfollowEntitySuccess,

} = userSlice.actions;

export const selectUsers = (state) => state.users?.users || [];
export const selectCurrentUser = (state) => state.users?.currentUser || null;
export default userSlice.reducer;
