import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContextData } from "../../../context/context";

export default function Dashboard() {
  const navigate = useNavigate();
  const data=useContextData()
  console.log("asdsadsadsadsad",data)

  // Map stats with their routes
  const stats = [
    { label: "My Pets", value: 3, route: "/owner/petprofile" }, // ✅ absolute path
    { label: "Upcoming Appointments", value: 2, route: "/owner/appointment" },
    { label: "New Messages", value: 4, route: "/owner/messages" },
    { label: "Health Records", value: 12, route: "/owner/records" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome Back 👋
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Here’s an overview of your pets and appointments.
      </Typography>

      {/* Stats Row */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
                boxShadow: 2,
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { boxShadow: 5, transform: "scale(1.03)" },
              }}
              onClick={() => navigate(stat.route)}
            >
              <Typography variant="h5" fontWeight="bold">
                {stat.value}
              </Typography>
              <Typography color="text.secondary">{stat.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Upcoming Appointments */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Vet Appointments
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem>
                <ListItemText
                  primary="Bella 🐶 - Vaccination"
                  secondary="Dr. Smith • Today, 10:30 AM"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Max 🐕 - General Checkup"
                  secondary="Dr. Lee • Tomorrow, 2:00 PM"
                />
              </ListItem>
            </List>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/owner/appointment")}
            >
              View All Appointments
            </Button>
          </Paper>
        </Grid>

        {/* Recent Messages */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Messages from Vets
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem>
                <ListItemText
                  primary="Dr. Smith"
                  secondary="Reminder: Bella's vaccination is today at 10:30 AM."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Dr. Lee"
                  secondary="Max's lab report looks good 👍"
                />
              </ListItem>
            </List>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/owner/messages")}
            >
              View Inbox
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
