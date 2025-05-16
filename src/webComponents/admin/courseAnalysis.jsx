"use client"
import React, { useEffect, useState } from "react";
import "../../css/courseAnalysis.css";
import { fetchCourseOrSessionAnalysis, fetchCourseAndSession } from "../../backendOperation";
import { toast } from "react-toastify";

export default function CourseSessionAnalysis() {
  const [activeTab, setActiveTab] = useState("course");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [analysisData, setAnalysisData] = useState(null);
  const [courseAndSessionData, setCourseAndSessionData] = useState({ courses: [], sessions: [] });
  const [loading, setLoading] = useState(false);

  // Fetch courses and sessions data
  async function fetchCourseAndSessionData() {
    try {
      const response = await fetchCourseAndSession();
      if (response?.success) {
        setCourseAndSessionData(response);
      } else {
        toast.error(response?.message || "Failed to fetch courses and sessions");
      }
    } catch (err) {
      toast.error(err?.message || "An error occurred");
    }
  }

  useEffect(() => {
    fetchCourseAndSessionData();
  }, []);

  const handleApplyFilters = async () => {
    if ((activeTab === "course" && !selectedCourse) || !selectedSession) {
      toast.warning(`Please select ${activeTab === "course" ? "a course and " : ""}a session`);
      return;
    }

    setLoading(true);
    try {
      const payload = activeTab === "course"
        ? {
            analysisType: "course",
            session: selectedSession,
            courseId: selectedCourse,
          }
        : {
            analysisType: "session",
            session: selectedSession,
          };

      const data = await fetchCourseOrSessionAnalysis(payload);
      console.log(data)
      if (data?.success) {
        setAnalysisData(data?.data);
      } else {
        toast.error(data?.error || "Failed to fetch analysis data");
        setAnalysisData(null);
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred");
      setAnalysisData(null);
    } finally {
      setLoading(false);
    }
  };

  // Calculate max count for bar chart scaling
  const maxCount = analysisData?.scoreRanges
    ? Math.max(...analysisData.scoreRanges.map((r) => r.count || 0))
    : 0;

  return (
    <div className="ca-container">
      <header className="ca-header">
        <h1 className="ca-title">Course & Session Analysis</h1>
        <p className="ca-subtitle">Analyze performance metrics across courses and academic sessions</p>
      </header>

      {/* Analysis Type Selector */}
      <div className="ca-analysis-selector">
        <div className="ca-selector-tabs">
          <button
            className={`ca-tab ${activeTab === "course" ? "ca-tab-active" : ""}`}
            onClick={() => setActiveTab("course")}
          >
            Course Analysis
          </button>
          <button
            className={`ca-tab ${activeTab === "session" ? "ca-tab-active" : ""}`}
            onClick={() => setActiveTab("session")}
          >
            Session Analysis
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <section className="ca-filters-section">
        <div className="ca-filters-container">
          <div className="ca-filter-group">
            <label className="ca-filter-label">Select Session:</label>
            <select 
              className="ca-select" 
              onChange={(e) => setSelectedSession(e.target.value)} 
              value={selectedSession}
            >
              <option value="">Select Session</option>
              {courseAndSessionData?.sessions?.map((session, index) => (
                <option key={index} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>

          {activeTab === "course" && (
            <div className="ca-filter-group">
              <label className="ca-filter-label">Select Course:</label>
              <select 
                className="ca-select" 
                onChange={(e) => setSelectedCourse(e.target.value)} 
                value={selectedCourse}
              >
                <option value="">Select Course</option>
                {courseAndSessionData?.courses?.map((course) => (
                  <option key={course?._id} value={course?._id}>
                    {course?.courseCode}: {course?.courseTitle}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button 
            className="ca-filter-button" 
            onClick={handleApplyFilters}
            disabled={loading}
          >
            {loading ? "Loading..." : "Apply Filters"}
          </button>
        </div>
      </section>

      {/* Course Analysis Section */}
      {activeTab === "course" && analysisData && (
        <section className="ca-analysis-section">
          <div className="ca-section-header">
            <h2 className="ca-section-title">
              {analysisData?.courseCode}: {analysisData?.courseTitle}
            </h2>
            <div className="ca-section-subtitle">
              <span className="ca-badge ca-badge-primary">{analysisData?.session}</span>
              <span className="ca-badge ca-badge-secondary">{analysisData?.totalStudents} Students</span>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="ca-overview-cards">
            <div className="ca-card ca-overview-card">
              <div className="ca-card-content">
                <h3 className="ca-card-title">Pass Rate</h3>
                <div className="ca-progress-container">
                  <div 
                    className="ca-progress-bar" 
                    style={{ width: `${analysisData?.passRate || 0}%` }}
                  ></div>
                  <span className="ca-progress-text">{analysisData?.passRate || 0}%</span>
                </div>
              </div>
            </div>

            <div className="ca-card ca-overview-card">
              <div className="ca-card-content">
                <h3 className="ca-card-title">Average Score</h3>
                <div className="ca-score-display">
                  <div className="ca-score-circle">
                    <svg viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#6f42c1"
                        strokeWidth="3"
                        strokeDasharray={`${analysisData?.averageScore || 0}, 100`}
                      />
                      <text x="18" y="20.5" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">
                        {analysisData?.averageScore || 0}%
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="ca-card ca-overview-card">
              <div className="ca-card-content">
                <h3 className="ca-card-title">Score Range</h3>
                <div className="ca-score-range">
                  <div className="ca-range-item">
                    <span className="ca-range-label">Highest:</span>
                    <span className="ca-range-value ca-highest">{analysisData?.highestScore || 0}%</span>
                  </div>
                  <div className="ca-range-item">
                    <span className="ca-range-label">Average:</span>
                    <span className="ca-range-value ca-average">{analysisData?.averageScore || 0}%</span>
                  </div>
                  <div className="ca-range-item">
                    <span className="ca-range-label">Lowest:</span>
                    <span className="ca-range-value ca-lowest">{analysisData?.lowestScore || 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="ca-charts-row">
            <div className="ca-card ca-chart-card">
              <div className="ca-card-header">
                <h3 className="ca-card-title">Grade Distribution</h3>
              </div>
              <div className="ca-card-content">
                <div className="ca-pie-chart-container">
                  <div className="ca-pie-chart">
                    <svg viewBox="0 0 100 100">
                      {/* Pie chart background */}
                      <circle className="ca-pie-circle" cx="50" cy="50" r="40" />

                      {/* Dynamic pie chart segments */}
                      {analysisData?.gradeDistribution?.map((item, index, array) => {
                        // Calculate offset based on previous segments
                        const previousPercentage = array
                          .slice(0, index)
                          .reduce((sum, curr) => sum + (curr?.percentage || 0), 0);
                        
                        return (
                          <circle
                            key={item?.grade}
                            className={`ca-pie-segment ca-grade-${item?.grade?.toLowerCase()}`}
                            cx="50"
                            cy="50"
                            r="40"
                            strokeDasharray={`${(item?.percentage || 0) * 2.51} ${100 * 2.51 - (item?.percentage || 0) * 2.51}`}
                            strokeDashoffset={`${-previousPercentage * 2.51}`}
                          />
                        );
                      })}

                      {/* Inner white circle */}
                      <circle className="ca-pie-inner" cx="50" cy="50" r="25" />
                    </svg>
                  </div>
                  <div className="ca-pie-legend">
                    {analysisData?.gradeDistribution?.map((item) => (
                      <div className="ca-legend-item" key={item?.grade}>
                        <span className={`ca-legend-color ca-grade-${item?.grade?.toLowerCase()}`}></span>
                        <span className="ca-legend-label">
                          {item?.grade} ({item?.count} - {item?.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="ca-card ca-chart-card">
              <div className="ca-card-header">
                <h3 className="ca-card-title">Score Distribution</h3>
              </div>
              <div className="ca-card-content">
                <div className="ca-bar-chart-container">
                  <div className="ca-bar-chart">
                    {analysisData?.scoreRanges?.map((range, index) => (
                      <div className="ca-bar-group" key={index}>
                        <div
                          className="ca-bar"
                          style={{
                            height: `${maxCount ? ((range?.count || 0) / maxCount) * 100 : 0}%`,
                          }}
                        >
                          <span className="ca-bar-value">{range?.count || 0}</span>
                        </div>
                        <div className="ca-bar-label">{range?.range}</div>
                      </div>
                    ))}
                  </div>
                  <div className="ca-chart-y-axis">
                    <div className="ca-y-label">Count</div>
                  </div>
                  <div className="ca-chart-x-axis">
                    <div className="ca-x-label">Score Ranges</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="ca-card ca-table-card">
            <div className="ca-card-header">
              <h3 className="ca-card-title">Top Performers</h3>
            </div>
            <div className="ca-card-content">
              <div className="ca-table-container">
                <table className="ca-table">
                  <thead>
                    <tr>
                      <th className="ca-th">Rank</th>
                      <th className="ca-th">Student Name</th>
                      <th className="ca-th">Department</th>
                      <th className="ca-th">Score</th>
                      <th className="ca-th">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisData?.topPerformers?.map((student, index) => (
                      <tr className="ca-tr" key={index}>
                        <td className="ca-td ca-td-rank">{index + 1}</td>
                        <td className="ca-td">{student?.name}</td>
                        <td className="ca-td">{student?.department}</td>
                        <td className="ca-td">{student?.score}%</td>
                        <td className="ca-td">
                          <span className={`ca-grade-badge ca-grade-${student?.grade?.toLowerCase()}`}>
                            {student?.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Session Analysis Section */}
      {activeTab === "session" && analysisData && (
        <section className="ca-analysis-section">
          <div className="ca-section-header">
            <h2 className="ca-section-title">Session Analysis: {analysisData?.session}</h2>
            <div className="ca-section-subtitle">
              <span className="ca-badge ca-badge-primary">{analysisData?.totalStudents} Students</span>
              <span className="ca-badge ca-badge-secondary">{analysisData?.totalCourses} Courses</span>
            </div>
          </div>

          {/* Session Overview Cards */}
          <div className="ca-overview-cards">
            <div className="ca-card ca-overview-card">
              <div className="ca-card-content">
                <h3 className="ca-card-title">Average GPA</h3>
                <div className="ca-score-display">
                  <div className="ca-score-circle">
                    <svg viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#6f42c1"
                        strokeWidth="3"
                        strokeDasharray={`${((analysisData?.averageGPA || 0) / 5) * 100}, 100`}
                      />
                      <text x="18" y="20.5" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">
                        {(analysisData?.averageGPA || 0).toFixed(1)}
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="ca-card ca-overview-card">
              <div className="ca-card-content">
                <h3 className="ca-card-title">Grade Distribution</h3>
                <div className="ca-horizontal-bars">
                  {analysisData?.gradeDistribution?.map((item) => (
                    <div className="ca-horizontal-bar-item" key={item?.grade}>
                      <div className="ca-horizontal-bar-label">{item?.grade}</div>
                      <div className="ca-horizontal-bar-container">
                        <div
                          className={`ca-horizontal-bar ca-grade-${item?.grade?.toLowerCase()}`}
                          style={{ width: `${item?.percentage || 0}%` }}
                        ></div>
                        <span className="ca-horizontal-bar-value">{item?.count || 0}</span>
                      </div>
                      <div className="ca-horizontal-bar-percentage">{item?.percentage || 0}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Department Performance */}
          <div className="ca-card ca-chart-card">
            <div className="ca-card-header">
              <h3 className="ca-card-title">Department Performance</h3>
            </div>
            <div className="ca-card-content">
              <div className="ca-department-performance">
                {analysisData?.departmentPerformance?.map((dept, index) => (
                  <div className="ca-department-item" key={index}>
                    <div className="ca-department-header">
                      <h4 className="ca-department-name">{dept?.department}</h4>
                      <div className="ca-department-stats">
                        <span className="ca-department-gpa">GPA: {(dept?.averageGPA || 0).toFixed(1)}</span>
                        <span className="ca-department-pass">Pass Rate: {dept?.passRate || 0}%</span>
                      </div>
                    </div>
                    <div className="ca-department-progress">
                      <div className="ca-progress-container">
                        <div className="ca-progress-bar" style={{ width: `${dept?.passRate || 0}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="ca-card ca-table-card">
            <div className="ca-card-header">
              <h3 className="ca-card-title">Top Performers</h3>
            </div>
            <div className="ca-card-content">
              <div className="ca-table-container">
                <table className="ca-table">
                  <thead>
                    <tr>
                      <th className="ca-th">Rank</th>
                      <th className="ca-th">Student Name</th>
                      <th className="ca-th">Department</th>
                      <th className="ca-th">GPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisData?.topPerformers?.map((student, index) => (
                      <tr className="ca-tr" key={index}>
                        <td className="ca-td ca-td-rank">{index + 1}</td>
                        <td className="ca-td">{student?.name}</td>
                        <td className="ca-td">{student?.department}</td>
                        <td className="ca-td ca-td-gpa">{(student?.gpa || 0).toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No data message */}
      {!loading && !analysisData && (
        <div className="ca-no-data">
          <p>Select filters and click "Apply Filters" to view analysis data</p>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="ca-loading">
          <p>Loading analysis data...</p>
        </div>
      )}
    </div>
  );
}
