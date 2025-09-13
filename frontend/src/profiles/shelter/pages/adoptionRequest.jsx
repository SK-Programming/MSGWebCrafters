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
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const allRequests = [
  {
    petName: "Buddy",
    adopterName: "John Doe",
    date: "2025-09-15",
    status: "new",
    species: "Dog",
    breed: "Labrador",
    gender: "Male",
    adopterEmail: "john@example.com",
    adopterPhone: "555-1234",
    address: "123 Main Street",
    message:
      "We have a big yard and lots of time to spend with Buddy. We’d love to adopt him!",
  },
  {
    petName: "Misty",
    adopterName: "Amy Smith",
    date: "2025-09-14",
    status: "active",
    species: "Cat",
    breed: "Persian",
    gender: "Female",
    adopterEmail: "amy@example.com",
    adopterPhone: "555-9876",
    address: "45 Oak Road",
    message: "Looking for a companion for our older cat.",
  },
];

const adopted = [
  {
    petName: "Charlie",
    adopterName: "Robert Brown",
    date: "2025-08-30",
    species: "Dog",
    breed: "Beagle",
  },
  {
    petName: "Luna",
    adopterName: "Sophie Green",
    date: "2025-09-01",
    species: "Cat",
    breed: "Siamese",
  },
];

function AdoptionRequest() {
  const [search, setSearch] = React.useState("");
  const [tab, setTab] = React.useState("requests");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState(null);

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpenModal = (req) => {
    setSelectedRequest(req);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRequest(null);
  };

  const handleAccept = (req) => {
    setSnackbar({
      open: true,
      message: `Accepted request for ${req.petName}`,
      severity: "success",
    });
    handleCloseModal();
  };
  const handleDelete = (req) => {
    setSnackbar({
      open: true,
      message: `Deleted request for ${req.petName}`,
      severity: "error",
    });
    handleCloseModal();
  };

  const displayedRequests = allRequests.filter(
    (r) =>
      r.petName.toLowerCase().includes(search.toLowerCase()) ||
      r.adopterName.toLowerCase().includes(search.toLowerCase())
  );

  const displayedAdopted = adopted.filter(
    (r) =>
      r.petName.toLowerCase().includes(search.toLowerCase()) ||
      r.adopterName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant={tab === "requests" ? "contained" : "outlined"}
          onClick={() => setTab("requests")}
          sx={{ textTransform: "none", bgcolor: tab === "requests" ? "#f45b1d" : "" }}
        >
          Adoption Requests
        </Button>
        <Button
          variant={tab === "adopted" ? "contained" : "outlined"}
          onClick={() => setTab("adopted")}
          sx={{ textTransform: "none", bgcolor: tab === "adopted" ? "#f45b1d" : "" }}
        >
          Adopted
        </Button>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          {tab === "requests" ? "Adoption Requests" : "Adopted Pets"}
        </Typography>
        <TextField
          size="small"
          placeholder="Search by pet or adopter name"
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
      </Stack>

      {tab === "requests" && (
        <Card sx={{ p: 2, bgcolor: "#d9e2c4" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr auto",
              px: 2,
              mb: 1,
            }}
          >
            <Typography variant="subtitle2">Pet</Typography>
            <Typography variant="subtitle2">Adopter</Typography>
            <Typography variant="subtitle2">Date</Typography>
            <Typography variant="subtitle2" sx={{ textAlign: "right" }}>
              Action
            </Typography>
          </Box>
          {displayedRequests.map((row, index) => (
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr auto",
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
                {row.petName}
              </Box>
              <Typography>{row.adopterName}</Typography>
              <Typography>{row.date}</Typography>
              <Box sx={{ textAlign: "right" }}>
                <IconButton onClick={() => handleOpenModal(row)} sx={{ color: "#fff" }}>
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Card>
      )}

      {tab === "adopted" && (
        <Card sx={{ p: 2, bgcolor: "#d9e2c4" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              px: 2,
              mb: 1,
            }}
          >
            <Typography variant="subtitle2">Pet</Typography>
            <Typography variant="subtitle2">Adopter</Typography>
            <Typography variant="subtitle2">Date</Typography>
          </Box>
          {displayedAdopted.map((row, index) => (
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
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
                {row.petName}
              </Box>
              <Typography>{row.adopterName}</Typography>
              <Typography>{row.date}</Typography>
            </Box>
          ))}
        </Card>
      )}

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
            {selectedRequest && (
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
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                    {selectedRequest.petName} Adoption Request
                  </Typography>
                  <IconButton onClick={() => handleAccept(selectedRequest)} color="success">
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(selectedRequest)} color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={handleCloseModal}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Box sx={{ px: 3, py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
                    <Avatar sx={{ width: 70, height: 70 }} />
                    <Box>
                      <Typography variant="h6">{selectedRequest.petName}</Typography>
                      <Typography variant="body2">{selectedRequest.species}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle2">Species</Typography>
                      <Typography>{selectedRequest.species}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Breed</Typography>
                      <Typography>{selectedRequest.breed}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Gender</Typography>
                      <Typography>{selectedRequest.gender}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Adopter</Typography>
                      <Typography>{selectedRequest.adopterName}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Email</Typography>
                      <Typography>{selectedRequest.adopterEmail}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Phone</Typography>
                      <Typography>{selectedRequest.adopterPhone}</Typography>
                    </Box>
                    <Box sx={{ gridColumn: "span 2" }}>
                      <Typography variant="subtitle2">Address</Typography>
                      <Typography>{selectedRequest.address}</Typography>
                    </Box>
                  </Box>

                  <Typography variant="subtitle1" fontWeight="bold">
                    Message from Adopter
                  </Typography>
                  <Typography>{selectedRequest.message}</Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AdoptionRequest;
