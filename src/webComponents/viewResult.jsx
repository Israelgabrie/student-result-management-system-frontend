import { DownloadIcon, SearchIcon } from "../assets/svg";
import "../css/viewResult.css";
import { truncateString } from "../helperFunctions";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "A", value: 90 },
  { name: "B", value: 80 },
  { name: "C", value: 70 },
  { name: "D", value: 60 },
  { name: "F", value: 50 },
];

const COLORS = ["#4CAF50", "#2196F3", "#FFEB3B", "#FF9800", "#F44336"]; // Green, Blue, Yellow, Orange, Red

export default function ViewResult() {
  return (
    <div
      className="homePageContent w-100 p-3 d-flex flex-column align-items-start justify-content-start rounded-1"
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
        <div
          className="resultBoxDatas w-100 d-flex flex-column flex-sm-row"
          style={{ minHeight: "100px", flexGrow: 1 }}
        >
          <div className="resultBoxData w-50 mb-3 h-25">
            <div className="resultBoxDataHead">Semester GPA</div>
            <div className="resultBoxDataValue">3.6</div>
          </div>
          <div className="resultBoxData w-50 mb-3 ">
            <div className="resultBoxDataHead">Cummulative GPA</div>
            <div className="resultBoxDataValue">3.6</div>
          </div>
          <div className="resultBoxData w-50">
            <div className="resultBoxDataHead">Total Units</div>
            <div className="resultBoxDataValue">13</div>
          </div>
        </div>

       <div className="w-100" style={{overflowX:"auto"}}>
       <table className="table table-striped mt-4">
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
                {truncateString(
                  "Software Configuration Management and Maintenance"
                )}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div
                    class="progress w-100 "
                    style={{ height: 12, borderRadius: 4 }}
                  >
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ minWidth: "70%" }}
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
                {truncateString(
                  "Software Configuration Management and Maintenance"
                )}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div
                    class="progress w-100 "
                    style={{ height: 12, borderRadius: 4 }}
                  >
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ minWidth: "70%" }}
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
                {truncateString(
                  "Software Configuration Management and Maintenance"
                )}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div
                    class="progress w-100 "
                    style={{ height: 12, borderRadius: 4 }}
                  >
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ minWidth: "70%" }}
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
                {truncateString(
                  "Software Configuration Management and Maintenance"
                )}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div
                    class="progress w-100 "
                    style={{ height: 12, borderRadius: 4 }}
                  >
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ minWidth: "70%" }}
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
                {truncateString(
                  "Software Configuration Management and Maintenance"
                )}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div
                    class="progress w-100 "
                    style={{ height: 12, borderRadius: 4 }}
                  >
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ minWidth: "70%" }}
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
                {truncateString(
                  "Software Configuration Management and Maintenance"
                )}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div
                    class="progress w-100 "
                    style={{ height: 12, borderRadius: 4 }}
                  >
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ minWidth: "70%" }}
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
                {truncateString(
                  "Software Configuration Management and Maintenance"
                )}
              </th>
              <td class="tableValue text-start">27/30</td>
              <td class="tableValue text-start">29/70</td>
              <td class="tableValue text-start">
                <div class="d-flex align-items-center">
                  <div
                    class="progress w-100 "
                    style={{ height: 12, borderRadius: 4 }}
                  >
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ minWidth: "70%" }}
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

        <div className="resultAnalysisBox w-100 p-3 ">
          <div className="resultAnalysisHead">Course Analysis</div>
          <div className="resultAnalysisText">Analyze your courses</div>
          <div className="resultAnalysisSearch flex-column flex-sm-row gap-3">
            <div className="resultAnalysisInputBox">
              <input className="resultAnalysisInput" />
              <SearchIcon width={30} height={25} />
            </div>
            <select className="resultAnalysisSelectBox">
              <option className="resultAnalysisOption" value={"2025"}>
                2025
              </option>
            </select>
          </div>
         <div className="resultanalysisDataBox w-100 flex-column flex-md-row">
         <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="resultanalysisData">
            <div className="resultanalysisCourseCode">MTH 101</div>
            <div className="resultanalysisCourseTitle">Introduction To Mathematics</div>
            <div className="resultanalysisCourseLecturer">Lecturer : Dr Akindele</div>
            <div className="resultanalysisCourseYear">Analysis For: 2021/2022</div>
            <div className="resultanalysisCoursePassRate">Pass Rate: 55%</div>
          </div>
         </div>
         <div className="resultAnalysisFeedBackBox">
          <div className="feedBackHead">Students Feedback</div>   
          <div className="studentFeedbackBox">
             <div className="studentFeedbackName">Gabriel Isreal</div>   
             <div className="studentFeedbackText">this exam the lecturere mostly set past question and preactice quetsion from the text bbok he gave us</div>         
          </div>
          <div className="studentFeedbackBox">
             <div className="studentFeedbackName">Gabriel Isreal</div>   
             <div className="studentFeedbackText">this exam the lecturere mostly set past question and preactice quetsion from the text bbok he gave us</div>         
          </div>
          <div className="studentFeedbackBox">
             <div className="studentFeedbackName">Gabriel Isreal</div>   
             <div className="studentFeedbackText">this exam the lecturere mostly set past question and preactice quetsion from the text bbok he gave us</div>         
          </div> 
         </div>
         <div className="downloadResultBox">
         <DownloadIcon width={30} height={30} style={{ marginRight: 8, verticalAlign: "middle" }} /> Download Result
         </div>
        </div>
      </div>
    </div>
  );
}
