import React, { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import ProductCard from "../../GlobalComponents/ProductCard"

export const allProducts = [
    {
      id: 1,
      productName: "Premium Dog Food",
      category: "Food",
      rating: 4.7,
      price: "25.99",
      images: ["https://picsum.photos/600/400?random=11","https://picsum.photos/600/400?random=12","https://picsum.photos/600/400?random=13"],
      description: "High-quality dog food for a healthy, happy pet."
    },
    {
      id: 2,
      productName: "Cat Scratching Post",
      category: "Toys",
      rating: 4.5,
      price: "40.00",
      images: ["https://picsum.photos/600/400?random=21","https://picsum.photos/600/400?random=22","https://picsum.photos/600/400?random=23"],
      description: "Durable scratching post to keep your cat entertained."
    },
    {
      id: 3,
      productName: "Bird Cage",
      category: "Accessories",
      rating: 4.6,
      price: "60.00",
      images: ["https://picsum.photos/600/400?random=31","https://picsum.photos/600/400?random=32","https://picsum.photos/600/400?random=33"],
      description: "Spacious cage for small and medium birds."
    },
    {
      id: 4,
      productName: "Aquarium Starter Kit",
      category: "Aquatic",
      rating: 4.8,
      price: "120.00",
      images: ["https://picsum.photos/600/400?random=41","https://picsum.photos/600/400?random=42","https://picsum.photos/600/400?random=43"],
      description: "Complete kit for beginners to start an aquarium."
    },
    {
      id: 5,
      productName: "Dog Chew Toy",
      category: "Toys",
      rating: 4.4,
      price: "15.50",
      images: ["https://picsum.photos/600/400?random=51","https://picsum.photos/600/400?random=52","https://picsum.photos/600/400?random=53"],
      description: "Fun and safe chew toy for dogs of all sizes."
    },
    {
      id: 6,
      productName: "Cat Food Bowl",
      category: "Accessories",
      rating: 4.3,
      price: "12.99",
      images: ["https://picsum.photos/600/400?random=61","https://picsum.photos/600/400?random=62","https://picsum.photos/600/400?random=63"],
      description: "Non-slip bowl perfect for feeding your cat."
    },
    {
      id: 7,
      productName: "Goldfish Food Pack",
      category: "Food",
      rating: 4.6,
      price: "9.99",
      images: ["https://picsum.photos/600/400?random=71","https://picsum.photos/600/400?random=72","https://picsum.photos/600/400?random=73"],
      description: "Nutritious flakes for your aquarium fish."
    },
    {
      id: 8,
      productName: "Dog Leash",
      category: "Accessories",
      rating: 4.7,
      price: "18.00",
      images: ["https://picsum.photos/600/400?random=81","https://picsum.photos/600/400?random=82","https://picsum.photos/600/400?random=83"],
      description: "Strong and comfortable leash for daily walks."
    },
    {
      id: 9,
      productName: "Catnip Toys Pack",
      category: "Toys",
      rating: 4.5,
      price: "22.50",
      images: ["https://picsum.photos/600/400?random=91","https://picsum.photos/600/400?random=92","https://picsum.photos/600/400?random=93"],
      description: "Set of fun catnip toys for playful cats."
    },
    {
      id: 10,
      productName: "Aquarium Heater",
      category: "Aquatic",
      rating: 4.8,
      price: "35.00",
      images: ["https://picsum.photos/600/400?random=101","https://picsum.photos/600/400?random=102","https://picsum.photos/600/400?random=103"],
      description: "Adjustable heater to maintain ideal water temperature."
    },
    {
      id: 11,
      productName: "Dog Bed",
      category: "Accessories",
      rating: 4.9,
      price: "85.00",
      images: ["https://picsum.photos/600/400?random=111","https://picsum.photos/600/400?random=112","https://picsum.photos/600/400?random=113"],
      description: "Comfortable bed for dogs of all sizes."
    },
    {
      id: 12,
      productName: "Bird Swing",
      category: "Toys",
      rating: 4.4,
      price: "14.99",
      images: ["https://picsum.photos/600/400?random=121","https://picsum.photos/600/400?random=122","https://picsum.photos/600/400?random=123"],
      description: "Fun swing to keep your bird active and happy."
    },
    {
      id: 13,
      productName: "Cat Litter Box",
      category: "Accessories",
      rating: 4.6,
      price: "32.00",
      images: ["https://picsum.photos/600/400?random=131","https://picsum.photos/600/400?random=132","https://picsum.photos/600/400?random=133"],
      description: "Easy-to-clean litter box for indoor cats."
    },
    {
      id: 14,
      productName: "Dog Grooming Kit",
      category: "Accessories",
      rating: 4.7,
      price: "45.00",
      images: ["https://picsum.photos/600/400?random=141","https://picsum.photos/600/400?random=142","https://picsum.photos/600/400?random=143"],
      description: "Complete grooming kit for maintaining your dog's coat."
    },
    {
      id: 15,
      productName: "Aquarium Plants Pack",
      category: "Aquatic",
      rating: 4.5,
      price: "28.00",
      images: ["https://picsum.photos/600/400?random=151","https://picsum.photos/600/400?random=152","https://picsum.photos/600/400?random=153"],
      description: "Artificial and natural plants to decorate your aquarium."
    }
  ]
  
function ProductsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch = p.productName.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category ? p.category === category : true
    const matchesRating = rating ? p.rating >= parseFloat(rating) : true
    return matchesSearch && matchesCategory && matchesRating
  })

  const itemsPerPage = 30
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage)

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Box sx={{ p: 4, pt: 10 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}>
          Paw-some Picks for Your Pets
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1, mb: 3, px: 5 }}>
        <TextField
          sx={{ width: "100%" }}
          variant="outlined"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined" startIcon={<FilterListIcon />} onClick={(e) => setAnchorEl(e.currentTarget)}>
          Filters
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { width: 300, p: 2 } }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Filter Options
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }}>
              <MenuItem value="">All</MenuItem>
              {[...new Set(allProducts.map((p) => p.category))].map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Min Rating</InputLabel>
            <Select value={rating} onChange={(e) => { setRating(e.target.value); setPage(1) }}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="4">4+</MenuItem>
              <MenuItem value="4.5">4.5+</MenuItem>
            </Select>
          </FormControl>
        </Menu>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      )}
    </Box>
  )
}

export default ProductsPage
