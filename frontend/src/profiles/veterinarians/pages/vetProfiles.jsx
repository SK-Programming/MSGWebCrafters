import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function VetProfiles() {
  const [vet, setVet] = React.useState({
    name: "Dr. John Doe",
    avatar: "",
    email: "dr.john@example.com",
    address: "123 Main St",
    experience: "5 years",
    joiningDate: "2020-06-15",
    description:
      "Compassionate veterinarian with extensive experience in small animal care.",
  });

  const [editing, setEditing] = React.useState(false);
  const [newVet, setNewVet] = React.useState(vet);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewVet({ ...newVet, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setVet({ ...newVet, joiningDate: vet.joiningDate });
    setEditing(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 3, position: "relative" }}
      >
        <Typography variant="h4" fontWeight="bold">
          Your Profile
        </Typography>
        {!editing && (
          <IconButton
            onClick={() => setEditing(true)}
            sx={{ position: "absolute", right: 0 }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Avatar
            src={newVet.avatar}
            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
          />
          {editing && (
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "none" }}
            >
              Upload from Gallery
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          )}
        </Box>

        <Box sx={{ flex: 2 }}>
          <Stack spacing={2} sx={{ textAlign: "left" }}>
            {editing ? (
              <>
                <TextField
                  label="Name"
                  fullWidth
                  value={newVet.name}
                  onChange={(e) =>
                    setNewVet({ ...newVet, name: e.target.value })
                  }
                />
                <TextField
                  label="Email"
                  fullWidth
                  value={newVet.email}
                  onChange={(e) =>
                    setNewVet({ ...newVet, email: e.target.value })
                  }
                />
                <TextField
                  label="Address"
                  fullWidth
                  value={newVet.address}
                  onChange={(e) =>
                    setNewVet({ ...newVet, address: e.target.value })
                  }
                />
                <TextField
                  label="Experience"
                  fullWidth
                  value={newVet.experience}
                  onChange={(e) =>
                    setNewVet({ ...newVet, experience: e.target.value })
                  }
                />
                <TextField
                  label="Joining Date"
                  fullWidth
                  value={vet.joiningDate}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  minRows={3}
                  value={newVet.description}
                  onChange={(e) =>
                    setNewVet({ ...newVet, description: e.target.value })
                  }
                />
              </>
            ) : (
              <>
                <Typography variant="h6">{vet.name}</Typography>
                <Typography>Email: {vet.email}</Typography>
                <Typography>Address: {vet.address}</Typography>
                <Typography>Experience: {vet.experience}</Typography>
                <Typography>Joining Date: {vet.joiningDate}</Typography>
                <Typography sx={{ mt: 2 }}>{vet.description}</Typography>
              </>
            )}
          </Stack>

          {editing && (
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 2, justifyContent: "flex-start" }}
            >
              <Button
                variant="contained"
                sx={{ bgcolor: "#FE8756", textTransform: "none" }}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{ textTransform: "none" }}
                onClick={() => {
                  setNewVet(vet);
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />
      <Typography variant="body2" color="text.secondary" textAlign="center">
        This is your public profile. Patients can view your name, email,
        address, experience, description and joining date. Click the edit icon
        to update your information. Profile photo updates can be uploaded from
        your gallery.
      </Typography>
    </Box>
  );
}

export default VetProfiles;
