import React from "react";
import { NavLink } from "react-router-dom";

export default function SuperAdminSideBar({ isOpen, isMobile }) {
  return (
    <>
      {/* Sidebar for Laptop (Left Side) */}
      {!isMobile && (
        <div className="bg-light p-3 vh-100 shadow d-none d-md-block" style={{ width: "250px" }}>
          <SuperAdminSidebarLinks />
        </div>
      )}

      {/* Dropdown Sidebar for Mobile (Slides from Top) */}
      {isMobile && (
        <div 
          className={`bg-light p-3 w-100 shadow d-block d-md-none position-absolute transition-top ${isOpen ? "top-0" : "top-100"}`} 
          style={{ left: 0, zIndex: 1000, height: "auto", marginTop: 70, borderRadius: 5 }}
        >
          <SuperAdminSidebarLinks />
        </div>
      )}
    </>
  );
}

// Sidebar Links Component for Super Admin
const SuperAdminSidebarLinks = () => (
  <>
    <NavItem to="dashBoard">Dashboard</NavItem>
    <NavItem to="manageLecturers">Manage Lecturers</NavItem>
    <NavItem to="approveRequest">Approve Course Requests</NavItem>
    <NavItem to="manageCourses">Manage Courses</NavItem>
    <NavItem to="viewResults">View Uploaded Results</NavItem>
    <NavItem to="systemSettings">System Settings</NavItem>
    <NavItem to="adminAccounts">Manage Admin Accounts</NavItem>
    <NavItem to="helpSupport">Help/Support</NavItem>
  </>
);

const NavItem = ({ to, children }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => isActive ? "btn btn-primary text-start mb-2 w-100 sidebar-btn" : "btn btn-light text-start mb-2 w-100 sidebar-btn"}
  >
    {children}
  </NavLink>
);
