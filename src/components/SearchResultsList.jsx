// src/components/SearchResultsList.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; 
import SearchResultItem from './SearchResultItem'; 
import { Typography, Grid, Box } from "@/components/ui/index"; 

const SearchResultsList = ({ results }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToItinerary = (item) => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return; 
    }

    let currentItinerary = JSON.parse(localStorage.getItem('itinerary')) || [];

    // Check if item already exists in itinerary
    const isDuplicate = currentItinerary.some(itineraryItem => 
      itineraryItem.id === item.id && // Assuming your items have unique IDs
      itineraryItem.type === item.type // You might want to differentiate between hotels, flights, etc.
    ); 

    if (isDuplicate) {
      alert('This item is already in your itinerary!');
      return;
    }

    currentItinerary.push(item);
    localStorage.setItem('itinerary', JSON.stringify(currentItinerary));
  };

  // Handle case where no results are found
  if (results.length === 0) {
    return (
      <Box className="p-4">
        <Typography variant="body1">
          No results found. Please try adjusting your search criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4} className="p-4"> 
      {results.map((result) => (
        <Grid item xs={12} sm={6} md={4} key={result.id}> 
          <SearchResultItem 
            result={result} 
            onAddToItinerary={() => handleAddToItinerary(result)} 
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchResultsList;
