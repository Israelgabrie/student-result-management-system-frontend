import React from "react";
import "../css/sideBar.css";

export default function SideBar() {
  return (
    <div className="d-none flex-column p-3 bg-light vh-100 d-lg-flex" style={{ width: "250px" ,height:"100%",overflow:"hidden",boxShadow:"2px 2px 5px rgba(0, 0, 0, 0.1)"}}>
      <button className="btn btn-light text-start mb-2 w-100 sidebar-btn">Dashboard</button>
      <button className="btn btn-light text-start mb-2 w-100 sidebar-btn">View Results</button>
      <button className="btn btn-light text-start mb-2 w-100 sidebar-btn">Course Registration</button>
      <button className="btn btn-light text-start mb-2 w-100 sidebar-btn">Academic Calendar</button>
      <button className="btn btn-light text-start mb-2 w-100 sidebar-btn">Exam Schedule</button>
      <button className="btn btn-light text-start mb-2 w-100 sidebar-btn">Download Reports</button>
      <button className="btn btn-light text-start mb-2 w-100 sidebar-btn">Settings</button>
    </div>
  );
}
