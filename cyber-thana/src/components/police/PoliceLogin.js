import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./PoliceLogin.css";

const PoliceLogin = () => {
  const [badgeId, setBadgeId] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("cyber_cell");
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
      navigate("/police/dashboard");
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
      navigate("/police/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="police-login-page">
      <div className="police-login-container">
        <div className="police-login-box">
          <div className="police-login-header">
            <div className="police-login-icon">👮</div>
            <h2>Police Portal Login</h2>
            <p className="police-login-subtitle">Restricted access for authorized personnel only</p>
            <div className="access-warning">
              ⚠️ All activities are logged and monitored
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="police-login-form">
            <div className="police-form-group">
              <label htmlFor="badgeId">Official Badge ID</label>
              <input
                type="text"
                id="badgeId"
                value={badgeId}
                onChange={(e) => {
                  setBadgeId(e.target.value.toUpperCase());
                  handleInputChange();
                }}
                placeholder="Enter your badge ID"
                required
                className="police-form-input"
              />
            </div>

            <div className="police-form-group">
              <label htmlFor="password">Password</label>
              <div className="police-password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="Enter your secure password"
                  required
                  className="police-form-input"
                />
                <button
                  type="button"
                  className="police-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="police-form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  handleInputChange();
                }}
                className="police-form-select"
              >
                <option value="cyber_cell">Cyber Crime Cell</option>
                <option value="investigation">Investigation Team</option>
                <option value="supervisor">Supervisor/Admin</option>
                <option value="support">Support Staff</option>
              </select>
            </div>

            <div className="two-factor">
              <label htmlFor="otp">Two-Factor Code</label>
              <input
                type="text"
                id="otp"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className="otp-input"
              />
            </div>

            <button type="submit" className="police-login-button">
              Access Secure Portal
            </button>

            <div className="access-info">
              <div className="access-level">
                <span className="level-badge restricted">RESTRICTED</span>
                <span className="level-badge classified">CLASSIFIED</span>
              </div>
              <p className="session-timer">Session expires in: <span>14:59</span></p>
            </div>

            <div className="audit-notice">
              By logging in, you consent to activity monitoring and auditing as per official protocols.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PoliceLogin;