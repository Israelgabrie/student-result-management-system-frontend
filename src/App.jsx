import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Login from './webComponents/login.jsx';
import SignUp from './webComponents/signUp.jsx';
import Homepage from './webComponents/homepage.jsx';
import Dashboard from './webComponents/dashBoard.jsx';
import ViewResult from './webComponents/viewResult.jsx';
import CourseRegistration from './webComponents/courseRegistration.jsx';
import AcademicCalendar from "./webComponents/admin/academicCalender.jsx";
import AdminHomepage from './webComponents/admin/adminHomepage.jsx';
import AdminUploadResult from './webComponents/admin/adminUploadResult.jsx';
import MyCourses from './webComponents/admin/myCourses.jsx';
import SuperAdminHomepage from './webComponents/superAdmin/homePage.jsx';
import SuperAdminDashBoard from './webComponents/superAdmin/dashBoard.jsx';
import ApproveCourseRequest from './webComponents/superAdmin/approveCourseRequest.jsx';

// Placeholder Components
const AdminViewResult = () => <div>Admin View Result (Coming Soon)</div>;
const SuperAdminManageUsers = () => <div>Manage Users (Coming Soon)</div>;
const SuperAdminSystemSettings = () => <div>System Settings (Coming Soon)</div>;
const AdminManageStudents = () => <div>Manage Students (Coming Soon)</div>;
const AdminSettings = () => <div>Admin Settings (Coming Soon)</div>;

document.title = "Mountain Top University Result Management System";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signUp", element: <SignUp /> },
  {
    path: "/homePage",
    element: <Homepage />,
    children: [
      { index: true, element: <Navigate to="dashBoard" replace /> },
      { path: "dashBoard", element: <Dashboard /> },
      { path: "viewResult", element: <ViewResult /> },
      { path: "courseRegistration", element: <CourseRegistration /> },
      { path: "academicCalendar", element: <AcademicCalendar /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminHomepage />,
    children: [
      { index: true, element: <Navigate to="upload" replace /> },
      { path: "upload", element: <AdminUploadResult /> },
      { path: "viewResult", element: <AdminViewResult /> },
      { path: "myCourses", element: <MyCourses /> },
      { path: "manageStudents", element: <AdminManageStudents /> },
      { path: "settings", element: <AdminSettings /> }
    ]
  },
  {
    path: "/superAdmin",
    element: <SuperAdminHomepage />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <SuperAdminDashBoard /> }, 
      { path: "approveRequest", element: <ApproveCourseRequest /> },
      { path: "systemSettings", element: <SuperAdminSystemSettings /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
