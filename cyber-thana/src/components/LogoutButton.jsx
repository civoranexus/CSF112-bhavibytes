import React from 'react';
import { useAuth } from '../context/AuthContext';
import './LogoutButton.css';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // The ProtectedRoute will handle redirection
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-btn"
      title="Logout from demo session"
    >
      <span className="logout-icon">🚪</span>
      <span className="logout-text">Logout</span>
    </button>
  );
};

export default LogoutButton;
