// AuthRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useContextData } from "../context/context";

const AuthRoute = ({ children }) => {
  const { token, userInfo } = useContextData();
  const location = useLocation();

  // If logged in and trying to access /login
  if (token && userInfo && location.pathname === "/login") {
    switch (userInfo.role) {
      case "Admin":
        return <Navigate to="/admin" replace />;
      case "Veterinarians":
        return <Navigate to="/veterinarian" replace />;
      case "Animals Shelter":
        return <Navigate to="/shelter" replace />;
      case "PetOwner":
        return <Navigate to="/owner" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Otherwise allow access
  return children;
};

export default AuthRoute;
