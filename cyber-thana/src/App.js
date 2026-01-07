import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Navbar = () => (
  <nav style={styles.navbar}>
    <h2 style={{ color: "#fff" }}>Cyber Thana</h2>
    <div>
      <Link style={styles.link} to="/">Home</Link>
      <Link style={styles.link} to="/report">Report</Link>
      <Link style={styles.link} to="/track">Track</Link>
      <Link style={styles.link} to="/awareness">Awareness</Link>
      <Link style={styles.link} to="/login">Login</Link>
    </div>
  </nav>
);

const Footer = () => (
  <footer style={styles.footer}>
    © 2026 Civora Nexus | CSF112 Internship Project
  </footer>
);

const Page = ({ title, children }) => (
  <div style={styles.page}>
    <h1>{title}</h1>
    {children}
  </div>
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Page title="Welcome to Cyber Thana">
          A centralized platform to report and track cyber crimes.
        </Page>} />

        <Route path="/report" element={<Page title="Report Cyber Crime">
          <input style={styles.input} placeholder="Name" />
          <input style={styles.input} placeholder="Email" />
          <textarea style={styles.textarea} placeholder="Describe incident" />
          <button style={styles.button}>Submit</button>
        </Page>} />

        <Route path="/track" element={<Page title="Track Complaint">
          <input style={styles.input} placeholder="Complaint ID" />
          <button style={styles.button}>Track</button>
        </Page>} />

        <Route path="/awareness" element={<Page title="Cyber Awareness">
          <ul>
            <li>Never share OTP</li>
            <li>Verify links</li>
            <li>Use strong passwords</li>
          </ul>
        </Page>} />

        <Route path="/login" element={<Page title="Login">
          <input style={styles.input} placeholder="Username" />
          <input style={styles.input} type="password" placeholder="Password" />
          <button style={styles.button}>Login</button>
        </Page>} />
      </Routes>
      <Footer />
    </Router>
  );
}

const styles = {
  navbar: {
    background: "#0b1f3a",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    marginLeft: "20px",
    textDecoration: "none",
    fontWeight: 500,
  },
  footer: {
    background: "#0b1f3a",
    color: "#fff",
    textAlign: "center",
    padding: "15px",
    marginTop: "40px",
  },
  page: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
  },
  button: {
    background: "#f04e30",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    marginTop: "10px",
    cursor: "pointer",
  },
};
