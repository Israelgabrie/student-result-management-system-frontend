// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AdminNavBar from './adminNavBar';
// import AdminSideBar from './adminSideBar';
// import { Outlet } from "react-router-dom";

// export default function AdminHomepage() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div 
//       className="adminHomePageContainer" 
//       style={{ 
//         position: "fixed", backgroundColor: "#f8f9fa",
//         minHeight: "100vh", width: "100%",
//         left: 0, top: 0, paddingTop: "65px",
//         display: "flex", flexDirection: "column"
//       }}
//     >
//       {/* Admin Navbar */}
//       <AdminNavBar toggleSidebar={() => setIsOpen(!isOpen)} />

//       <div style={{ display: "flex", flexGrow: 1 }}>
//         {/* Sidebar for larger screens (always visible) */}
//         <div className="d-none d-md-block" style={{ width: "250px" }}>
//           <AdminSideBar />
//         </div>

//         {/* Content area */}
//         <div 
//           style={{ 
//             flexGrow: 1, 
//             overflowY: "auto", 
//             height: "calc(100vh - 77px)",
//             padding: "20px",
//             backgroundColor:"white"
//           }}
//         >
//           <Outlet />
//         </div>
//       </div>

//       {/* Sidebar for mobile (slides from the side) */}
//       {isOpen && (
//         <div 
//           style={{
//             position: "fixed", top: 0, left: 0, 
//             width: "250px", height: "100vh", 
//             backgroundColor: "#343a40", zIndex: 1050,
//             transition: "0.3s ease-in-out"
//           }}
//         >
//           <AdminSideBar closeSidebar={() => setIsOpen(false)} />
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavBar from './adminNavBar';
import AdminSideBar from './adminSideBar';
import { Outlet } from "react-router-dom";

export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
 

  


  return (
    <div
      className="homePageContainer"
      style={{
        position: "fixed",
        backgroundColor: "white",
        minHeight: "100vh",
        width: "100%",
        left: 0,
        top: 0,
        paddingTop: "77px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AdminNavBar toggleSidebar={() => setIsOpen(!isOpen)} />

      <div style={{ display: "flex", flexGrow: 1 }}>
        <div className="d-none d-md-block" style={{ width: "250px" }}>
          <AdminSideBar />
        </div>

        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            height: "calc(100vh - 77px)",
          }}
        >
          <Outlet />
        </div>
      </div>

      <AdminSideBar isOpen={isOpen} isMobile />
    </div>
  );
}

