import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '/src/assets/full-logo.png';
import LoginIcon from '@mui/icons-material/Login';

const pages = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about-us' },
  { label: 'Services', id: 'services' },
  { label: 'FAQ', id: 'faq'}
];

function ResponsiveAppBar({ activeSection, setActiveSection, onLoginClick, user, onLogout }) {
  // const [activeSection, setActiveSection] = React.useState('home');
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  React.useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const navbarSectionIds = pages.map(page => page.id); // ['home', 'features', ...]

    const observer = new IntersectionObserver(
      entries => {
        let visibleNavbarSections = entries
          .filter(entry => entry.isIntersecting && navbarSectionIds.includes(entry.target.id))
          .map(entry => entry.target.id);

        if (visibleNavbarSections.length > 0) {
          setActiveSection(visibleNavbarSections[0]);
        } else {
          const scrollPosition = window.scrollY;

          const sectionsAbove = sections
            .filter(sec => sec.offsetTop < scrollPosition)
            .map(sec => sec.id);

          const lastNavbarAbove = [...sectionsAbove].reverse().find(id => navbarSectionIds.includes(id));

          // if (lastNavbarAbove) {
          //   setActiveSection(lastNavbarAbove);
          // } else {
          //   setActiveSection(null); // no section active
          // }
          setActiveSection(lastNavbarAbove ?? null);
        }
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => observer.observe(section));
    return () => sections.forEach(section => observer.unobserve(section));
  }, [setActiveSection]);

  const handleClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id); // updates immediately on click
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar 
        position="fixed"
        sx={{
            backgroundColor: 'white',
            // backdropFilter: 'blur(12px)',
            // WebkitBackdropFilter: 'blur(12px)',
            // boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            color: 'white',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            width: '100vw',
            left: 0,
            right: 0,
        }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ width: '100%', justifyContent: 'space-between' }}>

          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              height: 50,
              marginLeft: 40,
              marginRight: 30,
              cursor: 'pointer',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          />

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{color: 'black'}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
              PaperProps={{
                sx: {
                    // backgroundColor: 'rgba(0, 0, 0, 0.15)',
                    // backdropFilter: 'blur(12px)',
                    // WebkitBackdropFilter: 'blur(12px)',
                    backgroundColor: 'white',
                    borderRadius: 3,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    color: 'white',  
                },
            }}
            >
              {pages.map((page) => (
                <MenuItem
                    key={page.label}
                    onClick={() => {
                      handleClick(page.id); 
                      handleCloseNavMenu();
                    }}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      },
                    }}
                >
                  <Typography 
                    sx={{ 
                      textAlign: 'center', 
                      fontFamily: 'Josefin Sans, sans-serif',
                      justifyItems: 'center', 
                      color: activeSection === page.id ? 'orange' : 'black',
                      fontWeight: activeSection === page.id ? 'bold' : 'normal',
                    }}>
                      {page.label}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem
                sx={{
                  justifyContent: 'center',
                  mt: 1,
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                {user ? (
                  <Button
                    variant="outlined"
                    onClick={onLogout}
                    sx={{
                      borderColor: 'orange',
                      color: 'orange',
                      borderRadius: '999px',
                      fontWeight: 'bold',
                      fontFamily: 'Josefin Sans, sans-serif',
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255,165,0)',
                        color: 'white',
                        borderColor: '#FFA500',
                      },
                    }}
                  >
                    Hi, {user.split('@')[0]}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={onLoginClick}
                    fullWidth
                    startIcon={<LoginIcon sx={{ fontSize: 18 }} />}
                    sx={{
                      background: 'linear-gradient(135deg, #FF8C00, #FFA500)',
                      color: 'white',
                      borderRadius: '999px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontFamily: 'Josefin Sans, sans-serif',
                      py: 0.5,
                      px: 1,
                      boxShadow: '0 6px 16px rgba(255, 140, 0, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
                        boxShadow: '0 8px 20px rgba(255, 140, 0, 0.5)',
                        transform: 'scale(1.03)',
                      },
                    }}
                  >
                    Login / Signup
                  </Button>
                )}
              </MenuItem>
            </Menu>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                gap: 7,
            }}
            >
            {pages.map((page) => (
                <Button
                key={page.label}
                onClick={() => handleClick(page.id)}
                sx={{
                    color: activeSection === page.id ? 'orange' : 'black',
                    fontWeight: activeSection === page.id ? 'bold' : 'normal',
                    borderTop: activeSection === page.id ? '3px solid orange' : 'none',
                    borderBottom: activeSection === page.id ? '3px solid orange' : 'none',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontSize: 20,
                    textTransform: 'none',
                    transition: 'all 0.1s ease-in-out',
                    '&:hover': {
                      color: 'orange',
                      borderTop: '3px solid orange',
                      borderBottom: '3px solid orange',
                    },
                }}
                >
                {page.label}
                </Button>
            ))}
          </Box>

          {/* Login/Signup Button */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {user ? (
              <Button
                variant="outlined"
                onClick={onLogout}
                sx={{
                  borderColor: 'orange',
                  color: 'orange',
                  textTransform: 'none',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontWeight: 'bold',
                  borderRadius: '999px',
                  px: 2,
                  py: 0.8,
                  minHeight: '32px',
                  fontSize: 13,
                  '&:hover': {
                    backgroundColor: 'rgba(255,165,0)',
                    color: 'white',
                    borderColor: '#FFA500',
                  },
                }}
              >
                Hi, {user.split('@')[0]}
              </Button>
            ) : (
              <Button
                onClick={onLoginClick}
                variant="contained"
                startIcon={<LoginIcon sx={{ fontSize: 18 }} />}
                sx={{
                  background: 'linear-gradient(135deg, #FF8C00, #FFA500)',
                  color: 'white',
                  textTransform: 'none',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontWeight: 'bold',
                  borderRadius: '999px',
                  px: 2,
                  py: 0.8,
                  minHeight: '32px',
                  fontSize: 13,
                  boxShadow: '0 6px 18px rgba(255, 140, 0, 0.4)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
                    boxShadow: '0 8px 24px rgba(255, 140, 0, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Login / Signup
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
