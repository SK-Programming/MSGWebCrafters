
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useContextData } from "../context/context";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, userInfo } = useContextData();
  const location = useLocation();

  
  const loginRoutes = {
    "/admin": "/admin/login",
    "/veterinarian": "/login",
    "/shelter": "/login",
    "/owner": "/login",
  };

  
  const basePath = Object.keys(loginRoutes).find((path) =>
    location.pathname.startsWith(path)
  );

  const redirectTo = loginRoutes[basePath] || "/login";

  
  if (!token || !userInfo) {
    return <Navigate to={redirectTo} replace />;
  }

  
  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
