import React, { useEffect } from "react";
import { getWelcomeMessage } from "../helperFunctions";
import "../css/dashBoard.css";
import { useUser } from "../userContext";

export default function Dashboard() {
  const { user, setUser } = useUser();

  // Safely access user properties with fallback values
  const firstName = user?.firstName ?? "N/A";
  const lastName = user?.lastName ?? "N/A";
  const fullName = `${firstName} ${lastName}`;

  return (
    <div
      className="homePageContent w-100 p-3 d-flex flex-column align-items-start justify-content-start rounded-1"
      style={{ backgroundColor: "white", flexGrow: 1, overflowY: "auto" }}
    >
      <div
        style={{ fontFamily: "CalibreBold", fontWeight: "bold" }}
        className="dashBoardName fs-3 me-auto"
      >
        {getWelcomeMessage(fullName)}
      </div>
      <div className="dashBoardBoxes d-flex flex-column flex-lg-row gap-3 mt-3 w-100">
        <div className="dashBoardBox pb-4 d-flex flex-column align-items-start p-2  w-50">
          <div className="dashBoardBoxHead">Current GPA</div>
          <div className="dashBoardBoxValue">3.8</div>
          <div className="dashBoardBoxInfo">0.25 from last semester</div>
        </div>
        <div className="dashBoardBox d-flex flex-column align-items-start p-2 w-50">
          <div className="dashBoardBoxHead">CGPA</div>
          <div className="dashBoardBoxValue">3.8</div>
          <div className="dashBoardBoxInfo">Overall Performance</div>
        </div>
        <div className="dashBoardBox d-flex flex-column align-items-start p-2 w-50">
          <div className="dashBoardBoxHead">Enrolled Courses</div>
          <div className="dashBoardBoxValue">5</div>
          <div className="dashBoardBoxInfo">Current Semester</div>
        </div>
        <div className="dashBoardBox d-flex flex-column align-items-start p-2 w-50">
          <div className="dashBoardBoxHead">Total Units</div>
          <div className="dashBoardBoxValue">16</div>
          <div className="dashBoardBoxInfo">Maximum 24</div>
        </div>
      </div>
      <div
        className="performanceBox w-100 mt-3 d-flex flex-column p-2 align-items-start justify-content-start"
        style={{ backgroundColor: "#fbf9f9" }}
      >
        <div className="performaceTitle">Previous Semester Result Summary</div>
        <div className="performaceYear">Year 2023</div>
        <div className="performanceTypeBox d-flex flex-row justify-content-evenly align-items-center">
          <div className="performanceTypeText">Test</div>
          <div className="performanceTypeText">Exams</div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" className="tableHaad text-start">
                Course
              </th>
              <th scope="col" className="tableHaad text-start">
                Code
              </th>
              <th scope="col" className="tableHaad text-start">
                Unit
              </th>
              <th scope="col" className="tableHaad text-start">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="tableValue text-start">
                Introduction To Programming
              </th>
              <td className="tableValue text-start">CSE 401</td>
              <td className="tableValue text-start">2</td>
              <td className="tableValue text-start">29/30</td>
            </tr>
            <tr>
              <th scope="row" className="tableValue text-start">
              Introduction To Programming
              </th>
              <td className="tableValue text-start">CSE 402</td>
              <td className="tableValue text-start">3</td>
              <td className="tableValue text-start">28/30</td>
            </tr>
            <tr>
              <th scope="row" className="tableValue text-start">
              Introduction To Programming
              </th>
              <td className="tableValue text-start">CSE 403</td>
              <td className="tableValue text-start">2</td>
              <td className="tableValue text-start">30/30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
