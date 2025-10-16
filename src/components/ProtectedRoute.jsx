import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore.js";

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
