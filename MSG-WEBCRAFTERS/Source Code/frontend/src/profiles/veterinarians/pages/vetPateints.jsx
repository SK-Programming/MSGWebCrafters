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
  Modal,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    pastTreatments:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    diagnosis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  { patient: "Bella", owner: "Amy", species: "Cat", breed: "Persian", status: "new" },
  { patient: "Max", owner: "Chris", species: "Dog", breed: "Beagle", status: "active" },
  { patient: "Coco", owner: "Anna", species: "Bird", breed: "Parrot", status: "new" },
  { patient: "Duke", owner: "Lily", species: "Dog", breed: "Bulldog", status: "active" },
];

function VetPateints() {
  const [filterEl, setFilterEl] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);

  // state for editing field
  const [editingField, setEditingField] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");

  const handleFilterOpen = (event) => setFilterEl(event.currentTarget);
  const handleFilterClose = () => setFilterEl(null);

  const handleOpenModal = (appointment) => {
    setSelectedAppointment({ ...appointment });
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAppointment(null);
    setEditingField(null);
  };

  const displayedPatients = allAppointments.filter((a) => {
    return (
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.owner.toLowerCase().includes(search.toLowerCase())
    );
  });

  const startEditing = (field) => {
    setEditingField(field);
    setEditValue(selectedAppointment[field] || "");
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditValue("");
  };

  const updateField = () => {
    setSelectedAppointment((prev) => ({
      ...prev,
      [editingField]: editValue,
    }));
    setEditingField(null);
    setEditValue("");
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Patients
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search patients"
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
          <Typography variant="subtitle2">Species</Typography>
          <Typography variant="subtitle2">Breed</Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "right" }}>
            Action
          </Typography>
        </Box>
        {displayedPatients.map((row, index) => (
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
            <Typography>{row.species || "-"}</Typography>
            <Typography>{row.breed || "-"}</Typography>
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
            setSearch("");
            handleFilterClose();
          }}
        >
          Clear Search
        </MenuItem>
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

                  {["symptoms", "pastTreatments", "diagnosis"].map((field) => (
                    <Box key={field} sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ flex: 1 }}>
                          {field === "symptoms"
                            ? "Symptoms"
                            : field === "pastTreatments"
                              ? "Past Treatments"
                              : "Diagnosis"}
                        </Typography>
                        {editingField !== field && (
                          <IconButton size="small" onClick={() => startEditing(field)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                      {editingField === field ? (
                        <Box>
                          <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            sx={{ mb: 1 }}
                          />
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              variant="contained"
                              onClick={updateField}
                              sx={{
                                backgroundColor: "#FE8756",
                                "&:hover": { backgroundColor: "#e96d3b" }, // slightly darker on hover
                              }}
                            >
                              Update
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={cancelEditing}
                              sx={{
                                "&:hover": {
                                  backgroundColor: "red",
                                  color: "#fff",
                                  borderColor: "red",
                                },
                              }}
                            >
                              Cancel
                            </Button>
                          </Box>

                        </Box>
                      ) : (
                        <Typography sx={{ mb: 1 }}>
                          {selectedAppointment[field] || "-"}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default VetPateints;
