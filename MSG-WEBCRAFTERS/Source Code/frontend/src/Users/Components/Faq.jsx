import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

function Faq() {
  const theme = useTheme();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqData = [
    {
      question: 'How can I create a pet profile?',
      answer:
        'To create a pet profile, simply log in and go to your dashboard. You can add pet details such as name, breed, age, species, medical history, and upload pictures to your pet’s profile.',
    },
    {
      question: 'Can I manage multiple pets under one account?',
      answer:
        'Yes! FurShield allows you to manage multiple pets in one account. You can easily switch between different pet profiles using the tabbed interface on your dashboard.',
    },
    {
      question: 'How can I track my pet’s medical records?',
      answer:
        'You can track your pet’s medical history under the "Health Records" section. This will include vaccinations, treatments, and any other medical data. You can also scan and upload relevant documents such as X-rays or vet certificates.',
    },
    {
      question: 'Can I book an appointment with a veterinarian?',
      answer:
        'Yes, you can book an appointment with a veterinarian through the platform. Simply navigate to the "Appointments" section and request a consultation with a vet based on your pet’s condition or location.',
    },
    
  ];

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box sx={{ width: '100%', px: 2, pt: 4,background:'#e2e2e2' }}>
 
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={3}
        align="center"
        sx={{
          
          color:" #1C1C26",
          lineHeight: 1.4,
        }}
      >
        Faq
      </Typography>

      <Box sx={{p:10,position:'relative',top:'-85px'}}>
        {faqData.map((faq, index) => (
          <Box key={index} sx={{ mb: 0 }}>
          
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                cursor: 'pointer',
                borderRadius: '8px',
                backgroundColor: '#1C1C26',
                color: '#e2e2e2',
                '&:hover': {
                  backgroundColor: '#1C1C29',
                },
                position:'relative',
                zIndex:1
              }}
              onClick={() => toggleAccordion(index)}
            >
              <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                {faq.question}
              </Typography>
              <IconButton sx={{ color: '#e2e2e2' }}>
                <ExpandMoreIcon />
              </IconButton>
            </Box>

          
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: expandedIndex === index ? 1 : 0,
                y: expandedIndex === index ? 0 : -20,
                padding: expandedIndex === index ? '1rem' : 0,
                transition: { duration: 0.5, ease: 'easeInOut' },
              }}
              style={{
               color:"#1C1C26",
                backgroundColor: '#fff',
                borderRadius: '8px',
                marginTop: '.5rem', 
                overflow: 'hidden',
marginBottom:'1rem',

              }}
            >
              <Typography variant="body2" sx={{ fontSize: '0.85rem', color: "#1C1C26" }}>
                {faq.answer}
              </Typography>
            </motion.div>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Faq;
