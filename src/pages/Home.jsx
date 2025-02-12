// src/pages/Home.jsx
import React from 'react';
import {
  Card,
  Button,
  Input,
  Calendar,
} from "@/components/ui/index"; // Assuming you have a central UI component export
import { CalendarIcon } from '@radix-ui/react-icons';
import SearchBar from '../components/SearchBar'; 
import FeaturedDestinations from '../components/FeaturedDestinations';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = () => {
    // Implement your search logic here (e.g., navigate to search results page)
    navigate('/search-results'); // Example: Navigate to a search results page
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16"> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Search Area */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Discover Your Next Adventure
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore the world's most amazing destinations.
            </p>

            <Card className="p-6 rounded-lg shadow-md">
              <SearchBar onSearch={handleSearch} /> {/* Pass the search function to SearchBar */}

              {/* Example: Add a Calendar Input using Shadcn UI */}
              <div className="mt-4">
                <Calendar>
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Select Dates
                </Calendar>
              </div>

              <Button 
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
                onClick={handleSearch} // Call the search function when the button is clicked
              >
                Search
              </Button>
            </Card>
          </div>

          {/* Right Side - Featured Destinations (Image or Carousel) */}
          <div>
            <FeaturedDestinations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

