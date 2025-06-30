import React, { useState, useEffect, useRef } from "react";
import { getWelcomeMessage } from "../helperFunctions";
import { useUser } from "../userContext";
import { useOutletContext } from "react-router-dom";
import Chart from 'chart.js/auto'; // You'll need to install this: npm install chart.js
import "../css/dashboard.css"; // Assuming you have a CSS file for styling
import { getActiveSemesterAndSession } from "../backendOperation";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { user } = useUser();
  const { dashboardDetails } = useOutletContext();
  const [viewType, setViewType] = useState("test"); // test or exam
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [currentSemesterAndSession,setCurrentSemesterAndSession] = useState({})
  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
  const GPA = dashboardDetails?.GPA ?? "NaN";
  const totalCourses = dashboardDetails?.totalCourses ?? "NaN";
  const totalUnits = dashboardDetails?.totalUnits ?? "NaN";
  const results = dashboardDetails?.results ?? [];


  const currentSession = "2024/2025"; // You can make this dynamic if needed
  const currentResults = results?.filter(
    (r) => r?.session === currentSession
  ) ?? [];

  // Simulate testScore and examScore from totalScore
  const simulateScores = (totalScore) => {
    const test = Math.floor((totalScore ?? 0) * 0.4);
    const exam = Math.floor((totalScore ?? 0) * 0.6);
    return { testScore: test, examScore: exam };
  };

  // Calculate grade distribution for chart
  const calculateGradeDistribution = () => {
    const grades = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    
    currentResults.forEach(result => {
      if (result.grade) {
        grades[result.grade.charAt(0)]++;
      }
    });
    
    return grades;
  };

  async function fetchActiveSemesterAndSession(){
    try{
      const response = await getActiveSemesterAndSession();
      console.log(response)
      if(response.success){
        setCurrentSemesterAndSession(response.sesmesterAndSession[0] || {})
      }

    }catch(error){
      toast.error(error.message);
    }
  }

  

  useEffect(()=>{
    fetchActiveSemesterAndSession()
  },[])

  // Initialize chart
  useEffect(() => {
    if (chartRef.current && currentResults.length > 0) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const gradeDistribution = calculateGradeDistribution();
      
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: Object.keys(gradeDistribution),
          datasets: [{
            label: 'Grade Distribution',
            data: Object.values(gradeDistribution),
            backgroundColor: [
              'rgba(0, 110, 245, 0.8)',
              'rgba(0, 110, 245, 0.6)',
              'rgba(0, 110, 245, 0.4)',
              'rgba(0, 110, 245, 0.3)',
              'rgba(220, 53, 69, 0.5)'
            ],
            borderColor: [
              'rgba(0, 110, 245, 1)',
              'rgba(0, 110, 245, 1)',
              'rgba(0, 110, 245, 1)',
              'rgba(0, 110, 245, 1)',
              'rgba(220, 53, 69, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Current Semester Grade Distribution',
              color: '#333',
              font: {
                size: 16,
                family: 'CalibreBold'
              }
            }
          }
        }
      });
    }
  }, [currentResults]);

  return (
    <div className="dashboard-container">
      {/* Welcome message */}
      <div className="dashboard-header">
        <h1 className="welcome-message">{getWelcomeMessage(fullName || "Student")}</h1>
        <div className="session-info">
          <span>Current semester:</span> {currentSemesterAndSession?.semester || "N/A"}
          {"    "}
          <span>Current Session:</span> {currentSemesterAndSession?.session || "N/A"}
        </div>
      </div>

      {/* Dashboard stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Current GPA</div>
            <div className="stat-value">{GPA}</div>
            <div className="stat-subtitle">Compared to last semester</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Approved Results</div>
            <div className="stat-value">{currentResults?.length ?? "NaN"}</div>
            <div className="stat-subtitle">This Semester</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Total Courses</div>
            <div className="stat-value">{totalCourses}</div>
            <div className="stat-subtitle">Current Semester</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Total Units</div>
            <div className="stat-value">{totalUnits}</div>
            <div className="stat-subtitle">Current Semester</div>
          </div>
        </div>
      </div>

      {/* Chart section */}
      <div className="chart-section">
        <div className="chart-container">
          <canvas ref={chartRef} height="250"></canvas>
        </div>
      </div>

      {/* Scores section */}
      <div className="scores-section">
        <div className="scores-header">
          <h2>Academic Performance</h2>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewType === "test" ? "active" : ""}`}
              onClick={() => setViewType("test")}
            >
              Test Scores
            </button>
            <button 
              className={`toggle-btn ${viewType === "exam" ? "active" : ""}`}
              onClick={() => setViewType("exam")}
            >
              Exam Scores
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="scores-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Code</th>
                <th>{viewType === "test" ? "Test Score" : "Exam Score"}</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {currentResults?.length > 0 ? (
                currentResults.map((res, index) => {
                  const { testScore, examScore } = simulateScores(res?.totalScore ?? 0);
                  const score = viewType === "test" ? testScore : examScore;
                  
                  return (
                    <tr key={index}>
                      <td className="course-title">{res?.courseTitle ?? "NaN"}</td>
                      <td>{res?.courseCode ?? "NaN"}</td>
                      <td className="score-value">{score}</td>
                      <td>
                        <span className={`grade-badge grade-${res?.grade?.charAt(0).toLowerCase()}`}>
                          {res?.grade || "N/A"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="empty-message">
                    No results available for this semester.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}