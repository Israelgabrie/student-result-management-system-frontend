import React from "react";

export default function MyCourses() {
  return (
    <div className="container p-3">
      <div
        className="requestCourseBox"
        style={{
          border: "1px solid black",
          borderColor: "rgb(210, 206, 206)",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          borderRadius: 5,
          width: "100%", // Ensure full width
        }}
      >
        <div
          className="requestCourseBoxTitle"
          style={{ fontFamily: "CalibreBold", fontSize: "25px" }}
        >
          Request Course Privilledges
        </div>
        <select
          className="requestCoursesSelect w-50"
          style={{
            height: "35px",
            border: "2px solid rgb(210, 206, 206)",
            borderRadius: "3px",
            marginTop: 7,
          }}
        >
          <option className="">CSC 101</option>
        </select>
        <div
          className="requestBoxBtn"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            marginTop: 13,
            padding: 7,
            borderRadius: "3px",
          }}
        >
          Request Course
        </div>
      </div>
      <div
        className="myCoursesBox"
        style={{
          border: "1px solid black",
          borderColor: "rgb(210, 206, 206)",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          borderRadius: 5,
          width: "100%", // Ensure full width
          marginTop: 20,
        }}
      >
        <div
          className="myCoursesHead"
          style={{
            fontFamily: "CalibreBold",
            fontSize: "25px",
          }}
        >
          My Courses
        </div>
        <input
          className="mycoursesSeach w-100"
          style={{ border: "2px solid rgb(210, 206, 206)",
            borderRadius:3,
            height:"38px"
           }}
        />
        <table  className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col" class="tableHaad text-start">
                Course Code
              </th>
              <th scope="col" class="tableHaad text-start">
                Course Title
              </th>
            
              <th scope="col" class="tableHaad text-start">
                Status
              </th>
              <th scope="col" class="tableHaad text-start">
                Actions
              </th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
            <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                Software Configuration Management and Maintenance
              </th>
              <td class="tableValue text-start">Pending1</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
            <tr>
            <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                Software Configuration Management and Maintenance
              </th>
              <td class="tableValue text-start">Pending1</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
            <tr>
            <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                Software Configuration Management and Maintenance
              </th>
              <td class="tableValue text-start">Pending1</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
            <tr>
            <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                Software Configuration Management and Maintenance
              </th>
              <td class="tableValue text-start">Pending1</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
            <tr>
            <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                Software Configuration Management and Maintenance
              </th>
              <td class="tableValue text-start">Pending1</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
