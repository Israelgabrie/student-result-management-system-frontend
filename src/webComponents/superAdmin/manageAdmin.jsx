import React, { useEffect, useState } from "react";
import "../../superAdminCss/manageAdmin.css";
import { useOutletContext } from "react-router-dom";
import { searchAdmins } from "../../backendOperation";
import { toast } from "react-toastify";

export default function ManageAdmins() {
  const { admins } = useOutletContext();
  const [term, setTerm] = useState("");
  const [displayedAdmins, setDisplayedAdmins] = useState([]);

  useEffect(() => {
    if (admins && admins.length > 0) {
      setDisplayedAdmins(admins);
    }
  }, [admins]);

  async function handleSearch() {
    if (!term.trim()) {
      setDisplayedAdmins(admins); // Reset to default if term is empty
      return;
    }

    try {
      const response = await searchAdmins({ term: term.trim() });

      if (response?.success) {
        setDisplayedAdmins(response.admins || []);
      } else {
        toast.error(
          response?.response?.data?.message ||
            response?.message ||
            "An unknown error occurred"
        );
      }
    } catch (err) {
      toast.error("Search failed. Please try again.");
    }
  }

  return (
    <div className="am-container">
      <div className="am-header">
        <h1 className="am-title">Admin Management</h1>
        <p className="am-subtitle">
          Add, search, and manage system administrators and lecturers
        </p>
      </div>

      {/* Search & Manage Admins Section */}
      <div className="am-panel am-manage-panel">
        <div className="am-panel-header">
          <div className="am-panel-title-wrapper">
            <span className="am-panel-icon">🔍</span>
            <h2 className="am-panel-title">Manage Admins</h2>
          </div>
          <p className="am-panel-desc">
            Search or view existing administrator accounts
          </p>
        </div>

        <div className="am-panel-body">
          <div className="am-search-filter-wrapper">
            <div className="am-search-wrapper">
              <input
                type="text"
                placeholder="Search admins..."
                className="am-search-input"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <button onClick={handleSearch} className="am-btn am-btn-search">
                Search
              </button>
            </div>
          </div>

          <div className="am-table-container">
            <table className="am-table">
              <thead>
                <tr>
                  <th className="am-th">Name</th>
                  <th className="am-th">Email</th>
                  <th className="am-th">ID Number</th>
                  <th className="am-th">Role</th>
                  <th className="am-th">Approved Courses</th>
                  <th className="am-th">Results Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {displayedAdmins?.length > 0 ? (
                  displayedAdmins.map((admin) => (
                    <tr className="am-tr" key={admin?.id}>
                      <td className="am-td">{admin?.name}</td>
                      <td className="am-td">{admin?.email}</td>
                      <td className="am-td">{admin?.idNumber}</td>
                      <td className="am-td">
                        <span className="am-badge am-badge-admin">Admin</span>
                      </td>
                      <td className="am-td">{admin?.approvedCourses}</td>
                      <td className="am-td">
                        <span
                          className="am-badge am-badge-active"
                          style={{ borderRadius: 3 }}
                        >
                          {admin?.resultsUploaded}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="am-td" colSpan={6}>
                      No admins found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="am-table-footer">
            <div className="am-table-info">
              Showing {displayedAdmins?.length || 0} Admins
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
