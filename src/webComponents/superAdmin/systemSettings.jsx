import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "../../superAdminCss/systemSettings.css";
import { useUser } from "../../userContext";
import { changeSemesterDetails } from "../../backendOperation";


export default function SystemSettings() {
    const [selectedSemester,setSelectedSemester] = useState("");
    const [session,setSession] = useState("");
    const {user,setUser} = useUser();

    // useEffect(()=>{
    //     console.log(selectedSemester,session)

    // },[selectedSemester,session])

    async function handleSubmit(e){
        try{
            e.preventDefault()
            const requestBody = {
                userId:user._id,
                semester:selectedSemester,
                session:session
            }

           const response = await changeSemesterDetails(requestBody);
           console.log(response)

           if(response?.success){
            toast.success("System updated successfully");
          }else{
            toast.error(response?.message || response.response.data.message || "Something went wrong")
          }
                        
        }catch(error){
            toast.dismiss();
            toast.error(error.message)
        }
    }

  return (
    <div className="system-settings-container">
      <ToastContainer />
      <h2 className="settings-title">System Settings</h2>
      <form className="system-settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentSemester">Current Semester</label>
          <select name="currentSemester" id="currentSemester" onChange={((e)=>{setSelectedSemester(e.target.value)})}>
            <option value="">Select</option>
            <option value="First">First Semester</option>
            <option value="Second">Second Semester</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="currentSession">Current Session</label>
          <input
            type="text"
            id="currentSession"
            name="currentSession"
            value={session}
            onChange={((e)=>{setSession(e.target.value)})}
            placeholder="e.g., 2024/2025"
            
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="gradingScale">Grading Scale</label>
          <input
            type="text"
            id="gradingScale"
            name="gradingScale"
            placeholder="e.g., A-F or 5.0 Scale"
          />
        </div> */}

        <button type="submit" className="save-btn">
          Save Settings
        </button>
      </form>
    </div>
  );
}
