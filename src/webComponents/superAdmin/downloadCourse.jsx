import React, { useEffect, useState } from 'react';
import { downloadCourseResultPdf, fetchCourseAndSession } from '../../backendOperation';
import { toast } from 'react-toastify';
import "../../superAdminCss/downloadCourse.css";

export default function DownloadCourse() {
    const [courses, setCourses] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSession, setSelectedSession] = useState('');
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);

    async function fetchCourses() {
        try {
            setLoading(true);
            const response = await fetchCourseAndSession();
            
            if (response?.success) {
                setCourses(response.courses || []);
                setSessions(response.sessions || []);
            } else {
                toast.error('Failed to fetch courses and sessions');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            toast.error('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    }

    const handleDownload = async () => {
        if (!selectedCourse || !selectedSession) {
            toast.warning('Please select both a course and session');
            return;
        }

        try {
            setDownloading(true);
            
            // Find the selected course to get the course code
            const course = courses.find(c => c._id === selectedCourse);
            if (!course) {
                toast.error('Selected course not found');
                return;
            }

            const response = await downloadCourseResultPdf({
                courseCode: course.courseCode,
                session: selectedSession
            });

            if (response?.success) {
                toast.success('Course results downloaded successfully!');
                // Reset selections after successful download
                setSelectedCourse('');
                setSelectedSession('');
            } else {
                toast.error(response?.message || 'Failed to download course results');
            }
        } catch (error) {
            console.error('Error downloading course results:', error);
            toast.error('An error occurred while downloading');
        } finally {
            setDownloading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="download-course-container">
            <div className="download-course-header">
                <h1 className="download-course-title">Download Course Results</h1>
                <p className="download-course-subtitle">
                    Select a course and academic session to download the complete results in PDF format
                </p>
            </div>

            <div className="download-course-card">
                <div className="download-course-form">
                    {loading ? (
                        <div className="download-course-loading">
                            <div className="loading-spinner"></div>
                            <p>Loading courses and sessions...</p>
                        </div>
                    ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="session-select" className="form-label">
                                    <span className="label-icon">📅</span>
                                    Academic Session
                                </label>
                                <select
                                    id="session-select"
                                    className="form-select"
                                    value={selectedSession}
                                    onChange={(e) => setSelectedSession(e.target.value)}
                                >
                                    <option value="">Select Academic Session</option>
                                    {sessions.map((session, index) => (
                                        <option key={index} value={session}>
                                            {session}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="course-select" className="form-label">
                                    <span className="label-icon">📚</span>
                                    Course
                                </label>
                                <select
                                    id="course-select"
                                    className="form-select"
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                >
                                    <option value="">Select Course</option>
                                    {courses.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course.courseCode} - {course.courseTitle}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-actions">
                                <button
                                    className="download-btn"
                                    onClick={handleDownload}
                                    disabled={!selectedCourse || !selectedSession || downloading}
                                >
                                    {downloading ? (
                                        <>
                                            <div className="btn-spinner"></div>
                                            Downloading...
                                        </>
                                    ) : (
                                        <>
                                            <span className="btn-icon">📥</span>
                                            Download PDF
                                        </>
                                    )}
                                </button>
                            </div>

                            {selectedCourse && selectedSession && (
                                <div className="selection-summary">
                                    <h3>Download Summary</h3>
                                    <div className="summary-item">
                                        <span className="summary-label">Session:</span>
                                        <span className="summary-value">{selectedSession}</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Course:</span>
                                        <span className="summary-value">
                                            {courses.find(c => c._id === selectedCourse)?.courseCode} - {courses.find(c => c._id === selectedCourse)?.courseTitle}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="download-course-info">
                    <div className="info-card">
                        <div className="info-icon">ℹ️</div>
                        <div className="info-content">
                            <h3>Download Information</h3>
                            <ul>
                                <li>PDF will contain all student results for the selected course</li>
                                <li>Results are organized by student registration number</li>
                                <li>Download may take a few moments for large datasets</li>
                                <li>Ensure you have permission to access this data</li>
                            </ul>
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">{courses.length}</div>
                            <div className="stat-label">Available Courses</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">{sessions.length}</div>
                            <div className="stat-label">Academic Sessions</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}