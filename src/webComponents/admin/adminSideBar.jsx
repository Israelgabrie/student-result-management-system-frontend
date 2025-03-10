import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = window.innerWidth < 768; // Check if it's a mobile screen

  return (
    <>
      {/* Mobile Header with Hamburger Button */}
      {isMobile && (
        <div className="d-flex justify-content-between align-items-center bg-light p-3 shadow w-100 fixed-top">
          <h5 className="m-0">Admin Panel</h5>
          <button className="btn btn-outline-primary" onClick={() => setIsOpen(!isOpen)}>
            <span className="navbar-toggler-icon"></span> {/* Bootstrap Hamburger Icon */}
          </button>
        </div>
      )}

      {/* Sidebar for Desktop (Left Side) */}
      {!isMobile && (
        <div className="bg-light p-3 vh-100 shadow d-none d-md-block " style={{ width: "250px" }}>
          {/* Sidebar Header with Username */}
          <div className="text-start mb-3">
            <h5 className="fw-bold">Admin Panel</h5>
            <p className="text-muted">Gabriel Israel </p>
          </div>
          <SidebarLinks />
        </div>
      )}

      {/* Dropdown Sidebar for Mobile (Slides from Top) */}
      {isMobile && isOpen && (
        <div 
          className="bg-light p-3 w-100 shadow d-block d-md-none position-absolute"
          style={{ top: 50, left: 0, zIndex: 1000, borderRadius: 5 }}
        >
          <SidebarLinks />
        </div>
      )}
    </>
  );
}

// Sidebar Links Component
const SidebarLinks = () => (
  <>
    <NavItem to="upload">Upload Results</NavItem>
    <NavItem to="viewResult">View Results</NavItem>
    <NavItem to="myCourses">My Courses</NavItem>
  </>
);

const NavItem = ({ to, children }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => isActive ? "btn btn-primary text-start mb-2 w-100" : "btn btn-light text-start mb-2 w-100"}
  >
    {children}
  </NavLink>
);
