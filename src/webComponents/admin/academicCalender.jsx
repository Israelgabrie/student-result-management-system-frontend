import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/academicCalender.css"

export default function AcademicCalendar() {
  const [value, setValue] = useState(new Date());

  // Sample events with labels
  const events = {
    "2025-03-10": "Mid-Semester Exams",
    "2025-04-05": "Project Submission",
    "2025-06-20": "Semester Break",
  };

  const tileContent = ({ date }) => {
    const eventDate = date.toISOString().split("T")[0];
    return events[eventDate] ? (
      <div className="event-label">{events[eventDate]}</div>
    ) : null;
  };

  return (
    <div
      className="homePageContent w-100 p-3 d-flex flex-column align-items-start justify-content-start rounded-1"
      style={{
        backgroundColor: "white",
        flexGrow: 1,
        overflowY: "auto",
        height: "100%",
      }}
    >
      <form className="w-100 d-flex flex-column justify-content-start align-items-start mb-3" style={{maxWidth:"900px",marginLeft:45}}>
        <div class="form-group w-75 d-flex flex-column justify-content-start">
        <label for="exampleInputEmail1" style={{fontFamily:"CalibreBold",fontSize:"30px",marginRight:"auto"}}>Search For Events</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter KeyWord"
          />    
        </div>       
        <button type="submit" class="btn btn-primary mt-3" style={{marginRight:"auto"}}>
          Search
        </button>
      </form>
      <div className="calendar-container bg-white p-4 shadow rounded">
        <h2 className="text-center mb-3">📅 Academic Calendar</h2>
        <Calendar
          onChange={setValue}
          value={value}
          tileContent={tileContent}
          className="w-100"
        />
      </div>
    </div>
  );
}
