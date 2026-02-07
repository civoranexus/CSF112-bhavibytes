import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import "./PolicePortal.css";

const PolicePortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { path: "/police/dashboard", label: "Dashboard" },
    { path: "/police/cases", label: "Case Management" },
    { path: "/police/analytics", label: "Analytics" },
    { path: "/police/users", label: "User Management" },
    { path: "/police/logs", label: "System Logs" },
  ];

  const confirmExit = () => {
    setShowExitConfirm(false);
    navigate("/");
  };

  return (
    <div className="police-portal">
      {/* Header */}
      <header className="police-header">
        <div className="police-header-content">
          <button
            className="police-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <div className="police-logo">
            <h1>CyberThana</h1>
            <span className="police-subtitle">Police Portal</span>
          </div>

          <div className="police-user-info">
            <span className="police-badge">OFFICER ID: OFC-001</span>
            <button
              className="exit-police-btn"
              onClick={() => setShowExitConfirm(true)}
            >
              Exit Portal
            </button>
          </div>
        </div>
      </header>

      {/* Warning Banner */}
      <div className="warning-banner">
        ⚠️ OFFICIAL USE ONLY • All activities are logged and monitored
      </div>

      {/* Sidebar */}
      <aside className={`police-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="police-sidebar-header">
          <h3>NAVIGATION</h3>
        </div>

        <nav className="police-sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`police-nav-link ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="police-sidebar-footer">
          <p className="session-time">
            Session Start: {new Date().toLocaleTimeString()}
          </p>
          <p className="access-level">Access Level: CLASSIFIED</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="police-main">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="police-footer">
        <div className="police-footer-content">
          <div className="footer-section">
            <h4>Cyber Crime Cell</h4>
            <p>Control Room: 1930</p>
          </div>
          <div className="footer-section">
            <h4>Audit Information</h4>
            <p className="audit-id">
              ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        </div>

        <div className="police-footer-bottom">
          <p>
            © {new Date().getFullYear()} Ministry of Home Affairs • Restricted
            Access
          </p>
        </div>
      </footer>

      {/* EXIT CONFIRMATION MODAL */}
      {showExitConfirm && (
        <div className="exit-modal-overlay">
          <div className="exit-modal">
            <h3>Exit Police Portal?</h3>
            <p>
              You are accessing a <strong>restricted law enforcement system</strong>.
              Exiting will end your active session.
            </p>

            <div className="exit-actions">
              <button
                className="btn secondary"
                onClick={() => setShowExitConfirm(false)}
              >
                Stay Logged In
              </button>
              <button className="btn danger" onClick={confirmExit}>
                Exit Securely
              </button>
            </div>

            <p className="exit-note">
              ⚠️ Unsaved changes may be lost. Activity is audit logged.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicePortal;
