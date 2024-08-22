import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useUser();
  const userType = user?.userType;

  const isAuthenticated = !!localStorage.getItem("accessToken");
  const location = useLocation();

  if (!isAuthenticated) {
    if (location.pathname !== "/login") {
      return <Navigate to="/login" replace />;
    }
    return element;
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <div className="flex justify-center mt-80">You are not authorized to view this page.</div>;
  }

  return element;
};

export default ProtectedRoute;
