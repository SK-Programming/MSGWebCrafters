import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating,
  Card,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

function ProfileCard({ name, role, image, rating, onViewProfile }) {
  return (
    <Card
      sx={{
        height: 200,
        width: 160,
        textAlign: "center",
        borderRadius: 3,
        bgcolor: "#1C1C26",
        color: "white",
        p: 1,
      }}
    >
      <Avatar src={image} sx={{ width: 50, height: 50, mx: "auto", mb: 1 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1, color: "#bdbdbd" }}>
        {role}
      </Typography>
      {rating !== undefined && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 1 }}>
          <StarIcon sx={{ color: "#FE8756", fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {rating}
          </Typography>
        </Box>
      )}
      <Button
        variant="contained"
        onClick={onViewProfile}
        sx={{
          bgcolor: "#FE8756",
          color: "#fff",
          borderRadius: "8px",
          textTransform: "none",
          px: 2,
          "&:hover": { bgcolor: "#e76e3c" },
          fontSize: "12px",
        }}
      >
        View Profile
      </Button>
    </Card>
  );
}

function Veterinarians() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const veterinarians = [
    {
      id: 1,
      name: "Dr. John Smith",
      role: "Veterinarian",
      email: "drsmith@gmail.com",
      phone: "+92 XXXXXXXXXX",
      address: "House No. 4, xxxxxxxx, xxxxxxxxxxxxxx",
      rating: 4.5,
      experience: "10 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      totalPets: 3,
      memberSince: "March 2022",
    },
    {
      id: 2,
      name: "Dr. Sarah Lee",
      role: "Veterinarian",
      email: "drsarah@gmail.com",
      phone: "+92 XXXXXXXXXX",
      address: "Clinic No. 10, yyyyyyy, xxxxxxxxxxx",
      rating: 3.8,
      experience: "6 years",
      specialization: "Exotic Animals",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      totalPets: 2,
      memberSince: "January 2021",
    },
  ];

  const filteredVets = veterinarians.filter((vet) => {
    const matchesSearch = vet.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || vet.role === roleFilter;
    const matchesRating = vet.rating >= ratingFilter;
    return matchesSearch && matchesRole && matchesRating;
  });

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ pt: 15, p: 5 }}>
      <Box sx={{ textAlign: "center", mb: 2, mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}>
          Veterinarians
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ bgcolor: "white", borderRadius: 2 }}
        />
        <Box
          onClick={handleFilterClick}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            px: 2,
            py: 1,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            "&:hover": { bgcolor: "#e0e0e0" },
          }}
        >
          <FilterListIcon sx={{ mr: 1, color: "#FE8756" }} />
          <Typography sx={{ fontWeight: "bold" }}>Filter</Typography>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ sx: { p: 2, minWidth: 250 } }}
        >
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Veterinarian">Veterinarian</MenuItem>
              <MenuItem value="Assistant">Assistant</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 1 }}>Min Rating:</Typography>
            <Rating value={ratingFilter} onChange={(e, newValue) => setRatingFilter(newValue)} precision={0.5} />
          </Box>
        </Menu>
      </Box>

      <Grid container spacing={3}>
        {filteredVets.map((vet) => (
          <Grid key={vet.id} item xs={12} sm={6} md={4}>
            <ProfileCard
              name={vet.name}
              role={vet.role}
              image={vet.image}
              rating={vet.rating}
              onViewProfile={() => navigate(`/vet/${vet.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Veterinarians;
