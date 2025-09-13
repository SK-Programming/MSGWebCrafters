import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
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

  const naviagate = useNavigate();
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
    if (!/\d/.test(formData.password)) {
      return "Password must contain at least one number.";
    }
    if (!isLogin) {
      if (
        !formData.username ||
        !formData.phone ||
        !formData.confirmPassword ||
        !formData.role
      ) {
        return "Please fill in all required fields.";
      }
      if (
        (formData.role === "Veterinarians" ||
          formData.role === "Animals Shelter") &&
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
    setAlert({ type: "", message: "" });

    try {
      if (isLogin) {
        const res = await fetch(`${BASE_URL}/Auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          headers: {
            "content-type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Could not fetch users");
        const users = await res.json();
        const userres = await fetch(`${BASE_URL}/Users/${users.userId}`);
        if (!userres.ok) {
          const txt = await res.text();
          throw new Error(txt || "Failed to register");
        }
        const parseData = await userres.json();
        localStorage.setItem("token", users.token);
        localStorage.setItem("user", JSON.stringify(parseData));
        usecontextApiData.settoken(users.token);
        usecontextApiData.setuserInfo(parseData);
        if (parseData) {
          setAlert({ type: "success", message: "Login successful" });
          setOpenSnackbar(true);
          if (users.role === "PetOwner") {
            naviagate("/owner");
          } else if (users.role === "Veterinarians") {
            naviagate("/veterinarian");
          } else if (users.role === "Animals Shelter") {
            naviagate("/shelter");
          }
        } else {
          setAlert({ type: "error", message: "User not found" });
          setOpenSnackbar(true);
        }
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
          imageUrl: "",
        };

        const res = await fetch(`${BASE_URL}/Auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "Failed to register");
        }

        const newUser = await res.json();
        setAlert({
          type: "success",
          message: "Registration successful for " + newUser.name,
        });
        setOpenSnackbar(true);
        handleToggle();
      }
    } catch (err) {
      setAlert({ type: "error", message: "Error: " + err.message });
      setOpenSnackbar(true);
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

      
      </Paper>
    </Box>
  );
}

export default LoginRegister;
