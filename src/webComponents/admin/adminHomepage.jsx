import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AdminNavBar from "./adminNavBar";
import AdminSideBar from "./adminSideBar";
import LoadingScreen from "../loadingScreen";
import { useUser } from "../../userContext";
import {
  getLecturerPrivileges,
  getLoggedInUser,
  getUploadResultData,
} from "../../backendOperation";

export default function AdminHomepage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [uploadResultData, setUploadResultData] = useState({courses:"",uploadedResults:""});



  // ✅ FIX: receive `user` as a parameter
  async function getUploadData(user) {
    const loadToast = toast.loading("Loading upload result data");
    try {
      console.log(user?._id)
      const response = await getUploadResultData({ userId: user?._id });
      setUploadResultData(response)
      if (response?.success) {
        toast.update(loadToast, {
          render: "upload data fetched successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.error(response.message || "Error getting upoad result data");
      }
    } catch (error) {
      console.error("Error fetching admin courses:", error);
      toast.update(loadToast, {
        render: error.message || "Failed to load courses.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      toast.dismiss()
    }
  }

  useEffect(() => {
    if (user?._id) {
      getUploadData(user); // ✅ pass user into the function
    }
  }, [user?._id]);

  useEffect(() => {

    const handleRedirect = (accountType) => {
      switch (accountType) {
        case "superAdmin":
          navigate("/superAdmin");
          break;
        case "student":
          navigate("/homePage");
          break;
        case "lecturer":
          // Allowed
          break;
        case "admin":
          // Allowed
          break;
        default:
          throw new Error("Unrecognized account type.");
      }
    };


    const verifyUserSession = async () => {
      try {
        if (!user || !user._id) {
          const response = await getLoggedInUser();
          const currentUser = response?.user;
          console.log(currentUser)

          if (!currentUser || !currentUser._id) {
            toast.error("No active user session found.");
          }

          setUser(currentUser);
          handleRedirect(currentUser.accountType);
        } else {
          handleRedirect(user.accountType);
        }
      } catch (error) {
        console.error("User session verification failed:", error);
        toast.error("Session expired or invalid. Please log in again.");
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    verifyUserSession();
  }, [user?._id]);

  if (loading || !user?._id) {
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
      <ToastContainer />
      <AdminNavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

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
          <Outlet  context={{uploadResultData,setUploadResultData}}/>
        </div>
      </div>

      <AdminSideBar isOpen={isSidebarOpen} isMobile />
    </div>
  );
}
