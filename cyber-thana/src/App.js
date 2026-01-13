import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context Providers
import { AuthProvider } from "./context/AuthContext";

// Public Pages
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import TrackPage from "./pages/TrackPage";
import ResourcesPage from "./pages/ResourcesPage";

// Portal Layouts
import VictimPortal from "./pages/VictimPortal";
import PolicePortal from "./pages/PolicePortal";

// Auth Components
import VictimLogin from "./components/victim/VictimLogin";
import PoliceLogin from "./components/police/PoliceLogin";

// Placeholder components
const VictimDashboard = () => (
  <div className="dashboard-container">
    <h3>Welcome to Victim Dashboard</h3>
    <p>This is your secure portal to manage cybercrime reports.</p>
    <div className="dashboard-stats">
      <div className="stat-card">
        <h4>Active Complaints</h4>
        <span className="stat-value">0</span>
      </div>
      <div className="stat-card">
        <h4>Resolved Cases</h4>
        <span className="stat-value">0</span>
      </div>
    </div>
  </div>
);

const FileComplaint = () => (
  <div className="complaint-form">
    <h3>File a New Complaint</h3>
    <p>This feature is under development.</p>
  </div>
);

const MyComplaints = () => (
  <div className="my-complaints">
    <h3>My Complaints</h3>
    <p>No complaints filed yet.</p>
  </div>
);

const SafetyTips = () => (
  <div className="safety-tips">
    <h3>Cyber Safety Tips</h3>
    <ul>
      <li>Never share OTPs with anyone</li>
      <li>Use strong, unique passwords</li>
      <li>Enable two-factor authentication</li>
    </ul>
  </div>
);

// Police components
const PoliceDashboard = () => <div>Police Dashboard - Coming Soon</div>;
const CaseManagement = () => <div>Case Management - Coming Soon</div>;

// 404 Page
const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          
          {/* Victim Portal Routes */}
          <Route path="/victim" element={<VictimPortal />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<VictimLogin />} />
            <Route path="dashboard" element={<VictimDashboard />} />
            <Route path="file-complaint" element={<FileComplaint />} />
            <Route path="my-complaints" element={<MyComplaints />} />
            <Route path="safety-tips" element={<SafetyTips />} />
          </Route>
          
          {/* Police Portal Routes */}
          <Route path="/police" element={<PolicePortal />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<PoliceLogin />} />
            <Route path="dashboard" element={<PoliceDashboard />} />
            <Route path="cases" element={<CaseManagement />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;