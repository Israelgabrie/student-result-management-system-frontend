import React, { useEffect, useState } from "react";
import { DownloadIcon, SearchIcon } from "../assets/svg";
import { truncateString } from "../helperFunctions";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useUser } from "../userContext";
import {
  getStudentResultSessions,
  getStudentResult,
  getCourseAnalysis,
} from "../backendOperation";
import { toast } from "react-toastify"; // Assuming you're using react-toastify
import "../css/viewResult.css"; // Assuming you have a CSS file for styling

export default function ViewResult() {
  const { user } = useUser();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("First");
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courseAnalysis, setCourseAnalysis] = useState({
    courseCode: "",
    session: "",
  });
  const [courseAnalysisData, setCourseAnalysisData] = useState({});

  // Chart data for course analysis
  const data = [
    { name: "A", value: 90 },
    { name: "B", value: 80 },
    { name: "C", value: 70 },
    { name: "D", value: 60 },
    { name: "F", value: 50 },
  ];

  const COLORS = ["#4CAF50", "#2196F3", "#FFEB3B", "#FF9800", "#F44336"]; // Green, Blue, Yellow, Orange, Red

  async function fetchStudentSessions() {
    try {
      const response = await getStudentResultSessions({ studentId: user?._id });
      if (response.success) {
        setSessions(response.sessions);
        if (response.sessions.length > 0) {
          setSelectedSession(response.sessions[0]);
        }
      } else {
        toast.error(response?.message || "Error fetching student sessions");
      }
    } catch (error) {
      toast.error("Failed to fetch sessions");
    }
  }

  async function getResult() {
    if (!selectedSession) {
      toast.warning("Please select a session");
      return;
    }

    setLoading(true);
    try {
      const response = await getStudentResult({
        studentId: user?._id,
        semester: selectedSemester,
        session: selectedSession,
      });

      if (response.success) {
        setResultData(response);
        toast.success("Result fetched successfully");
      } else {
        toast.error(response?.message || "Error fetching student result");
      }
    } catch (error) {
      toast.error("Failed to fetch result");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudentSessions();
  }, []);

  // Calculate progress percentage for progress bar
  const calculateProgress = (score) => {
    if (!score) return 0;
    const [obtained, total] = score.split("/").map(Number);
    return (obtained / total) * 100;
  };

  async function fetchCourseAnalysis() {
    if (!courseAnalysis.session) {
      toast.warning("Please select a session");
      return;
    }

    setLoading(true);
    try {
      console.log({
        studentId: user?._id,
        courseCode: courseAnalysis.semester,
        session: courseAnalysis.session,
      });
      const response = await getCourseAnalysis({
        courseCode: courseAnalysis.courseCode,
        session: courseAnalysis.session,
      });
      console.log(response);

      if (response.success) {
        // Handle course analysis data
        toast.success("Course analysis fetched successfully");
        setCourseAnalysisData(response);
        console.log(response.data);
      } else {
        toast.error(response?.message || "Error fetching course analysis");
      }
    } catch (error) {
      toast.error("Failed to fetch course analysis");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(courseAnalysisData);
  }, [courseAnalysisData]);

  // Get color based on grade
  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "#4CAF50"; // Green
      case "B":
        return "#2196F3"; // Blue
      case "C":
        return "#FFEB3B"; // Yellow
      case "D":
        return "#FF9800"; // Orange
      case "F":
        return "#F44336"; // Red
      default:
        return "#757575"; // Grey
    }
  };

  return (
    <div className="result-container">
      <div className="result-header">
        <h1 className="result-title">View Result</h1>
        <div className="result-controls">
          <select
            onChange={(e) => {
              setSelectedSemester(e.target.value);
            }}
            className="result-select"
          >
            <option value="First">First Semester</option>
            <option value="Second">Second Semester</option>
          </select>
          <select
            onChange={(e) => {
              setSelectedSession(e.target.value);
            }}
            className="result-select"
            disabled={sessions.length === 0}
          >
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <option key={index} value={session}>
                  {session}
                </option>
              ))
            ) : (
              <option value="">No sessions available</option>
            )}
          </select>
          <button
            className="result-button"
            onClick={getResult}
            disabled={loading || !selectedSession}
          >
            {loading ? "Loading..." : "Get Result"}
          </button>
        </div>
      </div>

      {resultData && (
        <div className="result-box">
          <div className="result-summary-header">
            <div>
              <h2 className="result-box-title">Academic Performance Summary</h2>
              <p className="result-release-date">Released: 2nd March 2025</p>
            </div>
            <div className="student-info">
              <p>
                <strong>Name:</strong> {resultData.student.fullName}
              </p>
              <p>
                <strong>ID:</strong> {resultData.student.idNumber}
              </p>
              <p>
                <strong>Department:</strong> {resultData.student.department}
              </p>
              <p>
                <strong>Programme:</strong> {resultData.student.programme}
              </p>
            </div>
          </div>

          <div className="result-summary-grid">
            <div className="result-summary-card">
              <div className="result-card-label">Semester GPA</div>
              <div className="result-card-value">{resultData.GPA}</div>
            </div>
            <div className="result-summary-card">
              <div className="result-card-label">Cumulative GPA</div>
              <div className="result-card-value">{resultData.CGPA}</div>
            </div>
            <div className="result-summary-card">
              <div className="result-card-label">Total Units</div>
              <div className="result-card-value">{resultData.totalUnits}</div>
            </div>
          </div>

          <div className="result-table-container">
            <table className="result-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course</th>
                  <th>Test Score</th>
                  <th>Exam Score</th>
                  <th>Total Score</th>
                  <th>Grade</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {resultData.courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.courseCode}</td>
                    <td className="course-title-cell">
                      {truncateString(course.courseTitle)}
                    </td>
                    <td>{course.testScore}</td>
                    <td>{course.examScore}</td>
                    <td>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${(course.totalScore / 100) * 100}%`,
                              backgroundColor: getGradeColor(course.grade),
                            }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {course.totalScore}/100
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="grade-badge"
                        style={{ backgroundColor: getGradeColor(course.grade) }}
                      >
                        {course.grade}
                      </span>
                    </td>
                    <td>{course.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="result-analysis-section">
            <div className="analysis-header">
              <div>
                <h2 className="analysis-title">Course Analysis</h2>
                <p className="analysis-subtitle">Analyze your courses</p>
              </div>
              <div className="analysis-controls">
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search courses..."
                    onChange={(e) => {
                      setCourseAnalysis({
                        ...courseAnalysis,
                        courseCode: e.target.value,
                      });
                    }}
                    value={courseAnalysis.courseCode}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        fetchCourseAnalysis(); // call your function here
                      }
                    }}
                  />

                  <span className="search-icon">
                    <SearchIcon width={20} height={20} />
                  </span>
                </div>
                <select
                  onChange={(e) => {
                    setCourseAnalysis({
                      ...courseAnalysis,
                      session: e.target.value,
                    });
                  }}
                  className="analysis-select"
                >
                  {sessions.map((session, index) => (
                    <option key={index} value={session}>
                      {session}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {courseAnalysisData && (
              <div className="analysis-content">
                <div className="chart-container">
                  <PieChart width={300} height={300}>
                    <Pie
                      data={Object.entries(courseAnalysisData.gradeCounts).map(
                        ([grade, value]) => ({ name: grade, value })
                      )}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {Object.entries(courseAnalysisData.gradeCounts).map(
                        ([_, __], index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>

                <div className="course-details">
                  <h3 className="course-code">
                    Course Code: {courseAnalysisData.courseCode || "N/A"}
                  </h3>
                  <p className="course-title">
                    Course Title: {courseAnalysisData.courseTitle || "N/A"}
                  </p>
                  <p className="course-lecturer">
                    Lecturer: {courseAnalysisData.lecturer || "N/A"}
                  </p>
                  <p className="course-year">
                    Analysis For: {courseAnalysisData.session || "N/A"}
                  </p>
                  <p className="course-pass-rate">
                    Pass Rate: {courseAnalysisData.passRate || "0.00"}%
                  </p>
                </div>
              </div>
            )}

            <div className="feedback-section">
              <h2 className="feedback-title">Students Feedback</h2>
              <div className="feedback-list">
              
                {courseAnalysisData.feedbacks &&
                  courseAnalysisData.feedbacks.map((feedback, comment) => (
                    <div key={index} className="feedback-item">
                      <p className="feedback-text">{feedback.text}</p>
                      <p className="feedback-author">
                        - {feedback.author || "Anonymous"}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <button className="download-button">
              <DownloadIcon width={20} height={20} />
              <span>Download Result</span>
            </button>
          </div>
        </div>
      )}

      {!resultData && !loading && (
        <div className="no-result-message">
          <p>
            Select a session and semester, then click "Get Result" to view your
            academic performance.
          </p>
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your results...</p>
        </div>
      )}
    </div>
  );
}
