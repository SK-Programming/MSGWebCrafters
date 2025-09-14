import React from "react"
import { Box, Typography, Button } from "@mui/material"
import Slider from "react-slick"
import AdoptionCard from "../../GlobalComponents/AdoptionCard"


function Adoption() {
  const pets = [
    { name: "Jack", age: 14, gender: "Male", breed: "German Shepard", shelter: "Animal Shelter", rating: 4.9, image: "dog.webp" },
    { name: "Luna", age: 10, gender: "Female", breed: "Golden Retriever", shelter: "Happy Paws", rating: 4.8, image: "dog.webp" },
    { name: "Max", age: 12, gender: "Male", breed: "Labrador", shelter: "Safe Haven", rating: 4.7, image: "dog.webp" },
    { name: "Bella", age: 8, gender: "Female", breed: "Beagle", shelter: "Animal Rescue", rating: 4.6, image: "dog.webp" },
    { name: "Charlie", age: 11, gender: "Male", breed: "Bulldog", shelter: "Pet Haven", rating: 4.5, image: "dog.webp" },
    { name: "Daisy", age: 9, gender: "Female", breed: "Poodle", shelter: "Happy Tails", rating: 4.8, image: "dog.webp" },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Box sx={{ display: "flex", mx: 5, justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          whiteSpace="pre-line"
          sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
        >
          Looking For A Pet {"\n"} To Adopt
        </Typography>
        <Button variant="contained" sx={{ bgcolor: "#ff7043", borderRadius: "12px" }}>
          Check Out More
        </Button>
      </Box>

      <Slider {...settings}>
        {pets.map((pet, index) => (
          <AdoptionCard key={index} {...pet} />
        ))}
      </Slider>
    </Box>
  )
}

export default Adoption
