import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Modal,
  Button,
} from "@mui/material";

export default function HealthRecords() {
  // ✅ Dummy health records (read-only, provided by vet)
  const [records] = useState([
    {
      id: 1,
      petName: "Bella",
      date: "2025-01-10",
      type: "Vaccination",
      notes: "Rabies shot completed",
      document: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      petName: "Milo",
      date: "2025-02-05",
      type: "Check-up",
      notes: "Asthma check, prescribed inhaler",
      document: "https://via.placeholder.com/150/92c952",
    },
  ]);

  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Health Records 🏥
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        These records are maintained by your veterinarian.
      </Typography>

      {/* Records List */}
      <Paper sx={{ p: 2, borderRadius: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Records
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {records.map((rec) => (
            <Grid item xs={12} sm={6} md={4} key={rec.id}>
              <Paper
                onClick={() => setSelectedRecord(rec)} // ✅ open modal when clicked
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                }}
              >
                <Avatar
                  src={rec.document}
                  alt="Doc"
                  sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
                />
                <Typography variant="h6">{rec.petName}</Typography>
                <Typography color="text.secondary">{rec.date}</Typography>
                <Typography color="text.secondary">{rec.type}</Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, fontStyle: "italic", color: "gray" }}
                >
                  {rec.notes}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* ✅ Modal for Record Details */}
      <Modal open={!!selectedRecord} onClose={() => setSelectedRecord(null)}>
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 3,
            width: "90%",
            maxWidth: 500,
            mx: "auto",
            mt: "10%",
            boxShadow: 5,
            textAlign: "center",
          }}
        >
          {selectedRecord && (
            <>
              <Avatar
                src={selectedRecord.document}
                alt="Doc"
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold">
                {selectedRecord.petName}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                <strong>Date:</strong> {selectedRecord.date}
              </Typography>
              <Typography color="text.secondary">
                <strong>Type:</strong> {selectedRecord.type}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">{selectedRecord.notes}</Typography>

              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
