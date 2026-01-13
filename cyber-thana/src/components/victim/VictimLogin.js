import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VictimLogin.css";

const VictimLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate("/victim/dashboard");
    }, 1500);
  };

  return (
    <div className="victim-login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <div className="login-icon">🛡️</div>
            <h2>Victim Portal Login</h2>
            <p className="login-subtitle">Secure access to report and track cybercrime incidents</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-link">Forgot Password?</a>
            </div>
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Secure Login"}
            </button>
            
            <div className="login-divider">
              <span>or</span>
            </div>
            
            <button type="button" className="secondary-button">
              Report Anonymously
            </button>
            
            <div className="login-links">
              <p>
                Don't have an account? <a href="#register" className="link">Register here</a>
              </p>
              <p>
                Just want to track? <a href="/track" className="link">Track complaint</a>
              </p>
            </div>
          </form>
          
          <div className="security-info">
            <div className="security-badge">
              <span>🔒</span> 256-bit encryption
            </div>
            <div className="security-badge">
              <span>🛡️</span> ISO 27001 certified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictimLogin;