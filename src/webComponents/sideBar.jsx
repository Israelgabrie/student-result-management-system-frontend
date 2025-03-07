import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar({ isOpen, isMobile }) {
  return (
    <>
      {/* Sidebar for Laptop (Left Side) */}
      {!isMobile && (
        <div className="bg-light p-3 vh-100 shadow d-none d-md-block" style={{ width: "250px" }}>
          <SidebarLinks />
        </div>
      )}

      {/* Dropdown Sidebar for Mobile (Slides from Top) */}
      {isMobile && (
        <div 
          className={`bg-light p-3 w-100 shadow d-block d-md-none position-absolute transition-top ${isOpen ? "top-0" : "top-100"}`} 
          style={{ left: 0, zIndex: 1000, height: "auto",marginTop:70,borderRadius:5}}
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
    <NavItem to="dashBoard">Dashboard</NavItem>
    <NavItem to="viewResult">View Results</NavItem>
    <NavItem to="courseRegistration">Course Registration</NavItem>
    <NavItem to="academicCalendar">Academic Calendar</NavItem>
    <NavItem to="examSchedule">Exam Schedule</NavItem>
    <NavItem to="downloadReports">Download Reports</NavItem>
    <NavItem to="settings">Settings</NavItem>
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
