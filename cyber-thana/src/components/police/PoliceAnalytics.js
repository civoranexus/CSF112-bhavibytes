import React, { useState, useEffect } from 'react';
import { policeAPI } from '../../services/api';
import './PoliceAnalytics.css';

const PoliceAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedChart, setSelectedChart] = useState('overview');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await policeAPI.getAnalytics({ timeRange });
      setAnalyticsData(response.data);
    } catch (error) {
      setError(error.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const renderOverviewCards = () => {
    if (!analyticsData) return null;

    const cards = [
      {
        title: 'Total Cases',
        value: analyticsData.totalCases || 0,
        change: '+12%',
        trend: 'up',
        icon: '📁',
        color: 'blue'
      },
      {
        title: 'Resolved Cases',
        value: analyticsData.resolvedCases || 0,
        change: '+8%',
        trend: 'up',
        icon: '✅',
        color: 'green'
      },
      {
        title: 'Pending Cases',
        value: analyticsData.pendingCases || 0,
        change: '-5%',
        trend: 'down',
        icon: '⏳',
        color: 'orange'
      },
      {
        title: 'Resolution Rate',
        value: `${analyticsData.resolutionRate || 0}%`,
        change: '+3%',
        trend: 'up',
        icon: '📊',
        color: 'purple'
      }
    ];

    return (
      <div className="analytics-cards">
        {cards.map((card, index) => (
          <div key={index} className={`analytics-card ${card.color}`}>
            <div className="card-icon">{card.icon}</div>
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <div className="card-value">{card.value}</div>
              <div className={`card-change ${card.trend}`}>
                {card.change} from last month
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCaseTypeChart = () => {
    if (!analyticsData?.casesByType) return null;

    const data = analyticsData.casesByType;
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);

    return (
      <div className="chart-container">
        <h3>Cases by Type</h3>
        <div className="bar-chart">
          {Object.entries(data).map(([type, count]) => (
            <div key={type} className="bar-item">
              <div className="bar-label">{type}</div>
              <div className="bar-wrapper">
                <div 
                  className="bar-fill" 
                  style={{ width: `${(count / total) * 100}%` }}
                ></div>
              </div>
              <div className="bar-value">{count}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStatusChart = () => {
    if (!analyticsData?.casesByStatus) return null;

    const statusColors = {
      'Report Submitted': '#6366f1',
      'Under Verification': '#8b5cf6',
      'Assigned to Cyber Cell': '#ec4899',
      'Investigation in Progress': '#f59e0b',
      'Resolved': '#10b981'
    };

    return (
      <div className="chart-container">
        <h3>Cases by Status</h3>
        <div className="status-chart">
          {Object.entries(analyticsData.casesByStatus).map(([status, count]) => (
            <div key={status} className="status-item">
              <div className="status-color" style={{ backgroundColor: statusColors[status] }}></div>
              <div className="status-info">
                <div className="status-label">{status}</div>
                <div className="status-count">{count} cases</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTrendChart = () => {
    if (!analyticsData?.monthlyTrends) return null;

    return (
      <div className="chart-container">
        <h3>Monthly Trends</h3>
        <div className="trend-chart">
          <div className="trend-grid">
            {analyticsData.monthlyTrends.map((month, index) => (
              <div key={index} className="trend-item">
                <div className="trend-bar" style={{ height: `${(month.cases / 30) * 100}%` }}></div>
                <div className="trend-label">{month.month}</div>
                <div className="trend-value">{month.cases}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPerformanceMetrics = () => {
    const metrics = [
      { label: 'Average Resolution Time', value: '4.2 days', target: '3 days' },
      { label: 'Case Assignment Rate', value: '95%', target: '90%' },
      { label: 'Evidence Processing Time', value: '1.8 days', target: '2 days' },
      { label: 'Victim Satisfaction', value: '4.6/5', target: '4.0/5' }
    ];

    return (
      <div className="chart-container">
        <h3>Performance Metrics</h3>
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-item">
              <div className="metric-header">
                <span className="metric-label">{metric.label}</span>
                <span className="metric-value">{metric.value}</span>
              </div>
              <div className="metric-progress">
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <span className="metric-target">Target: {metric.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="police-analytics">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="police-analytics">
        <div className="error-message">{error}</div>
        <button onClick={fetchAnalytics} className="retry-button">Retry</button>
      </div>
    );
  }

  return (
    <div className="police-analytics">
      <header className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p>Comprehensive insights into cybercrime trends and performance metrics</p>
        
        <div className="analytics-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-selector"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          
          <button onClick={fetchAnalytics} className="refresh-button">
            🔄 Refresh
          </button>
        </div>
      </header>

      <section className="analytics-overview">
        {renderOverviewCards()}
      </section>

      <section className="analytics-charts">
        <div className="charts-grid">
          {renderCaseTypeChart()}
          {renderStatusChart()}
        </div>
        
        <div className="charts-full-width">
          {renderTrendChart()}
        </div>
        
        <div className="charts-grid">
          {renderPerformanceMetrics()}
        </div>
      </section>

      <section className="analytics-insights">
        <h2>Key Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">📈</div>
            <h3>Rising Trend</h3>
            <p>Phishing cases have increased by 25% this quarter. Consider awareness campaigns.</p>
          </div>
          <div className="insight-card">
            <div className="insight-icon">⚡</div>
            <h3>Fast Resolution</h3>
            <p>Average resolution time improved by 15% due to streamlined processes.</p>
          </div>
          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <h3>High Priority</h3>
            <p>Financial fraud cases require immediate attention - 40% increase reported.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoliceAnalytics;
