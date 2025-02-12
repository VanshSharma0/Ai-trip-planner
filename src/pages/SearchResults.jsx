// src/pages/SearchResults.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Assuming you have an AuthContext
import SearchResultsFilter from '../components/SearchResultsFilter';
import SearchResultsList from '../components/SearchResultsList';
import axios from 'axios'; // For making API calls
import { Typography, Card } from "@/components/ui/index"; // Import UI components

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext); // Get authentication status
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    // Define default filter values
    priceRange: [0, 1000], // Example: Price range from $0 to $1000
    rating: null, // Example: Filter by rating
    // Add more filter options as needed 
  });

  // Extract search parameters from the URL
  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get('destination');
  const dates = searchParams.get('dates'); 
  const budget = searchParams.get('budget'); 

  // Function to fetch search results from API
  const fetchSearchResults = async () => {
    setIsLoading(true);
    setError(null); 

    try {
      // Replace with your actual API endpoints and request structure
      const flightsResponse = await axios.get(`/api/flights?destination=${destination}&dates=${dates}&budget=${budget}`);
      const hotelsResponse = await axios.get(`/api/hotels?destination=${destination}&dates=${dates}&budget=${budget}`);
      // ... (Fetch data from other APIs - activities, etc.) 

      const results = [
        ...flightsResponse.data, 
        ...hotelsResponse.data,
        // ... (Add results from other API responses)
      ];

      setSearchResults(results);
      setFilteredResults(results); // Initially, no filters applied

    } catch (err) {
      console.error("Error fetching search results:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch results when the component mounts and when search parameters change
    fetchSearchResults(); 
  }, [location.search]); // Run effect when search parameters change

  // Function to handle changes in filter options 
  const handleFilterChange = (newFilters) => {
    setFilterOptions(newFilters); 

    // Filter searchResults based on newFilters 
    const filtered = searchResults.filter((result) => {
      // Implement your filtering logic here based on filterOptions
      // Example for price range filtering:
      const priceMatch = result.price >= newFilters.priceRange[0] && result.price <= newFilters.priceRange[1];

      // Example for rating filtering:
      const ratingMatch = newFilters.rating === null || result.rating === newFilters.rating; 

      // ... (Add more filter conditions as needed)

      return priceMatch && ratingMatch; // Combine all filter conditions
    });

    setFilteredResults(filtered);
  };

  // Function to handle adding an item to the itinerary
  const handleAddToItinerary = (item) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login'); // Or display a login modal
      return; 
    }

    // Retrieve the current itinerary from localStorage
    let currentItinerary = JSON.parse(localStorage.getItem('itinerary')) || [];

    // Check for duplicates (optional, but recommended)
    const isDuplicate = currentItinerary.some((itineraryItem) => itineraryItem.id === item.id);
    if (isDuplicate) {
      // Handle duplicate items (e.g., show a message)
      alert('This item is already in your itinerary!'); 
      return;
    }

    // Add the new item to the itinerary
    currentItinerary.push(item); 

    // Store the updated itinerary back in localStorage 
    localStorage.setItem('itinerary', JSON.stringify(currentItinerary));

    // Provide feedback to the user (optional)
    // e.g., display a success message or update a counter
  }; 

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-0">
        <Card className="p-6 rounded-lg shadow-md mb-8"> 
          <Typography variant="h2" className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"> 
            Search Results for: {destination} 
          </Typography>

          <SearchResultsFilter 
            filterOptions={filterOptions} 
            onFilterChange={handleFilterChange} 
          />
        </Card>

        {isLoading ? ( 
          <p>Loading results...</p> 
        ) : error ? (
          <p>Error loading results: {error.message}</p>
        ) : ( 
          <SearchResultsList 
            results={filteredResults} 
            onAddToItinerary={handleAddToItinerary}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
