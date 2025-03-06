import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navBar';
import SideBar from './sideBar';
import Dashboard from './dashBoard';
import ViewResult from './viewResult';

export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="homePageContainer" 
      style={{ 
        position: "fixed", backgroundColor: "pink",
        minHeight: "100vh", width: "100%",
        left: 0, top: 0, paddingTop: "77px",
        overflowY:"hidden", display: "flex", flexDirection: "column"
      }}
    >
      <NavBar />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <SideBar />
        <div 
          style={{ 
            flexGrow: 1, 
            overflowY: "auto", 
            height: "calc(100vh - 77px)"  // Ensures only this section is scrollable
          }}
        >
          {/* <Dashboard /> */}
          <ViewResult/>
        </div>
      </div>       
    </div>
  );
}
