import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuperAdminNavBar from './navBar';
import SuperAdminSideBar from './sideBar';
import { Outlet } from "react-router-dom";

export default function SuperAdminHomepage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="homePageContainer" 
      style={{ 
        position: "fixed", backgroundColor: "#f8f9fa",
        minHeight: "100vh", width: "100%",
        left: 0, top: 0, paddingTop: "77px",
        overflowY: "hidden", display: "flex", flexDirection: "column"
      }}
    >
      {/* Fix: Use SuperAdminNavBar instead of NavBar */}
      <SuperAdminNavBar toggleSidebar={() => setIsOpen(!isOpen)} />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar for larger screens (always visible) */}
        <div className="d-none d-md-block" style={{ width: "250px" }}>
          <SuperAdminSideBar />
        </div>

        {/* Content area */}
        <div 
          style={{ 
            flexGrow: 1, 
            overflowY: "auto", 
            height: "calc(100vh - 77px)"  
          }}
        >
          <Outlet />
        </div>
      </div>

      {/* Sidebar for mobile (slides from the top) */}
      <SuperAdminSideBar isOpen={isOpen} isMobile />
    </div>
  );
}
