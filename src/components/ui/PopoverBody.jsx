// components/ui/PopoverBody.jsx
import React from 'react';

const PopoverBody = ({ children, className, ...props }) => {
  return (
    <div 
      className={`p-4 rounded-md bg-white shadow-lg ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default PopoverBody;