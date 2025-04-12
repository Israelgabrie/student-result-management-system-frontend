import React from "react";
import "../../superAdminCss/approveCourseRequest.css";

export default function ApproveCourseRequest() {
  return (
    <div
      className="homePageContent w-100 p-3 d-flex flex-column align-items-start justify-content-start rounded-1"
      style={{
        backgroundColor: "white",
        flexGrow: 1,
        overflowY: "auto",
        height: "100%",
      }}
    >
      <div className="approveCourseRequestHead">Approve Course Request</div>
      <div className="approveCourseRequestBody">
        Approve or reject course requests from lecturers
      </div>
      <div className="courseRequesTableBox">
        <div className="courseRequesTableHead">Course Request Table</div>
        <table
          className="w-100 table table-striped mt-1"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th scope="col" class="tableHaad text-start">
                Name
              </th>
              <th scope="col" class="tableHaad text-start">
                Course
              </th>
              <th scope="col" class="tableHaad text-start">
                Department
              </th>
              <th scope="col" class="tableHaad text-start">
                Date
              </th>
              <th scope="col" class="tableHaad text-start">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
              <td class="tableValue text-start d-flex flex-row gap-3 justify-content-start align-items-center">
                <button className="actionBtn bg-success">Approve</button>
                <button className="actionBtn bg-danger">Reject</button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
              <td class="tableValue text-start d-flex flex-row gap-3 justify-content-start align-items-center">
                <button className="actionBtn bg-success">Approve</button>
                <button className="actionBtn bg-danger">Reject</button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
              <td class="tableValue text-start d-flex flex-row gap-3 justify-content-start align-items-center">
                <button className="actionBtn bg-success">Approve</button>
                <button className="actionBtn bg-danger">Reject</button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
              <td class="tableValue text-start d-flex flex-row gap-3 justify-content-start align-items-center">
                <button className="actionBtn bg-success">Approve</button>
                <button className="actionBtn bg-danger">Reject</button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
              <td class="tableValue text-start d-flex flex-row gap-3 justify-content-start align-items-center">
                <button className="actionBtn bg-success">Approve</button>
                <button className="actionBtn bg-danger">Reject</button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
              <td class="tableValue text-start d-flex flex-row gap-3 justify-content-start align-items-center">
                <button className="actionBtn bg-success">Approve</button>
                <button className="actionBtn bg-danger">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
