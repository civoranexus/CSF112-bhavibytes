import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ContactPage.css";

// Icons
const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
    <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const TicketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const TeamIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Contact categories
const contactCategories = [
  { id: 1, title: "General Inquiry", icon: "📧", color: "#1B9AAA" },
  { id: 2, title: "Technical Support", icon: "🔧", color: "#142C52" },
  { id: 3, title: "Security Incident", icon: "🚨", color: "#ff4757" },
  { id: 4, title: "Business Partnership", icon: "🤝", color: "#02394A" },
  { id: 5, title: "Media Inquiry", icon: "📰", color: "#16808D" },
  { id: 6, title: "Feedback", icon: "💬", color: "#0E2140" },
];

// Support teams
const supportTeams = [
  {
    id: 1,
    name: "Technical Support",
    icon: "🔧",
    description: "24/7 technical assistance and troubleshooting",
    responseTime: "1-2 hours",
    contact: "support@civora-nexus.com",
    color: "#1B9AAA"
  },
  {
    id: 2,
    name: "Security Team",
    icon: "🛡️",
    description: "Security incidents and threat reporting",
    responseTime: "Immediate",
    contact: "security@civora-nexus.com",
    color: "#142C52"
  },
  {
    id: 3,
    name: "Customer Success",
    icon: "⭐",
    description: "Account management and partnership inquiries",
    responseTime: "4-6 hours",
    contact: "success@civora-nexus.com",
    color: "#02394A"
  },
  {
    id: 4,
    name: "Billing Department",
    icon: "💳",
    description: "Billing, invoices, and payment questions",
    responseTime: "24 hours",
    contact: "billing@civora-nexus.com",
    color: "#16808D"
  },
];

// FAQ Data
const faqItems = [
  {
    id: 1,
    question: "What is Cívora Nexus's typical response time?",
    answer: "We pride ourselves on rapid response times: Security incidents - immediate, Technical support - 1-2 hours, General inquiries - 4-6 hours. All queries receive initial acknowledgment within 15 minutes."
  },
  {
    id: 2,
    question: "How do I report a cybersecurity incident?",
    answer: "For urgent security incidents, email security@civora-nexus.com or call our 24/7 hotline. Include as much detail as possible: time of incident, affected systems, observed symptoms, and any error messages."
  },
  {
    id: 3,
    question: "What information should I include in my support request?",
    answer: "Please include: Your contact details, organization name, detailed description of the issue, steps to reproduce, error messages, affected system/software versions, and any screenshots or logs."
  },
  {
    id: 4,
    question: "Do you provide emergency support services?",
    answer: "Yes! We offer 24/7 emergency support for critical incidents. Our security operations center monitors threats continuously and provides immediate response for breach containment and recovery."
  },
  {
    id: 5,
    question: "How can I schedule a consultation call?",
    answer: "Use our scheduling tool to book a consultation. Choose your preferred date/time and specify your requirements. We'll confirm via email and provide meeting details within 4 hours."
  },
  {
    id: 6,
    question: "What security certifications does Cívora Nexus hold?",
    answer: "We maintain ISO 27001, SOC 2 Type II, and GDPR compliance certifications. All our security protocols are regularly audited and updated to meet global cybersecurity standards."
  },
];

// Emergency contacts
const emergencyContacts = [
  { id: 1, name: "24/7 Security Hotline", number: "+91 98765 43210", description: "Immediate security incident response" },
  { id: 2, name: "Critical Support Line", number: "+91 98765 43211", description: "Urgent technical support" },
  { id: 3, name: "Abuse Reporting", number: "+91 98765 43212", description: "Report abuse or malicious activity" },
  { id: 4, name: "Data Breach Hotline", number: "+91 98765 43213", description: "Data breach and privacy incidents" },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "General Inquiry",
    message: "",
    priority: "Normal",
    attachment: null,
    subscribe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    date: "",
    time: "",
    duration: "30",
    purpose: "General Discussion",
    attendees: "1"
  });
  const [ticketNumber, setTicketNumber] = useState(null);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("contactTheme") || "dark";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("contactTheme", newTheme);
    document.body.className = newTheme;
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateTicketNumber = () => {
    const prefix = "CIV";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate ticket number
    const newTicketNumber = generateTicketNumber();
    setTicketNumber(newTicketNumber);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        inquiryType: "General Inquiry",
        message: "",
        priority: "Normal",
        attachment: null,
        subscribe: false
      });

      // Show success message with ticket number
      alert(`✅ Message sent successfully!\n\nYour ticket number: ${newTicketNumber}\n\nWe'll contact you within the response time for your inquiry type.`);
    }, 1500);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    
    // Generate meeting ID
    const meetingId = `MTG-${Date.now().toString().slice(-8)}`;
    
    alert(`✅ Meeting scheduled successfully!\n\nMeeting ID: ${meetingId}\nDate: ${scheduleData.date}\nTime: ${scheduleData.time}\nDuration: ${scheduleData.date} minutes\n\nCalendar invite has been sent to your email.`);
    
    setShowScheduleModal(false);
    setScheduleData({
      date: "",
      time: "",
      duration: "30",
      purpose: "General Discussion",
      attendees: "1"
    });
  };

  const handleDownloadResources = () => {
    alert("📥 Downloading contact resources...\n\nIncludes: Contact directory, support procedures, emergency protocols, and response templates.");
  };

  const handleCreateSupportTicket = () => {
    const ticketNum = generateTicketNumber();
    alert(`🎫 Support ticket created!\n\nTicket Number: ${ticketNum}\n\nA support specialist will contact you within 1 hour.`);
    setTicketNumber(ticketNum);
  };

  const handleLiveChat = () => {
    alert("💬 Connecting you to live chat support...\n\nOur support agents are available 24/7 to assist you.");
  };

  const handleCallNow = (number, name) => {
    if (window.confirm(`📞 Call ${name} at ${number}?`)) {
      window.location.href = `tel:${number}`;
    }
  };

  const handleEmailNow = (email, name) => {
    if (window.confirm(`📧 Email ${name} at ${email}?`)) {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleDownloadTemplate = (type) => {
    const templates = {
      incident: "📄 Incident Report Template",
      support: "📄 Support Request Template",
      general: "📄 General Inquiry Template"
    };
    alert(`Downloading ${templates[type]}...\n\nThe template will help you structure your request effectively.`);
  };

  const calculateResponseTime = (inquiryType) => {
    const times = {
      "General Inquiry": "4-6 hours",
      "Technical Support": "1-2 hours",
      "Security Incident": "Immediate",
      "Business Partnership": "24 hours",
      "Media Inquiry": "12 hours",
      "Feedback": "48 hours"
    };
    return times[inquiryType] || "4-6 hours";
  };

  return (
    <div className={`contact-page ${theme}`}>
      {/* ================= HEADER ================= */}
      <motion.header
        className="contact-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-container">
          <div className="header-brand">
            <button 
              className="back-button"
              onClick={handleGoBack}
              aria-label="Go back"
            >
              <BackIcon />
            </button>
            <div className="brand-logo">
              <ShieldIcon />
            </div>
            <div>
              <h1 className="header-title">Cívora Nexus</h1>
              <p className="header-subtitle">
                Contact & Support Portal
              </p>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className="theme-toggle subtle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button 
              className="emergency-btn"
              onClick={() => setShowEmergencyContacts(true)}
              aria-label="Emergency contacts"
            >
              🚨 Emergency
            </button>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge">🛡️ Secure Communication</span>
          <span className="badge">⏱️ 24/7 Support</span>
          <span className="badge">🔒 End-to-End Encrypted</span>
          {ticketNumber && (
            <span className="badge">🎫 Ticket: {ticketNumber}</span>
          )}
        </div>
      </motion.header>

      {/* ================= EMERGENCY CONTACTS MODAL ================= */}
      <AnimatePresence>
        {showEmergencyContacts && (
          <motion.div
            className="emergency-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEmergencyContacts(false)}
          >
            <motion.div 
              className="emergency-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="emergency-header">
                <h3>🚨 Emergency Contacts</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowEmergencyContacts(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="emergency-list">
                {emergencyContacts.map(contact => (
                  <div key={contact.id} className="emergency-contact">
                    <div className="contact-info">
                      <h4>{contact.name}</h4>
                      <p>{contact.description}</p>
                      <div className="contact-number">{contact.number}</div>
                    </div>
                    <div className="contact-actions">
                      <button 
                        className="call-btn"
                        onClick={() => handleCallNow(contact.number, contact.name)}
                      >
                        📞 Call Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="emergency-footer">
                <p>⏰ Available 24/7 for critical incidents</p>
                <button 
                  className="secondary-btn"
                  onClick={() => setShowEmergencyContacts(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SCHEDULE MODAL ================= */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            className="schedule-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div 
              className="schedule-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="schedule-header">
                <h3><CalendarIcon /> Schedule a Call</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowScheduleModal(false)}
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleScheduleSubmit} className="schedule-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={scheduleData.date}
                      onChange={handleScheduleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Time</label>
                    <input
                      type="time"
                      name="time"
                      value={scheduleData.time}
                      onChange={handleScheduleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Duration</label>
                    <select
                      name="duration"
                      value={scheduleData.duration}
                      onChange={handleScheduleChange}
                      required
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Attendees</label>
                    <select
                      name="attendees"
                      value={scheduleData.attendees}
                      onChange={handleScheduleChange}
                      required
                    >
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4+ people</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Purpose</label>
                  <select
                    name="purpose"
                    value={scheduleData.purpose}
                    onChange={handleScheduleChange}
                    required
                  >
                    <option value="General Discussion">General Discussion</option>
                    <option value="Technical Consultation">Technical Consultation</option>
                    <option value="Security Review">Security Review</option>
                    <option value="Partnership Meeting">Partnership Meeting</option>
                    <option value="Product Demo">Product Demo</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea
                    rows="3"
                    placeholder="Any specific topics you'd like to discuss..."
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button"
                    className="secondary-btn"
                    onClick={() => setShowScheduleModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="primary-btn"
                  >
                    <CalendarIcon /> Schedule Meeting
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO SECTION ================= */}
      <motion.section
        className="contact-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="hero-content">
          <h1>Secure Communication Portal</h1>
          <p className="hero-description">
            Get in touch with our cybersecurity experts. All communications are encrypted 
            and protected to ensure your data remains confidential.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
            <div className="stat">
              <span className="stat-number">&lt; 1h</span>
              <span className="stat-label">Urgent Response</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Encrypted</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.9★</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
        
        <div className="hero-illustration">
          <div className="illustration-icon">🔒</div>
          <div className="security-badge">
            <span>Secure Connection</span>
            <div className="secure-indicator active"></div>
          </div>
        </div>
      </motion.section>

      {/* ================= MAIN CONTENT ================= */}
      <div className="contact-main">
        <div className="contact-container">
          {/* ================= LEFT SIDEBAR ================= */}
          <motion.aside
            className="contact-sidebar"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="sidebar-section">
              <h3>📞 Contact Information</h3>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <MailIcon />
                  <div>
                    <strong>Email</strong>
                    <p>contact@civora-nexus.com</p>
                    <button 
                      className="text-btn"
                      onClick={() => handleEmailNow("contact@civora-nexus.com", "General Contact")}
                    >
                      Send Email
                    </button>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <PhoneIcon />
                  <div>
                    <strong>Phone</strong>
                    <p>+91 98765 43210</p>
                    <button 
                      className="text-btn"
                      onClick={() => handleCallNow("+919876543210", "Support")}
                    >
                      Call Now
                    </button>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <LocationIcon />
                  <div>
                    <strong>Address</strong>
                    <p>Cyber Tower, Sector 67<br />Gurugram, Haryana 122001</p>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <ClockIcon />
                  <div>
                    <strong>Business Hours</strong>
                    <p>24/7 Support Available<br />Mon-Fri: 9 AM - 6 PM (Office)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>🛠️ Quick Actions</h3>
              <div className="quick-actions">
                <button 
                  className="quick-action-btn"
                  onClick={() => setShowScheduleModal(true)}
                >
                  <CalendarIcon />
                  Schedule a Call
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={handleCreateSupportTicket}
                >
                  <TicketIcon />
                  Create Support Ticket
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={handleLiveChat}
                >
                  <ChatIcon />
                  Live Chat Support
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={() => navigate("/resources")}
                >
                  <HelpIcon />
                  Knowledge Base
                </button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>📄 Resources</h3>
              <div className="resource-links">
                <button 
                  className="resource-link"
                  onClick={() => handleDownloadTemplate('incident')}
                >
                  <DownloadIcon />
                  Incident Report Template
                </button>
                <button 
                  className="resource-link"
                  onClick={() => handleDownloadTemplate('support')}
                >
                  <DownloadIcon />
                  Support Request Template
                </button>
                <button 
                  className="resource-link"
                  onClick={handleDownloadResources}
                >
                  <DownloadIcon />
                  Contact Resources Pack
                </button>
              </div>
            </div>
          </motion.aside>

          {/* ================= MAIN FORM ================= */}
          <motion.main
            className="contact-form-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p className="form-subtitle">
                All fields are required unless marked optional. Your information is protected with end-to-end encryption.
              </p>
            </div>

            {submitted ? (
              <motion.div 
                className="success-message"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <div className="success-icon">✅</div>
                <h3>Message Sent Successfully!</h3>
                <p>Your ticket number: <strong>{ticketNumber}</strong></p>
                <p>We'll get back to you within <strong>{calculateResponseTime(formData.inquiryType)}</strong>.</p>
                <button 
                  className="primary-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9625 462564"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your organization (optional)"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    How can we help you? <span className="required">*</span>
                  </label>
                  <div className="category-grid">
                    {contactCategories.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        className={`category-btn ${formData.inquiryType === category.title ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, inquiryType: category.title }))}
                        style={{ borderColor: formData.inquiryType === category.title ? category.color : '' }}
                      >
                        <span className="category-icon" style={{ color: category.color }}>
                          {category.icon}
                        </span>
                        {category.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="priority">
                    Priority Level
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                  <small className="hint">
                    Response time: {calculateResponseTime(formData.inquiryType)} • Emergency: Immediate
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your needs, concerns, or requirements in detail..."
                    rows="6"
                    required
                  />
                  <small className="hint">
                    Please include as much detail as possible to help us assist you better.
                  </small>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="subscribe"
                      checked={formData.subscribe}
                      onChange={handleInputChange}
                    />
                    <span>Subscribe to security updates and newsletters</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button 
                    type="button"
                    className="secondary-btn"
                    onClick={() => setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      company: "",
                      inquiryType: "General Inquiry",
                      message: "",
                      priority: "Normal",
                      attachment: null,
                      subscribe: false
                    })}
                  >
                    Clear Form
                  </button>
                  <button 
                    type="submit"
                    className="primary-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
                
                <div className="form-footer">
                  <p className="security-notice">
                    🔒 All communications are encrypted and secure. 
                    We never share your information with third parties.
                  </p>
                </div>
              </form>
            )}
          </motion.main>
        </div>
      </div>

      {/* ================= SUPPORT TEAMS ================= */}
      <section className="support-teams">
        <div className="section-header">
          <h2>Support Teams</h2>
          <p className="section-subtitle">
            Connect directly with our specialized teams for faster assistance
          </p>
        </div>

        <div className="teams-grid">
          {supportTeams.map(team => (
            <motion.div
              key={team.id}
              className="team-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedTeam(team)}
            >
              <div 
                className="team-icon"
                style={{ backgroundColor: `${team.color}20` }}
              >
                <span style={{ color: team.color }}>{team.icon}</span>
              </div>
              <h3>{team.name}</h3>
              <p className="team-description">{team.description}</p>
              <div className="team-meta">
                <span className="response-time">⏱️ {team.responseTime}</span>
                <span className="contact-info">{team.contact}</span>
              </div>
              <div className="team-actions">
                <button 
                  className="email-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmailNow(team.contact, team.name);
                  }}
                >
                  📧 Email
                </button>
                <button 
                  className="select-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData(prev => ({ ...prev, inquiryType: team.name }));
                    document.querySelector('.contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Select
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find quick answers to common questions about our support process
          </p>
        </div>

        <div className="faq-list">
          {faqItems.map(faq => (
            <motion.div
              key={faq.id}
              className={`faq-item ${activeFAQ === faq.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-toggle">
                  {activeFAQ === faq.id ? '−' : '+'}
                </span>
              </div>
              <AnimatePresence>
                {activeFAQ === faq.id && (
                  <motion.div
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <motion.section
        className="contact-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="cta-content">
          <div className="cta-text">
            <h2>Need Immediate Assistance?</h2>
            <p>
              Our 24/7 support team is ready to help with any cybersecurity concerns or emergencies.
            </p>
          </div>
          <div className="cta-actions">
            <button 
              className="primary-btn cta-primary"
              onClick={() => setShowEmergencyContacts(true)}
            >
              🚨 Emergency Contacts
            </button>
            <button 
              className="secondary-btn"
              onClick={handleLiveChat}
            >
              💬 Live Chat
            </button>
            <button 
              className="outline-btn"
              onClick={() => navigate("/resources")}
            >
              📚 Resources
            </button>
          </div>
        </div>
      </motion.section>

      {/* ================= FOOTER ================= */}
      <footer className="contact-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <ShieldIcon />
              <span>Cívora Nexus</span>
            </div>
            <p className="footer-description">
              Empowering organizations with cutting-edge cybersecurity solutions
            </p>
            <div className="footer-certifications">
              <span className="cert-badge">ISO 27001</span>
              <span className="cert-badge">SOC 2</span>
              <span className="cert-badge">GDPR</span>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>Quick Links</h4>
              <a href="#" onClick={handleGoBack}>← Back</a>
              <a href="#" onClick={() => navigate("/")}>🏠 Home</a>
              <a href="#" onClick={() => navigate("/resources")}>📚 Resources</a>
              <a href="#" onClick={toggleTheme}>
                {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </a>
            </div>
            
            <div className="link-column">
              <h4>Support</h4>
              <a href="#" onClick={() => setShowScheduleModal(true)}>Schedule Call</a>
              <a href="#" onClick={handleCreateSupportTicket}>Create Ticket</a>
              <a href="#" onClick={() => setShowEmergencyContacts(true)}>Emergency</a>
              <a href="#" onClick={() => window.open('https://status.civora-nexus.com', '_blank')}>System Status</a>
            </div>
            
            <div className="link-column">
              <h4>Legal</h4>
              <a href="#" onClick={() => window.open('#privacy', '_blank')}>Privacy Policy</a>
              <a href="#" onClick={() => window.open('#terms', '_blank')}>Terms of Service</a>
              <a href="#" onClick={() => window.open('#security', '_blank')}>Security Policy</a>
              <a href="#" onClick={() => window.open('#compliance', '_blank')}>Compliance</a>
            </div>
            
            <div className="link-column">
              <h4>Connect</h4>
              <a href="#" onClick={() => window.open('https://linkedin.com/company/civora-nexus', '_blank')}>LinkedIn</a>
              <a href="#" onClick={() => window.open('https://twitter.com/civoranezus', '_blank')}>Twitter</a>
              <a href="#" onClick={() => window.open('https://github.com/civora-nexus', '_blank')}>GitHub</a>
              <a href="#" onClick={() => window.open('https://blog.civora-nexus.com', '_blank')}>Blog</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Cívora Nexus Pvt Ltd. All rights reserved.
          </div>
          <div className="footer-update">
            <span className="update-badge">
              🔒 Encrypted Connection • {new Date().toLocaleDateString('en-IN')}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}