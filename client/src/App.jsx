import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { SeatBooking } from "./pages/SeatBooking";
import SearchResults from "./pages/SearchResults"; // Import SearchResults
import { EventDetail } from "./pages/EventDetail";
import EventListPage from "./pages/EventListPage"; // Import EventListPage
import EventLayout from "./components/Event Create Components/EventLayout/EventLayout"; // Import đúng với default export

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/seat-select" element={<SeatBooking />} />
      {/* Trang kết quả tìm kiếm */}
      <Route path="/search" element={<SearchResults />} />{" "}
      <Route path="/seat-select" element={<SeatBooking />} />
      <Route path="/event-detail" element={<EventDetail />} />
      <Route path="/event-create/*" element={<EventLayout />} />
      <Route path="/create-event-list" element={<EventListPage />} />
    </Routes>
  );
}

export default App;
