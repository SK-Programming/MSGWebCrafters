import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function ProductCard({ name, category, image, price, rating, onEdit }) {
  return (
    <Card
      sx={{
        width: 230,
        borderRadius: 3,
        bgcolor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{ height: 140, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#FE8756" }}>
            ${price}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {category}
          </Typography>
          <Rating value={rating} readOnly precision={0.5} size="small" />
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#FE8756",
            color: "#fff",
            textTransform: "none",
            borderRadius: 1,
            fontSize: "0.8rem",
            "&:hover": { bgcolor: "#e76e3c" },
          }}
          onClick={onEdit}
        >
          Edit Details
        </Button>
      </CardContent>
    </Card>
  );
}

function Products() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);

  const products = [
    {
      id: 1,
      name: "Dog Food",
      category: "Pet Food",
      price: 30,
      rating: 4.5,
      image: "https://via.placeholder.com/200x120",
    },
    {
      id: 2,
      name: "Cat Toy",
      category: "Toys",
      price: 10,
      rating: 3.8,
      image: "https://via.placeholder.com/200x120",
    },
    {
      id: 3,
      name: "Pet Shampoo",
      category: "Grooming",
      price: 15,
      rating: 5,
      image: "https://via.placeholder.com/200x120",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    const matchesPrice =
      priceFilter === "All" ||
      (priceFilter === "Low" && product.price < 20) ||
      (priceFilter === "Medium" && product.price >= 20 && product.price <= 50) ||
      (priceFilter === "High" && product.price > 50);
    const matchesRating = product.rating >= ratingFilter;
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(URL.createObjectURL(file));
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#1C1C26" }}>
        Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ bgcolor: "white", borderRadius: 2 }}
        />
        <Box
          onClick={handleFilterClick}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            px: 2,
            py: 1,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            "&:hover": { bgcolor: "#e0e0e0" },
          }}
        >
          <FilterListIcon sx={{ mr: 1, color: "#FE8756" }} />
          <Typography sx={{ fontWeight: "bold" }}>Filter</Typography>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ sx: { p: 2, minWidth: 250 } }}
        >
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pet Food">Pet Food</MenuItem>
              <MenuItem value="Toys">Toys</MenuItem>
              <MenuItem value="Grooming">Grooming</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Price</InputLabel>
            <Select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Low">Below $20</MenuItem>
              <MenuItem value="Medium">$20 - $50</MenuItem>
              <MenuItem value="High">Above $50</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 1 }}>Min Rating:</Typography>
            <Rating value={ratingFilter} onChange={(e, newValue) => setRatingFilter(newValue)} precision={0.5} />
          </Box>
        </Menu>
      </Box>
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ProductCard {...product} onEdit={() => setSelectedProduct(product)} />
          </Grid>
        ))}
      </Grid>
      <Dialog open={!!selectedProduct} onClose={() => setSelectedProduct(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ display: "flex", gap: 4, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <CardMedia
                  component="img"
                  image={selectedProduct.image}
                  alt={selectedProduct.name}
                  sx={{ width: "100%", borderRadius: 2, mb: 2 }}
                />
                <TextField fullWidth label="Product Name" defaultValue={selectedProduct.name} sx={{ mb: 2 }} />
                <TextField fullWidth label="Price" defaultValue={selectedProduct.price} sx={{ mb: 2 }} />
                <TextField fullWidth label="Category" defaultValue={selectedProduct.category} sx={{ mb: 2 }} />
                <Rating defaultValue={selectedProduct.rating} precision={0.5} sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button variant="outlined" color="error" fullWidth>
                    Delete Product
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: "#FE8756", "&:hover": { bgcolor: "#e76e3c" } }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Buyer Reviews
                </Typography>
                <Box sx={{ mb: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    John Doe
                  </Typography>
                  <Rating value={4} readOnly size="small" />
                  <Typography variant="body2">Great product, my dog loves it!</Typography>
                </Box>
                <Box sx={{ mb: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Jane Smith
                  </Typography>
                  <Rating value={5} readOnly size="small" />
                  <Typography variant="body2">Excellent quality and fast shipping.</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          bgcolor: "#FE8756",
          "&:hover": { bgcolor: "#e76e3c" },
        }}
        onClick={() => setAddOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Product Name" sx={{ mb: 2, mt: 1 }} />
          <TextField fullWidth label="Price" sx={{ mb: 2 }} />
          <TextField fullWidth label="Category" sx={{ mb: 2 }} />
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              mb: 2,
              cursor: "pointer",
              "&:hover": { borderColor: "#FE8756" },
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <CloudUploadIcon sx={{ fontSize: 40, color: "#FE8756" }} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {newImage ? "Image Selected" : "Drag & drop or click to upload"}
            </Typography>
            {newImage && (
              <Box
                component="img"
                src={newImage}
                alt="preview"
                sx={{ mt: 2, width: "100%", borderRadius: 2 }}
              />
            )}
          </Box>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: "#FE8756", "&:hover": { bgcolor: "#e76e3c" } }}
          >
            Add Product
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Products;
