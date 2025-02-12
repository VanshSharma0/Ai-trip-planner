// src/components/Login.jsx
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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      // Add your authentication logic here
      // Example: Send login request to your backend API
      const response = await fetch('/api/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); 

        // Assuming your API returns a token or user data
        login(data); 

        navigate('/'); // Redirect to home or a protected route
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid credentials');
      }

    } catch (error) {
      setError('An error occurred. Please try again later.'); 
      console.error('Login error:', error); 
    }
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center" mb={4}>
          <Heading as="h2" size="lg">
            Login
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
            <FormControl id="password" mb={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button colorScheme="teal" width="full" type="submit">
              Login
            </Button>
          </form>
          <Text mt={4} align="center">
            Don't have an account?{' '}
            <Link to="/signup" color="teal.500">
              Sign Up
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;

