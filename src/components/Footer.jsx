import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import logo from '/src/assets/full-logo.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#121212',
        color: '#fff',
        py: { xs: 6, md: 10 },
        borderTop: '4px solid #FF6600',
        fontFamily: "'Josefin Sans', sans-serif",
        userSelect: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="flex-start" justifyContent={{ xs: 'center', md: 'space-between' }} sx={{ mb: -4, mt: { xs: -2, md: -5 } }}>

          {/* Logo + Quote + Socials */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              mx: { xs: 12, md: 4}
            }}
          >
            <Box
              sx={{
                backgroundColor: '#fff',
                padding: '6px 12px',
                borderRadius: 4,
                display: 'inline-block',
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Fuel Flux Logo"
                sx={{ width: 140, height: 'auto' }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontStyle: 'italic',
                opacity: 0.8,
                maxWidth: 280,
                lineHeight: 1.5,
                fontWeight: 600,
                mt: -1,
                color: '#FF6600',
              }}
            >
              “Fueling the future with <br /> convenience and care.”
            </Typography>
            <Box sx={{ mt: -2.5 }}>
              {[{
                href: "https://www.instagram.com/fuelflux.in/",
                label: "Instagram",
                icon: <InstagramIcon />,
              },{
                href: "https://in.linkedin.com/company/fuel-flux-technology",
                label: "LinkedIn",
                icon: <LinkedInIcon />,
              }].map(({href, label, icon}) => (
                <IconButton
                  key={label}
                  href={href}
                  aria-label={label}
                  size="large"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#fff',
                    mr: 1.5,
                    transition: 'transform 0.3s ease, color 0.3s ease',
                    '&:hover': {
                      color: '#FF6600',
                      transform: 'scale(1.2)',
                      boxShadow: '0 4px 12px rgba(255, 102, 0, 0.6)',
                    },
                  }}
                >
                  {icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: 'center', md: 'center' }, mx: { xs: 12, md: 4 }, mt: {xs: -2, md: 0} }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 700, color: '#FF6600', mb: 3 }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about-us' },
                { label: 'Services', href: '#services' },
                { label: 'FAQ', href: '#faq' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  underline="hover"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: '#fff',
                    transition: 'color 0.3s ease',
                    '&:hover': { color: '#FF6600' },
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: 'center', md: 'left' }, mt: {xs: -2, md: 0} }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 700, color: '#FF6600', mb: 3 }}
            >
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.85, mb: 1 }}>
              Email :{' '}
              <Link
                href="mailto:mpankitrai557@gmail.com"
                underline="hover"
                sx={{ color: '#fff', '&:hover': { color: '#FF6600' } }}
              >
                mpankitrai557@gmail.com
              </Link>
            </Typography>
            {/* <Typography variant="body1" sx={{ opacity: 0.85 }}>
              Phone:{' '}
              <Link
                href="tel:+1234567890"
                underline="hover"
                sx={{ color: '#fff', '&:hover': { color: '#FF6600' } }}
              >
                +1 (234) 567-890
              </Link>
            </Typography> */}
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid #FF6600',
            mt: 8,
            mb: 4,
            opacity: 0.3,
          }}
        />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: '#ccc', fontSize: '0.9rem', fontWeight: 500, mb: { xs: -4, md: -6 } }}
        >
          &copy; {new Date().getFullYear()} All rights reserved by Fuel Flux Technology.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
