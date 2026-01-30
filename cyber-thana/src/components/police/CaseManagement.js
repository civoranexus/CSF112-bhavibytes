import React, { useState, useMemo } from "react";
import "./CaseManagement.css";

const STATUS_STEPS = [
  { id: 1, name: "Report Submitted", color: "#6366f1" },
  { id: 2, name: "Under Verification", color: "#8b5cf6" },
  { id: 3, name: "Assigned to Cyber Cell", color: "#ec4899" },
  { id: 4, name: "Investigation in Progress", color: "#f59e0b" },
  { id: 5, name: "Resolved", color: "#10b981" },
];

const INCIDENT_TYPES = [
  "Phishing / Social Engineering",
  "Financial Fraud",
  "Data Breach",
  "Account Compromise",
  "Ransomware / Malware",
];

const MOCK_CASES = [
  { id: "CTN-2026-847392", type: "Phishing / Social Engineering", statusIndex: 2, date: "14 Jan 2026", reporterMode: "Registered", assignedOfficer: "OFC-002" },
  { id: "CTN-2026-562891", type: "Financial Fraud", statusIndex: 3, date: "12 Jan 2026", reporterMode: "Anonymous", assignedOfficer: "OFC-001" },
  { id: "CTN-2026-934215", type: "Data Breach", statusIndex: 4, date: "10 Jan 2026", reporterMode: "Registered", assignedOfficer: "OFC-003" },
  { id: "CTN-2026-123456", type: "Account Compromise", statusIndex: 4, date: "08 Jan 2026", reporterMode: "Registered", assignedOfficer: "—" },
  { id: "CTN-2026-445221", type: "Ransomware / Malware", statusIndex: 1, date: "16 Jan 2026", reporterMode: "Anonymous", assignedOfficer: "—" },
  { id: "CTN-2026-778901", type: "Phishing / Social Engineering", statusIndex: 5, date: "05 Jan 2026", reporterMode: "Registered", assignedOfficer: "OFC-002" },
];

export default function CaseManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);

  const filteredCases = useMemo(() => {
    return MOCK_CASES.filter((c) => {
      const matchSearch = !search || c.id.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || c.statusIndex === Number(statusFilter);
      const matchType = !typeFilter || c.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [search, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const total = MOCK_CASES.length;
    const open = MOCK_CASES.filter((c) => c.statusIndex <= 2).length;
    const inProgress = MOCK_CASES.filter((c) => c.statusIndex === 3 || c.statusIndex === 4).length;
    const resolved = MOCK_CASES.filter((c) => c.statusIndex === 5).length;
    return { total, open, inProgress, resolved };
  }, []);

  const getStatusInfo = (statusIndex) => STATUS_STEPS.find((s) => s.id === statusIndex + 1) || STATUS_STEPS[0];

  return (
    <div className="case-management" role="main" aria-label="Case Management">
      <header className="case-mgmt-header">
        <h1 className="case-mgmt-title">Case Management</h1>
        <p className="case-mgmt-subtitle">
          View, filter, and update cyber incident reports. All actions are logged.
        </p>
      </header>

      <section className="case-mgmt-stats" aria-label="Case statistics">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Cases</span>
        </div>
        <div className="stat-card stat-open">
          <span className="stat-value">{stats.open}</span>
          <span className="stat-label">Open</span>
        </div>
        <div className="stat-card stat-progress">
          <span className="stat-value">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card stat-resolved">
          <span className="stat-value">{stats.resolved}</span>
          <span className="stat-label">Resolved</span>
        </div>
      </section>

      <section className="case-mgmt-toolbar">
        <div className="toolbar-search">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            placeholder="Search by Case ID or incident type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="case-search-input"
            aria-label="Search cases"
          />
        </div>
        <div className="toolbar-filters">
          <label className="filter-label" htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="case-filter-select"
            aria-label="Filter by status"
          >
            <option value="">All</option>
            {STATUS_STEPS.map((s, i) => (
              <option key={s.id} value={i}>{s.name}</option>
            ))}
          </select>
          <label className="filter-label" htmlFor="type-filter">Type</label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="case-filter-select"
            aria-label="Filter by incident type"
          >
            <option value="">All</option>
            {INCIDENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="case-mgmt-table-wrap" aria-label="Cases list">
        <div className="table-scroll">
          <table className="case-table" role="table">
            <thead>
              <tr>
                <th scope="col">Case ID</th>
                <th scope="col">Incident Type</th>
                <th scope="col">Status</th>
                <th scope="col">Submitted</th>
                <th scope="col">Reporter</th>
                <th scope="col">Assigned To</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="table-empty">
                    No cases match your filters.
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => {
                  const statusInfo = getStatusInfo(c.statusIndex);
                  return (
                    <tr key={c.id}>
                      <td>
                        <code className="case-id-cell">{c.id}</code>
                      </td>
                      <td>{c.type}</td>
                      <td>
                        <span
                          className="case-status-badge"
                          style={{ backgroundColor: statusInfo.color }}
                          role="status"
                        >
                          {statusInfo.name}
                        </span>
                      </td>
                      <td>{c.date}</td>
                      <td>{c.reporterMode}</td>
                      <td>{c.assignedOfficer}</td>
                      <td>
                        <div className="case-actions">
                          <button
                            type="button"
                            className="btn-case btn-view"
                            onClick={() => setSelectedCase(c)}
                            aria-label={`View case ${c.id}`}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn-case btn-update"
                            aria-label={`Update status for case ${c.id}`}
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {filteredCases.length > 0 && (
          <p className="table-count" role="status">
            Showing {filteredCases.length} of {MOCK_CASES.length} cases
          </p>
        )}
      </section>

      {selectedCase && (
        <div
          className="case-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
          onClick={() => setSelectedCase(null)}
        >
          <div className="case-modal" onClick={(e) => e.stopPropagation()}>
            <div className="case-modal-header">
              <h2 id="case-modal-title">Case {selectedCase.id}</h2>
              <button
                type="button"
                className="case-modal-close"
                onClick={() => setSelectedCase(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="case-modal-body">
              <dl className="case-detail-list">
                <div className="case-detail-row">
                  <dt>Case ID</dt>
                  <dd><code>{selectedCase.id}</code></dd>
                </div>
                <div className="case-detail-row">
                  <dt>Incident Type</dt>
                  <dd>{selectedCase.type}</dd>
                </div>
                <div className="case-detail-row">
                  <dt>Status</dt>
                  <dd>
                    <span
                      className="case-status-badge"
                      style={{ backgroundColor: getStatusInfo(selectedCase.statusIndex).color }}
                    >
                      {getStatusInfo(selectedCase.statusIndex).name}
                    </span>
                  </dd>
                </div>
                <div className="case-detail-row">
                  <dt>Submitted</dt>
                  <dd>{selectedCase.date}</dd>
                </div>
                <div className="case-detail-row">
                  <dt>Reporter Mode</dt>
                  <dd>{selectedCase.reporterMode}</dd>
                </div>
                <div className="case-detail-row">
                  <dt>Assigned To</dt>
                  <dd>{selectedCase.assignedOfficer}</dd>
                </div>
              </dl>
            </div>
            <div className="case-modal-footer">
              <button type="button" className="btn-case btn-update" onClick={() => setSelectedCase(null)}>
                Update Status
              </button>
              <button type="button" className="btn-case btn-secondary" onClick={() => setSelectedCase(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
