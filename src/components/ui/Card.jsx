// src/components/ui/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`rounded-lg shadow-md p-4 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};
Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;