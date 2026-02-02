// Demo authentication for prototype evaluation. Replace with real auth in production.
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Restore session from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('demoUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('demoUser');
      }
    }
  }, []);

  const login = () => {
    const demoUser = {
      id: 'demo-user',
      name: 'Demo User',
      role: 'admin'
    };

    setUser(demoUser);
    setIsAuthenticated(true);
    localStorage.setItem('demoUser', JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('demoUser');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
