import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const teamMembers = [
  {
    name: "Ankit Rai",
    designation: "Founder & CEO",
    photo: "/ankit.jpg",
    linkedin: "https://www.linkedin.com/in/ankit-rai-627464217/",
    instagram: "https://www.instagram.com/mr_rai544/",
  },
  {
    name: "Harsh Parmar",
    designation: "CTO",
    photo: "/harsh.jpeg",
    linkedin: "https://www.linkedin.com/in/harsh308050/",
    instagram: "https://www.instagram.com/harsh308050/",
  },
];

const TeamSection = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        mt: -6,
        mb: 4,
        background: 'orange',
        borderTopLeftRadius: { xs: 32, md: 64 },
        borderTopRightRadius: { xs: 32, md: 64 },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography
            variant="caption"
            component="h2"
            gutterBottom
            sx={{
              color: 'black',
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
                width: '110%',
                height: '3px',
                backgroundColor: 'white',
                borderRadius: '1px',
              },
            }}
          >
            Meet Our Team
          </Typography>
          <Typography
            variant="h6" 
            color="white" 
            sx={{
                fontFamily: 'Josefin Sans, sans-serif', 
                fontSize: { xs: '1.5rem', md: '1.5rem' },
                mt: 1
            }} 
            mb={3}
          >
            Our passionate team is committed to delivering the best service and innovation.
          </Typography>
        </Box>

        <Grid container spacing={5} justifyContent="center">
          {teamMembers.map(
            ({ name, designation, photo, linkedin, instagram}, index) => {
              const isEven = index % 2 === 0; // even index = photo left, odd index = photo right
              return (
                <Grid item xs={12} key={index}>
                  <Card
                    elevation={6}
                    sx={{
                    textAlign: 'center',
                    borderRadius: 4,
                    p: 3,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: "2px solid black",
                    boxShadow:
                      '0px 4px 15px rgba(0,0,0,0.1), 0 0 10px rgba(255, 200, 0, 0.2)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow:
                        '0px 8px 25px rgba(0,0,0,0.2), 0 0 15px rgba(255, 255, 255, 0.4)',
                    },
                    cursor: 'default',
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      spacing={4}
                      direction={isEven ? 'row' : 'row-reverse'}
                    >
                      
                      {/* Photo */}
                      <Grid item xs={12} sm={4} md={3}>
                        <CardMedia
                          component="img"
                          image={photo}
                          alt={name}
                          sx={{
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            boxShadow: '0 0 12px rgba(255, 255, 255, 0.8)',
                            transition: 'box-shadow 0.3s ease',
                            mx: 'auto',
                          }}
                        />
                      </Grid>

                      {/* Text content */}
                      <Grid item xs={12} sm={8} md={9} sx={{ textAlign: 'center', justifyItems: 'center', mt: 4 }}>
                        <CardContent sx={{ padding: 0 }}>
                          <Typography
                            variant="h6"
                            component="p"
                            fontWeight={700}
                            color="#222"
                            sx={{ fontFamily: 'Josefin Sans, sans-serif' }}
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2, fontFamily: 'Josefin Sans, sans-serif' }}
                          >
                            {designation}
                          </Typography>
                          <Box>
                            {linkedin && (
                              <Tooltip title="LinkedIn" arrow>
                                <IconButton
                                  href={linkedin}
                                  target="_blank"
                                  rel="noopener"
                                  sx={{ color: '#0A66C2', mt: -2, mb: -2 }}
                                >
                                  <LinkedInIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            {instagram && (
                              <Tooltip title="Instagram" arrow>
                                <IconButton
                                  href={instagram}
                                  target="_blank"
                                  rel="noopener"
                                  sx={{ color: '#E1306C', mt: -2, mb: -2 }}
                                >
                                  <InstagramIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            }
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamSection;
