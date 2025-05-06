import React, { useEffect, useState } from "react";
import "../../css/adminUploadResult.css";
import { SearchIcon } from "../../assets/svg";
import { useOutletContext } from "react-router-dom";
import { useUser } from "../../userContext";
import { uploadResult } from "../../backendOperation";
import { toast } from "react-toastify";

export default function AdminUploadResult() {
  const [resultType, setResultType] = useState("test");
  const { uploadResultData, setUploadResultData } = useOutletContext();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  const [uploadFormData, setUploadFormData] = useState({
    courseCode: "",
    courseTitle: "",
    session: "",
    adminName: "",
    matricNumber: "",
    semester: "",
    unit: "",
    score: "",
  });

  async function addStudentResult() {
    try {
      if (
        !uploadFormData.courseCode ||
        !uploadFormData.matricNumber ||
        !uploadFormData.session ||
        !uploadFormData.semester ||
        !uploadFormData.unit ||
        !uploadFormData.score
      ) {
        alert("Please fill out all fields.");
        return;
      }

      const resultData = {
        courseCode: uploadFormData.courseCode,
        courseTitle: uploadFormData.courseTitle,
        session: uploadFormData.session,
        userId: user._id,
        matricNumber: uploadFormData.matricNumber,
        semester: uploadFormData.semester,
        unit: parseInt(uploadFormData.unit) || "",
        score: uploadFormData.score,
        resultType: resultType,
      };

      const response = await uploadResult(resultData);
      if (response?.success) {
        setUploadResultData((prev) => ({
          ...prev,
          uploadedResults: response.uploadedResults,
        }));
        toast.success(response.message || "Result Uploaded Successfully");
      } else {
        toast.error(response?.response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    }
  }

  useEffect(() => {
    if (!uploadFormData.courseCode || !uploadResultData?.courses) return;

    const currentCourse = uploadResultData.courses.find(
      (course) => course.courseCode === uploadFormData.courseCode
    );

    if (currentCourse) {
      setUploadFormData((prev) => ({
        ...prev,
        courseTitle: currentCourse.courseTitle,
      }));
    } else {
      setUploadFormData((prev) => ({
        ...prev,
        courseTitle: "",
      }));
    }
  }, [uploadFormData.courseCode, uploadResultData.courses]);

  const filteredResults = Array.isArray(uploadResultData?.uploadedResults)
  ? uploadResultData.uploadedResults.filter((result) => {
      const query = searchQuery.toLowerCase();
      return (
        result.courseCode?.toLowerCase().includes(query) ||
        result.idNumber?.toLowerCase().includes(query) ||
        result.session?.toLowerCase().includes(query) ||
        (result.approved ? "approved" : "pending").includes(query)
      );
    })
  : [];


  return (
    <div className="container p-3">
      <div className="uploadResultBox">
        <h1 className="uploadTitle">Upload Result</h1>
        <p className="uploadSubtitle">
          Enter test and exam scores for students. All fields are required.
        </p>

        <div className="uploadResultTypeBoxes">
          <div
            className="uploadResultTypeBox"
            style={{
              backgroundColor: resultType === "test" ? "#006ef5" : "",
              color: resultType === "test" ? "white" : "",
            }}
            onClick={() => {
              setResultType("test");
            }}
          >
            Test
          </div>
          <div
            className="uploadResultTypeBox"
            style={{
              backgroundColor: resultType === "exam" ? "#006ef5" : "",
              color: resultType === "exam" ? "white" : "",
            }}
            onClick={() => {
              setResultType("exam");
            }}
          >
            Exam
          </div>
        </div>

        <div className="uploadResultForms">
          <div className="uploadResultFormRow">
            <div className="uploadResultFormBox">
              <label className="uploadResultFormLabel">Course Code</label>
              <select
                className="uploadResultInput"
                value={uploadFormData.courseCode}
                onChange={(e) => {
                  setUploadFormData((prev) => ({
                    ...prev,
                    courseCode: e.target.value,
                  }));
                }}
              >
                <option value="">-- Select Course Code --</option>
                {Array.isArray(uploadResultData?.courses) &&
                  uploadResultData.courses.map((course) => (
                    <option key={course.courseCode} value={course.courseCode}>
                      {course.courseCode}
                    </option>
                  ))}
              </select>
            </div>
            <div className="uploadResultFormBox">
              <label className="uploadResultFormLabel">Course Title</label>
              <input
                className="uploadResultInput"
                placeholder={uploadFormData.courseTitle || "No course selected"}
                readOnly
              />
            </div>
          </div>

          <div className="uploadResultFormRow">
            <div className="uploadResultFormBox">
              <label className="uploadResultFormLabel">Session</label>
              <select
                className="uploadResultInput"
                value={uploadFormData.session}
                onChange={(e) =>
                  setUploadFormData((prev) => ({
                    ...prev,
                    session: e.target.value,
                  }))
                }
              >
                <option value="">-- Select Session --</option>
                {uploadResultData?.sessions?.map((session, index) => (
                  <option key={index} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
            <div className="uploadResultFormBox">
              <label className="uploadResultFormLabel">Unit</label>
              <input
                className="uploadResultInput"
                type="number"
                max={16}
                min={0}
                value={uploadFormData.unit}
                onChange={(e) =>
                  setUploadFormData((prev) => ({
                    ...prev,
                    unit: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="uploadResultFormRow">
            <div className="uploadResultFormBox">
              <label className="uploadResultFormLabel">Matric Number</label>
              <input
                className="uploadResultInput"
                value={uploadFormData.matricNumber}
                onChange={(e) =>
                  setUploadFormData((prev) => ({
                    ...prev,
                    matricNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div className="scoreInputs">
              <select
                className="smuploadResultFormBox"
                style={{
                  height: 40,
                  borderRadius: 3,
                  border: "1px solid rgb(210, 206, 206)",
                  marginTop: "auto",
                  padding: 5,
                }}
                value={uploadFormData.semester}
                onChange={(e) =>
                  setUploadFormData((prev) => ({
                    ...prev,
                    semester: e.target.value,
                  }))
                }
              >
                <option value="">-- Select Semester --</option>
                <option value="First">First</option>
                <option value="Second">Second</option>
              </select>
              <div className="smuploadResultFormBox">
                <label className="uploadResultFormLabel">
                  {resultType === "test" ? "Test" : "Exam"} Score
                </label>
                <input
                  className="smuploadResultInput"
                  placeholder={`Enter ${resultType === "test" ? "30" : "70"} or below`}
                  value={uploadFormData.score}
                  onChange={(e) =>
                    setUploadFormData((prev) => ({
                      ...prev,
                      score: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="addResultBtn" onClick={addStudentResult}>
            Add Result
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th className="tableHaad text-start">Course</th>
              <th className="tableHaad text-start">Matric Number</th>
              <th className="tableHaad text-start">Approved</th>
              <th className="tableHaad text-start">Session</th>
              <th className="tableHaad text-start">Upload Date</th>
              <th className="tableHaad text-start">Unit</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults?.length > 0 ? (
              filteredResults.map((result, index) => (
                <tr key={index}>
                  <td className="tableValue text-start">{result.courseCode}</td>
                  <td className="tableValue text-start">{result.idNumber}</td>
                  <td className="tableValue text-start">
                    {result.approved ? "Approved" : "Pending"}
                  </td>
                  <td className="tableValue text-start">{result.session}</td>
                  <td className="tableValue text-start">
                    {new Date(result.uploadedAt).toLocaleTimeString()}
                  </td>
                  <td className="tableValue text-start">{result.unit}</td>
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
