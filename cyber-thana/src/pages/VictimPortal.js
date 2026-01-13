import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./VictimPortal.css";

const VictimPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/victim/dashboard", label: "Dashboard" },
    { path: "/victim/file-complaint", label: "File Complaint" },
    { path: "/victim/my-complaints", label: "My Complaints" },
    { path: "/victim/safety-tips", label: "Safety Tips" },
  ];

  return (
    <div className="victim-portal">
      {/* Header */}
      <header className="portal-header">
        <div className="header-content">
          <button 
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="logo">
            <h1>CyberThana</h1>
            <span className="subtitle">Victim Portal</span>
          </div>
          <div className="user-info">
            <span className="welcome">Welcome, User</span>
            <Link to="/" className="home-link">Home</Link>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/anonymous" className="nav-link">Anonymous Report</Link>
          <Link to="/track" className="nav-link">Track Complaint</Link>
        </nav>
        
        <div className="sidebar-footer">
          <div className="security-info">
            <span className="security-badge">🔒 Secure</span>
            <span className="security-badge">🛡️ Encrypted</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="portal-main">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="portal-footer">
        <p>CyberThana Victim Portal • 24/7 Support: 1930</p>
        <p className="copyright">© {new Date().getFullYear()} Ministry of Home Affairs</p>
      </footer>
    </div>
  );
};

export default VictimPortal;