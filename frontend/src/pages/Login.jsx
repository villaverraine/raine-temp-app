import React, { useState, useContext } from 'react';
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function App() {
  const [identifier, setIdentifier] = useState(''); // accepts email or username
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // State to handle error messages
  const [success, setSuccess] = useState(false); // State for success message
  let appContext = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:3001/api/login', { identifier, password })
      .then(res => {
        setSuccess(true);
        setError(null);
        appContext.setState({
            profile: {
            _id: res.data.user._id,
            username: res.data.user.username,
            first: res.data.user.name.first,
            last: res.data.user.name.last,
            email: res.data.user.email,
            contactNumber: res.data.user.contactNumber
          },
          token: res.data.token
        })
        navigate('/userDashBoard');
      })
      .catch(err => {
        setSuccess(false);
        setError(err.response?.data?.message || 'Login failed. Please try again.');
        console.error('Login error:', err);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom>
        LOGIN
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
          Login successful! Redirecting...
        </Alert>
      )}

      <TextField
        label="Email or Username"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
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

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'black', color: 'white', mb: 1.5 }}
          onClick={handleSubmit}
          fullWidth
        >
          LOGIN
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 8 }}>
          <Link href="/forgotPW" underline="hover">
            Forgot Password?
          </Link>
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: 'black', color: 'white', mt: 4 }}
          href="/register"
          fullWidth
        >
          SIGN UP
        </Button>
      </Box>
    </>
  );
}

