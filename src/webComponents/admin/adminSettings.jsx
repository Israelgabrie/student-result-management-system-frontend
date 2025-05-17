import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { LockIcon, CalendarIcon } from "lucide-react"
import "../../css/adminSettings.css"
import { changeAdminPassword, getSemesterAndNext } from "../../backendOperation.js"
import { useUser } from "../../userContext"

export default function AdminSettings() {
  const { user } = useUser()

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [sessionInfo, setSessionInfo] = useState({
    currentSession: "",
    currentSemester: "",
    nextSession: "",
    nextSemester: "",
  })

  useEffect(()=>{
    console.log(sessionInfo)
  },[sessionInfo])

  useEffect(() => {
    async function fetchSemesterDetails() {
      try {
        const response = await getSemesterAndNext();
        console.log(response)
        if (response.success) {
          setSessionInfo({
            currentSession: response.current.session,
            currentSemester: response.current.semester + " Semester",
            nextSession: response.next.session,
            nextSemester: response.next.semester + " Semester",
          })
        } else {
          toast.error("Failed to load session information.")
        }
      } catch (err) {
        toast.error("An error occurred while fetching session info.")
      }
    }

    fetchSemesterDetails()
  }, [])

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const submitPasswordChange = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    try {
      const response = await changeAdminPassword({
        adminId: user._id,
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
      console.log(response)

      if (response.success) {
        toast.success("Password updated successfully")
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      } else {
        toast.error(response.message || "Failed to change password")
      }
    } catch (error) {
      toast.error("An error occurred while changing the password")
    }
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
