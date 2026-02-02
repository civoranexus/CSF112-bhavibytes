import React from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>CyberThana Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <LogoutButton />
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome to the Demo Dashboard</h2>
          <p>This is a protected area that requires authentication to access.</p>
          <div className="user-details">
            <h3>Current User Information:</h3>
            <ul>
              <li><strong>ID:</strong> {user?.id}</li>
              <li><strong>Name:</strong> {user?.name}</li>
              <li><strong>Role:</strong> {user?.role}</li>
            </ul>
          </div>
        </div>
        
        <div className="demo-features">
          <h3>Available Demo Features:</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <h4>🔒 Authentication</h4>
              <p>Demo authentication with session persistence</p>
            </div>
            <div className="feature-card">
              <h4>📊 Analytics</h4>
              <p>View cybersecurity analytics and reports</p>
            </div>
            <div className="feature-card">
              <h4>🛡️ Security</h4>
              <p>Cybercrime reporting and management</p>
            </div>
            <div className="feature-card">
              <h4>👥 User Management</h4>
              <p>Admin panel for user administration</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
