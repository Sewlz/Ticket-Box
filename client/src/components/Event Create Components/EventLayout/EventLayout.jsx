import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { EventForm } from "../EventForm/EventForm";
import { EventList } from "../EventList/EventList";
import "./EventLayout.css";

function EventLayout() {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="logo">Organizer Center</div>
        <nav className="menu">
          <NavLink to="/event-create/create-event-list" className="menu-link">
            Sự kiện đã tạo
          </NavLink>
          <NavLink to="/event-create/create-form" className="menu-link">
            Tạo sự kiện
          </NavLink>
          <a href="#" className="menu-link">
            Điều khoản cho Ban tổ chức
          </a>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="create-event-list" element={<EventList events={events} />} />
          <Route
            path="create-form"
            element={<EventForm addEvent={addEvent} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default EventLayout;

// C:\Users\assas\OneDrive\Máy tính\Chuyên_đề_lập_trình_web\Project\Ticket-Box-BE\client\src\components\Event Create Components\EventLayout\EventLayout.jsx