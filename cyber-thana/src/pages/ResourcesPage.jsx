import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ResourcesPage.css";

// Icons
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17a2 2 0 0 0 4 0v-2.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="8" y="2" width="8" height="10" rx="4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const categories = [
  { 
    id: 1,
    icon: "🛡️", 
    title: "Cyber Safety Guides", 
    desc: "Best practices to stay secure online",
    resources: 12,
    color: "#1B9AAA"
  },
  { 
    id: 2,
    icon: "🎣", 
    title: "Phishing Awareness", 
    desc: "Identify and avoid online scams",
    resources: 8,
    color: "#142C52"
  },
  { 
    id: 3,
    icon: "🔐", 
    title: "Data Protection", 
    desc: "Protect personal and organizational data",
    resources: 15,
    color: "#02394A"
  },
  { 
    id: 4,
    icon: "📱", 
    title: "Social Media Safety", 
    desc: "Stay safe across social platforms",
    resources: 10,
    color: "#16808D"
  },
  { 
    id: 5,
    icon: "💳", 
    title: "Financial Fraud", 
    desc: "Prevent online payment frauds",
    resources: 9,
    color: "#0E2140"
  },
  { 
    id: 6,
    icon: "🧠", 
    title: "Cyber Hygiene", 
    desc: "Daily habits for digital safety",
    resources: 14,
    color: "#147783"
  },
  { 
    id: 7,
    icon: "🏠", 
    title: "Home Network Security", 
    desc: "Secure your home Wi-Fi and devices",
    resources: 7,
    color: "#4C97A8"
  },
  { 
    id: 8,
    icon: "👨‍💼", 
    title: "Business Security", 
    desc: "Cybersecurity for small businesses",
    resources: 11,
    color: "#07426"
  },
];

const allGuides = [
  {
    id: 1,
    title: "How to Identify Phishing Attacks",
    description: "Learn to recognize phishing emails, messages, and websites before they compromise your security.",
    category: "Phishing Awareness",
    readTime: "5 min read",
    downloads: 1247,
    featured: true,
    color: "#1B9AAA",
    content: "This guide covers common phishing techniques, red flags to watch for, and steps to verify suspicious messages."
  },
  {
    id: 2,
    title: "What To Do After Account Compromise",
    description: "Step-by-step guide to recover your accounts and prevent further damage after a security breach.",
    category: "Cyber Safety Guides",
    readTime: "8 min read",
    downloads: 892,
    featured: true,
    color: "#142C52",
    content: "Immediate actions to take, contact information for major platforms, and security improvements."
  },
  {
    id: 3,
    title: "Safe Online Payments Checklist",
    description: "Essential checks to ensure your financial transactions are secure and protected from fraud.",
    category: "Financial Fraud",
    readTime: "4 min read",
    downloads: 1563,
    featured: true,
    color: "#02394A",
    content: "Verification steps for online merchants, secure payment methods, and fraud prevention tips."
  },
  {
    id: 4,
    title: "Steps After a Data Breach",
    description: "Immediate actions and long-term measures to take when your personal data is exposed.",
    category: "Data Protection",
    readTime: "10 min read",
    downloads: 743,
    featured: true,
    color: "#16808D",
    content: "How to assess damage, notify authorities, monitor accounts, and implement stronger security."
  },
  {
    id: 5,
    title: "Creating Strong Passwords",
    description: "Best practices for creating and managing secure passwords across all your accounts.",
    category: "Cyber Hygiene",
    readTime: "6 min read",
    downloads: 2345,
    featured: false,
    color: "#0E2140",
    content: "Password complexity rules, password manager recommendations, and regular update schedules."
  },
  {
    id: 6,
    title: "Social Media Privacy Settings",
    description: "How to configure privacy settings on major social platforms to protect your information.",
    category: "Social Media Safety",
    readTime: "7 min read",
    downloads: 1876,
    featured: false,
    color: "#147783",
    content: "Step-by-step guides for Facebook, Instagram, Twitter, and LinkedIn privacy configurations."
  },
  {
    id: 7,
    title: "Two-Factor Authentication Setup",
    description: "Comprehensive guide to enabling 2FA on popular services for enhanced security.",
    category: "Cyber Safety Guides",
    readTime: "5 min read",
    downloads: 1567,
    featured: false,
    color: "#4C97A8",
    content: "Instructions for enabling 2FA on email, banking, social media, and cloud services."
  },
  {
    id: 8,
    title: "Recognizing Tech Support Scams",
    description: "Identify and avoid fake tech support calls and messages claiming to be from trusted companies.",
    category: "Phishing Awareness",
    readTime: "4 min read",
    downloads: 945,
    featured: false,
    color: "#07426",
    content: "Common scam patterns, verification methods, and reporting procedures."
  },
  {
    id: 9,
    title: "Home Wi-Fi Security Guide",
    description: "Secure your home network against unauthorized access and attacks.",
    category: "Home Network Security",
    readTime: "8 min read",
    downloads: 1123,
    featured: false,
    color: "#1B9AAA",
    content: "Router security settings, encryption methods, and network monitoring tools."
  },
  {
    id: 10,
    title: "Business Email Compromise Prevention",
    description: "Protect your business from email-based attacks and financial fraud.",
    category: "Business Security",
    readTime: "9 min read",
    downloads: 876,
    featured: false,
    color: "#142C52",
    content: "Employee training, email security protocols, and incident response plans."
  },
];

const safetyTools = [
  {
    id: 1,
    title: "Password Strength Checker",
    icon: "🔑",
    description: "Test the strength of your passwords and get recommendations for improvement",
    interactive: true,
    link: "#password-checker",
    toolType: "checker"
  },
  {
    id: 2,
    title: "Phishing Email Identifier",
    icon: "📧",
    description: "Learn to spot suspicious emails with interactive examples and quizzes",
    interactive: true,
    link: "#phishing-identifier",
    toolType: "quiz"
  },
  {
    id: 3,
    title: "Cyber Safety Checklist",
    icon: "📋",
    description: "Interactive checklist for comprehensive digital security assessment",
    interactive: true,
    link: "#safety-checklist",
    toolType: "checklist"
  },
  {
    id: 4,
    title: "Password Generator",
    icon: "⚡",
    description: "Generate strong, secure passwords with customizable options",
    interactive: true,
    link: "#password-generator",
    toolType: "generator"
  },
  {
    id: 5,
    title: "Data Breach Checker",
    icon: "🔍",
    description: "Check if your email has appeared in known data breaches (simulated)",
    interactive: true,
    link: "#breach-checker",
    toolType: "checker"
  },
  {
    id: 6,
    title: "Network Security Scanner",
    icon: "📡",
    description: "Basic home network security assessment tool",
    interactive: true,
    link: "#network-scanner",
    toolType: "scanner"
  },
];

const officialResources = [
  {
    name: "National Cyber Crime Portal",
    url: "https://cybercrime.gov.in",
    description: "Government portal for cybercrime reporting and resources",
    category: "Government",
    verified: true
  },
  {
    name: "CERT-In Advisories",
    url: "https://cert-in.org.in",
    description: "Latest security advisories from Indian Computer Emergency Response Team",
    category: "Government",
    verified: true
  },
  {
    name: "Government Awareness Programs",
    url: "https://www.mha.gov.in",
    description: "Cybersecurity awareness initiatives by Government of India",
    category: "Awareness",
    verified: true
  },
  {
    name: "Cyber Emergency Helpline",
    url: "tel:155260",
    description: "24/7 cybercrime helpline for immediate assistance",
    category: "Emergency",
    verified: true
  },
  {
    name: "Data Protection Guidelines",
    url: "https://www.meity.gov.in",
    description: "Official data protection and privacy guidelines",
    category: "Regulatory",
    verified: true
  },
  {
    name: "Consumer Protection Commission",
    url: "https://consumerhelpline.gov.in",
    description: "Report financial fraud and online shopping scams",
    category: "Consumer",
    verified: true
  },
];

// Achievements system
const achievements = [
  { id: 1, name: "First Download", icon: "🎯", description: "Download your first guide", unlocked: false },
  { id: 2, name: "Safety Expert", icon: "🏆", description: "Complete all safety checklist items", unlocked: false },
  { id: 3, name: "Quiz Master", icon: "🧠", description: "Score 100% on any quiz", unlocked: false },
  { id: 4, name: "Resource Collector", icon: "📚", description: "Download 5+ guides", unlocked: false },
  { id: 5, name: "Tool Explorer", icon: "🛠️", description: "Try all interactive tools", unlocked: false },
];

// Use debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// Memoized Category Card Component
const CategoryCard = React.memo(({ cat, onClick, index }) => (
  <motion.div
    className="category-card"
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1 }}
    onClick={onClick}
  >
    <div 
      className="category-icon"
      style={{ backgroundColor: `${cat.color}20` }}
    >
      <span style={{ color: cat.color }}>{cat.icon}</span>
    </div>
    <h3>{cat.title}</h3>
    <p>{cat.desc}</p>
    <div className="category-meta">
      <span className="resource-count">{cat.resources} resources</span>
      <span className="view-link">View all →</span>
    </div>
  </motion.div>
));

export default function ResourcesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [theme, setTheme] = useState("dark");
  const [downloadedGuides, setDownloadedGuides] = useState([]);
  const [readGuides, setReadGuides] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(true);
  const [activeTool, setActiveTool] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [phishingQuiz, setPhishingQuiz] = useState({
    currentQuestion: 0,
    score: 0,
    completed: false
  });
  const [safetyChecklist, setSafetyChecklist] = useState([
    { id: 1, text: "Use strong, unique passwords", checked: false },
    { id: 2, text: "Enable two-factor authentication", checked: false },
    { id: 3, text: "Update software regularly", checked: false },
    { id: 4, text: "Backup important data", checked: false },
    { id: 5, text: "Use antivirus software", checked: false },
    { id: 6, text: "Be cautious with emails", checked: false },
    { id: 7, text: "Secure home Wi-Fi", checked: false },
    { id: 8, text: "Review privacy settings", checked: false },
  ]);
  const [userProgress, setUserProgress] = useState({
    guidesRead: 0,
    toolsCompleted: 0,
    checklistProgress: 0,
    totalScore: 0,
    points: 0
  });
  const [userAchievements, setUserAchievements] = useState(achievements);
  const [ratings, setRatings] = useState({});
  const [passwordOptions, setPasswordOptions] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  const searchInputRef = useRef(null);

  // Load all user data from localStorage
  useEffect(() => {
    // Theme
    const savedTheme = localStorage.getItem("resourcesTheme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'dark' : 'light';
      setTheme(defaultTheme);
      document.body.className = defaultTheme;
    }
    
    // Downloaded guides
    const savedDownloads = localStorage.getItem("downloadedGuides");
    if (savedDownloads) {
      setDownloadedGuides(JSON.parse(savedDownloads));
    }
    
    // Read guides
    const savedRead = localStorage.getItem("readGuides");
    if (savedRead) {
      setReadGuides(JSON.parse(savedRead));
    }
    
    // Safety checklist
    const savedChecklist = localStorage.getItem("safetyChecklist");
    if (savedChecklist) {
      setSafetyChecklist(JSON.parse(savedChecklist));
    }
    
    // User progress
    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    
    // Achievements
    const savedAchievements = localStorage.getItem("achievements");
    if (savedAchievements) {
      setUserAchievements(JSON.parse(savedAchievements));
    }
    
    // Ratings
    const savedRatings = localStorage.getItem("guideRatings");
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings));
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+/ to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      
      // Escape to close active tool or emergency panel
      if (e.key === 'Escape') {
        if (activeTool) setActiveTool(null);
        if (showEmergencyPanel) setShowEmergencyPanel(false);
      }
      
      // Backspace with Ctrl to go back
      if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
        handleGoBack();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTool, showEmergencyPanel]);

  // Update progress when data changes
  useEffect(() => {
    const newProgress = {
      guidesRead: readGuides.length,
      toolsCompleted: downloadedGuides.length > 0 ? 1 : 0, // Simplified
      checklistProgress: safetyChecklist.filter(item => item.checked).length,
      totalScore: phishingQuiz.score + (readGuides.length * 10),
      points: userProgress.points
    };
    
    setUserProgress(newProgress);
    localStorage.setItem("userProgress", JSON.stringify(newProgress));
  }, [readGuides, downloadedGuides, safetyChecklist, phishingQuiz.score]);

  // Check and award achievements
  useEffect(() => {
    const updatedAchievements = [...userAchievements];
    
    // First Download achievement
    if (downloadedGuides.length >= 1 && !updatedAchievements[0].unlocked) {
      updatedAchievements[0].unlocked = true;
      awardPoints(50);
      showAchievementNotification(updatedAchievements[0]);
    }
    
    // Resource Collector achievement
    if (downloadedGuides.length >= 5 && !updatedAchievements[3].unlocked) {
      updatedAchievements[3].unlocked = true;
      awardPoints(100);
      showAchievementNotification(updatedAchievements[3]);
    }
    
    // Safety Expert achievement
    const allChecked = safetyChecklist.every(item => item.checked);
    if (allChecked && !updatedAchievements[1].unlocked) {
      updatedAchievements[1].unlocked = true;
      awardPoints(150);
      showAchievementNotification(updatedAchievements[1]);
    }
    
    setUserAchievements(updatedAchievements);
    localStorage.setItem("achievements", JSON.stringify(updatedAchievements));
  }, [downloadedGuides.length, safetyChecklist]);

  const showAchievementNotification = (achievement) => {
    alert(`🎉 Achievement Unlocked: ${achievement.name}!\n\n${achievement.description}\n\n+${achievement.id === 1 ? 50 : achievement.id === 3 ? 100 : 150} points`);
  };

  const awardPoints = (points) => {
    setUserProgress(prev => ({
      ...prev,
      points: prev.points + points
    }));
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("resourcesTheme", newTheme);
    document.body.className = newTheme;
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleDownloadGuide = (guideId) => {
    if (!downloadedGuides.includes(guideId)) {
      const newDownloads = [...downloadedGuides, guideId];
      setDownloadedGuides(newDownloads);
      localStorage.setItem("downloadedGuides", JSON.stringify(newDownloads));
      awardPoints(10);
    }
    
    const guide = allGuides.find(g => g.id === guideId);
    alert(`✅ Guide "${guide?.title}" downloaded successfully!\n\n+10 points`);
  };

  const handleReadGuide = (guideId) => {
    if (!readGuides.includes(guideId)) {
      const newRead = [...readGuides, guideId];
      setReadGuides(newRead);
      localStorage.setItem("readGuides", JSON.stringify(newRead));
      awardPoints(5);
    }
    
    const guide = allGuides.find(g => g.id === guideId);
    alert(`📖 Opening guide: ${guide?.title}\n\n${guide?.content}\n\n${!readGuides.includes(guideId) ? '+5 points' : ''}`);
  };

  const handleToggleNotification = () => {
    setNotificationStatus(!notificationStatus);
    alert(`Notifications ${!notificationStatus ? 'enabled' : 'disabled'}`);
  };

  const handleReportIncident = () => {
    navigate("/report");
  };

  const handleTrackReport = () => {
    navigate("/track");
  };

  const handleContactSupport = () => {
    alert("📞 Support team contacted. You will receive a response within 24 hours.");
  };

  const handleExternalLink = (url, name) => {
    if (window.confirm(`🔗 You are being redirected to: ${name}\n\nDo you want to continue?`)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const filteredGuides = allGuides.filter(guide => {
    const matchesSearch = debouncedSearch === "" || 
      guide.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      guide.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      guide.category.toLowerCase().includes(debouncedSearch.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categoriesList = ["All", ...new Set(allGuides.map(g => g.category))];

  // Get recommended guides
  const recommendedGuides = allGuides
    .filter(guide => 
      !readGuides.includes(guide.id) && 
      !downloadedGuides.includes(guide.id)
    )
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 3);

  // Password Strength Checker Function
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const strengthLevels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    return strengthLevels[Math.min(strength, 4)];
  };

  const handlePasswordCheck = () => {
    if (!passwordInput) {
      alert("⚠️ Please enter a password to check");
      return;
    }
    const strength = checkPasswordStrength(passwordInput);
    setPasswordStrength(strength);
    awardPoints(5);
    
    let meterHTML = `🔐 Password Strength: ${strength}\n\n`;
    meterHTML += "📋 Recommendations:\n";
    if (passwordInput.length < 8) meterHTML += "• Use at least 8 characters\n";
    if (passwordInput.length < 12) meterHTML += "• 12+ characters is better\n";
    if (!/[A-Z]/.test(passwordInput)) meterHTML += "• Add uppercase letters\n";
    if (!/[0-9]/.test(passwordInput)) meterHTML += "• Add numbers\n";
    if (!/[^A-Za-z0-9]/.test(passwordInput)) meterHTML += "• Add special characters\n";
    
    alert(meterHTML + "\n+5 points");
  };

  // Password Generator
  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    let charset = "";
    if (passwordOptions.lowercase) charset += lowercase;
    if (passwordOptions.uppercase) charset += uppercase;
    if (passwordOptions.numbers) charset += numbers;
    if (passwordOptions.symbols) charset += symbols;
    
    if (!charset) {
      alert("⚠️ Please select at least one character type");
      return;
    }
    
    let password = "";
    for (let i = 0; i < passwordOptions.length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    setGeneratedPassword(password);
    awardPoints(5);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("✅ Password copied to clipboard!");
    });
  };

  // Phishing Quiz Questions
  const phishingQuestions = [
    {
      question: "You receive an email from 'support@amaz0n.com' asking to verify your account. What should you do?",
      options: [
        "Click the link and verify your account",
        "Forward to friends to warn them",
        "Delete the email immediately",
        "Check sender email and don't click links"
      ],
      correctAnswer: 3,
      explanation: "The email uses '0' instead of 'o' in Amazon - a common phishing trick. Never click links in suspicious emails."
    },
    {
      question: "A text message says you've won a lottery you never entered. What's the best action?",
      options: [
        "Reply to claim your prize",
        "Provide your bank details to receive money",
        "Ignore and delete the message",
        "Forward to authorities for investigation"
      ],
      correctAnswer: 2,
      explanation: "Unexpected prize notifications are common scams. Never engage with such messages."
    },
    {
      question: "A caller claims to be from Microsoft Support saying your computer is infected. What do you do?",
      options: [
        "Allow remote access to fix the issue",
        "Provide your credit card for antivirus",
        "Hang up immediately",
        "Ask for verification through official channels"
      ],
      correctAnswer: 3,
      explanation: "Legitimate companies don't make unsolicited tech support calls. Verify through official websites."
    }
  ];

  const handlePhishingQuiz = (answerIndex) => {
    const isCorrect = answerIndex === phishingQuestions[phishingQuiz.currentQuestion].correctAnswer;
    
    const newScore = isCorrect ? phishingQuiz.score + 1 : phishingQuiz.score;
    const nextQuestion = phishingQuiz.currentQuestion + 1;
    const isCompleted = nextQuestion >= phishingQuestions.length;
    
    setPhishingQuiz({
      currentQuestion: isCompleted ? 0 : nextQuestion,
      score: newScore,
      completed: isCompleted
    });
    
    if (isCorrect) awardPoints(10);
    
    if (isCompleted) {
      if (newScore === phishingQuestions.length && !userAchievements[2].unlocked) {
        const updatedAchievements = [...userAchievements];
        updatedAchievements[2].unlocked = true;
        setUserAchievements(updatedAchievements);
        localStorage.setItem("achievements", JSON.stringify(updatedAchievements));
        awardPoints(100);
      }
      
      alert(`🎉 Quiz completed!\n\nYour Score: ${newScore}/${phishingQuestions.length}\n\nThank you for learning about phishing awareness!\n\n+${newScore * 10} points`);
      setPhishingQuiz({ currentQuestion: 0, score: 0, completed: false });
    } else {
      alert(`${isCorrect ? '✅ Correct!' : '❌ Incorrect'}\n\n${phishingQuestions[phishingQuiz.currentQuestion].explanation}\n\n${isCorrect ? '+10 points' : ''}`);
    }
  };

  const handleChecklistToggle = (id) => {
    const newChecklist = safetyChecklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setSafetyChecklist(newChecklist);
    localStorage.setItem("safetyChecklist", JSON.stringify(newChecklist));
    
    if (!safetyChecklist.find(item => item.id === id)?.checked) {
      awardPoints(5);
    }
  };

  const handleCompleteChecklist = () => {
    const checkedCount = safetyChecklist.filter(item => item.checked).length;
    const total = safetyChecklist.length;
    
    if (checkedCount === total) {
      alert("🎉 Excellent! You've completed all safety checklist items!\n\nYour digital security is top-notch!\n\n+50 points");
    } else {
      alert(`📋 Safety Checklist Progress: ${checkedCount}/${total} completed\n\nKeep going to improve your digital security!\n\nCurrent progress: ${Math.round((checkedCount/total)*100)}%`);
    }
  };

  const handleRateGuide = (guideId, rating) => {
    setRatings(prev => ({
      ...prev,
      [guideId]: {
        userRating: rating,
        average: ((prev[guideId]?.average || 0) + rating) / 2,
        count: (prev[guideId]?.count || 0) + 1
      }
    }));
    localStorage.setItem("guideRatings", JSON.stringify(ratings));
    awardPoints(15);
    alert(`⭐ Thanks for your feedback! You rated this guide ${rating}/5 stars.\n\n+15 points`);
  };

  const handleToolClick = (tool) => {
    setActiveTool(tool);
    
    switch (tool.toolType) {
      case "checker":
        if (tool.id === 1) { // Password checker
          const password = prompt("Enter a password to check its strength:");
          if (password) {
            setPasswordInput(password);
            setTimeout(() => handlePasswordCheck(), 100);
          }
        } else if (tool.id === 5) { // Breach checker
          const email = prompt("Enter email to check for breaches (simulated):");
          if (email) {
            const isBreached = Math.random() > 0.7;
            alert(isBreached 
              ? `⚠️ Alert: Email "${email}" found in simulated data breach.\n\nRecommendation: Change your password and enable 2FA.\n\n+10 points for checking`
              : `✅ Good news! Email "${email}" not found in simulated breaches.\n\nKeep following security best practices.\n\n+10 points for checking`
            );
            awardPoints(10);
          }
        }
        break;
        
      case "quiz":
        setPhishingQuiz({ currentQuestion: 0, score: 0, completed: false });
        alert("🎯 Starting Phishing Awareness Quiz!\n\nYou'll be shown common scam scenarios. Choose the safest response.\n\nEarn 10 points per correct answer!");
        break;
        
      case "checklist":
        alert("📋 Opening Safety Checklist\n\nCheck off items as you complete them to track your security progress.\n\nEarn 5 points per completed item!");
        break;
        
      case "generator":
        alert("⚡ Password Generator\n\nGenerate strong, secure passwords with customizable options.\n\nEarn 5 points per generated password!");
        break;
        
      case "scanner":
        const networkStatus = Math.random() > 0.3 ? "secure" : "needs attention";
        alert(`📡 Network Security Scan Results:\n\nStatus: ${networkStatus.toUpperCase()}\n\n${networkStatus === "secure" 
          ? "✅ Your simulated network appears secure.\nContinue regular security updates."
          : "⚠️ Your simulated network may have vulnerabilities.\nConsider updating router firmware and changing Wi-Fi password."
        }\n\n+15 points for scanning`);
        awardPoints(15);
        break;
    }
  };

  const handleDownloadAll = () => {
    const confirmDownload = window.confirm(
      "📥 Download Complete Resource Pack?\n\nThis includes all guides, checklists, and templates (25+ MB)."
    );
    
    if (confirmDownload) {
      alert("📥 Download started...\n\nResource pack will be available shortly.\nCheck your downloads folder.");
      
      const allGuideIds = allGuides.map(g => g.id);
      const newDownloads = [...new Set([...downloadedGuides, ...allGuideIds])];
      setDownloadedGuides(newDownloads);
      localStorage.setItem("downloadedGuides", JSON.stringify(newDownloads));
      awardPoints(50);
    }
  };

  const handleShareResource = (resource) => {
    if (navigator.share) {
      navigator.share({
        title: resource.title || resource.name,
        text: `Check out this cybersecurity resource: ${resource.description}`,
        url: window.location.href,
      }).then(() => {
        awardPoints(20);
        alert("✅ Shared successfully!\n\n+20 points");
      });
    } else {
      navigator.clipboard.writeText(`${resource.title || resource.name}: ${window.location.href}`);
      alert("✅ Link copied to clipboard!\n\n+20 points");
      awardPoints(20);
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };
      
      recognition.start();
      alert("🎤 Listening... Speak your search query.");
    } else {
      alert("Voice search is not supported in your browser.");
    }
  };

  const exportProgress = () => {
    const progressData = {
      downloadedGuides,
      readGuides,
      checklistProgress: safetyChecklist,
      achievements: userAchievements,
      points: userProgress.points,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', 'cyber-safety-progress.json');
    link.click();
    
    alert("✅ Progress exported successfully!");
  };

  const importProgress = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const progressData = JSON.parse(event.target.result);
          
          if (progressData.downloadedGuides) setDownloadedGuides(progressData.downloadedGuides);
          if (progressData.readGuides) setReadGuides(progressData.readGuides);
          if (progressData.checklistProgress) setSafetyChecklist(progressData.checklistProgress);
          if (progressData.achievements) setUserAchievements(progressData.achievements);
          if (progressData.points) setUserProgress(prev => ({...prev, points: progressData.points}));
          
          alert("✅ Progress imported successfully!");
        } catch (error) {
          alert("❌ Error importing progress data");
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  return (
    <div className={`resources-page ${theme}`}>
      {/* ================= HEADER ================= */}
      <motion.header
        className="resources-header"
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
              <BookIcon />
            </div>
            <div>
              <h1 className="header-title">Cyber Safety Resources</h1>
              <p className="header-subtitle">
                Verified guides, tools, and official resources to protect yourself online
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
              onClick={() => setShowEmergencyPanel(!showEmergencyPanel)}
              aria-label="Emergency actions"
            >
              🚨 Emergency
            </button>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge">✅ Verified Content</span>
          <span className="badge">🛡️ Official Sources</span>
          <span className="badge">📚 {allGuides.length}+ Resources</span>
          <span className="badge">⭐ {userProgress.points} Points</span>
          <button 
            className="progress-badge"
            onClick={() => alert(`Your Progress:\n\n📖 Guides Read: ${userProgress.guidesRead}\n🛠️ Tools Completed: ${userProgress.toolsCompleted}\n✅ Checklist: ${userProgress.checklistProgress}/8\n🎯 Total Points: ${userProgress.points}`)}
          >
            📊 Progress
          </button>
        </div>
      </motion.header>

      {/* ================= EMERGENCY PANEL ================= */}
      <AnimatePresence>
        {showEmergencyPanel && (
          <motion.div
            className="emergency-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="emergency-header">
              <h3>🚨 Emergency Quick Actions</h3>
              <button 
                className="close-emergency"
                onClick={() => setShowEmergencyPanel(false)}
              >
                ✕
              </button>
            </div>
            <div className="emergency-actions">
              <button 
                className="emergency-action"
                onClick={() => window.location.href = 'tel:155260'}
              >
                <span>📞</span>
                <div>
                  <strong>Emergency Helpline</strong>
                  <small>Call 155260</small>
                </div>
              </button>
              <button 
                className="emergency-action"
                onClick={() => window.open('https://cybercrime.gov.in', '_blank')}
              >
                <span>⚡</span>
                <div>
                  <strong>Quick Report</strong>
                  <small>Cybercrime Portal</small>
                </div>
              </button>
              <button 
                className="emergency-action"
                onClick={() => alert("Simulated: All accounts locked. Contact support for recovery.")}
              >
                <span>🔒</span>
                <div>
                  <strong>Lock Accounts</strong>
                  <small>Immediate protection</small>
                </div>
              </button>
              <button 
                className="emergency-action"
                onClick={() => navigate("/report")}
              >
                <span>📋</span>
                <div>
                  <strong>Report Incident</strong>
                  <small>Detailed report</small>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO SECTION ================= */}
      <motion.section
        className="resources-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="hero-content">
          <h1>Stay Informed. Stay Protected.</h1>
          <p className="hero-description">
            Access verified cyber safety resources, official guidance, and interactive tools 
            to help citizens prevent and respond to cyber threats effectively.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{allGuides.length}+</span>
              <span className="stat-label">Resources</span>
            </div>
            <div className="stat">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">{safetyTools.length}</span>
              <span className="stat-label">Tools</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userProgress.points}</span>
              <span className="stat-label">Points</span>
            </div>
          </div>
        </div>
        
        <div className="hero-illustration">
          <div className="illustration-icon">🛡️</div>
          <div className="progress-ring">
            <div className="ring-progress" style={{ 
              background: `conic-gradient(#1B9AAA ${(userProgress.checklistProgress/8)*360}deg, #eee 0deg)` 
            }}>
              <span>{Math.round((userProgress.checklistProgress/8)*100)}%</span>
            </div>
            <small>Checklist Complete</small>
          </div>
        </div>
      </motion.section>

      {/* ================= SEARCH & FILTERS ================= */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-input-group">
            <SearchIcon />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search resources, guides, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search resources"
            />
            <button 
              className="voice-search-btn"
              onClick={handleVoiceSearch}
              aria-label="Voice search"
              title="Voice search"
            >
              🎤
            </button>
            {searchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="search-shortcut">
            <small>Press <kbd>Ctrl</kbd> + <kbd>/</kbd> to focus search</small>
          </div>
          
          <div className="filter-tabs">
            {categoriesList.map(category => (
              <button
                key={category}
                className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                {category !== "All" && (
                  <span className="tab-count">
                    {allGuides.filter(g => g.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RECOMMENDED GUIDES ================= */}
      {recommendedGuides.length > 0 && !searchQuery && selectedCategory === "All" && (
        <section className="resources-section recommended">
          <div className="section-header">
            <h2>Recommended For You</h2>
            <p className="section-subtitle">
              Based on your activity and popular downloads
            </p>
          </div>

          <div className="recommended-grid">
            {recommendedGuides.map((guide, i) => (
              <motion.div
                key={guide.id}
                className="recommended-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="recommended-badge">🔥 Recommended</div>
                <div className="recommended-content">
                  <h3>{guide.title}</h3>
                  <p>{guide.description}</p>
                  <div className="recommended-meta">
                    <span className="category-tag" style={{ backgroundColor: guide.color }}>
                      {guide.category}
                    </span>
                    <span>{guide.readTime}</span>
                  </div>
                  <button 
                    className="recommended-btn"
                    onClick={() => handleReadGuide(guide.id)}
                  >
                    Start Reading
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ================= RESOURCE CATEGORIES ================= */}
      <section className="resources-section">
        <div className="section-header">
          <h2>Browse by Category</h2>
          <p className="section-subtitle">
            Explore comprehensive resources organized by cybersecurity topics
          </p>
        </div>

        <div className="category-grid">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              index={i}
              onClick={() => {
                setSelectedCategory(cat.title);
                document.querySelector('.guides-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* ================= FEATURED GUIDES ================= */}
      <section className="resources-section alt">
        <div className="section-header">
          <div className="section-header-row">
            <h2>Featured Safety Guides</h2>
            <div className="rating-info">
              <StarIcon /> Most Downloaded & Rated
            </div>
          </div>
          <p className="section-subtitle">
            Most downloaded and recommended guides for immediate use
          </p>
        </div>

        <div className="guides-grid">
          {allGuides.filter(g => g.featured).map((guide, i) => (
            <motion.div
              key={guide.id}
              className="guide-card featured"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              style={{ borderLeftColor: guide.color }}
            >
              <div className="guide-header">
                <span 
                  className="guide-category"
                  style={{ backgroundColor: guide.color }}
                >
                  {guide.category}
                </span>
                <div className="guide-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      className={`star-btn ${star <= (ratings[guide.id]?.userRating || 0) ? 'filled' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRateGuide(guide.id, star);
                      }}
                      aria-label={`Rate ${star} stars`}
                    >
                      ★
                    </button>
                  ))}
                  {ratings[guide.id] && (
                    <span className="rating-count">
                      ({ratings[guide.id].count || 0})
                    </span>
                  )}
                </div>
              </div>
              
              <h3>{guide.title}</h3>
              <p className="guide-description">{guide.description}</p>
              
              <div className="guide-footer">
                <div className="guide-meta">
                  <span className="download-count">
                    📥 {guide.downloads.toLocaleString()} downloads
                    {downloadedGuides.includes(guide.id) && " ✓"}
                  </span>
                  <span className="readtime">{guide.readTime}</span>
                </div>
                <div className="guide-actions">
                  <button 
                    className="share-btn"
                    onClick={() => handleShareResource(guide)}
                    title="Share this guide"
                  >
                    🔗 Share
                  </button>
                  <button 
                    className="secondary-btn"
                    onClick={() => handleDownloadGuide(guide.id)}
                  >
                    <DownloadIcon /> 
                    {downloadedGuides.includes(guide.id) ? "Download Again" : "Download PDF"}
                  </button>
                  <button 
                    className="primary-btn"
                    onClick={() => handleReadGuide(guide.id)}
                  >
                    {readGuides.includes(guide.id) ? "Read Again" : "Read Online"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ALL GUIDES GRID ================= */}
      {filteredGuides.length > 0 && (
        <section className="resources-section">
          <div className="section-header">
            <h2>
              {searchQuery ? `Search Results for "${searchQuery}"` : "All Safety Guides"}
            </h2>
            <p className="section-subtitle">
              Showing {filteredGuides.length} of {allGuides.length} guides
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>

          <div className="guides-grid compact">
            {filteredGuides.map((guide, i) => (
              <motion.div
                key={guide.id}
                className="guide-card compact"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="guide-header">
                  <span 
                    className="guide-category"
                    style={{ backgroundColor: guide.color }}
                  >
                    {guide.category}
                  </span>
                  <span className="guide-readtime">{guide.readTime}</span>
                </div>
                
                <h4>{guide.title}</h4>
                <p className="guide-description">{guide.description}</p>
                
                <div className="guide-footer">
                  <span className="download-count">
                    📥 {guide.downloads.toLocaleString()} downloads
                    {downloadedGuides.includes(guide.id) && " ✓"}
                  </span>
                  <div className="guide-action-buttons">
                    <button 
                      className="share-btn compact"
                      onClick={() => handleShareResource(guide)}
                      title="Share"
                    >
                      🔗
                    </button>
                    <button 
                      className="download-btn"
                      onClick={() => handleDownloadGuide(guide.id)}
                      title={downloadedGuides.includes(guide.id) ? "Download again" : "Download guide"}
                    >
                      <DownloadIcon />
                    </button>
                    <button 
                      className="read-btn"
                      onClick={() => handleReadGuide(guide.id)}
                      title={readGuides.includes(guide.id) ? "Read again" : "Read guide"}
                    >
                      📖
                    </button>
                    <div className="rating-mini">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          className={`star-btn mini ${star <= (ratings[guide.id]?.userRating || 0) ? 'filled' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRateGuide(guide.id, star);
                          }}
                          aria-label={`Rate ${star} stars`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ================= INTERACTIVE TOOLS ================= */}
      <section className="resources-section alt">
        <div className="section-header">
          <h2>Interactive Safety Tools</h2>
          <p className="section-subtitle">
            Hands-on tools to test and improve your cybersecurity knowledge
          </p>
        </div>

        <div className="tools-list-container">
          <div className="tools-list">
            {safetyTools.map((tool, i) => (
              <motion.div
                key={tool.id}
                className="tool-list-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)" }}
              >
                <div className="tool-list-content">
                  <div className="tool-list-icon">
                    <span className="icon-emoji">{tool.icon}</span>
                    {tool.interactive && (
                      <span className="interactive-badge">Interactive</span>
                    )}
                  </div>
                  
                  <div className="tool-list-info">
                    <h3 className="tool-list-title">{tool.title}</h3>
                    <p className="tool-list-description">{tool.description}</p>
                    <div className="tool-list-meta">
                      <span className="tool-type">{tool.toolType}</span>
                      <span className="tool-status">Ready to use</span>
                    </div>
                  </div>
                  
                  <div className="tool-list-actions">
                    <button 
                      className="try-tool-btn"
                      onClick={() => handleToolClick(tool)}
                    >
                      Try Tool
                    </button>
                    <button 
                      className="info-tool-btn"
                      onClick={() => alert(`About ${tool.title}:\n\n${tool.description}\n\nThis tool helps you practice identifying ${tool.toolType === 'quiz' ? 'scam scenarios' : 'security vulnerabilities'}.`)}
                      title="More info"
                    >
                      ℹ️
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ACTIVE TOOL DISPLAY ================= */}
      {activeTool && (
        <section className="resources-section">
          <div className="active-tool-container">
            <div className="active-tool-header">
              <div className="tool-title-group">
                <span className="tool-icon">{activeTool.icon}</span>
                <h3>{activeTool.title}</h3>
              </div>
              <button 
                className="close-tool-btn"
                onClick={() => setActiveTool(null)}
                aria-label="Close tool"
              >
                ✕
              </button>
            </div>
            
            <div className="active-tool-content">
              {activeTool.id === 1 && ( // Password Checker
                <div className="password-checker">
                  <h4>Check Your Password Strength</h4>
                  <div className="password-input-group">
                    <input
                      type="password"
                      placeholder="Enter password to check"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="password-input"
                    />
                    <button 
                      className="check-btn"
                      onClick={handlePasswordCheck}
                    >
                      Check Strength
                    </button>
                  </div>
                  {passwordStrength && (
                    <div className="strength-result">
                      <strong>Strength:</strong> <span className={`strength-${passwordStrength.toLowerCase().replace(' ', '-')}`}>{passwordStrength}</span>
                    </div>
                  )}
                  <div className="password-tips">
                    <h5>Password Tips:</h5>
                    <ul>
                      <li>Use at least 12 characters</li>
                      <li>Mix uppercase, lowercase, numbers, and symbols</li>
                      <li>Avoid common words and personal information</li>
                      <li>Use a unique password for each account</li>
                      <li>Consider using a password manager</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTool.id === 2 && ( // Phishing Quiz
                <div className="phishing-quiz">
                  <div className="quiz-header">
                    <h4>Phishing Awareness Quiz</h4>
                    <div className="quiz-score">
                      Score: {phishingQuiz.score}/{phishingQuestions.length}
                    </div>
                  </div>
                  {!phishingQuiz.completed ? (
                    <>
                      <div className="quiz-progress">
                        Question {phishingQuiz.currentQuestion + 1} of {phishingQuestions.length}
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${((phishingQuiz.currentQuestion + 1) / phishingQuestions.length) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="quiz-question">
                        <p>{phishingQuestions[phishingQuiz.currentQuestion].question}</p>
                      </div>
                      <div className="quiz-options">
                        {phishingQuestions[phishingQuiz.currentQuestion].options.map((option, idx) => (
                          <button
                            key={idx}
                            className="quiz-option"
                            onClick={() => handlePhishingQuiz(idx)}
                          >
                            <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                            {option}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="quiz-completed">
                      <div className="quiz-result">
                        <h5>🎉 Quiz Completed!</h5>
                        <p>Your Score: {phishingQuiz.score}/{phishingQuestions.length}</p>
                        <div className="result-message">
                          {phishingQuiz.score === phishingQuestions.length 
                            ? "Perfect! You're a phishing detection expert! 🏆" 
                            : phishingQuiz.score >= phishingQuestions.length / 2 
                            ? "Good job! Keep learning to improve your skills! 📚"
                            : "Keep practicing! Try the quiz again to improve! 🔄"
                          }
                        </div>
                      </div>
                      <button 
                        className="retry-btn"
                        onClick={() => setPhishingQuiz({ currentQuestion: 0, score: 0, completed: false })}
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {activeTool.id === 3 && ( // Safety Checklist
                <div className="safety-checklist">
                  <div className="checklist-header">
                    <h4>Cyber Safety Checklist</h4>
                    <div className="checklist-progress">
                      {safetyChecklist.filter(item => item.checked).length}/{safetyChecklist.length} completed
                    </div>
                  </div>
                  <p>Check off items as you complete them:</p>
                  <div className="checklist-items">
                    {safetyChecklist.map(item => (
                      <div 
                        key={item.id}
                        className={`checklist-item ${item.checked ? 'checked' : ''}`}
                        onClick={() => handleChecklistToggle(item.id)}
                      >
                        <span className="checkmark">
                          {item.checked && <CheckIcon />}
                        </span>
                        <span className="checklist-text">{item.text}</span>
                        <span className="checklist-points">+5 pts</span>
                      </div>
                    ))}
                  </div>
                  <div className="checklist-actions">
                    <button 
                      className="complete-checklist-btn"
                      onClick={handleCompleteChecklist}
                    >
                      Check Progress
                    </button>
                    <button 
                      className="reset-checklist-btn"
                      onClick={() => {
                        if (window.confirm("Reset all checklist items?")) {
                          const resetChecklist = safetyChecklist.map(item => ({ ...item, checked: false }));
                          setSafetyChecklist(resetChecklist);
                          localStorage.setItem("safetyChecklist", JSON.stringify(resetChecklist));
                        }
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
              
              {activeTool.id === 4 && ( // Password Generator
                <div className="password-generator-tool">
                  <h4>Secure Password Generator</h4>
                  <div className="generated-password">
                    <input
                      type="text"
                      value={generatedPassword}
                      readOnly
                      placeholder="Generated password will appear here"
                      className="password-output"
                    />
                    <button 
                      className="copy-password-btn"
                      onClick={() => copyToClipboard(generatedPassword)}
                      disabled={!generatedPassword}
                    >
                      Copy
                    </button>
                  </div>
                  
                  <div className="generator-options">
                    <div className="option-group">
                      <label>
                        <input
                          type="range"
                          min="8"
                          max="32"
                          value={passwordOptions.length}
                          onChange={(e) => setPasswordOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
                        />
                        <span>Length: {passwordOptions.length} characters</span>
                      </label>
                    </div>
                    
                    <div className="option-checkboxes">
                      <label>
                        <input
                          type="checkbox"
                          checked={passwordOptions.uppercase}
                          onChange={(e) => setPasswordOptions(prev => ({ ...prev, uppercase: e.target.checked }))}
                        />
                        Uppercase (A-Z)
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={passwordOptions.lowercase}
                          onChange={(e) => setPasswordOptions(prev => ({ ...prev, lowercase: e.target.checked }))}
                        />
                        Lowercase (a-z)
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={passwordOptions.numbers}
                          onChange={(e) => setPasswordOptions(prev => ({ ...prev, numbers: e.target.checked }))}
                        />
                        Numbers (0-9)
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={passwordOptions.symbols}
                          onChange={(e) => setPasswordOptions(prev => ({ ...prev, symbols: e.target.checked }))}
                        />
                        Symbols (!@#$%)
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    className="generate-btn"
                    onClick={generatePassword}
                  >
                    Generate Password
                  </button>
                  
                  <div className="password-tips">
                    <h5>Tips for Password Security:</h5>
                    <ul>
                      <li>Use passwords with at least 12 characters</li>
                      <li>Don't reuse passwords across different sites</li>
                      <li>Change passwords every 3-6 months</li>
                      <li>Use a password manager to store passwords securely</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {[5, 6].includes(activeTool.id) && (
                <div className="tool-info">
                  <h4>{activeTool.title}</h4>
                  <p>This tool is running in simulation mode.</p>
                  <p>In a full implementation, this would connect to real security services.</p>
                  <button 
                    className="tool-action-btn"
                    onClick={() => handleToolClick(activeTool)}
                  >
                    Run Tool Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ================= OFFICIAL RESOURCES ================= */}
      <section className="resources-section">
        <div className="section-header">
          <h2>Official & Verified Resources</h2>
          <p className="section-subtitle">
            Direct links to government portals and authorized cybersecurity organizations
          </p>
        </div>

        <div className="official-grid">
          {officialResources.map((resource, i) => (
            <motion.div
              key={i}
              className="official-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="official-header">
                <span className="resource-category">{resource.category}</span>
                <ShieldIcon />
              </div>
              
              <h3>{resource.name}</h3>
              <p className="resource-description">{resource.description}</p>
              
              <div className="official-actions">
                <button 
                  className="official-link"
                  onClick={() => handleExternalLink(resource.url, resource.name)}
                >
                  Visit Resource
                  <ExternalLinkIcon />
                </button>
                <button 
                  className="share-resource-btn"
                  onClick={() => handleShareResource(resource)}
                  title="Share resource"
                >
                  🔗
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="resources-section alt">
        <div className="section-header">
          <h2>Your Achievements</h2>
          <p className="section-subtitle">
            Track your progress and earn rewards for learning about cybersecurity
          </p>
        </div>

        <div className="achievements-grid">
          {userAchievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="achievement-icon">
                {achievement.unlocked ? achievement.icon : "🔒"}
              </div>
              <h4>{achievement.name}</h4>
              <p>{achievement.description}</p>
              <div className="achievement-status">
                {achievement.unlocked ? (
                  <span className="status-unlocked">✅ Unlocked</span>
                ) : (
                  <span className="status-locked">🔒 Locked</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= DOWNLOAD CENTER ================= */}
      <section className="download-center">
        <div className="download-content">
          <div className="download-text">
            <h2>Download Complete Resource Pack</h2>
            <p>
              Get all our safety guides, checklists, and templates in one comprehensive PDF package.
              Perfect for organizations, schools, and community awareness programs.
            </p>
            <div className="download-info">
              <span className="info-item">📚 {allGuides.length}+ Guides</span>
              <span className="info-item">📋 10+ Checklists</span>
              <span className="info-item">🔄 Regular Updates</span>
              <span className="info-item">⭐ +50 Points</span>
            </div>
          </div>
          <div className="download-actions">
            <button 
              className="download-pack-btn"
              onClick={handleDownloadAll}
            >
              <DownloadIcon />
              Download Complete Pack (PDF)
            </button>
            <button 
              className="export-progress-btn"
              onClick={exportProgress}
            >
              📊 Export Progress
            </button>
            <button 
              className="import-progress-btn"
              onClick={importProgress}
            >
              📥 Import Progress
            </button>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <motion.section
        className="resources-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="cta-content">
          <div className="cta-text">
            <h2>Think You've Been Affected by a Cyber Incident?</h2>
            <p>
              Don't wait. Report suspicious activities immediately or track your existing reports.
            </p>
          </div>
          <div className="cta-actions">
            <button 
              className="primary-btn cta-primary"
              onClick={handleReportIncident}
            >
              🚨 Report Incident
            </button>
            <button 
              className="secondary-btn cta-secondary"
              onClick={handleTrackReport}
            >
              📋 Track Report
            </button>
            <button 
              className="support-btn"
              onClick={handleContactSupport}
            >
              💬 Contact Support
            </button>
          </div>
        </div>
      </motion.section>

      {/* ================= FOOTER ================= */}
      <footer className="resources-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <BookIcon />
              <span>Civora Nexus</span>
            </div>
            <p className="footer-description">
              Empowering citizens with verified cybersecurity resources and tools
            </p>
            <div className="footer-progress">
              <div className="progress-item">
                <span className="progress-label">Your Points</span>
                <span className="progress-value">{userProgress.points}</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">Guides Read</span>
                <span className="progress-value">{userProgress.guidesRead}/{allGuides.length}</span>
              </div>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>Resources</h4>
              <a href="#" onClick={() => setSelectedCategory("All")}>All Guides</a>
              <a href="#" onClick={() => setActiveTool(safetyTools[2])}>Safety Tools</a>
              <a href="#" onClick={() => alert("Video tutorials coming soon!")}>Video Tutorials</a>
              <a href="#" onClick={() => alert("Infographics coming soon!")}>Infographics</a>
            </div>
            
            <div className="link-column">
              <h4>Support</h4>
              <a href="#" onClick={handleContactSupport}>Help Center</a>
              <a href="#" onClick={handleContactSupport}>Contact Us</a>
              <a href="#" onClick={() => {
                const feedback = prompt("Please share your feedback:");
                if (feedback) {
                  alert("Thank you for your feedback! +20 points");
                  awardPoints(20);
                }
              }}>Feedback</a>
              <a href="#" onClick={() => alert("Accessibility features enabled")}>Accessibility</a>
            </div>
            
            <div className="link-column">
              <h4>Legal</h4>
              <a href="#" onClick={() => handleExternalLink("#", "Privacy Policy")}>Privacy Policy</a>
              <a href="#" onClick={() => handleExternalLink("#", "Terms of Use")}>Terms of Use</a>
              <a href="#" onClick={() => handleExternalLink("#", "Content Policy")}>Content Policy</a>
              <a href="#" onClick={() => handleExternalLink("#", "Disclaimer")}>Disclaimer</a>
            </div>
            
            <div className="link-column">
              <h4>Quick Actions</h4>
              <a href="#" onClick={handleGoBack}>← Go Back</a>
              <a href="#" onClick={toggleTheme}>
                {theme === "dark" ? "☀️ Switch to Light" : "🌙 Switch to Dark"}
              </a>
              <a href="#" onClick={() => navigate("/")}>🏠 Home</a>
              <a href="#" onClick={() => setShowEmergencyPanel(true)}>🚨 Emergency</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Civora Nexus · Cyber Safety Resources Portal · All rights reserved
          </div>
          <div className="footer-update">
            <span className="update-badge">🔄 Last updated: {new Date().toLocaleDateString('en-IN', { 
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}</span>
            <span className="keyboard-shortcuts">
              <kbd>Esc</kbd> Close · <kbd>Ctrl</kbd> + <kbd>/</kbd> Search · <kbd>Ctrl</kbd> + <kbd>←</kbd> Back
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}