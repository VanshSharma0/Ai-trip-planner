// src/components/ui/PopoverTrigger.jsx
import React from 'react';
import PropTypes from 'prop-types';

const PopoverTrigger = ({ children, ...props }) => {
  return (
    <button {...props}> 
      {children}
    </button>
  );
};
PopoverTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
};

export default PopoverTrigger;
