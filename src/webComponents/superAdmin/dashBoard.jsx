import React, { useEffect } from "react";
import "../../superAdminCss/dashboard.css";
import { useOutletContext } from "react-router-dom";

export default function SuperAdminDashboard() {
  const { dashBoardData, setDashBoardData } = useOutletContext();

  useEffect(() => {
    console.log(dashBoardData);
  }, [dashBoardData]);

  useEffect;
  // Sample data - would be replaced with real data
  const stats = {
    students: 12458,
    lecturers: 843,
    courses: 356,
    results: {
      total: 2845,
      pending: 124,
      approved: 2612,
      rejected: 109,
    },
    requests: {
      total: 78,
      pending: 23,
      approved: 55,
    },
    semester: "Second Semester",
    session: "2023/2024",
  };

  // Sample data for department results
  const departmentResults = [
    { name: "Computer Science", uploaded: 420, approved: 380 },
    { name: "Engineering", uploaded: 380, approved: 350 },
    { name: "Medicine", uploaded: 310, approved: 290 },
    { name: "Business", uploaded: 280, approved: 260 },
    { name: "Arts", uploaded: 210, approved: 190 },
  ];

  // Sample data for recent results
  const recentResults = [
    {
      id: 1,
      student: "John Smith",
      course: "CSC 401",
      lecturer: "Dr. Johnson",
      status: "approved",
      date: "2023-05-10",
    },
    {
      id: 2,
      student: "Emily Brown",
      course: "MTH 301",
      lecturer: "Prof. Williams",
      status: "pending",
      date: "2023-05-09",
    },
    {
      id: 3,
      student: "Michael Davis",
      course: "PHY 202",
      lecturer: "Dr. Miller",
      status: "approved",
      date: "2023-05-08",
    },
    {
      id: 4,
      student: "Sarah Wilson",
      course: "BIO 101",
      lecturer: "Dr. Taylor",
      status: "rejected",
      date: "2023-05-07",
    },
    {
      id: 5,
      student: "David Martinez",
      course: "CHM 202",
      lecturer: "Prof. Anderson",
      status: "approved",
      date: "2023-05-06",
    },
  ];

  // Sample data for recent privilege requests
  const recentRequests = [
    {
      id: 1,
      lecturer: "Dr. Johnson",
      course: "CSC 401",
      department: "Computer Science",
      status: "approved",
      date: "2023-05-10",
    },
    {
      id: 2,
      lecturer: "Prof. Williams",
      course: "MTH 301",
      department: "Mathematics",
      status: "pending",
      date: "2023-05-09",
    },
    {
      id: 3,
      lecturer: "Dr. Miller",
      course: "PHY 202",
      department: "Physics",
      status: "pending",
      date: "2023-05-08",
    },
    {
      id: 4,
      lecturer: "Dr. Taylor",
      course: "BIO 101",
      department: "Biology",
      status: "approved",
      date: "2023-05-07",
    },
  ];

  // Calculate percentages for pie chart
  const totalResults =
    stats.results.approved + stats.results.pending + stats.results.rejected;
  const approvedPercentage = Math.round(
    (stats.results.approved / totalResults) * 100
  );
  const pendingPercentage = Math.round(
    (stats.results.pending / totalResults) * 100
  );
  const rejectedPercentage = Math.round(
    (stats.results.rejected / totalResults) * 100
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Super Admin Dashboard</h1>
        <div className="semester-badge">
          {dashBoardData?.stats?.semester || 0} Semester •{" "}
          {dashBoardData?.stats?.session || 0}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon student-icon">👨‍🎓</div>
          <div className="stat-content">
            <h3>Students</h3>
            <div className="stat-value">
              {dashBoardData?.stats?.students || "0"}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon lecturer-icon">👨‍🏫</div>
          <div className="stat-content">
            <h3>Lecturers</h3>
            <div className="stat-value">
              {dashBoardData?.stats?.admins || "0"}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon course-icon">📚</div>
          <div className="stat-content">
            <h3>Courses</h3>
            <div className="stat-value">
              {dashBoardData?.stats?.courses || "0"}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon result-icon">📝</div>
          <div className="stat-content">
            <h3>Results</h3>
            <div className="stat-value">
              {dashBoardData?.stats?.results?.total || "0"}
            </div>
            <div className="stat-breakdown">
              <span className="approved">
                {dashBoardData?.stats?.results?.approved || "0"} approved
              </span>{" "}
              •
              <span className="pending">
                {dashBoardData?.stats?.results?.pending || "0"} pending
              </span>{" "}
              •
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Results by Department</h3>
          <div className="bar-chart-container">
            {departmentResults.map((dept, index) => (
              <div className="bar-chart-item" key={index}>
                <div className="bar-chart-label">{dept.name}</div>
                <div className="bar-chart-bars">
                  <div
                    className="bar-chart-bar uploaded"
                    style={{ width: `${(dept.uploaded / 500) * 100}%` }}
                    title={`Uploaded: ${dept.uploaded}`}
                  ></div>
                  <div
                    className="bar-chart-bar approved"
                    style={{ width: `${(dept.approved / 500) * 100}%` }}
                    title={`Approved: ${dept.approved}`}
                  ></div>
                </div>
                <div className="bar-chart-values">
                  <span>{dept.uploaded}</span>
                  <span>{dept.approved}</span>
                </div>
              </div>
            ))}
            <div className="bar-chart-legend">
              <div className="legend-item">
                <div className="legend-color uploaded"></div>
                <div>Uploaded</div>
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
            <div className="pie-chart">
              <div
                className="pie-slice approved-slice"
                style={{
                  transform: `rotate(0deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${
                    approvedPercentage > 50
                      ? "100% 0%, 100% 100%, 0% 100%, 0% 0%"
                      : "100% 0%"
                  }, ${
                    approvedPercentage > 75
                      ? "0% 0%, 50% 0%"
                      : approvedPercentage > 50
                      ? "50% 100%, 50% 0%"
                      : "50% 50%"
                  })`,
                }}
              ></div>
              <div
                className="pie-slice pending-slice"
                style={{
                  transform: `rotate(${approvedPercentage * 3.6}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${
                    pendingPercentage > 50
                      ? "100% 0%, 100% 100%, 0% 100%, 0% 0%"
                      : "100% 0%"
                  }, 50% 0%)`,
                }}
              ></div>
              <div
                className="pie-slice rejected-slice"
                style={{
                  transform: `rotate(${
                    (approvedPercentage + pendingPercentage) * 3.6
                  }deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${
                    rejectedPercentage > 50
                      ? "100% 0%, 100% 100%, 0% 100%, 0% 0%"
                      : "100% 0%"
                  }, 50% 0%)`,
                }}
              ></div>
              <div className="pie-center">
                <div className="pie-total">{totalResults}</div>
                <div className="pie-label">Results</div>
              </div>
            </div>
            <div className="pie-legend">
              <div className="legend-item">
                <div className="legend-color approved"></div>
                <div>
                  Approved (
                  {(dashBoardData?.stats?.results?.approved /
                    dashBoardData?.stats?.results?.total) *
                    100 || "0"}
                  %)
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-color pending"></div>
                <div>
                  Pending (
                  {(dashBoardData?.stats?.results?.pending /
                    dashBoardData?.stats?.results?.total) *
                    100 || "0"}
                  %)
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-color rejected"></div>
                <div>
                  Not Complete
                  <div>
                    {" "}
                    (
                    {dashBoardData?.stats?.results?.total
                      ? `${(
                          ((dashBoardData?.stats?.results?.total -
                            dashBoardData?.stats?.results?.approved -
                            dashBoardData?.stats?.results?.pending) /
                            dashBoardData?.stats?.results?.total) *
                          100
                        ).toFixed(1)}%`
                      : "0%"}
                    ){" "}
                  </div>
                </div>{" "}
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
            <button className="view-all-btn">View All</button>
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
            <button className="view-all-btn">View All</button>
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
          <button className="action-button approve-results">
            <span className="action-icon">✓</span>
            <span>Approve Results</span>
          </button>
          <button className="action-button manage-users">
            <span className="action-icon">👥</span>
            <span>Manage Users</span>
          </button>
          <button className="action-button add-course">
            <span className="action-icon">📚</span>
            <span>Add Course</span>
          </button>
          <button className="action-button view-reports">
            <span className="action-icon">📊</span>
            <span>View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}
