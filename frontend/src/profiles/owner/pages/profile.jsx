import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function Profile() {
  // ✅ Owner state (editable)
  const [owner, setOwner] = useState({
    name: "Bilal Habib",
    email: "bilal@example.com",
    phone: "+92 300 1234567",
    address: "Karachi, Pakistan",
    avatar: "https://via.placeholder.com/150",
    memberSince: "2023-06-15",
  });

  // ✅ Modal state
  const [open, setOpen] = useState(false);

  // ✅ Temp form data
  const [formData, setFormData] = useState(owner);

  // ✅ Handle field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload (profile pic)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: URL.createObjectURL(file), // just preview
      });
    }
  };

  // ✅ Save changes with validation
  const handleSave = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      alert("All fields are required!");
      return;
    }
    setOwner(formData);
    setOpen(false);
  };

  // ✅ Dummy pets
  const [pets] = useState([
    { id: 1, name: "Bella 🐶", species: "Dog", age: "2 years" },
    { id: 2, name: "Milo 🐱", species: "Cat", age: "1 year" },
  ]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Owner Profile 👤
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Manage your details and connected pets.
      </Typography>

      {/* Owner Info */}
      <Paper sx={{ p: 3, borderRadius: 3, mt: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={owner.avatar}
              alt={owner.name}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h5" fontWeight="bold">
              {owner.name}
            </Typography>
            <Typography color="text.secondary">{owner.email}</Typography>
            <Typography color="text.secondary">{owner.phone}</Typography>
            <Typography color="text.secondary">{owner.address}</Typography>
            <Chip
              label={`Member since ${owner.memberSince}`}
              color="info"
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setFormData(owner);
            setOpen(true);
          }}
        >
          Edit Profile
        </Button>
      </Paper>

      {/* Pets Section */}
      <Paper sx={{ p: 3, borderRadius: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          My Pets 🐾
        </Typography>
        <Grid container spacing={3}>
          {pets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">{pet.name}</Typography>
                <Typography color="text.secondary">
                  {pet.species} • {pet.age}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                  href={`/owner/petprofile/${pet.id}`}
                >
                  View Profile
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Edit Profile Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Avatar
              src={formData.avatar}
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
            <IconButton color="primary" component="label" sx={{ mt: 1 }}>
              <PhotoCamera />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Member Since"
            value={owner.memberSince}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
