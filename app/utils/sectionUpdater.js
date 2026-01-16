// // utils/sectionUpdater.js
// import { v4 as uuid } from "uuid";

// export const updateSectionHelper = (state, { section, action, id, data }) => {
//   if (!state.currentUser) return state;

//   const validSections = ["education", "experience", "certifications"];
//   if (!validSections.includes(section)) {
//     console.warn(`Invalid section: ${section}`);
//     return state;
//   }

//   let items = [...(state.currentUser[section] || [])];

//   switch (action) {
//     case "add":
//       items.push({ id: uuid(), ...data });
//       break;

//     case "update":
//       items = items.map((item) =>
//         item.id === id ? { ...item, ...data } : item
//       );
//       break;

//     case "delete":
//       items = items.filter((item) => item.id !== id);
//       break;

//     default:
//       console.warn(`Unknown action: ${action}`);
//       return state;
//   }

//   const updatedUser = { ...state.currentUser, [section]: items };

//   return {
//     ...state,
//     currentUser: updatedUser,
//     users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
//   };
// };
import { updateUser } from "../store/userSlice";
import { saveState } from "./localStorage";
import { v4 as uuid } from "uuid";

// export const updateSectionHelper = (state, { section, action, id, data }) => {
//   if (!state.currentUser) return state;

//   const validSections = ["educations", "experiences", "certifications"];
//   if (!validSections.includes(section)) return state;

//   let items = [...(state.currentUser[section] || [])];

//   switch (action) {
//     case "add":
//       items.push({ id: uuid(), ...data });
//       break;
//     case "update":
//       items = items.map((i) => (i.id === id ? { ...i, ...data } : i));
//       break;
//     case "delete":
//       items = items.filter((i) => i.id !== id);
//       break;
//     default:
//       return state;
//   }

//   const updatedUser = { ...state.currentUser, [section]: items };
//   const newState = {
//     ...state,
//     currentUser: updatedUser,
//     users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
//   };

//   saveState(newState);
//   return newState;
// };

export const updateSectionHelper = (state, { section, action, id, data }) => {
  if (!state.currentUser) return state;

  const validSections = ["educations", "experiences", "certifications"];
  if (!validSections.includes(section)) return state;

  let items = [...(state.currentUser[section] || [])];
 console.log(items);

  switch (action) {
    case "add":
      items.push({ id: uuid(), ...data });
      break;
    case "update":
      items = items.map((i) => (i.id === id ? { ...i, ...data } : i));
      break;
    case "delete":
      items = items.filter((i) => i.id !== id);
      break;
    default:
      return state;
  }

  const updatedUser = { ...state.currentUser, [section]: items };
  console.log(updateUser);
  const newState = {
    ...state,
    currentUser: updatedUser,
    users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
  };

  saveState(newState); // ✅ persist entire Redux state
  return newState;
};
