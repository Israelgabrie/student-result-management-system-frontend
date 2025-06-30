import React, { useEffect, useState } from "react";
import { getallEvents } from "../backendOperation";
import { toast } from "react-toastify";
import "../css/events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchAllEvents() {
    try {
      const response = await getallEvents();
      if (response.success) {
        setEvents(response.allEvents);
      } else {
        toast.error(
          response?.error ||
            response?.response?.data?.message ||
            "Unknown Error"
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-container">
      <h2 className="events-title">Upcoming Events</h2>
      <input
        type="text"
        className="event-search"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <h3 className="event-text">{event.text}</h3>
              <p className="event-location">📍 {event.location}</p>
              <p className="event-date">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="no-events">No events found.</p>
        )}
      </div>
    </div>
  );
}
