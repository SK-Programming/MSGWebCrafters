import React, { useState } from "react";
import {
  Box,
  Button,
  ListItem,
  Drawer,
  IconButton,
  useMediaQuery,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Navbar() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);

  const handleProfileOpen = (event) => setAnchorElProfile(event.currentTarget);
  const handleNotifOpen = (event) => setAnchorElNotif(event.currentTarget);
  const handleClose = () => {
    setAnchorElProfile(null);
    setAnchorElNotif(null);
  };

  let wdth = "45px";
  let posLine = "-3px";

  if (location.pathname === "/") {
    wdth = "45px";
    posLine = "-3px";
  } else if (location.pathname === "/adoption") {
    wdth = "70px";
    posLine = "60px";
  } else if (location.pathname.startsWith("/adopt")) {
    wdth = "70px";
    posLine = "60px";
  } else if (location.pathname === "/products") {
    wdth = "63px";
    posLine = "150px";
  } else if (location.pathname.startsWith("/products")) {
    wdth = "63px";
    posLine = "150px";
  } else if (location.pathname === "/cart" ||location.pathname.startsWith('/purchase-success')) {
    wdth = "40px";
    posLine = "230px";
  } 
  else if (location.pathname === "/veterinarians"|| location.pathname.startsWith('/vet')) {
    wdth = "95px";
    posLine = "285px";
  }
   else if (location.pathname === "/care-options") {
    wdth = "95px";
    posLine = "398px";
  } else if (location.pathname === "/about") {
    wdth = "50px";
    posLine = "505px";
  } else if (location.pathname === "/contact") {
    wdth = "60px";
    posLine = "575px";
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        position: "absolute",
        zIndex: 1,
      }}
    >
      {!isMobile && (
        <>
          <Box sx={{ display: "flex" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <img src="Logo.svg" alt="logo" height={30} />
            </Box>

            <Box
              sx={{
                position: "relative",
                display: "flex",
                gap: 3,
                justifyContent: "space-evenly",
              }}
            >
              <ListItem
                component={Link}
                to="/"
                disablePadding
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  top: location.pathname === "/" ? "-3px" : "0px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                Home
              </ListItem>

              <ListItem
                component={Link}
                to="/adoption"
                disablePadding
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  top: location.pathname === "/adoption" || location.pathname.startsWith("/adopt") ? "-3px" : "0px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                Adoption
              </ListItem>

              <ListItem
                component={Link}
                to="/products"
                disablePadding
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  top: location.pathname === "/products" || location.pathname.startsWith("/products") ? "-3px" : "0px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                Products
              </ListItem>

              <ListItem
                component={Link}
                to="/cart"
                disablePadding
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  top: location.pathname === "/cart" ? "-3px" : "0px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                Cart
              </ListItem>

              <ListItem
                component={Link}
                to="/veterinarians"
                disablePadding
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  top: location.pathname === "/veterinarians" ? "-3px" : "0px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                Veterinarians
              </ListItem>

              <ListItem
                component={Link}
                to="/care-options"
                disablePadding
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  top: location.pathname === "/care-options" ? "-3px" : "0px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                Care Options
              </ListItem>

              <ListItem
                component={Link}
                to="/about"
                disablePadding
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  top: location.pathname === "/about" ? "-3px" : "0px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                About
              </ListItem>

              <ListItem
                component={Link}
                to="/contact"
                disablePadding
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  top: location.pathname === "/contact" ? "-3px" : "0px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                Contact
              </ListItem>

              <Box
                sx={{
                  position: "absolute",
                  bottom: "1px",
                  left: posLine,
                  width: wdth,
                  height: "4px",
                  background: "coral",
                  borderRadius: "25px",
                  transition: "all 0.3s ease",
                }}
              />
            </Box>
          </Box>

          {!isLoggedIn ? (
            <Button
              variant="contained"
              sx={{
                background: "coral",
                borderRadius: "10px",
                textTransform: "none",
              }}
            >
              Get Started
            </Button>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton onClick={handleNotifOpen}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={anchorElNotif}
                open={Boolean(anchorElNotif)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    backdropFilter: "blur(12px)",
                    backgroundColor: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>New message</MenuItem>
                <MenuItem onClick={handleClose}>Adoption request</MenuItem>
                <MenuItem onClick={handleClose}>Service reminder</MenuItem>
              </Menu>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ cursor: "pointer" }}
                onClick={handleProfileOpen}
              >
                <Avatar src="https://i.pravatar.cc/40" />
                <Typography fontSize="14px">Shaad</Typography>
              </Box>
              <Menu
                anchorEl={anchorElProfile}
                open={Boolean(anchorElProfile)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    backdropFilter: "blur(12px)",
                    backgroundColor: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem component={Link} to="/dashboard">
                  Dashboard
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => alert("Logged out")}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </>
      )}

      {isMobile && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Button
            variant="contained"
            sx={{
              background: "coral",
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            Get Started
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Navbar;
