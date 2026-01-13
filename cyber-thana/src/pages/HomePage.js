import React from "react";
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

  return (
    <div style={styles.page}>
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
              <Link to="/anonymous-report" style={styles.portalSecondaryBtn}>
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
        style={styles.section}
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

      {/* ============ FOOTER ============ */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            <strong>Cyber Thana</strong>
            <p>Powered by Civora Nexus</p>
          </div>
          <div>© {new Date().getFullYear()} Civora Nexus</div>
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
  },

  header: {
    position: "sticky",
    top: 0,
    backdropFilter: "blur(18px)",
    background: "rgba(255,255,255,0.9)",
    borderBottom: "1px solid rgba(15,23,42,0.08)",
    zIndex: 100,
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
  logoText: { fontWeight: 800 },

  nav: { display: "flex", gap: 22, alignItems: "center" },
  navLink: { textDecoration: "none", fontWeight: 500, color: "#0F172A" },

  primaryBtn: {
    padding: "10px 20px",
    background: "linear-gradient(135deg,#1B9AAA,#14B8A6)",
    borderRadius: 999,
    fontWeight: 800,
    color: "#02131F",
    textDecoration: "none",
  },

  hero: { padding: "140px 20px" },
  heroInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 70,
  },

  heroTitle: { fontSize: 60, fontWeight: 800 },
  heroDesc: { color: "#475569", maxWidth: 520, marginBottom: 40 },
  heroActions: { display: "flex", gap: 16, flexWrap: "wrap" },

  primaryBtnLg: {
    padding: "14px 30px",
    background: "#1B9AAA",
    borderRadius: 999,
    fontWeight: 800,
    color: "#02131F",
    textDecoration: "none",
  },

  secondaryBtnLg: {
    padding: "14px 30px",
    border: "1px solid #CBD5E1",
    borderRadius: 999,
    color: "#0F172A",
    textDecoration: "none",
  },

  ghostBtnLg: {
    padding: "14px 30px",
    border: "1px dashed #94A3B8",
    borderRadius: 999,
    color: "#334155",
    textDecoration: "none",
    fontWeight: 700,
  },

  heroVisual: { display: "flex", justifyContent: "center" },

  dashboard: {
    width: 420,
    background: "#FFF",
    borderRadius: 20,
    padding: 22,
    boxShadow: "0 40px 80px rgba(15,23,42,0.15)",
  },

  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  statusBadge: {
    background: "#DCFCE7",
    color: "#166534",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },

  dashboardStats: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 12,
    marginBottom: 20,
  },

  statCard: {
    background: "#F1F5F9",
    padding: 14,
    borderRadius: 12,
    textAlign: "center",
  },

  chart: {
    background: "#F8FAFC",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },

  bar: {
    height: 10,
    background: "linear-gradient(90deg,#1B9AAA,#14B8A6)",
    borderRadius: 6,
    marginBottom: 10,
  },

  activity: { fontSize: 14, color: "#334155" },
  activityList: { paddingLeft: 20, marginTop: 8 },

  trustSection: {
    padding: "140px 20px",
    textAlign: "center",
    background: "linear-gradient(180deg, rgba(27,154,170,0.06), transparent)",
  },

  trustTitle: { fontSize: 40, fontWeight: 800, marginBottom: 16 },
  trustSubtitle: {
    maxWidth: 720,
    margin: "0 auto 70px",
    color: "#475569",
    fontSize: 18,
  },

  trustGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: 28,
  },

  trustCard: {
    background: "#FFF",
    padding: 32,
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
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
    marginBottom: 16,
  },

  portalSubtitle: {
    textAlign: "center",
    maxWidth: 720,
    margin: "0 auto 60px",
    color: "#475569",
    fontSize: 18,
  },

  portalGrid: {
    maxWidth: 1000,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: 32,
  },

  portalCard: {
    background: "#FFF",
    borderRadius: 24,
    padding: 36,
    boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
    border: "1px solid rgba(15,23,42,0.05)",
    display: "flex",
    flexDirection: "column",
  },

  portalIconVictim: {
    fontSize: 48,
    marginBottom: 20,
    background: "linear-gradient(135deg, #1B9AAA, #14B8A6)",
    width: 80,
    height: 80,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },

  portalIconPolice: {
    fontSize: 48,
    marginBottom: 20,
    background: "linear-gradient(135deg, #0F172A, #334155)",
    width: 80,
    height: 80,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },

  portalCardTitle: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 12,
  },

  portalCardDesc: {
    color: "#475569",
    marginBottom: 24,
    lineHeight: 1.6,
  },

  portalFeatures: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 28,
  },

  featureBadge: {
    background: "#F1F5F9",
    color: "#334155",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
  },

  portalActions: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  portalPrimaryBtn: {
    padding: "16px 24px",
    background: "linear-gradient(135deg, #1B9AAA, #14B8A6)",
    borderRadius: 12,
    fontWeight: 700,
    color: "#02131F",
    textDecoration: "none",
    textAlign: "center",
  },

  portalSecondaryBtn: {
    padding: "16px 24px",
    border: "2px solid #1B9AAA",
    borderRadius: 12,
    color: "#1B9AAA",
    textDecoration: "none",
    textAlign: "center",
    fontWeight: 600,
    background: "transparent",
  },

  portalPoliceBtn: {
    padding: "16px 24px",
    background: "linear-gradient(135deg, #0F172A, #334155)",
    borderRadius: 12,
    fontWeight: 700,
    color: "white",
    textDecoration: "none",
    textAlign: "center",
  },

  portalNote: {
    color: "#64748B",
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
  },

  section: { padding: "140px 20px", maxWidth: 1200, margin: "0 auto" },
  sectionTitle: { textAlign: "center", fontSize: 36, marginBottom: 70 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: 26,
  },

  card: {
    background: "#FFF",
    padding: 32,
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
  },

  footer: {
    padding: "50px 20px",
    background: "#F1F5F9",
    borderTop: "1px solid #E2E8F0",
  },

  footerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
};