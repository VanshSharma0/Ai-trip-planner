// components/ui/PopoverBody.jsx
import React from 'react';
import PropTypes from 'prop-types';

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
PopoverBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PopoverBody;
export default PopoverBody;