import React from "react";
import "./Booking.css";

export function Booking() {
  return (
    <div className="booking-container mt-5 mb-5">
      <h2>Book Your Event</h2>

      <form className="booking-form">
        <div className="form-group">
          <label htmlFor="event-name">Event</label>
          <select id="event-name" className="form-control" disabled>
            <option>Select an event...</option>
            <option value="event1">Event 1</option>
            <option value="event2">Event 2</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" className="form-control" />
        </div>

        <button type="submit" className="btn btn-success submit-btn">
          Book Now
        </button>
      </form>
    </div>
  );
}
