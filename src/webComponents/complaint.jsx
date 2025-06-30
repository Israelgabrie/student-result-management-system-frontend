import React, { useEffect, useState } from "react";
import "../css/complaint.css";
import { useUser } from "../userContext";
import {
  addStudentComplaint,
  getAllCourses,
  fetchStudentComplaints,
  getStudentComplaints,
  deleteStudentComaplint,
} from "../backendOperation";
import { toast } from "react-toastify";

export default function Complaint() {
  const [expanded, setExpanded] = useState(false);
  const [complaintText, setComplaintText] = useState("");
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const { user } = useUser();
  const [subject, setSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getComplaintTypes();
    getCourses();
    getComplaints();
  }, [user._id]);

  async function getComplaints() {
    if (!user._id) return;
    try {
      const response = await fetchStudentComplaints({ student: user._id });
      console.log(response);
      if (response?.success) {
        setComplaints(response?.complaints);
      } else {
        toast.error(
          response?.response?.data?.message || "Unable to fetch complaints"
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function getComplaintTypes() {
    try {
      const response = await getStudentComplaints();
      if (response?.success) {
        setComplaintTypes(response?.complaintTypes);
      } else {
        toast.error(
          response?.response?.data?.message || "Unable to fetch complaint types"
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function getCourses() {
    try {
      const response = await getAllCourses();
      if (response?.success) {
        setCourses(response?.courses);
      } else {
        toast.error(
          response?.response?.data?.message || "An Unknown error occurred"
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type === "image/jpeg")
    ) {
      setProofFile(file);
    } else {
      toast.error("Only JPG and PDF files are allowed.");
      e.target.value = null;
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedCategory || !complaintText.trim() || !subject.trim()) {
        return toast.error("Please fill all required fields.");
      }

      const formData = new FormData();
      formData.append("student", user._id);
      formData.append("complaintType", selectedCategory);
      formData.append("description", complaintText);
      formData.append("subject", subject);

      if (selectedCategory === "missing result") {
        if (!selectedCourse) return toast.error("Please select a course.");
        formData.append("course", selectedCourse);
        if (proofFile) {
          formData.append("proofFile", proofFile);
        }
      }

      const response = await addStudentComplaint(formData);
      if (response?.success) {
        toast.success("Complaint submitted successfully.");
        setComplaintText("");
        setSubject("");
        setSelectedCategory("");
        setSelectedCourse("");
        setProofFile(null);
        setComplaints((prev) => [...prev, response.complaint]);

      } else {
        toast.error(response?.response?.data?.message || "Submission failed.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };

  const deleteComplaint = async (complaintId) => {
    try {
      const response = await deleteStudentComaplint({
        student: user._id,
        complaintId: complaintId,
      });

      if (response.success) {
        setComplaints(response.complaints)
        toast.success("Complaint Deleted");
      } else {
        toast.error(response?.response?.data?.message || "An error occured");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "sc-badge-pending";
      case "in-progress":
        return "sc-badge-progress";
      case "resolved":
        return "sc-badge-resolved";
      case "rejected":
        return "sc-badge-rejected";
      default:
        return "sc-badge-pending";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      case "rejected":
        return "Rejected";
      default:
        return "Pending";
    }
  };

  return (
    <div className="sc-main-wrapper">
      <div className="sc-page-header">
        <h1 className="sc-page-title">Student Complaints</h1>
        <p className="sc-page-subtitle">
          Submit a new complaint or check the status of your previous complaints
        </p>
      </div>

      <div className="sc-form-wrapper">
        <h2 className="sc-section-heading">Submit New Complaint</h2>

        <div className="sc-form">
          <div className="sc-form-row">
            <label htmlFor="sc-subject" className="sc-label">
              Subject
            </label>
            <input
              type="text"
              id="sc-subject"
              className="sc-input"
              placeholder="Brief description of your complaint"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="sc-form-row">
            <label htmlFor="sc-category" className="sc-label">
              Category
            </label>
            <select
              id="sc-category"
              className="sc-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {complaintTypes?.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory === "missing result" && (
            <>
              <div className="sc-form-row">
                <label htmlFor="sc-course" className="sc-label">
                  Course
                </label>
                <select
                  id="sc-course"
                  className="sc-select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {courses?.map((course, index) => (
                    <option key={index} value={course._id}>
                      {course.courseCode}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sc-form-row">
                <label htmlFor="sc-file" className="sc-label">
                  Attachments (JPG or PDF only)
                </label>
                <div className="sc-file-upload">
                  <input
                    type="file"
                    id="sc-file"
                    className="sc-file-input"
                    accept=".pdf,image/jpeg"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="sc-file" className="sc-file-label">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Upload File
                  </label>
                  <span className="sc-file-hint">
                    Max 5MB (JPG or PDF only)
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="sc-form-row">
            <div className="sc-label-row">
              <label htmlFor="sc-details" className="sc-label">
                Complaint Details
              </label>
              <button
                type="button"
                className="sc-expand-btn"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Collapse" : "Expand"}
              </button>
            </div>
            <textarea
              id="sc-details"
              className={`sc-textarea ${
                expanded ? "sc-textarea-expanded" : ""
              }`}
              placeholder="Please provide detailed information about your complaint..."
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
            ></textarea>
            <div className="sc-char-count">
              {complaintText.length} / 1000 characters
            </div>
          </div>

          <button className="sc-submit-btn" onClick={handleSubmit}>
            Submit Complaint
          </button>
        </div>
      </div>

      <div className="sc-history-wrapper">
        <h2 className="sc-section-heading">Previous Complaints</h2>
        {complaints?.length > 0 ? (
          <div className="sc-history-list">
            {complaints?.map((complaint) => (
              <div key={complaint?._id} className="sc-complaint-item">
                <div className="sc-complaint-header">
                  <div className="sc-complaint-meta">
                    <h3 className="sc-complaint-subject">
                      {complaint?.complaintType}
                    </h3>
                    <span className="sc-complaint-date">
                      {new Date(complaint?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div
                    className={`sc-status-badge ${getStatusClass(
                      complaint.status
                    )}`}
                  >
                    {getStatusText(complaint?.status)}
                  </div>
                </div>
                <div className="sc-complaint-body">{complaint.description}</div>
                <div className="sc-complaint-footer">
                  {complaint?.status !== "resolved" &&
                    complaint?.status !== "rejected" && (
                      <button
                        className="sc-btn sc-btn-cancel"
                        onClick={() => {
                          deleteComplaint(complaint._id);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="sc-empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>You haven't submitted any complaints yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
