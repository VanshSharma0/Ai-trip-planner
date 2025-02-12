// src/components/SearchResultsFilter.jsx
import React from 'react';
import { RangeSlider, Slider, Input, Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material'; // Or your UI library

const SearchResultsFilter = ({ filterOptions, onFilterChange }) => {
  const handlePriceRangeChange = (event, newValue) => {
    onFilterChange({ ...filterOptions, priceRange: newValue });
  };

  const handleRatingChange = (event) => {
    onFilterChange({ ...filterOptions, rating: parseInt(event.target.value, 10) || 0 });
  };

  // Example for checkbox filter (e.g., for hotel amenities)
  const handleCheckboxChange = (event) => {
    onFilterChange({
      ...filterOptions,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Filter Results
      </Typography>

      {/* Price Range Filter */}
      <div className="mb-4">
        <Typography variant="subtitle2" gutterBottom>
          Price Range (${filterOptions.priceRange[0]} - ${filterOptions.priceRange[1]})
        </Typography>
        <RangeSlider
          value={filterOptions.priceRange}
          onChange={handlePriceRangeChange}
          min={0}
          max={1000} // Adjust max value based on your data
          step={50}
          valueLabelDisplay="auto" 
        />
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <Typography variant="subtitle2" gutterBottom>
          Minimum Rating
        </Typography>
        <Input
          type="number"
          min={0}
          max={5}
          value={filterOptions.rating}
          onChange={handleRatingChange}
          inputProps={{
            step: 1, // Allow only whole numbers
          }}
        />
      </div>

      {/* Example Checkbox Filters */}
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={filterOptions.wifi || false} 
              onChange={handleCheckboxChange}
              name="wifi"
            />
          }
          label="WiFi"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filterOptions.parking || false} 
              onChange={handleCheckboxChange}
              name="parking"
            />
          }
          label="Parking"
        />
        {/* Add more checkboxes as needed */}
      </FormGroup>
    </div>
  );
};

export default SearchResultsFilter;
