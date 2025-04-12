import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getLoggedInUser } from '../backendOperation';
import { useUser } from '../userContext';
import LoadingScreen from './loadingScreen';
import { toast, ToastContainer } from 'react-toastify';

export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const loginUser = location.state?.user || null;
  const [loggIn, setLoggedIn] = useState(false); 

  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (loginUser) {
          console.log("User signed in from login page:", loginUser);
          setTimeout(() => {
            setUser(loginUser);
            setLoggedIn(true)
          }, 3000); // Wait 3 seconds before setting user
        } else {
          console.log("Checking user authentication via cookies...");
          const response = await getLoggedInUser();
  
          if (response?.success) {
            console.log("User authenticated via cookies:", response.user);
            setTimeout(() => {
              setUser(response.user);
              toast.success("Logged in successfully");
              setLoggedIn(true)
            }, 3000); // Wait 3 seconds before setting user
          } else {
            console.warn("User not authenticated:", response?.message);
            toast.error(response?.message || "Login required");
  
            setTimeout(() => {
              navigate("/login", { replace: true });
            }, 3000); // Wait 3 seconds before navigation
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("An error occurred while verifying login.");
  
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000); // Wait 3 seconds before navigation
        return;
      }
  
      setLoggedIn(false);
    };
  
    fetchUser();
  }, [loginUser, setUser, navigate]);

  if (!loggIn) {
    return (
      <div >
        <ToastContainer />
         <LoadingScreen />
      </div>
    );
  }

  return (
    <div
      className="homePageContainer"
      style={{
        position: "fixed",
        backgroundColor: "pink",
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
      <NavBar toggleSidebar={() => setIsOpen(!isOpen)} />

      <div style={{ display: "flex", flexGrow: 1 }}>
        <div className="d-none d-md-block" style={{ width: "250px" }}>
          <SideBar />
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

      <SideBar isOpen={isOpen} isMobile />
    </div>
  );
}
