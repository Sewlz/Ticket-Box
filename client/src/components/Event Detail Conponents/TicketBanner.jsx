import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style/TicketBanner.css";
import { useFetch } from "../../hooks/UseFetch";
const apiUrl = "http://localhost:5000/api/";
export function TicketBanner() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: ticket,
    loading,
    error,
  } = useFetch(`${apiUrl}events/${id}`, [id]);

  if (loading) {
    return <div>Loading ticket details...</div>;
  }

  if (error) {
    return <div>Error loading ticket: {error.message}</div>;
  }
  function handleClick(e) {
    e.stopPropagation();
    navigate(`/seat-select/${id}`);
  }
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

          <h2 className="text-light bold fs-2">{ticket.title}</h2>

          <div className="ticket-info">
            <div className="date-time">
              <i className="fas fa-calendar-alt text-light"></i>{" "}
              <span className="text-success">
                {`${new Date(ticket.date).toLocaleTimeString()}, ${new Date(
                  ticket.eventDate
                ).toLocaleTimeString()}`}
              </span>
            </div>
            <div className="location">
              <i className="fas fa-map-marker-alt text-light"></i>
              <span className="text-light mt-2">{ticket.location}</span>
            </div>
          </div>
          <div className="text-light price">
            <div className="line mb-2"></div>
            <span className="text-light">Giá từ: </span>
            <span className="text-success">{ticket.price} đ</span>
          </div>
          <button
            className="btn btn-success btn-lg btn-block mb-2"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Mua vé ngay!
          </button>
        </div>

        <div className="ticket-image">
          <img src={`${ticket.image}`} alt="The Bootleg Beatles" />
        </div>
      </div>
    </div>
  );
}
