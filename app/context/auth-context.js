
"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/app/store/userSlice";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.users.currentUser);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("spreadnext_token");
      const userData = localStorage.getItem("redux_user");

      if (token && userData) {
        const parsed = JSON.parse(userData);
        dispatch(setCurrentUser(parsed.currentUser));
      }
    } catch {
      localStorage.clear();
    }
  }, [dispatch]);

  /**
   * ✅ LOGIN (SINGLE SOURCE)
   */
  const login = useCallback((token, userData) => {
    
    localStorage.setItem("token", token);

    dispatch(setCurrentUser({
      id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.userName,
      profileImage: userData.profileImage,
    }));
  }, [dispatch]);

  /**
   * ✅ LOGOUT
   */
  const logout = () => {
 localStorage.clear();
    dispatch(setCurrentUser(null));
     router.replace("/signin");
  };

  return (
    <AuthContext.Provider value={{
      user: currentUser,
      isAuthenticated: !!currentUser,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
