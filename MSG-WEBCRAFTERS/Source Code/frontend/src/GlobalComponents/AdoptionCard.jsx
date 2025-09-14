import React from "react"
import { Box, Typography, Button, Avatar } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { useNavigate } from "react-router-dom"

function AdoptionCard({ id, name, age, gender, breed, shelter, rating, image }) {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        borderRadius: 3,
        mx: 1,
        width: 380,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        p: 2,
      }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 2 }}
      />
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontWeight="bold">{name}</Typography>
          <Typography variant="body2">{breed}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="body2">Age: {age}</Typography>
          <Typography variant="body2">Gender: {gender}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Avatar src={image} sx={{ width: 24, height: 24, mr: 1 }} />
          <Typography variant="body2" sx={{ mr: 1 }}>
            {shelter}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: "#1c1c29", mr: 0.5 }}>
              {rating}
            </Typography>
            <StarIcon sx={{ color: "#FFD900", fontSize: "1rem" }} />
          </Box>
        </Box>
      </Box>
      <Button
        fullWidth
        variant="contained"
        onClick={() => navigate(`/adopt/${id}`)}
        sx={{
          mt: 2,
          bgcolor: "#ff7043",
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: "bold",
          color: "#1c1c29",
        }}
      >
        Get Started!
      </Button>
    </Box>
  )
}

export default AdoptionCard
