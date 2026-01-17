
// import { configureStore } from "@reduxjs/toolkit";
// import usersReducer from "./userSlice.js";
// import authReducer from "./authSlice";
// import { saveState } from "../utils/localStorage.js";
// import communityReducer from './communitySlice';
// import profileReducer from "./profileSlice.js";

// export const store = configureStore({
//   reducer: {
//     users: usersReducer,
//     auth: authReducer,
//     communities: communityReducer,
//     profile: profileReducer,
//   },
  
// });

// // Persist on every update
// store.subscribe(() => {
//   saveState(store.getState().users);
// });


// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import Slices
import usersReducer from "./userSlice";
import authReducer from "./authSlice";
import communityReducer from './communitySlice';
import profileReducer from "./profileSlice";
import companyReducer from './slice/companySlice';

// 1. Handle Server-Side Storage (Prevent Crashes)
const createNoopStorage = () => {
  return {
    getItem(_key) { return Promise.resolve(null); },
    setItem(_key, value) { return Promise.resolve(value); },
    removeItem(_key) { return Promise.resolve(); },
  };
};

const storageEngine = typeof window !== "undefined" ? storage : createNoopStorage();

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  communities: communityReducer,
  profile: profileReducer,
  companies: companyReducer,
});

const persistConfig = {
  key: 'root',
  storage: storageEngine,
  whitelist: ['auth', 'profile'], // Only persist critical data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these specific Redux Persist actions to prevent errors
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);