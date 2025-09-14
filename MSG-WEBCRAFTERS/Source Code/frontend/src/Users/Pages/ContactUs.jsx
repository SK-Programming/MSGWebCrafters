import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import emailjs from "emailjs-com";

function ContactUs() {
  const form = useRef();
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_atdm409",
        "template_ntgctlw",
        form.current,
        "iKFiabu-M309fLfCm"
      )
      .then(() => {
        setSnackOpen(true);
        form.current.reset();
      })
      .catch((err) => {
        alert("Failed to send message");
        console.log(err);
      });
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#f9f9f9" }}>
      {/* Heading */}
      <Box
        sx={{
          py: 10,
          backgroundImage: "url('/your-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Contact Us
        </Typography>
      </Box>

      {/* Image + Form */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          justifyContent: "center",
          px: { xs: 2, md: 6 },
          py: 4,
          mt: -8,
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: { xs: "200px", md: "400px" },
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src="/contact.jpg"
            alt="Contact"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography variant="h6" mb={3} textAlign="center">
            Have questions or feedback? Send us a message below.
          </Typography>

          <form ref={form} onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField name="user_name" label="Name" fullWidth required />
              <TextField
                name="user_email"
                label="Email"
                type="email"
                fullWidth
                required
              />
              <TextField
                name="message"
                label="Message"
                multiline
                rows={4}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "coral",
                  borderRadius: "10px",
                  textTransform: "none",
                  py: 1.2,
                  "&:hover": {
                    backgroundColor: "#e57355",
                  },
                }}
                fullWidth
              >
                Send Message
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>

      {/* Map full width */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "300px", md: "400px" },
        }}
      >
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13272.767228395876!2d74.3551283!3d31.5203693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904ab8137f06f%3A0x18d8c1c9e7cd1b3d!2sLahore!5e0!3m2!1sen!2s!4v0000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackOpen(false)}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactUs;
