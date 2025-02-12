// src/components/ItineraryList.jsx
import React from 'react';
import ItineraryItem from './ItineraryItem'; 

const ItineraryList = ({ itineraryItems }) => { // Assuming itinerary data is passed 
  return (
    <ul>
      {itineraryItems.map((item) => (
        <ItineraryItem key={item.id} item={item} /> 
      ))}
    </ul>
  );
};

export default ItineraryList;

