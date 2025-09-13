import React, { useState } from "react";
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
} from "@mui/material";
import { Add, Delete, Edit, CloudUpload, Search } from "@mui/icons-material";

export default function PetProfile() {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Bella",
      species: "Dog",
      breed: "Golden Retriever",
      age: 3,
      medicalHistory: "Vaccinated, no known allergies",
      image: "https://placedog.net/400/300?id=12",
    },
    {
      id: 2,
      name: "Milo",
      species: "Cat",
      breed: "Persian",
      age: 2,
      medicalHistory: "Asthma (on medication)",
      image: "https://placekitten.com/400/300",
    },
    {
      id: 3,
      name: "Polly",
      species: "Parrot",
      breed: "Macaw",
      age: 4,
      medicalHistory: "Healthy",
      image: "https://loremflickr.com/400/300/parrot",
    },
  ]);

  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editingPetId, setEditingPetId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedPet, setSelectedPet] = useState(null); // ✅ For viewing profile

  const [petForm, setPetForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    medicalHistory: "",
    image: "",
  });

  // 📌 Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setPetForm({ ...petForm, image: imgUrl });
    }
  };

  // 📌 Validate form
  const validateForm = () => {
    let tempErrors = {};
    if (!petForm.name.trim()) tempErrors.name = "Name is required";
    if (!petForm.species) tempErrors.species = "Species is required";
    if (!petForm.breed.trim()) tempErrors.breed = "Breed is required";
    if (!petForm.age) tempErrors.age = "Age is required";
    else if (isNaN(petForm.age)) tempErrors.age = "Age must be a number";
    if (!petForm.medicalHistory.trim())
      tempErrors.medicalHistory = "Medical history is required";
    if (!petForm.image) tempErrors.image = "Pet image is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 📌 Open Add Pet Modal
  const handleOpenAdd = () => {
    setEditingPetId(null);
    setPetForm({
      name: "",
      species: "",
      breed: "",
      age: "",
      medicalHistory: "",
      image: "",
    });
    setErrors({});
    setOpenModal(true);
  };

  // 📌 Open Edit Pet Modal
  const handleOpenEdit = (pet) => {
    setEditingPetId(pet.id);
    setPetForm({ ...pet });
    setErrors({});
    setOpenModal(true);
  };

  // 📌 Save Pet (Add or Update)
  const handleSavePet = () => {
    if (!validateForm()) return;

    if (editingPetId) {
      setPets(
        pets.map((p) => (p.id === editingPetId ? { ...petForm, id: p.id } : p))
      );
    } else {
      setPets([...pets, { ...petForm, id: Date.now() }]);
    }

    setOpenModal(false);
  };

  // 📌 Delete pet
  const handleDeletePet = (id) => {
    setPets(pets.filter((pet) => pet.id !== id));
  };

  // 📌 View Pet Profile (on avatar click)
  const handleViewProfile = (pet) => {
    setSelectedPet(pet);
  };

  // 📌 Filter pets by search term
  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.species.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, position: "relative" }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Pets 🐾
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Add, view, edit, search, and manage your pets' profiles.
      </Typography>

      {/* Search Bar */}
      <TextField
        variant="outlined"
        placeholder="Search pets by name, species, or breed..."
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: "gray" }} />,
        }}
        sx={{ mb: 2 }}
      />

      {/* Pet List */}
      <Paper sx={{ p: 2, borderRadius: 3, mt: 1 }}>
        <Typography variant="h6" gutterBottom>
          My Pets
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    textAlign: "center",
                    boxShadow: 2,
                  }}
                >
                  <Avatar
                    src={pet.image}
                    alt={pet.name}
                    sx={{
                      width: 100,
                      height: 100,
                      margin: "auto",
                      mb: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => handleViewProfile(pet)} // ✅ Open Profile Modal
                  />
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography color="text.secondary">
                    {pet.species} • {pet.breed}
                  </Typography>
                  <Typography color="text.secondary">
                    {pet.age} years
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontStyle: "italic", color: "gray" }}
                  >
                    {pet.medicalHistory}
                  </Typography>

                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEdit(pet)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeletePet(pet.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography color="text.secondary" sx={{ p: 2 }}>
              No pets found.
            </Typography>
          )}
        </Grid>
      </Paper>

      {/* Floating + Button */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        onClick={handleOpenAdd}
      >
        <Add />
      </Fab>

      {/* Modal for Add / Edit Pet */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 3,
            width: "90%",
            maxWidth: 600,
            mx: "auto",
            mt: "10%",
            boxShadow: 5,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editingPetId ? "Update Pet" : "Add New Pet"}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                value={petForm.name}
                onChange={(e) =>
                  setPetForm({ ...petForm, name: e.target.value })
                }
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Species"
                fullWidth
                value={petForm.species}
                onChange={(e) =>
                  setPetForm({ ...petForm, species: e.target.value })
                }
                error={!!errors.species}
                helperText={errors.species}
              >
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
                <MenuItem value="Fish">Fish</MenuItem>
                <MenuItem value="Parrot">Parrot</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Breed"
                fullWidth
                value={petForm.breed}
                onChange={(e) =>
                  setPetForm({ ...petForm, breed: e.target.value })
                }
                error={!!errors.breed}
                helperText={errors.breed}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Age (years)"
                type="number"
                fullWidth
                value={petForm.age}
                onChange={(e) =>
                  setPetForm({ ...petForm, age: e.target.value })
                }
                error={!!errors.age}
                helperText={errors.age}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Medical History"
                fullWidth
                multiline
                rows={2}
                value={petForm.medicalHistory}
                onChange={(e) =>
                  setPetForm({ ...petForm, medicalHistory: e.target.value })
                }
                error={!!errors.medicalHistory}
                helperText={errors.medicalHistory}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                fullWidth
                sx={{ textTransform: "none" }}
                color={errors.image ? "error" : "primary"}
              >
                {petForm.image ? "Change Pet Image" : "Upload Pet Image"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </Button>
              {errors.image && (
                <Typography color="error" variant="caption">
                  {errors.image}
                </Typography>
              )}
              {petForm.image && (
                <Avatar
                  src={petForm.image}
                  alt="Pet Preview"
                  sx={{ width: 80, height: 80, mt: 2 }}
                />
              )}
            </Grid>
          </Grid>

          <Button
            variant="contained"
            startIcon={editingPetId ? <Edit /> : <Add />}
            sx={{ mt: 2 }}
            onClick={handleSavePet}
          >
            {editingPetId ? "Update Pet" : "Add Pet"}
          </Button>
        </Box>
      </Modal>

      {/* ✅ Modal for Viewing Pet Profile */}
      <Modal open={!!selectedPet} onClose={() => setSelectedPet(null)}>
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 3,
            width: "90%",
            maxWidth: 500,
            mx: "auto",
            mt: "10%",
            boxShadow: 5,
            textAlign: "center",
          }}
        >
          {selectedPet && (
            <>
              <Avatar
                src={selectedPet.image}
                alt={selectedPet.name}
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold">
                {selectedPet.name}
              </Typography>
              <Typography color="text.secondary">
                {selectedPet.species} • {selectedPet.breed}
              </Typography>
              <Typography color="text.secondary">
                {selectedPet.age} years old
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                <strong>Medical History:</strong> {selectedPet.medicalHistory}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => setSelectedPet(null)}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
