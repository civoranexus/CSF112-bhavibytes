import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AnonymousReport.css";

const AnonymousReport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    incidentType: "",
    description: "",
    dateTime: "",
    location: "",
    evidence: null,
  });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const incidentTypes = [
    "Online Fraud / Scam",
    "Identity Theft",
    "Cyber Bullying / Harassment",
    "Social Media Account Hacking",
    "Financial Fraud (UPI/Banking)",
    "Phishing Attack",
    "Data Breach",
    "Ransomware Attack",
    "Online Blackmail",
    "Other",
  ];

  // Scroll to top when component mounts or step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, submitted]);

  // Check for unsaved changes
  useEffect(() => {
    const hasData = Object.values(formData).some(
      (value) => value !== "" && value !== null
    );
    setHasUnsavedChanges(hasData);
  }, [formData]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges && !submitted) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges, submitted]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "evidence") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    if (step === 1 && formData.incidentType) {
      setStep(2);
    } else if (step === 2 && formData.description && formData.dateTime && formData.location) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate tracking ID
    const newTrackingId = `ANON-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setTrackingId(newTrackingId);
    setSubmitted(true);
    setHasUnsavedChanges(false);
    
    // In real app, send data to backend here
    console.log("Anonymous report submitted:", formData);
  };

  const generateNewReport = () => {
    setFormData({
      incidentType: "",
      description: "",
      dateTime: "",
      location: "",
      evidence: null,
    });
    setStep(1);
    setSubmitted(false);
    setTrackingId("");
    setHasUnsavedChanges(false);
  };

  const handleGoHome = () => {
    if (hasUnsavedChanges && !submitted) {
      setShowExitConfirm(true);
    } else {
      navigate("/");
    }
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    navigate("/");
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
  };

  if (submitted) {
    return (
      <div className="anonymous-report-page">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h2>Report Submitted Successfully!</h2>
          <p className="success-message">
            Your anonymous report has been received by the Cyber Crime Cell.
          </p>
          
          <div className="tracking-card">
            <div className="tracking-header">
              <span className="tracking-icon">🔒</span>
              <h3>Anonymous Tracking ID</h3>
            </div>
            <p className="tracking-id">{trackingId}</p>
            <p className="tracking-note">
              Use this ID to track your report status without revealing your identity.
            </p>
          </div>

          <div className="next-steps">
            <h4>What happens next?</h4>
            <ul>
              <li>Your report will be reviewed by cyber crime experts</li>
              <li>If sufficient evidence is found, investigation will begin</li>
              <li>You can track progress using your tracking ID</li>
              <li>No personal information is stored or required</li>
            </ul>
          </div>

          <div className="action-buttons">
            <button className="btn-secondary" onClick={generateNewReport}>
              File Another Report
            </button>
            <Link to="/track" className="btn-primary">
              Track This Report
            </Link>
            <button className="btn-home" onClick={() => navigate("/")}>
              ← Back to Home
            </button>
          </div>

          <div className="security-notice">
            <span className="security-icon">🛡️</span>
            <p>
              <strong>Your anonymity is protected.</strong> We use end-to-end encryption and 
              never store any personal information. Your tracking ID is the only way to 
              access your report.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="anonymous-report-page">
      {/* Back Button to Home */}
      <div className="back-to-home-container">
        <button 
          className="back-to-home-btn"
          onClick={handleGoHome}
        >
          ← Back to Home
        </button>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="exit-confirm-overlay">
          <div className="exit-confirm-modal">
            <div className="exit-confirm-header">
              <span className="warning-icon">⚠️</span>
              <h3>Unsaved Changes</h3>
            </div>
            
            <div className="exit-confirm-body">
              <p>You have unsaved changes in your report.</p>
              <p>Are you sure you want to leave? All progress will be lost.</p>
            </div>
            
            <div className="exit-confirm-actions">
              <button 
                className="exit-cancel-btn"
                onClick={cancelExit}
              >
                Cancel
              </button>
              <button 
                className="exit-confirm-btn"
                onClick={confirmExit}
              >
                Leave Page
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="report-container">
        {/* Header */}
        <div className="report-header">
          <div className="header-icon">🕵️</div>
          <h1>Anonymous Cyber Crime Report</h1>
          <p className="header-subtitle">
            Report cyber crime incidents securely without revealing your identity
          </p>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className={`step ${stepNum === step ? 'active' : stepNum < step ? 'completed' : ''}`}>
              <div className="step-number">{stepNum}</div>
              <div className="step-label">
                {stepNum === 1 && "Incident Type"}
                {stepNum === 2 && "Details"}
                {stepNum === 3 && "Review"}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="report-form">
          {step === 1 && (
            <div className="form-step">
              <h3>What type of incident occurred?</h3>
              <p className="step-description">
                Select the category that best describes the cyber crime
              </p>
              
              <div className="incident-grid">
                {incidentTypes.map((type) => (
                  <label key={type} className="incident-option">
                    <input
                      type="radio"
                      name="incidentType"
                      value={type}
                      checked={formData.incidentType === type}
                      onChange={handleChange}
                      required
                    />
                    <div className="option-content">
                      <span className="option-icon">
                        {type.includes("Fraud") ? "💳" : 
                         type.includes("Theft") ? "🆔" : 
                         type.includes("Bullying") ? "😔" : 
                         type.includes("Hacking") ? "🔓" : 
                         type.includes("Phishing") ? "🎣" : 
                         type.includes("Ransomware") ? "💰" : 
                         type.includes("Blackmail") ? "✉️" : 
                         "🛡️"}
                      </span>
                      <span className="option-text">{type}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>Provide incident details</h3>
              <p className="step-description">
                Please describe what happened (no personal information needed)
              </p>
              
              <div className="form-group">
                <label htmlFor="description">
                  <span className="label-icon">📝</span>
                  Description of incident
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what happened, when, and how..."
                  rows="5"
                  required
                />
                <small className="helper-text">
                  Include relevant details like website URLs, app names, transaction IDs if available
                </small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dateTime">
                    <span className="label-icon">📅</span>
                    When did it happen?
                  </label>
                  <input
                    type="datetime-local"
                    id="dateTime"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">
                    <span className="label-icon">📍</span>
                    Location (City/State)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Delhi, Maharashtra"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="evidence">
                  <span className="label-icon">📎</span>
                  Attach evidence (optional)
                </label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="evidence"
                    name="evidence"
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                  />
                  <div className="upload-info">
                    <span className="upload-icon">📤</span>
                    <div>
                      <p>Upload screenshots, documents, or images</p>
                      <small>Max 10MB • JPG, PNG, PDF, DOC, TXT</small>
                    </div>
                  </div>
                </div>
                {formData.evidence && (
                  <div className="file-preview">
                    <span className="file-icon">📄</span>
                    <span>{formData.evidence.name}</span>
                    <button 
                      type="button" 
                      className="remove-file"
                      onClick={() => setFormData({...formData, evidence: null})}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h3>Review your report</h3>
              <p className="step-description">
                Verify the information before submitting anonymously
              </p>
              
              <div className="review-card">
                <div className="review-section">
                  <h4>
                    <span className="review-icon">🔍</span>
                    Incident Details
                  </h4>
                  <div className="review-item">
                    <strong>Type:</strong>
                    <span>{formData.incidentType}</span>
                  </div>
                  <div className="review-item">
                    <strong>Date & Time:</strong>
                    <span>{formData.dateTime || "Not specified"}</span>
                  </div>
                  <div className="review-item">
                    <strong>Location:</strong>
                    <span>{formData.location || "Not specified"}</span>
                  </div>
                </div>

                <div className="review-section">
                  <h4>
                    <span className="review-icon">📋</span>
                    Description
                  </h4>
                  <div className="review-description">
                    {formData.description || "No description provided"}
                  </div>
                </div>

                {formData.evidence && (
                  <div className="review-section">
                    <h4>
                      <span className="review-icon">📎</span>
                      Attached Evidence
                    </h4>
                    <div className="review-item">
                      <strong>File:</strong>
                      <span>{formData.evidence.name}</span>
                    </div>
                  </div>
                )}

                <div className="privacy-notice">
                  <span className="privacy-icon">🔒</span>
                  <div>
                    <strong>Your privacy is protected</strong>
                    <p>
                      No personal information will be collected. Your report will be 
                      processed completely anonymously.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {step > 1 && (
              <button type="button" className="btn-back" onClick={handleBack}>
                ← Back
              </button>
            )}
            
            {step < 3 ? (
              <button type="button" className="btn-next" onClick={handleNext}>
                Continue →
              </button>
            ) : (
              <button type="submit" className="btn-submit">
                🕵️ Submit Anonymously
              </button>
            )}
          </div>
        </form>

        {/* Security Info */}
        <div className="security-features">
          <div className="security-feature">
            <span className="feature-icon">🔒</span>
            <div>
              <strong>End-to-End Encryption</strong>
              <p>All data is encrypted and anonymous</p>
            </div>
          </div>
          <div className="security-feature">
            <span className="feature-icon">🆔</span>
            <div>
              <strong>No Identity Required</strong>
              <p>Report without sharing personal details</p>
            </div>
          </div>
          <div className="security-feature">
            <span className="feature-icon">📊</span>
            <div>
              <strong>Track Progress</strong>
              <p>Get a tracking ID to monitor your report</p>
            </div>
          </div>
        </div>

        {/* Help Links */}
        <div className="help-links">
          <Link to="/victim">Need registered reporting?</Link>
          <Link to="/resources">View safety resources</Link>
          <Link to="/track">Track existing report</Link>
        </div>
      </div>
    </div>
  );
};

export default AnonymousReport;