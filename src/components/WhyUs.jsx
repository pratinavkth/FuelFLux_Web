import React from 'react';
import { Box, Typography, Container, Grid, Avatar, Stack } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import MapIcon from '@mui/icons-material/Map';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import featureImage from '../assets/orange.png';

const features = [
  {
    icon: <SecurityIcon fontSize="large" sx={{color: 'black'}} />,
    title: 'Secure and Trusted',
    description: 'No hidden charges, most transparent.',
  },
  {
    icon: <MapIcon fontSize="large" sx={{color: 'black'}} />,
    title: 'Wide coverage',
    description: 'Able to access all the stations nearby.',
  },
  {
    icon: <FlashOnIcon fontSize="large" sx={{color: 'black'}} />,
    title: 'Lightning fast',
    description: 'Get your booking done within few clicks.',
  },
  {
    icon: <ScheduleIcon fontSize="large" sx={{color: 'black'}} />,
    title: 'Schedule',
    description: 'Easily schedule gas fill-up on any station.',
  },
];

const WhyUs = () => {
  return (
    <Box sx={{ py: 10, px: 2, backgroundColor: '#f9f9f9', borderTopLeftRadius: { xs: 32, md: 64 }, borderTopRightRadius: { xs: 32, md: 64 }, overflow: 'hidden' }}>
      <Container disableGutters>
        <Grid container spacing={10} alignItems="flex-start" justifyContent="center">

            {/* Text on the left */}
            <Grid item xs={12} md={5} sx={{textAlign: { xs: 'center', md: 'left' }, mt:{ xs: -2, md: 10}}}>
                <Typography 
                    variant="caption" 
                    sx={{
                        color: 'gray',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        position: 'relative',
                        display: 'inline-block',
                        mx: 'auto',
                        fontFamily: 'Josefin Sans, sans-serif',
                        fontSize: { xs: '2rem', md: '1.5rem' },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bottom: -4,
                            width: '100%',
                            height: '3px',
                            backgroundColor: 'orange',
                            borderRadius: '1px',
                        },
                    }}
                >
                    Why Fuel Flux?
                </Typography>

                <Typography
                    variant="h1"
                    sx={{ mt: 4, fontWeight: 'bold', fontSize: { xs: '3.5rem', md: '2.5rem' }, fontFamily: 'Josefin Sans, sans-serif', color:'black' }}
                >
                    We are the fuel pre <br /> slot booking application
                </Typography>

                <Typography
                    sx={{ mt: 4, color: 'gray', fontSize: { xs: '2rem', md: '1.3rem' }, fontFamily: 'Josefin Sans, sans-serif' }}
                >
                    Fast, flexible and reliable fuel booking across the city
                </Typography>
            </Grid>

            {/* Image on the right */}
            <Grid item xs={12} md={7}  sx={{display: 'flex', justifyContent: { xs: 'center', md: 'flex-end'}, mt: { xs: 1, md: 0 }}}>
                <Box
                  component="img"
                  src={featureImage}
                  alt="fuel delivery"
                  sx={{
                    width: { xs: '700px', md: '600px' },
                    mt: '-6rem',
                    filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.2))',
                  }}
                />
            </Grid>
        </Grid>

        {/* Feature Icons */}
        <Grid container spacing={5} mt={2} justifyContent="center">
          {features.map((feature, index) => (
            <Grid key={index} item xs={12} sm={6} md={3} textAlign="center">
              <Stack alignItems="center" spacing={1}>
                <Avatar
                  sx={{
                    bgcolor: 'orange',
                    width: 66,
                    height: 66,
                    border: '2px solid black',
                }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="subtitle1" fontWeight="bold" sx={{fontFamily: 'Josefin Sans, sans-serif', fontSize: 20, color: 'black' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{fontFamily: 'Josefin Sans, sans-serif', fontSize: 15, color: 'gray' }}>
                  {feature.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyUs;
