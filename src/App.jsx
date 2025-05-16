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
import SuperAdminHomepage from './webComponents/superAdmin/superAdminHomePage.jsx';
import SuperAdminDashBoard from './webComponents/superAdmin/dashBoard.jsx';
import ApproveCourseRequest from './webComponents/superAdmin/approveCourseRequest.jsx';
import SystemSettings from './webComponents/superAdmin/systemSettings.jsx';
import ApproveResults from './webComponents/superAdmin/approveResult.jsx';
import ManageCourses from './webComponents/superAdmin/manageCourses.jsx';
import ManageAdmins from './webComponents/superAdmin/manageAdmin.jsx';
import ManageStudents from './webComponents/admin/manageStudents.jsx';
import ErrorPage from './webComponents/errorElement.jsx';
import CourseSessionAnalysis from './webComponents/admin/courseAnalysis.jsx';
import AdminSettings from './webComponents/admin/adminSettings.jsx';

// Placeholder Components
const AdminViewResult = () => <div>Admin View Result (Coming Soon)</div>;
const SuperAdminManageUsers = () => <div>Manage Users (Coming Soon)</div>;
const SuperAdminSystemSettings = () => <div>System Settings (Coming Soon)</div>;
const AdminManageStudents = () => <div>Manage Students (Coming Soon)</div>;

document.title = "Mountain Top University Result Management System";

const router = createBrowserRouter([
  { path: "/", element: <Login /> ,errorElement: <ErrorPage />},
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
      { index: true, element: <Navigate to="myCourses" replace /> },
      { path: "upload", element: <AdminUploadResult /> },
      { path: "viewResult", element: <AdminViewResult /> },
      { path: "myCourses", element: <MyCourses /> },
      { path: "settings", element: <AdminSettings /> },
      { path: "manageStudents", element: <ManageStudents /> },
      { path: "courses", element: <CourseSessionAnalysis /> },
    ]
  },
  {
    path: "/superAdmin",
    element: <SuperAdminHomepage />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <SuperAdminDashBoard /> }, 
      { path: "approveRequest", element: <ApproveCourseRequest /> },
      { path: "systemSettings", element: <SystemSettings /> }, 
      { path: "manageResults", element: <ApproveResults /> },
      { path: "manageCourses", element: <ManageCourses /> },
      { path: "manageAdmin", element: <ManageAdmins /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
