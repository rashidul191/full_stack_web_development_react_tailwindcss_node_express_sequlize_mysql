import { Navigate } from "react-router-dom";
import React from "react";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("access-token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
