import axios from "axios";
import { io } from "socket.io-client";

export const serverAddress = "http://localhost:4200";

// Initialize socket after importing io
export const socket = io(serverAddress, {
  withCredentials: true,
  autoConnect: true, // Ensure socket connects automatically
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Try to reconnect 5 times
  reconnectionDelay: 1000, // Start with a 1s delay
});

// Add socket connection event listeners for debugging
socket.on("connect", () => {
  console.log("Socket connected successfully with ID:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

export async function getUser(requestBody) {
  try {
    console.log(
      "getting user with id number " +
        requestBody.idNumber +
        " and password " +
        requestBody.password
    );
    const response = await axios.post(
      `${serverAddress}/user/getUser`,
      requestBody,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Error fetching user: " + error.message);
    return error;
  }
}

export async function addUser(newUser) {
  try {
    const response = await axios.post(`${serverAddress}/user/adduser`, newUser);
    console.log(response)
    return response;
  } catch (error) {
    console.log(error)
    console.log("error adding new user " + error.message);
    return error.response;
  }
}

export async function getDepartment(newUser) {
  try {
    const response = await axios.get(`${serverAddress}/getDepartment`);
    return response;
  } catch (error) {
    console.log("error fetching department " + error.message);
    return error;
  }
}

export async function getLoggedInUser() {
  try {
    console.log(
      "Getting logged-in user with cookies inside backend operations..."
    );
    const response = await axios.get(`${serverAddress}/user/getLoggedInUser`, {
      withCredentials: true,
    });

    return response.data; // Ensure only the user data is returned
  } catch (error) {
    console.log("Error fetching user:", error.message);
    return error;
  }
}

export async function uploadResult(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/admin/uploadResult`,
      requestObject,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error uploading student result", error.message);
    return error;
  }
}

export async function requestCourseRights(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/admin/uploadRight`,
      requestObject,
      {
        withCredentials: true,
      }
    );

    console.log("Request response received:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error sending privilege request:", error.message);
    return error;
  }
}

export async function getLecturerPrivileges(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/admin/getLecturerPrivileges`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error getting lectrer privilledges", error.message);
    return error;
  }
}

export async function getRequestStatus(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/admin/getRequestStatus`,
      requestObject,
      {
        withCredentials: true,
      }
    );

    console.log("Request response received:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error sending privilege request:", error.message);
    return error;
  }
}

export async function getUploadResultData(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/admin/uploadResultData`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error getting upload result data:", error.message);
    return error;
  }
}

export async function downloadCourseResultPdf({ courseCode, session }) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/generateCourseResultPdf`,
      { courseCode, session },
      {
        responseType: "blob", // ⬅️ Important to handle binary PDF
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create a link and trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Construct a filename
    const filename = session
      ? `${courseCode}_${session}_results.pdf`
      : `${courseCode}_all_sessions_results.pdf`;

    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error("Failed to download course result PDF", error);
    return { success: false, error: error.message };
  }
}


export async function getManageStudentData(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/admin/studentPerformance`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error getting upload result data:", error.message);
    return error;
  }
}

export async function changeSemesterDetails(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/updateSettings`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error gettig all requests:", error.message);
    return error;
  }
}

export async function getAllRequest(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/allRequests`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error gettig all requests:", error.message);
    return error;
  }
}

export async function handleRequest(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/handleRequest`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error handling admin request:", error.message);
    return error;
  }
}

export async function handleStudentResultApproval(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/handleResultApproval`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error handling admin request:", error.message);
    return error;
  }
}

export async function getSuperAdminDashBoardData(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/dashboardData`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error handling admin request:", error.message);
    return error;
  }
}

export async function getManageResultData(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/manageResultData`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error handling admin request:", error.message);
    return error;
  }
}

export async function addNewCourse(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/addCourse`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error handling admin request:", error.message);
    return error;
  }
}

export async function fetchRandomCourses(requestObject) {
  try {
    const response = await axios.get(
      `${serverAddress}/superAdmin/randomCourses`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error handling admin request:", error.message);
    return error;
  }
}

export async function deleteCourse(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/deleteCourse`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error handling admin request:", error.message);
    return error;
  }
}

export async function searchCourse(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/searchCourse`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error handling admin request:", error.message);
    return error;
  }
}

export async function getAllAdmins(requestObject) {
  try {
    const response = await axios.get(
      `${serverAddress}/superAdmin/getAdmins`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error handling admin request:", error.message);
    return error;
  }
}

export async function searchAdmins(requestObject) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/searchAdmins`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error handling admin request:", error.message);
    return error;
  }
}

export async function fetchCourseOrSessionAnalysis(payload) {
  try {
    const { data } = await axios.post(
      `${serverAddress}/admin/course-session-analysis`,
      payload,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch course/session analysis:", error);
    return { success: false, error: error.message };
  }
}

export async function fetchCourseAndSession(payload) {
  try {
    const { data } = await axios.get(
      `${serverAddress}/admin/courses-and-sessions`,
      payload,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch course/session analysis:", error);
    return { success: false, error: error.message };
  }
}

export async function logUserOut() {
  try {
    const { data } = await axios.post(
      `${serverAddress}/user/logout`,
      {}, // body (empty since logout doesn't require any data)
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("Failed to log user out", error);
    return { success: false, error: error.message };
  }
}

export async function getSemesterAndNext(payload) {
  try {
    const { data } = await axios.get(
      `${serverAddress}/admin/semester/current-next`,
      payload,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch current and next semester :", error);
    return { success: false, error: error.message };
  }
}

export async function uploadMarkSheetFunc(payload) {
  try {
    const formData = new FormData();
    formData.append("file", payload.file); // ✅ attaches the file
    formData.append("userId", payload.userId); // ✅ attaches the userId

    const response = await axios.post(
      `${serverAddress}/admin/upload-marksheet`, // ❌ removed extra slash
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ required for file uploads
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to upload marksheet", error);
    return { success: false, error: error.message };
  }
}

export async function downloadMarkSheetFunc(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/admin/generate-marksheet`,
      payload,
      {
        responseType: "blob", // 👈 KEY STEP
        withCredentials: true,
      }
    );

    // Create a Blob from the response
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a temporary link to trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marksheet.xlsx"; // Optional: customize filename
    document.body.appendChild(a);
    a.click();

    // Cleanup
    a.remove();
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error("Failed to download marksheet", error);
    return { success: false, error: error.message };
  }
}

export async function changeAdminPassword(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/admin/change-password`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to change admin password:", error);
    return { success: false, error: error.message };
  }
}

export async function studentDashBoardSummary(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/student/studentResultSummary`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed get student dashboard data", error);
    return { success: false, error: error.message };
  }
}

export async function getStudentResult(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/student/viewResult`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed get student result", error);
    return { success: false, error: error.message };
  }
}

export async function getStudentResultSessions(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/student/studentResultSessions`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed get student results sessions", error);
    return { success: false, error: error.message };
  }
}

export async function getCourseAnalysis(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/student/courseAnalysis`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed get student course analysis", error);
    return { success: false, error: error.message };
  }
}

export async function getStudentComplaints(payload) {
  try {
    const response = await axios.get(
      `${serverAddress}/student/getComplaintTypes`,
      payload,
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed get student complaints", error);
    return { success: false, error: error.message };
  }
}

export async function getAllCourses() {
  try {
    const response = await axios.get(`${serverAddress}/student/courses`);
    return response.data;
  } catch (error) {
    console.error("Failed get all courses", error);
    return { success: false, error: error.message };
  }
}

export async function addStudentComplaint(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/student/addComplaint`,
      payload,
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to add student complaints", error);
    return { success: false, error: error.message };
  }
}

export async function fetchStudentComplaints(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/student/getStudentComplaints`,
      payload,
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed get student complaints", error);
    return { success: false, error: error.message };
  }
}

export async function deleteStudentComaplint(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/student/deleteStudentComplaint`,
      payload,
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed get delete student complaints", error);
    return { success: false, error: error.message };
  }
}


export async function downloadStudentResultPdf(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/student/downloadResult`,
      payload,
      {
        responseType: "blob", // Important for downloading files
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${payload.matricNumber}_result_${payload.session.replace("/", "-")}.pdf`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error("Failed to download student result", error);
    return { success: false, error: error.message };
  }
}


export async function getAllComplaints(payload) {
  try {
    const response = await axios.get(
      `${serverAddress}/superAdmin/allComplaints`,
      payload,
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed get student complaints", error);
    return { success: false, error: error.message };
  }
}

export async function updateComplaint(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/updateComplaintStatus`,
      payload,
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed get update complaint status", error);
    return { success: false, error: error.message };
  }
}

export async function getallEvents(payload) {
  try {
    const response = await axios.get(
      `${serverAddress}/superAdmin/events`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed get update complaint status", error);
    return { success: false, error: error.message };
  }
}

export async function addEvent(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/add-event`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed get update complaint status", error);
    return { success: false, error: error.message };
  }
}

export async function deleteEvent(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/superAdmin/deleteEvent`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed get update complaint status", error);
    return { success: false, error: error.message };
  }
}

export async function getAllSessions() {
  try {
    const response = await axios.get(`${serverAddress}/student/getAllSessions`);
    return response.data;
  } catch (error) {
    console.error(`error getting sessions ${error}`);
    return { success: false, error: error.message };
  }
}

export async function addCourseFeedback(payload) {
  try {
    const response = await axios.post(
      `${serverAddress}/student/addCourseFeedback`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed get update complaint status", error);
    return { success: false, error: error.message };
  }
}

export async function randomCourseFeedback(payload) {
  try {
    const response = await axios.get(
      `${serverAddress}/student/randomCourseFeedback`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed get update complaint status", error);
    return { success: false, error: error.message };
  }
}

export async function searchCourseFeedback(payload) {
  try {
    const response = await axios.get(
      `${serverAddress}/student/searchCourseFeedback`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed get update complaint status", error);
    return { success: false, error: error.message };
  }
}

export async function getActiveSemesterAndSession(payload) {
  try {
    const response = await axios.get(
      `${serverAddress}/student/getActiveSemesterAndSession`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed gettinf active semester and session", error);
    return { success: false, error: error.message };
  }
}
