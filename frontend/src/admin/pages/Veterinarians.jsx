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
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating,
  Chip,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTheme } from "@mui/material/styles";
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
      <Box>
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
      </Box>
    </Card>
  );
}

function Veterinarians() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedVet, setSelectedVet] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAppointmentsModal, setOpenAppointmentsModal] = useState(false);
  const [openReviewsModal, setOpenReviewsModal] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
      appointments: [
        {
          petName: "Jack",
          breed: "German Shepherd",
          appId: "App. 1A",
          clinic: "Gentzenblatt",
          ownerAvatar: "https://randomuser.me/api/portraits/men/12.jpg",
        },
        {
          petName: "Jack",
          breed: "German Shepherd",
          appId: "App. 1B",
          clinic: "Gentzenblatt",
          ownerAvatar: "https://randomuser.me/api/portraits/men/14.jpg",
        },
      ],
      reviews: [
        {
          id: 1,
          role: "Owner",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Nulla facilisi. Integer nec odio. Praesent libero. Sed cursus ante duplbus diam.",
        },
        {
          id: 2,
          role: "Owner",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Nulla facilisi. Integer nec odio. Praesent libero. Sed cursus ante duplbus diam.",
        },
      ],
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
      appointments: [],
      reviews: [],
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
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#1C1C26" }}>
        Veterinarians
      </Typography>
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
            <ProfileCard name={vet.name} role={vet.role} image={vet.image} rating={vet.rating} onViewProfile={() => setSelectedVet(vet)} />
          </Grid>
        ))}
      </Grid>
      <Dialog open={!!selectedVet} onClose={() => setSelectedVet(null)} fullWidth fullScreen={fullScreen} maxWidth="md" PaperProps={{ sx: { borderRadius: 2 } }}>
        {selectedVet && (
          <>
            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={selectedVet.image} sx={{ width: 60, height: 60, mr: 2 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {selectedVet.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {selectedVet.email}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton onClick={() => setSelectedVet(null)} size="small">
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: "#FE8756",
                    textTransform: "none",
                    borderRadius: 1,
                    px: 2,
                    "&:hover": { bgcolor: "#e76e3c" },
                  }}
                >
                  Message
                </Button>
              </Box>
              <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Phone:</strong> {selectedVet.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Address:</strong> {selectedVet.address}
                </Typography>
              </Box>
              <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0", display: "flex" }}>
                <Box sx={{ mr: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                    Total Pets
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {selectedVet.totalPets}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                    Member Since
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {selectedVet.memberSince}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0", display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#FE8756",
                    color: "#FE8756",
                    textTransform: "none",
                    borderRadius: 1,
                    flex: 1,
                    "&:hover": { borderColor: "#e76e3c" },
                  }}
                >
                  Change Role
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#FF3B30",
                    color: "#FF3B30",
                    textTransform: "none",
                    borderRadius: 1,
                    flex: 1,
                    "&:hover": { borderColor: "#d32f2f" },
                  }}
                >
                  Delete Account
                </Button>
              </Box>
              <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Current Appointments
                  </Typography>
                  <Button
                    sx={{ color: "#FE8756", textTransform: "none", fontWeight: "bold" }}
                    onClick={() => setOpenAppointmentsModal(true)}
                  >
                    View All
                  </Button>
                </Box>
                {selectedVet.appointments.length > 0 ? (
                  selectedVet.appointments.slice(0, 1).map((appointment, index) => (
                    <Card key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Avatar src={appointment.ownerAvatar} sx={{ width: 40, height: 40 }} />
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                {appointment.petName}.
                              </Typography>
                              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {appointment.breed}
                              </Typography>
                              <Typography variant="body2">{appointment.appId}</Typography>
                              <Typography variant="body2">{appointment.clinic}</Typography>
                            </Box>
                          </Box>
                          <Chip
                            label="Owner"
                            variant="outlined"
                            sx={{
                              borderRadius: 1,
                              height: 24,
                              "& .MuiChip-label": { px: 1 },
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", py: 2 }}>
                    No appointments scheduled
                  </Typography>
                )}
              </Box>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Reviews
                  </Typography>
                  <Button
                    sx={{ color: "#FE8756", textTransform: "none", fontWeight: "bold" }}
                    onClick={() => setOpenReviewsModal(true)}
                  >
                    View All
                  </Button>
                </Box>
                {selectedVet.reviews.length > 0 ? (
                  selectedVet.reviews.slice(0, 1).map((review) => (
                    <Box key={review.id} sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Chip
                          label={review.role}
                          variant="outlined"
                          sx={{
                            borderRadius: 1,
                            height: 24,
                            "& .MuiChip-label": { px: 1 },
                          }}
                        />
                        <Button
                          size="small"
                          sx={{
                            color: "#FF3B30",
                            textTransform: "none",
                            fontSize: "0.75rem",
                          }}
                        >
                          Remove Review
                        </Button>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontStyle: "italic",
                          backgroundColor: "#f9f9f9",
                          p: 2,
                          borderRadius: 1,
                        }}
                      >
                        {review.content}
                      </Typography>
                      <Divider sx={{ mt: 2 }} />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", py: 2 }}>
                    No reviews yet
                  </Typography>
                )}
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
      <Dialog open={openAppointmentsModal} onClose={() => setOpenAppointmentsModal(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              All Appointments
            </Typography>
            <IconButton onClick={() => setOpenAppointmentsModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedVet &&
            (selectedVet.appointments.length > 0 ? (
              selectedVet.appointments.map((appointment, index) => (
                <Card key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Avatar src={appointment.ownerAvatar} sx={{ width: 40, height: 40 }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {appointment.petName}.
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {appointment.breed}
                          </Typography>
                          <Typography variant="body2">{appointment.appId}</Typography>
                          <Typography variant="body2">{appointment.clinic}</Typography>
                        </Box>
                      </Box>
                      <Chip
                        label="Owner"
                        variant="outlined"
                        sx={{
                          borderRadius: 1,
                          height: 24,
                          "& .MuiChip-label": { px: 1 },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", py: 2 }}>
                No appointments scheduled
              </Typography>
            ))}
        </DialogContent>
      </Dialog>
      <Dialog open={openReviewsModal} onClose={() => setOpenReviewsModal(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              All Reviews
            </Typography>
            <IconButton onClick={() => setOpenReviewsModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedVet &&
            (selectedVet.reviews.length > 0 ? (
              selectedVet.reviews.map((review) => (
                <Box key={review.id} sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Chip
                      label={review.role}
                      variant="outlined"
                      sx={{
                        borderRadius: 1,
                        height: 24,
                        "& .MuiChip-label": { px: 1 },
                      }}
                    />
                    <Button
                      size="small"
                      sx={{
                        color: "#FF3B30",
                        textTransform: "none",
                        fontSize: "0.75rem",
                      }}
                    >
                      Remove Review
                    </Button>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      backgroundColor: "#f9f9f9",
                      p: 2,
                      borderRadius: 1,
                    }}
                  >
                    {review.content}
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", py: 2 }}>
                No reviews yet
              </Typography>
            ))}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Veterinarians;
