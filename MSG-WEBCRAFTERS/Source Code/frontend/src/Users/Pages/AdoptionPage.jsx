import React, { useState } from "react"
import {
  Box,
  Typography,
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
} from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
import SearchIcon from "@mui/icons-material/Search"
import AdoptionCard from "../../GlobalComponents/AdoptionCard"

function AdoptionPage() {
  const allPets = [
    {
      id: 1,
      name: "Jack",
      age: 5,
      gender: "Male",
      breed: "German Shepherd",
      shelter: "Animal Shelter",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80", // German Shepherd dog
      species: "Dog",
    },
    {
      id: 2,
      name: "Luna",
      age: 3,
      gender: "Female",
      breed: "Golden Retriever",
      shelter: "Happy Paws",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80", // Golden Retriever dog
      species: "Dog",
    },
    {
      id: 3,
      name: "Whiskers",
      age: 4,
      gender: "Female",
      breed: "Domestic Shorthair",
      shelter: "Cat Haven",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&q=80", // Cat closeup
      species: "Cat",
    },
    {
      id: 4,
      name: "Milo",
      age: 2,
      gender: "Male",
      breed: "Tabby",
      shelter: "Cat Rescue",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80", // Tabby cat
      species: "Cat",
    },
    {
      id: 5,
      name: "Polly",
      age: 1,
      gender: "Female",
      breed: "African Grey",
      shelter: "Bird Sanctuary",
      rating: 4.8,
      image: "https://d2zp5xs5cp8zlg.cloudfront.net/image-51185-800.jpg", // African Grey parrot
      species: "Parrot",
    },
    {
      id: 6,
      name: "Rio",
      age: 3,
      gender: "Male",
      breed: "Macaw",
      shelter: "Tropical Aviary",
      rating: 4.9,
      image: "https://images.birdfact.com/production/scarlet-macaw.jpg?w=1200&h=630&q=82&auto=format&fit=crop&dm=1730753664&s=9724133338e407b24478297779a124ab", // Macaw parrot
      species: "Parrot",
    },
    {
      id: 7,
      name: "Bella",
      age: 6,
      gender: "Female",
      breed: "Beagle",
      shelter: "Animal Rescue",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&q=80", // Beagle dog
      species: "Dog",
    },
    {
      id: 8,
      name: "Simba",
      age: 5,
      gender: "Male",
      breed: "Siamese",
      shelter: "Cat Comforts",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80", // Siamese cat
      species: "Cat",
    },
    {
      id: 9,
      name: "Buddy",
      age: 4,
      gender: "Male",
      breed: "Beagle",
      shelter: "Happy Tails Shelter",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=600&q=80", // Beagle dog again but different image
      species: "Dog",
    },
   
  ];
          


  const [search, setSearch] = useState("")
  const [species, setSpecies] = useState("")
  const [age, setAge] = useState("")
  const [rating, setRating] = useState("")
  const [shelter, setShelter] = useState("")
  const [page, setPage] = useState(1)
  const [anchorEl, setAnchorEl] = useState(null)

  const rowsPerPage = 10
  const cardsPerRow = 3
  const cardsPerPage = rowsPerPage * cardsPerRow

  const filteredPets = allPets.filter((pet) => {
    const searchLower = search.toLowerCase()
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
    )
  })

  const totalPages = Math.ceil(filteredPets.length / cardsPerPage)
  const paginatedPets = filteredPets.slice((page - 1) * cardsPerPage, page * cardsPerPage)

  const uniqueShelters = [...new Set(allPets.map((pet) => pet.shelter))]

  return (
    <Box sx={{ px: 4, py: 6, pt: 10 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Adopt a Pet Today
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          sx={{ width: "100%" }}
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
                <MenuItem key={a} value={a}>{a}</MenuItem>
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
                <MenuItem key={r} value={r}>{r}</MenuItem>
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
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Menu>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 3,
          mt: 3,
        }}
      >
        {paginatedPets.map((pet) => (
          <AdoptionCard key={pet.id} {...pet} />
        ))}

      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  )
}

export default AdoptionPage
