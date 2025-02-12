// src/components/ItineraryList.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ItineraryItem from './ItineraryItem';
import { Typography, List, Box } from "@/components/ui/index"; // Or your UI library

const ItineraryList = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [itineraryItems, setItineraryItems] = useState([]);

  useEffect(() => {
    // Load itinerary from localStorage on component mount
    const storedItinerary = localStorage.getItem('itinerary');
    if (storedItinerary) {
      setItineraryItems(JSON.parse(storedItinerary));
    }
  }, []);

  const handleEditItem = (item) => {
    // TODO: Implement edit logic (e.g., open a modal, update state)
    console.log("Editing item:", item);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = itineraryItems.filter((item) => item.id !== itemId);
    setItineraryItems(updatedItems);
    localStorage.setItem('itinerary', JSON.stringify(updatedItems));
  };

  if (!isAuthenticated) {
    return (
      <Typography variant="body1">Please log in to view your itinerary.</Typography>
    );
  }

  return (
    <Box> {/* Use a Box or similar container component */}
      <Typography variant="h5" gutterBottom>
        My Itinerary
      </Typography>
      {itineraryItems.length === 0 ? (
        <Typography variant="body1">Your itinerary is empty.</Typography>
      ) : (
        <List>
          {itineraryItems.map((item) => (
            <ItineraryItem
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onRemove={handleRemoveItem}
            />
          ))}
        </List>
      )}
    </Box>
  );
};

export default ItineraryList;
