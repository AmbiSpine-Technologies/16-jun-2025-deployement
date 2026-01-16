// "use client";
// import { v4 as uuid } from "uuid";
// import { loadState, saveState } from "./localStorage";

// // ✅ Get current app state
// const getState = () => {
//   if (typeof window === "undefined") return { users: [], currentUser: null };
//   const data = loadState();
//   return data || { users: [], currentUser: null };
// };

// // ✅ Merge posts + manual activities for a user
// export const getActivities = (userId) => {
//   const state = getState();
//   const user = state.users.find((u) => u.id === userId);
//   if (!user) return [];

//   const postActivities =
//     user.posts?.map((p) => ({
//       id: p.id,
//       type: p.activity || "Posts",
//       message: p.content,
//       createdAt: p.createdAt || new Date().toISOString(),
//       post: p,
//     })) || [];

//   const manualActivities = user.activities || [];

//   return [...postActivities, ...manualActivities].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );
// };

// // ✅ Add a new activity to a user
// export const addActivity = (userId, activity) => {
//   const state = getState();
//   const users = [...(state.users || [])];
//   const index = users.findIndex((u) => u.id === userId);
//   if (index === -1) return;

//   const newActivity = {
//     id: uuid(),
//     createdAt: new Date().toISOString(),
//     ...activity,
//   };

//   const updatedUser = { ...users[index] };
//   updatedUser.activities = [newActivity, ...(updatedUser.activities || [])];
//   users[index] = updatedUser;

//   let currentUser = state.currentUser;
//   if (currentUser?.id === userId) {
//     currentUser = { ...updatedUser };
//   }

//   saveState({ ...state, users, currentUser });
// };

"use client";
import { v4 as uuid } from "uuid";
import { loadState, saveState } from "./localStorage";

export const getState = () => {
  if (typeof window === "undefined") return { users: [], currentUser: null };
  return loadState() || { users: [], currentUser: null };
};

// ✅ Merge post + manual activity
export const getActivities = (userId) => {
  const state = getState();
  const user = state.users.find((u) => u.id === userId);
  if (!user) return [];

  const postActivities =
    (user.posts || []).map((p) => ({
      id: p.id,
      type: "post",
      message: p.content,
      createdAt: p.createdAt || new Date().toISOString(),
    })) || [];

  const manualActivities = user.activities || [];

  const all = [...postActivities, ...manualActivities].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return all;
};

// ✅ Add new user activity
export const addActivity = (userId, activity) => {
  const state = getState();
  const users = [...(state.users || [])];
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return;

  const newActivity = {
    id: uuid(),
    createdAt: new Date().toISOString(),
    ...activity,
  };

  const updatedUser = { ...users[index] };
  updatedUser.activities = [newActivity, ...(updatedUser.activities || [])];
  users[index] = updatedUser;

  let currentUser = state.currentUser;
  if (currentUser?.id === userId) {
    currentUser = { ...updatedUser };
  }

  saveState({ ...state, users, currentUser });
  window.dispatchEvent(new Event("activityUpdated"));
};


// ✅ Subscribe to live updates
export const onActivityChange = (callback) => {
  if (typeof window === "undefined") return;
  window.addEventListener("activityUpdated", callback);
  return () => window.removeEventListener("activityUpdated", callback);
};
