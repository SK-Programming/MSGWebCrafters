import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  TextField,
  Button,
  Rating,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function VetProfiles() {
  const vet = {
    name: "Dr. John Doe",
    avatar: "",
    email: "dr.john@example.com",
    address: "123 Main St",
    experience: "5 years",
    joiningDate: "2020-06-15",
    description:
      "Compassionate veterinarian with extensive experience in small animal care.",
  };

  // Reviews state
  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice", rating: 5, comment: "Dr. John is amazing! He took great care of my dog." },
    { id: 2, name: "Michael", rating: 4, comment: "Very kind and professional vet." },
  ]);
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  // Appointment modal state
  const [openModal, setOpenModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleSubmitReview = () => {
    if (!newName || !newComment || newRating === 0) return;
    const newReview = {
      id: Date.now(),
      name: newName,
      rating: newRating,
      comment: newComment,
    };
    setReviews([newReview, ...reviews]);
    setNewName("");
    setNewRating(0);
    setNewComment("");
  };

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const handleBookAppointment = () => {
    if (!appointmentDate || !appointmentTime) return;
    alert(
      `Appointment booked with ${vet.name} on ${appointmentDate.toLocaleDateString()} at ${appointmentTime}`
    );
    setOpenModal(false);
    setAppointmentDate(null);
    setAppointmentTime("");
  };

  return (
    <Box sx={{ pt: 12, px: { xs: 2, sm: 3, md: 6 }, maxWidth: "900px", mx: "auto" }}>
      {/* Vet Info */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={6} alignItems={{ xs: "center", md: "flex-start" }} sx={{ mb: 8 }}>
        <Box sx={{ textAlign: "center", flexShrink: 0 }}>
          <Avatar src={vet.avatar} sx={{ width: 160, height: 160, mx: "auto", mb: 3 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {vet.name}
          </Typography>
          <Rating value={avgRating} precision={0.5} readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Average Rating: {avgRating.toFixed(1)} ⭐ ({reviews.length} reviews)
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            {vet.description}
          </Typography>

          <Stack spacing={1} sx={{ mt: 3, mb: 3 }}>
            <Typography><strong>Email:</strong> {vet.email}</Typography>
            <Typography><strong>Address:</strong> {vet.address}</Typography>
            <Typography><strong>Experience:</strong> {vet.experience}</Typography>
            <Typography><strong>Joined:</strong> {vet.joiningDate}</Typography>
          </Stack>

          <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
            Book Appointment
          </Button>
        </Box>
      </Stack>

      {/* Reviews */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, textAlign: "center" }}>
        What Our Patients Say
      </Typography>

      {/* Review Form */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Leave a Review
        </Typography>
        <TextField label="Your Name" fullWidth sx={{ mb: 2 }} value={newName} onChange={(e) => setNewName(e.target.value)} />
        <Rating value={newRating} onChange={(e, newValue) => setNewRating(newValue)} sx={{ mb: 2 }} />
        <TextField label="Your Review" fullWidth multiline rows={3} sx={{ mb: 2 }} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <Button variant="contained" onClick={handleSubmitReview}>Submit Review</Button>
      </Paper>

      <Stack spacing={2}>
        {reviews.map((review) => (
          <Paper key={review.id} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">{review.name}</Typography>
            <Rating value={review.rating} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
          </Paper>
        ))}
      </Stack>

      {/* Appointment Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} PaperProps={{ sx: { borderRadius: 3, p: 2, width: "420px" } }}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.4rem" }}>
          Book Appointment
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={appointmentDate}
              onChange={(newDate) => setAppointmentDate(newDate)}
              slotProps={{
                actionBar: { actions: [] },
              }}
            />
          </LocalizationProvider>

          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>
            Select Time Slot
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {timeSlots.map((slot) => (
              <Chip
                key={slot}
                label={slot}
                clickable
                color={appointmentTime === slot ? "primary" : "default"}
                onClick={() => setAppointmentTime(slot)}
              />
            ))}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={() => setOpenModal(false)} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleBookAppointment}
            sx={{
              borderRadius: 2,
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default VetProfiles;
