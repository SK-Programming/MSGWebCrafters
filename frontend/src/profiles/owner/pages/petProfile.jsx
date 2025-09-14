import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  IconButton,
  MenuItem,
  Fab,
  Modal,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { Add, Delete, Edit, CloudUpload, Search } from "@mui/icons-material";
import BASE_URL from "../../../config/apiConfig";
import { useContextData } from "../../../context/context";

export default function PetProfile() {
  const [pets, setPets] = useState([]);
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editingPetId, setEditingPetId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [petForm, setPetForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    medicalHistory: "",
    gender: "",
    image: null,
    preview: null,
  });

  const data = useContextData();

  const fetchPets = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/Pets`);
      setPets(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPetForm({ ...petForm, image: file, preview });
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!petForm.name) tempErrors.name = "Name is required";
    if (!petForm.species) tempErrors.species = "Species is required";
    if (!petForm.breed) tempErrors.breed = "Breed is required";
    if (!petForm.age) tempErrors.age = "Age is required";
    else if (isNaN(petForm.age)) tempErrors.age = "Age must be a number";
    if (!petForm.medicalHistory) tempErrors.medicalHistory = "Medical history is required";
    if (!editingPetId && !petForm.image) tempErrors.image = "Pet image is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleOpenAdd = () => {
    setEditingPetId(null);
    setPetForm({ name: "", species: "", breed: "", age: "", medicalHistory: "", gender: "", image: null, preview: null });
    setErrors({});
    setOpenModal(true);
  };

  const handleOpenEdit = (pet) => {
    setEditingPetId(pet.petId);
    setPetForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      medicalHistory: pet.medicalHistory,
      gender: pet.gender,
      image: null,
      preview: pet.imageUrl,
    });
    setErrors({});
    setOpenModal(true);
  };

  const handleSavePet = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("OwnerId", data.userInfo.userId);
    formData.append("Name", petForm.name);
    formData.append("Species", petForm.species);
    formData.append("Breed", petForm.breed);
    formData.append("Age", petForm.age);
    formData.append("MedicalHistory", petForm.medicalHistory);
    formData.append("Gender", petForm.gender);
    if (petForm.image) formData.append("imageFile", petForm.image);

    try {
      if (editingPetId) {
        await axios.put(`${BASE_URL}/Pets/${editingPetId}`, formData);
        setSnackbar({ open: true, message: "Pet updated successfully", severity: "success" });
      } else {
        await axios.post(`${BASE_URL}/Pets`, formData);
        setSnackbar({ open: true, message: "Pet added successfully", severity: "success" });
      }
      fetchPets();
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Failed to save pet", severity: "error" });
    }
  };

  const handleDeletePet = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/Pets/${id}`);
      setSnackbar({ open: true, message: "Pet deleted successfully", severity: "success" });
      fetchPets();
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Failed to delete pet", severity: "error" });
    }
  };

  const filteredPets = pets.filter(
    (pet) =>
      pet.name?.toLowerCase().includes(search.toLowerCase()) ||
      pet.species?.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Pets 
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Add, view, edit, search, and manage your pets' profiles.
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Search pets..."
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "gray" }} /> }}
        sx={{ mb: 2 }}
      />

      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          My Pets
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {filteredPets.length > 0 ? (
          <Grid container spacing={2}>
            {filteredPets.map((pet) => (
              <Grid item key={pet.petId}>
                <Paper
                  sx={{
                    width: 180,
                    bgcolor: "#1C1C26",
                    color: "white",
                    borderRadius: 2,
                    textAlign: "center",
                    p: 1,
                    boxShadow: 3,
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <Avatar
                    src={pet.imageUrl}
                    sx={{ width: 60, height: 60, mx: "auto", mb: 1, cursor: "pointer" }}
                    onClick={() => setSelectedPet(pet)}
                  />
                  <Typography variant="subtitle1">{pet.name}</Typography>
                  <Typography variant="body2">{pet.breed}</Typography>
                  <Typography variant="body2">Age: {pet.age}</Typography>
                  <Typography variant="body2">Gender: {pet.gender}</Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#FE8756",
                      mt: 1,
                      textTransform: "none",
                      fontSize: "12px",
                    }}
                   onClick={() => setSelectedPet(pet)}
                  >
                    View Profile
                  </Button>
                  <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                    <IconButton color="primary" onClick={() => handleOpenEdit(pet)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeletePet(pet.petId)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="text.secondary" sx={{ p: 2, textAlign: "center" }}>
            No pets added yet.
          </Typography>
        )}
      </Paper>

      <Fab color="primary" sx={{ position: "fixed", bottom: 30, right: 30 }} onClick={handleOpenAdd}>
        <Add />
      </Fab>
<Modal open={openModal} onClose={() => setOpenModal(false)}>
  <Box
    sx={{
      p: 4,
      bgcolor: "background.paper",
      borderRadius: 4,
      width: { xs: "95%", sm: "80%", md: "500px" },
      mx: "auto",
      mt: "5%",
      boxShadow: 12,
      display: "flex",
      flexDirection: "column",
      gap: 3,
    }}
  >
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      {editingPetId ? "Update Pet" : "Add New Pet"}
    </Typography>

    <TextField
      label="Name"
      fullWidth
      value={petForm.name}
      onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
      error={!!errors.name}
      helperText={errors.name}
    />

    <TextField
      select
      label="Species"
      fullWidth
      value={petForm.species}
      onChange={(e) => setPetForm({ ...petForm, species: e.target.value })}
      error={!!errors.species}
      helperText={errors.species}
    >
      <MenuItem value="Dog">Dog</MenuItem>
      <MenuItem value="Cat">Cat</MenuItem>
      <MenuItem value="Fish">Fish</MenuItem>
      <MenuItem value="Parrot">Parrot</MenuItem>
    </TextField>

    <TextField
      label="Breed"
      fullWidth
      value={petForm.breed}
      onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
      error={!!errors.breed}
      helperText={errors.breed}
    />

    <TextField
      label="Age"
      type="number"
      fullWidth
      value={petForm.age}
      onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
      error={!!errors.age}
      helperText={errors.age}
    />

    <TextField
      select
      label="Gender"
      fullWidth
      value={petForm.gender}
      onChange={(e) => setPetForm({ ...petForm, gender: e.target.value })}
    >
      <MenuItem value="Male">Male</MenuItem>
      <MenuItem value="Female">Female</MenuItem>
    </TextField>

    <TextField
      label="Medical History"
      fullWidth
      multiline
      rows={3}
      value={petForm.medicalHistory}
      onChange={(e) => setPetForm({ ...petForm, medicalHistory: e.target.value })}
      error={!!errors.medicalHistory}
      helperText={errors.medicalHistory}
    />

    {/* Modern Drag & Drop Uploader */}
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        textAlign: "center",
        cursor: "pointer",
        border: errors.image ? "2px dashed red" : "2px dashed #ccc",
        borderRadius: 3,
        "&:hover": { bgcolor: "#f9f9f9" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
      }}
      onClick={() => document.getElementById("fileInput").click()}
    >
      {petForm.preview ? (
        <>
          <Avatar src={petForm.preview} sx={{ width: 100, height: 100 }} />
          <Typography>Click to change image</Typography>
        </>
      ) : (
        <>
          <CloudUpload sx={{ fontSize: 40, color: "#888" }} />
          <Typography>Drag & Drop or Click to upload</Typography>
        </>
      )}
      <input
        id="fileInput"
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileUpload}
      />
    </Paper>
    {errors.image && <Typography color="error">{errors.image}</Typography>}

    <Button
      variant="contained"
      fullWidth
      sx={{ mt: 1.5, py: 1.5, borderRadius: 3 }}
      onClick={handleSavePet}
    >
      {editingPetId ? "Update Pet" : "Add Pet"}
    </Button>
  </Box>
</Modal>

{/* View Profile Modal */}
<Modal open={!!selectedPet} onClose={() => setSelectedPet(null)}>
  <Box
    sx={{
      p: 4,
      bgcolor: "background.paper",
      borderRadius: 4,
      width: { xs: "95%", sm: "80%", md: "500px" },
      mx: "auto",
      mt: "5%",
      boxShadow: 12,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      alignItems: "center",
    }}
  >
    {selectedPet && (
      <>
        <Avatar
          src={selectedPet.imageUrl}
          sx={{ width: 120, height: 120, mb: 2 }}
        />
        <Typography variant="h5" fontWeight="bold">{selectedPet.name}</Typography>
        <Typography color="text.secondary">
          {selectedPet.species} • {selectedPet.breed}
        </Typography>
        <Typography color="text.secondary">Age: {selectedPet.age}</Typography>
        <Typography color="text.secondary">Gender: {selectedPet.gender}</Typography>
        <Divider sx={{ width: "100%", my: 2 }} />
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          <strong>Medical History:</strong> {selectedPet.medicalHistory}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5, borderRadius: 3 }}
          onClick={() => setSelectedPet(null)}
        >
          Close
        </Button>
      </>
    )}
  </Box>
</Modal>


      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
