import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import civoraLogo from "../assets/civora-nexus-logo.png";

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.18 } },
};

const floatAnim = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ================= COMPONENT ================= */
export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const [showEmergency, setShowEmergency] = useState(true);

  return (
    <div style={styles.page}>
      {/* ============ EMERGENCY BANNER ============ */}
      {showEmergency && (
        <motion.div
          style={styles.emergencyBanner}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={styles.emergencyContent}>
            <span style={styles.emergencyIcon}>🚨</span>
            <div style={styles.emergencyText}>
              <strong>Emergency Assistance:</strong> Call National Cyber Crime Helpline: <strong>1930</strong> or SMS to <strong>871 555 9999</strong>
            </div>
            <button 
              onClick={() => setShowEmergency(false)}
              style={styles.closeBtn}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      {/* ============ HEADER ============ */}
      <motion.header
        style={styles.header}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div style={styles.headerInner}>
          <div style={styles.logoWrapper}>
            <div style={styles.logoGlass}>
              <img src={civoraLogo} alt="Civora Nexus" style={styles.logoImg} />
            </div>
            <span style={styles.logoText}>Cyber Thana</span>
          </div>

          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/victim" style={styles.navLink}>Report Crime</Link>
            <Link to="/track" style={styles.navLink}>Track Complaint</Link>
            <Link to="/resources" style={styles.navLink}>Resources</Link>
            <Link to="/police" style={styles.navLink}>Police Login</Link>
            <Link to="/victim" style={styles.primaryBtn}>Report Incident</Link>
          </nav>
        </div>
      </motion.header>

      {/* ============ HERO ============ */}
      <section style={styles.hero}>
        <motion.div
          style={styles.heroInner}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.h1 style={styles.heroTitle} variants={fadeUp}>
              Securely Report & Track Cyber Incidents
            </motion.h1>

            <motion.p style={styles.heroDesc} variants={fadeUp}>
              A citizen-first digital platform enabling secure cybercrime
              reporting, transparent case tracking, and verified safety guidance.
            </motion.p>

            <motion.div style={styles.heroActions} variants={fadeUp}>
              <Link to="/victim" style={styles.primaryBtnLg}>
                Report Incident
              </Link>

              <Link to="/track" style={styles.secondaryBtnLg}>
                Track Complaint
              </Link>

              <Link to="/resources" style={styles.ghostBtnLg}>
                Explore Resources
              </Link>
            </motion.div>
          </div>

          {/* ===== DASHBOARD PREVIEW ===== */}
          <motion.div
            style={styles.heroVisual}
            animate={floatAnim.animate}
            variants={fadeUp}
          >
            <div style={styles.dashboard}>
              <div style={styles.dashboardHeader}>
                <strong>Cyber Thana – Live Dashboard</strong>
                <span style={styles.statusBadge}>Secure</span>
              </div>

              <div style={styles.dashboardStats}>
                <div style={styles.statCard}>
                  <h4>Active Cases</h4>
                  <span>128</span>
                </div>
                <div style={styles.statCard}>
                  <h4>Resolved</h4>
                  <span>2,431</span>
                </div>
                <div style={styles.statCard}>
                  <h4>Avg. Resolution</h4>
                  <span>48 hrs</span>
                </div>
              </div>

              <div style={styles.chart}>
                <div style={{ ...styles.bar, width: "82%" }} />
                <div style={{ ...styles.bar, width: "64%" }} />
                <div style={{ ...styles.bar, width: "71%" }} />
              </div>

              <div style={styles.activity}>
                <h4>Recent Activity</h4>
                <ul style={styles.activityList}>
                  <li>✔ Complaint #92831 resolved</li>
                  <li>⚠ UPI fraud reported</li>
                  <li>✔ Case verified</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ REAL-TIME STATISTICS ============ */}
      <motion.section
        style={styles.statsSection}
        initial="hidden"
        whileInView="visible"
        variants={stagger}
      >
        <div style={styles.statsGrid}>
          {[
            { value: "2,431", label: "Cases Resolved", change: "+12%", trend: "up" },
            { value: "128", label: "Active Cases", change: "-5%", trend: "down" },
            { value: "48h", label: "Avg. Resolution", change: "-8h", trend: "down" },
            { value: "4.8★", label: "Citizen Rating", change: "+0.2", trend: "up" },
          ].map((stat, i) => (
            <motion.div key={i} style={styles.statItem} variants={fadeUp}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
              <div style={{
                ...styles.statChange,
                color: stat.trend === 'up' ? '#059669' : '#DC2626'
              }}>
                {stat.change} {stat.trend === 'up' ? '↑' : '↓'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ============ TRUST SECTION ============ */}
      <motion.section
        style={{ ...styles.trustSection, y: parallaxY, opacity: parallaxOpacity }}
        initial="hidden"
        whileInView="visible"
        variants={stagger}
      >
        <motion.h2 style={styles.trustTitle} variants={fadeUp}>
          Built for Trust. Designed for Citizens.
        </motion.h2>

        <motion.p style={styles.trustSubtitle} variants={fadeUp}>
          Cyber Thana is engineered with security, transparency, and accountability
          at its core — ensuring citizens can report incidents with confidence.
        </motion.p>

        <div style={styles.trustGrid}>
          {trustPoints.map((t, i) => (
            <motion.div key={i} style={styles.trustCard} variants={fadeUp}>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ============ PORTAL ACCESS SECTION ============ */}
      <motion.section
        style={styles.portalSection}
        initial="hidden"
        whileInView="visible"
        variants={stagger}
      >
        <motion.h2 style={styles.portalTitle} variants={fadeUp}>
          Access Secure Portals
        </motion.h2>
        
        <motion.p style={styles.portalSubtitle} variants={fadeUp}>
          Choose your portal based on your role. All access is secured with end-to-end encryption.
        </motion.p>

        <div style={styles.portalGrid}>
          {/* VICTIM PORTAL CARD */}
          <motion.div style={styles.portalCard} variants={fadeUp} whileHover={{ y: -10 }}>
            <div style={styles.portalIconVictim}>👤</div>
            <h3 style={styles.portalCardTitle}>Victim Portal</h3>
            <p style={styles.portalCardDesc}>
              Report cybercrimes securely. Choose between anonymous or registered reporting.
              Track your complaint status in real-time.
            </p>
            <div style={styles.portalFeatures}>
              <span style={styles.featureBadge}>Anonymous Option</span>
              <span style={styles.featureBadge}>Secure Upload</span>
              <span style={styles.featureBadge}>Real-time Tracking</span>
            </div>
            <div style={styles.portalActions}>
              <Link to="/victim" style={styles.portalPrimaryBtn}>
                Enter Victim Portal
              </Link>
              <Link to="/anonymous" style={styles.portalSecondaryBtn}>
                Report Anonymously
              </Link>
            </div>
          </motion.div>

          {/* POLICE PORTAL CARD */}
          <motion.div style={styles.portalCard} variants={fadeUp} whileHover={{ y: -10 }}>
            <div style={styles.portalIconPolice}>👮</div>
            <h3 style={styles.portalCardTitle}>Police Portal</h3>
            <p style={styles.portalCardDesc}>
              Official access for cyber cell personnel. Manage cases, update status,
              and access investigation tools. Role-based secure login required.
            </p>
            <div style={styles.portalFeatures}>
              <span style={styles.featureBadge}>Role-Based Access</span>
              <span style={styles.featureBadge}>Case Management</span>
              <span style={styles.featureBadge}>Audit Logs</span>
            </div>
            <div style={styles.portalActions}>
              <Link to="/police" style={styles.portalPoliceBtn}>
                Enter Police Portal
              </Link>
              <small style={styles.portalNote}>
                * Official ID verification required
              </small>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============ FEATURES ============ */}
      <motion.section
        style={styles.featuresSection}
        initial="hidden"
        whileInView="visible"
        variants={stagger}
      >
        <motion.h2 style={styles.sectionTitle} variants={fadeUp}>
          Platform Capabilities
        </motion.h2>

        <div style={styles.grid}>
          {features.map((f, i) => (
            <motion.div key={i} style={styles.card} variants={fadeUp}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ============ QUICK REPORT PANEL ============ */}
      <motion.div
        style={styles.quickReportPanel}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div style={styles.quickReportContent}>
          <strong>Need to Report Quickly?</strong>
          <div style={styles.quickReportButtons}>
            <Link to="/victim" style={styles.quickReportBtn}>
              Report Cyber Fraud
            </Link>
            <Link to="/anonymous" style={styles.quickReportBtnOutline}>
              Anonymous Report
            </Link>
          </div>
          <small style={styles.quickReportNote}>
            Both options are encrypted and secure
          </small>
        </div>
      </motion.div>

      {/* ============ FOOTER ============ */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            <div style={styles.footerLogoGlass}>
              <img src={civoraLogo} alt="Civora Nexus" style={styles.footerLogoImg} />
            </div>
            <div>
              <strong style={styles.footerLogoText}>Cyber Thana</strong>
              <p style={styles.footerLogoSub}>Powered by Civora Nexus</p>
            </div>
          </div>
          
          <div style={styles.footerLinks}>
            <div>
              <h4>Quick Links</h4>
              <Link to="/victim" style={styles.footerLink}>Report Crime</Link>
              <Link to="/track" style={styles.footerLink}>Track Complaint</Link>
              <Link to="/resources" style={styles.footerLink}>Safety Resources</Link>
              <Link to="/police" style={styles.footerLink}>Police Login</Link>
            </div>
            <div>
              <h4>Legal</h4>
              <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
              <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
              <Link to="/disclaimer" style={styles.footerLink}>Disclaimer</Link>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <div>© {new Date().getFullYear()} Civora Nexus. All rights reserved.</div>
          <div style={styles.footerBadges}>
            <span style={styles.badge}>🔒 SSL Secured</span>
            <span style={styles.badge}>🇮🇳 Made in India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= DATA ================= */
const trustPoints = [
  {
    title: "End-to-End Encryption",
    desc: "All reports are encrypted in transit and at rest.",
  },
  {
    title: "Authorized Access Only",
    desc: "Accessible only to verified cyber officials.",
  },
  {
    title: "Transparent Case Tracking",
    desc: "Clear milestones and real-time updates.",
  },
  {
    title: "Audit-Ready Architecture",
    desc: "Supports compliance and evidence integrity.",
  },
];

const features = [
  { title: "Secure Incident Reporting", desc: "Confidential encrypted workflow." },
  { title: "Live Case Tracking", desc: "Real-time progress updates." },
  { title: "Verified Safety Resources", desc: "Government-approved guidance." },
  { title: "Citizen-First Design", desc: "Inclusive and accessible UI." },
];

/* ================= STYLES ================= */
const styles = {
  page: {
    fontFamily: "Inter, system-ui, sans-serif",
    background: "#F8FAFC",
    color: "#0F172A",
    overflowX: "hidden",
  },

  emergencyBanner: {
    background: "linear-gradient(135deg, #DC2626, #EF4444)",
    color: "white",
    padding: "12px 0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  emergencyContent: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 22px",
    display: "flex",
    alignItems: "center",
    gap: 16,
  },

  emergencyIcon: {
    fontSize: 20,
  },

  emergencyText: {
    flex: 1,
    fontSize: 14,
  },

  closeBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    width: 28,
    height: 28,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    position: "sticky",
    top: showEmergency => showEmergency ? "44px" : 0,
    backdropFilter: "blur(18px)",
    background: "rgba(255,255,255,0.9)",
    borderBottom: "1px solid rgba(15,23,42,0.08)",
    zIndex: 999,
  },

  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "16px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoWrapper: { display: "flex", alignItems: "center", gap: 12 },
  logoGlass: {
    padding: "6px 10px",
    borderRadius: 12,
    background: "#FFF",
    border: "1px solid rgba(15,23,42,0.15)",
  },
  logoImg: { height: 30 },
  logoText: { fontWeight: 800, fontSize: 20, color: "#0F172A" },

  nav: { display: "flex", gap: 22, alignItems: "center" },
  navLink: { 
    textDecoration: "none", 
    fontWeight: 500, 
    color: "#0F172A",
    fontSize: 15,
    transition: "color 0.2s",
  },
  navLinkHover: {
    color: "#1B9AAA",
  },

  primaryBtn: {
    padding: "10px 20px",
    background: "linear-gradient(135deg,#1B9AAA,#14B8A6)",
    borderRadius: 999,
    fontWeight: 800,
    color: "#02131F",
    textDecoration: "none",
    fontSize: 14,
    transition: "transform 0.2s",
  },
  primaryBtnHover: {
    transform: "translateY(-2px)",
  },

  hero: { padding: "120px 20px 100px" },
  heroInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 70,
    alignItems: "center",
  },

  heroTitle: { 
    fontSize: "3.5rem", 
    fontWeight: 800,
    lineHeight: 1.1,
    background: "linear-gradient(135deg, #0F172A 0%, #1B9AAA 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 24,
  },
  heroDesc: { 
    color: "#475569", 
    maxWidth: 520, 
    marginBottom: 40,
    fontSize: 18,
    lineHeight: 1.6,
  },
  heroActions: { display: "flex", gap: 16, flexWrap: "wrap" },

  primaryBtnLg: {
    padding: "16px 32px",
    background: "linear-gradient(135deg,#1B9AAA,#14B8A6)",
    borderRadius: 999,
    fontWeight: 800,
    color: "#02131F",
    textDecoration: "none",
    fontSize: 16,
    transition: "all 0.2s",
    display: "inline-block",
  },
  primaryBtnLgHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(27, 154, 170, 0.3)",
  },

  secondaryBtnLg: {
    padding: "16px 32px",
    border: "2px solid #CBD5E1",
    borderRadius: 999,
    color: "#0F172A",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 16,
    transition: "all 0.2s",
    display: "inline-block",
    background: "white",
  },
  secondaryBtnLgHover: {
    borderColor: "#1B9AAA",
    color: "#1B9AAA",
  },

  ghostBtnLg: {
    padding: "16px 32px",
    border: "2px dashed #94A3B8",
    borderRadius: 999,
    color: "#334155",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 16,
    transition: "all 0.2s",
    display: "inline-block",
    background: "transparent",
  },
  ghostBtnLgHover: {
    borderColor: "#1B9AAA",
    color: "#1B9AAA",
  },

  heroVisual: { display: "flex", justifyContent: "center" },

  dashboard: {
    width: 420,
    background: "#FFF",
    borderRadius: 20,
    padding: 28,
    boxShadow: "0 40px 80px rgba(15,23,42,0.15)",
    border: "1px solid rgba(15,23,42,0.05)",
  },

  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: "1px solid #F1F5F9",
  },

  statusBadge: {
    background: "#DCFCE7",
    color: "#166534",
    padding: "6px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },

  dashboardStats: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 16,
    marginBottom: 28,
  },

  statCard: {
    background: "#F8FAFC",
    padding: 18,
    borderRadius: 16,
    textAlign: "center",
    border: "1px solid #E2E8F0",
  },
  statCardH4: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 8,
    fontWeight: 600,
  },
  statCardSpan: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0F172A",
  },

  chart: {
    background: "#F8FAFC",
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    border: "1px solid #E2E8F0",
  },

  bar: {
    height: 12,
    background: "linear-gradient(90deg,#1B9AAA,#14B8A6)",
    borderRadius: 6,
    marginBottom: 12,
  },

  activity: { 
    fontSize: 14, 
    color: "#334155",
    paddingTop: 20,
    borderTop: "1px solid #F1F5F9",
  },
  activityH4: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    color: "#0F172A",
  },
  activityList: { 
    paddingLeft: 20, 
    marginTop: 8,
    listStyle: "none",
  },
  activityLi: {
    padding: "8px 0",
    borderBottom: "1px solid #F1F5F9",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  statsSection: {
    padding: "80px 20px",
    background: "linear-gradient(180deg, rgba(27,154,170,0.03), transparent)",
  },

  statsGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
  },

  statItem: {
    background: "#FFF",
    padding: 32,
    borderRadius: 20,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
    border: "1px solid rgba(15,23,42,0.05)",
  },

  statValue: {
    fontSize: 42,
    fontWeight: 800,
    color: "#1B9AAA",
    marginBottom: 8,
  },

  statLabel: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 8,
    fontWeight: 600,
  },

  statChange: {
    fontSize: 14,
    fontWeight: 700,
  },

  trustSection: {
    padding: "120px 20px",
    textAlign: "center",
    background: "linear-gradient(180deg, rgba(27,154,170,0.06), transparent)",
  },

  trustTitle: { 
    fontSize: 40, 
    fontWeight: 800, 
    marginBottom: 20,
    background: "linear-gradient(135deg, #0F172A 0%, #1B9AAA 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  trustSubtitle: {
    maxWidth: 720,
    margin: "0 auto 70px",
    color: "#475569",
    fontSize: 18,
    lineHeight: 1.6,
  },

  trustGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: 32,
  },

  trustCard: {
    background: "#FFF",
    padding: 40,
    borderRadius: 24,
    boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
    border: "1px solid rgba(15,23,42,0.05)",
    textAlign: "left",
  },
  trustCardH3: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 16,
    color: "#0F172A",
  },
  trustCardP: {
    color: "#64748B",
    lineHeight: 1.6,
    fontSize: 16,
  },

  // PORTAL SECTION STYLES
  portalSection: {
    padding: "120px 20px",
    background: "linear-gradient(180deg, transparent, rgba(27,154,170,0.04))",
  },

  portalTitle: {
    fontSize: 40,
    fontWeight: 800,
    textAlign: "center",
    marginBottom: 20,
    background: "linear-gradient(135deg, #0F172A 0%, #1B9AAA 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  portalSubtitle: {
    textAlign: "center",
    maxWidth: 720,
    margin: "0 auto 60px",
    color: "#475569",
    fontSize: 18,
    lineHeight: 1.6,
  },

  portalGrid: {
    maxWidth: 1000,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: 40,
  },

  portalCard: {
    background: "#FFF",
    borderRadius: 28,
    padding: 40,
    boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
    border: "1px solid rgba(15,23,42,0.05)",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
  },
  portalCardHover: {
    transform: "translateY(-10px)",
    boxShadow: "0 30px 80px rgba(27, 154, 170, 0.15)",
  },

  portalIconVictim: {
    fontSize: 48,
    marginBottom: 24,
    background: "linear-gradient(135deg, #1B9AAA, #14B8A6)",
    width: 80,
    height: 80,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0 10px 30px rgba(27, 154, 170, 0.3)",
  },

  portalIconPolice: {
    fontSize: 48,
    marginBottom: 24,
    background: "linear-gradient(135deg, #0F172A, #334155)",
    width: 80,
    height: 80,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.3)",
  },

  portalCardTitle: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 16,
    color: "#0F172A",
  },

  portalCardDesc: {
    color: "#64748B",
    marginBottom: 28,
    lineHeight: 1.6,
    fontSize: 16,
  },

  portalFeatures: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 32,
  },

  featureBadge: {
    background: "#F1F5F9",
    color: "#334155",
    padding: "8px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    border: "1px solid #E2E8F0",
  },

  portalActions: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  portalPrimaryBtn: {
    padding: "18px 28px",
    background: "linear-gradient(135deg, #1B9AAA, #14B8A6)",
    borderRadius: 14,
    fontWeight: 700,
    color: "#02131F",
    textDecoration: "none",
    textAlign: "center",
    fontSize: 16,
    transition: "all 0.2s",
  },
  portalPrimaryBtnHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(27, 154, 170, 0.3)",
  },

  portalSecondaryBtn: {
    padding: "18px 28px",
    border: "2px solid #1B9AAA",
    borderRadius: 14,
    color: "#1B9AAA",
    textDecoration: "none",
    textAlign: "center",
    fontWeight: 600,
    background: "transparent",
    fontSize: 16,
    transition: "all 0.2s",
  },
  portalSecondaryBtnHover: {
    background: "rgba(27, 154, 170, 0.05)",
  },

  portalPoliceBtn: {
    padding: "18px 28px",
    background: "linear-gradient(135deg, #0F172A, #334155)",
    borderRadius: 14,
    fontWeight: 700,
    color: "white",
    textDecoration: "none",
    textAlign: "center",
    fontSize: 16,
    transition: "all 0.2s",
  },
  portalPoliceBtnHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.3)",
  },

  portalNote: {
    color: "#94A3B8",
    textAlign: "center",
    fontSize: 13,
    marginTop: 8,
  },

  featuresSection: { 
    padding: "120px 20px", 
    maxWidth: 1200, 
    margin: "0 auto" 
  },
  sectionTitle: { 
    textAlign: "center", 
    fontSize: 40, 
    marginBottom: 70,
    background: "linear-gradient(135deg, #0F172A 0%, #1B9AAA 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 800,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: 32,
  },

  card: {
    background: "#FFF",
    padding: 40,
    borderRadius: 24,
    boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
    border: "1px solid rgba(15,23,42,0.05)",
    transition: "all 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 30px 80px rgba(27, 154, 170, 0.15)",
  },
  cardH3: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 16,
    color: "#0F172A",
  },
  cardP: {
    color: "#64748B",
    lineHeight: 1.6,
    fontSize: 16,
  },

  quickReportPanel: {
    position: "fixed",
    bottom: 32,
    right: 32,
    background: "#FFF",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 20px 60px rgba(15,23,42,0.25)",
    border: "1px solid rgba(15,23,42,0.1)",
    zIndex: 999,
    maxWidth: 360,
  },

  quickReportContent: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  quickReportButtons: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  quickReportBtn: {
    padding: "14px 24px",
    background: "linear-gradient(135deg, #1B9AAA, #14B8A6)",
    borderRadius: 12,
    fontWeight: 700,
    color: "#02131F",
    textDecoration: "none",
    textAlign: "center",
    fontSize: 15,
    transition: "all 0.2s",
  },
  quickReportBtnHover: {
    transform: "translateY(-2px)",
  },

  quickReportBtnOutline: {
    padding: "14px 24px",
    border: "2px solid #1B9AAA",
    borderRadius: 12,
    color: "#1B9AAA",
    textDecoration: "none",
    textAlign: "center",
    fontWeight: 600,
    background: "transparent",
    fontSize: 15,
    transition: "all 0.2s",
  },
  quickReportBtnOutlineHover: {
    background: "rgba(27, 154, 170, 0.05)",
  },

  quickReportNote: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
  },

  footer: {
    padding: "80px 20px 40px",
    background: "#F1F5F9",
    borderTop: "1px solid #E2E8F0",
  },

  footerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 60,
    marginBottom: 40,
  },

  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },

  footerLogoGlass: {
    padding: "8px 12px",
    borderRadius: 12,
    background: "#FFF",
    border: "1px solid rgba(15,23,42,0.15)",
  },

  footerLogoImg: {
    height: 36,
  },

  footerLogoText: {
    fontSize: 24,
    fontWeight: 800,
    color: "#0F172A",
    marginBottom: 4,
  },

  footerLogoSub: {
    color: "#64748B",
    fontSize: 14,
  },

  footerLinks: {
    display: "flex",
    gap: 60,
    flexWrap: "wrap",
  },

  footerLinksDiv: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  footerLinksH4: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0F172A",
    marginBottom: 12,
  },

  footerLink: {
    color: "#64748B",
    textDecoration: "none",
    fontSize: 14,
    transition: "color 0.2s",
  },
  footerLinkHover: {
    color: "#1B9AAA",
  },

  footerBottom: {
    maxWidth: 1200,
    margin: "0 auto",
    paddingTop: 40,
    borderTop: "1px solid #E2E8F0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    color: "#64748B",
    fontSize: 14,
  },

  footerBadges: {
    display: "flex",
    gap: 12,
  },

  badge: {
    background: "#FFF",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    color: "#475569",
    border: "1px solid #E2E8F0",
  },
};

// Add hover effects
const addHoverEffects = (styles) => {
  return {
    ...styles,
    navLink: {
      ...styles.navLink,
      ':hover': styles.navLinkHover,
    },
    primaryBtn: {
      ...styles.primaryBtn,
      ':hover': styles.primaryBtnHover,
    },
    primaryBtnLg: {
      ...styles.primaryBtnLg,
      ':hover': styles.primaryBtnLgHover,
    },
    secondaryBtnLg: {
      ...styles.secondaryBtnLg,
      ':hover': styles.secondaryBtnLgHover,
    },
    ghostBtnLg: {
      ...styles.ghostBtnLg,
      ':hover': styles.ghostBtnLgHover,
    },
    portalCard: {
      ...styles.portalCard,
      ':hover': styles.portalCardHover,
    },
    portalPrimaryBtn: {
      ...styles.portalPrimaryBtn,
      ':hover': styles.portalPrimaryBtnHover,
    },
    portalSecondaryBtn: {
      ...styles.portalSecondaryBtn,
      ':hover': styles.portalSecondaryBtnHover,
    },
    portalPoliceBtn: {
      ...styles.portalPoliceBtn,
      ':hover': styles.portalPoliceBtnHover,
    },
    card: {
      ...styles.card,
      ':hover': styles.cardHover,
    },
    quickReportBtn: {
      ...styles.quickReportBtn,
      ':hover': styles.quickReportBtnHover,
    },
    quickReportBtnOutline: {
      ...styles.quickReportBtnOutline,
      ':hover': styles.quickReportBtnOutlineHover,
    },
    footerLink: {
      ...styles.footerLink,
      ':hover': styles.footerLinkHover,
    },
  };
};

export const enhancedStyles = addHoverEffects(styles);