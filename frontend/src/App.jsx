import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminMain from "./admin/AdminMain";
import ShelterMain from "./profiles/shelter/shelterMain";
import VetMain from "./profiles/veterinarians/vetMain";
import OwnerMain from "./profiles/owner/ownerMain";
import UserMain from "./Users/UserMain";
import LoginRegister from "./loginReg";
import ProtectedRoute from "./routeValidation/ProtectedRoute"; // ⬅️ import it
import AuthRoute from "./auth/auth";
import AdminLogin from "./admin/adminLogin";

function App() {
  return (
  <BrowserRouter>
  <Routes>
    {/* Admin login (not protected) */}
    <Route path="/admin/login" element={<AdminLogin />} />

    {/* Protected admin area */}
    <Route
      path="/admin/*"
      element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <AdminMain />
        </ProtectedRoute>
      }
    />

    {/* Veterinarian dashboard */}
    <Route
      path="/veterinarian/*"
      element={
        <ProtectedRoute allowedRoles={["Veterinarians"]}>
          <VetMain />
        </ProtectedRoute>
      }
    />

    {/* Shelter dashboard */}
    <Route
      path="/shelter/*"
      element={
        <ProtectedRoute allowedRoles={["Animals Shelter"]}>
          <ShelterMain />
        </ProtectedRoute>
      }
    />

    {/* Owner dashboard */}
    <Route
      path="/owner/*"
      element={
        <ProtectedRoute allowedRoles={["PetOwner"]}>
          <OwnerMain />
        </ProtectedRoute>
      }
    />

    {/* Global login/register */}
    <Route
      path="/login"
      element={
        <AuthRoute>
          <LoginRegister />
        </AuthRoute>
      }
    />

    {/* Default user routes */}
    <Route path="/*" element={<UserMain />} />
  </Routes>
</BrowserRouter>

  );
}

export default App;
