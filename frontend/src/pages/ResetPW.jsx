import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Avatar,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function App() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null); // State to handle error messages
  const [success, setSuccess] = useState(false); // State for success message
  const navigate = useNavigate(); // Initialize navigate for routing

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    axios.post('http://127.0.0.1:3001/api/reset-password', { password })
      .then(res => {
        setSuccess(true);
        setError(null);
        console.log('Password reset successful:', res.data);

        // Redirect to the sign-up page after successful reset
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Delay to show success message
      })
      .catch(err => {
        setSuccess(false);
        setError(err.response?.data?.message || 'Password reset failed. Please try again.');
        console.error('Password reset error:', err);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  
    return (
      <>
        <Typography variant="h6" component="h2" gutterBottom>
          RESET PASSWORD
        </Typography>
  
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            alt="Profile Picture"
            src="https://via.placeholder.com/100" // Placeholder URL | replace with actual image URL
            sx={{ width: 100, height: 100 }}
          />
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
  
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Password reset successful! Redirecting...
          </Alert>
        )}
        
        <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

  
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            sx={{ backgroundColor: 'black', color: 'white', mb: 1.5 }}
            onClick={handleSubmit}
            fullWidth
          >
            SAVE
          </Button>
        
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 8 }}>
            
          </Box>
          
        </Box>
      </>
    );
  }
  