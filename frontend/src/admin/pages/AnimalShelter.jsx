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
    Fab,
    Select,
    FormControl,
    InputLabel,
    Snackbar,
    Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";

const initialListings = [
    {
        name: "Jack",
        species: "Dog",
        breed: "German Shepherd",
        age: "2 Years",
        gender: "Male",
        shelterContact: "johndoe@gmail.com",
        description: "Energetic and loyal, loves to play and needs a loving home.",
        images: [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
        ],
    },
];

function AnimalShelter() {
    const [filterEl, setFilterEl] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [editAnimal, setEditAnimal] = React.useState(null);
    const [listings, setListings] = React.useState(initialListings);
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [speciesFilter, setSpeciesFilter] = React.useState("");
    const [genderFilter, setGenderFilter] = React.useState("");

    const [newPet, setNewPet] = React.useState({
        name: "",
        species: "",
        breed: "",
        gender: "",
        shelterContact: "",
        description: "",
        images: [],
    });

    const [snackbarAdd, setSnackbarAdd] = React.useState(false);
    const [snackbarUpdate, setSnackbarUpdate] = React.useState(false);

    const handleFilterOpen = (event) => setFilterEl(event.currentTarget);
    const handleFilterClose = () => setFilterEl(null);

    const handleOpenModal = (animal, index) => {
        setSelectedIndex(index);
        setEditAnimal({ ...animal, images: [...animal.images] });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditAnimal(null);
        setSelectedIndex(null);
    };

    const handleSaveEdit = () => {
        if (selectedIndex !== null) {
            const updated = [...listings];
            updated[selectedIndex] = editAnimal;
            setListings(updated);
            setSnackbarUpdate(true);
        }
        handleCloseModal();
    };

    const displayedAnimals = listings.filter((a) => {
        const matchesSearch =
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            (a.breed && a.breed.toLowerCase().includes(search.toLowerCase()));
        const matchesSpecies = speciesFilter ? a.species === speciesFilter : true;
        const matchesGender = genderFilter ? a.gender === genderFilter : true;
        return matchesSearch && matchesSpecies && matchesGender;
    });

    const handleAddPet = () => {
        if (
            !newPet.name.trim() ||
            !newPet.species.trim() ||
            !newPet.breed.trim() ||
            !newPet.gender.trim() ||
            !newPet.description.trim() ||
            newPet.images.length !== 3
        ) {
            setErrorMsg("Please fill all fields and upload exactly 3 images.");
            return;
        }
        const imageUrls = newPet.images.map((f) =>
            typeof f === "string" ? f : URL.createObjectURL(f)
        );
        setListings((prev) => [...prev, { ...newPet, images: imageUrls }]);
        setNewPet({
            name: "",
            species: "",
            breed: "",
            gender: "",
            shelterContact: "",
            description: "",
            images: [],
        });
        setErrorMsg("");
        setOpenAddModal(false);
        setSnackbarAdd(true);
    };

    const onAddDrop = (acceptedFiles) => {
        setNewPet((prev) => ({
            ...prev,
            images: [...prev.images, ...acceptedFiles].slice(0, 3),
        }));
    };

    const onEditDrop = (acceptedFiles) => {
        setEditAnimal((prev) => ({
            ...prev,
            images: [...prev.images, ...acceptedFiles].slice(0, 3),
        }));
    };

    const {
        getRootProps: getAddRootProps,
        getInputProps: getAddInputProps,
        isDragActive: isAddActive,
    } = useDropzone({
        accept: { "image/*": [] },
        multiple: true,
        maxFiles: 3,
        onDrop: onAddDrop,
    });

    const {
        getRootProps: getEditRootProps,
        getInputProps: getEditInputProps,
        isDragActive: isEditActive,
    } = useDropzone({
        accept: { "image/*": [] },
        multiple: true,
        maxFiles: 3,
        onDrop: onEditDrop,
    });

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                    Animals Shelter
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TextField
                        size="small"
                        placeholder="Search animals"
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
                    <Typography variant="subtitle2">Animal</Typography>
                    <Typography variant="subtitle2">Species</Typography>
                    <Typography variant="subtitle2">Breed</Typography>
                    <Typography variant="subtitle2">Gender</Typography>
                    <Typography variant="subtitle2" sx={{ textAlign: "right" }}>
                        Action
                    </Typography>
                </Box>
                {displayedAnimals.map((row, index) => (
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
                            <Avatar src={row.images[0]} sx={{ width: 24, height: 24 }} />
                            {row.name}
                        </Box>
                        <Typography>{row.species || "-"}</Typography>
                        <Typography>{row.breed || "-"}</Typography>
                        <Typography>{row.gender || "-"}</Typography>
                        <Box sx={{ textAlign: "right" }}>
                            <IconButton onClick={() => handleOpenModal(row, index)} sx={{ color: "#fff" }}>
                                <VisibilityIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Card>

            <Menu anchorEl={filterEl} open={Boolean(filterEl)} onClose={handleFilterClose}>
                <Box sx={{ p: 2, width: 200 }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Species</InputLabel>
                        <Select
                            value={speciesFilter}
                            label="Species"
                            onChange={(e) => setSpeciesFilter(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Dog">Dog</MenuItem>
                            <MenuItem value="Cat">Cat</MenuItem>
                            <MenuItem value="Fish">Fish</MenuItem>
                            <MenuItem value="Parrot">Parrot</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={genderFilter}
                            label="Gender"
                            onChange={(e) => setGenderFilter(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="text"
                        sx={{ mt: 2 }}
                        onClick={() => {
                            setSpeciesFilter("");
                            setGenderFilter("");
                        }}
                    >
                        Clear Filters
                    </Button>
                </Box>
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
                    {editAnimal && (
                        <Box
                            sx={{
                                width: 650,
                                bgcolor: "rgba(255,255,255,0.95)",
                                borderRadius: 3,
                                p: 3,
                                boxShadow: 24,
                                maxHeight: "90vh",
                                overflowY: "auto",
                                position: "relative",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <IconButton
                                onClick={handleCloseModal}
                                sx={{ position: "absolute", top: 8, right: 8 }}
                            >
                                <CloseIcon />
                            </IconButton>

                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                                {editAnimal.name}’s Profile
                            </Typography>

                            <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
                                {(editAnimal.images || []).map((img, idx) => (
                                    <Box
                                        key={idx}
                                        component="img"
                                        src={typeof img === "string" ? img : URL.createObjectURL(img)}
                                        alt=""
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            objectFit: "cover",
                                            borderRadius: 2,
                                            boxShadow: 2,
                                        }}
                                    />
                                ))}
                            </Box>

                            <Typography><strong>Species:</strong> {editAnimal.species}</Typography>
                            <Typography><strong>Breed:</strong> {editAnimal.breed}</Typography>
                            <Typography><strong>Gender:</strong> {editAnimal.gender}</Typography>
                            <Typography><strong>Contact Email:</strong> {editAnimal.shelterContact}</Typography>

                            <Typography sx={{ mt: 2 }}>
                                <strong>Description:</strong><br />
                                {editAnimal.description}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Modal>

            <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        p: 3,
                        borderRadius: 2,
                        width: 400,
                        maxHeight: "90vh",
                        overflowY: "auto",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Add New Pet
                    </Typography>
                    <TextField
                        label="Name"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={newPet.name}
                        onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Species</InputLabel>
                        <Select
                            value={newPet.species}
                            label="Species"
                            onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
                        >
                            <MenuItem value="Dog">Dog</MenuItem>
                            <MenuItem value="Cat">Cat</MenuItem>
                            <MenuItem value="Fish">Fish</MenuItem>
                            <MenuItem value="Parrot">Parrot</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Breed"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={newPet.breed}
                        onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={newPet.gender}
                            label="Gender"
                            onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Contact Email"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={newPet.shelterContact}
                        onChange={(e) => setNewPet({ ...newPet, shelterContact: e.target.value })}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        minRows={3}
                        sx={{ mb: 2 }}
                        value={newPet.description}
                        onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
                    />

                    <Box
                        {...getAddRootProps()}
                        sx={{
                            border: "2px dashed #aaa",
                            borderRadius: 2,
                            p: 2,
                            textAlign: "center",
                            mb: 2,
                            cursor: "pointer",
                            bgcolor: isAddActive ? "#f0f0f0" : "transparent",
                        }}
                    >
                        <input {...getAddInputProps()} />
                        {isAddActive ? (
                            <Typography>Drop the images here ...</Typography>
                        ) : (
                            <Typography>Drag & drop exactly 3 images (first will be profile)</Typography>
                        )}
                    </Box>

                    {newPet.images.length > 0 && (
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                            {newPet.images.map((file, idx) => (
                                <Box key={idx} sx={{ position: "relative" }}>
                                    <Box
                                        component="img"
                                        src={typeof file === "string" ? file : URL.createObjectURL(file)}
                                        alt=""
                                        sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 1 }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            setNewPet((prev) => ({
                                                ...prev,
                                                images: prev.images.filter((_, i) => i !== idx),
                                            }))}
                                        sx={{
                                            position: "absolute",
                                            top: -10,
                                            right: -10,
                                            bgcolor: "#fff",
                                            "&:hover": { bgcolor: "#f0f0f0" },
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {errorMsg && (
                        <Typography color="error" sx={{ mb: 1 }}>
                            {errorMsg}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        onClick={handleAddPet}
                        sx={{ mt: 2, backgroundColor: "#FE8756", "&:hover": { backgroundColor: "#e96d3b" } }}
                    >
                        Add Pet
                    </Button>
                </Box>
            </Modal>

            <Fab
                color="primary"
                onClick={() => setOpenAddModal(true)}
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    bgcolor: "#FE8756",
                    "&:hover": { bgcolor: "#e96d3b" },
                }}
            >
                <AddIcon />
            </Fab>

            <Snackbar
                open={snackbarAdd}
                autoHideDuration={3000}
                onClose={() => setSnackbarAdd(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity="success" onClose={() => setSnackbarAdd(false)}>
                    Pet added successfully!
                </Alert>
            </Snackbar>

            <Snackbar
                open={snackbarUpdate}
                autoHideDuration={3000}
                onClose={() => setSnackbarUpdate(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity="success" onClose={() => setSnackbarUpdate(false)}>
                    Pet updated successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AnimalShelter;

