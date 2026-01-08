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
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.35]);

  return (
    <div style={styles.page}>

      {/* ============ HEADER ============ */}
      <motion.header
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={styles.headerInner}>
          <div style={styles.logoWrapper}>
            <img src={civoraLogo} alt="Civora Nexus" style={styles.logoImg} />
            <span style={styles.logoText}>Cyber Thana</span>
          </div>

          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/report" style={styles.navLink}>Report</Link>
            <Link to="/track" style={styles.navLink}>Track</Link>
            <Link to="/resources" style={styles.navLink}>Resources</Link>
            <Link to="/report" style={styles.primaryBtn}>Report Incident</Link>
          </nav>
        </div>
      </motion.header>

      {/* ============ HERO ============ */}
      <section style={styles.hero}>
        <motion.div style={styles.heroInner} variants={stagger} initial="hidden" animate="visible">
          <div>
            <motion.h1 style={styles.heroTitle} variants={fadeUp}>
              Securely Report & Track Cyber Incidents
            </motion.h1>

            <motion.p style={styles.heroDesc} variants={fadeUp}>
              A citizen-first digital platform for transparent cybercrime reporting,
              real-time tracking, and verified safety resources.
            </motion.p>

            <motion.div style={styles.heroActions} variants={fadeUp}>
              <Link to="/report" style={styles.primaryBtnLg}>Report Incident</Link>
              <Link to="/track" style={styles.secondaryBtnLg}>Track Complaint</Link>
            </motion.div>
          </div>

          <motion.div style={styles.heroVisual} {...floatAnim} variants={fadeUp}>
            <div style={styles.mockup}>
              <div style={styles.mockupHeader}>Cyber Thana Dashboard</div>
              <div style={styles.mockupBody}>
                <div style={styles.mockLine} />
                <div style={styles.mockLine} />
                <div style={{ ...styles.mockLine, width: "60%" }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ TRUST PARALLAX ============ */}
      <motion.section
        style={{ ...styles.parallax, y: parallaxY, opacity: parallaxOpacity }}
      >
        <h2>Trusted · Secure · Transparent</h2>
        <p>Built with enterprise-grade security and civic trust.</p>
      </motion.section>

      {/* ============ FEATURES ============ */}
      <motion.section
        style={styles.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 style={styles.sectionTitle} variants={fadeUp}>
          Why Cyber Thana
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

      {/* ============ PROCESS ============ */}
      <motion.section
        style={styles.altSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 style={styles.sectionTitle} variants={fadeUp}>
          How It Works
        </motion.h2>

        <div style={styles.steps}>
          {steps.map((s, i) => (
            <motion.div key={i} style={styles.step} variants={fadeUp}>
              <span style={styles.stepNum}>{i + 1}</span>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ============ CTA ============ */}
      <motion.section style={styles.cta}>
        <h2>Report Cybercrime with Confidence</h2>
        <p>Your safety matters. Start securely today.</p>
        <Link to="/report" style={styles.ctaBtn}>Get Started</Link>
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

const features = [
  { title: "Secure Reporting", desc: "Encrypted and confidential incident submission." },
  { title: "Live Tracking", desc: "Transparent complaint progress updates." },
  { title: "Verified Resources", desc: "Authoritative cyber safety guidance." },
  { title: "Citizen-First Design", desc: "Accessible, inclusive, modern UI." },
];

const steps = [
  { title: "Submit Complaint", desc: "Guided and secure reporting flow." },
  { title: "Verification", desc: "Authorities validate the incident." },
  { title: "Resolution", desc: "Track progress until closure." },
];

/* ================= STYLES ================= */

const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
    background:
      "radial-gradient(80% 80% at 50% -20%, #142C52 0%, #071426 65%)",
    color: "#E5E7EB",
  },

  header: {
    position: "sticky",
    top: 0,
    backdropFilter: "blur(16px)",
    background: "rgba(7,20,38,0.75)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    zIndex: 100,
  },

  headerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoWrapper: { display: "flex", alignItems: "center", gap: "10px" },
  logoImg: { height: "34px" },
  logoText: { fontWeight: 700 },

  nav: { display: "flex", gap: "18px", alignItems: "center" },
  navLink: { color: "#CBD5E1", textDecoration: "none" },

  primaryBtn: {
    padding: "10px 18px",
    background: "#16808D",
    color: "#fff",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: 700,
  },

  hero: { padding: "160px 20px 140px" },

  heroInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "70px",
    alignItems: "center",
  },

  heroTitle: {
    fontSize: "64px",
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: "24px",
  },

  heroDesc: {
    fontSize: "18px",
    color: "#94A3B8",
    maxWidth: "540px",
    marginBottom: "44px",
  },

  heroActions: { display: "flex", gap: "16px" },

  primaryBtnLg: {
    padding: "14px 30px",
    background: "linear-gradient(135deg, #1B9AAA, #16808D)",
    borderRadius: "999px",
    color: "#071426",
    fontWeight: 800,
    textDecoration: "none",
    boxShadow: "0 0 40px rgba(27,154,170,0.35)",
  },

  secondaryBtnLg: {
    padding: "14px 30px",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "999px",
    color: "#E5E7EB",
    textDecoration: "none",
  },

  heroVisual: { display: "flex", justifyContent: "center" },

  mockup: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
  },

  mockupHeader: {
    padding: "16px",
    background: "#142C52",
    fontWeight: 600,
  },

  mockupBody: { padding: "24px" },
  mockLine: {
    height: "14px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "6px",
    marginBottom: "12px",
  },

  parallax: {
    padding: "120px 20px",
    textAlign: "center",
    background: "#071426",
  },

  section: { padding: "120px 20px", maxWidth: "1200px", margin: "0 auto" },
  altSection: { padding: "120px 20px", background: "#020F1F" },

  sectionTitle: { textAlign: "center", fontSize: "36px", marginBottom: "70px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
    gap: "26px",
  },

  card: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "32px",
    borderRadius: "20px",
  },

  steps: {
    maxWidth: "900px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "36px",
  },

  step: { textAlign: "center" },
  stepNum: { fontSize: "28px", fontWeight: 800, color: "#1B9AAA" },

  cta: {
    padding: "140px 20px",
    textAlign: "center",
    background:
      "radial-gradient(60% 60% at 50% 0%, #142C52 0%, #071426 70%)",
  },

  ctaBtn: {
    marginTop: "28px",
    display: "inline-block",
    padding: "14px 30px",
    background: "#1B9AAA",
    color: "#071426",
    borderRadius: "999px",
    fontWeight: 800,
    textDecoration: "none",
  },

  footer: {
    padding: "50px 20px",
    background: "#071426",
    color: "#94A3B8",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },

  footerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
  },
};
