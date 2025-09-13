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
      productName: 'Dry Food (Kribble)',
      category: 'Dry Food',
      rating: 4.5,
      price: 40,
      images: ['https://picsum.photos/600/400?random=1', 'https://picsum.photos/600/400?random=2'],
    },
    {
      productName: 'Wet Food (Pawfect)',
      category: 'Wet Food',
      rating: 4.0,
      price: 35,
      images: ['https://picsum.photos/600/400?random=3', 'https://picsum.photos/600/400?random=4'],
    },
    {
      productName: 'Cat Toy (Meow Fun)',
      category: 'Toy',
      rating: 4.2,
      price: 15,
      images: ['https://picsum.photos/600/400?random=5', 'https://picsum.photos/600/400?random=6'],
    },
    {
      productName: 'Cat Bed (CozyNest)',
      category: 'Accessories',
      rating: 4.7,
      price: 60,
      images: ['https://picsum.photos/600/400?random=7', 'https://picsum.photos/600/400?random=8'],
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
