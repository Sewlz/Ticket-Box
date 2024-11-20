import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { SeatBooking } from "./pages/SeatBooking";
import { EventDetail } from "./pages/EventDetail";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/seat-select" element={<SeatBooking />} />
        <Route path="/event-detail" element={<EventDetail />} />
      </Routes>
    </>
  );
}

export default App;
