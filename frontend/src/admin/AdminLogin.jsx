import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useContextData } from "../context/context"; // 🔑 so we update global context
import BASE_URL from "../config/apiConfig";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const context = useContextData();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setAlert({ type: "error", message: "Please fill in all fields" });
      return;
    }

    setAlert({ type: "", message: "" });

    try {
      // 🔑 Step 1: Login request
      const res = await fetch(`${BASE_URL}/Auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const text = await res.text();

      if (!res.ok) {
        setAlert({
          type: "error",
          message: text || "Wrong email or password.",
        });
        return;
      }

      let users;
      try {
        users = JSON.parse(text);
      } catch {
        throw new Error("Unexpected login response: " + text);
      }

      // 🔑 Step 2: Role check
      if (users.role !== "Admin") {
        setAlert({ type: "error", message: "Not authorized as Admin." });
        return;
      }

      // 🔑 Step 3: Fetch full user profile
      const userRes = await fetch(`${BASE_URL}/Users/${users.userId}`);
      if (!userRes.ok) {
        const txt = await userRes.text();
        throw new Error(txt || "Failed to fetch user data.");
      }
      const parseData = await userRes.json();

      // 🔑 Step 4: Save in localStorage
      localStorage.setItem("token", users.token);
      localStorage.setItem("user", JSON.stringify(parseData));
      localStorage.setItem("role", users.role);

      // 🔑 Step 5: Update context
      context.settoken(users.token);
      context.setuserInfo(parseData);

      setAlert({ type: "success", message: "Admin login successful!" });
      navigate("/admin/dashboard"); // 👈 take admin to dashboard
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('login.png')",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 350,
          p: 4,
          borderRadius: 4,
          background: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255,255,255,0.3)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: "#fff" }}>
          Admin Login
        </Typography>

        {alert.message && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        {/* Email */}
        <TextField
          fullWidth
          placeholder="Email"
          margin="normal"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "#fff" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />

        {/* Password */}
        <TextField
          fullWidth
          placeholder="Password"
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "#fff" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#fff" }} />
                  ) : (
                    <Visibility sx={{ color: "#fff" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{
            mt: 2,
            borderRadius: 3,
            bgcolor: "#000",
            color: "#fff",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default AdminLogin;
