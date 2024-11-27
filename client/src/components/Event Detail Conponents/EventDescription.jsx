import React from "react";
import "./style/EventDescription.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
const apiUrl = "http://localhost:5000/api/";

export function EventDetails() {
  const { id } = useParams();
  const {
    data: tickets,
    loading,
    error,
  } = useFetch(`${apiUrl}events/${id}`, [id]);

  if (loading) {
    return <div>Loading ticket details...</div>;
  }

  if (error) {
    return <div>Error loading ticket: {error.message}</div>;
  }
  const content = tickets.description;

  return (
    <div className="container my-4" style={{ maxWidth: "1400px" }}>
      <div className="card shadow-sm" style={{ backgroundColor: "white" }}>
        <div className="card-body">
          <h5 className="card-title">Event Details</h5>
          <div className="line"></div>
          <div className="p-3 content-container">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
