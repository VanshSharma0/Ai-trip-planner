// src/App.jsx
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext'; 
import { 
  ChakraProvider, 
  Box, 
  Flex
} from '@chakra-ui/react'; 
import './App.css';

// Components 
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import SearchResultItem from './components/SearchResultItem.jsx'; 
import ItineraryList from './components/ItineraryList.jsx';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home'; // Assuming you have a dedicated home page
import PrivateRoute from './components/PrivateRoute'; // Route only accessible when authenticated

function App() {
  return (
    <ChakraProvider> 
      <Router>
        <AuthProvider> 
          <AppContent /> 
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

function AppContent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route
            path="/itinerary"
            element={
              <PrivateRoute>
                <Itinerary /> 
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
