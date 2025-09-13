import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { allProducts } from "./ProductsPage"
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material"
import Slider from "react-slick"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PaymentIcon from "@mui/icons-material/Payment"
import CategoryIcon from "@mui/icons-material/Category"
import StarIcon from "@mui/icons-material/Star"
import { useCart } from "../../GlobalComponents/CartContext"

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = allProducts.find((p) => p.id === parseInt(id))
  const [open, setOpen] = useState(false)

  if (!product) return <Typography>Product not found</Typography>

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
  }

  const handleAddToCart = () => {
    addToCart(product)
    setOpen(true)
  }

  return (
    <Box
      sx={{
        p: 4,
        pt: 7,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "flex-start",
            
        mx: "auto",
      }}
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <Slider {...settings}>
          {product.images?.map((img, i) => (
            <Box key={i}>
              <Box
                component="img"
                src={img}
                alt={product.productName}
                sx={{
                  width: "100%",
                  height: { xs: 250, sm: 300, md: 400 },
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Box sx={{ flex: 1, pl: 2, width: "100%" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {product.productName}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 1, flexWrap: "wrap", gap: 2 }}
        >
          <Chip
            icon={<CategoryIcon />}
            label={`Category: ${product.category}`}
            sx={{ bgcolor: "#D3DCC0", color: "#1c1c26", fontWeight: "bold" }}
          />
          <Chip
            icon={<StarIcon />}
            label={`Rating: ${product.rating}`}
            sx={{ bgcolor: "#D3DCC0", color: "#1c1c26", fontWeight: "bold" }}
          />
          <Chip
            label={`Price: $${product.price}`}
            sx={{ bgcolor: "#D3DCC0", color: "#1c1c26", fontWeight: "bold" }}
          />
        </Stack>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {product.description}
        </Typography>
     
      

    

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            sx={{
              px: 5,
              py: 1.5,
              bgcolor: "#ff7043",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": { bgcolor: "#e85d2f" },
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<PaymentIcon />}
            onClick={() => navigate("/purchase-success")}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Buy Now
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Added to cart successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ProductDetails
