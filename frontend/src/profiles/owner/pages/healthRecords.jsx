import React, { useState, useEffect } from "react";
import axios from "axios";
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
import BASE_URL from "../../../config/apiConfig"; // your API base URL

export default function HealthRecords() {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Fetch health records from API
  const fetchRecords = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/HealthRecords`);
      setRecords(data);
    } catch (err) {
      console.error("Failed to fetch health records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

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
          {records.length > 0 ? (
            records.map((rec) => (
              <Grid item xs={12} sm={6} md={4} key={rec.recordId}>
                <Paper
                  onClick={() => setSelectedRecord(rec)}
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
                    src={
                      rec.document
                        ? `${BASE_URL.replace("/api", "")}${rec.document}`
                        : undefined
                    }
                    alt="Doc"
                    sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
                  />
                  <Typography variant="h6">{rec.pet?.name || "Unknown Pet"}</Typography>
                  <Typography color="text.secondary">{rec.visitDate}</Typography>
                  <Typography color="text.secondary">{rec.diagnosis}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontStyle: "italic", color: "gray" }}
                  >
                    {rec.treatment || rec.notes || "No additional info"}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography sx={{ p: 2, textAlign: "center" }}>
              No health records available.
            </Typography>
          )}
        </Grid>
      </Paper>

      {/* Modal for Record Details */}
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
                src={
                  selectedRecord.document
                    ? `${BASE_URL.replace("/api", "")}${selectedRecord.document}`
                    : undefined
                }
                alt="Doc"
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold">
                {selectedRecord.pet?.name || "Unknown Pet"}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                <strong>Date:</strong> {selectedRecord.visitDate}
              </Typography>
              <Typography color="text.secondary">
                <strong>Type/Diagnosis:</strong> {selectedRecord.diagnosis}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                <strong>Treatment/Notes:</strong>{" "}
                {selectedRecord.treatment || selectedRecord.notes || "No details"}
              </Typography>

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
