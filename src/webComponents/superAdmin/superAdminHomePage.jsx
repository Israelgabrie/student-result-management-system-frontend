import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SuperAdminNavBar from "./navBar";
import SuperAdminSideBar from "./sideBar";
import { Outlet, useNavigate } from "react-router-dom";
import {
  fetchRandomCourses,
  getAllAdmins,
  getAllRequest,
  getLoggedInUser,
  getManageResultData,
  getSuperAdminDashBoardData,
} from "../../backendOperation";
import LoadingScreen from "../loadingScreen";
import { useUser } from "../../userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SuperAdminHomepage() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allRequests, setAllRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [manageResultData, setManageResultData] = useState({});
  const [dashBoardData, setDashBoardData] = useState({});
  const [courses, setCourses] = useState([]);
  const [admins,setAdmins] = useState([]);

  const fetchAllRequests = async (userId) => {
    try {
      const response = await getAllRequest({ userId });
      if (response?.success) setAllRequests(response.requests);
      if (response?.success) setApprovedRequests(response.approvedRequests);
      else toast.error(response?.message || "Failed to fetch requests.");
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching requests."
      );
    }
  };

  const fetchManageResultData = async (userId) => {
    try {
      const response = await getManageResultData({ userId });
      if (response?.success) setManageResultData(response);
      else
        toast.error(response?.message || "Failed to fetch manage Result Data.");
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching requests."
      );
    }
  };

  const fetchDashBoardData = async (userId) => {
    try {
      const response = await getSuperAdminDashBoardData({ userId });
      if (response?.success) setDashBoardData(response);
      else toast.error(response?.message || "Failed to fetch dashboard data.");
    } catch (error) {
      toast.error(
        error?.message || "An error occurred while fetching requests."
      );
    }
  };

  const fetchAllAdmins = async (userId) => {
    try {
      const response = await getAllAdmins({});
      if (response?.success) setAdmins(response.admins);
      else toast.error(response?.message || "Failed to fetch admins.");
    } catch (error) {
      toast.error(
        error?.message || "An error occurred while fetching requests."
      );
    }
  };

  const getRandomCourses = async () => {
    try {
      const response = await fetchRandomCourses({});
      if (response.success) {
        setCourses(response?.courses);
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching courses.");
    }
  };

  

  useEffect(() => {
    const checkAndRedirectUser = async () => {
      try {
        let currentUser = user;

        if (!currentUser?._id) {
          const response = await getLoggedInUser();
          if (!response?.success || !response.user) {
            navigate("/login");
            throw new Error("Login required");
          }

          currentUser = response.user;
          setUser(currentUser);
        }

        const { accountType, _id } = currentUser;

        if (accountType === "student") return navigate("/homePage");
        if (accountType === "admin") return navigate("/admin");
        if (accountType !== "superAdmin") toast.error("Unauthorized access");

        setIsLoggedIn(true);
        fetchAllRequests(_id);
        fetchManageResultData(_id);
        fetchDashBoardData(_id);
        getRandomCourses();
        fetchAllAdmins();
      } catch (error) {
        toast.error(error.message || "Session verification failed");
        navigate("/login");
      }
    };

    checkAndRedirectUser();
  }, [user?._id, navigate, setUser]);

  

  useEffect(() => {
    console.log(user);
  }, [user]);
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
        flexDirection: "column",
      }}
    >
      <ToastContainer />
      <SuperAdminNavBar
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div style={{ display: "flex", flexGrow: 1 }}>
        <div className="d-none d-md-block" style={{ width: "250px" }}>
          <SuperAdminSideBar />
        </div>

        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            height: "calc(100vh - 77px)",
          }}
        >
          <Outlet
            context={{
              allRequests,
              setAllRequests,
              approvedRequests,
              setApprovedRequests,
              manageResultData,
              setManageResultData,
              dashBoardData,
              setDashBoardData,
              courses,
              setCourses,
              admins,
              setAdmins
            }}
          />
        </div>
      </div>

      <SuperAdminSideBar isOpen={isSidebarOpen} isMobile />
    </div>
  );
}
