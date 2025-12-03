import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }){
  const { isAuthenticated } = useAuth();
   if (isAuthenticated === null) {
    return <div>Loading...</div>; // wait for auth check
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};
