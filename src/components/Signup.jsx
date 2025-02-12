// src/components/Signup.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; 
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Assuming you want to log in after signup
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send signup request to backend API
      const response = await fetch('/api/signup', { // Update with your API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        const data = await response.json(); 
        // Handle successful signup (e.g., log in the user)
        login(data);
        navigate('/'); 
      } else {
        const errorData = await response.json(); 
        setError(errorData.message || 'Signup failed.'); 
      }
    } catch (error) {
      console.error('Signup error', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center" mb={4}>
          <Heading as="h2" size="lg">
            Sign Up
          </Heading>
        </Box>
        <Box>
          {error && (
            <Box bg="red.100" borderColor="red.400" borderWidth={1} borderRadius={4} p={2} mb={4}>
              {error}
            </Box>
          )}
          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={3}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="password" mb={3}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </FormControl>
            <FormControl id="confirmPassword" mb={6}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </FormControl>
            <Button colorScheme="teal" width="full" type="submit">
              Sign Up
            </Button>
          </form>
          <Text mt={4} align="center">
            Already have an account?{' '}
            <Link to="/login" color="teal.500">
              Login
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;

