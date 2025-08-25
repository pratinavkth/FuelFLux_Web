import { Box, Container, Grid, Typography } from '@mui/material';
import aboutImage from '/src/assets/about.svg';

const AboutUs = () => {
  return (
    <Box sx={{ py: 10, px: 2, backgroundColor: 'white', borderTopLeftRadius: { xs: 32, md: 64 }, borderTopRightRadius: { xs: 32, md: 64 }, overflow: 'hidden' }}>
        <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center" justifyContent="center" sx={{mt: 2, mb: 8}}>

                {/* Image on Left */}
                <Grid item xs={12} md={5}  sx={{display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Box
                        component="img"
                        src={aboutImage}
                        alt="About Us Illustration"
                        sx={{
                            width: { xs: '700px', md: '500px' },
                            maxWidth: '600px',
                            height: 'auto',
                        }}
                    />
                </Grid>

                {/* Text on Right */}
                <Grid 
                    item
                    xs={12} 
                    md={7}
                >
                    <Box sx={{ 
                        textAlign: { xs: 'center', md: 'center' },
                        maxWidth: '600px',
                        mt: -4,
                        mx: { xs: 'auto', md: 0 }, 
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'orange',
                                fontWeight: 'bold',
                                position: 'relative',
                                display: 'inline-block',
                                fontFamily: 'Josefin Sans, sans-serif',
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    bottom: -4,
                                    width: '100%',
                                    height: '3px',
                                    backgroundColor: 'black',
                                    borderRadius: '1px',
                                },
                            }}
                        >
                            About Us
                        </Typography>
                        <Typography
                            sx={{
                            mt: 4,
                            color: 'black',
                            fontSize: { xs: '1.3rem', md: '1.2rem' },
                            fontFamily: 'Josefin Sans, sans-serif',
                            textAlign: { xs: 'center', md: 'justify' },
                            lineHeight: 1.6,
                            }}
                        >
                            Fuel Flux is an innovative startup transforming how people fuel their vehicles.
                            With a focus on convenience and efficiency, we offer on-demand refuelling services
                            through a user-friendly mobile app. Vehicle owners can easily schedule and manage
                            fuel booking by application (pre booking slot), eliminating the need for long queues
                            and inconvenient fuelling stations.
                        </Typography>
                        <Typography
                            sx={{
                            mt: 2,
                            color: 'black',
                            fontSize: { xs: '1.3rem', md: '1.2rem' },
                            fontFamily: 'Josefin Sans, sans-serif',
                            textAlign: { xs: 'center', md: 'justify' },
                            lineHeight: 1.6,
                            }}
                        >
                            Our mission is to provide a reliable, eco-friendly alternative to traditional
                            refuelling methods, saving customers valuable time while enhancing their overall
                            experience. Committed to sustainability, Fuel Flux promotes energy-efficient solutions while
                            ensuring top-tier customer satisfaction, making refuelling seamless and stress-free.
                            We also provide AI models for the automation of stations.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
  );
};

export default AboutUs;
