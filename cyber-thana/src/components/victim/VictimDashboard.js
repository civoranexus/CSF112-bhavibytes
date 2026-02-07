import React from 'react';
import './VictimDashboard.css';

const VictimDashboard = () => {
  const userName = 'Victim User'; // later replace with Firebase auth user

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">Cyber Rakshak</h2>

        <nav className="nav">
          <button className="navItem active">Dashboard</button>
          <button className="navItem">Report Incident</button>
          <button className="navItem">My Complaints</button>
          <button className="navItem">Awareness</button>
          <button className="navItem logout">Logout</button>
        </nav>
      </aside>

      <main className="main">
        <header className="header">
          <h1>Welcome, {userName}</h1>
          <p>Stay protected. Report cyber crimes instantly.</p>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Report Cyber Crime</h3>
            <p>File a new cyber incident securely.</p>
            <button>Report Now</button>
          </div>

          <div className="card">
            <h3>My Reports</h3>
            <p>Track status of your complaints.</p>
            <button>View Reports</button>
          </div>

          <div className="card">
            <h3>Cyber Awareness</h3>
            <p>Learn about latest cyber frauds.</p>
            <button>Learn More</button>
          </div>
        </section>

        <section className="status">
          <h2>Quick Status</h2>

          <div className="statusGrid">
            <div className="statusBox">
              <span className="number">3</span>
              <span className="label">Reports Filed</span>
            </div>

            <div className="statusBox">
              <span className="number">1</span>
              <span className="label">Under Review</span>
            </div>

            <div className="statusBox">
              <span className="number">2</span>
              <span className="label">Resolved</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VictimDashboard;
