import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Infographics.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// Sample infographics data
const infographicsData = [
  {
    id: 1,
    title: "Cyber Attack Statistics 2024",
    category: "Statistics",
    description: "Latest data on cyber attacks, fraud patterns, and threat landscape",
    downloads: 2341,
    imageColor: "#1B9AAA",
    tags: ["Statistics", "Threat Report", "Data"],
    size: "A3 Poster",
    language: "English"
  },
  {
    id: 2,
    title: "Phishing Attack Flowchart",
    category: "Education",
    description: "Step-by-step identification guide for phishing attempts",
    downloads: 1876,
    imageColor: "#142C52",
    tags: ["Phishing", "Flowchart", "Education"],
    size: "A4 Infographic",
    language: "English + Hindi"
  },
  {
    id: 3,
    title: "Social Media Privacy Checklist",
    category: "Checklist",
    description: "Visual guide to securing Facebook, Instagram, Twitter accounts",
    downloads: 3124,
    imageColor: "#02394A",
    tags: ["Social Media", "Privacy", "Checklist"],
    size: "A4 Poster",
    language: "English"
  },
  {
    id: 4,
    title: "Financial Fraud Prevention",
    category: "Finance",
    description: "Infographic on UPI frauds, online payment safety, and banking security",
    downloads: 2890,
    imageColor: "#16808D",
    tags: ["Finance", "Fraud", "Security"],
    size: "A3 Infographic",
    language: "English + Hindi"
  },
  {
    id: 5,
    title: "Home Network Security Setup",
    category: "Technical",
    description: "Visual guide to securing home Wi-Fi, routers, and IoT devices",
    downloads: 1567,
    imageColor: "#0E2140",
    tags: ["Network", "Wi-Fi", "Technical"],
    size: "A2 Poster",
    language: "English"
  },
  {
    id: 6,
    title: "Cyber Hygiene Daily Routine",
    category: "Lifestyle",
    description: "Daily cybersecurity habits visual guide for individuals and families",
    downloads: 4321,
    imageColor: "#147783",
    tags: ["Habits", "Lifestyle", "Daily"],
    size: "A4 Infographic",
    language: "English + Hindi"
  },
  {
    id: 7,
    title: "Business Cybersecurity Framework",
    category: "Business",
    description: "Infographic for SME cybersecurity compliance and best practices",
    downloads: 1234,
    imageColor: "#4C97A8",
    tags: ["Business", "Compliance", "Framework"],
    size: "A3 Poster",
    language: "English"
  },
  {
    id: 8,
    title: "Emergency Response Protocol",
    category: "Emergency",
    description: "What to do during and after a cyber attack - visual flowchart",
    downloads: 876,
    imageColor: "#07426",
    tags: ["Emergency", "Response", "Protocol"],
    size: "A4 Checklist",
    language: "English + Hindi"
  },
];

const categories = [
  { id: 1, name: "All", count: infographicsData.length },
  { id: 2, name: "Statistics", count: infographicsData.filter(i => i.category === "Statistics").length },
  { id: 3, name: "Education", count: infographicsData.filter(i => i.category === "Education").length },
  { id: 4, name: "Checklist", count: infographicsData.filter(i => i.category === "Checklist").length },
  { id: 5, name: "Finance", count: infographicsData.filter(i => i.category === "Finance").length },
  { id: 6, name: "Technical", count: infographicsData.filter(i => i.category === "Technical").length },
  { id: 7, name: "Business", count: infographicsData.filter(i => i.category === "Business").length },
];

export default function InfographicsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredInfographics = infographicsData.filter(infographic => {
    const matchesCategory = selectedCategory === "All" || infographic.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      infographic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      infographic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      infographic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (id, title) => {
    alert(`📥 Downloading "${title}"...\n\nHigh-resolution PDF will be available shortly.`);
    // In a real app, this would trigger actual download
  };

  const handleViewOnline = (id, title) => {
    alert(`🔍 Opening "${title}" in high-resolution viewer...`);
    // In a real app, this would open a modal with the full infographic
  };

  return (
    <div className="infographics-page">
      {/* Header */}
      <header className="infographics-header">
        <div className="header-container">
          <div className="header-brand">
            <Link to="/resources" className="back-btn">
              ← Back to Resources
            </Link>
            <h1>Cybersecurity Infographics</h1>
            <p className="header-subtitle">
              Visual guides, posters, and educational materials for cyber safety awareness
            </p>
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      <motion.section 
        className="stats-banner"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{infographicsData.length}</span>
            <span className="stat-label">Infographics</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{categories.length}</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{infographicsData.reduce((sum, i) => sum + i.downloads, 0).toLocaleString()}</span>
            <span className="stat-label">Total Downloads</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Free Access</span>
          </div>
        </div>
      </motion.section>

      {/* Search and Filter */}
      <section className="search-filter-section">
        <div className="search-container">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search infographics by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-filter ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
                <span className="filter-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="infographics-main">
        <div className="container">
          <motion.div 
            className="infographics-grid"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {filteredInfographics.map((infographic, index) => (
              <motion.div
                key={infographic.id}
                className="infographic-card"
                variants={fadeUp}
                whileHover={{ y: -8 }}
              >
                <div 
                  className="infographic-preview"
                  style={{ backgroundColor: infographic.imageColor + '20' }}
                >
                  <div className="preview-content">
                    <div className="preview-icon">📊</div>
                    <h3>{infographic.title}</h3>
                    <p className="preview-category">{infographic.category}</p>
                  </div>
                </div>
                
                <div className="infographic-content">
                  <div className="infographic-header">
                    <h3>{infographic.title}</h3>
                    <div className="download-count">
                      📥 {infographic.downloads.toLocaleString()}
                    </div>
                  </div>
                  
                  <p className="infographic-description">{infographic.description}</p>
                  
                  <div className="infographic-meta">
                    <div className="meta-item">
                      <span className="meta-label">Size:</span>
                      <span className="meta-value">{infographic.size}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Language:</span>
                      <span className="meta-value">{infographic.language}</span>
                    </div>
                  </div>
                  
                  <div className="tags-container">
                    {infographic.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="infographic-actions">
                    <button 
                      className="view-btn"
                      onClick={() => handleViewOnline(infographic.id, infographic.title)}
                    >
                      👁️ View Online
                    </button>
                    <button 
                      className="download-btn"
                      onClick={() => handleDownload(infographic.id, infographic.title)}
                    >
                      ⬇️ Download PDF
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredInfographics.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No infographics found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                className="reset-btn"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bulk Download Section */}
      <section className="bulk-download-section">
        <div className="container">
          <motion.div 
            className="bulk-download-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bulk-download-content">
              <h2>Download Complete Infographics Pack</h2>
              <p>
                Get all {infographicsData.length} infographics in high-resolution PDF format. 
                Perfect for printing, educational institutions, and awareness campaigns.
              </p>
              <div className="bulk-info">
                <span className="info-item">📊 {infographicsData.length} Infographics</span>
                <span className="info-item">🎨 Print-Ready PDFs</span>
                <span className="info-item">🔄 Regular Updates</span>
                <span className="info-item">💯 Free to Use</span>
              </div>
              <button className="bulk-download-btn">
                ⬇️ Download All Infographics (ZIP, 156MB)
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="infographics-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Civora Nexus</h3>
            <p>Cybersecurity Awareness & Education</p>
          </div>
          <div className="footer-links">
            <Link to="/resources">← Back to Resources</Link>
            <Link to="/">🏠 Home</Link>
            <Link to="/contact">📞 Contact</Link>
            <Link to="/report">🚨 Report Incident</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Civora Nexus. All infographics are free for educational use.</p>
        </div>
      </footer>
    </div>
  );
}