import React, { useEffect, useState } from "react";
import "../css/feedback.css";
import {
  addCourseFeedback,
  getAllCourses,
  getAllSessions,
  randomCourseFeedback,
  searchCourseFeedback,
} from "../backendOperation";
import { toast } from "react-toastify";
import { useUser } from "../userContext";

export default function Feedback() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [sessions, setSessions] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const [courseRes, sessionRes, randomRes] = await Promise.all([
          getAllCourses(),
          getAllSessions(),
          randomCourseFeedback(),
        ]);

        if (courseRes.success) setCourses(courseRes.courses);
        if (sessionRes.success) setSessions(sessionRes.sessions);
        if (randomRes.success) setAllFeedback(randomRes.feedback);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load initial data.");
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!selectedCourse || !selectedSession || !feedbackText.trim()) {
      toast.error("Please fill out all fields.");
      return;
    }

    const newFeedback = {
      course: selectedCourse,
      session: selectedSession,
      text: feedbackText,
      student: user?._id,
    };

    const response = await addCourseFeedback(newFeedback);
    if (response.success) {
      setAllFeedback(response.randomFeedback || []); // set new random feedback
      setFeedbackText("");
      toast.success("Feedback submitted successfully.");
    } else {
      toast.error("Failed to submit feedback.");
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setFilteredFeedback([]);
      return;
    }

    const response = await searchCourseFeedback({ searchTerm });
    if (response.success) {
      setFilteredFeedback(response.feedback);
    } else {
      toast.error("Failed to search feedback.");
    }
  };

  const feedbackToShow = searchTerm.trim()
    ? filteredFeedback
    : allFeedback.slice(0, 5);

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Submit Course Feedback</h2>

      <div className="feedback-form">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseCode} - {course.name}
            </option>
          ))}
        </select>

        <select
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
        >
          <option value="">Select Session</option>
          {sessions.map((session, index) => (
            <option key={index} value={session.session}>
              {session.session}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Write your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        ></textarea>

        <button onClick={handleSubmit}>Submit Feedback</button>
      </div>

      <div className="feedback-browser">
        <h3>Browse Feedback</h3>
        <div className="feedback-search">
          <input
            type="text"
            placeholder="Search by course code (e.g., CSE203)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="feedback-list">
          {feedbackToShow.length ? (
            feedbackToShow.map((fb, idx) => (
              <div key={idx} className="feedback-item">
                <h4>{fb.course?.courseCode || "Unknown Course"}</h4>
                <p className="feedback-text">{fb.text}</p>
                <span className="feedback-session">{fb.session}</span>
              </div>
            ))
          ) : (
            <p className="no-feedback">No feedback found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
