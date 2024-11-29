import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const apiUrl = "http://localhost:5000/api/";

export function ViewAllEvents(data) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const resp = await axios.get(`${apiUrl}events${data.params}`);
        setEvents(resp.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, [data.params]);

  const handleNavigate = (eventId) => {
    navigate(`/event-detail/${eventId}`);
  };

  return (
    <div className="view-all-events">
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="text-danger">Failed to load events.</div>
      ) : (
        <Container>
          <Row className="gy-4">
            {events.map((event) => (
              <Col
                key={event._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                onClick={() => handleNavigate(event._id)}
              >
                <div className="ticket-card">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="ticket-img img-fluid"
                  />
                  <div className="ticket-info">
                    <h7 className="text-light">{event.title}</h7>
                    <div>
                      <span
                        style={{
                          color: "rgb(45, 194, 117)",
                          marginRight: "10px",
                        }}
                      >
                        <i className="fa-solid fa-circle"></i> Từ {event.price}đ
                      </span>
                    </div>
                    <span className="mt-2 text-light">
                      <i className="fa-regular fa-calendar"></i>{" "}
                      {new Date(event.date).toLocaleDateString()} -{" "}
                      {new Date(event.date).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}
