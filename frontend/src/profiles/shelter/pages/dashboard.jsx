import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";
import {
  Pets,
  PendingActions,
  Event,
  Mail,
} from "@mui/icons-material";

function Dashboard() {
  const stats = {
    pendingAdoptions: 7,
    animalsInShelter: 42,
    messages: 18,
    upcomingEvents: [
      {
        id: 1,
        title: "Adoption Day",
        date: "2025-09-20",
        location: "Main Shelter Grounds",
      },
      {
        id: 2,
        title: "Vaccination Drive",
        date: "2025-10-10",
        location: "Community Park",
      },
    ],
  };

  const statCards = [
    {
      label: "Pending Adoption Requests",
      value: stats.pendingAdoptions,
      icon: <PendingActions fontSize="large" />,
      cols: 3,
    },
    {
      label: "Animals in Shelter",
      value: stats.animalsInShelter,
      icon: <Pets fontSize="large" />,
      cols: 3,
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: <Mail fontSize="large" />,
      cols: 6,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Shelter Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Overview of adoptions, animals and messages
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {statCards.map((card, i) => (
          <Grid item xs={12} sm={card.cols * 2} md={card.cols} key={i}>
            <Card
              sx={{
                backgroundColor: "#1c1c26",
                color: "#000",
                borderRadius: "16px",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px) scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(0,0,0,0.1)",
                      width: 56,
                      height: 56,
                    }}
                  >
                    {card.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6"color="#eee">{card.label}</Typography>
                    <Typography variant="h4"color="#eee" fontWeight="bold">
                      {card.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Recent Adoption Requests
        </Typography>
        {stats.upcomingEvents.length > 0 ? (
          <List>
            {stats.upcomingEvents.map((event, index) => (
              <React.Fragment key={event.id}>
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: "12px",
                    backgroundColor: "#1c1c26",
                    boxShadow: 2,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateX(8px)",
                      boxShadow: 5,
                    },
                  }}
                >
                  <CardContent>
                    <ListItem alignItems="flex-start">
                      <Avatar
                        sx={{
                          bgcolor: "rgba(0,0,0,0.1)",
                          mr: 2,
                          width: 48,
                          height: 48,
                        }}
                      >
                        <Event />
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold" color="#eee">
                            {event.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="#eee">
                              📅 {event.date}
                            </Typography>
                            <Typography variant="body2" color="#eee">
                              📍 {event.location}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </Card>
                {index < stats.upcomingEvents.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">
            No upcoming events created yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
