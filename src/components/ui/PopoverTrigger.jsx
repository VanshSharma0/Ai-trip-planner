// src/components/ui/PopoverTrigger.jsx
import React from 'react';

const PopoverTrigger = ({ children, ...props }) => {
  return (
    <button {...props}> 
      {children}
    </button>
  );
};

export default PopoverTrigger;
