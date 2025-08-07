// src/components/LoginForm.jsx
import React, { useState, useContext } from 'react'; // Import useState
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Link,
  IconButton, // Import IconButton
  InputAdornment, // Import InputAdornment
} from '@mui/material';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from '../Context/AuthContext';
import Visibility from '@mui/icons-material/Visibility'; // Import visibility icon
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Import visibility off icon
import {  useNavigate } from 'react-router-dom';

const LoginForm = () => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const {updateUser} = useContext(AuthContext)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault(); // Prevents focus from shifting
  };

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (e) => {
    //console.log('Form submitted:', data);
    console.log(e)
    const username = e.email
    const password = e.password
    try {
      const res = await apiRequest.post("auth/login/",{
        username,password
      })
     updateUser(res.data)
      alert('Login Successful! Data: ' + JSON.stringify(e, null, 2));
      navigate("/")
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          backgroundColor: 'rgba(25, 25, 25, 0.9)',
          color: '#fff',
          boxShadow: '0px 0px 20px rgba(100,250,0,0.4)',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 3, fontWeight: 'bold', color: '#bef264' }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mb: 4, color: '#e0e0e0', textAlign: 'center' }}
        >
          Log in to discover and share your favorite musical quotes.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
          {/* Email Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { color: '#e0e0e0' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '&:hover fieldset': { borderColor: '#a7f3d0' },
                '&.Mui-focused fieldset': { borderColor: '#bef264', borderWidth: '2px' },
              },
            }}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password Field with Show/Hide Toggle */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            // Dynamically set type based on showPassword state
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { color: '#e0e0e0' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '&:hover fieldset': { borderColor: '#a7f3d0' },
                '&.Mui-focused fieldset': { borderColor: '#bef264', borderWidth: '2px' },
              },
            }}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            // Add InputProps for the adornment
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ color: '#e0e0e0' }} // Icon color
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password / Other Links (Optional) */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 1 }}>
            <Link href="#" variant="body2" sx={{ color: '#e0e0e0', '&:hover': { color: '#a7f3d0' } }}>
              Forgot password?
            </Link>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #bef264 30%, #a7f3d0 90%)',
              color: '#333',
              boxShadow: '0 3px 5px 2px rgba(174, 238, 0, .3)',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 5px 10px 3px rgba(174, 238, 0, .5)',
                background: 'linear-gradient(45deg, #a7f3d0 30%, #bef264 90%)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging In...' : 'Log In'}
          </Button>

          {/* Sign Up Link */}
          <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
              Don't have an account?{' '}
              <Link href="/register" variant="body2" sx={{ color: '#bef264', '&:hover': { color: '#a7f3d0' } }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;