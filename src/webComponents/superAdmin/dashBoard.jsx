import React from "react";
import "../../superAdminCss/dashboard.css";
import { SearchIcon } from "../../assets/svg";

export default function SuperAdminDashBoard() {
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
      <div className="adminDashBoardHead">Super Admin Dashboard</div>
      <div className="adminDashBoardRow d-flex flex-row  justify-content-start align-items-center gap-3">
        <div className="adminDashBoardBox w-25">
          <div className="adminDashBoardBoxHead">Total Number Of Student</div>
          <div className="adminDashBoardBoxBody">1243</div>
          <div className="adminDashBoardBoxInfo">+12% from last semester</div>
        </div>
        <div className="adminDashBoardBox w-25">
          <div className="adminDashBoardBoxHead">Total Number Of Student</div>
          <div className="adminDashBoardBoxBody">1243</div>
          <div className="adminDashBoardBoxInfo">+12% from last semester</div>
        </div>
        <div className="adminDashBoardBox w-25">
          <div className="adminDashBoardBoxHead">Total Number Of Student</div>
          <div className="adminDashBoardBoxBody">1243</div>
          <div className="adminDashBoardBoxInfo">+12% from last semester</div>
        </div>
        <div className="adminDashBoardBox w-25">
          <div className="adminDashBoardBoxHead">Total Number Of Student</div>
          <div className="adminDashBoardBoxBody">1243</div>
          <div className="adminDashBoardBoxInfo">+12% from last semester</div>
        </div>
      </div>

      <div style={{ width: "100%", marginTop: 20 }} className="adminManagement">
        <div className="adminManagementHead">User Management</div>
        <div className="adminManagementText">Admin log details</div>
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
                Role
              </th>
              <th scope="col" class="tableHaad text-start">
                Department
              </th>
              <th scope="col" class="tableHaad text-start">
                Status
              </th>
              <th scope="col" class="tableHaad text-start">
                Last login
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">Admin</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">Active</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">Admin</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">Active</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">Admin</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">Active</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">Admin</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">Active</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">Admin</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">Active</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">Admin</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">Active</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">Admin</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">Active</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                John Doe
              </th>
              <td class="tableValue text-start">Admin</td>
              <td class="tableValue text-start">Computer Science</td>
              <td class="tableValue text-start">Active</td>
              <td class="tableValue text-start">2023-12-01 09:45 AM</td>
            </tr>
          </tbody>
        </table>
        <div className="superAdminActivityBox">
          <div className="superAdminActivityHead">Recent Activities</div>
            <input type="date" placeholder="Search" className="superAdminSearchDate" />     
            <div className="superAdminRecentBoxes">
              <div className="superAdminRecentBox">
                <div className="superAdminRecentName">John Doe</div>
                <div className="superAdminRecentActivity">Uploaded test results for CSC301</div>
                <div className="superAdminRecentDate">2023-12-01 09:50 AM</div>                
              </div>
              <div className="superAdminRecentBox">
                <div className="superAdminRecentName">John Doe</div>
                <div className="superAdminRecentActivity">Uploaded test results for CSC301</div>
                <div className="superAdminRecentDate">2023-12-01 09:50 AM</div>                
              </div>
              <div className="superAdminRecentBox">
                <div className="superAdminRecentName">John Doe</div>
                <div className="superAdminRecentActivity">Uploaded test results for CSC301</div>
                <div className="superAdminRecentDate">2023-12-01 09:50 AM</div>                
              </div>
            </div>      
        </div>
      </div>
    </div>
  );
}
