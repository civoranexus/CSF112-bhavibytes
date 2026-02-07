import React, { useState } from "react";
import { motion } from "framer-motion";
import "./ReportPage.css";

const steps = [
  "Incident Details",
  "Personal Information",
  "Evidence Upload",
  "Review & Submit",
];

const INCIDENT_TYPES = [
  "Ransomware / Malware",
  "Phishing / Social Engineering",
  "Data Breach / Exfiltration",
  "DDoS Attack",
  "Insider Threat",
  "Lost / Stolen Device",
  "Account Compromise",
  "Other",
];

// Icons (you can replace with actual SVG components or icon library)
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [incidentType, setIncidentType] = useState("");
  const [otherIncident, setOtherIncident] = useState("");
  const [theme, setTheme] = useState("dark");
  const [formData, setFormData] = useState({
    platform: "",
    description: "",
    name: "",
    email: "",
    phone: "",
    confirmInfo: false
  });

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const nextStep = () =>
    currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);

  const prevStep = () =>
    currentStep > 0 && setCurrentStep(currentStep - 1);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting report:", { incidentType, otherIncident, formData });
    alert("Report submitted successfully. You will receive a confirmation email shortly.");
  };

  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className={`report-page ${theme}`}>
      {/* ================= HEADER ================= */}
      <motion.header
        className="report-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-container">
          <div className="header-brand">
            <div className="brand-logo">
              <ShieldIcon />
            </div>
            <div>
              <h1 className="header-title">Report a Cyber Incident</h1>
              <p className="header-subtitle">
                Secure, confidential reporting for authorized cyber response teams
              </p>
            </div>
          </div>
          <div className="header-actions">
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
        
        <div className="security-badges">
          <span className="badge">🔒 End-to-End Encrypted</span>
          <span className="badge">🛡️ GDPR Compliant</span>
          <span className="badge">⏱️ 24/7 Response</span>
        </div>
      </motion.header>

      {/* ================= INCIDENT WIZARD ================= */}
      <section className="wizard-section">
        <div className="section-header">
          <h2>Classify the Incident</h2>
          <p className="section-subtitle">
            Select the category that best describes your incident.
          </p>
        </div>

        <div className="wizard-grid">
          {INCIDENT_TYPES.map((type) => (
            <button
              key={type}
              className={`wizard-card ${
                incidentType === type ? "active" : ""
              }`}
              onClick={() => setIncidentType(type)}
            >
              <span className="card-title">{type}</span>
              <span className="card-hint">Click to select</span>
            </button>
          ))}
        </div>

        {incidentType === "Other" && (
          <motion.div
            className="other-input-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <label className="input-label">Please specify:</label>
            <textarea
              className="form-textarea"
              placeholder="Describe the incident type..."
              value={otherIncident}
              onChange={(e) => setOtherIncident(e.target.value)}
              rows={3}
            />
          </motion.div>
        )}
      </section>

      {/* ================= MULTI CHANNEL ================= */}
      <section className="channels-section">
        <div className="section-header">
          <h2>Alternative Reporting Channels</h2>
          <p className="section-subtitle">
            Choose the method that works best for your situation
          </p>
        </div>
        <div className="channels-grid">
          <div className="channel-card primary">
            <div className="channel-icon">🌐</div>
            <h3>Web Form</h3>
            <p>Secure online incident reporting</p>
            <span className="channel-tag">Recommended</span>
          </div>
          <div className="channel-card">
            <div className="channel-icon">📞</div>
            <h3>24/7 Helpline</h3>
            <p>+1-888-555-1234</p>
            <span className="channel-subtext">Immediate assistance</span>
          </div>
          <div className="channel-card">
            <div className="channel-icon">📧</div>
            <h3>Secure Email</h3>
            <p>incident@response.gov</p>
            <span className="channel-subtext">PGP: 0xA1B2C3D4</span>
          </div>
          <div className="channel-card muted">
            <div className="channel-icon">💬</div>
            <h3>Secure Messaging</h3>
            <p>Available soon</p>
            <span className="channel-tag">Coming Q4 2024</span>
          </div>
        </div>
      </section>

      {/* ================= STEPPER ================= */}
      <div className="stepper-container">
        <div className="stepper">
          <div className="stepper-progress">
            <div 
              className="stepper-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${index === currentStep ? "active" : ""} ${
                index < currentStep ? "completed" : ""
              }`}
            >
              <div className="step-indicator">
                {index < currentStep ? "✓" : index + 1}
              </div>
              <p className="step-label">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FORM ================= */}
      <motion.div
        className="form-card"
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="form-header">
          <h2>{steps[currentStep]}</h2>
          <p className="form-subtitle">
            {currentStep === 0 && "Provide detailed information about the incident"}
            {currentStep === 1 && "Your contact information for follow-up"}
            {currentStep === 2 && "Upload relevant evidence files"}
            {currentStep === 3 && "Review your submission before finalizing"}
          </p>
        </div>

        {currentStep === 0 && (
          <div className="form-content">
            <div className="input-group">
              <label className="input-label">Affected Platform / Service</label>
              <input 
                className="form-input"
                name="platform"
                placeholder="e.g., Corporate Email, CRM System, Web Server"
                value={formData.platform}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Incident Description</label>
              <textarea 
                className="form-textarea"
                name="description"
                placeholder="Describe what happened, including date, time, and any observed suspicious activities..."
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
              />
              <p className="helper-text">
                Be specific about timelines, affected users, and immediate actions taken
              </p>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="form-content">
            <div className="input-group">
              <label className="input-label">Full Name <span className="required">*</span></label>
              <input 
                className="form-input"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Email Address <span className="required">*</span></label>
              <input 
                className="form-input"
                name="email"
                type="email"
                placeholder="john.doe@company.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input 
                className="form-input"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <p className="helper-text">Optional, but recommended for urgent incidents</p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-content">
            <div className="upload-area">
              <div className="upload-zone">
                <UploadIcon />
                <h4>Drag & drop files here</h4>
                <p className="upload-subtitle">
                  Supports: PDF, PNG, JPG, TXT, LOG, PCAP (Max 10MB each)
                </p>
                <button className="secondary-btn">Browse Files</button>
              </div>
              <div className="upload-requirements">
                <h5>Recommended evidence:</h5>
                <ul>
                  <li>Screenshots of error messages</li>
                  <li>Phishing email headers</li>
                  <li>Log files</li>
                  <li>Transaction records</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-content">
            <div className="review-section">
              <h3>Review Your Report</h3>
              <div className="review-grid">
                <div className="review-item">
                  <span className="review-label">Incident Type:</span>
                  <span className="review-value">{incidentType}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Affected Platform:</span>
                  <span className="review-value">{formData.platform || "Not specified"}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Reported By:</span>
                  <span className="review-value">{formData.name}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Contact Email:</span>
                  <span className="review-value">{formData.email}</span>
                </div>
              </div>
              
              <div className="confirmation-section">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    name="confirmInfo"
                    checked={formData.confirmInfo}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-label">
                    I confirm the information provided is accurate to the best of my knowledge
                  </span>
                </label>
                
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="checkbox-label">
                    I consent to sharing this information with authorized response teams
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="form-actions">
          <div className="form-left">
            {currentStep > 0 && (
              <button className="secondary-btn" onClick={prevStep}>
                ← Back
              </button>
            )}
          </div>
          <div className="form-right">
            {currentStep < steps.length - 1 ? (
              <button 
                className="primary-btn" 
                onClick={nextStep}
                disabled={currentStep === 0 && !incidentType}
              >
                Continue →
              </button>
            ) : (
              <button 
                className="primary-btn submit" 
                onClick={handleSubmit}
                disabled={!formData.confirmInfo}
              >
                Submit Report
              </button>
            )}
          </div>
        </div>
        
        <div className="form-footer">
          <p className="form-footer-text">
            <strong>Note:</strong> All reports are encrypted and handled according to our 
            <a href="#"> Privacy Policy</a> and <a href="#">Terms of Service</a>.
          </p>
        </div>
      </motion.div>

      {/* ================= FOOTER ================= */}
      <footer className="report-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <ShieldIcon />
              <span>Civora Nexus</span>
            </div>
            <p className="footer-description">
              Citizen Cyber Incident Reporting Platform. Secure, reliable, and confidential incident reporting for citizens and organizations.
            </p>
            <div className="footer-contact">
              <p>📍 123 Security Blvd, Cyber City</p>
              <p>📧 support@civorane.us</p>
            </div>
          </div>
          
          <div className="footer-column">
            <h4>Resources</h4>
            <a href="#">Incident Response Guide</a>
            <a href="#">Security Best Practices</a>
            <a href="#">Glossary</a>
            <a href="#">FAQ</a>
          </div>
          
          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Compliance</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Civora Nexus. All rights reserved.
          </div>
          <div className="footer-links">
            <a href="#">Status</a>
            <a href="#">Accessibility</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}