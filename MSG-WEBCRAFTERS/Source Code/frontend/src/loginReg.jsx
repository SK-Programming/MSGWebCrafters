import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  MenuItem,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  Pets,
  MedicalServices,
  Home,
  Place,
} from "@mui/icons-material";
import { useContextData } from "./context/context";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./config/apiConfig";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const usecontextApiData = useContextData();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "+92 ",
    password: "",
    confirmPassword: "",
    role: "PetOwner",
    extraField: "",
  });

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      phone: "+92 ",
      password: "",
      confirmPassword: "",
      role: "PetOwner",
      extraField: "",
    });
    setAlert({ type: "", message: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === " ") return;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
  if (!formData.email || !formData.password) {
    return "Please fill in all required fields.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Please enter a valid email address.";
  }

  if (formData.password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  if (!/\d/.test(formData.password)) {
    return "Password must contain at least one number.";
  }

  if (!isLogin) {
    if (
      !formData.username ||
      formData.username.length < 3 ||
      !formData.phone ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      return "Username must be at least 3 characters and all fields must be filled.";
    }

    if (
      (formData.role === "Veterinarians" || formData.role === "Animals Shelter") &&
      !formData.extraField
    ) {
      return "Please provide your address.";
    }

    let phone = formData.phone.trim();
    if (phone.startsWith("+92") && !phone.startsWith("+92 ")) {
      phone = "+92 " + phone.slice(3);
    }
    const regex = /^\+92\s3\d{9}$/;
    if (!regex.test(phone)) {
      return "Phone must be like +92 3XXXXXXXXX (e.g. +92 3243340844).";
    }

    if (phone.length < 13 || phone.length > 15) {
      return "Phone must have 13–15 characters including + and space.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
  }

  return null;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setAlert({ type: "error", message: error });
      setOpenSnackbar(true);
      return;
    }

    try {
      if (isLogin) {
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
    setOpenSnackbar(true);
    return;
  }

  let users;
  try {
    users = JSON.parse(text); // try JSON
  } catch {
    throw new Error("Unexpected login response: " + text);
  }

  const userRes = await fetch(`${BASE_URL}/Users/${users.userId}`);
  if (!userRes.ok) {
    const txt = await userRes.text();
    throw new Error(txt || "Failed to fetch user data.");
  }

  const parseData = await userRes.json();
  localStorage.setItem("token", users.token);
  localStorage.setItem("user", JSON.stringify(parseData));

  usecontextApiData.settoken(users.token);
  usecontextApiData.setuserInfo(parseData);

  setAlert({ type: "success", message: "Login successful!" });
  setOpenSnackbar(true);

  if (users.role === "PetOwner") navigate("/owner");
  else if (users.role === "Veterinarians") navigate("/veterinarian");
  else if (users.role === "Animals Shelter") navigate("/shelter");
} else {
        const body = {
          name: formData.username,
          email: formData.email,
          role: formData.role,
          contactNumber: formData.phone,
          address:
            formData.role === "Veterinarians" ||
            formData.role === "Animals Shelter"
              ? formData.extraField
              : "",
               password: formData.password,
          imageUrl: "",
        };

        const res = await fetch(`${BASE_URL}/Auth/register`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "Failed to register.");
        }

        const newUser = await res.json();
        setAlert({
          type: "success",
          message: `Registration successful for ${newUser.name}!`,
        });
        setOpenSnackbar(true);
        handleToggle();
      }
    } catch (err) {
      setAlert({ type: "error", message: err.message });
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3, color: "#fff" }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Typography>

        {!isLogin && (
          <TextField
            fullWidth
            placeholder="Username"
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#fff" }} />
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
        )}

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

        {!isLogin && (
          <>
            <TextField
              fullWidth
              placeholder="Pakistani Phone (+92 3XXXXXXXXX)"
              margin="normal"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              inputProps={{ minLength: 13, maxLength: 15 }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: "#fff" }} />
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

            <TextField
              select
              fullWidth
              margin="normal"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
                "& .MuiSelect-select": { color: "#fff" },
              }}
            >
              <MenuItem value="PetOwner">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Pets fontSize="small" style={{ marginRight: 8 }} />
                  <Typography variant="body2">Pet Owner</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="Veterinarians">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MedicalServices fontSize="small" style={{ marginRight: 8 }} />
                  <Typography variant="body2">Veterinarians</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="Animals Shelter">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Home fontSize="small" style={{ marginRight: 8 }} />
                  <Typography variant="body2">Animals Shelter</Typography>
                </Box>
              </MenuItem>
            </TextField>

            {(formData.role === "Veterinarians" ||
              formData.role === "Animals Shelter") && (
              <TextField
                fullWidth
                placeholder="Address"
                margin="normal"
                name="extraField"
                value={formData.extraField}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Place sx={{ color: "#fff" }} />
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
            )}
          </>
        )}

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

        {!isLogin && (
          <TextField
            fullWidth
            placeholder="Confirm Password"
            margin="normal"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type={showConfirmPassword ? "text" : "password"}
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
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    edge="end"
                  >
                    {showConfirmPassword ? (
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
        )}

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
          {isLogin ? "Login" : "Sign Up"}
        </Button>

        <Typography
          sx={{
            mt: 2,
            cursor: "pointer",
            color: "#fff",
            textDecoration: "underline",
          }}
          onClick={handleToggle}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Typography>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            width: '100%'
          }}
        >
          <MuiAlert
            onClose={handleCloseSnackbar}
            severity={alert.type || "info"}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </Box>
  );
}

export default LoginRegister;
