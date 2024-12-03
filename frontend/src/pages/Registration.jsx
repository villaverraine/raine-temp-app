import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const navigate = useNavigate(); // Navigation hook
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3001/api/register', {
        firstName,
        lastName,
        username,
        email,
        password,
        contactNumber,
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);

        setTimeout(() => {
          setSuccessMessage('');
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleDialogOpen = (contentType) => {
    setDialogOpen(true);
    switch (contentType) {
      case 'terms':
        setDialogContent('Terms content goes here.');
        break;
      case 'privacy':
        setDialogContent('Privacy Policy content goes here.');
        break;
      case 'cookies':
        setDialogContent('Cookies Policy content goes here.');
        break;
      default:
        setDialogContent('');
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        Register
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Avatar
          alt="Profile Picture"
          src="https://via.placeholder.com/100"
          sx={{ width: 100, height: 100 }}
        />
      </Box>

      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />

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

      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Contact Number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2, textAlign: 'center' }}>
          By signing up, you agree to our{' '}
          <Link href="#" underline="hover" onClick={() => handleDialogOpen('terms')}>Terms</Link>,{' '}
          <Link href="#" underline="hover" onClick={() => handleDialogOpen('privacy')}>Privacy Policy</Link>, and{' '}
          <Link href="#" underline="hover" onClick={() => handleDialogOpen('cookies')}>Cookies Policy</Link>.
        </Typography>

        <Button
          variant="contained"
          sx={{ backgroundColor: 'black', color: 'white' }}
          onClick={handleSubmit}
          fullWidth
        >
          SIGN UP
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Have an account? <Link href="/login" underline="hover">Login</Link>
        </Typography>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Terms and Policies</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
