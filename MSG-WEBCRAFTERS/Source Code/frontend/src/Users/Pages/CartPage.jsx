import React from "react"
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Paper,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { useCart } from "../../GlobalComponents/CartContext"
import { useNavigate } from "react-router-dom"

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Box sx={{ p: 4, pt: 9, pb: 12, mx: "auto", maxWidth: 1200 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <Box sx={{ mb: 10 }}>
            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#f9f9f9",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    component="img"
                    src={item.images[0]}
                    alt={item.productName}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />
                  <Box>
                    <Typography fontWeight="bold">{item.productName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.category}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <AddIcon />
                  </IconButton>
                  <Typography sx={{ fontWeight: "bold" }}>
                    ${item.price * item.quantity}
                  </Typography>
                  <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>

          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #ddd",
              bgcolor: "#fff",
              maxWidth: 1200,
              mx: "auto",
            }}
            elevation={0}
          >
            <Typography variant="h6" fontWeight="bold">
              Total: ${total}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                clearCart()
                navigate("/purchase-success")
              }}
              sx={{ px: 4 }}
            >
              Checkout
            </Button>
          </Paper>
        </>
      )}
    </Box>
  )
}

export default CartPage
