import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { SeatBooking } from "./pages/SeatBooking";
import SearchResults from "./pages/SearchResults"; // Import SearchResults

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/seat-select" element={<SeatBooking />} />
        {/* Trang kết quả tìm kiếm */}
        <Route path="/search" element={<SearchResults />} />{" "}
      </Routes>
    </>
  );
}

export default App;
