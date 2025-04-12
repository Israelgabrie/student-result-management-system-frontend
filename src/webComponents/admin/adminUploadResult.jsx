import React from "react";
import "../../css/adminUploadResult.css";
import { SearchIcon } from "../../assets/svg"; 

export default function AdminUploadResult() {
  return (
    <div className="container p-3" >
      <div
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
        className="uploadResultBox"
      >
        <div
          className="uploadResultBoxTitle"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%", // Ensure full width
          }}
        >
          <h1 style={{ fontFamily: "CalibreBold", marginTop: 10 }}>
            Upload Result
          </h1>
          <div
            className="uploadResultBody"
            style={{
              fontFamily: "CalibreBold",
              color: "#7B7272",
              fontSize: 15,
            }}
          >
            Enter test and exam scores for students. All fields are required.
          </div>
          <div
            className="uploadResultTypeBoxes"
            style={{
              padding: 5,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="uploadResultTypeBox">Test</div>
            <div className="uploadResultTypeBox">Exam</div>
          </div>
          <div className="uplaodResultForms" style={{ gap: "25px" }}>
            <div className="uploadResultFormRow d-flex flex-column flex-md-row">
              <div className="uploadResultFormBox w-100 w-sm-auto">
                <label className="uploadResultFormLabel">Course Code</label>
                <select className="uploadResultInput">
                  <option value={"csc 101"}>CSC 101</option>
                </select>
              </div>
              <div className="uploadResultFormBox w-100 w-sm-auto">
                <label className="uploadResultFormLabel">Course Title</label>
                <input className="uploadResultInput" />
              </div>
            </div>
            <div className="uploadResultFormRow d-flex flex-column flex-md-row">
              <div className="uploadResultFormBox w-100 w-sm-auto">
                <label className="uploadResultFormLabel">Session</label>
                <select className="uploadResultInput">
                  <option value={"csc 101"}>2024/2025</option>
                </select>
              </div>
              <div className="uploadResultFormBox w-100 w-sm-auto">
                <label className="uploadResultFormLabel">Lecturer Name</label>
                <input className="uploadResultInput" />
              </div>
            </div>
            <div className="uploadResultFormRow d-flex flex-column flex-md-row">
              <div className="uploadResultFormBox w-100 w-sm-auto">
                <label className="uploadResultFormLabel">Matric Number</label>
                <input className="uploadResultInput" />
              </div>
              <div
                className="uploadResultFormBox w-100 w-sm-auto d-flex flex-column flex-md-row"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="smuploadResultFormBox w-100 w-sm-100">
                  <label className="uploadResultFormLabel">Score</label>
                  <input className="smuploadResultInput" />
                </div>
                <div className="smuploadResultFormBox w-100 w-sm-100">
                  <label className="uploadResultFormLabel">Score</label>
                  <input className="smuploadResultInput" />
                </div>
              </div>
            </div>
            <div
              className="addResultBox"
              style={{
                backgroundColor: "black",
                color: "white",
                width: "120px",
                height: "35px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                borderRadius:3,
                fontFamily:"CalibreBold",
                fontSize:19,
                paddingTop:5,
                marginLeft:"auto"
              }}
            >
              Add Result
            </div>
          </div>
        </div>
      </div>
      <div className="manageResultBox" style={{ border: "1px solid black",
          borderColor: "rgb(210, 206, 206)",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          borderRadius: 5,
          width: "100%", // Ensure full width 
          marginTop:40
          }}>
        <div className="manageResultHead" style={{fontFamily:"CalibreBold",fontSize:"30px"}}>Manage Results</div>
        <div className="manageResultText" style={{fontFamily:"CalibreRegular",fontSize:"17px",color:"#7B7272"}}>View and manage previously uploaded results.</div>
        <div className="manageResultSeachBox w-100" style={{
          border:"2px solid  rgb(210, 206, 206)",
          display:"flex",
          flexDirection:"row",
          height:"40px",
          borderRadius:5,
          alignItems:"center",
          padding:3,
          marginTop:10
        }}>
          <SearchIcon width={25} height={25} />
          <input className="manageResultInput" style={{
            height:"100%",
            width:"100%",
            border:"none",
            outline:"none",
            paddingLeft:7,
            paddingTop:5,
            fontFamily:"CalibreRegular",
            fontSize:18
          }}/>
        </div>

        <table  className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col" class="tableHaad text-start">
                Course
              </th>
              <th scope="col" class="tableHaad text-start">
                Matric Number
              </th>
              <th scope="col" class="tableHaad text-start">
                Type
              </th>
              <th scope="col" class="tableHaad text-start">
                score
              </th>
              <th scope="col" class="tableHaad text-start">
                Upload Date
              </th>
              <th scope="col" class="tableHaad text-start">
                Action
              </th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">21010202003</td>
              <td class="tableValue text-start">Test</td>
              <td class="tableValue text-start">24/30</td>
              <td class="tableValue text-start">2024-10-3</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">21010202003</td>
              <td class="tableValue text-start">Test</td>
              <td class="tableValue text-start">24/30</td>
              <td class="tableValue text-start">2024-10-3</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">21010202003</td>
              <td class="tableValue text-start">Test</td>
              <td class="tableValue text-start">24/30</td>
              <td class="tableValue text-start">2024-10-3</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">21010202003</td>
              <td class="tableValue text-start">Test</td>
              <td class="tableValue text-start">24/30</td>
              <td class="tableValue text-start">2024-10-3</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">21010202003</td>
              <td class="tableValue text-start">Test</td>
              <td class="tableValue text-start">24/30</td>
              <td class="tableValue text-start">2024-10-3</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
            <tr>
              <td class="tableValue text-start">CSE 401</td>
              <td class="tableValue text-start">21010202003</td>
              <td class="tableValue text-start">Test</td>
              <td class="tableValue text-start">24/30</td>
              <td class="tableValue text-start">2024-10-3</td>
              <td class="tableValue text-start">Edit</td>
              
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}
