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
  Alert,
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

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "Please fill in all required fields.";
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

      const phone = formData.phone.trim();
      // +92 3XXXXXXXXX format (with a space after +92)
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
      return;
    }
    setAlert({ type: "", message: "" });

    try {
      if (isLogin) {
        const res = await fetch("https://localhost:7186/api/Auth/login", {
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
        console.log(users);
        const userres = await fetch(
          `https://localhost:7186/api/Users/${users.userId}`
        );

        if (!userres.ok) {
          const txt = await res.text();
          throw new Error(txt || "Failed to register");
        }

        const parseData = await userres.json();
        console.log(parseData);
        localStorage.setItem("token", users.token);
        localStorage.setItem("user", JSON.stringify(parseData));
        usecontextApiData.settoken(users.token);
        usecontextApiData.setuserInfo(parseData);
        // console.log(users)
        // const found = users.find((u) => u.email === formData.email);
        if (parseData) {
          setAlert({ type: "success", message: "Login successful" });
          if (users.role == "PetOwner") {
            window.alert("LOGIN SUCCESSFULL");
            naviagate("/owner");
          } else {
          }
        } else {
          setAlert({ type: "error", message: "User not found" });
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

        const res = await fetch("https://localhost:5208/api/users", {
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
        handleToggle();
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Error: " + err.message });
    }
  };

  console.log(alert);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80')",
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

        {alert.message && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

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
                  <MedicalServices
                    fontSize="small"
                    style={{ marginRight: 8 }}
                  />
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

        <Divider
          sx={{
            my: 2,
            fontFamily: "Arial, sans-serif",
            "&::before, &::after": { borderColor: "#fff", borderWidth: "2px" },
            "& .MuiDivider-wrapper": { color: "#fff", fontWeight: "bold" },
          }}
        >
          OR
        </Divider>
      </Paper>
    </Box>
  );
}

export default LoginRegister;
