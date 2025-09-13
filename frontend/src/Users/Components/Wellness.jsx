import React from 'react'
import Box from '@mui/material/Box'
import { motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

function Wellness() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: "url('Header.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          pt: { xs: 6, md: 10 },
          px: { xs: 3, md: 8 }
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pt: { xs: 4, md: 8 }
          }}
        >
          <Typography variant="h4" fontWeight={"bold"} sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>Wellness </Typography>
          <Typography variant="h4" fontWeight={"bold"} sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>Consultations </Typography>
          <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, mt: 1 }}>Ensure Your Pet Health With Expert Veterinarians </Typography>
          <Typography variant="h5" fontWeight={"bold"} my={2} sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}>Key Features </Typography>

          <Box display="flex" mb={2}>
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: "#FE8756",
                mr: 1,
                mt: 0.5
              }}
            ></Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontWeight={"bold"} sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}>Comprehensive health checkups</Typography>
              <Typography sx={{ fontSize: { xs: "0.85rem", md: "0.95rem" } }}>Regular Screenings For Sign Of Illness or Discomfort</Typography>
            </Box>
          </Box>

          <Box display="flex" mb={2}>
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: "#FE8756",
                mr: 1,
                mt: 0.5
              }}
            ></Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontWeight={"bold"} sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}>Personalized nutrition plans</Typography>
              <Typography sx={{ fontSize: { xs: "0.85rem", md: "0.95rem" } }}>Tailored diet guidance to maintain optimal health</Typography>
            </Box>
          </Box>

          <Box display="flex">
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: "#FE8756",
                mr: 1,
                mt: 0.5
              }}
            ></Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontWeight={"bold"} sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}>Behavioral assessments</Typography>
              <Typography sx={{ fontSize: { xs: "0.85rem", md: "0.95rem" } }}>Early detection of stress, anxiety, or unusual habits</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              background: "coral",
              borderRadius: "10px",
              textTransform: "none",
              width: { xs: "100%", sm: "10rem" },
              color: "#000"
            }}
          >
            Get Started
          </Button>
        </Box>

        {!isMobile && (
          <Box
            sx={{
              width: "50%",
              display: 'flex',
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <motion.img
              src="wellness.png"
              alt=""
              style={{ maxWidth: "100%", height: "auto" }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </Box>
        )}
      </Box>
    </div>
  )
}

export default Wellness
