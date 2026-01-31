import React, { useState, useEffect, useMemo } from "react";
import { caseAPI } from "../../services/api";
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

export default function CaseManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [cases, setCases] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch cases from API
  const fetchCases = async () => {
    try {
      setLoading(true);
      const params = {
        search: search || undefined,
        status: statusFilter || undefined,
        incidentType: typeFilter || undefined,
      };

      const response = await caseAPI.getCases(params);
      setCases(response.data.cases);
      setStats(response.data.stats);
    } catch (error) {
      setError(error.message || "Failed to fetch cases");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and when filters change
  useEffect(() => {
    fetchCases();
  }, [search, statusFilter, typeFilter]);

  // Filter cases client-side (as backup)
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchSearch = !search ||
        c.caseId.toLowerCase().includes(search.toLowerCase()) ||
        c.incidentType.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || c.status === statusFilter;
      const matchType = !typeFilter || c.incidentType === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [cases, search, statusFilter, typeFilter]);

  const getStatusInfo = (status) => {
    return STATUS_STEPS.find((s) => s.name === status) || STATUS_STEPS[0];
  };

  const handleUpdateStatus = async (caseId, newStatus) => {
    try {
      await caseAPI.updateCaseStatus(caseId, { status: newStatus });
      await fetchCases(); // Refresh cases
      setSelectedCase(null);
    } catch (error) {
      setError(error.message || "Failed to update case status");
    }
  };

  const handleAssignCase = async (caseId, officerId) => {
    try {
      await caseAPI.assignCase(caseId, { officerId });
      await fetchCases(); // Refresh cases
    } catch (error) {
      setError(error.message || "Failed to assign case");
    }
  };

  if (loading) {
    return (
      <div className="case-management">
        <div className="loading">Loading cases...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="case-management">
        <div className="error-message">{error}</div>
        <button onClick={fetchCases} className="retry-button">Retry</button>
      </div>
    );
  }

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
            {STATUS_STEPS.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
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
                  const statusInfo = getStatusInfo(c.status);
                  return (
                    <tr key={c._id}>
                      <td>
                        <code className="case-id-cell">{c.caseId}</code>
                      </td>
                      <td>{c.incidentType}</td>
                      <td>
                        <span
                          className="case-status-badge"
                          style={{ backgroundColor: statusInfo.color }}
                          role="status"
                        >
                          {c.status}
                        </span>
                      </td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td>{c.reporterType}</td>
                      <td>
                        {c.assignedOfficer ?
                          `${c.assignedOfficer.badgeId} - ${c.assignedOfficer.firstName} ${c.assignedOfficer.lastName}` :
                          "—"}
                      </td>
                      <td>
                        <div className="case-actions">
                          <button
                            type="button"
                            className="btn-case btn-view"
                            onClick={() => setSelectedCase(c)}
                            aria-label={`View case ${c.caseId}`}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn-case btn-update"
                            onClick={() => handleUpdateStatus(c._id, "Under Verification")}
                            aria-label={`Update status for case ${c.caseId}`}
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
            Showing {filteredCases.length} of {cases.length} cases
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
              <h2 id="case-modal-title">Case {selectedCase.caseId}</h2>
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
                  <dd><code>{selectedCase.caseId}</code></dd>
                </div>
                <div className="case-detail-row">
                  <dt>Incident Type</dt>
                  <dd>{selectedCase.incidentType}</dd>
                </div>
                <div className="case-detail-row">
                  <dt>Status</dt>
                  <dd>
                    <span
                      className="case-status-badge"
                      style={{ backgroundColor: getStatusInfo(selectedCase.status).color }}
                    >
                      {selectedCase.status}
                    </span>
                  </dd>
                </div>
                <div className="case-detail-row">
                  <dt>Submitted</dt>
                  <dd>{new Date(selectedCase.createdAt).toLocaleDateString()}</dd>
                </div>
                <div className="case-detail-row">
                  <dt>Reporter Mode</dt>
                  <dd>{selectedCase.reporterType}</dd>
                </div>
                <div className="case-detail-row">
                  <dt>Assigned To</dt>
                  <dd>
                    {selectedCase.assignedOfficer ?
                      `${selectedCase.assignedOfficer.badgeId} - ${selectedCase.assignedOfficer.firstName} ${selectedCase.assignedOfficer.lastName}` :
                      "—"}
                  </dd>
                </div>
                <div className="case-detail-row">
                  <dt>Description</dt>
                  <dd>{selectedCase.incidentDetails?.description || "No description available"}</dd>
                </div>
              </dl>
            </div>
            <div className="case-modal-footer">
              <button
                type="button"
                className="btn-case btn-update"
                onClick={() => handleUpdateStatus(selectedCase._id, "Investigation in Progress")}
              >
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
