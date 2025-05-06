import React, { useEffect } from "react";
import { handleRequest } from "../../backendOperation";
import "../../superAdminCss/approveCourseRequest.css";
import { useUser } from "../../userContext";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

export default function ApproveCourseRequest() {
  const { user } = useUser();
  const { allRequests, setAllRequests, approvedRequests,setApprovedRequests } = useOutletContext();

  async function handleRequestAction(requestId, requestOption) {
    const action = requestOption ? "Accepting" : "Revoking";
    const toastId = toast.loading(`${action} request...`);

    try {
      const response = await handleRequest({
        userId: user._id,
        requestId,
        approved: requestOption,
      });

      if (response.success) {
        toast.update(toastId, {
          render: response.message || `Request ${requestOption ? "accepted" : "revoked"} successfully`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setAllRequests(response.requests);
        setApprovedRequests(response.approvedRequests);
      } else {
        toast.update(toastId, {
          render: response.message || "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="homePageContent containerBox">
      {/* Pending Section */}
      <div className="sectionHeader">Approve Course Requests</div>
      <p className="sectionSubtext">Approve or reject course requests from lecturers.</p>
      <div className="courseRequesTableBox">
        <div className="courseRequesTableHead">Pending Requests</div>
        <table className="customTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allRequests?.length > 0 ? (
              allRequests.map((req, index) => (
                <tr key={index}>
                  <td>{`${req.lecturer.firstName} ${req.lecturer.lastName}`}</td>
                  <td>{req.courseCode}</td>
                  <td>{new Date(req.createdAt).toLocaleString()}</td>
                  <td>
                    <button className="actionBtn approve" onClick={() => handleRequestAction(req._id, true)}>Approve</button>
                    <button className="actionBtn reject" onClick={() => handleRequestAction(req._id, false)}>Reject</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="noData">No pending requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Approved/Revocation Section */}
      <div className="sectionHeader mt-4">Revoke Privileges</div>
      <p className="sectionSubtext">Remove upload rights from lecturers.</p>
      <div className="courseRequesTableBox">
        <div className="courseRequesTableHead">Approved Privileges</div>
        <table className="customTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Date Approved</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {approvedRequests?.length > 0 ? (
              approvedRequests?.map((req, index) => (
                <tr key={index}>
                  <td>{`${req.lecturer.firstName} ${req.lecturer.lastName}`}</td>
                  <td>{req.courseCode}</td>
                  <td>{new Date(req.updatedAt || req.createdAt).toLocaleString()}</td>
                  <td>
                    <button className="actionBtn revoke" onClick={() => handleRequestAction(req._id, false)}>Revoke</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="noData">No approved privileges found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
