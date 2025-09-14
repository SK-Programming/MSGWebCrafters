import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; 
import ProductCard from '../../GlobalComponents/ProductCard';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Products() {
  const navigate = useNavigate();

  const productData = [
    {
      productName: "Royal Canin Medium Adult Dry Dog Food",
      category: "Dry Food",
      rating: 4.6,
      price: 55,
      images: [
        "https://images.unsplash.com/photo-1590080877777-3929e9fa2536?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1605727210191-fc7d6ff540e4?auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      productName: "Hill's Science Diet Wet Cat Food",
      category: "Wet Food",
      rating: 4.4,
      price: 30,
      images: [
        "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=80",
      ],
    },
    {
      productName: "Blue Buffalo Wilderness Trail Treats",
      category: "Treats",
      rating: 4.3,
      price: 12,
      images: [
        "https://images.unsplash.com/photo-1611095564987-3b229d05a25d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1583337130417-5f779c3ab9a3?auto=format&fit=crop&w=600&q=80",
      ],
    },
    
  ];
    
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          pt: 10,
        }}
      >
        <Box sx={{ display: 'flex', mx: 5, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h3"
            fontWeight={'bold'}
            whiteSpace={'pre-line'}
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, 
            }}
          >
            {`Paw-some Picks for \n Your Pets`}
          </Typography>
          <Typography
            variant="p2"
            whiteSpace={'pre-line'}
            sx={{
              fontSize: { xs: '0.8rem', sm: '1rem', md: '1.25rem' }, 
              display: { xs: 'none', sm: 'block' }, 
            }}
          >
            {`From Meals to Playtime — \n Everything Your Pet Needs`}
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ justifyContent: 'center', mx: 5, mt: 5 }}>
          {productData.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProductCard
                productName={product.productName}
                category={product.category}
                rating={product.rating}
                price={product.price}
                images={product.images}
              />
            </Grid>
          ))}
        </Grid>

        <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              background: 'coral',
              borderRadius: '1vh',
              textTransform: 'none',
              width: '16vw',
              minWidth: '9rem',
              height: '6vh',
              color: '#1C1C26',
              fontWeight: 'bold',
              fontSize: '2vh',
            }}
            onClick={() => navigate('/products')}
          >
            View All
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Products;
