// src/components/SearchResultsList.jsx
import React from 'react';
import SearchResultItem from './SearchResultItem'; // Assuming you'll create a component for each result

const SearchResultsList = ({ results }) => { // Assuming you pass results data to this component
  return (
    <ul> {/* Or use a grid layout */}
      {results.map((result) => ( 
        <SearchResultItem key={result.id} result={result} /> 
      ))}
    </ul>
  );
};

export default SearchResultsList;
