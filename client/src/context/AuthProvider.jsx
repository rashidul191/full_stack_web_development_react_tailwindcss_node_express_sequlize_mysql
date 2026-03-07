import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // Loading state
  // 1️⃣ Initialize auth from localStorage
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // localStorage থেকে auth load করা
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAuth(parsed);
      } catch (error) {
        console.error("Failed to parse auth from localStorage:", error);
        setAuth(null);
      }
    }
    setLoading(false); // loading শেষ
  }, []);

  // 2️⃣ Whenever auth changes, save to localStorage
  useEffect(() => {
    if (auth?.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
      localStorage.setItem("access-token", auth?.token);
    } else {
      localStorage.removeItem("auth");
      localStorage.removeItem("access-token");
    }
  }, [auth]);

  // 3️⃣ login function
  const loginUser = (data) => {
    setAuth(data); // localStorage automatically handled in useEffect
  };
  // 3️⃣ login function
  const registerUser = (data) => {
    setAuth(data); // localStorage automatically handled in useEffect
  };

  // 4️⃣ logout function
  const logoutUser = () => {
    setAuth(null);
  };

  const userInfo = {
    auth,
    loading,
    loginUser,
    registerUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
