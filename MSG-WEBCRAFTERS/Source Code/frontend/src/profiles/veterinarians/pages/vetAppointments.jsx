import React from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Stack,
  Button,
  Modal,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

const allAppointments = [
  {
    patient: "Jack",
    owner: "John Doe",
    date: "2024-09-25",
    slot: "8:30 AM",
    status: "active",
    species: "Dog",
    breed: "German Shepherd",
    gender: "Male",
    ownerEmail: "johndoe@gmail.com",
    symptoms:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    pastTreatments:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    diagnosis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  { patient: "Bella", owner: "Amy", date: "2024-09-26", slot: "10:00 AM", status: "new" },
  { patient: "Max", owner: "Chris", date: "2024-09-25", slot: "11:30 AM", status: "active" },
  { patient: "Coco", owner: "Anna", date: "2024-09-27", slot: "1:00 PM", status: "new" },
  { patient: "Duke", owner: "Lily", date: "2024-09-28", slot: "3:00 PM", status: "active" },
];

function VetAppointments() {
  const [filterEl, setFilterEl] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");
  const [view, setView] = React.useState("all");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);

  const handleFilterOpen = (event) => {
    setFilterEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setFilterEl(null);
  };

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAppointment(null);
  };

  const uniqueDates = [...new Set(allAppointments.map((a) => a.date))];

  const displayedAppointments = allAppointments.filter((a) => {
    const matchSearch =
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.owner.toLowerCase().includes(search.toLowerCase());
    const matchDate = dateFilter ? a.date === dateFilter : true;
    let matchStatus = true;
    if (view === "active") matchStatus = a.status === "active";
    if (view === "new") matchStatus = a.status === "new";
    return matchSearch && matchDate && matchStatus;
  });

  return (
    <Box >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Appointments
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search appointments"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={handleFilterOpen}>
            <FilterListIcon />
          </IconButton>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant={view === "all" ? "contained" : "outlined"}
          onClick={() => setView("all")}
          sx={{ textTransform: "none", bgcolor: view === "all" ? "#f45b1d" : "" }}
        >
          All Appointments
        </Button>
        <Button
          variant={view === "active" ? "contained" : "outlined"}
          onClick={() => setView("active")}
          sx={{ textTransform: "none", bgcolor: view === "active" ? "#f45b1d" : "" }}
        >
          Active Appointments
        </Button>
        <Button
          variant={view === "new" ? "contained" : "outlined"}
          onClick={() => setView("new")}
          sx={{ textTransform: "none", bgcolor: view === "new" ? "#f45b1d" : "" }}
        >
          New Requests
        </Button>
      </Stack>

      <Card sx={{ p: 2, bgcolor: "#d9e2c4" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
            px: 2,
            mb: 1,
          }}
        >
          <Typography variant="subtitle2">Patient</Typography>
          <Typography variant="subtitle2">Owner</Typography>
          <Typography variant="subtitle2">Date</Typography>
          <Typography variant="subtitle2">Slot</Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "right" }}>
            Action
          </Typography>
        </Box>
        {displayedAppointments.map((row, index) => (
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
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar sx={{ width: 24, height: 24 }} />
              {row.patient}
            </Box>
            <Typography>{row.owner}</Typography>
            <Typography>{row.date}</Typography>
            <Typography>{row.slot}</Typography>
            <Box sx={{ textAlign: "right" }}>
              <IconButton onClick={() => handleOpenModal(row)} sx={{ color: "#fff" }}>
                <VisibilityIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Card>

      <Menu anchorEl={filterEl} open={Boolean(filterEl)} onClose={handleFilterClose}>
        <MenuItem
          onClick={() => {
            setDateFilter("");
            handleFilterClose();
          }}
        >
          All Dates
        </MenuItem>
        {uniqueDates.map((date) => (
          <MenuItem
            key={date}
            onClick={() => {
              setDateFilter(date);
              handleFilterClose();
            }}
          >
            {date}
          </MenuItem>
        ))}
      </Menu>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              width: 650,
              bgcolor: "rgba(255,255,255,0.95)",
              borderRadius: 3,
              p: 0,
              boxShadow: 24,
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedAppointment && (
              <>
                <Box
                  sx={{
                    position: "sticky",
                    top: 0,
                    bgcolor: "rgba(255,255,255,0.95)",
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
                    <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
                      <Button variant="contained" color="warning">
                        Message
                      </Button>
                      {view !== "all" &&
                        (selectedAppointment.status === "active" ||
                          selectedAppointment.status === "new") && (
                          <Button variant="contained" color="error">
                            Cancel
                          </Button>
                        )}
                    </Box>
                  </Box>

                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
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

export default VetAppointments;
