// src/components/SearchResultItem.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; 
import { 
  Card, 
  Typography, 
  Button, 
  CardMedia, // If you're displaying images
  // ... other components you need from your UI library
} from "@/components/ui/index";

const SearchResultItem = ({ result, onAddToItinerary }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToTrip = () => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    onAddToItinerary(result); // Call the function passed from SearchResultsList
  };

  return (
    <Card className="mb-4">
      {/* Use CardMedia if you want to display an image */}
      <CardMedia
        component="img"
        height="140" // Adjust height as needed
        image={result.imageUrl} // Assuming your result object has an imageUrl property
        alt={result.name}
      /> 
      
      <div className="p-4">
        <Typography variant="h6" component="div">
          {result.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {result.type} - {/* Example: Hotel, Flight, Activity */}
          {result.city}, {result.country} 
        </Typography>
        <Typography variant="body2" className="mt-2">
          Price: ${result.price} {/* Assuming a price property exists */}
        </Typography>
        {/* Display other relevant details, like rating, description, etc. */}

        <Button 
          variant="contained" 
          onClick={handleAddToTrip} 
          className="mt-4"
        >
          Add to Itinerary
        </Button>
      </div>
    </Card>
  );
};

export default SearchResultItem;
