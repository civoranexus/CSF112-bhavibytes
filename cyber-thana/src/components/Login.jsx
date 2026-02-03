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
        <div className="login-header">
          <div className="login-icon">🛡️</div>
          <h1>Cyber Thana</h1>
          <p>Demo Authentication Portal</p>
        </div>

        <div className="login-form">
          <h2>Secure Access</h2>
          <p className="demo-text">
            This is a prototype demo mode. Click below to access the Cyber Thana dashboard.
          </p>

          <button
            onClick={handleLogin}
            className="demo-login-btn"
          >
            Login (Demo)
          </button>

          <div className="security-features">
            <span className="security-badge">🔒 End-to-End Encrypted</span>
            <span className="security-badge">🛡️ Secure Session</span>
          </div>

          <p className="demo-note">
            No real authentication required - demo mode for evaluation purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
