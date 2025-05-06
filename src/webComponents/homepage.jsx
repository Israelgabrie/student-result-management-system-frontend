import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuperAdminNavBar from './navBar';
import SuperAdminSideBar from './sideBar';
import { Outlet, useNavigate } from "react-router-dom";
import { getLoggedInUser } from '../backendOperation';
import LoadingScreen from './loadingScreen';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../userContext';
import { socket } from '../backendOperation';
import NavBar from './navBar';
import SideBar from './sideBar';


// This is the homepage componenet for the students
export default function Homepage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let currentUser = user;

        if (!currentUser) {
          const response = await getLoggedInUser();

          if (response?.success) {
            setIsLoggedIn(true)
            currentUser = response.user;
            setUser(currentUser);
            toast.success("Logged in successfully");
          } else {
            toast.error(response?.message || "Login required");
            navigate("/login", { replace: true });
            return;
          }
        }

        // Redirect based on role
        if (currentUser.accountType === "student") {
          
        }
        if (currentUser.accountType === "admin") {
          navigate("/admin", { replace: true });
          return;
        }

        if (currentUser.accountType === "superAdmin") {
          navigate("/superAdmin", { replace: true });
          return;
        }

        // Only superAdmin gets here
        setIsLoggedIn(true);

        // Listen for privilege requests
        socket.emit("join-super-admin-room", currentUser._id);
        socket.on("newPrivilegeRequest", (data) => {
          toast.info(`New privilege request: ${data.courseCode} by ${data.lecturerName}`);
        });

      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("An error occurred while verifying login.");
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      socket.off("newPrivilegeRequest");
      socket.disconnect();
    };
  }, [user, setUser, navigate]);

  if (!isLoggedIn) {
    return (
      <>
        <ToastContainer />
        <LoadingScreen />
      </>
    );
  }

  return (
    <div
      className="homePageContainer"
      style={{
        position: "fixed",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        width: "100%",
        left: 0,
        top: 0,
        paddingTop: "77px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <ToastContainer />
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar for larger screens */}
        <div className="d-none d-md-block" style={{ width: "250px" }}>
          <SideBar />
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

      {/* Sidebar for mobile */}
      <SideBar isOpen={isSidebarOpen} isMobile />
    </div>
  );
}
