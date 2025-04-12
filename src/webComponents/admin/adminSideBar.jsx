// import React from 'react';
// import { NavLink } from 'react-router-dom';

// export default function AdminSideBar({ closeSidebar }) {
//   return (
//     <div className='bg-light' style={{ width: "250px", height: "100vh", color: "black", padding: "20px" }}>
//       <h5 style={{ textAlign: "left" }}>Admin Panel</h5>
//       <ul className="nav flex-column align-items-start">
//         <li className="nav-item" >
//           <NavLink
//           style={{borderRadius:3}}
//             to="/admin/myCourses"
//             className={({ isActive }) => `nav-link text-dark w-100 p-2 ${isActive ? "bg-primary text-white" : ""}`}
//           >
//             My Courses
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink
//           style={{borderRadius:3}}
//             to="/admin/manageStudents"
//             className={({ isActive }) => `nav-link text-dark w-100 p-2 ${isActive ? "bg-primary text-white" : ""}`}
//           >
//             Manage Students
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink
//           style={{borderRadius:3}}
//             to="/admin/upload"
//             className={({ isActive }) => `nav-link text-dark w-100 p-2 ${isActive ? "bg-primary text-white" : ""}`}
//           >
//             Upload Results
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink
//           style={{borderRadius:3}}
//             to="/admin/settings"
//             className={({ isActive }) => `nav-link text-dark w-100 p-2 ${isActive ? "bg-primary text-white" : ""}`}
//           >
//             Settings
//           </NavLink>
//         </li>
//       </ul>

//       {closeSidebar && (
//         <button className="btn btn-danger mt-3 w-100" onClick={closeSidebar}>Close</button>
//       )}
//     </div>
//   );
// }


import React from "react";
import { NavLink } from "react-router-dom";

// this is the side bar for the students home page
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
    <NavItem to="/admin/myCourses">My Courses</NavItem>
    <NavItem to="/admin/manageStudents">Manage Students</NavItem>
    <NavItem to="/admin/upload">Upload Results</NavItem>
    <NavItem to="/admin/settings">Settings</NavItem>
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

