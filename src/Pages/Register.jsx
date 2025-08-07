// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; // Import yup directly here
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();

  // Define the Yup validation schema directly inside the component
  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must not exceed 20 characters')
      .required('Username is required'),
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match') // This is the crucial line for confirmation
      .required('Confirm Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema), // Connect Yup schema with react-hook-form
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('Register Form submitted:', data);
    try {
      // Simulate an API call for registration
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Registration Successful! Welcome, ' + data.username);
      // In a real app: handle successful registration (e.g., redirect to dashboard, auto-login)
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
      // In a real app: handle registration error (e.g., display error message)
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
          sx={{ mb: 3, fontWeight: 'bold', color: '#a7f3d0' }} // Teal color for Register title
        >
          Join QuotedBeats
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mb: 4, color: '#e0e0e0', textAlign: 'center' }}
        >
          Create your account to start sharing and discovering beats.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
          {/* Username Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          {/* Email Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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

          {/* Password Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ color: '#e0e0e0' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
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
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                    sx={{ color: '#e0e0e0' }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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
              background: 'linear-gradient(45deg, #a7f3d0 30%, #bef264 90%)', // Teal to Lime gradient for register
              color: '#333',
              boxShadow: '0 3px 5px 2px rgba(167, 243, 208, .3)',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 5px 10px 3px rgba(167, 243, 208, .5)',
                background: 'linear-gradient(45deg, #bef264 30%, #a7f3d0 90%)', // Reverse gradient on hover
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>

          {/* Login Link */}
          <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
              Already have an account?{' '}
              <Link href="/login" variant="body2" sx={{ color: '#a7f3d0', '&:hover': { color: '#bef264' } }}>
                Log In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;