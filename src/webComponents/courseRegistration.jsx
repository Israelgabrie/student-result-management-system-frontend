import React from 'react';
import "../css/courseRegistraton.css"
import { UploadIcon } from '../assets/svg';

export default function CourseRegistration() {
  return (
    <div  
    className="homePageContent w-100 p-3 d-flex flex-column align-items-start justify-content-start rounded-1"
    style={{ backgroundColor: "white", flexGrow: 1, overflowY: "auto",height:"100%" }}>
        <div className='courseRegHead'>Upload Course Registration</div>
       <div className='courseRegInputBoxes'>
       <div className='courseRegInputBox'>
            <input  type='file' />
            <label className='uploadCourseRegLabel'>Upload Course Registration</label>
        </div>
        <div className='uploadCourseRegBtn'>
            <UploadIcon />
            <div>Upload </div>
        </div>
       </div>
       <div className='selctedCoursesHead'>Selected Courses</div>
       <table  className="table table-striped">
          <thead>
            <tr>
              <th scope="col" class="tableHaad text-start">
                Course
              </th>
              <th scope="col" class="tableHaad text-start">
                Code
              </th>
              <th scope="col" class="tableHaad text-start">
                Unit
              </th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="tableValue text-start">
                Software Configuration Management and Maintenance
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">2</td>
              
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                Software Configuration Management and Maintenance
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">2</td>
              
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                Software Configuration Management and Maintenance
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">2</td>
              
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                Software Configuration Management and Maintenance
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">2</td>
            </tr>
            <tr>
              <th scope="row" class="tableValue text-start">
                Software Configuration Management and Maintenance
              </th>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">2</td>
              
            </tr>
            
          </tbody>
        </table>
      
    </div>
  )
}
