import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Divider,
  useTheme,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';

const packages = [
  {
    name: 'Silver',
    color: '#757575',
    border: '2px solid transparent',
    features: [
      'Smoke and Fire detection',
      'Number plate detection system',
    ],
  },
  {
    name: 'Golden',
    color: 'orange',
    border: '2px solid transparent',
    features: [
      'All silver features',
      'Billing system',
      'Vehicle verification',
      'Station vehicle data',
    ],
  },
  {
    name: 'Platinum',
    color: '#757575',
    border: '2px solid transparent',
    features: [
      'All silver & Golden features',
      'Real-time data hour wise',
      'Employee working monitoring',
      'Working method analysis',
      'Hydrotesting system',
    ],
  },
];

const ServiceSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 10, px: 2, mt: -8, backgroundColor: 'orange', borderTopLeftRadius: { xs: 32, md: 64 }, borderTopRightRadius: { xs: 32, md: 64 }, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'Josefin Sans, sans-serif',
              position: 'relative',
              display: 'inline-block',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 4,
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: -4,
                width: '110%',
                height: '4px',
                backgroundColor: 'black',
                borderRadius: 2,
              },
            }}
          >
            Services
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: 'black',
              fontWeight: 'bold',
              fontFamily: 'Josefin Sans, sans-serif',
            }}
          >
            Our Packages
          </Typography>
          <Typography
            variant="h6" 
            color="white" 
            sx={{
                fontFamily: 'Josefin Sans, sans-serif', 
                fontSize: { xs: '1.5rem', md: '1.5rem' },
                mt: 3
            }} 
            mb={3}
            >
            Choose from our three tailored plans to suit your business needs – whether you’re starting out,
            scaling up, or managing a large operation. Each package includes critical features for safety,
            tracking, and analytics.
            </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {packages.map((pkg, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
              <Card
                elevation={5}
                sx={{
                  height: '100%',
                  border: pkg.border,
                  boxSizing: 'border-box',
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  alignItems: 'stretch',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: `0 8px 24px rgba(0,0,0,0.15)`,
                  },
                }}
              >
                <CardContent sx={{ px: 4, py: 3, textAlign: 'center', mb: -2 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      color: pkg.color,
                      mb: 3,
                      fontFamily: 'Josefin Sans, sans-serif',
                    }}
                  >
                    {pkg.name}
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mx: 5 }}>
                    {pkg.features.map((feature, i) => (
                      <Box
                        key={i}
                        component="li"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          gap: 1.5,
                          mb: 2,
                          color: theme.palette.text.primary,
                        }}
                      >
                        <CheckIcon sx={{ color: 'green' }} fontSize="small" />
                        <Typography variant="body2" sx={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 'medium' }}>{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServiceSection;
