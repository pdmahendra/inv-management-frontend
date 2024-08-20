import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
