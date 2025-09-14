import React from 'react'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'

function Header() {
  return (
    <Box
      sx={{
        height: { xs: "100vh", md: "100vh" },
        width: "100%",
        backgroundImage: "url('Header.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        component={motion.img}
        src="HeaderRight.png"
        alt=""
        sx={{
          position: "absolute",
          right: 0,
          height: { xs: "25vh", md: "40vh" },
           display: {xs:"none",md:'flex'},
        }}

        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <Box
        component={motion.img}
        src="cat.png"
        alt=""
        sx={{
          position: "absolute",
          top: 0,
          height: { xs: "160vh", md: "180vh" },
        }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Box
        component={motion.img}
        src="RightText.png"
        alt=""
        sx={{
          position: "absolute",
          right: "3vw",
          bottom: "5vh",
          height: { xs: 0, md: "10vh" },
          display: { xs: "none", md: "flex" },
        }}
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <Box
        component={motion.img}
        src="leftText.png"
        alt=""
        sx={{
          position: "absolute",
          left: "5vw",
          bottom: "5vh",
          height: { xs: "5vh", md: "10vh" },
            display: { xs: "none", md: "flex" },
        }}
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "15vh",
          left: "5vw",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "flex-start",
          scale: 0.8,

        }}
      >
        <Box
          component="img"
          src="HeroText.png"
          alt=""
          sx={{ height: { xs: "25vh", md: "40vh" } }}
        />
        <Button
          variant="contained"
          sx={{
            background: "white",
            borderRadius: "1vh",
            textTransform: "none",
            width: { xs: "35vw", md: "16vw" },
            minWidth: { xs: "8rem", md: "9rem" },
            height: "6vh",
            color: "#1C1C26",
            fontWeight: "bold",
            fontSize: "2vh",
          }}
        >
          Get Started
        </Button>
      </Box>

      <Box
        sx={{
          position: "absolute",
          display: {xs:"flex",md:'none'},
          flexDirection: "column",
          scale: 1.4,
          bottom: { xs: 30, md: 60 },
          alignItems: "center",
          width: "100%",

        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "80px", md: "184px" },
            color: "#1C1C26",
          }}
        >
          Fur
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "40px", md: "94px" },
            position: "relative",
            top: { xs: "-35px", md: "-80px" },
            color: "#1C1C26",
          }}
        >
          Shield
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: "white",
            borderRadius: "1vh",
            textTransform: "none",
            width: { xs: "35vw", md: "16vw" },
            minWidth: { xs: "16rem", md: "18rem" },
            height: "6vh",
            color: "#1C1C26",
            fontWeight: "bold",
            fontSize: "2vh",
            position: "relative",
            top: { xs: "-40px", md: "-90px" },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  )
}

export default Header
