import React, { useState, useRef, useEffect } from "react";
import "./EventDescription.css";
import eventData from "../../../data/event.json";
export function EventDetails() {
  const [tickets, setTickets] = useState(eventData.event[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef(null);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(
        isExpanded ? `${contentRef.current.scrollHeight}px` : "300px"
      );
    }
  }, [isExpanded]);

  const content = tickets.description;

  return (
    <div className="container my-4" style={{ maxWidth: "1400px" }}>
      <div className="card shadow-sm" style={{ backgroundColor: "white" }}>
        <div className="card-body">
          <h5 className="card-title">Event Details</h5>
          <div className="line"></div>
          <div
            className="p-3 content-container"
            ref={contentRef}
            style={{
              maxHeight: contentHeight,
              overflow: "hidden",
              transition: "max-height 0.5s ease-in-out",
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div
            className="blur"
            style={{ display: isExpanded ? "none" : "block" }}
          />
          <div
            className="mt-2"
            onClick={toggleReadMore}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              zIndex: 5,
              position: "relative",
            }}
          >
            {isExpanded ? (
              <i class="fa-solid fa-chevron-up"></i>
            ) : (
              <i class="fa-solid fa-chevron-down"></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
