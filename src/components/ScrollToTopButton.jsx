import React, { useState, useEffect } from 'react';
import { Box, Zoom } from '@mui/material';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    setVisible(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <Box
        onClick={scrollToTop}
        aria-label="scroll to top"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 92,
          zIndex: 999,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 30,
          width: 30,
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          boxShadow: 3,
          transition: 'background-color 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: 'orange',
          },
        }}
      >
        <Box
          sx={{
            mt: '6px',
            height: 12,
            width: 12,
            borderTop: '2px solid white',
            borderLeft: '2px solid white',
            transform: 'rotate(45deg)',
          }}
        />
      </Box>
    </Zoom>
  );
};

export default ScrollToTopButton;
