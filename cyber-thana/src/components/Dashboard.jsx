import React from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="dashboard-logo">
            <div className="dashboard-logo-icon">🛡️</div>
            <h1>Cyber Thana</h1>
            <span className="dashboard-badge">Demo Mode</span>
          </div>
          <div className="user-info">
            <span className="welcome-text">Welcome, {user?.name}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-hero">
          <h2>Secure Dashboard Access</h2>
          <p>This is a protected area demonstrating the Cyber Thana platform capabilities.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card primary">
            <div className="card-icon">🔐</div>
            <h3>Authentication Status</h3>
            <div className="user-details">
              <div className="detail-item">
                <span className="label">User ID:</span>
                <span className="value">{user?.id}</span>
              </div>
              <div className="detail-item">
                <span className="label">Name:</span>
                <span className="value">{user?.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Role:</span>
                <span className="value">{user?.role}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Analytics</h3>
            <p>View comprehensive cybersecurity analytics and reports</p>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-number">128</span>
                <span className="stat-label">Active Cases</span>
              </div>
              <div className="stat">
                <span className="stat-number">2,431</span>
                <span className="stat-label">Resolved</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🛡️</div>
            <h3>Security</h3>
            <p>Cybercrime reporting and management system</p>
            <div className="security-features">
              <span className="feature-badge">End-to-End Encryption</span>
              <span className="feature-badge">Real-time Tracking</span>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <h3>User Management</h3>
            <p>Admin panel for user administration</p>
            <div className="card-actions">
              <button className="action-btn">Manage Users</button>
            </div>
          </div>
        </div>

        <div className="dashboard-footer">
          <div className="footer-info">
            <span className="footer-badge">🔒 SSL Secured</span>
            <span className="footer-badge">🇮🇳 Made in India</span>
            <span className="footer-badge">📞 24/7 Support</span>
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Cyber Thana - Powered by Civora Nexus
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
