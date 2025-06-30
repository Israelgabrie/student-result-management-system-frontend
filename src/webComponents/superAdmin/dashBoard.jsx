import { useNavigate, useOutletContext } from "react-router-dom";
import "../../superAdminCss/dashboard.css";
import React, { useState, useEffect } from "react";

export default function SuperAdminDashboard() {
  // Sample data for department results
  const departmentResults = [
    { name: "Computer Science", uploaded: 420, approved: 380 },
    { name: "Engineering", uploaded: 380, approved: 350 },
    { name: "Medicine", uploaded: 310, approved: 290 },
    { name: "Business", uploaded: 280, approved: 260 },
    { name: "Arts", uploaded: 210, approved: 190 },
  ];

  // Get data from context with safe access
  const { dashBoardData } = useOutletContext() || {};
  const navigate = useNavigate();

  useEffect(() => {
    console.log(dashBoardData?.departmentBreakdown);
  }, [dashBoardData]);

  // Calculate percentages for pie chart with safe access
  const totalResults = dashBoardData?.stats?.results?.total || 0;
  const approvedResults = dashBoardData?.stats?.results?.approved || 0;
  const pendingResults = dashBoardData?.stats?.results?.pending || 0;

  // Calculate percentages safely
  const approvedPercentage = totalResults
    ? Math.round((approvedResults / totalResults) * 100)
    : 0;
  const pendingPercentage = totalResults
    ? Math.round((pendingResults / totalResults) * 100)
    : 0;
  const notCompletePercentage = 100 - approvedPercentage - pendingPercentage;

  // useEffect(() => {
  //   console.log(approvedPercentage, pendingPercentage, notCompletePercentage);
  // }, [approvedPercentage, pendingPercentage, notCompletePercentage]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Super Admin Dashboard</h1>
        <div className="semester-badge">
          {dashBoardData?.stats?.semester || "Current"} Semester •{" "}
          {dashBoardData?.stats?.session || "2024/2025"}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon student-icon">👨‍🎓</div>
          <div className="stat-content">
            <h3>Students</h3>
            <div className="stat-value">
              {dashBoardData?.stats?.students?.toLocaleString() || "0"}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon lecturer-icon">👨‍🏫</div>
          <div className="stat-content">
            <h3>Lecturers</h3>
            <div className="stat-value">
              {dashBoardData?.stats?.admins?.toLocaleString() || "0"}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon course-icon">📚</div>
          <div className="stat-content">
            <h3>Courses</h3>
            <div className="stat-value">
              {dashBoardData?.stats?.courses?.toLocaleString() || "0"}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon result-icon">📝</div>
          <div className="stat-content">
            <h3>Results</h3>
            <div className="stat-value">
              {dashBoardData?.stats?.results?.total?.toLocaleString() || "0"}
            </div>
            <div className="stat-breakdown">
              <span className="approved">
                {dashBoardData?.stats?.results?.approved?.toLocaleString() ||
                  "0"}{" "}
                approved
              </span>{" "}
              •
              <span className="pending">
                {dashBoardData?.stats?.results?.pending?.toLocaleString() ||
                  "0"}{" "}
                pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Results by Department</h3>
          <div className="bar-chart-container">
            {dashBoardData?.departmentBreakdown?.map((dept, index) => (
              <div className="bar-chart-item" key={index}>
                <div className="bar-chart-label">{dept?.department}</div>
                <div className="bar-chart-bars">
                  <div
                    className="bar-chart-bar uploaded"
                    style={{ width: `${(dept?.totalResults / 500) * 100}%` }}
                    title={`Total: ${dept?.department}`}
                  ></div>
                  <div
                    className="bar-chart-bar approved"
                    style={{ width: `${(dept?.approvedResults / 500) * 100}%` }}
                    title={`Approved: ${dept?.approved}`}
                  ></div>
                </div>
                <div className="bar-chart-values">
                  <span>{dept?.totalResults}</span>
                  <span>{dept?.approvedResults}</span>
                </div>
              </div>
            ))}
            <div className="bar-chart-legend">
              <div className="legend-item">
                <div className="legend-color uploaded"></div>
                <div>Total</div>
              </div>
              <div className="legend-item">
                <div className="legend-color approved"></div>
                <div>Approved</div>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Results Status</h3>
          <div className="pie-chart-container">
            {/* Simplified pie chart implementation */}
            <div className="pie-chart">
              <svg viewBox="0 0 100 100" className="pie-svg">
                {/* Background circle */}
                <circle cx="50" cy="50" r="50" fill="#f8f9fa" />

                {/* Pie chart slices */}
                {(() => {
                  const radius = 40;
                  const circumference = 2 * Math.PI * radius;

                  const approved = (approvedPercentage / 100) * circumference;
                  const pending = (pendingPercentage / 100) * circumference;
                  const notComplete =
                    (notCompletePercentage / 100) * circumference;

                  return (
                    <>
                      {/* Approved slice */}
                      {approvedPercentage > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke="#51cf66"
                          strokeWidth="40"
                          strokeDasharray={`${approved} ${
                            circumference - approved
                          }`}
                          strokeDashoffset={0}
                          transform="rotate(-90 50 50)"
                        />
                      )}

                      {/* Pending slice */}
                      {pendingPercentage > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke="#ffd43b"
                          strokeWidth="40"
                          strokeDasharray={`${pending} ${
                            circumference - pending
                          }`}
                          strokeDashoffset={-approved}
                          transform="rotate(-90 50 50)"
                        />
                      )}

                      {/* Not Complete slice */}
                      {notCompletePercentage > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke="#ff6b6b"
                          strokeWidth="40"
                          strokeDasharray={`${notComplete} ${
                            circumference - notComplete
                          }`}
                          strokeDashoffset={-(approved + pending)}
                          transform="rotate(-90 50 50)"
                        />
                      )}
                    </>
                  );
                })()}

                {/* Center white circle */}
                <circle cx="50" cy="50" r="25" fill="white" />
              </svg>

              <div className="pie-center">
                <div className="pie-total">{totalResults}</div>
                <div className="pie-label">Results</div>
              </div>
            </div>

            <div className="pie-legend">
              <div className="legend-item">
                <div className="legend-color approved"></div>
                <div>Approved ({approvedPercentage}%)</div>
              </div>
              <div className="legend-item">
                <div className="legend-color pending"></div>
                <div>Pending ({pendingPercentage}%)</div>
              </div>
              <div className="legend-item">
                <div className="legend-color rejected"></div>
                <div>Not Complete ({notCompletePercentage}%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="activity-grid">
        <div className="activity-card">
          <div className="activity-header">
            <h3>Recent Results</h3>
            <button
              className="view-all-btn"
              onClick={() => {
                navigate("/superAdmin/manageResults");
              }}
            >
              View All
            </button>
          </div>
          <div className="table-container">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Lecturer</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashBoardData?.recentResults?.length > 0 ? (
                  dashBoardData?.recentResults?.map((result) => (
                    <tr key={result.id}>
                      <td>{result.student}</td>
                      <td>{result.courseCode}</td>
                      <td>{result.lecturer}</td>
                      <td>{new Date(result.date).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`status-badge ${result.status?.toLowerCase()}`}
                        >
                          {result.status.charAt(0).toUpperCase() +
                            result.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No recent results available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="activity-card">
          <div className="activity-header">
            <h3>Recent Privilege Requests</h3>
            <button
              className="view-all-btn"
              onClick={() => {
                navigate("/superAdmin/approveRequest");
              }}
            >
              View All
            </button>
          </div>
          <div className="table-container">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Lecturer</th>
                  <th>Course</th>
                  <th>ID Number</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashBoardData?.recentRequests?.length > 0 ? (
                  dashBoardData.recentRequests.map((request) => (
                    <tr key={request?.id}>
                      <td>{request?.lecturer}</td>
                      <td>{request?.courseCode}</td>
                      <td>{request?.idNumber}</td>
                      <td>{new Date(request?.date)?.toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`status-badge ${request?.status?.toLowerCase()}`}
                        >
                          {request?.status?.charAt(0).toUpperCase() +
                            request?.status?.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No recent requests available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button
            className="action-button approve-results"
            onClick={() => {
              navigate("/superAdmin/manageResults");
            }}
          >
            <span className="action-icon">✓</span>
            <span>Approve Results</span>
          </button>
          <button
            className="action-button manage-users"
            onClick={() => {
              navigate("/superAdmin/manageAdmin");
            }}
          >
            <span className="action-icon">👥</span>
            <span>Manage Users</span>
          </button>
          <button
            className="action-button add-course"
            onClick={() => {
              navigate("/superAdmin/manageCourses");
            }}
          >
            {" "}
            <span className="action-icon">📚</span>
            <span>Add Course</span>
          </button>
          <button
            className="action-button view-reports"
            onClick={() => {
              navigate("/superAdmin/complaint");
            }}
          >
            <span className="action-icon">📊</span>
            <span>View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}
