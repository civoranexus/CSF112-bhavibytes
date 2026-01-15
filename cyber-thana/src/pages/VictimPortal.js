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
      {/* HEADER */}
      <header className="portal-header">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <div className="logo">
          <h1>CyberThana</h1>
          <span>Victim Portal</span>
        </div>

        <div className="user-info">
          <span>Welcome, User</span>
          <Link to="/">Home</Link>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        <hr />

        <Link to="/anonymous" className="nav-link">
          Anonymous Report
        </Link>
        <Link to="/track" className="nav-link">
          Track Complaint
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="portal-main">
        <Outlet />
      </main>

      {/* FOOTER - MODERN DESIGN */}
      <footer className="portal-footer">
        <div className="footer-content">
          {/* Support Column */}
          <div className="footer-section">
            <h4>Support & Contact</h4>
            
            <div className="support-info">
              <span>📞</span>
              <div>
                <p className="bold">24/7 National Helpline</p>
                <p>Dial 1930 • Multilingual Support</p>
              </div>
            </div>
            
            <div className="support-info">
              <span>✉️</span>
              <div>
                <p className="bold">Email Assistance</p>
                <p>victim.support@cyberthana.gov.in</p>
              </div>
            </div>
            
            <div className="app-links">
              <a href="#app-store" className="app-link">
                <span>📱</span> Mobile App
              </a>
              <a href="#whatsapp" className="app-link">
                <span>💬</span> WhatsApp Help
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className="footer-section">
            <h4>Quick Access</h4>
            <Link to="/resources">Safety Resources</Link>
            <Link to="/anonymous">Anonymous Reporting</Link>
            <Link to="/track">Track Complaint</Link>
            <Link to="/victim/safety-tips">Safety Tips</Link>
            <Link to="/faq">FAQ & Help Center</Link>
            <Link to="/emergency">Emergency Contacts</Link>
            {/* In VictimPortal.js: */}
<Link to="/anonymous" className="nav-link">Anonymous Report</Link> {/* ← Absolute path */}
<Link to="/track" className="nav-link">Track Complaint</Link>      {/* ← Absolute path */}
          </div>
          
          {/* Security Column */}
          <div className="footer-section">
            <h4>Security & Trust</h4>
            <div className="badges">
              <span>GDPR Compliant</span>
              <span>ISO 27001:2022</span>
              <span>256-bit Encryption</span>
              <span>NDR 2022</span>
              <span>Zero Trust</span>
              <span>SOC 2 Type II</span>
            </div>
            
            <p className="small">
              All communications are end-to-end encrypted. We never share your data with third parties.
            </p>
            
            <div className="newsletter">
              <p>Stay updated on cyber safety</p>
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} CyberThana – Ministry of Home Affairs
          </p>
          
          <div className="legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
          
          <p className="audit">
            SECURE SESSION • ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VictimPortal;