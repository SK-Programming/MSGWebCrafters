import React from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  MenuItem,
  Avatar,
  Stack,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const pets = [
  { id: 1, name: "Buddy", image: "https://via.placeholder.com/40" },
  { id: 2, name: "Misty", image: "https://via.placeholder.com/40" },
];

function CareLogs() {
  const [logs, setLogs] = React.useState([
    {
      id: 1,
      petId: 1,
      feeding: "Fed at 9am",
      grooming: "Brushed fur",
      medical: "No issues",
    },
  ]);
  const [search, setSearch] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedPet, setSelectedPet] = React.useState("");
  const [feeding, setFeeding] = React.useState("");
  const [grooming, setGrooming] = React.useState("");
  const [medical, setMedical] = React.useState("");
  const [editingLogId, setEditingLogId] = React.useState(null);

  const filteredLogs = logs.filter((log) => {
    const pet = pets.find((p) => p.id === log.petId);
    return (
      pet?.name.toLowerCase().includes(search.toLowerCase()) ||
      log.feeding.toLowerCase().includes(search.toLowerCase()) ||
      log.grooming.toLowerCase().includes(search.toLowerCase()) ||
      log.medical.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleAddLog = () => {
    if (!selectedPet) return;
    const newLog = {
      id: Date.now(),
      petId: parseInt(selectedPet),
      feeding,
      grooming,
      medical,
    };
    setLogs([...logs, newLog]);
    setOpenModal(false);
    setSelectedPet("");
    setFeeding("");
    setGrooming("");
    setMedical("");
  };

  const handleEditSave = (id) => {
    if (editingLogId === id) {
      setEditingLogId(null);
    } else {
      setEditingLogId(id);
    }
  };

  const handleLogChange = (id, field, value) => {
    setLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, [field]: value } : log))
    );
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="#1f2937">
          Care Logs
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{
            px: 3,
            py: 1,
            borderRadius: "999px",
            textTransform: "none",
            backgroundColor: "#2563eb",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#1d4ed8" },
          }}
        >
          + Add Care Log
        </Button>
      </Stack>

      <TextField
        placeholder="Search logs by pet or notes"
        fullWidth
        size="small"
        sx={{
          mb: 3,
          bgcolor: "#fff",
          borderRadius: 2,
          "& fieldset": { border: "none" },
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {filteredLogs.map((log) => {
        const pet = pets.find((p) => p.id === log.petId);
        return (
          <Paper
            elevation={2}
            key={log.id}
            sx={{
              borderRadius: 3,
              p: 3,
              mb: 2,
              transition: "all 0.2s",
              "&:hover": { boxShadow: 4 },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Avatar src={pet?.image} sx={{ width: 50, height: 50 }} />
              <Typography variant="h6" color="#111827">
                {pet?.name}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                sx={{ color: "#2563eb" }}
                onClick={() => handleEditSave(log.id)}
              >
                {editingLogId === log.id ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Stack>

            <GridLayout
              editing={editingLogId === log.id}
              log={log}
              onChange={handleLogChange}
            />
          </Paper>
        );
      })}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "#fff",
            borderRadius: 4,
            p: 4,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }} color="#111827">
            Add Care Log
          </Typography>

          <TextField
            select
            fullWidth
            label="Select Pet"
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
            sx={{ mb: 3 }}
          >
            {pets.map((pet) => (
              <MenuItem key={pet.id} value={pet.id}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar src={pet.image} sx={{ width: 24, height: 24 }} />
                  <Typography>{pet.name}</Typography>
                </Stack>
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Feeding"
            value={feeding}
            onChange={(e) => setFeeding(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Grooming"
            value={grooming}
            onChange={(e) => setGrooming(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Medical Attention"
            value={medical}
            onChange={(e) => setMedical(e.target.value)}
            sx={{ mb: 4 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleAddLog}
            sx={{
              borderRadius: "999px",
              py: 1.2,
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#1d4ed8" },
            }}
          >
            Save Log
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

function GridLayout({ editing, log, onChange }) {
  return (
    <Stack spacing={1}>
      {["feeding", "grooming", "medical"].map((field) =>
        editing ? (
          <TextField
            key={field}
            fullWidth
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={log[field]}
            onChange={(e) => onChange(log.id, field, e.target.value)}
            sx={{
              bgcolor: "#f9fafb",
              borderRadius: 2,
            }}
          />
        ) : (
          <Typography key={field} color="#4b5563">
            <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{" "}
            {log[field]}
          </Typography>
        )
      )}
    </Stack>
  );
}

export default CareLogs;
