import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Dialog,
  DialogContent,
  Avatar,
  Button,
  Card,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import ProfileCard from "../components/card";

const owners = [
  {
    id: 1,
    name: "John Smith.",
    role: "Pet Owner",
    email: "johnsmith@gmail.com",
    phone: "+92 XXXXXXXXXX",
    address: "House No. 4, xxxxxxx, xxxxxxxxxxxxxxxxxxxxxxxxxx",
    totalPets: 3,
    memberSince: "March 2022",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    pets: [
      {
        id: 1,
        name: "Jack",
        breed: "German Shepherd",
        age: 14,
        gender: "Male",
        image: "https://placedog.net/300/200?id=1",
      },
      {
        id: 2,
        name: "Jack",
        breed: "German Shepherd",
        age: 14,
        gender: "Male",
        image: "https://placedog.net/300/200?id=2",
      },
      {
        id: 3,
        name: "Jack",
        breed: "German Shepherd",
        age: 14,
        gender: "Male",
        image: "https://placedog.net/300/200?id=3",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Lee",
    role: "Pet Owner",
    email: "sarahlee@gmail.com",
    phone: "+92 XXXXXXXXXX",
    address: "House No. 10, yyyyyyy, xxxxxxxxxxxxxxxxxxxxx",
    totalPets: 2,
    memberSince: "Jan 2021",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    pets: [],
  },
];

function PetOwner() {
  const [search, setSearch] = useState("");
  const [selectedOwner, setSelectedOwner] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Filter owners based on search
  const filteredOwners = owners.filter((owner) =>
    owner.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 2, color: "#1C1C26" }}
      >
        Pet Owner
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Owner"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3, bgcolor: "white", borderRadius: 2 }}
      />

      {/* Cards Grid */}
      <Grid container spacing={3}>
        {filteredOwners.map((owner) => (
          <Grid item key={owner.id}>
            <ProfileCard
              name={owner.name}
              role={owner.role}
              image={owner.image}
              onViewProfile={() => setSelectedOwner(owner)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Profile Modal */}
      <Dialog
        open={!!selectedOwner}
        onClose={() => setSelectedOwner(null)}
        fullWidth
        fullScreen={fullScreen}
        maxWidth="md"
      >
        {selectedOwner && (
          <DialogContent>
            {/* Close Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => setSelectedOwner(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              {/* Left Section */}
              <Box sx={{ flex: 1 }}>
                <Avatar
                  src={selectedOwner.image}
                  sx={{ width: 80, height: 80, mb: 2 }}
                />
                <Typography variant="h6">{selectedOwner.name}</Typography>
                <Typography variant="body2">
                  {selectedOwner.email}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#FE8756",
                    textTransform: "none",
                    mt: 1,
                  }}
                >
                  Message
                </Button>

                <Typography sx={{ mt: 2 }}>
                  <b>Phone:</b> {selectedOwner.phone}
                </Typography>
                <Typography>
                  <b>Address:</b> {selectedOwner.address}
                </Typography>
                <Typography>
                  <b>Total Pets:</b> {selectedOwner.totalPets}
                </Typography>
                <Typography>
                  <b>Member Since:</b> {selectedOwner.memberSince}
                </Typography>

                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button variant="contained" color="warning">
                    Change Role
                  </Button>
                  <Button variant="contained" color="error">
                    Delete Account
                  </Button>
                </Box>
              </Box>

              {/* Right Section - Pets */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Pets
                </Typography>
                <Grid container spacing={2}>
                  {selectedOwner.pets.map((pet) => (
                    <Grid item key={pet.id}>
                      <Card
                        sx={{
                          width: 150,
                          bgcolor: "#1C1C26",
                          color: "white",
                          borderRadius: 2,
                          textAlign: "center",
                          p: 1,
                        }}
                      >
                        <Avatar
                          src={pet.image}
                          sx={{ width: 60, height: 60, mx: "auto", mb: 1 }}
                        />
                        <Typography variant="subtitle1">{pet.name}</Typography>
                        <Typography variant="body2">{pet.breed}</Typography>
                        <Typography variant="body2">Age: {pet.age}</Typography>
                        <Typography variant="body2">
                          Gender: {pet.gender}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#FE8756",
                            mt: 1,
                            textTransform: "none",
                            fontSize: "12px",
                          }}
                        >
                          View Profile
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}

export default PetOwner;
