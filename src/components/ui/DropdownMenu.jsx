import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Context for dropdown state
const DropdownMenuContext = createContext(null);

// Root component
const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

// Trigger button
const DropdownMenuTrigger = ({ children, className = '', ...props }) => {
  const { isOpen, setIsOpen } = useContext(DropdownMenuContext);
  
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center ${className}`}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
    </button>
  );
};

DropdownMenuTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DropdownMenuTrigger.defaultProps = {
  className: '',
};

// Content container
const DropdownMenuContent = ({ children, className = '', align = 'start', ...props }) => {
  const { isOpen, setIsOpen } = useContext(DropdownMenuContext);
  
  if (!isOpen) return null;
  
  // Handle clicking outside to close
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('[data-dropdown-content]')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [setIsOpen]);
  
  const alignmentClass = align === 'end' 
    ? 'right-0 origin-top-right' 
    : 'left-0 origin-top-left';
  
  return (
    <div
      className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 ${alignmentClass} ${className}`}
      data-dropdown-content
      {...props}
    >
      <div className="py-1" role="menu" aria-orientation="vertical">
        {children}
      </div>
    </div>
  );
};

DropdownMenuContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  align: PropTypes.oneOf(['start', 'end']),
};

DropdownMenuContent.defaultProps = {
  className: '',
  align: 'start',
};

// Individual menu item
const DropdownMenuItem = ({ children, className = '', onClick, ...props }) => {
  const { setIsOpen } = useContext(DropdownMenuContext);
  
  const handleClick = (e) => {
    if (onClick) onClick(e);
    setIsOpen(false);
  };
  
  return (
    <button
      className={`w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
      role="menuitem"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

DropdownMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

DropdownMenuItem.defaultProps = {
  className: '',
  onClick: undefined,
};

// Optional label component
const DropdownMenuLabel = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`px-4 py-2 text-sm font-medium text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

DropdownMenuLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DropdownMenuLabel.defaultProps = {
  className: '',
};

// Optional separator
const DropdownMenuSeparator = ({ className = '', ...props }) => {
  return (
    <div 
      className={`h-px my-1 bg-gray-200 ${className}`}
      role="separator"
      {...props}
    />
  );
};

DropdownMenuSeparator.propTypes = {
  className: PropTypes.string,
};

DropdownMenuSeparator.defaultProps = {
  className: '',
};

// Export all components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
};