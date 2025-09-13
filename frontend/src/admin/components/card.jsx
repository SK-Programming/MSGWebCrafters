import React from "react";
import { Card, Avatar, Typography, Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function ProfileCard({ name, role, image, rating, onViewProfile }) {
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

      {/* ⭐ Single Star Rating */}
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


