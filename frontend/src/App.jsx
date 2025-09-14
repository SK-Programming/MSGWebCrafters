import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import AdminMain from "./admin/AdminMain";
import ShelterMain from "./profiles/shelter/shelterMain";
import VetMain from "./profiles/veterinarians/vetMain";
import OwnerMain from "./profiles/owner/ownerMain";
import UserMain from "./Users/UserMain";
import LoginRegister from "./loginReg";
import ProtectedRoute from "./routeValidation/ProtectedRoute";
import AuthRoute from "./auth/auth";
import AdminLogin from "./admin/adminLogin";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7F50', // Coral
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFA07A',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF7F50',
          '&:hover': {
            backgroundColor: '#e06648',
          },
          color: '#fff', 
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FF7F50',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#FF7F50',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#FF7F50',
          '&.Mui-checked': {
            color: '#FF7F50',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: '#FF7F50',
          '&.Mui-checked': {
            color: '#FF7F50',
          },
        },
        track: {
          backgroundColor: '#FF7F50',
          '.Mui-checked &': {
            backgroundColor: '#FF7F50',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF7F50',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF7F50',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#FF7F50',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: '#FF7F50', 
          },
          '&.Mui-focused:not(.Mui-disabled):after': {
            borderBottomColor: '#FF7F50',
          },
        },
      },
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/veterinarian/*"
            element={
              <ProtectedRoute allowedRoles={["Veterinarians"]}>
                <VetMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shelter/*"
            element={
              <ProtectedRoute allowedRoles={["Animals Shelter"]}>
                <ShelterMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/*"
            element={
              <ProtectedRoute allowedRoles={["PetOwner"]}>
                <OwnerMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <LoginRegister />
              </AuthRoute>
            }
          />
          <Route path="/*" element={<UserMain />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
