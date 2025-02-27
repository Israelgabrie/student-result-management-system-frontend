import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './webComponents/login.jsx';
import SignUp from './webComponents/signUp.jsx';
import Homepage from './webComponents/homepage.jsx';

document.title = "Mountain Top Univeristy Result Management System";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
  {
    path: '/homePage',
    element: <Homepage />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
