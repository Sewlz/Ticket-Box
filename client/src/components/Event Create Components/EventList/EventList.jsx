import { useState, useEffect } from "react";
import axios from "axios";
import "./EventList.css";

export function EventList() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEventId, setEditingEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("An error occurred while fetching events.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      alert("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred while deleting the event.");
    }
  };

  const handleSave = async (updatedEvent) => {
    try {
      await axios.put(
        `http://localhost:5000/api/events/${updatedEvent._id}`,
        updatedEvent
      );
      alert("Event updated successfully!");
      fetchEvents();
      setEditingEventId(null);
    } catch (error) {
      console.error("Error updating event:", error);
      alert("An error occurred while updating the event.");
    }
  };

  const handleEdit = (eventId) => {
    setEditingEventId((prevId) => (prevId === eventId ? null : eventId));
  };

  const filterEvents = () => {
    let filtered = events;
    const currentDate = new Date();

    if (filter === "upcoming") {
      filtered = events.filter((event) => new Date(event.date) > currentDate);
    } else if (filter === "past") {
      filtered = events.filter((event) => new Date(event.date) < currentDate);
    }

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDateAndTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    return { dateString, timeString };
  };

  return (
    <div className="custom-event-list-container">
      <header className="custom-header">
        <div className="custom-search-section">
          <input
            type="text"
            className="custom-search-bar"
            placeholder="Search events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="custom-filters">
          <button
            className={`custom-filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`custom-filter-btn ${
              filter === "upcoming" ? "active" : ""
            }`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`custom-filter-btn ${filter === "past" ? "active" : ""}`}
            onClick={() => setFilter("past")}
          >
            Past
          </button>
        </div>
      </header>

      <section className="custom-content">
        {filterEvents().length === 0 ? (
          <p>No events available!</p>
        ) : (
          filterEvents().map((event) => {
            const { dateString, timeString } = formatDateAndTime(event.date);

            const isEditing = editingEventId === event._id;

            return (
              <div key={event._id} className="custom-event-card">
                {isEditing ? (
                  <div className="custom-event-details">
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) =>
                        setEvents((prev) =>
                          prev.map((ev) =>
                            ev._id === event._id
                              ? { ...ev, eventName: e.target.value }
                              : ev
                          )
                        )
                      }
                      className="custom-edit-input"
                    />
                    <input
                      type="url"
                      value={event.image}
                      onChange={(e) =>
                        setEvents((prev) =>
                          prev.map((ev) =>
                            ev._id === event._id
                              ? { ...ev, image: e.target.value }
                              : ev
                          )
                        )
                      }
                      className="custom-edit-input"
                    />
                    <textarea
                      value={event.description}
                      onChange={(e) =>
                        setEvents((prev) =>
                          prev.map((ev) =>
                            ev._id === event._id
                              ? { ...ev, description: e.target.value }
                              : ev
                          )
                        )
                      }
                      className="custom-edit-textarea"
                    />
                    <input
                      type="date"
                      value={event.date}
                      onChange={(e) =>
                        setEvents((prev) =>
                          prev.map((ev) =>
                            ev._id === event._id
                              ? { ...ev, date: e.target.value }
                              : ev
                          )
                        )
                      }
                      className="custom-edit-input"
                    />
                    <input
                      type="time"
                      value={event.time}
                      onChange={(e) =>
                        setEvents((prev) =>
                          prev.map((ev) =>
                            ev._id === event._id
                              ? { ...ev, time: e.target.value }
                              : ev
                          )
                        )
                      }
                      className="custom-edit-input"
                    />
                    <input
                      type="text"
                      value={event.location}
                      onChange={(e) =>
                        setEvents((prev) =>
                          prev.map((ev) =>
                            ev._id === event._id
                              ? { ...ev, location: e.target.value }
                              : ev
                          )
                        )
                      }
                      className="custom-edit-input"
                    />
                    <input
                      type="number"
                      value={event.price}
                      onChange={(e) =>
                        setEvents((prev) =>
                          prev.map((ev) =>
                            ev._id === event._id
                              ? { ...ev, price: e.target.value }
                              : ev
                          )
                        )
                      }
                      className="custom-edit-input"
                    />
                    <input
                      type="number"
                      value={event.availableSeats}
                      onChange={(e) =>
                        setEvents((prev) =>
                          prev.map((ev) =>
                            ev._id === event._id
                              ? { ...ev, availableSeats: e.target.value }
                              : ev
                          )
                        )
                      }
                      className="custom-edit-input"
                    />
                    <div className="custom-form-group">
                      <label htmlFor="category">Thể loại</label>
                      <select
                        id="category"
                        name="category"
                        value={event.category}
                        onChange={(e) =>
                          setEvents((prev) =>
                            prev.map((ev) =>
                              ev._id === event._id
                                ? { ...ev, category: e.target.value }
                                : ev
                            )
                          )
                        }
                        className="custom-edit-input"
                      >
                        <option value="">Chọn thể loại</option>
                        <option value="Art">Art</option>
                        <option value="Music">Music</option>
                        <option value="Health">Health</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                    <button
                      className="custom-save-btn"
                      onClick={() => handleSave(event)}
                    >
                      Save
                    </button>
                    <button
                      className="custom-cancel-btn"
                      onClick={() => setEditingEventId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="custom-event-details">
                    <div className="custom-event-image">
                      <img src={event.image} alt={event.title} />
                    </div>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>
                      <strong>Ngày:</strong> {dateString}
                    </p>
                    <p>
                      <strong>Giờ:</strong> {timeString}
                    </p>
                    <p>
                      <strong>Địa điểm:</strong> {event.location}
                    </p>
                    <p>
                      <strong>Giá vé:</strong> {event.price} VND
                    </p>
                    <p>
                      <strong>Số ghế còn:</strong> {event.availableSeats}
                    </p>
                    <p>
                      <strong>Thể loại:</strong> {event.category}
                    </p>
                    <div className="custom-event-actions">
                      <button
                        className="custom-delete-btn"
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="custom-edit-btn"
                        onClick={() => handleEdit(event._id)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
