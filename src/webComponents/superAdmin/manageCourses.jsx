import React, { useEffect, useState } from "react";
import "../../superAdminCss/manageCourse.css";
import { addNewCourse, deleteCourse, searchCourse } from "../../backendOperation";
import { useUser } from "../../userContext.jsx";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

export default function ManageCourses() {
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const { user } = useUser();
  const { courses, setCourses } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Function to create a new course
  async function createNewCourse(e) {
    e.preventDefault();
    const requestBody = {
      userId: user._id,
      courseCode,
      courseTitle,
    };
    try {
      const response = await addNewCourse(requestBody);
      if (response?.success) {
        toast.success(response.message || "Course added successfully.");
        setCourseCode("");
        setCourseTitle("");
      } else {
        toast.error(response?.message || "Failed to add course.");
      }
    } catch (error) {
      console.error("Create Course Error:", error);
      toast.error("An unexpected error occurred.");
    }
  }

  // Open modal
  function openDeleteModal(course) {
    setCourseToDelete(course);
    setShowModal(true);
  }

  // Confirm deletion
  async function confirmDeleteCourse() {
    if (!courseToDelete) return;
    try {
      const requestBody = {
        userId: user._id,
        courseId: courseToDelete._id,
      };
      const response = await deleteCourse(requestBody);
      if (response?.success) {
        toast.success("Course deleted successfully.");
        setCourses(response.courses);
        setSearchResults(null); // Reset search results
      } else {
        toast.error(response?.message || "Failed to delete course.");
      }
    } catch (error) {
      console.error("Delete Course Error:", error);
      toast.error("An error occurred while deleting.");
    } finally {
      setShowModal(false);
      setCourseToDelete(null);
    }
  }

  // Handle search
  async function handleSearchCourse() {
    try {
      if (!searchTerm.trim()) {
        toast.error("Please enter a course code or title to search.");
        return;
      }
      const requestBody = { userId: user._id, query: searchTerm };
      const response = await searchCourse(requestBody);
      if (response?.success) {
        setSearchResults(response.results);
      } else {
        toast.error(response?.message || "Search failed.");
      }
    } catch (error) {
      console.error("Search Error:", error);
      toast.error("An error occurred while searching.");
    }
  }

  const displayedCourses = searchResults || courses;

  return (
    <div className="cm-container">
      <div className="cm-header">
        <h1 className="cm-title">Course Management</h1>
        <p className="cm-subtitle">Add, search, and manage university courses</p>
      </div>

      {/* Add Course Section */}
      <div className="cm-panel cm-add-panel">
        <div className="cm-panel-header">
          <div className="cm-panel-title-wrapper">
            <span className="cm-panel-icon">➕</span>
            <h2 className="cm-panel-title">Add New Course</h2>
          </div>
          <p className="cm-panel-desc">Create a new course in the university system</p>
        </div>

        <div className="cm-panel-body">
          <form className="cm-form" onSubmit={createNewCourse}>
            <div className="cm-form-row">
              <div className="cm-form-group">
                <label className="cm-label" htmlFor="courseCode">Course Code</label>
                <input
                  type="text"
                  id="courseCode"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="e.g. CSE 101"
                  className="cm-input"
                />
              </div>
              <div className="cm-form-group">
                <label className="cm-label" htmlFor="courseTitle">Course Title</label>
                <input
                  type="text"
                  id="courseTitle"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g. Intro to Computer Science"
                  className="cm-input"
                />
              </div>
            </div>

            <div className="cm-form-actions">
              <button type="submit" className="cm-btn cm-btn-primary">Add Course</button>
              <button type="reset" className="cm-btn cm-btn-secondary" onClick={() => { setCourseCode(""); setCourseTitle(""); }}>Clear</button>
            </div>
          </form>
        </div>
      </div>

      {/* Manage/Search Courses */}
      <div className="cm-panel cm-manage-panel">
        <div className="cm-panel-header">
          <div className="cm-panel-title-wrapper">
            <span className="cm-panel-icon">🔍</span>
            <h2 className="cm-panel-title">Manage Courses</h2>
          </div>
        </div>

        <div className="cm-panel-body">
          <div className="cm-search-filter-wrapper">
            <div className="cm-search-wrapper">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses..."
                className="cm-search-input"
              />
              <button className="cm-btn cm-btn-search" onClick={handleSearchCourse}>Search</button>
            </div>
          </div>

          <div className="cm-table-container">
            <table className="cm-table">
              <thead>
                <tr>
                  <th className="cm-th">Course Code</th>
                  <th className="cm-th">Course Title</th>
                  <th className="cm-th">Created At</th>
                  <th className="cm-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedCourses?.length > 0 ? (
                  displayedCourses.map((course) => (
                    <tr key={course._id} className="cm-tr">
                      <td className="cm-td">{course.courseCode}</td>
                      <td className="cm-td">{course.courseTitle}</td>
                      <td className="cm-td">{new Date(course.createdAt).toLocaleDateString()}</td>
                      <td className="cm-td">
                        <div className="cm-action-wrapper">
                          <button
                            className="cm-icon-btn cm-delete-btn"
                            title="Delete Course"
                            onClick={() => openDeleteModal(course)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No courses found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="cm-modal-overlay">
          <div className="cm-modal cm-delete-modal">
            <div className="cm-modal-header">
              <h3 className="cm-modal-title">Confirm Deletion</h3>
              <button className="cm-modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="cm-modal-body">
              <div className="cm-delete-icon">🗑️</div>
              <p className="cm-delete-message">
                Are you sure you want to delete <strong>{courseToDelete?.courseCode}</strong>: <strong>{courseToDelete?.courseTitle}</strong>?
              </p>
              <div className="cm-modal-actions">
                <button type="button" className="cm-btn cm-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="cm-btn cm-btn-danger" onClick={confirmDeleteCourse}>Delete Course</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
