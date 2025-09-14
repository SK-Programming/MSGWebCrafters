import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'
import { useNavigate } from 'react-router-dom'

function ProductCard({ id, category, rating, price, images, productName }) {
  const navigate = useNavigate()

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
          width: '18rem',
          height: '13rem',
          background: '#1C1C26',
          borderRadius: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Typography
            variant="body1"
            color="#e2e2e2"
            sx={{ width: '90%', textAlign: 'center', fontWeight: 'bold' }}
          >
            {productName}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="body2" sx={{ color: '#e2e2e2', textAlign: 'center' }}>
              {category}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ color: '#FE8756', fontSize: '1rem' }} />
              <Typography variant="body2" sx={{ color: '#e2e2e2', ml: 0.5 }}>
                {rating}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ width: '90%', textAlign: 'center', color: '#FE8756' }}
            >
              {`$${price}`}
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
                color: '#e2e2e2',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '11px',
              }}
              onClick={() => navigate(`/products/${id}`)}
            >
              Buy Now
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            backgroundImage: `url(${images?.[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Box>
    </div>
  )
}

export default ProductCard
