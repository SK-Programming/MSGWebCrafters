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
    name: "Jack",
    age: 5,
    gender: "Male",
    breed: "German Shepherd",
    rating: 4.9,
    desc: "Jack is a loyal and energetic German Shepherd who loves outdoor adventures and playing fetch.",
    images: [
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80",
    ],
    shelter: {
      name: "Animal Shelter",
      memberSince: "2015",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      address: "123 Pet Lane, Cityville",
      phone: "+1234567890",
      email: "contact@animalshelter.com",
    },
  },
  {
    id: 2,
    name: "Luna",
    age: 3,
    gender: "Female",
    breed: "Golden Retriever",
    rating: 4.8,
    desc: "Luna is gentle and affectionate, perfect for families looking for a loving companion.",
    images: [
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80",
    ],
    shelter: {
      name: "Happy Paws",
      memberSince: "2018",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      address: "456 Dog Street, Woof Town",
      phone: "+9876543210",
      email: "info@happypaws.com",
    },
  },
  {
    id: 3,
    name: "Whiskers",
    age: 4,
    gender: "Female",
    breed: "Domestic Shorthair",
    rating: 4.7,
    desc: "Whiskers is a playful and curious cat who enjoys interactive toys and cuddles.",
    images: [
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80",
    ],
    shelter: {
      name: "Cat Haven",
      memberSince: "2017",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      address: "789 Cat Alley, Meow City",
      phone: "+1239874560",
      email: "contact@cathaven.org",
    },
  },
  {
    id: 4,
    name: "Milo",
    age: 2,
    gender: "Male",
    breed: "Tabby",
    rating: 4.5,
    desc: "Milo is a curious and gentle tabby cat who enjoys quiet environments and soft beds.",
    images: [
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&q=80",
    ],
    shelter: {
      name: "Cat Rescue",
      memberSince: "2019",
      avatar: "https://randomuser.me/api/portraits/men/66.jpg",
      address: "1010 Tabby Lane, Whiskertown",
      phone: "+1472583690",
      email: "info@catrescue.com",
    },
  },
  {
    id: 5,
    name: "Polly",
    age: 1,
    gender: "Female",
    breed: "African Grey",
    rating: 4.8,
    desc: "Polly is a smart and talkative African Grey parrot that loves socializing and playing games.",
    images: [
      "https://d2zp5xs5cp8zlg.cloudfront.net/image-51185-800.jpg",
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=80",
    ],
    shelter: {
      name: "Bird Sanctuary",
      memberSince: "2020",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      address: "200 Bird Ave, Feather City",
      phone: "+1122334455",
      email: "contact@birdsanctuary.com",
    },
  },
  {
    id: 6,
    name: "Rio",
    age: 3,
    gender: "Male",
    breed: "Macaw",
    rating: 4.9,
    desc: "Rio is a colorful Macaw who enjoys flying and interacting with visitors.",
    images: [
      "https://images.birdfact.com/production/scarlet-macaw.jpg?w=1200&h=630&q=82&auto=format&fit=crop&dm=1730753664&s=9724133338e407b24478297779a124ab",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    ],
    shelter: {
      name: "Tropical Aviary",
      memberSince: "2016",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      address: "333 Tropical Rd, Aviary Town",
      phone: "+1233211234",
      email: "info@tropicalaviary.com",
    },
  },
  {
    id: 7,
    name: "Bella",
    age: 6,
    gender: "Female",
    breed: "Beagle",
    rating: 4.6,
    desc: "Bella is a friendly Beagle who loves playing with kids and going on walks.",
    images: [
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=600&q=80",
    ],
    shelter: {
      name: "Animal Rescue",
      memberSince: "2014",
      avatar: "https://randomuser.me/api/portraits/women/43.jpg",
      address: "555 Rescue Rd, Animal Town",
      phone: "+1987654321",
      email: "rescue@animal.org",
    },
  },
  {
    id: 8,
    name: "Simba",
    age: 5,
    gender: "Male",
    breed: "Siamese",
    rating: 4.7,
    desc: "Simba is a playful Siamese cat who enjoys chasing toys and lounging in sunny spots.",
    images: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&q=80",
    ],
    shelter: {
      name: "Cat Comforts",
      memberSince: "2017",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      address: "777 Cozy St, Cat City",
      phone: "+1112223333",
      email: "comforts@cat.org",
    },
  },
  {
    id: 9,
    name: "Buddy",
    age: 4,
    gender: "Male",
    breed: "Beagle",
    rating: 4.6,
    desc: "Buddy is an energetic Beagle who loves running and socializing with other dogs.",
    images: [
      "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&q=80",
    ],
    shelter: {
      name: "Happy Tails Shelter",
      memberSince: "2019",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      address: "123 Happy Rd, Tailtown",
      phone: "+1098765432",
      email: "info@happytails.com",
    },
  },
];


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
