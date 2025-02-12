// src/components/SearchResultItem.jsx
import React from 'react';

const SearchResultItem = ({ result }) => {
  return (
    <li> {/* Or use a grid item */}
      {/* ... (Display result details - e.g., hotel name, image, price, rating) ... */}
      <button>Add to Itinerary</button> {/* Implement itinerary adding logic */}
    </li>
  );
};

export default SearchResultItem;
