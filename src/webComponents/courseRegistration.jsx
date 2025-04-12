// import React, { useEffect, useState } from "react";
// import "../css/courseRegistraton.css";
// import { UploadIcon } from "../assets/svg";
// import { useUser } from "../userContext";
// import axios from "axios";

// export default function CourseRegistration() {
//   const { user, setUser } = useUser();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Handle file selection
//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   // Handle form submission
//   const handleUpload = async (event) => {
//     event.preventDefault();
//     if (!selectedFile) {
//       alert("Please select a file to upload.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append("id", user.idNumber);
  
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:3500/user/upload",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
  
//       console.log("Full Response:", response);
  
//       if (response.data.success) {
//         // Ensure we get the student details and courses from the response
//         const { name, semester, idNumber, session, totalUnit, totalCourses, courses } = response.data.data;

//         // Update the user data with student details (optional)
//         setUser((prevUser) => ({
//           ...prevUser,
//           name,
//           semester,
//           idNumber,
//           session,
//           totalUnit,
//           totalCourses,
//         }));

//         // Set the courses in the state
//         setCourses(courses);
//       } else {
//         alert("Failed to process file.");
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error.response || error);
//       alert("Error processing file.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="homePageContent w-100 p-3 d-flex flex-column align-items-start justify-content-start rounded-1"
//       style={{
//         backgroundColor: "white",
//         flexGrow: 1,
//         overflowY: "auto",
//         height: "100%",
//       }}
//     >
//       <div className="courseRegHead">Upload Course Registration</div>
//       <form className="courseRegInputBoxes" onSubmit={handleUpload}>
//         <div className="courseRegInputBox">
//           <input type="file" accept=".pdf" onChange={handleFileChange} />
//           <label className="uploadCourseRegLabel">
//             <input
//               type="file"
//               accept=".pdf"
//               onChange={handleFileChange}
//               hidden
//             />
//             {selectedFile ? selectedFile.name : "Upload Course Registration"}
//           </label>
//         </div>
//         <button type="submit" className="uploadCourseRegBtn" disabled={loading}>
//           {loading ? "Uploading..." : <UploadIcon />}
//         </button>
//       </form>

//       <div className="selctedCoursesHead">Selected Courses</div>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th scope="col" className="tableHaad text-start">
//               Course
//             </th>
//             <th scope="col" className="tableHaad text-start">
//               Code
//             </th>
//             <th scope="col" className="tableHaad text-start">
//               Unit
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.length > 0 ? (
//             courses.map((course, index) => (
//               <tr key={index}>
//                 <th scope="row" className="tableValue text-start">
//                   {course.courseTitle}
//                 </th>
//                 <td className="tableValue text-start">{course.courseCode}</td>
//                 <td className="tableValue text-start">{course.unit}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="text-center">
//                 No courses found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useState } from 'react';
import "../css/courseRegistraton.css";
import { UploadIcon } from '../assets/svg';
import axios from 'axios';

export default function CourseRegistration() {
  const [courses, setCourses] = useState([]);
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3500/user/upload", formData);
      if (res.data.success) {
        setCourses(res.data.data.courses);
        setStudentData(res.data.data);
      } else {
        alert("Failed to parse the file.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homePageContent w-100 p-3 d-flex flex-column align-items-start justify-content-start rounded-1"
      style={{ backgroundColor: "white", flexGrow: 1, overflowY: "auto", height: "100%" }}
    >
      <div className='courseRegHead'>Upload Course Registration</div>

      <form className='courseRegInputBoxes' onSubmit={handleUpload}>
        <div className='courseRegInputBox'>
          <input
            type='file'
            id="fileInput"
            name="file"
            accept=".pdf"
            onChange={handleFileChange}
            hidden
          />
          <label className='uploadCourseRegLabel' htmlFor="fileInput">
            {selectedFile ? selectedFile.name : "Choose PDF"}
          </label>
        </div>

        <button type='submit' className='uploadCourseRegBtn' disabled={loading}>
          {loading ? "Uploading..." : <><UploadIcon /> <div>Upload</div></>}
        </button>
      </form>

      {studentData.idNumber && (
        <div className="mt-3">
          <p><strong>ID Number:</strong> {studentData.idNumber}</p>
          <p><strong>Session:</strong> {studentData.session}</p>
          <p><strong>Semester:</strong> {studentData.semester}</p>
          <p><strong>Total Courses:</strong> {studentData.totalCourses}</p>
          <p><strong>Total Units:</strong> {studentData.totalUnit}</p>
        </div>
      )}

      <div className="selctedCoursesHead">Selected Courses</div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="tableHaad text-start">Course</th>
            <th className="tableHaad text-start">Code</th>
            <th className="tableHaad text-start">Unit</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={index}>
                <td className="tableValue text-start">{course.courseTitle}</td>
                <td className="tableValue text-start">{course.courseCode}</td>
                <td className="tableValue text-start">{course.unit}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No courses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}