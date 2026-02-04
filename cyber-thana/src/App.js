import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ================= CONTEXT =================
import AuthProvider from "./context/AuthContext";

// ================= COMPONENTS =================
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import LogoutButton from "./components/LogoutButton";
import Dashboard from "./components/Dashboard";

// ================= PUBLIC PAGES =================
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import TrackPage from "./pages/TrackPage";
import ResourcesPage from "./pages/ResourcesPage.jsx";
import ContactPage from "./pages/ContactPage";

// ================= PORTALS (Layouts) =================
import VictimPortal from "./pages/VictimPortal";
import PolicePortal from "./pages/PolicePortal";

// ================= VICTIM COMPONENTS =================
import VictimLogin from "./components/victim/VictimLogin";
import VictimDashboard from "./components/victim/VictimDashboard";
import MyComplaints from "./components/victim/MyComplaints";
import InfographicsPage from "./components/victim/Infographics";
import AnonymousReport from "./components/victim/AnonymousReport";

// ================= POLICE COMPONENTS =================
import PoliceLogin from "./components/police/PoliceLogin";
import PoliceDashboard from "./components/police/PoliceDashboard";
import CaseManagement from "./components/police/CaseManagement";
import PoliceAnalytics from "./components/police/PoliceAnalytics";

// ================= 404 PAGE =================
const NotFound = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/infographics" element={<InfographicsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />

          {/* Standalone Anonymous Reporting */}
          <Route path="/anonymous" element={<AnonymousReport />} />

          {/* ================= PROTECTED ROUTES ================= */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute>
              <div>
                <h1>Admin Panel</h1>
                <LogoutButton />
              </div>
            </ProtectedRoute>
          } />

          <Route path="/reports" element={
            <ProtectedRoute>
              <div>
                <h1>Reports</h1>
                <LogoutButton />
              </div>
            </ProtectedRoute>
          } />

          {/* ================= VICTIM PORTAL ================= */}
          <Route path="/victim" element={<VictimPortal />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<VictimLogin />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <VictimDashboard />
              </ProtectedRoute>
            } />
            <Route path="my-complaints" element={
              <ProtectedRoute>
                <MyComplaints />
              </ProtectedRoute>
            } />
          </Route>

          {/* ================= POLICE PORTAL ================= */}
          <Route path="/police" element={<PolicePortal />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<PoliceLogin />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <PoliceDashboard />
              </ProtectedRoute>
            } />
            <Route path="cases" element={
              <ProtectedRoute>
                <CaseManagement />
              </ProtectedRoute>
            } />
            <Route path="analytics" element={
              <ProtectedRoute>
                <PoliceAnalytics />
              </ProtectedRoute>
            } />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
