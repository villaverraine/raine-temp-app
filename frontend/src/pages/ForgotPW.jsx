import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Avatar,
  Link,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [identifier, setIdentifier] = useState(''); // accepts email or username
  const [error, setError] = useState(null); // State to handle error messages
  const [success, setSuccess] = useState(false); // State for success message
  const navigate = useNavigate();

  const isValidEmail = (email) => { // Validates the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the identifier is a valid email
    if (!isValidEmail(identifier)) {
      setError('Please enter a valid email address.');
      return;
    }

    axios.post('http://127.0.0.1:3001/api/check-email', { email: identifier })
      .then(res => {
        setSuccess(true);
        setError(null);
        console.log('Email found:', res.data);
        navigate('/resetPW');
      })
      .catch(err => {
        setSuccess(false);
        setError(err.response?.data?.message || 'Email not found. Please try again.');
        console.error('Forgot Password error:', err);
      });
  };

  return (
    <>
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
          Email verified! Redirecting...
        </Alert>
      )}

      <TextField
        label="Email Address"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'black', color: 'white', mb: 1.5 }}
          onClick={handleSubmit}
          fullWidth
        >
          SEND EMAIL
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#BDBDBD', color: 'white', mt: 4 }}
          href="/register"
          fullWidth
        >
          CANCEL
        </Button>
      </Box>
    </>
  );
}