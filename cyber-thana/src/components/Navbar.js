import React from "react";
import { Link } from "react-router-dom";
import civoraLogo from "../assets/civora-nexus-logo.png";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <h2 style={styles.brand}>Cyber Thana</h2>

        {/* Divider */}
        <span style={styles.divider}>|</span>

        {/* Logo with background wrapper */}
        <div style={styles.logoWrapper}>
          <img
            src={civoraLogo}
            alt="Civora Nexus"
            style={styles.logo}
          />
        </div>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/report" style={styles.link}>Report</Link>
        <Link to="/track" style={styles.link}>Track</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    height: "70px",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(90deg, #061425, #0A1F3D)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  brand: {
    color: "#00E5FF",
    fontSize: "20px",
    fontWeight: 600,
    margin: 0
  },

  divider: {
    color: "#6b7280",
    fontSize: "20px"
  },

  logoWrapper: {
    backgroundColor: "#ffffff",
    padding: "6px 10px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center"
  },

  logo: {
    height: "28px",
    objectFit: "contain"
  },

  links: {
    display: "flex",
    gap: "24px"
  },

  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 500
  }
};

export default Navbar;
