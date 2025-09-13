import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import PetsIcon from "@mui/icons-material/Pets";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

const adoptionData = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 250 },
  { name: "Mar", value: 220 },
  { name: "Apr", value: 120 },
  { name: "May", value: 300 },
  { name: "Jun", value: 260 },
  { name: "Jul", value: 310 },
  { name: "Aug", value: 270 },
  { name: "Sep", value: 300 },
];

const Dashboard = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, background: "#FFF", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, color: "#1C1C26", textAlign: { xs: "center", md: "left" } }}
      >
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box sx={{ flex: { xs: "1 1 100%", md: "0 0 30%" }, minWidth: 280 }}>
          <Card sx={{ p: 2, borderRadius: 5, bgcolor: "#D3DCC0" }}>
            <Card sx={{ p: 2, borderRadius: 5, bgcolor: "#1C1C26", color: "#fff" }}>
              <Typography variant="subtitle1" mb={1}>
                Adoption Graph
              </Typography>
              <Typography variant="h4" color="#FFF" mb={1} display="flex" alignItems="center">
                <PetsIcon sx={{ mr: 1 }} /> 24
              </Typography>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={adoptionData}>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#fe8756" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Pets
              </Typography>
              <Card sx={{ maxHeight: 400, overflowY: "auto", borderRadius: 5, bgcolor: "#1C1C26", color: "#fff" }}>
                <List>
                  {[...Array(7)].map((_, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar src="https://via.placeholder.com/40" />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Jack"
                        secondary="Sep 25 - 3:00pm"
                        primaryTypographyProps={{ color: "#fff" }}
                        secondaryTypographyProps={{ color: "#aaa" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Box>
          </Card>
        </Box>

        <Box sx={{ flex: "1 1 0", display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Card sx={{ flex: "1 1 200px", bgcolor: "#1a1a1a", color: "#fff", borderRadius: 3 }}>
              <CardContent>
                <Typography>Number of Pets Owners</Typography>
                <Typography variant="h5">2800</Typography>
                <PeopleIcon />
              </CardContent>
            </Card>
            <Card sx={{ flex: "1 1 200px", bgcolor: "#1a1a1a", color: "#fff", borderRadius: 3 }}>
              <CardContent>
                <Typography>Number of Veterinarians</Typography>
                <Typography variant="h5">800</Typography>
                <MedicalServicesIcon />
              </CardContent>
            </Card>
            <Card sx={{ flex: "1 1 200px", bgcolor: "#1a1a1a", color: "#fff", borderRadius: 3 }}>
              <CardContent>
                <Typography>Number of Animal Shelters</Typography>
                <Typography variant="h5">400</Typography>
                <HomeWorkIcon />
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold">
              Products Sold This Month
            </Typography>
            <Card sx={{ borderRadius: 3, p: 2, bgcolor: "#e8f4e7", width: "100%" }}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={adoptionData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#fe8756" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold">
              Top Sold This Month
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
              {[...Array(4)].map((_, i) => (
                <Card key={i} sx={{ flex: "1 1 calc(50% - 8px)", borderRadius: 3 }}>
                  <img
                    src="https://via.placeholder.com/150"
                    alt="product"
                    style={{ width: "100%", borderRadius: "12px 12px 0 0" }}
                  />
                  <CardContent>
                    <Typography>Dry Food (Kribble)</Typography>
                    <Typography color="primary" fontWeight="bold">
                      $40.0
                    </Typography>
                    <Button variant="contained" size="small" fullWidth>
                      Buy Product
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
