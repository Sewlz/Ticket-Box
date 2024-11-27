import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { SeatBooking } from "./pages/SeatBooking";
import { EventDetail } from "./pages/EventDetail";
import { ResultPage } from "./components/Booking Conponents/Success";
import BookingList from "./components/Booking Conponents/BookingList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/seat-select/:eventId" element={<SeatBooking />} />
        <Route path="/event-detail/:id" element={<EventDetail />} />
        <Route path="/my-booking" element={<BookingList />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </>
  );
}

export default App;
