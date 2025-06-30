import React, { useState } from "react";
import "../../superAdminCss/addEvent.css";
import { addEvent, getallEvents, deleteEvent } from "../../backendOperation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminEventOutlet() {
  const [eventDate, setEventDate] = useState("");
  const [eventText, setEventText] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [events, setEvents] = useState([]);

  async function fetchAllEvents() {
    try {
      const response = await getallEvents();
      console.log(response);
      if (response.success) {
        toast.success("events fetch successfully");
        setEvents(response?.allEvents);
      } else {
        toast.error(response?.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const handleAddEvent = async () => {
    if (!eventDate || !eventText) return;
    const newEvent = {
      id: Date.now(),
      date: eventDate,
      text: eventText,
      location: eventLocation || "TBD",
    };

    const response = await addEvent({
      date: eventDate,
      text: eventText,
      location: eventLocation || "TBD",
    });
    if (response?.success) {
      setEvents(response?.allEvents);
    } else {
      toast.error(response?.error);
    }
    setEventDate("");
    setEventText("");
    setEventLocation("");
  };

  const handleDeleteEvent = async (id) => {
    const response = await deleteEvent({ id: id });
    if (response.success) {
        toast.success("event deleted successfully")
      setEvents(response?.allEvents);
    } else {
      toast.error(response?.error);
    }
    setEventDate("");
    setEventText("");
    setEventLocation("");
  };

  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="aeo-container">
      <div className="aeo-header">
        <h2 className="aeo-title">Event Management</h2>
        <p className="aeo-subtitle">Create and manage university events</p>
      </div>

      <div className="aeo-content">
        <div className="aeo-form-card">
          <div className="aeo-form-header">
            <div className="aeo-form-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="aeo-form-title">Add New Event</h3>
          </div>

          <div className="aeo-form-body">
            <div className="aeo-form-group">
              <label className="aeo-form-label">Event Date</label>
              <input
                type="date"
                className="aeo-form-input"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>

            <div className="aeo-form-group">
              <label className="aeo-form-label">Event Description</label>
              <textarea
                className="aeo-form-textarea"
                rows="3"
                placeholder="Enter event details..."
                value={eventText}
                onChange={(e) => setEventText(e.target.value)}
              ></textarea>
            </div>

            <div className="aeo-form-group">
              <label className="aeo-form-label">Event Location</label>
              <input
                type="text"
                className="aeo-form-input"
                placeholder="Enter location..."
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </div>

            <button
              onClick={handleAddEvent}
              className="aeo-submit-btn"
              disabled={!eventDate || !eventText}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Event
            </button>
          </div>
        </div>

        <div className="aeo-events-card">
          <div className="aeo-events-header">
            <h3 className="aeo-events-title">Upcoming Events</h3>
            <span className="aeo-events-count">{events.length} events</span>
          </div>

          {events.length === 0 ? (
            <div className="aeo-empty-state">
              <div className="aeo-empty-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
              </div>
              <p className="aeo-empty-text">No events added yet.</p>
              <p className="aeo-empty-subtext">
                Create your first event using the form.
              </p>
            </div>
          ) : (
            <ul className="aeo-events-list">
              {events.map((event) => (
                <li key={event._id || event.id} className="aeo-event-item">
                  <div className="aeo-event-date">
                    <span className="aeo-date-day">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="aeo-date-month">
                      {new Date(event.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </span>
                  </div>
                  <div className="aeo-event-content">
                    <h4 className="aeo-event-title">{event.text}</h4>
                    <div className="aeo-event-details">
                      <span className="aeo-event-full-date">
                        {formatDate(event.date)}
                      </span>
                      {event.location && (
                        <span className="aeo-event-location">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="aeo-delete-btn"
                    title="Delete event"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
