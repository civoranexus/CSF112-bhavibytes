import React from "react";
import "./MyComplaints.css";

const MyComplaints = () => {
  // Dummy data for now (later replace with Firebase data)
  const complaints = [
    {
      id: "CR-1023",
      type: "Online Fraud",
      date: "12 Sep 2025",
      status: "Under Review"
    },
    {
      id: "CR-0987",
      type: "Social Media Abuse",
      date: "28 Aug 2025",
      status: "Resolved"
    }
  ];

  return (
    <div className="myComplaints">
      <h2>My Complaints</h2>
      <p className="subtitle">
        Track the status of cyber complaints you have filed
      </p>

      {complaints.length === 0 ? (
        <div className="emptyState">
          <p>No complaints filed yet.</p>
        </div>
      ) : (
        <div className="complaintsTable">
          <div className="tableHeader">
            <span>Complaint ID</span>
            <span>Type</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {complaints.map((item) => (
            <div className="tableRow" key={item.id}>
              <span>{item.id}</span>
              <span>{item.type}</span>
              <span>{item.date}</span>
              <span className={`status ${item.status.replace(" ", "")}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComplaints;
