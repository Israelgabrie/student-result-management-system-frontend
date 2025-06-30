import React, { useEffect, useState } from "react";
import "../../css/adminUploadResult.css";
import { SearchIcon } from "../../assets/svg";
import { useOutletContext } from "react-router-dom";
import { useUser } from "../../userContext";
import { downloadMarkSheetFunc, uploadMarkSheetFunc } from "../../backendOperation";
import { toast } from "react-toastify";

export default function AdminUploadResult() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadResultData, setUploadResultData } = useOutletContext();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const handleDownload = async () => {
    if (!selectedCourse || !selectedSession || !selectedSemester) {
      console.log("Please select course, session, and semester")
      toast.error("Please select course, session, and semester");
      return;
    }

    const response = await downloadMarkSheetFunc({
      userId: user?._id,
      courseCode: selectedCourse,
      session: selectedSession,
      semester: selectedSemester,
    });

    console.log(response);
    if (response?.success) {
      toast.success("Marksheet downloaded successfully");
    } else {
      toast.error(response?.message || "Failed to download marksheet");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    const response = await uploadMarkSheetFunc({
      file: selectedFile,
      userId: user?._id,
    });

    console.log(response);
    if (response?.success) {
      toast.success("Marksheet uploaded successfully");
      setSelectedFile(null);
    } else {
      toast.error(response?.error || response?.message || "Failed to upload marksheet");
    }
  };

  const filteredResults = Array.isArray(uploadResultData?.uploadedResults)
    ? uploadResultData?.uploadedResults?.filter((result) => {
        const query = searchQuery?.toLowerCase();
        return (
          result?.courseCode?.toLowerCase()?.includes(query) ||
          result?.idNumber?.toLowerCase()?.includes(query) ||
          result?.session?.toLowerCase()?.includes(query) ||
          (result?.approved ? "approved" : "pending").includes(query)
        );
      })
    : [];

  return (
    <div className="container p-3">
      <div className="marksheetToolsSection">
        <h2 className="marksheetTitle">Marksheet Management</h2>
        
        <div className="marksheetTools">
          <div className="downloadSection">
            <h3>Download Marksheet</h3>
            
            <div className="formGroup">
              <label>Course Code</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e?.target?.value)}
                className="formSelect"
              >
                <option value="">-- Select Course --</option>
                {Array.isArray(uploadResultData?.courses) &&
                  uploadResultData?.courses?.map((course) => (
                    <option key={course?.courseCode} value={course?.courseCode}>
                      {course?.courseCode}
                    </option>
                  ))}
              </select>
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label>Session</label>
                <select
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e?.target?.value)}
                  className="formSelect"
                >
                  <option value="">-- Select Session --</option>
                  {uploadResultData?.sessions?.map((session, index) => (
                    <option key={index} value={session}>
                      {session}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formGroup">
                <label>Semester</label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e?.target?.value)}
                  className="formSelect"
                >
                  <option value="">-- Select Semester --</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                </select>
              </div>
            </div>

            <button onClick={handleDownload} className="downloadBtn">
              Download Marksheet
            </button>
          </div>

          <div className="uploadSection">
            <h3>Upload Marksheet</h3>
            
            <div className="fileUploadArea">
              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => setSelectedFile(e?.target?.files?.[0])}
                className="fileInput"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="fileLabel">
                {selectedFile ? selectedFile?.name : "Choose Excel file (.xlsx)"}
              </label>
            </div>

            <button onClick={handleUpload} className="uploadBtn">
              Upload Marksheet
            </button>
          </div>
        </div>
      </div>

      <div className="manageResultBox">
        <div className="manageResultHead">Manage Results</div>
        <div className="manageResultText">
          View and manage previously uploaded results.
        </div>
        <div className="manageResultSeachBox">
          <SearchIcon width={20} height={20} />
          <input
            className="manageResultInput"
            placeholder="Search by course, matric number, session..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>

        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th className="tableHaad text-start">Course</th>
              <th className="tableHaad text-start">Matric Number</th>
              <th className="tableHaad text-start">Status</th>
              <th className="tableHaad text-start">Session</th>
              <th className="tableHaad text-start">Unit</th>
              <th className="tableHaad text-start">Missing</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults?.length > 0 ? (
              filteredResults?.map((result, index) => (
                <tr key={index}>
                  <td className="tableValue text-start">{result?.courseCode}</td>
                  <td className="tableValue text-start">{result?.idNumber}</td>
                  <td className="tableValue text-start">
                    {result?.approved ? "Approved" : "Pending"}
                  </td>
                  <td className="tableValue text-start">{result?.session}</td>
                  <td className="tableValue text-start">{result?.unit}</td>
                  <td className="tableValue text-start">
                    {result?.approved ||
                    (!result?.approved && result?.testScore && result?.examScore)
                      ? "None"
                      : result?.testScore
                      ? "Exam"
                      : "Test"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}