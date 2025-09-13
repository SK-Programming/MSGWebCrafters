import React from "react";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

function Profile() {
  const [editMode, setEditMode] = React.useState(false);
  const [profile, setProfile] = React.useState({
    shelterName: "Happy Paws Shelter",
    contactPerson: "John Doe",
    email: "happypaws@example.com",
    phone: "+1234567890",
    address: "123 Main St, City",
    avatar: "https://via.placeholder.com/100",
  });

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Shelter Profile
      </Typography>

      {/* top profile section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 3,
          p: 3,
          mb: 4,
          borderRadius: 3,
          bgcolor: "#d9e2c4",
          boxShadow: 3,
        }}
      >
        <Avatar
          src={profile.avatar}
          alt={profile.shelterName}
          sx={{ width: 100, height: 100 }}
        />
        <Box flex={1}>
          <Typography variant="h5" fontWeight="bold">
            {profile.shelterName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Managed by {profile.contactPerson}
          </Typography>
        </Box>
        {!editMode ? (
          <IconButton
            onClick={() => setEditMode(true)}
            sx={{ color: "#FE8756" }}
          >
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleSave} sx={{ color: "#FE8756" }}>
            <SaveIcon />
          </IconButton>
        )}
      </Box>

      {/* form fields */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Shelter Name"
            fullWidth
            value={profile.shelterName}
            onChange={(e) =>
              setProfile({ ...profile, shelterName: e.target.value })
            }
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Contact Person"
            fullWidth
            value={profile.contactPerson}
            onChange={(e) =>
              setProfile({ ...profile, contactPerson: e.target.value })
            }
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            fullWidth
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            value={profile.address}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
            disabled={!editMode}
          />
        </Grid>
      </Grid>

      {editMode && (
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            mb: 5,
            backgroundColor: "#FE8756",
            "&:hover": { backgroundColor: "#e96d3b" },
          }}
        >
          Save Changes
        </Button>
      )}

      {/* stats boxes */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              bgcolor: "#FE8756",
              color: "#fff",
              borderRadius: 3,
              p: 3,
              textAlign: "center",
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              12
            </Typography>
            <Typography>Adoptable Pets</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              bgcolor: "#FE8756",
              color: "#fff",
              borderRadius: 3,
              p: 3,
              textAlign: "center",
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              5
            </Typography>
            <Typography>Pending Adoptions</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              bgcolor: "#FE8756",
              color: "#fff",
              borderRadius: 3,
              p: 3,
              textAlign: "center",
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              30
            </Typography>
            <Typography>Total Animals</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
