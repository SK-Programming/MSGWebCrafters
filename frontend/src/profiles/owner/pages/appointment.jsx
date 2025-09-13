import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";

export default function Appointment() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  // Dummy appointment data
  const appointments = [
    {
      pet: "Bella 🐶",
      type: "Vaccination",
      vet: "Dr. Smith",
      date: "2025-09-15",
      time: "10:30 AM",
      status: "Confirmed",
    },
    {
      pet: "Max 🐕",
      type: "General Checkup",
      vet: "Dr. Lee",
      date: "2025-09-16",
      time: "02:00 PM",
      status: "Pending",
    },
    {
      pet: "Charlie 🐾",
      type: "Grooming",
      vet: "Dr. John",
      date: "2025-09-18",
      time: "11:00 AM",
      status: "Completed",
    },
  ];

  // Filtered appointments by search
  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.pet.toLowerCase().includes(search.toLowerCase()) ||
      appt.type.toLowerCase().includes(search.toLowerCase()) ||
      appt.vet.toLowerCase().includes(search.toLowerCase()) ||
      appt.status.toLowerCase().includes(search.toLowerCase())
  );

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "success";
      case "Pending":
        return "warning";
      case "Completed":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Dashboard
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Manage your appointments with veterinarians.
      </Typography>

      {/* Tabs */}
      <Paper sx={{ mt: 2, borderRadius: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Appointment History 📅" />
          <Tab label="New Appointments ✨" />
        </Tabs>
      </Paper>

      {/* Appointment History */}
      {tab === 0 && (
        <Paper sx={{ p: 2, borderRadius: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Appointment History
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Search bar */}
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search by pet, type, vet, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 2 }}
          />

          <List>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt, index) => (
                <ListItem
                  key={index}
                  sx={{
                    borderBottom: "1px solid #eee",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <ListItemText
                    primary={`${appt.pet} - ${appt.type}`}
                    secondary={`${appt.vet} • ${appt.date} at ${appt.time}`}
                  />
                  <Chip
                    label={appt.status}
                    color={getStatusColor(appt.status)}
                    variant="outlined"
                  />
                </ListItem>
              ))
            ) : (
              <Typography color="text.secondary" sx={{ p: 2 }}>
                No appointments found.
              </Typography>
            )}
          </List>
        </Paper>
      )}

      {/* New Appointments */}
      {tab === 1 && (
        <Paper sx={{ p: 2, borderRadius: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            New Appointments
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography color="text.secondary">
            This section will show new appointment requests from vets. (You can
            later connect it to backend data.)
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
