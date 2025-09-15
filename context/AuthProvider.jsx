"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { axiosPublic, axiosPrivate } from "@/libs/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // user info

  // ✅ Attach interceptor to auto-refresh tokens
  useEffect(() => {
    const interceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Access token expired → try refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await axiosPublic.get("/auth/refresh"); // backend should set new accessToken cookie
            return axiosPrivate(originalRequest);
          } catch (err) {
            setAuth(null); // logout
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(interceptor);
    };
  }, []);

  // ✅ Persist user (check session on page load)
  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const res = await axiosPrivate.get("/auth/profile"); // backend endpoint to get user info
        setAuth(res.data);
      } catch {
        setAuth(null);
      }
    };
    verifyLogin();
  }, []);

  // ✅ Login
  const login = async (credentials) => {
    const res = await axiosPublic.post("/auth/login", credentials);
    setAuth(res.data.user); // set user info
  };

  // ✅ Logout
  const logout = async () => {
    await axiosPublic.post("/auth/logout"); // backend clears cookies
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);