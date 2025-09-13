import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  Stack,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

const reviews = [
  {
    name: "John Doe",
    avatar: "",
    review:
      "Great experience! The staff were very friendly and the service was top notch.",
    rating: 5,
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    totalPets: 2,
    memberSince: "2020",
    image: "",
    pets: [
      {
        id: 1,
        name: "Buddy",
        breed: "Golden Retriever",
        age: 3,
        gender: "Male",
        image: "",
      },
      {
        id: 2,
        name: "Milo",
        breed: "Bulldog",
        age: 2,
        gender: "Male",
        image: "",
      },
    ],
  },
  {
    name: "Amy Smith",
    avatar: "",
    review: "Quick and easy appointment scheduling. Highly recommended!",
    rating: 4,
    email: "amy@example.com",
    phone: "987-654-3210",
    address: "456 Elm St",
    totalPets: 1,
    memberSince: "2021",
    image: "",
    pets: [
      {
        id: 3,
        name: "Luna",
        breed: "Siamese Cat",
        age: 1,
        gender: "Female",
        image: "",
      },
    ],
  },
  {
    name: "Chris Johnson",
    avatar: "",
    review:
      "Satisfactory experience but waiting time was longer than expected.",
    rating: 3,
    email: "chris@example.com",
    phone: "555-111-2222",
    address: "789 Oak St",
    totalPets: 3,
    memberSince: "2019",
    image: "",
    pets: [],
  },
];

function VetReviews() {
  const [search, setSearch] = React.useState("");
  const [filterEl, setFilterEl] = React.useState(null);
  const [ratingFilter, setRatingFilter] = React.useState(null);
  const [selectedOwner, setSelectedOwner] = React.useState(null);
  const fullScreen = useMediaQuery("(max-width:600px)");

  const handleFilterOpen = (e) => setFilterEl(e.currentTarget);
  const handleFilterClose = () => setFilterEl(null);

  const filteredReviews = reviews.filter((r) => {
    const matchesName = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesRating = ratingFilter ? r.rating === ratingFilter : true;
    return matchesName && matchesRating;
  });

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" fontWeight="bold">
          Reviews
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={handleFilterOpen}>
            <FilterListIcon />
          </IconButton>
        </Stack>
      </Stack>

      {filteredReviews.map((item, idx) => (
        <Card
          key={idx}
          sx={{
            p: 2,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            bgcolor: "#1C1C26",
            color: "#fff",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{ width: 50, height: 50, cursor: "pointer" }}
                src={item.avatar}
                alt={item.name}
                onClick={() => setSelectedOwner(item)}
              />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ cursor: "pointer" }}
                onClick={() => setSelectedOwner(item)}
              >
                {item.name}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <StarIcon sx={{ color: "#FE8756" }} />
              <Typography>{item.rating}</Typography>
            </Stack>
          </Stack>

          <Divider sx={{ my: 1, bgcolor: "#444" }} />
          <Typography variant="body2">{item.review}</Typography>
        </Card>
      ))}

      <Menu
        anchorEl={filterEl}
        open={Boolean(filterEl)}
        onClose={handleFilterClose}
      >
        <MenuItem
          onClick={() => {
            setRatingFilter(null);
            handleFilterClose();
          }}
        >
          All Ratings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setRatingFilter(5);
            handleFilterClose();
          }}
        >
          5 ★
        </MenuItem>
        <MenuItem
          onClick={() => {
            setRatingFilter(4);
            handleFilterClose();
          }}
        >
          4 ★
        </MenuItem>
        <MenuItem
          onClick={() => {
            setRatingFilter(3);
            handleFilterClose();
          }}
        >
          3 ★
        </MenuItem>

        <MenuItem
          onClick={() => {
            setRatingFilter(2);
            handleFilterClose();
          }}
        >
          2 ★
        </MenuItem>

        <MenuItem
          onClick={() => {
            setRatingFilter(1);
            handleFilterClose();
          }}
        >
          1 ★
        </MenuItem>
      </Menu>

      <Dialog
        open={!!selectedOwner}
        onClose={() => setSelectedOwner(null)}
        fullWidth
        fullScreen={fullScreen}
        maxWidth="md"
      >
        {selectedOwner && (
          <DialogContent sx={{ bgcolor: "#fff", color: "#000" }}>
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
              <Box sx={{ flex: 1 }}>
                <Avatar
                  src={selectedOwner.image}
                  sx={{ width: 80, height: 80, mb: 2 }}
                />
                <Typography variant="h6">{selectedOwner.name}</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  sx={{ mt: 1 }}
                >
                  <StarIcon sx={{ color: "#FE8756" }} />
                  <Typography>{selectedOwner.rating}</Typography>
                </Stack>

                <Divider sx={{ my: 2, bgcolor: "#ddd" }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Review
                </Typography>
                <Typography variant="body1">{selectedOwner.review}</Typography>

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
              </Box>

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

export default VetReviews;
