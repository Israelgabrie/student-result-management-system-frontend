import React, { useContext } from 'react';
import "../css/courseRegistraton.css";
import { useUser } from '../userContext';
import { requestCourseRights } from '../backendOperation';

export default function CourseRegistration() {
  const {user,setUser} = useUser();
  console.log(user)

  return (
    <div className="homePageContent w-100 p-3 d-flex flex-column align-items-start justify-content-start rounded-1"
      style={{ backgroundColor: "white", flexGrow: 1, overflowY: "auto", height: "100%" }}
    >
      <div className='courseRegHead'>Course Registration</div>

      <div className="studentInfoSection mb-4 mt-3">
        <div className="row">
         
          <div className="col-md-4">
            <div className="form-group">
              <label>Session</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="E.g. 2023/2024"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Semester</label>
              <select className="form-control">
                <option value="">Select Semester</option>
                <option value="First">First</option>
                <option value="Second">Second</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='courseRegInputBoxes'>
        <div className='courseRegInputBox'>
          <input
            type='text'
            placeholder="Enter Course Code (e.g. CSC101)"
            className="form-control"
          />
        </div>
        
        <div className='courseRegInputBox' style={{ width: '30%' }}>
          <input
            type='number'
            placeholder="Units"
            min="1"
            max="6"
            className="form-control"
          />
        </div>

        <button type='button' className='addCourseBtn'>
          Add Course
        </button>
      </div>

      <div className="selctedCoursesHead">Selected Courses</div>
      <div className="coursesSummary mb-3">
        <span><strong>Total Courses:</strong> 3</span>
        <span className="ms-4"><strong>Total Units:</strong> 9</span>
      </div>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="tableHead text-center">S/N</th>
            <th className="tableHead text-start">Course Code</th>
            <th className="tableHead text-center">Unit</th>
            <th className="tableHead text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableValue text-center">1</td>
            <td className="tableValue text-start">CSC101</td>
            <td className="tableValue text-center">3</td>
            <td className="tableValue text-center">
              <button className="btn btn-sm btn-danger">
                Remove
              </button>
            </td>
          </tr>
          <tr>
            <td className="tableValue text-center">2</td>
            <td className="tableValue text-start">MTH101</td>
            <td className="tableValue text-center">2</td>
            <td className="tableValue text-center">
              <button className="btn btn-sm btn-danger">
                Remove
              </button>
            </td>
          </tr>
          <tr>
            <td className="tableValue text-center">3</td>
            <td className="tableValue text-start">PHY101</td>
            <td className="tableValue text-center">4</td>
            <td className="tableValue text-center">
              <button className="btn btn-sm btn-danger">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex justify-content-end mt-4 mb-3">
        <button className="uploadCourseRegBtn">
          Upload Course Reg
        </button>
      </div>
    </div>
  );
}