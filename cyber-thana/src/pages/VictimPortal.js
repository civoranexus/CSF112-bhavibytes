import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import "./VictimPortal.css";

const VictimPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* Always open pages from top */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navItems = [
    { path: "/victim/dashboard", label: "Dashboard" },
    { path: "/victim/file-complaint", label: "File Complaint" },
    { path: "/victim/my-complaints", label: "My Complaints" },
    { path: "/victim/safety-tips", label: "Safety Tips" },
  ];

  /* Back → always dashboard */
  const handleBack = () => {
    navigate("/victim/dashboard");
  };

  /* Exit portal */
  const confirmExit = () => {
    setShowExitModal(false);
    navigate("/");
  };

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

        <div className="header-actions">
          <button className="back-btn" onClick={handleBack}>
            ← Dashboard
          </button>

          <button
            className="exit-btn"
            onClick={() => setShowExitModal(true)}
          >
            🚪 Exit Portal
          </button>
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

      {/* EXIT CONFIRMATION MODAL */}
      {showExitModal && (
        <div className="exit-modal-overlay">
          <div className="exit-modal">
            <h3>Exit Victim Portal?</h3>
            <p>
              You are about to leave the secure Victim Portal.
              <br />
              Any unsaved progress may be lost.
            </p>

            <div className="exit-actions">
              <button
                className="btn secondary"
                onClick={() => setShowExitModal(false)}
              >
                Cancel
              </button>

              <button className="btn danger" onClick={confirmExit}>
                Yes, Exit
              </button>
            </div>

            <p className="exit-note">
              🔒 This portal contains sensitive information. Always log out on
              shared devices.
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="portal-footer">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CyberThana – Ministry of Home Affairs</p>
          <p className="audit">
            SECURE SESSION • ID:{" "}
            {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VictimPortal;
