import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { addUser, getDepartment } from "../backendOperation";
import { ToastContainer, toast } from "react-toastify";
import "../css/SignUp.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accountType: "",
    idNumber: "",
    department: "",
    programme: "",
    password: "",
    superAdminPasscode: "",
  });

  useEffect(() => {
    async function fetchDepartments() {
      const toastId = toast.loading("Fetching Departments...");
      try {
        const response = await getDepartment();
        if (response.data?.success) {
          console.log(response.data.department)
          setDepartments(response.data.department);
          toast.update(toastId, {
            render: response.data.message,
            type: "success",
            autoClose: 3000,
            isLoading: false,
          });
        } else {
          toast.update(toastId, {
            render: response.message,
            type: "error",
            autoClose: 3000,
            isLoading: false,
            closeButton: true,
          });
        }
      } catch (error) {
        toast.update(toastId, {
          render: error.message || "Failed to fetch departments",
          type: "error",
          autoClose: 3000,
          isLoading: false,
          closeButton: true,
        });
      }
    }
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (formData.accountType !== "student") {
      setFormData((prev) => ({ ...prev, department: "", programme: "" }));
    }
  }, [formData.accountType]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await addUser(formData);

      if (data.success) {
        toast.success(data.message);
        // Directly navigate after success
        setTimeout(() => {
          navigate("/login"); // Use the navigate function here, not useNavigate inside setTimeout
        }, 2000); // Add a delay if needed (e.g., 2 seconds)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignUpContainer">
      <ToastContainer />
      <form className="SignUpForm" onSubmit={handleSubmit}>
        <h2 className="SignUpTitle">
          <img className="loginImage" src="/img/mtu logo.png" alt="MTU Logo" />
          Sign Up
        </h2>
        <p className="SignUpDescription">
          Create an account for the Student Result Management System
        </p>

        {[
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Email", name: "email", type: "email" },
        ].map(({ label, name, type }) => (
          <div className="FormGroup" key={name}>
            <label className="SignUpLabel" htmlFor={name}>
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="SignUpInput"
            />
          </div>
        ))}

        <div className="FormGroup">
          <label className="SignUpLabel">Account Type</label>
          <div className="accountTypeBox">
            {["student", "admin"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="accountType"
                  value={type}
                  checked={formData.accountType === type}
                  onChange={handleChange}
                  style={{ marginRight: "3px" }}
                />{" "}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {formData.accountType === "student" && (
          <>
            <div className="FormGroup">
              <label className="SignUpLabel" htmlFor="department">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="SignUpInput"
                style={{ maxWidth: "1000px" }}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.name} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="FormGroup">
              <label className="SignUpLabel" htmlFor="programme">
                Programme
              </label>
              <select
                id="programme"
                name="programme"
                value={formData.programme}
                onChange={handleChange}
                required
                className="SignUpInput"
                style={{ maxWidth: "1000px" }}
              >
                <option value="">Select Programme</option>
                {(
                  departments.find((dept) => dept.name === formData.department)
                    ?.Programmes || []
                ).map((programme) => (
                  <option key={programme} value={programme}>
                    {programme}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {[
          { label: "ID Number", name: "idNumber", type: "text" },
          { label: "Password", name: "password", type: "password" },
          {
            label: "Super Admin Passcode",
            name: "superAdminPasscode",
            type: "password",
          },
        ].map(({ label, name, type }) => (
          <div className="FormGroup" key={name}>
            <label className="SignUpLabel" htmlFor={name}>
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="SignUpInput"
            />
          </div>
        ))}

        <button type="submit" className="SubmitButton" disabled={loading}>
          {loading ? <PulseLoader color="white" size={13} /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
