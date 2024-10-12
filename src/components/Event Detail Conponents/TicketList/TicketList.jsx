import React, { useState, useRef, useEffect } from "react";
import eventData from "../../../data/event.json";

export function TicketList() {
  const [tickets, setTickets] = useState(eventData.event);
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef(null);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(
        isExpanded ? `${contentRef.current.scrollHeight}px` : "0"
      );
    }
  }, [isExpanded]);

  return (
    <div className="container my-4" style={{ maxWidth: "1400px" }}>
      <div className="card shadow-sm" style={{ backgroundColor: "white" }}>
        <div className="card-body">
          <h5 className="card-title">Ticket Information</h5>
          <div className="line"></div>
          <div className="p-3 content-container">
            {/* ticket-item */}
            {tickets.map((ticket) => (
              <div className="ticket-item mb-3" key={ticket.id}>
                <div className="row-wrapper d-flex justify-content-between">
                  <div className="first-row d-flex">
                    <div
                      className="align-content-center"
                      onClick={toggleReadMore}
                      style={{
                        zIndex: 5,
                        position: "relative",
                      }}
                    >
                      {isExpanded ? (
                        <i className="fa-solid fa-chevron-up"></i>
                      ) : (
                        <i className="fa-solid fa-chevron-right"></i>
                      )}
                    </div>
                    <div className="ticket-date align-content-center">
                      <span>{`${ticket.eventTime}, ${ticket.eventDate}`}</span>
                    </div>
                  </div>
                  <button className="btn btn-success btn-lg">
                    Mua vé ngay
                  </button>
                </div>
                <div
                  className="ticket-list mt-3"
                  ref={contentRef}
                  style={{
                    maxHeight: contentHeight,
                    overflow: "hidden",
                    transition: "max-height 0.5s ease-in-out",
                  }}
                >
                  <table className="table table-striped">
                    <tbody>
                      {ticket.pricing.map((priceInfo) => (
                        <tr key={priceInfo.ticketType}>
                          <td className="ticket-type">
                            {priceInfo.ticketType}
                          </td>
                          <td className="price-value text-center">
                            {`${priceInfo.price} ${priceInfo.currency}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
