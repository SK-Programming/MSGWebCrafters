import React from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Stack,
  Modal,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const appointments = [
  {
    patient: "Jack",
    owner: "John",
    date: "2025-09-14",
    slot: "8:30 AM",
    species: "Dog",
    breed: "German Shepherd",
    gender: "Male",
    ownerEmail: "john@gmail.com",
    symptoms: "Lorem ipsum dolor sit amet…",
    pastTreatments: "Lorem ipsum dolor sit amet…",
    diagnosis: "Lorem ipsum dolor sit amet…",
  },
  {
    patient: "Bella",
    owner: "Amy",
    date: "2025-09-14",
    slot: "10:00 AM",
  },
  {
    patient: "Max",
    owner: "Chris",
    date: "2025-09-14",
    slot: "11:30 AM",
  },
];

const recentPatients = Array(5).fill({
  patient: "Jack",
  owner: "Jhon",
  date: "Sep 25",
  slot: "8:30 AM",
});

const recentReviews = [
  {
    owner: "Owner",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  {
    owner: "Owner",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
];

function VetDashboard() {
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAppointment(null);
  };

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((a) => a.date === today);
  const todayDateString = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", md: "row" }, // stack on small screens
      }}
    >
      {/* Left Column */}
      <Box sx={{ flex: { xs: "1 1 100%", md: 2 }, width: "100%" }}>
        <Typography variant="h5" fontWeight="bold">
          Hello, VetName
        </Typography>
        <Typography variant="subtitle1">Today’s Appointments</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {todayDateString}
        </Typography>

        <Card
          sx={{
            bgcolor: "#d9e2c4",
            borderRadius: 2,
            p: 2,
            height: { xs: "auto", md: "60vh" }, // auto height on mobile
            overflowY: "auto",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
              px: 2,
              mb: 1,
              "@media (max-width: 992px)": {
                gridTemplateColumns: "1fr 1fr", // simpler layout on mobile
              },
            }}
          >
            <Typography variant="subtitle2">Patient</Typography>
            <Typography variant="subtitle2">Owner</Typography>
            <Typography
              variant="subtitle2"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              Date
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              Slot
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}
            >
              Action
            </Typography>
          </Box>
          {todayAppointments.map((row, index) => (
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
                alignItems: "center",
                bgcolor: "#1c1c26",
                color: "#fff",
                borderRadius: 1,
                px: 2,
                py: 1,
                mb: 1,
                "@media (max-width: 992px)": {
                  gridTemplateColumns: "1fr 1fr", // stack data in 2 cols on mobile
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ width: 24, height: 24 }} />
                {row.patient}
              </Box>
              <Typography>{row.owner}</Typography>
              <Typography sx={{ display: { xs: "none", md: "block" } }}>
                {row.date}
              </Typography>
              <Typography sx={{ display: { xs: "none", md: "block" } }}>
                {row.slot}
              </Typography>
              <Box sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}>
                <IconButton
                  onClick={() => handleViewAppointment(row)}
                  sx={{ color: "#fff" }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Card>
      </Box>

      {/* Right Column */}
      <Box sx={{ flex: { xs: "1 1 100%", md: 1 }, width: "100%" }}>
        <Box sx={{ mb: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6">Recent Patient</Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "#f45b1d", textTransform: "none" }}
              onClick={() => navigate("/vet/patients")}
            >
              View All
            </Button>
          </Stack>
          <Card>
            <List disablePadding>
              {recentPatients.map((row, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <Typography variant="body2" color="text.secondary">
                        {row.slot}
                      </Typography>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={row.patient}
                      secondary={`${row.owner}, ${row.date}`}
                    />
                  </ListItem>
                  {index < recentPatients.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Box>

        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6">Recent Reviews</Typography>
            <Button
              onClick={() => navigate("/vet/reviews")}
              variant="contained"
              size="small"
              sx={{ bgcolor: "#f45b1d", textTransform: "none" }}
            >
              View All
            </Button>
          </Stack>
          {recentReviews.map((review, index) => (
            <Card key={index} sx={{ mb: 2, bgcolor: "#1c1c26", color: "#fff" }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {review.owner}
                </Typography>
                <Typography variant="body2">{review.text}</Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          onClick={handleCloseModal}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.4)",
            p: 2,
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: { xs: "100%", sm: 650 },
              bgcolor: "#fff",
              borderRadius: 3,
              boxShadow: 24,
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            {selectedAppointment && (
              <>
                <Box
                  sx={{
                    position: "sticky",
                    top: 0,
                    bgcolor: "#fff",
                    zIndex: 2,
                    px: 3,
                    pt: 2,
                    pb: 1,
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <IconButton
                    onClick={handleCloseModal}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" fontWeight="bold">
                    Patient
                  </Typography>
                </Box>

                <Box sx={{ px: 3, py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
                    <Avatar sx={{ width: 70, height: 70 }} />
                    <Box>
                      <Typography variant="h6">{selectedAppointment.patient}</Typography>
                      <Typography variant="body2">{selectedAppointment.species}</Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                      mb: 2,
                      "@media (max-width: 600px)": {
                        gridTemplateColumns: "1fr",
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">Species</Typography>
                      <Typography>{selectedAppointment.species || "-"}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Breed</Typography>
                      <Typography>{selectedAppointment.breed || "-"}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Gender</Typography>
                      <Typography>{selectedAppointment.gender || "-"}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Owner</Typography>
                      <Typography>{selectedAppointment.owner}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Owner Email</Typography>
                      <Typography>{selectedAppointment.ownerEmail || "-"}</Typography>
                    </Box>
                  </Box>

                  <Typography variant="subtitle1" fontWeight="bold">
                    Symptoms
                  </Typography>
                  <Typography sx={{ mb: 2 }}>{selectedAppointment.symptoms || "-"}</Typography>

                  <Typography variant="subtitle1" fontWeight="bold">
                    Past Treatments
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    {selectedAppointment.pastTreatments || "-"}
                  </Typography>

                  <Typography variant="subtitle1" fontWeight="bold">
                    Diagnosis
                  </Typography>
                  <Typography>{selectedAppointment.diagnosis || "-"}</Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default VetDashboard;
