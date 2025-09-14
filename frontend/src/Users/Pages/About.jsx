import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'

function About() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",  p: 4, width: "100%" ,pt:10,}}>
      <Grid container spacing={6} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://images.pexels.com/photos/1174081/pexels-photo-1174081.jpeg?cs=srgb&dl=pexels-freestockpro-1174081.jpg&fm=jpg"
            alt="Pet Care"
            sx={{ width: "100%", borderRadius: 4, boxShadow: 6, transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ color: "#FE8756", fontWeight: 700, fontSize: "1.5rem", mb: 2 }}>About Us</Typography>
          <Typography sx={{  fontSize: "1rem", lineHeight: 1.8, mb: 3 }}>
            As pet ownership continues to grow, so does the necessity for a reliable and organized platform to manage pet care activities. Pet owners often face difficulties in keeping track of essential tasks such as feeding schedules, vaccinations, medical records, grooming routines, finding pet products, and vet visits. Information is usually scattered across multiple sources, leading to confusion and inconsistent care.
          </Typography>
          <Typography sx={{  fontSize: "1rem", lineHeight: 1.8, mb: 4 }}>
            A full-stack Web application is required to bring these users together through a single platform. Through this platform, pet owners can manage their pets' profiles and health updates, veterinarians can view and record treatment details, and animal shelters can showcase adoptable pets and monitor care activities. By offering centralized access to accurate and timely information, the application helps improve the quality of care, promotes responsible pet ownership, and supports efficient shelter management.
          </Typography>
         
        </Grid>
      </Grid>
    </Box>
  )
}

export default About
