// Add socket connection check and debug logs
import { useEffect, useState } from "react";
import { useUser } from "../../userContext";
import { requestCourseRights, socket } from "../../backendOperation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyCourses() {
  const { user } = useUser();
  const [courseCode, setCourseCode] = useState("");
  const [courses, setCourses] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket.emit("getCourseRequests", user._id, (data) => {
      console.log("test request done");
      if (data.success) {
        setStatusList(data.requests);
        toast.update(toastId, {
          render: "Status fetched",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        toast.dismiss();
      } else {
        toast.update(toastId, {
          render: "Failed to fetch status",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    });
  }, []);

  // Check socket connection status
  useEffect(() => {
    // Check if socket is already connected
    if (socket.connected) {
      console.log("Socket already connected with ID:", socket.id);
      setSocketConnected(true);
    }

    // Listen for socket connection events
    const onConnect = () => {
      console.log(
        "Socket connected in MyCourses component with ID:",
        socket.id
      );
      setSocketConnected(true);
      // Fetch data after connection is established
      fetchCourses();
      fetchRequestStatus();
    };

    const onDisconnect = (reason) => {
      console.log("Socket disconnected in MyCourses:", reason);
      setSocketConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // If not connected, try to connect
    if (!socket.connected) {
      console.log("Socket not connected, attempting to connect...");
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  async function removeCourseRequest(userId, courseCode) {
    const toastId = toast.loading("Removing course request...");

    if (!socketConnected) {
      toast.update(toastId, {
        render: "Socket not connected. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    socket.emit("removeCourseRequest", userId, courseCode, (data) => {
      console.log("Received response for removeCourseRequest:", data);
      if (data.success) {
        toast.update(toastId, {
          render: data.message || "Request removed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setStatusList(data.requests);
      } else {
        toast.update(toastId, {
          render: data.message || "Failed to remove request.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    });
  }

  const fetchCourses = () => {
    if (!socketConnected) {
      console.log("Cannot fetch courses: Socket not connected");
      toast.error("Cannot connect to server. Please refresh the page.");
      return;
    }

    const toastId = toast.loading("Fetching courses...");
    console.log("Emitting getAllCourses event");

    socket.emit("getAllCourses", (data) => {
      console.log("Received response for getAllCourses:", data);
      if (data.success) {
        setCourses(data.courses);
        toast.update(toastId, {
          render: "Courses loaded successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        toast.dismiss();
      } else {
        toast.update(toastId, {
          render: data.message || "Failed to load courses",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    });
  };

  useEffect(() => {
    if (!user?._id) return;
    console.log("User loaded:", user);

    if (socketConnected) {
      fetchCourses();
      fetchRequestStatus();
    }
  }, [user, socketConnected]);

  const fetchRequestStatus = () => {
    if (!user?._id) {
      console.log("Cannot fetch request status: No user ID");
      return;
    }

    if (!socketConnected) {
      console.log("Cannot fetch request status: Socket not connected");
      return;
    }

    const toastId = toast.loading("Fetching request status...");
    console.log("Emitting getCourseRequests event with userId:", user._id);

    socket.emit("getCourseRequests", user._id, (data) => {
      toast.update(toastId, {
        render: data.message,
        autoClose: 2000,
        type: data.success ? "success" : "error",
        isLoading: false,
      });
      setStatusList(data.requests);
    });
  };

  const handleRequest = async () => {
    if (!courseCode) {
      toast.error("Please select a course");
      return;
    }

    const requestBody = {
      lecturerId: user._id,
      courseCode,
    };

    setLoading(true);
    console.log("Sending course rights request:", requestBody);
    const res = await requestCourseRights(requestBody);
    console.log(res);
    if (res.success && res.message) {
      toast.success(res.message);
      toast.dismiss();
      fetchRequestStatus();
    } else {
      toast.error(res.message || "Failed to send request.");
    }
    setLoading(false);
  };

  // Normalize for search (case-insensitive and ignore spaces)
  const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

  const filteredCourses = statusList.filter((req) =>
    normalize(req.courseCode).includes(normalize(searchTerm))
  );

  return (
    <div className="container p-3">
      <ToastContainer />

      {!socketConnected && (
        <div className="alert alert-warning">
          Not connected to server. Some features may not work.
        </div>
      )}

      <div className="requestCourseBox" style={boxStyle}>
        <div style={titleStyle}>Request Course Privileges</div>
        <select
          className="requestCoursesSelect w-50"
          style={selectStyle}
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course, i) => (
            <option key={i} value={course.courseCode}>
              {course.courseCode}
            </option>
          ))}
        </select>
        <div className="requestBoxBtn" style={btnStyle} onClick={handleRequest}>
          {loading ? "Sending..." : "Request Course"}
        </div>
      </div>

      <div className="myCoursesBox" style={{ ...boxStyle, marginTop: 20 }}>
        <div style={titleStyle}>My Course Requests</div>

        <input
          placeholder={"Enter Course Code..."}
          style={inputStyle}
          className="form-control mycoursesSeach w-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th className="text-start">Course Code</th>
              <th className="text-start">Status</th>
              <th className="text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((req, i) => (
                <tr style={{ marginTop: 10 }} key={i}>
                  <td className="text-start">{req.courseCode}</td>
                  <td
                    className="text-start"
                    style={{
                      color:
                        req.status.toLowerCase() === "pending"
                          ? "orange"
                          : req.status.toLowerCase() === "approved"
                          ? "green"
                          : "black",
                    }}
                  >
                    {typeof req.status === "string"
                      ? req.status.charAt(0).toUpperCase() + req.status.slice(1)
                      : "Invalid status"}
                  </td>
                  <td
                    className="text-start bg-danger"
                    onClick={() => {
                      removeCourseRequest(user._id, req.courseCode);
                    }}
                    style={{
                      width: 50,
                      color: "white",
                      left: 50,
                      borderRadius: 3,
                      height: 35,
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center" style={noMatchStyle}>
                  {statusList.length === 0
                    ? "No course requests found"
                    : "Course doesn't exist 😕"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styles
const boxStyle = {
  border: "1px solid black",
  borderColor: "rgb(210, 206, 206)",
  padding: 10,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  borderRadius: 5,
  width: "100%",
};

const titleStyle = {
  fontFamily: "CalibreBold",
  fontSize: "25px",
};

const selectStyle = {
  height: "35px",
  border: "2px solid rgb(210, 206, 206)",
  borderRadius: "3px",
  marginTop: 7,
};

const btnStyle = {
  backgroundColor: "#007bff",
  color: "white",
  marginTop: 13,
  padding: 7,
  borderRadius: "3px",
  cursor: "pointer",
};

const inputStyle = {
  border: "2px solid rgb(210, 206, 206)",
  borderRadius: 3,
  height: "38px",
};

const noMatchStyle = {
  fontStyle: "italic",
  color: "#dc3545",
  padding: "20px",
  fontWeight: "bold",
  fontSize: "18px",
};
