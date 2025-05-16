import axios from "axios";
import { io } from "socket.io-client";

const serverAddress = "http://localhost:4200";

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
    console.log(response);
    return response;
  } catch (error) {
    console.log("Error fetching user: " + error.message);
    return error;
  }
}

export async function addUser(newUser) {
  try {
    const response = await axios.post(`${serverAddress}/user/adduser`, newUser);
    return response;
  } catch (error) {
    console.log("error adding new user " + error.message);
    return error;
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
