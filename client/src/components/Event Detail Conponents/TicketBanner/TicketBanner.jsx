import React, { useState, useRef, useEffect } from "react";
import "./TicketBanner.css";
import eventData from "../../../data/event.json";

export function TicketBanner() {
  const [tickets, setTickets] = useState(eventData.event[0]);
  return (
    <div className="ticket-banner">
      <div className="ticket-wrapper">
        <div className="ticket-info">
          <div id="circle1" className="circle"></div>
          <div id="circle2" className="circle"></div>
          <svg
            width="4"
            height="415"
            viewBox="0 0 4 415"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="vertical-dashed"
          >
            <path
              stroke="#27272A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="4 10"
              d="M2 2v411"
            ></path>
          </svg>

          <h2 className="text-light bold">{tickets.name}</h2>

          <div className="ticket-info">
            <div className="date-time">
              <i className="fas fa-calendar-alt text-light"></i>{" "}
              <span className="text-success">
                {`${tickets.eventTime}, ${tickets.eventDate}`}
              </span>
            </div>
            <div className="location">
              <i className="fas fa-map-marker-alt text-light"></i>
              <span className="text-success">
                {tickets.theater.theaterName}
              </span>
              <p className="text-light mt-2">
                {tickets.theater.theaterAddress}
              </p>
            </div>
          </div>
          <div className="text-light price">
            <div className="line mb-2"></div>
            <span className="text-light">Giá từ: </span>
            <span className="text-success">{tickets.pricing[0].price} đ</span>
          </div>
          <button className="btn btn-success btn-lg btn-block mb-2">
            Chọn lịch diễn
          </button>
        </div>

        <div className="ticket-image">
          <img
            src="https://salt.tkbcdn.com/ts/ds/2d/93/c3/91611a634b4e80e818b6c1672606a6f5.png"
            alt="The Bootleg Beatles"
          />
        </div>
      </div>
    </div>
  );
}
