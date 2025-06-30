import React from "react";
import { useUser } from "../../userContext";
import { toast } from "react-toastify";
import { logUserOut } from "../../backendOperation";

export default function SuperAdminNavBar({ toggleSidebar }) {
  const { user, setUser } = useUser();
  // Function to handle user logout
  async function handleLogout() {
    const toastId = toast.loading("Logging out...");

    try {
      const response = await logUserOut();

      if (response?.success) {
        setUser(null); // Clear user state
        toast.update(toastId, {
          render: "Logged out successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render:
            response?.message ||
            response?.response?.data?.message ||
            "Failed to log out",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Failed to log out",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }
  return (
    <nav
      style={{ margin: 0, boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)" }}
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-1"
    >
      <a className="navbar-brand" href="#">
        <img className="loginImage" src="/img/mtu logo.png" alt="MTU Logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleSidebar} // Toggle the sidebar
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse flex justify-content-center">
        <ul className="navbar-nav me-auto">
          <li className="nav-item d-flex align-items-center justify-content-center">
            <a
              style={{
                fontFamily: "CalibreBold",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 2,
              }}
              className="nav-link text-primary"
              href="#"
            >
              Super Admin Panel
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Super Admin
            </a>
          </li>
        </ul>
        <li className="nav-item d-flex me-3">
          <button className="btn btn-outline-danger" type="submit" onClick={handleLogout}>
            Log Out
          </button>
        </li>
      </div>
    </nav>
  );
}
