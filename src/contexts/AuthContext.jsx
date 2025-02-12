// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(); 

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user data if needed

  useEffect(() => {
    // Check if user is logged in (e.g., by checking localStorage for a token)
    const checkLoginStatus = () => {
      // ... your authentication logic here
      const token = localStorage.getItem('authToken'); 
      if (token) {
        setIsAuthenticated(true);
        // Fetch user data (optional)
      }
    };

    checkLoginStatus();
  }, []); 

  const login = (userData) => {
    // ... authentication logic (e.g., send request to API)
    // If successful:
    setIsAuthenticated(true);
    setUser(userData);
    // Store token in localStorage, etc.
  };

  const logout = () => {
    // ... logout logic (e.g., clear localStorage, remove token)
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
