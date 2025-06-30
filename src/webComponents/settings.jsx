import React, { useState } from "react";
import "../css/settings.css"; // Import your CSS file for styling
import { toast } from "react-toastify";
import { useUser } from "../userContext";
import { changeAdminPassword } from "../backendOperation";

export default function StudentSettings() {
  // Sample student data - in a real app, this would come from context or props
  const studentData = {
    firstName: "John",
    lastName: "Doe",
    idNumber: "21010306006",
    email: "john.doe@university.edu",
    department: "Computer Science and Mathematics",
    program: "Cyber Security",
    level: "300 Level",
    enrollmentDate: "2021-09-15",
    status: "Active",
  };

  // Password change form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const { user } = useUser();
  console.log(user);

  // Password validation
  const validatePassword = () => {
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    return true;
  };

  // Handle password change form submission
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (validatePassword()) {
      // In a real app, you would call an API here
      console.log("Password change requested:", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      const response = await changeAdminPassword({
        adminId: user?._id,
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      if (response?.success) {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response?.error || "Error changing password");
      }
    }
  };

  // Calculate password strength
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    let label = "";
    let color = "";

    switch (strength) {
      case 0:
      case 1:
        label = "Weak";
        color = "#f44336";
        break;
      case 2:
      case 3:
        label = "Medium";
        color = "#ffa000";
        break;
      case 4:
      case 5:
        label = "Strong";
        color = "#4caf50";
        break;
      default:
        label = "";
        color = "";
    }

    return { strength, label, color };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className="ss-container">
      <div className="ss-header">
        <h1 className="ss-title">Account Settings</h1>
        <p className="ss-subtitle">
          View your profile information and update your password
        </p>
      </div>

      <div className="ss-content">
        {/* Profile Information Section */}
        <div className="ss-section">
          <div className="ss-section-header">
            <h2 className="ss-section-title">Profile Information</h2>
            <p className="ss-section-subtitle">
              Your personal and academic details
            </p>
          </div>

          <div className="ss-profile-card">
            <div className="ss-profile-header">
              <div className="ss-avatar">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
              <div className="ss-profile-name">
                <h3>
                  {user?.firstName} {user?.lastName}
                </h3>
                <span className="ss-id-number">{user?.idNumber}</span>
              </div>
            </div>

            <div className="ss-profile-details">
              <div className="ss-detail-row">
                <div className="ss-detail-item">
                  <span className="ss-detail-label">Email</span>
                  <span className="ss-detail-value">{user?.email}</span>
                </div>
                <div className="ss-detail-item">
                  <span className="ss-detail-label">Department</span>
                  <span className="ss-detail-value">{user?.department}</span>
                </div>
              </div>

              <div className="ss-detail-row">
                <div className="ss-detail-item">
                  <span className="ss-detail-label">Program</span>
                  <span className="ss-detail-value">{user?.programme}</span>
                </div>
                <div className="ss-detail-item">
                  <span className="ss-detail-label">Level</span>
                  <span className="ss-detail-value">{user?.level}</span>
                </div>
              </div>

              <div className="ss-detail-row">
                <div className="ss-detail-item">
                  <span className="ss-detail-label">Enrollment Date</span>
                  <span className="ss-detail-value">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="ss-detail-item">
                  <span className="ss-detail-label">Account Type</span>
                  <span className="ss-detail-value ss-status-active">
                    {user?.accountType}
                  </span>
                </div>
              </div>
            </div>

            <div className="ss-profile-footer">
              <p className="ss-profile-note">
                To update your personal information, please contact the
                registrar's office.
              </p>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="ss-section">
          <div className="ss-section-header">
            <h2 className="ss-section-title">Change Password</h2>
            <p className="ss-section-subtitle">Update your account password</p>
          </div>

          <div className="ss-password-card">
            {passwordError && (
              <div className="ss-message ss-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="ss-message ss-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                {passwordSuccess}
              </div>
            )}

            <form className="ss-password-form" onSubmit={handlePasswordChange}>
              <div className="ss-form-group">
                <label htmlFor="currentPassword" className="ss-form-label">
                  Current Password
                </label>
                <div className="ss-input-wrapper">
                  <input
                    type="password"
                    id="currentPassword"
                    className="ss-form-input"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="ss-form-group">
                <label htmlFor="newPassword" className="ss-form-label">
                  New Password
                </label>
                <div className="ss-input-wrapper">
                  <input
                    type="password"
                    id="newPassword"
                    className="ss-form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                {newPassword && (
                  <div className="ss-password-strength">
                    <div className="ss-strength-bar">
                      <div
                        className="ss-strength-fill"
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                          backgroundColor: passwordStrength.color,
                        }}
                      ></div>
                    </div>
                    <span
                      className="ss-strength-text"
                      style={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
                <div className="ss-password-requirements">
                  <p>Password must:</p>
                  <ul>
                    <li
                      className={
                        newPassword.length >= 8 ? "ss-requirement-met" : ""
                      }
                    >
                      Be at least 8 characters long
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(newPassword) ? "ss-requirement-met" : ""
                      }
                    >
                      Include at least one uppercase letter
                    </li>
                    <li
                      className={
                        /[0-9]/.test(newPassword) ? "ss-requirement-met" : ""
                      }
                    >
                      Include at least one number
                    </li>
                    <li
                      className={
                        /[^A-Za-z0-9]/.test(newPassword)
                          ? "ss-requirement-met"
                          : ""
                      }
                    >
                      Include at least one special character
                    </li>
                  </ul>
                </div>
              </div>

              <div className="ss-form-group">
                <label htmlFor="confirmPassword" className="ss-form-label">
                  Confirm New Password
                </label>
                <div className="ss-input-wrapper">
                  <input
                    type="password"
                    id="confirmPassword"
                    className="ss-form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <div className="ss-input-error">Passwords do not match</div>
                )}
              </div>

              <div className="ss-form-actions">
                <button
                  type="submit"
                  className="ss-submit-btn"
                  onClick={handlePasswordChange}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
