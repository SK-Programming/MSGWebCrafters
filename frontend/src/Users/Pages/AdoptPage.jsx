import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
  Divider,
  Stack,
} from "@mui/material"
import Slider from "react-slick"
import StarIcon from "@mui/icons-material/Star"
import PetsIcon from "@mui/icons-material/Pets"
import CakeIcon from "@mui/icons-material/Cake"
import WcIcon from "@mui/icons-material/Wc"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const pets = [
  {
    id: 1,
    name: "Buddy",
    age: 2,
    gender: "Male",
    breed: "Golden Retriever",
    rating: 4.8,
    desc: "Buddy is a playful and affectionate dog who loves children and enjoys outdoor activities.",
    images: [
      "https://picsum.photos/600/400?random=1",
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=3",
    ],
    shelter: {
      name: "Happy Paws Shelter",
      memberSince: "2018",
      avatar: "https://picsum.photos/200/200?random=10",
      address: "123 Pet Lane, Cityville",
      phone: "+1234567890",
      email: "happypaws@example.com",
    },
  },
  {
    id: 2,
    name: "Luna",
    age: 1,
    gender: "Female",
    breed: "Siamese Cat",
    rating: 4.6,
    desc: "Luna is calm, loving, and enjoys snuggling. She is looking for a peaceful home.",
    images: [
      "https://picsum.photos/600/400?random=4",
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=6",
    ],
    shelter: {
      name: "Cozy Cats Shelter",
      memberSince: "2020",
      avatar: "https://picsum.photos/200/200?random=11",
      address: "456 Cat Street, Meowtown",
      phone: "+9876543210",
      email: "cozycats@example.com",
    },
  },
]

function AdoptPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pet = pets.find((p) => p.id === parseInt(id))

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  if (!pet) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Pet not found.</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "flex-start",
        pt: 7,
      }}
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <Slider {...settings}>
          {pet.images.map((img, i) => (
            <Box key={i}>
              <Box
                component="img"
                src={img}
                alt={pet.name}
                sx={{
                  width: "100%",
                  height: { xs: 250, sm: 300, md: 400 },
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Box sx={{ flex: 1, pl: 2, width: "100%" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {pet.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {pet.desc}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3, flexWrap: "wrap", gap: 2 }}
        >
          <Chip
            icon={<CakeIcon />}
            label={`Age: ${pet.age}`}
            sx={{
              bgcolor: "#D3DCC0",
              color: "#1c1c26",
              fontWeight: "bold",
            }}
          />
          <Chip
            icon={<WcIcon />}
            label={`Gender: ${pet.gender}`}
            sx={{
              bgcolor: "#D3DCC0",
              color: "#1c1c26",
              fontWeight: "bold",
            }}
          />
          <Chip
            icon={<PetsIcon />}
            label={`Breed: ${pet.breed}`}
            sx={{
              bgcolor: "#D3DCC0",
              color: "#1c1c26",
              fontWeight: "bold",
            }}
          />
          <Chip
            icon={<StarIcon />}
            label={`Rating: ${pet.rating}`}
            sx={{
              bgcolor: "#D3DCC0",
              color: "#1c1c26",
              fontWeight: "bold",
            }}
          />
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Avatar
            src={pet.shelter.avatar}
            sx={{ width: 70, height: 70, border: "2px solid #ff7043" }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {pet.shelter.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since {pet.shelter.memberSince}
            </Typography>
            <Typography variant="body2">{pet.shelter.address}</Typography>
            <Typography variant="body2">{pet.shelter.phone}</Typography>
            <Typography variant="body2" color="primary">
              {pet.shelter.email}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 4,
            px: 5,
            py: 1.5,
            bgcolor: "#ff7043",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            "&:hover": { bgcolor: "#e85d2f" },
          }}
        >
          {/* onClick={() => navigate(`/message/${pet.shelter.email}`)} */}
          Message Shelter
        </Button>
      </Box>
    </Box>
  )
}

export default AdoptPage
