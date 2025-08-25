import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

export default function AuthModal({ open, handleClose, setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (open) {
      setEmail('');
      setPassword('');
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const savedUser = JSON.parse(localStorage.getItem("credentials"));
      if (savedUser?.email === email && savedUser?.password === password) {
        alert("Login successful!");
        localStorage.setItem("user", email);
        setUser(email);
        handleClose();
      } else {
        alert("Invalid credentials!");
      }
    } else {
      localStorage.setItem("credentials", JSON.stringify({ email, password }));
      alert("Signup successful! You can now log in.");
      setIsLogin(true);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(0, 0, 0, 0.5)',
          borderRadius: 4,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' }}>
        {isLogin ? "Login" : "Sign Up"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-email"
            InputProps={{ sx: { color: 'white', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
            InputLabelProps={{ sx: { color: 'gray', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            InputProps={{ 
              sx: { color: 'white', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={togglePasswordVisibility} 
                    edge="end" 
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            InputLabelProps={{ sx: { color: 'gray', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' } }}
          />
        </Box>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, fontFamily: 'Josefin Sans, sans-serif' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          
          <Button 
            onClick={() => setIsLogin(!isLogin)} 
            size="small" 
            sx={{ textTransform: 'none', fontWeight: 'bold', fontFamily: 'Josefin Sans, sans-serif' }}
          >
            {isLogin ? "Sign up" : "Log in"}
          </Button>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            background: 'linear-gradient(135deg, #FF8C00, #FFA500)',
            color: 'white',
            borderRadius: '999px',
            px: 4,
            py: 1,
            fontWeight: 'bold',
            textTransform: 'none',
            fontFamily: 'Josefin Sans, sans-serif',
            boxShadow: '0 6px 12px rgba(255, 140, 0, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
              boxShadow: '0 8px 18px rgba(255, 140, 0, 0.4)',
            },
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
