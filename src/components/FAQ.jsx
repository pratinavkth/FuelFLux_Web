import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const faqs = [
  {
    question: "How do I register a Payment personal account?",
    answer: "Simply download the app, create an account, enter your delivery location, select the type and amount of fuel you need, and place your order. Our delivery team will bring the fuel directly to you. We will work to resolve the problem as quickly as possible."
  },
  {
    question: "What if I need to cancel or modify my order?",
    answer: "You can simply log in to the app and select the cancel option from settings. To modify, you can easily do it from there as well, and it will take only a few steps."
  },
  {
    question: "What types of fuel can I order?",
    answer: "You can order a variety of fuels, including Petrol, Diesel, CNG, H2, LNG and more."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major payment methods, including net banking, card payments, cash, and UPI."
  }
];

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  return (
    <Box sx={{ py: 8, px: 2, mt: -1, pb: 16, backgroundColor: 'white', borderTopLeftRadius: { xs: 32, md: 64 }, borderTopRightRadius: { xs: 32, md: 64 }, overflow: 'hidden' }}>
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography
            variant="caption"
            sx={{
              color: 'orange',
              position: 'relative',
              display: 'inline-block',
              mb: 4,
              fontWeight: 'bold',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: { xs: '2rem', md: '2.5rem' },
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: -1,
                width: '90%',
                height: '3px',
                backgroundColor: 'black',
                borderRadius: '1px',
              },
            }}
          >
            FAQ
          </Typography>

          <Typography variant="h4" sx={{ fontFamily: 'Josefin Sans, sans-serif' }} fontWeight={600} gutterBottom>
            Common Questions
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, mt: 3, color: 'orange', fontFamily: 'Josefin Sans, sans-serif', fontWeight: 'bold' }}>
            Find answers to frequently asked questions below. If you still need help, contact support.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 5 }}>
            <HelpOutlineIcon fontSize="medium" sx={{color: 'black'}}/>
            <Typography variant="subtitle1" sx={{ color: 'black', fontFamily: 'Josefin Sans, sans-serif' }}>Need further support?</Typography>
          </Box>
        </Box>

        {/* FAQ Grid */}
        <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
        >
            {faqs.map((faq, index) => (
                <Grid
                    item
                    xs={12}
                    md={6}
                    key={index}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                    }}
                >
                <Paper
                    elevation={3}
                    sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    border: "2px solid black",
                    '&:hover': {
                      borderColor: 'orange',
                      boxShadow: 4,
                    }
                    }}
                >
                <Accordion
                    disableGutters
                    expanded={expandedIndex === index}
                    onChange={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    sx={{
                        backgroundColor: "white",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",   // fill Paper height
                    }}
                >
                <AccordionSummary
                    expandIcon={
                        <Box sx={{ padding: 0.5 }}>
                            <ExpandMoreIcon sx={{ color: "black" }} />
                        </Box>
                    }
                >
                  <Typography fontWeight={600} sx={{ color: "black", fontFamily: 'Josefin Sans, sans-serif' }}>
                      {faq.question}
                  </Typography>
                </AccordionSummary>
                <Divider sx={{ mx: 2, my: 1, borderColor: '#e0e0e0' }} />
                <AccordionDetails
                  sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                  }}
                >
                  <Typography
                      variant="body2"
                      sx={{ textAlign: "left", fontFamily: 'Josefin Sans, sans-serif', color: 'gray' }}
                  >
                      {faq.answer}
                  </Typography>
                </AccordionDetails>
                </Accordion>
                </Paper>
                </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQSection;
