import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>CyberThana Demo</h1>
        <p>Cybersecurity Project Demonstration</p>
        
        <div className="login-form">
          <h2>Demo Authentication</h2>
          <p className="demo-text">
            This is a prototype demo mode. Click below to access the system.
          </p>
          
          <button 
            onClick={handleLogin}
            className="demo-login-btn"
          >
            Login (Demo)
          </button>
          
          <p className="demo-note">
            No real authentication required - demo mode for evaluation purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
