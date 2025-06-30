import React, { useState } from "react";
import "../../superAdminCss/complaint.css";
import { useEffect } from "react";
import { useUser } from "../../userContext";
import {
  getAllComplaints,
  getStudentComplaints,
  serverAddress,
  updateComplaint,
} from "../../backendOperation";
import { toast } from "react-toastify";

export default function AdminComplaintManager() {
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const { user } = useUser();
  // Sample complaints data for UI demonstration
  const [complaints, setComplaints] = useState([
    {
      _id: "682b27241a9177fbcd71f719",
      student: {
        _id: "67fe70f5a0ccdcc89feec147",
        name: "John Doe",
        idNumber: "21010306001",
      },
      complaintType: "missing result",
      course: {
        _id: "67fe3225b5bba43a5c449d70",
        courseCode: "CSE 401",
        courseTitle: "Software Engineering",
      },
      description: "I'm missing my result for CSE 401",
      proofFileUrl: "/uploads/complaints/1747658532765-document.pdf",
      status: "pending",
      createdAt: "2025-05-19T12:42:12.802Z",
      updatedAt: "2025-05-19T12:42:12.802Z",
    },
    {
      _id: "682b27241a9177fbcd71f720",
      student: {
        _id: "67fe70f5a0ccdcc89feec148",
        name: "Jane Smith",
        idNumber: "21010306002",
      },
      complaintType: "incorrect grade",
      course: {
        _id: "67fe3225b5bba43a5c449d71",
        courseCode: "MTH 203",
        courseTitle: "Linear Algebra",
      },
      description:
        "My grade for MTH 203 is showing as C but I should have a B based on my scores.",
      proofFileUrl: "/uploads/complaints/1747658532766-evidence.pdf",
      status: "in-progress",
      createdAt: "2025-05-18T10:22:45.802Z",
      updatedAt: "2025-05-19T09:15:30.802Z",
    },
    {
      _id: "682b27241a9177fbcd71f721",
      student: {
        _id: "67fe70f5a0ccdcc89feec149",
        name: "Michael Johnson",
        idNumber: "21010306003",
      },
      complaintType: "registration issue",
      course: {
        _id: "67fe3225b5bba43a5c449d72",
        courseCode: "CSE 207",
        courseTitle: "Computer Architecture",
      },
      description:
        "I can't register for CSE 207 even though I've completed all prerequisites.",
      proofFileUrl: "/uploads/complaints/1747658532767-screenshot.jpg",
      status: "resolved",
      createdAt: "2025-05-15T14:30:22.802Z",
      updatedAt: "2025-05-17T11:42:12.802Z",
    },
  ]);

  async function fetchAllComplaintTypes() {
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

  async function fetchComplaints() {
    try {
      const response = await getAllComplaints();
      if (response.success) {
        setComplaints(response.complaints);
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllComplaintTypes();
    fetchComplaints();
  }, [user?._id]);

  // Selected complaint for detailed view
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Admin response text
  const [adminResponse, setAdminResponse] = useState("");

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "ac-badge-pending";
      case "in progress":
        return "ac-badge-progress";
      case "resolved":
        return "ac-badge-resolved";
      case "rejected":
        return "ac-badge-rejected";
      default:
        return "ac-badge-pending";
    }
  };

  async function updateComplaintStatus(selectedComplaintId, newStatus) {
    try {
      const response = await updateComplaint({
        userId: user?._id,
        complaintId: selectedComplaintId,
        status: newStatus,
      });
      console.log(response)
      if (response?.success) {
        toast.success(
          response?.message || "Complaint status updated successfully"
        );
        setComplaints(response?.complaint); // CORRECT
      } else {
        toast.error(
          response?.response?.data?.message || response?.error ||
            "Unable to update complaint status"
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Get file icon based on file extension
  const getFileIcon = (fileUrl) => {
    if (!fileUrl) return null;

    if (fileUrl.endsWith(".pdf")) {
      return (
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
    } else if (
      fileUrl.endsWith(".jpg") ||
      fileUrl.endsWith(".png") ||
      fileUrl.endsWith(".jpeg")
    ) {
      return (
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
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      );
    } else {
      return (
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      );
    }
  };

  return (
    <div className="ac-main-container">
      <div className="ac-header">
        <h1 className="ac-title">Complaint Management</h1>
        <div className="ac-filters"></div>
      </div>

      <div className="ac-content">
        {/* Complaints List */}
        <div className="ac-complaints-list">
          <div className="ac-list-header">
            <h2 className="ac-list-title">Student Complaints</h2>
            <span className="ac-complaint-count">
              {complaints?.length} complaints
            </span>
          </div>

          <div className="ac-list-container">
            {complaints?.map((complaint) => (
              <div
                key={complaint._id}
                className={`ac-complaint-item ${
                  selectedComplaint?._id === complaint._id ? "ac-selected" : ""
                }`}
                onClick={() => setSelectedComplaint(complaint)}
              >
                <div className="ac-complaint-header">
                  <div className="ac-student-info">
                    <h3 className="ac-student-name">
                      {complaint.student.fullName}
                    </h3>
                    <span className="ac-student-id">
                      {complaint.student.idNumber}
                    </span>
                  </div>
                  <span
                    className={`ac-status-badge ${getStatusBadgeClass(
                      complaint?.status
                    )}`}
                  >
                    {complaint?.status?.charAt(0).toUpperCase() +
                      complaint?.status?.slice(1)}
                  </span>
                </div>

                <div className="ac-complaint-meta">
                  <span className="ac-complaint-type">
                    {complaint?.complaintType}
                  </span>
                  <span className="ac-complaint-date">
                    {formatDate(complaint?.createdAt)}
                  </span>
                </div>

                <div className="ac-complaint-course">
                  <span className="ac-course-code">
                    {complaint?.course?.courseCode}
                  </span>
                  <span className="ac-course-title">
                    {complaint?.course?.courseTitle}
                  </span>
                </div>

                <p className="ac-complaint-preview">
                  {complaint?.description?.length > 100
                    ? complaint?.description?.substring(0, 100) + "..."
                    : complaint?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Complaint Detail View */}
        {selectedComplaint ? (
          <div className="ac-complaint-detail">
            <div className="ac-detail-header">
              <h2 className="ac-detail-title">Complaint Details</h2>
              <div className="ac-detail-actions">
                <button className="ac-action-btn ac-btn-print">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  Print
                </button>
              </div>
            </div>

            <div className="ac-detail-content">
              <div className="ac-detail-section">
                <h3 className="ac-section-title">Student Information</h3>
                <div className="ac-info-grid">
                  <div className="ac-info-item">
                    <span className="ac-info-label">Name</span>
                    <span className="ac-info-value">
                      {selectedComplaint?.student?.fullName}
                    </span>
                  </div>
                  <div className="ac-info-item">
                    <span className="ac-info-label">ID Number</span>
                    <span className="ac-info-value">
                      {selectedComplaint?.student?.idNumber}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ac-detail-section">
                <h3 className="ac-section-title">Complaint Information</h3>
                <div className="ac-info-grid">
                  <div className="ac-info-item">
                    <span className="ac-info-label">Type</span>
                    <span className="ac-info-value">
                      {selectedComplaint?.complaintType}
                    </span>
                  </div>
                  <div className="ac-info-item">
                    <span className="ac-info-label">Course</span>
                    <span className="ac-info-value">
                      {selectedComplaint?.course?.courseCode || "Nan"} -{" "}
                      {selectedComplaint?.course?.courseTitle || "Nan"}
                    </span>
                  </div>
                  <div className="ac-info-item">
                    <span className="ac-info-label">Submitted On</span>
                    <span className="ac-info-value">
                      {formatDate(selectedComplaint.createdAt)}
                    </span>
                  </div>
                  <div className="ac-info-item">
                    <span className="ac-info-label">Last Updated</span>
                    <span className="ac-info-value">
                      {formatDate(selectedComplaint.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ac-detail-section">
                <h3 className="ac-section-title">Description</h3>
                <p className="ac-description">
                  {selectedComplaint?.description}
                </p>
              </div>

              <div className="ac-detail-section">
                <h3 className="ac-section-title">Attached Proof</h3>
                {selectedComplaint.proofFileUrl ? (
                  <a
                    href={`${serverAddress}${selectedComplaint?.proofFileUrl}`}
                    className="ac-file-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getFileIcon(selectedComplaint.proofFileUrl)}
                    <span className="ac-file-name">
                      {selectedComplaint.proofFileUrl.split("/").pop()}
                    </span>
                  </a>
                ) : (
                  <p className="ac-no-file">No file attached</p>
                )}
              </div>

              <div className="ac-detail-section">
                <h3 className="ac-section-title">Update Status</h3>
                <div className="ac-status-update">
                  <select
                    onChange={(e) => {
                      setNewStatus(e.target.value);
                      value = { newStatus };
                    }}
                    className="ac-status-select"
                    defaultValue={selectedComplaint.status}
                  >
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    className="ac-update-btn"
                    onClick={() => {
                      updateComplaintStatus(selectedComplaint._id, newStatus);
                      setSelectedComplaint((prev) => ({
                        ...prev,
                        status: newStatus,
                      }));
                    }}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ac-no-selection">
            <div className="ac-empty-state">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <h3 className="ac-empty-title">No Complaint Selected</h3>
              <p className="ac-empty-text">
                Select a complaint from the list to view details and take action
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
