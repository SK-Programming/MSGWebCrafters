import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import { useContextData } from "../../../context/context";
import BASE_URL from "../../../config/apiConfig";

export default function Profile() {
  const data = useContextData();
  const userId = data?.userInfo?.userId;
  const token = data?.token;

  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${BASE_URL}/Users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOwner(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData({
        ...formData,
        imageUrl: URL.createObjectURL(file), // preview
      });
    }
  };
const handleSave = async () => {
  try {
    const fd = new FormData();
    fd.append("Name", formData.name);
    fd.append("Email", formData.email);
    fd.append("Role", formData.role);
    fd.append("ContactNumber", formData.contactNumber);
    fd.append("Address", formData.address || "");
 if (!formData.name ) {
      setSnackbar({
        open: true,
        message: "Name and Email are required.",
        severity: "error",
      });
      return;
    }

    if (imageFile) {
      // User uploaded a new file
      fd.append("imageFile", imageFile);
    } else if (owner?.imageUrl) {
      // Re-send existing image as fallback
      fd.append("imageUrl", owner.imageUrl);
    }

    const res = await axios.put(`${BASE_URL}/Users/${userId}`, fd, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setOwner(res.data);
    setOpen(false);
    data.setuserInfo(res.data);
    
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
  } catch (err) {
   console.error("Update failed:", err.response?.data || err.message);
      setSnackbar({
        open: true,
        message: "Failed to update profile.",
        severity: "error",
      });
  }
};

 function handleShare(){
  
 }

 
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!owner) return <Typography>No profile found.</Typography>;

  return (
    <Box sx={{ p: 4, mx: "auto" }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="600" gutterBottom>
        Your Profile
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Manage your account details and update your info anytime.
      </Typography>

      {/* Profile Info */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          mt: 3,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={
                owner.imageUrl
                  ? `${BASE_URL.replace("/api", "")}${owner.imageUrl}`
                  : ""
              }
              alt={owner.name}
              sx={{
                width: 110,
                height: 110,
                border: "2px solid #e0e0e0",
              }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h5" fontWeight="500">
              {owner.name}
            </Typography>
            <Typography color="text.secondary">{owner.email}</Typography>
            <Typography color="text.secondary">
              {owner.contactNumber}
            </Typography>
            <Typography color="text.secondary">
              {owner.address || "You haven’t added your address"}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "coral",
              "&:hover": { bgcolor: "coral" },
              borderRadius: 3,
              px: 3,
              textTransform: "none",
            }}
            onClick={() => {
              setFormData(owner);
              setOpen(true);
            }}
          >
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            color="coral"
            sx={{ borderRadius: 3, px: 3, textTransform: "none" }}
            onClick={handleShare}
          >
            Share
          </Button>
        </Box>
      </Paper>

      {/* Edit Profile Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: 600, pb: 1, color: "#1a73e8", fontSize: "1.2rem" }}
        >
          Edit Profile
        </DialogTitle>
        <DialogContent dividers sx={{ px: 4, py: 3 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              src={
                formData.imageUrl && !formData.imageUrl.startsWith("blob:")
                  ? `${BASE_URL.replace("/api", "")}${formData.imageUrl}`
                  : formData.imageUrl
              }
              sx={{
                width: 110,
                height: 110,
                margin: "auto",
                mb: 2,
                border: "2px solid #e0e0e0",
              }}
            />

            {/* Modern Google-style uploader */}
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{
                borderRadius: 20,
                textTransform: "none",
                px: 3,
                fontWeight: 500,
              }}
            >
              Upload New Photo
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="contactNumber"
            value={formData.contactNumber || ""}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            placeholder="Enter your address"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{ textTransform: "none", borderRadius: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: "#1a73e8",
              "&:hover": { bgcolor: "#1669c1" },
              borderRadius: 3,
              px: 3,
              textTransform: "none",
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
