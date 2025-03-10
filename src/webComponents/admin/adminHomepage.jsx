import React, { useState, useEffect } from 'react';
import AdminSideBar from './adminSideBar';
import { Outlet } from 'react-router-dom';

export default function AdminHomepage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Listen for screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex" style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}>
      
      {/* Sidebar/NavBar */}
      <AdminSideBar isOpen={isSidebarOpen} isMobile={isMobile} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div 
        className="p-3 flex-grow-1" 
        style={{ backgroundColor: "white", overflowY: "auto" }}
      >
        <Outlet/>
      </div>
    </div>
  );
}
