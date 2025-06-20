import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../config/firebase";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login${location.search}`} />;
  }

  return children;
};

export default ProtectedRoute;
