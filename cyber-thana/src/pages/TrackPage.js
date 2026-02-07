import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TrackPage.css";

const STATUS_STEPS = [
  {
    id: 1,
    name: "Report Submitted",
    description: "Your report has been received and is awaiting verification",
    icon: "📄",
    color: "#6366f1"
  },
  {
    id: 2,
    name: "Under Verification",
    description: "Our team is verifying the incident details and evidence",
    icon: "🔍",
    color: "#8b5cf6"
  },
  {
    id: 3,
    name: "Assigned to Cyber Cell",
    description: "Case has been assigned to an authorized cybercrime unit",
    icon: "👨‍💻",
    color: "#ec4899"
  },
  {
    id: 4,
    name: "Investigation in Progress",
    description: "Detailed investigation and evidence analysis underway",
    icon: "⚙️",
    color: "#f59e0b"
  },
  {
    id: 5,
    name: "Resolved",
    description: "Investigation complete and appropriate action taken",
    icon: "✅",
    color: "#10b981"
  }
];

const SAMPLE_CASES = [
  { id: "CTN-2026-847392", type: "Phishing / Social Engineering", date: "14 Jan 2026", statusIndex: 2 },
  { id: "CTN-2026-562891", type: "Financial Fraud", date: "12 Jan 2026", statusIndex: 3 },
  { id: "CTN-2026-934215", type: "Data Breach", date: "10 Jan 2026", statusIndex: 4 },
  { id: "CTN-2026-123456", type: "Account Compromise", date: "08 Jan 2026", statusIndex: 4 }
];

const INCIDENT_TYPES = {
  "Phishing / Social Engineering": {
    icon: "🎣",
    description: "Fraudulent attempts to obtain sensitive information"
  },
  "Financial Fraud": {
    icon: "💳",
    description: "Unauthorized financial transactions or scams"
  },
  "Data Breach": {
    icon: "🔓",
    description: "Unauthorized access to confidential data"
  },
  "Account Compromise": {
    icon: "👤",
    description: "Unauthorized access to user accounts"
  },
  "Ransomware / Malware": {
    icon: "🦠",
    description: "Malicious software attacks"
  }
};

// Icon components
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCase, setCurrentCase] = useState(null);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [showRecentCases, setShowRecentCases] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("trackPageTheme") || "dark";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("trackPageTheme", newTheme);
    document.body.className = newTheme;
  };

  const handleTrack = () => {
    if (!trackingId.trim()) {
      alert("Please enter a valid Tracking ID");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const foundCase = SAMPLE_CASES.find(caseItem => caseItem.id === trackingId) || {
        id: trackingId,
        type: "Phishing / Social Engineering",
        date: "14 Jan 2026",
        statusIndex: 3, // changed from 2 to 3
        anonymous: Math.random() > 0.5
      };

      setCurrentCase(foundCase);
      setShowStatus(true);
      setIsLoading(false);
    }, 800);
  };

  const handleSampleTrack = (sampleId) => {
    setTrackingId(sampleId);
    const foundCase = SAMPLE_CASES.find(caseItem => caseItem.id === sampleId);
    if (foundCase) {
      setCurrentCase(foundCase);
      setShowStatus(true);
    }
  };

  const handleClear = () => {
    setTrackingId("");
    setShowStatus(false);
    setCurrentCase(null);
  };

  const getStatusColor = (index) => {
    const status = STATUS_STEPS[index];
    return status ? status.color : "#94a3b8";
  };

  const getStatusDescription = (index) => {
    return STATUS_STEPS[index]?.description || "Status information unavailable";
  };

  const getNextSteps = (statusIndex) => {
    const steps = [
      "Ensure you have submitted all required evidence",
      "Check your registered email for verification updates",
      "Keep your tracking ID safe for future reference"
    ];

    if (statusIndex >= 2) {
      steps.push("You may be contacted by investigators if additional information is needed");
    }

    if (statusIndex >= 3) {
      steps.push("Monitor official communication channels for updates");
    }

    return steps;
  };

  return (
    <div className={`track-page ${theme}`}>
      {/* ================= HEADER ================= */}
      <motion.header
        className="track-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-container">
          <div className="header-brand">
            <div className="brand-logo">
              <ShieldIcon />
            </div>
            <div>
              <h1 className="header-title">Track Your Cyber Incident Report</h1>
              <p className="header-subtitle">
                Securely monitor the status of your submitted cybercrime complaint
              </p>
            </div>
          </div>

          <div className="header-actions">
            {hasNotifications && (
              <button
                type="button"
                className="notification-badge"
                onClick={() => setHasNotifications(false)}
                aria-label="View new notification"
              >
                <span className="notification-icon" aria-hidden="true">🔔</span>
                <span className="notification-count">1</span>
              </button>
            )}

            <button
              className="theme-toggle subtle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <>
                  <SunIcon /> Light Mode
                </>
              ) : (
                <>
                  <MoonIcon /> Dark Mode
                </>
              )}
            </button>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge">🔐 Secure Tracking</span>
          <span className="badge">📱 Mobile Friendly</span>
          <span className="badge">⏱️ Real-time Updates</span>
        </div>
      </motion.header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="track-content">
        {/* ================= TRACK INPUT CARD ================= */}
        <motion.div
          className="track-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="card-header">
            <h2>Enter Tracking ID</h2>
            <p className="card-subtitle">
              Use the unique ID provided when you submitted your report
            </p>
          </div>

          <div className="track-input-group">
            <div className="input-with-icon">
              <span className="input-icon">🔍</span>
              <input
                type="text"
                placeholder="e.g., CTN-2026-847392"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                className="track-input"
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />
              {trackingId && (
                <button className="clear-btn" onClick={() => setTrackingId("")} aria-label="Clear input">
                  ✕
                </button>
              )}
            </div>

            <div className="track-actions">
              <button
                className="secondary-btn"
                onClick={handleClear}
                disabled={!trackingId && !showStatus}
              >
                Clear
              </button>
              <button
                className="primary-btn"
                onClick={handleTrack}
                disabled={!trackingId.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Tracking...
                  </>
                ) : (
                  <>
                    <span>Track Status</span>
                    <span className="btn-icon">→</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="sample-cases">
            <div className="sample-header">
              <h4>Sample Tracking IDs (Demo)</h4>
              <button
                className="toggle-btn"
                onClick={() => setShowRecentCases(!showRecentCases)}
                aria-expanded={showRecentCases}
              >
                {showRecentCases ? "Hide" : "Show"}
              </button>
            </div>

            <AnimatePresence>
              {showRecentCases && (
                <motion.div
                  className="sample-list"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {SAMPLE_CASES.map((caseItem) => (
                    <button
                      type="button"
                      key={caseItem.id}
                      className="sample-item"
                      onClick={() => handleSampleTrack(caseItem.id)}
                    >
                      <span className="sample-id">{caseItem.id}</span>
                      <span className="sample-type">{caseItem.type}</span>
                      <span className="sample-date">{caseItem.date}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="track-guidance">
            <p className="guidance-text">
              <strong>Note:</strong> Tracking ID is case-sensitive.
              If you've lost your ID, contact support with your registered email.
            </p>
          </div>
        </motion.div>

        {/* ================= STATUS SECTION ================= */}
        <AnimatePresence>
          {showStatus && currentCase && (
            <motion.section
              className="status-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              {/* CASE OVERVIEW */}
              <div className="case-overview">
                <div className="overview-header">
                  <h3 id="case-overview-heading">Case Overview</h3>
                  <span
                    className="case-status-tag"
                    style={{ backgroundColor: getStatusColor(currentCase.statusIndex) }}
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    aria-labelledby="case-overview-heading"
                  >
                    {STATUS_STEPS[currentCase.statusIndex]?.name || "Unknown"}
                  </span>
                </div>

                <div className="overview-grid">
                  <div className="overview-item">
                    <span className="overview-label">Tracking ID</span>
                    <div className="overview-value id-value-container">
                      <span className="id-value">{currentCase.id}</span>
                      <button
                        className="copy-btn"
                        onClick={() => navigator.clipboard.writeText(currentCase.id)}
                        aria-label="Copy tracking ID"
                      >
                        📋 Copy
                      </button>
                    </div>
                  </div>

                  <div className="overview-item">
                    <span className="overview-label">Incident Type</span>
                    <div className="overview-value type-value-container">
                      <span className="type-icon">{INCIDENT_TYPES[currentCase.type]?.icon || "⚠️"}</span>
                      <div className="type-text-container">
                        <span className="type-name">{currentCase.type}</span>
                        <span className="type-description">{INCIDENT_TYPES[currentCase.type]?.description}</span>
                      </div>
                    </div>
                  </div>

                  <div className="overview-item">
                    <span className="overview-label">Submitted On</span>
                    <span className="overview-value date-value">{currentCase.date}</span>
                  </div>

                  <div className="overview-item">
                    <span className="overview-label">Reporting Mode</span>
                    <span className={`overview-value mode-value ${currentCase.anonymous ? 'anonymous' : 'registered'}`}>
                      {currentCase.anonymous ? "Anonymous Report" : "Registered User"}
                    </span>
                  </div>
                </div>
              </div>

              {/* STATUS TIMELINE */}
              <div className="status-timeline">
                <div className="timeline-header">
                  <h3>Status Timeline</h3>
                  <span className="current-step">
                    Step {currentCase.statusIndex + 1} of {STATUS_STEPS.length}
                  </span>
                </div>

                <div className="timeline-container">
                  <div className="timeline-line">
                    <div
                      className="timeline-progress"
                      style={{ width: `${(currentCase.statusIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                    />
                  </div>

                  {STATUS_STEPS.map((step, index) => (
                    <div
                      key={step.id}
                      className={`timeline-step ${index <= currentCase.statusIndex ? "active" : ""} ${index === currentCase.statusIndex ? "current" : ""}`}
                    >
                      <div
                        className="timeline-dot"
                        style={{
                          backgroundColor: index <= currentCase.statusIndex ? step.color : "#cbd5e1",
                          borderColor: step.color
                        }}
                      >
                        <span className="step-icon">{step.icon}</span>
                      </div>

                      <div className="step-content">
                        <h4 className="step-title">{step.name}</h4>
                        <p className="step-description">{step.description}</p>

                        {index === currentCase.statusIndex && (
                          <div className="current-status-note">
                            <span
                              className="current-badge"
                              role="status"
                              aria-live="polite"
                              aria-atomic="true"
                            >
                              Current status: {STATUS_STEPS[currentCase.statusIndex]?.name || "Unknown"}
                            </span>
                          </div>
                        )}

                        {index < currentCase.statusIndex && (
                          <div className="completed-note">
                            <span className="completed-badge">✓ Completed</span>
                            <span className="completed-date">
                              {index === 0 ? currentCase.date : `Estimated: ${index + 1} days ago`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STATUS DETAILS & NEXT STEPS */}
              <div className="status-details">
                <div className="details-card">
                  <h3>Current Status Details</h3>
                  <p className="status-description">
                    {getStatusDescription(currentCase.statusIndex)}
                  </p>

                  <div className="status-meta">
                    <div className="meta-item">
                      <span className="meta-label">Last Updated</span>
                      <span className="meta-value">Today, 14:30</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Next Update Expected</span>
                      <span className="meta-value">Within 24 hours</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Case Officer</span>
                      <span className="meta-value confidential">Confidential</span>
                    </div>
                  </div>
                </div>

                <div className="next-steps-card">
                  <h3>Next Steps & Expectations</h3>
                  <ul className="steps-list">
                    {getNextSteps(currentCase.statusIndex).map((step, index) => (
                      <li key={index} className="step-item">
                        <span className="step-number">{index + 1}</span>
                        <span className="step-text">{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="response-time">
                    <span className="time-icon">⏱️</span>
                    <div className="time-content">
                      <span className="time-label">Expected Response Time:</span>
                      <span className="time-value">
                        {currentCase.statusIndex < 3 ? "Within 72 hours" : "Within 7 working days"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECURITY NOTICE */}
              <div className="security-notice">
                <div className="notice-icon">🛡️</div>
                <div className="notice-content">
                  <h4>Security & Privacy Notice</h4>
                  <p>
                    Investigation details remain confidential to protect the integrity of the case.
                    Only status-level information is displayed here. You will be contacted directly
                    if additional information or action is required from your side.
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ================= HELP INFO SECTION ================= */}
        <section className="track-info">
          <div className="info-section-header">
            <h2>Need Help or Additional Information?</h2>
            <p>Important guidelines and support channels for your reference</p>
          </div>

          <div className="info-grid">
            <div className="info-card privacy">
              <div className="info-icon">🔒</div>
              <h4>Privacy Protected</h4>
              <div className="info-card-content">
                <p>
                  Only status-level updates are shown. Investigation details, evidence,
                  and officer information remain confidential to ensure case integrity.
                </p>
                <a href="/privacy" className="info-link">Learn about our privacy policy →</a>
              </div>
            </div>

            <div className="info-card notifications">
              <div className="info-icon">📩</div>
              <h4>Notifications & Updates</h4>
              <div className="info-card-content">
                <p>
                  Receive automatic updates via SMS or email when your case status changes.
                  Ensure your contact information is up-to-date for timely notifications.
                </p>
                <div className="notification-settings">
                  <span className="setting-status">🔔 Notifications Active</span>
                  <button className="setting-btn">Manage</button>
                </div>
              </div>
            </div>

            <div className="info-card emergency">
              <div className="info-icon">🚨</div>
              <h4>Emergency Support</h4>
              <div className="info-card-content">
                <p>
                  For active fraud, financial loss, or immediate threats:
                  <strong> Do not wait for online updates.</strong>
                </p>
                <div className="emergency-contacts">
                  <div className="contact-item">
                    <span className="contact-label">Cyber Crime Helpline</span>
                    <span className="contact-value">+91-155-260</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Email Support</span>
                    <span className="contact-value email-support">emergency@cyberthana.gov.in</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card resources">
              <div className="info-icon">📚</div>
              <h4>Additional Resources</h4>
              <div className="info-card-content">
                <ul className="resources-list">
                  <li><a href="/faq">Frequently Asked Questions</a></li>
                  <li><a href="/resources">Cyber Safety Guidelines</a></li>
                  <li><a href="/victim">Report Additional Evidence</a></li>
                  <li><a href="/contact">Contact Investigation Team</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SUPPORT BANNER ================= */}
        <div className="support-banner">
          <div className="banner-content">
            <div className="banner-icon">💬</div>
            <div className="banner-text">
              <h3>Need to speak with someone?</h3>
              <p>Our support team is available 24/7 to assist with tracking issues or urgent concerns.</p>
            </div>
          </div>
          <button className="banner-btn">Contact Support</button>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="track-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <ShieldIcon />
              <span>Civora Nexus</span>
            </div>
            <p className="footer-description">
              Citizen Cyber Incident Reporting & Tracking Platform
            </p>
            <div className="footer-trust">
              <span className="trust-badge">ISO 27001 Certified</span>
              <span className="trust-badge">GDPR Compliant</span>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <a href="/report">Report New Incident</a>
            <a href="/track">Track Existing Report</a>
            <a href="/guidelines">Safety Guidelines</a>
            <a href="/faq">Help & FAQ</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
            <a href="/accessibility">Accessibility</a>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <div className="footer-contact">
              <p> +91-XXX-XXXX-XXX</p>
              <p> support@civorane.us</p>
              <p> Cyber Security Authority</p>
              <p>📧 support@civorane.us</p>
              <p>📍 Cyber Security Authority</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            {new Date().getFullYear()} Civora Nexus · Citizen Cyber Incident Portal · All rights reserved
          </div>
          <div className="footer-links">
            <a href="/status">Status</a>
            <span className="divider">·</span>
            <a href="/sitemap">Sitemap</a>
            <span className="divider">·</span>
            <a href="/vulnerability">Report Vulnerability</a>
          </div>
        </div>
      </footer>
    </div>
  );
}