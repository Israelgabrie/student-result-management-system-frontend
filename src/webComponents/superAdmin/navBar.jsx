import React from 'react';

export default function SuperAdminNavBar({ toggleSidebar }) {
  return (
    <nav style={{ margin: 0, boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)" }} className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-1">
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
              style={{ fontFamily: "CalibreBold", fontSize: 20, fontWeight: "bold", marginTop: 2 }} 
              className="nav-link text-primary" 
              href="#"
            >
              Super Admin Panel
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">Super Admin</a>
          </li>
        </ul>
        <li className="nav-item d-flex me-3">
          <button className="btn btn-outline-danger" type="submit">Log Out</button>
        </li>
      </div>
    </nav>
  );
}
