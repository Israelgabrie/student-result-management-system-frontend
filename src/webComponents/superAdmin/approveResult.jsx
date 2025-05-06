import React, { useEffect, useState } from "react";
import "../../superAdminCss/approveResult.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext } from "react-router-dom";
import { handleStudentResultApproval } from "../../backendOperation.js";
import { useUser } from "../../userContext.jsx";
import { toast } from "react-toastify";

export default function ApproveResults() {
  const [pendingFilter, setPendingFilter] = useState("");
  const { manageResultData, setManageResultData } = useOutletContext();
  const { user, setUser } = useUser();

  useEffect(() => {
    console.log(manageResultData);
  }, [manageResultData]);

  const filteredPendingResults =
    manageResultData?.latestPending?.filter((result) =>
      [
        result.course?.courseCode,
        result.uploadedBy?.firstName,
        result.uploadedBy?.lastName,
        result.uploadedBy?.idNumber,
      ]
        .join(" ")
        .toLowerCase()
        .includes(pendingFilter.toLowerCase())
    ) || [];


    async function handleResultFunc(resultId, approved) {    
      try {
        const toastId = toast.loading("Updating result...");
        const response = await handleStudentResultApproval({
          userId: user._id,
          approved,
          resultId,
        });
    
        if (response.success) {
          toast.update(toastId, {
            render: `Result ${approved ? "approved" : "rejected"} successfully.`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
          });
    
          setManageResultData((prev) => ({
            ...prev,
            latestApproved: response.latestApproved,
            latestPending: response.latestPending,
          }));
        } else {
          toast.update(toastId, {
            render:
              response?.response?.data?.message ||
              response?.error ||
              "Something went wrong.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
          });
        }
      } catch (err) {
        toast.update(toastId, {
          render: err.message || "An unexpected error occurred.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
        
      }
    }
    

  const approvedResults = manageResultData?.latestApproved || [];

  return (
    <div className="containerBox">
      {/* Pending Results Section */}
      <div className="section-container">
        <div className="sectionHeader">Approve Results</div>
        <p className="sectionSubtext">
          Review and approve or reject results uploaded by administrators.
        </p>

        {/* Filter Form */}
        <form className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter pending results by course, admin, or department..."
            value={pendingFilter}
            onChange={(e) => setPendingFilter(e.target.value)}
          />
        </form>

        <div className="results-card">
          <div className="results-card-header">
            <div className="results-card-title">
              <h3>Pending Results</h3>
              <span className="badge badge-pending">
                {filteredPendingResults.length || 0} Pending
              </span>
            </div>
            <p className="results-card-description">
              Results waiting for your approval
            </p>
          </div>

          <div className="results-card-content">
            {filteredPendingResults.length > 0 ? (
              <div className="table-container">
                <table className="results-table table table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Course</th>
                      <th>Admin</th>
                      <th>ID Number</th>
                      <th>Session</th>
                      <th>Semester</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th className="actions-column">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPendingResults.map((result) => (
                      <tr key={result._id}>
                        <td>{result.course?.courseCode || "N/A"}</td>
                        <td>
                          {result.uploadedBy
                            ? `${result.uploadedBy.firstName} ${result.uploadedBy.lastName}`
                            : "N/A"}
                        </td>
                        <td>{result?.student?.idNumber || "N/A"}</td>
                        <td>{result.session || "N/A"}</td>
                        <td>{result.semester || "N/A"}</td>
                        <td>{`${result.totalScore} / 100`}</td>
                        <td>
                          <span className="badge bg-warning text-dark">
                            Pending
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              handleResultFunc(result._id, true)
                            }
                            className="btn btn-success btn-sm me-2"
                            title="Approve Result"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() =>
                              handleResultFunc(result._id, false)
                            }
                            className="btn btn-danger btn-sm"
                            title="Reject Result"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state text-center">
                <div className="empty-state-icon display-4">!</div>
                <p>No pending results found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Approved Results Section */}
      <div className="section-container mt-5">
        <div className="sectionHeader">Manage Approved Results</div>
        <p className="sectionSubtext">
          View and manage previously approved results. You can delete results if
          needed.
        </p>

        <div className="results-card">
          <div className="results-card-header">
            <div className="results-card-title">
              <h3>Approved Results</h3>
              <span className="badge badge-approved">
                {approvedResults.length} Approved
              </span>
            </div>
            <p className="results-card-description">
              Results that have been approved and published
            </p>
          </div>

          <div className="results-card-content">
            {approvedResults.length > 0 ? (
              <div className="table-container">
                <table className="results-table table table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Course</th>
                      <th>Admin</th>
                      <th>ID Number</th>
                      <th>Session</th>
                      <th>Semester</th>
                      <th>Total</th>
                      <th>Date Approved</th>
                      <th>Status</th>
                      <th className="actions-column">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedResults.map((result) => (
                      <tr key={result._id}>
                        <td>{result.course?.courseCode || "N/A"}</td>
                        <td>
                          {result.uploadedBy
                            ? `${result.uploadedBy.firstName} ${result.uploadedBy.lastName}`
                            : "N/A"}
                        </td>
                        <td>{result.student?.idNumber || "N/A"}</td>
                        <td>{result.session || "N/A"}</td>
                        <td>{result.semester || "N/A"}</td>
                        <td>{`${result.totalScore} / 100`}</td>
                        <td>
                          {new Date(result.approvedAt).toLocaleString()}
                        </td>
                        <td>
                          <span className="badge bg-success">Approved</span>
                        </td>
                        <td>
                          <button
                           onClick={() =>
                            handleResultFunc(result._id, false)
                          }
                            className="btn btn-outline-danger btn-sm"
                            title="Delete Result"
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state text-center">
                <div className="empty-state-icon display-4">!</div>
                <p>No approved results found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
