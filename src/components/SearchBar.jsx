// src/components/SearchBar.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Assuming you have an AuthContext
import {
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Calendar,
} from "@/components/ui/index"; // Assuming Shadcn UI
import { CalendarIcon } from '@radix-ui/react-icons';

const SearchBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext); 
  const [searchData, setSearchData] = useState({
    destination: '',
    dates: [null, null], // For date range
    budget: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setSearchData((prevData) => ({
      ...prevData,
      dates: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login'); 
      return;
    }

    // Format dates (adjust format as needed)
    const formattedDates = searchData.dates.map((date) => {
      return date ? date.toLocaleDateString('en-CA') : ''; 
    }); 

    // Construct the query parameters
    const queryParams = new URLSearchParams({
      destination: searchData.destination,
      startDate: formattedDates[0],
      endDate: formattedDates[1],
      budget: searchData.budget,
    }).toString();

    // Navigate to the search results page with the query parameters
    navigate(`/search-results?${queryParams}`); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:space-x-4">
      <div className="relative w-full md:w-1/2 mb-2 md:mb-0">
        <Input 
          type="text" 
          name="destination" 
          placeholder="Where to?" 
          className="w-full"
          value={searchData.destination} 
          onChange={handleChange}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-auto justify-start px-4"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {searchData.dates[0]
              ? `${searchData.dates[0].toLocaleDateString()} - ${searchData.dates[1]?.toLocaleDateString()}`
              : 'Select Dates'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <PopoverHeader className="font-medium text-gray-900">
            Select Dates
          </PopoverHeader>
          <PopoverBody>
            <Calendar
              mode="range"
              selected={searchData.dates}
              onValueChange={handleDateChange}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <div className="relative w-full md:w-1/4 mb-2 md:mb-0">
        <Input 
          type="number" 
          name="budget" 
          placeholder="Max Budget" 
          className="w-full"
          value={searchData.budget}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="w-full md:w-auto px-6">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
