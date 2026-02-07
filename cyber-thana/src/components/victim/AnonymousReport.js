import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AnonymousReport.css";

const AnonymousReport = () => {
    const [formData, setFormData] = useState({
        incidentType: "",
        description: "",
        date: "",
        time: "",
        location: "",
        evidence: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            alert("Anonymous report submitted successfully! Your tracking ID is: ANON-" + Math.random().toString(36).substr(2, 9).toUpperCase());
            navigate("/track");
        }, 2000);
    };

    return (
        <div className="anonymous-report-page">
            <div className="report-container">
                <div className="report-header">
                    <h1>Anonymous Report</h1>
                    <p>Report cybercrime incidents anonymously. Your identity will be protected.</p>
                </div>

                <form onSubmit={handleSubmit} className="report-form">
                    <div className="form-group">
                        <label htmlFor="incidentType">Incident Type *</label>
                        <select
                            id="incidentType"
                            name="incidentType"
                            value={formData.incidentType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select incident type</option>
                            <option value="phishing">Phishing</option>
                            <option value="fraud">Financial Fraud</option>
                            <option value="hacking">Hacking</option>
                            <option value="cyberbullying">Cyberbullying</option>
                            <option value="identity-theft">Identity Theft</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Please describe the incident in detail"
                            rows="5"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date">Date of Incident *</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="time">Time of Incident</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location (if applicable)</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Where did this incident occur?"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="evidence">Evidence/Additional Information</label>
                        <textarea
                            id="evidence"
                            name="evidence"
                            value={formData.evidence}
                            onChange={handleChange}
                            placeholder="Any screenshots, emails, or other evidence you can provide"
                            rows="3"
                        />
                    </div>

                    <div className="privacy-notice">
                        <h3>🛡️ Your Privacy is Protected</h3>
                        <ul>
                            <li>Your identity will remain completely anonymous</li>
                            <li>Your IP address is not stored</li>
                            <li>All reports are encrypted</li>
                            <li>You will receive a tracking ID to follow your report</li>
                        </ul>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Anonymous Report"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AnonymousReport;