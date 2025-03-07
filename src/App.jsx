import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Login from './webComponents/login.jsx';
import SignUp from './webComponents/signUp.jsx';
import Homepage from './webComponents/homepage.jsx';
import Dashboard from './webComponents/dashBoard.jsx';
import ViewResult from './webComponents/viewResult.jsx';
import CourseRegistration from './webComponents/courseRegistration.jsx';

document.title = "Mountain Top University Result Management System";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/homePage",
    element: <Homepage />,
    children: [
      { index: true, element: <Navigate to="dashBoard" replace /> },  // Redirect /homePage to /homePage/dashBoard
      { path: "dashBoard", element: <Dashboard /> },
      { path: "viewResult", element: <ViewResult /> },
      { path: "courseRegistration", element: <CourseRegistration /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
