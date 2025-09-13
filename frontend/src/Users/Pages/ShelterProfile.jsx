import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  TextField,
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  IconButton,
  InputAdornment,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import AdoptionCard from "../../GlobalComponents/AdoptionCard";

function VetProfiles() {
  const vet = {
    name: "Dr. John Doe",
    avatar: "",
    email: "dr.john@example.com",
    address: "123 Main St",
    experience: "5 years",
    joiningDate: "2020-06-15",
    description:
      "Compassionate veterinarian with extensive experience in small animal care.",
  };

  const allPets = [
    { id: 1, name: "Jack", age: 14, gender: "Male", breed: "German Shepard", shelter: "Animal Shelter", rating: 4.9, image: "dog.webp", species: "Dog" },
    { id: 2, name: "Luna", age: 10, gender: "Female", breed: "Golden Retriever", shelter: "Animal Shelter", rating: 4.8, image: "dog.webp", species: "Dog" },
    { id: 3, name: "Max", age: 12, gender: "Male", breed: "Labrador", shelter: "Animal Shelter", rating: 4.7, image: "dog.webp", species: "Dog" },
    { id: 4, name: "Bella", age: 8, gender: "Female", breed: "Beagle", shelter: "Animal Rescue", rating: 4.6, image: "dog.webp", species: "Dog" },
    { id: 5, name: "Charlie", age: 11, gender: "Male", breed: "Bulldog", shelter: "Pet Haven", rating: 4.5, image: "dog.webp", species: "Dog" },
    { id: 6, name: "Daisy", age: 9, gender: "Female", breed: "Poodle", shelter: "Happy Tails", rating: 4.8, image: "dog.webp", species: "Dog" },
  ];

  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [rating, setRating] = useState("");
  const [shelter, setShelter] = useState("");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);

  const cardsPerPage = 6;

  const filteredPets = allPets.filter((pet) => {
    const searchLower = search.toLowerCase();
    return (
      (search === "" ||
        pet.name.toLowerCase().includes(searchLower) ||
        pet.age.toString().includes(searchLower) ||
        pet.shelter.toLowerCase().includes(searchLower) ||
        pet.species.toLowerCase().includes(searchLower) ||
        pet.gender.toLowerCase().includes(searchLower) ||
        pet.breed.toLowerCase().includes(searchLower)) &&
      (species === "" || pet.species === species) &&
      (age === "" || pet.age.toString() === age) &&
      (rating === "" || pet.rating.toString() === rating) &&
      (shelter === "" || pet.shelter === shelter)
    );
  });

  const totalPages = Math.ceil(filteredPets.length / cardsPerPage);
  const paginatedPets = filteredPets.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );
  const uniqueShelters = [...new Set(allPets.map((pet) => pet.shelter))];

  return (
    <Box
      sx={{ pt: 12, px: { xs: 2, sm: 3, md: 6 }, maxWidth: "1200px", mx: "auto" }}
    >
      {/* Vet Info */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        alignItems={{ xs: "center", md: "flex-start" }}
        sx={{ mb: 8 }}
      >
        <Box sx={{ textAlign: "center", flexShrink: 0 }}>
          <Avatar
            src={vet.avatar}
            sx={{ width: 160, height: 160, mx: "auto", mb: 3 }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {vet.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            {vet.description}
          </Typography>

          <Stack spacing={1} sx={{ mt: 3 }}>
            <Typography>
              <strong>Email:</strong> {vet.email}
            </Typography>
            <Typography>
              <strong>Address:</strong> {vet.address}
            </Typography>
            <Typography>
              <strong>Experience:</strong> {vet.experience}
            </Typography>
            <Typography>
              <strong>Joined:</strong> {vet.joiningDate}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      {/* Section Title */}
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 4, textAlign: "center" }}
      >
        Pets Available for Adoption
      </Typography>

      {/* Search & Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          mb: 3,
          justifyContent: "end",
        }}
      >
        <TextField
          sx={{ flex: 1, maxWidth: 200 }}
          variant="outlined"
          placeholder="Search by name, age, shelter, species, gender, or breed..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ whiteSpace: "nowrap" }}
        >
          Filters
        </Button>

        {/* Filter Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{ sx: { width: 300, p: 2 } }}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Filter Options
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Species</InputLabel>
            <Select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              label="Species"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Age</InputLabel>
            <Select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              label="Age"
            >
              <MenuItem value="">All</MenuItem>
              {[...new Set(allPets.map((pet) => pet.age))].map((a) => (
                <MenuItem key={a} value={a}>
                  {a}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              label="Rating"
            >
              <MenuItem value="">All</MenuItem>
              {[...new Set(allPets.map((pet) => pet.rating))].map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Shelter</InputLabel>
            <Select
              value={shelter}
              onChange={(e) => setShelter(e.target.value)}
              label="Shelter"
            >
              <MenuItem value="">All</MenuItem>
              {uniqueShelters.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Menu>
      </Box>

      {/* Cards Grid */}
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            justifyContent: "center",
            gridTemplateColumns: {
              xs: "1fr",               
              sm: "repeat(2, 1fr)",    // 2 cards per row (tablet)
              lg: "repeat(3, 1fr)",    // 3 cards per row (desktop)
              xl: "repeat(4, 1fr)",    // 4 cards per row (large desktop)
            },
          }}
        >
          {paginatedPets.map((pet) => (
            <AdoptionCard key={pet.id} {...pet} />
          ))}
        </Box>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default VetProfiles;
