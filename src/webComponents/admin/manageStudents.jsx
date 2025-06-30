import { useEffect, useState } from "react";
import "../../css/manageStudents.css";
import { getManageStudentData } from "../../backendOperation";
import { toast } from "react-toastify";

export default function ManageStudents(){
  const [idNumberText, setIdNumberText] = useState("");
  const [studentData, setStudentData] = useState({});
  const [studentFound, setStudentFound] = useState(false);
  // Template data - will be replaced with actual backend data
  // Remove the static student object and use studentData.student instead

  // Semester data
  // Remove the static semesters array

  // Course data
  // Remove the static courses array

  // Grade distribution
  // Remove the static gradeDistribution array

  async function handleMnageStudentData() {
    try {
      console.log("getting student data");
      const response = await getManageStudentData({
        matricNumber: idNumberText,
      });
      console.log(response);
      if (response.success) {
        setStudentFound(true);
        setStudentData(response);
      } else {
        setStudentFound(false);
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      console.log("logging error");
      console.log(error);
      setStudentFound(false);
      setStudentData({});
      toast.error(error.message);
    }
  }

  useEffect(() => {
    console.log(studentData);
  }, [studentData]);

  return (
    <div className="ms-container">
      <header className="ms-header">
        <h1 className="ms-title">Student Performance Dashboard</h1>
        <p className="ms-subtitle">
          Comprehensive analysis of academic performance
        </p>
      </header>

      {/* Student Search Section */}
      <div className="ms-search-section">
        <div className="ms-search-wrapper">
          <input
            type="text"
            placeholder="Search students..."
            className="ms-search-input"
            onChange={(e) => {
              setIdNumberText(e.target.value);
              console.log(e.target.value);
            }}
          />
          <button
            className="ms-search-button"
            onClick={() => {
              console.log("hey");
              handleMnageStudentData();
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Student Profile Section */}
      <section className="ms-profile-card">
        <div
          className="ms-profile-header"
          style={{ display: studentFound ? "flex" : "none" }}
        >
          <div className="ms-profile-avatar">
            <span>
              {studentData?.student?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="ms-profile-details">
            <h2 className="ms-profile-name">{studentData?.student?.name}</h2>
            <div className="ms-profile-info-grid">
              <div className="ms-profile-info-item">
                <span className="ms-info-label">ID:</span>
                <span className="ms-info-value">
                  {studentData?.student?.id}
                </span>
              </div>
              <div className="ms-profile-info-item">
                <span className="ms-info-label">Department:</span>
                <span className="ms-info-value">
                  {studentData?.student?.department}
                </span>
              </div>
              <div className="ms-profile-info-item">
                <span className="ms-info-label">Programme:</span>
                <span className="ms-info-value">
                  {studentData?.student?.programme}
                </span>
              </div>
              <div className="ms-profile-info-item">
                <span className="ms-info-label">Total Results:</span>
                <span className="ms-info-value">
                  {studentData?.courses?.length}
                </span>
              </div>
            </div>
          </div>
          <div className="ms-profile-stats">
            <div className="ms-stat-box">
              <div className="ms-stat-value">
                {studentData?.student?.cgpa?.toFixed(2) || "NAN"}
              </div>
              <div className="ms-stat-label">CGPA</div>
            </div>

            <div className="ms-stat-box">
              <div className="ms-stat-value">{studentData?.student?.level}</div>
              <div className="ms-stat-label">Level</div>
            </div>
          </div>
        </div>
        <div
          className="ms-profile-actions"
          style={{ display: studentFound ? "" : "none" }}
        >
          <button className="ms-action-button ms-print-button">
            <span className="ms-button-icon">📄</span> Print Report
          </button>
          <button className="ms-action-button ms-export-button">
            <span className="ms-button-icon">📊</span> Export Data
          </button>
        </div>
      </section>

      {/* GPA Trend Section */}
      <section
        className="ms-performance-card"
        style={{ display: studentFound ? "" : "none" }}
      >
        <h2 className="ms-section-title">GPA Trend</h2>
        <div className="ms-gpa-chart">
          {studentData?.semesters?.map((semester, index) => (
            <div className="ms-gpa-bar-container" key={semester.id} >
              {/* <div className="ms-gpa-label" >{semester.name}</div> */}
              <div className="ms-gpa-bar-wrapper" >
                <div
                  className="ms-gpa-bar"
                  style={{ height: `${(semester.gpa / 5) * 100}%` }}
                  data-value={semester.gpa.toFixed(2)}
                ></div>
              </div>
              <div className="ms-gpa-label">{semester.name}</div>
            </div>
          )) || <div className="ms-no-data">No semester data available</div>}
        </div>
      </section>

      {/* Grade Distribution Section */}
      <section
        className="ms-performance-card"
        style={{ display: studentFound ? "" : "none" }}
      >
        <h2 className="ms-section-title">Grade Distribution</h2>
        <div className="ms-grade-distribution">
          {studentData?.gradeDistribution?.map((item, index) => (
            <div className="ms-grade-item" key={index}>
              <div className="ms-grade-label">{item.grade}</div>
              <div className="ms-grade-bar-container">
                <div
                  className={`ms-grade-bar ms-grade-${item.grade.toLowerCase()}`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
                <span className="ms-grade-count">{item.count}</span>
              </div>
            </div>
          )) || (
            <div className="ms-no-data">
              No grade distribution data available
            </div>
          )}
        </div>
        <div className="ms-grade-scale">
          <div className="ms-grade-scale-item">
            <span className="ms-grade-dot ms-grade-a"></span>
            <span>A (70-100)</span>
          </div>
          <div className="ms-grade-scale-item">
            <span className="ms-grade-dot ms-grade-b"></span>
            <span>B (60-69)</span>
          </div>
          <div className="ms-grade-scale-item">
            <span className="ms-grade-dot ms-grade-c"></span>
            <span>C (50-59)</span>
          </div>
          <div className="ms-grade-scale-item">
            <span className="ms-grade-dot ms-grade-d"></span>
            <span>D (45-50)</span>
          </div>
          <div className="ms-grade-scale-item">
            <span className="ms-grade-dot ms-grade-f"></span>
            <span>F (0-44)</span>
          </div>
        </div>
      </section>

      {/* Course Performance Section */}
      <section
        className="ms-performance-card"
        style={{ display: studentFound ? "" : "none" }}
      >
        <h2 className="ms-section-title">Course Performance</h2>

        <div className="ms-semester-filter">
          <label htmlFor="ms-semester-select" className="ms-filter-label">
            Select Semester:
          </label>
          <select id="ms-semester-select" className="ms-semester-select">
            <option value="all">All Semesters</option>
            {studentData?.semesters?.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className="ms-course-grid"
          style={{ display: studentFound ? "" : "none" }}
        >
          {studentData?.courses?.map((course) => (
            <div className="ms-course-card" key={course.id}>
              <div className="ms-course-header">
                <h3 className="ms-course-title">
                  {course.code}: {course.title}
                </h3>
                <div className="ms-course-semester">{course.semester}</div>
              </div>
              

              <div className="ms-course-grade-display">
                <div className="ms-grade-circle">
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
                      strokeDasharray={`${course.total}, 100`}
                    />
                    <text
                      x="18.5"
                      y="15"
                      fontSize="7"
                      fill="#006ef5"
                      style={{
                        marginLeft: 15,
                        marginBottom: 20,
                        color: "#006ef5",
                      }}
                    >
                      {course.total}%
                    </text>
                    <text
                      x="18"
                      y="24"
                      textAnchor="middle"
                      fontSize="12"
                      fill="#333"
                      fontWeight="bold"
                    >
                      {course.grade}
                    </text>
                  </svg>
                </div>
                <div className="ms-grade-info">
                  <div className="ms-grade-info-item">
                    <span>Grade Point:</span>
                    <span>{course.gradePoint.toFixed(1)}/5.0</span>
                  </div>
                </div>
              </div>

              <div
                className="ms-assessment-breakdown"
                style={{ display: studentFound ? "" : "none" }}
              >
                <h4 className="ms-breakdown-title">Assessment Breakdown</h4>
                <div className="ms-assessment-item">
                  <div className="ms-assessment-header">
                    <span>Test (30%)</span>
                    <span>{course.test}/30</span>
                  </div>
                  <div className="ms-progress-bar">
                    <div
                      className="ms-progress-fill"
                      style={{ width: `${(course.test / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ms-assessment-item">
                  <div className="ms-assessment-header">
                    <span>Exam (70%)</span>
                    <span>{course.exam}/70</span>
                  </div>
                  <div className="ms-progress-bar">
                    <div
                      className="ms-progress-fill"
                      style={{ width: `${(course.exam / 70) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Insights Section */}
      <section
        className="ms-performance-card"
        style={{ display: studentFound ? "" : "none" }}
      >
        <h2 className="ms-section-title">Performance Insights</h2>

        <div className="ms-insights-container">
          <div className="ms-insight-card">
            <div className="ms-insight-icon ms-icon-strength">💪</div>
            <div className="ms-insight-content">
              <h3 className="ms-insight-title">Strengths</h3>
              <ul className="ms-insight-list">
                {studentData?.courses?.filter((course) => course.grade === "A")
                  .length > 0 ? (
                  <>
                    {studentData.courses
                      .filter((course) => course.grade === "A")
                      .map((course) => (
                        <li key={course.id}>
                          Excellent performance in {course.title} ({course.code}
                          )
                        </li>
                      ))}
                    {studentData.student?.cgpa > 4.0 && (
                      <li>
                        Strong overall CGPA of{" "}
                        {studentData.student.cgpa.toFixed(2)}
                      </li>
                    )}
                  </>
                ) : (
                  <li>No specific strengths identified yet</li>
                )}
              </ul>
            </div>
          </div>

          <div className="ms-insight-card">
            <div className="ms-insight-icon ms-icon-improvement">📈</div>
            <div className="ms-insight-content">
              <h3 className="ms-insight-title">Areas for Improvement</h3>
              <ul className="ms-insight-list">
                {studentData?.courses?.filter(
                  (course) =>
                    course.grade === "C" ||
                    course.grade === "D" ||
                    course.grade === "F"
                ).length > 0 ? (
                  studentData.courses
                    .filter(
                      (course) =>
                        course.grade === "C" ||
                        course.grade === "D" ||
                        course.grade === "F"
                    )
                    .map((course) => (
                      <li key={course.id}>
                        Performance in {course.title} ({course.code}) needs
                        improvement
                      </li>
                    ))
                ) : (
                  <li>No specific areas for improvement identified yet</li>
                )}
              </ul>
            </div>
          </div>

          <div className="ms-insight-card">
            <div className="ms-insight-icon ms-icon-recommendation">💡</div>
            <div className="ms-insight-content">
              <h3 className="ms-insight-title">Recommendations</h3>
              <ul className="ms-insight-list">
                <li>Focus on consistent study habits across all courses</li>
                {studentData?.courses?.filter((course) => course.test < 20)
                  .length > 0 && <li>Improve test preparation strategies</li>}
                {studentData?.courses?.filter(
                  (course) =>
                    course.grade === "C" ||
                    course.grade === "D" ||
                    course.grade === "F"
                ).length > 0 && (
                  <li>Consider additional practice for challenging courses</li>
                )}
                <li>
                  Maintain current study approach for high-performing courses
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
