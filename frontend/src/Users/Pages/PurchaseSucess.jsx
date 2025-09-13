import React from "react"
import { Box, Typography, Button } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

function PurchaseSuccess() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        p: 4,
        pt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <CheckCircleIcon sx={{ fontSize: 100, color: "green" }} />
      </motion.div>
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
        Purchase Successful!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Thank you for your order.
      </Typography>

      <Button
        variant="contained"
        sx={{
          mt: 4,
          px: 4,
          py: 1.5,
          borderRadius: "10px",
          fontWeight: "bold",
          textTransform: "none",
          bgcolor: "#ff7043",
          "&:hover": { bgcolor: "#e85d2f" },
        }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Box>
  )
}

export default PurchaseSuccess
