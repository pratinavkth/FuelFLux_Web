import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Container, Snackbar, Alert, AlertTitle } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay, faApple } from '@fortawesome/free-brands-svg-icons';
import logo from '/src/assets/mini-logo.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = (platform) => {
    setMessage(`${platform} app is a work in progress!`);
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };
  
  return (
    <Box sx={{ 
        position: 'relative',
        background: 'orange', 
        py: 10, 
        px: 2, 
        pt: 13,
        pb: 4,
        color: 'black' 
    }}>

    {/* Gradient overlay at the top */}
    <Box
        sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'white',
        zIndex: 0,
        }}
    />

    {/* HeroSection content */}
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
        <Button
          component="a"
          href="https://my-landing-page-ui.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          endIcon={<ArrowForwardIcon sx={{mx: 0.5}}/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            borderWidth: 3,
            px: 2,
            py: 1,
            borderRadius: '30px',
            textTransform: 'none',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            '&:hover': {
              backgroundColor: 'white',
              color: '#000',
              borderColor: 'black',
              transform: 'scale(1.05)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            },
            display: 'flex',
            alignItems: 'center',
            '& .MuiButton-endIcon svg': {
                    color: 'white',
                    stroke: 'white',
                    strokeWidth: 2.5,
                  },
                  '&:hover .MuiButton-endIcon svg': {
                    color: 'black',
                    stroke: 'black',
                    strokeWidth: 2.5,
                  },
          }}
        >
          <img src={logo} alt="Fuel Flux" style={{ width: 30, height: 30, marginRight: 8 }} />
          <Box textAlign="left" lineHeight={1.2}>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 18 }}
            >
              Visit Fuel Flux
            </Typography>
          </Box>
        </Button>
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Josefin Sans, sans-serif',
            fontWeight: 'bold',
            fontSize: 80,
            mb: 5,
            mt: 5,
          }}
        >
          Your On-Demand <br /> Fuel Booking Service
        </Typography>

        <Typography 
            variant="h6" 
            sx={{ 
                color: 'white', 
                mb: 6, 
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize:20, 
            }}
        >
          Whether you're at home, at work, or on the go, Fuel Flux ensures you
          never run out of fuel.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={5}
          justifyContent="center"
          alignItems="center"
        >

          {/* Google Play Button */}
            <Button
                variant="outlined"
                onClick={() => handleClick('Google Play')}
                sx={{
                color: 'White',
                borderColor: 'white',
                borderWidth: 3,
                px: 4,
                py: 2,
                borderRadius: '30px',
                textTransform: 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                    backgroundColor: 'white',
                    color: '#000',
                    borderColor: 'black',
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                },
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                }}
                startIcon={<FontAwesomeIcon icon={faGooglePlay} style={{ fontSize: '40px' }} />}
            >
                <Box textAlign="left" lineHeight={1.2}>
                <Typography variant="caption" display="block" sx={{fontFamily: 'Josefin Sans, sans-serif', fontWeight: 'bold'}}>
                    GET IT ON
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{fontFamily: 'Josefin Sans, sans-serif', fontSize: 16}}>
                    Google Play
                </Typography>
                </Box>
            </Button>
        
            {/* App Store Button */}
            <Button
                variant="outlined"
                onClick={() => handleClick('App Store')}
                sx={{
                color: 'white',
                borderColor: 'white',
                borderWidth: 3,
                px: 2.5,
                py: 2,
                borderRadius: '30px',
                textTransform: 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                    color: '#000',
                    borderColor: 'black',
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                },
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                }}
                startIcon={<FontAwesomeIcon icon={faApple} style={{ fontSize: '40px' }} />}
            >
                <Box textAlign="left" lineHeight={1.2}>
                <Typography variant="caption" display="block" sx={{fontFamily: 'Josefin Sans, sans-serif', fontWeight: 'bold'}}>
                    DOWNLOAD ON THE
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{fontFamily: 'Josefin Sans, sans-serif', fontSize: 16}}>
                    App Store
                </Typography>
                </Box>
            </Button>
        </Stack>
      </Container>
      <Snackbar 
          open={open} 
          autoHideDuration={3000} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="info" variant='filled' sx={{ width: '100%', fontFamily: 'Josefin Sans, sans-serif' }}>
            <AlertTitle sx={{fontFamily: 'Josefin Sans, sans-serif', fontWeight: 'bold'}}>Info</AlertTitle>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default HeroSection;
