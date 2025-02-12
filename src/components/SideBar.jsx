// src/components/Sidebar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { 
  Card, 
  Typography, 
  Input,
  Button,
  RangeSlider,
  Slider,
} from "@/components/ui/index";
import { AuthContext } from '../contexts/AuthContext'; // Assuming you have an AuthContext
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate(); 
  const [itineraryData, setItineraryData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    priceRange: [0, 1000], 
    rating: 0, 
  });

  useEffect(() => {
    const storedItinerary = localStorage.getItem('itinerary');
    if (storedItinerary) {
      setItineraryData(JSON.parse(storedItinerary));
    }
  }, []);

  const handleFilterChange = (name, value) => {
    setFilterOptions(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleClearItinerary = () => {
    localStorage.removeItem('itinerary');
    setItineraryData([]); 
  };

  const handleViewItinerary = () => {
    if (isAuthenticated) {
      navigate('/itinerary');
    } else {
      // Redirect to login if not authenticated
      navigate('/login'); // Or display a login modal
    }
  };

  return (
    <Card className="p-4">
      <Typography variant="h3" className="text-lg font-semibold mb-4">
        Filters
      </Typography>

      {/* Price Range Filter */}
      <div className="mb-4">
        <Typography variant="subtitle2" className="mb-2">
          Price Range (${filterOptions.priceRange[0]} - ${filterOptions.priceRange[1]})
        </Typography>
        <RangeSlider
          min={0} 
          max={1000} // Adjust max value based on your data
          step={50} 
          defaultValue={filterOptions.priceRange} 
          onValueChange={(value) => handleFilterChange("priceRange", value)}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
          <Slider.Thumb />
        </RangeSlider>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <Typography variant="subtitle2" className="mb-2">
          Rating (Min: {filterOptions.rating})
        </Typography>
        <Input
          type="number"
          min={0}
          max={5}
          value={filterOptions.rating}
          onChange={(e) => handleFilterChange("rating", parseInt(e.target.value, 10) || 0)} 
        />
      </div>

      {/* ... Add other filter components here ... */}

      <Typography variant="h3" className="text-lg font-semibold mt-6 mb-4">
        Itinerary Preview
      </Typography>

      {/* Display itinerary items */}
      {itineraryData.length === 0 ? (
        <Typography variant="body2">Your itinerary is empty.</Typography>
      ) : (
        <ul>
          {itineraryData.map((item, index) => (
            <li key={index} className="mb-2">
              <Typography variant="body2">
                {item.name ? item.name : `Item ${index + 1}`} 
              </Typography>
            </li>
          ))}
        </ul>
      )}

      {/* Buttons for Itinerary Management */}
      <div className="mt-4 flex items-center space-x-2"> 
        <Button variant="outline" size="sm" onClick={handleClearItinerary} disabled={itineraryData.length === 0}>
          Clear
        </Button>
        <Button size="sm" onClick={handleViewItinerary} disabled={itineraryData.length === 0}>
          View Itinerary
        </Button>
      </div>
    </Card>
  );
};

export default Sidebar;

