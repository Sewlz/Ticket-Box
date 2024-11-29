import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { SeatBooking } from "./pages/SeatBooking";
import SearchResults from "./pages/SearchResults";
import EventListPage from "./pages/EventListPage";
import EventLayout from "./components/Event Create Components/EventLayout/EventLayout";
import { EventDetail } from "./pages/EventDetail";
import { ResultPage } from "./components/Booking Conponents/Success";
import BookingList from "./components/Booking Conponents/BookingList";
import { ViewAll } from "./pages/ViewAll";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/seat-select/:eventId" element={<SeatBooking />} />
      <Route path="/view-all" element={<ViewAll />} />
      {/* Trang kết quả tìm kiếm */}
      <Route path="/search" element={<SearchResults />} />{" "}
      <Route path="/seat-select" element={<SeatBooking />} />
      <Route path="/event-detail" element={<EventDetail />} />
      <Route path="/event-create/*" element={<EventLayout />} />
      <Route path="/create-event-list" element={<EventListPage />} />
      <Route path="/event-detail/:id" element={<EventDetail />} />
      <Route path="/my-booking" element={<BookingList />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
