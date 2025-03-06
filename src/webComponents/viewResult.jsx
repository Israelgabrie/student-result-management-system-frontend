import React from "react";
import "../css/viewResult.css";
import { truncateString } from "../helperFunctions";

export default function ViewResult() {
  return (
    <div
      className="w-100 p-3 d-flex flex-column align-items-start justify-content-start rounded-1"
      style={{ backgroundColor: "white", flexGrow: 1, overflowY: "auto" }}
    >
      <div className="viewResultTop d-flex flex-row align-items-center justify-content-between w-100">
        <div
          className="viewResultTitle fs-3"
          style={{ fontFamily: "CalibreBold" }}
        >
          View Result
        </div>
        <select className="viewResultSelectSemester mh-50 p-1">
          <option value={"semester 1"}>Semester 1</option>
          <option value={"semester 1"}>Semester 1</option>
          <option value={"semester 1"}>Semester 1</option>
        </select>
      </div>

      <div className="resultBox w-100">
        <div className="resultBoxHead">Academic Performance Summary</div>
        <div className="resultReleaseDate">Released: 2nd March 2025</div>
        <div className="resultBoxDatas w-100">
          <div className="resultBoxData">
            <div className="resultBoxDataHead">Semester GPA</div>
            <div className="resultBoxDataValue">3.6</div>
          </div>
          <div className="resultBoxData">
            <div className="resultBoxDataHead">Cummulative GPA</div>
            <div className="resultBoxDataValue">3.6</div>
          </div>
          <div className="resultBoxData">
            <div className="resultBoxDataHead">Total Units</div>
            <div className="resultBoxDataValue">13</div>
          </div>
        </div>

        <table class="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col" class="tableHaad text-start">
                Course Code
              </th>
              <th scope="col" class="tableHaad text-start">
                Course
              </th>
              <th scope="col" class="tableHaad text-start">
                Test Score
              </th>
              <th scope="col" class="tableHaad text-start">
                Exam Score
              </th>
              <th scope="col" class="tableHaad text-start">
                Total Score
              </th>
              <th scope="col" class="tableHaad text-start">
                Grade
              </th>
              <th scope="col" class="tableHaad text-start">
                Unit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                {truncateString("Software Configuration Management and Maintenance")}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div class="progress w-100">
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span class="ms-2">29/70</span>
                </div>
              </td>
              <td class="tableValue text-start">A</td>
              <td class="tableValue text-start">2</td>
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                {truncateString("Software Configuration Management and Maintenance")}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div class="progress w-100">
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span class="ms-2">29/70</span>
                </div>
              </td>
              <td class="tableValue text-start">A</td>
              <td class="tableValue text-start">2</td>
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                {truncateString("Software Configuration Management and Maintenance")}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div class="progress w-100">
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span class="ms-2">29/70</span>
                </div>
              </td>
              <td class="tableValue text-start">A</td>
              <td class="tableValue text-start">2</td>
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                {truncateString("Software Configuration Management and Maintenance")}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div class="progress w-100">
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span class="ms-2">29/70</span>
                </div>
              </td>
              <td class="tableValue text-start">A</td>
              <td class="tableValue text-start">2</td>
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                {truncateString("Software Configuration Management and Maintenance")}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div class="progress w-100">
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span class="ms-2">29/70</span>
                </div>
              </td>
              <td class="tableValue text-start">A</td>
              <td class="tableValue text-start">2</td>
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                {truncateString("Software Configuration Management and Maintenance")}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div class="progress w-100">
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span class="ms-2">29/70</span>
                </div>
              </td>
              <td class="tableValue text-start">A</td>
              <td class="tableValue text-start">2</td>
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <th scope="row" class="tableValue text-start">
                {truncateString("Software Configuration Management and Maintenance")}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div class="progress w-100">
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span class="ms-2">29/70</span>
                </div>
              </td>
              <td class="tableValue text-start">A</td>
              <td class="tableValue text-start">2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
