import { useState, useRef } from "react"
import { toast } from "react-toastify"
import { LockIcon, UserIcon, CalendarIcon } from "lucide-react"
import "../../css/adminSettings.css"

export default function AdminSettings() {
  // State for password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // State for profile information
  const [profileData, setProfileData] = useState({
    fullName: "Admin User", // Default value, replace with actual data
    email: "admin@example.com", // Default value, replace with actual data
  })

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  // Session information (read-only)
  const sessionInfo = {
    currentSession: "2024/2025",
    currentSemester: "First Semester",
    nextSession: "2025/2026",
    nextSemester: "First Semester",
  }

  // Handle password change inputs
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  // Handle profile data inputs
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  // Handle profile picture change
  const handlePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePicture(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  // Submit password change
  const submitPasswordChange = (e) => {
    e.preventDefault()

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    // Here you would call your API to change the password
    toast.success("Password updated successfully")

    // Reset form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  // Submit profile update
  const submitProfileUpdate = (e) => {
    e.preventDefault()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(profileData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    // Here you would call your API to update the profile
    toast.success("Profile updated successfully")
  }

  return (
    <div className="adm-settings-container">
      <header className="adm-settings-header">
        <h1>Account Settings</h1>
        <p>Manage your account settings and preferences</p>
      </header>

      <div className="adm-settings-grid">
        {/* Password Change Section */}
        <section className="adm-settings-card">
          <div className="adm-settings-card-header">
            <div className="adm-settings-icon">
              <LockIcon size={20} />
            </div>
            <h2>Change Password</h2>
          </div>
          <div className="adm-settings-card-content">
            <form onSubmit={submitPasswordChange}>
              <div className="adm-form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="adm-form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <small>Password must be at least 8 characters long</small>
              </div>

              <div className="adm-form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <button type="submit" className="adm-btn adm-btn-primary">
                Update Password
              </button>
            </form>
          </div>
        </section>

        {/* Profile Information Section */}
        <section className="adm-settings-card">
          <div className="adm-settings-card-header">
            <div className="adm-settings-icon">
              <UserIcon size={20} />
            </div>
            <h2>Profile Information</h2>
          </div>
          <div className="adm-settings-card-content">
            <form onSubmit={submitProfileUpdate}>
              <div className="adm-profile-picture-container">
                <div
                  className="adm-profile-picture"
                  style={{ backgroundImage: previewUrl ? `url(${previewUrl})` : "none" }}
                  onClick={triggerFileInput}
                >
                  {!previewUrl && <span>Upload Photo</span>}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePictureChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <button type="button" className="adm-btn adm-btn-secondary adm-btn-sm" onClick={triggerFileInput}>
                  Change Picture
                </button>
              </div>

              <div className="adm-form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="adm-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <button type="submit" className="adm-btn adm-btn-primary">
                Update Profile
              </button>
            </form>
          </div>
        </section>

        {/* Session Information Section */}
        <section className="adm-settings-card">
          <div className="adm-settings-card-header">
            <div className="adm-settings-icon">
              <CalendarIcon size={20} />
            </div>
            <h2>Academic Session</h2>
          </div>
          <div className="adm-settings-card-content">
            <div className="adm-session-info">
              <div className="adm-session-item">
                <h3>Current Session</h3>
                <div className="adm-session-value">{sessionInfo.currentSession}</div>
              </div>

              <div className="adm-session-item">
                <h3>Current Semester</h3>
                <div className="adm-session-value">{sessionInfo.currentSemester}</div>
              </div>

              <div className="adm-session-divider"></div>

              <div className="adm-session-item">
                <h3>Next Session</h3>
                <div className="adm-session-value">{sessionInfo.nextSession}</div>
              </div>

              <div className="adm-session-item">
                <h3>Next Semester</h3>
                <div className="adm-session-value">{sessionInfo.nextSemester}</div>
              </div>

              <div className="adm-session-note">
                <p>Note: Session information is managed by the system administrator.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
