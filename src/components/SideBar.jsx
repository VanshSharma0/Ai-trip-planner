// src/components/Sidebar.jsx
import React from 'react';
import { Card } from "@/components/ui/index"; 

const Sidebar = () => {
  return (
    <Card> 
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      {/* ... (Add your filter components here - e.g., price range, rating, etc.) ... */} 

      <h2 className="text-lg font-semibold mt-6">Itinerary Preview</h2>
      {/* ... (Add itinerary preview logic and components here) ... */} 
    </Card>
  );
};

export default Sidebar;

