import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import { Send } from "@mui/icons-material";

function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    1: [
      { from: "Admin", text: "Welcome to EventSphere!" },
      { from: "You", text: "Thank you!" },
    ],
    2: [{ from: "Admin", text: "Your booth request is under review." }],
  });

  const handleSend = () => {
    if (!message.trim() || !selectedChat) return;

    setChatData((prev) => ({
      ...prev,
      [selectedChat]: [...prev[selectedChat], { from: "You", text: message }],
    }));
    setMessage("");
  };

  return (
    <Box sx={{ display: "flex", height: "80vh", gap: 2 }}>
      {/* Chat List */}
      <Paper sx={{ width: 250, flexShrink: 0 }}>
        <Typography
          variant="h6"
          sx={{ p: 2, borderBottom: "1px solid #eee", fontWeight: "bold" }}
        >
          Messages
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedChat(1)}>
              <ListItemText primary="Admin Support" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedChat(2)}>
              <ListItemText primary="Event Manager" />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>

      {/* Chat Window */}
      <Paper sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {selectedChat ? (
          <>
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #eee",
                bgcolor: "secondary.main",
                color: "white",
              }}
            >
              <Typography fontWeight="bold">
                {selectedChat === 1 ? "Admin Support" : "Event Manager"}
              </Typography>
            </Box>

            {/* Messages */}
            <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
              {chatData[selectedChat]?.map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.from === "You" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: msg.from === "You" ? "primary.main" : "#eee",
                      color: msg.from === "You" ? "white" : "black",
                      maxWidth: "70%",
                    }}
                  >
                    {msg.text}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Input */}
            <Box sx={{ p: 2, display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <IconButton color="primary" onClick={handleSend}>
                <Send />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            <Typography>Select a chat to start messaging</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Messages;
