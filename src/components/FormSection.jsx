import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_2fcvqk4';
const TEMPLATE_ID_PERSONAL = 'template_0b18lhe';
const TEMPLATE_ID_BUSINESS = 'template_ycxdr7r';
const PUBLIC_KEY = 'HQKN5RwbpIlfARZNO';

const FormSection = () => {
  const [openDialogId, setOpenDialogId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const [personalForm, setPersonalForm] = useState({
    name: '',
    email: '',
    phone: '',
    feedback: ''
  });

  const [businessForm, setBusinessForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    inquiryDetails: ''
  });

  // Validation error states
  const [personalErrors, setPersonalErrors] = useState({});
  const [businessErrors, setBusinessErrors] = useState({});

  // Opeb dialog handler
  const handleOpen = (id) => {
    setOpenDialogId(id);
    setPersonalErrors({});
    setBusinessErrors({});
  };

  const handleClose = () => setOpenDialogId(null);

  const validateField = (field, value, formType) => {
    let error = '';
    if (!value.trim()) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    } else {
      if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
        error = 'Invalid email format';
      } else if (field === 'phone' && !/^\d{10}$/.test(value)) {
        error = 'Must be exactly 10 digits';
      } else if (field === 'name' && !/^[a-zA-Z\s]+$/.test(value)) {
        error = 'Only letters and spaces allowed';
      }
    }

    if (formType === 'personal') {
      setPersonalErrors(prev => ({ ...prev, [field]: error }));
    } else {
      setBusinessErrors(prev => ({ ...prev, [field]: error }));
    }

    return error === '';
  };

  const handleChange = (field, value) => {
    if (field === 'phone') value = value.replace(/\D/g, '').slice(0, 10);
    if (openDialogId === 1) {
      setPersonalForm(prev => ({ ...prev, [field]: value }));
      validateField(field, value, 'personal');
    } else {
      setBusinessForm(prev => ({ ...prev, [field]: value }));
      validateField(field, value, 'business');
    }
  };

  const validateForm = (formType) => {
    const form = formType === 'personal' ? personalForm : businessForm;
    const requiredFields = Object.keys(form);
    let valid = true;
    requiredFields.forEach(field => {
      const isValid = validateField(field, form[field], formType);
      if (!isValid) valid = false;
    });
    return valid;
  };

  const handleSubmit = () => {
    if (openDialogId === 1) {
      if (!validateForm('personal')) return;
      emailjs.send(SERVICE_ID, TEMPLATE_ID_PERSONAL, personalForm, PUBLIC_KEY)
        .then(() => {
          showSnackbar('Personal inquiry sent successfully!', 'success');
          setPersonalForm({ name: '', email: '', phone: '', feedback: '' });
          handleClose();
        }).catch(err => showSnackbar('Failed to send: ' + err.text, 'error'));
    } else if (openDialogId === 2) {
      if (!validateForm('business')) return;
      emailjs.send(SERVICE_ID, TEMPLATE_ID_BUSINESS, businessForm, PUBLIC_KEY)
        .then(() => {
          showSnackbar('Business inquiry sent successfully!', 'success');
          setBusinessForm({ name: '', email: '', phone: '', businessType: '', inquiryDetails: '' });
          handleClose();
        }).catch(err => showSnackbar('Failed to send: ' + err.text, 'error'));
    }
  };

  const cards = [
    {
      id: 1,
      title: 'For Personal',
      description: 'Moving over city ? Paying for fuel or bill in another city? You can book in 75+ fuel stations overcity anytime with ease.',
      buttonText: 'Personal',
    },
    {
      id: 2,
      title: 'For Business',
      description: 'Receive payment, pay staff, invoices or supplies. We can seamlessly integrate a solution for your business whenever you want to use it',
      buttonText: 'Business',
    }
  ];

  return (
    <Box 
      sx={{ 
        py: 10, 
        px: 2, 
        mt: -6,
        textAlign: 'center',
        backgroundColor: 'orange', 
        borderTopLeftRadius: { xs: 32, md: 64 }, 
        borderTopRightRadius: { xs: 32, md: 64 }, 
        overflow: 'hidden' 
      }}
    >

      {/* Heading */}
      <Typography variant="h3" fontWeight={700} sx={{fontFamily: 'Josefin Sans, sans-serif', fontWeight: 'bold', fontSize: { xs: '4rem', md: '5rem' }}} mb={4}>
        One app for all <br /> of your fuel payment
      </Typography>

      <Typography variant="h6" color="white" sx={{fontFamily: 'Josefin Sans, sans-serif', fontSize: { xs: '1.5rem', md: '1.5rem' },}} mb={3}>
        Manage all your fuel bookings and payments effortlessly in one place, saving you time and hassle with every refuel.
      </Typography>

      {/* two cards in same row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: { xs: 4, sm: 6, md: 10, lg: 16 },
          flexWrap: 'wrap',
          mt: 6,
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '24px',
              textAlign: 'center',
              p: 3,
              width: '400px',
              flexShrink: 0,
            }}
          >
            {/* Content for each card */}
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h4" sx={{ color: 'orange', fontWeight: 'bold', mb: 1, fontFamily: 'Josefin Sans, sans-serif' }}>
                {card.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'black', mb: 2, fontSize: '1rem', lineHeight: 1.6, fontFamily: 'Josefin Sans, sans-serif' }}
              >
                {card.description}
              </Typography>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon sx={{mx: 1}}/>}
                onClick={() => handleOpen(card.id)}
                sx={{
                  backgroundColor: 'orange',
                  color: '#000',
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize:'1.5rem',
                  px: 2,
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'orange',
                  },
                  '& .MuiButton-endIcon svg': {
                    color: '#000',
                    stroke: 'black',
                    strokeWidth: 2.5,
                  },
                  '&:hover .MuiButton-endIcon svg': {
                    color: 'orange',
                    stroke: 'orange',
                    strokeWidth: 2.5,
                  },
                  fontFamily: 'Josefin Sans, sans-serif'
                }}
              >
                {card.buttonText}
              </Button>
            </CardContent>

            {/* Dialog Form for each card */}
            <Dialog 
              open={!!openDialogId} 
              onClose={handleClose} 
              fullWidth 
              maxWidth="sm"
              PaperProps={{
                sx: {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  border: '1px solid rgba(0, 0, 0, 0.5)',
                  borderRadius: 4,
                  p: 2,
                },
              }}
            >
              <DialogTitle sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' }}>
                {openDialogId === 1 ? 'Personal Inquiry Form' : 'Business Inquiry Form'}
              </DialogTitle>
              <DialogContent>
                {openDialogId === 1 ? (
                  <>
                    <TextField
                      label="Full Name"
                      fullWidth
                      margin="normal"
                      variant="filled"
                      value={personalForm.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      error={!!personalErrors.name}
                      helperText={personalErrors.name}
                      InputProps={{ sx: { color: 'white', fontFamily: 'Josefin Sans, sans-serif' } }}
                      InputLabelProps={{ sx: { color: 'orange', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
                    />
                    <TextField
                      label="Email"
                      fullWidth
                      margin="normal"
                      variant="filled"
                      value={personalForm.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={!!personalErrors.email}
                      helperText={personalErrors.email}
                      InputProps={{ sx: { color: 'white', fontFamily: 'Josefin Sans, sans-serif' } }}
                      InputLabelProps={{ sx: { color: 'orange', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
                    />
                    <TextField
                      label="Phone"
                      fullWidth
                      margin="normal"
                      variant="filled"
                      value={personalForm.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      error={!!personalErrors.phone}
                      helperText={personalErrors.phone}
                      inputProps={{ maxLength: 10 }}
                      type="tel"
                      InputProps={{ sx: { color: 'white', fontFamily: 'Josefin Sans, sans-serif' } }}
                      InputLabelProps={{ sx: { color: 'orange', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
                    />
                    <TextField
                      label="Feedback"
                      fullWidth
                      margin="normal"
                      variant="filled"
                      multiline
                      rows={4}
                      value={personalForm.feedback}
                      onChange={(e) => handleChange('feedback', e.target.value)}
                      error={!!personalErrors.feedback}
                      helperText={personalErrors.feedback}
                      InputProps={{ sx: { color: 'white', fontFamily: 'Josefin Sans, sans-serif' } }}
                      InputLabelProps={{ sx: { color: 'orange', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      label="Full Name"
                      fullWidth
                      margin="normal"
                      variant="filled"
                      value={businessForm.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      error={!!businessErrors.name}
                      helperText={businessErrors.name}
                      InputProps={{ sx: { color: 'white', fontFamily: 'Josefin Sans, sans-serif' } }}
                      InputLabelProps={{ sx: { color: 'orange', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
                    />
                    <TextField
                      label="Email"
                      fullWidth
                      margin="normal"
                      variant="filled"
                      value={businessForm.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={!!businessErrors.email}
                      helperText={businessErrors.email}
                      InputProps={{ sx: { color: 'white', fontFamily: 'Josefin Sans, sans-serif' } }}
                      InputLabelProps={{ sx: { color: 'orange', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
                    />
                    <TextField
                      label="Contact Number"
                      fullWidth
                      margin="normal"
                      variant="filled"
                      value={businessForm.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      error={!!businessErrors.phone}
                      helperText={businessErrors.phone}
                      inputProps={{ maxLength: 10 }}
                      type="tel"
                      InputProps={{ sx: { color: 'white', fontFamily: 'Josefin Sans, sans-serif' } }}
                      InputLabelProps={{ sx: { color: 'orange', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
                    />
                    <TextField
                      label="Business Type"
                      fullWidth
                      margin="normal"
                      variant="filled"
                      value={businessForm.businessType}
                      onChange={(e) => handleChange('businessType', e.target.value)}
                      error={!!businessErrors.businessType}
                      helperText={businessErrors.businessType}
                      InputProps={{ sx: { color: 'white', fontFamily: 'Josefin Sans, sans-serif' } }}
                      InputLabelProps={{ sx: { color: 'orange', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
                    />
                    <TextField
                      label="Inquiry Details"
                      fullWidth
                      margin="normal"
                      variant="filled"
                      multiline
                      rows={4}
                      value={businessForm.inquiryDetails}
                      onChange={(e) => handleChange('inquiryDetails', e.target.value)}
                      error={!!businessErrors.inquiryDetails}
                      helperText={businessErrors.inquiryDetails}
                      InputProps={{ sx: { color: 'white', fontFamily: 'Josefin Sans, sans-serif' } }}
                      InputLabelProps={{ sx: { color: 'orange', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
                    />
                  </>
                )}
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2, mt: 1 }}>
                <Button 
                  onClick={handleClose}
                  sx={{
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    // backdropFilter: 'blur(8px)',
                    // WebkitBackdropFilter: 'blur(8px)',
                    borderRadius: '20px',
                    px: 2,
                    py: 0.5,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    fontFamily: 'Josefin Sans, sans-serif',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  variant="contained"
                  sx={{
                    color: 'black',
                    backgroundColor: 'orange',
                    borderRadius: '30px',
                    px: 2,
                    py: 0.5,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontFamily: 'Josefin Sans, sans-serif',
                    boxShadow: '0 4px 20px rgba(255, 165, 0, 0.4)',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: 'orange',
                      boxShadow: '0 6px 24px rgba(255, 165, 0, 0.5)',
                    },
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        ))}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormSection;
