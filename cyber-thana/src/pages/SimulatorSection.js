import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/simulator.css";

const INCIDENTS = {
  phishing: {
    title: "Phishing Attack",
    questions: [
      "Did the message ask for personal or banking details?",
      "Was the sender unknown or suspicious?",
      "Did it create urgency or fear?",
    ],
    risk: 30,
  },
  otp: {
    title: "OTP Fraud",
    questions: [
      "Did someone ask for your OTP?",
      "Was the request made via call or message?",
      "Did you share the OTP?",
    ],
    risk: 40,
  },
  fake: {
    title: "Fake Website",
    questions: [
      "Did the website look like a real brand?",
      "Was the URL slightly misspelled?",
      "Did you enter login or card details?",
    ],
    risk: 35,
  },
};

export default function SimulatorSection() {
  const [type, setType] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (yes) => {
    setAnswers([...answers, yes]);
  };

  const calculateRisk = () => {
    const base = INCIDENTS[type].risk;
    const yesCount = answers.filter(Boolean).length;
    const score = Math.min(100, base + yesCount * 20);

    setResult(score);
  };

  const reset = () => {
    setType(null);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section className="simulator-section">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Cyber Incident Risk Simulator
      </motion.h2>

      <p className="sim-desc">
        Understand your risk level instantly through a guided cyber incident
        simulation.
      </p>

      {/* INCIDENT SELECT */}
      {!type && (
        <div className="incident-grid">
          {Object.keys(INCIDENTS).map((key) => (
            <motion.div
              key={key}
              className="incident-card"
              whileHover={{ y: -6 }}
              onClick={() => setType(key)}
            >
              <h3>{INCIDENTS[key].title}</h3>
              <p>Start simulation →</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* QUESTIONS */}
      {type && !result && (
        <AnimatePresence>
          <motion.div
            className="question-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>
              Question {answers.length + 1} of{" "}
              {INCIDENTS[type].questions.length}
            </h3>

            <p className="question-text">
              {INCIDENTS[type].questions[answers.length]}
            </p>

            <div className="btn-group">
              <button onClick={() => handleAnswer(true)}>Yes</button>
              <button onClick={() => handleAnswer(false)}>No</button>
            </div>

            {answers.length + 1 === INCIDENTS[type].questions.length && (
              <button className="primary" onClick={calculateRisk}>
                See Result
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* RESULT */}
      {result !== null && (
        <motion.div
          className="result-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3>Risk Assessment Result</h3>

          <div className="risk-score">{result}% Risk</div>

          <p>
            {result >= 70
              ? "High risk detected. Immediate action is recommended."
              : result >= 40
              ? "Moderate risk. Stay alert and follow precautions."
              : "Low risk. No immediate threat detected."}
          </p>

          <ul>
            <li>Do not share OTPs or passwords</li>
            <li>Verify URLs carefully</li>
            <li>Report incidents immediately</li>
          </ul>

          <button className="secondary" onClick={reset}>
            Run Another Simulation
          </button>
        </motion.div>
      )}
    </section>
  );
}
