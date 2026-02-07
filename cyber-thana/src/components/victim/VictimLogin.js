import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./VictimLogin.css";

const VictimLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Demo authentication - no real validation needed
      login();
      navigate("/victim/dashboard");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const handleInputChange = () => {
    if (error) {
      setError("");
    }
  };

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/victim/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="victim-login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>Victim Portal</h1>
            <p>Secure access to report and track cybercrime incidents</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleInputChange();
                }}
                placeholder="Enter your email address"
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleInputChange();
                  }}
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
              <a href="/forgot" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="login-button">
              Secure Login
            </button>

            <div className="login-divider">
              <span>or</span>
            </div>

            <div className="alternative-options">
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/anonymous")}
              >
                Report Anonymously
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/track")}
              >
                Track Complaint
              </button>
            </div>

            <div className="register-prompt">
              <p>
                New to Cyber Thana? <a href="/register" className="register-link">Create an account</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VictimLogin;