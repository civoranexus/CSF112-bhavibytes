import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import TrackPage from "./pages/TrackPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/track" element={<TrackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
