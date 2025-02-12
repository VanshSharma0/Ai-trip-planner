// src/pages/Home.jsx
import React from 'react';
import SearchBar from '../components/SearchBar'; // Assuming you'll create this component
import FeaturedDestinations from '../components/FeaturedDestinations';

const Home = () => {
  return (
    <div>
      <SearchBar /> 
      <FeaturedDestinations /> {/* Add a FeaturedDestinations component */}
    </div>
  );
};

export default Home;

