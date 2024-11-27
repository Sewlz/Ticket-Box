import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard/EventCard.jsx";
import CalendarFilter from "../components/CalendarFilter/CalendarFilter.jsx";
import "./styles/SearchResults.css";

function SearchResults() {
  const { search } = useLocation();
  const [events, setEvents] = useState([]); // Lưu trữ tất cả sự kiện
  const [filteredEvents, setFilteredEvents] = useState([]); // Sự kiện đã lọc
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [resetFilter, setResetFilter] = useState(false);
  const [filterOption, setFilterOption] = useState("all");

  // Lấy từ khóa tìm kiếm từ URL
  const params = new URLSearchParams(search);
  const keyword = params.get("search");

  // Fetch dữ liệu sự kiện theo từ khóa
  useEffect(() => {
    const fetchEvents = (keyword) => {
      setIsLoading(true);
      const url = `http://localhost:5000/api/events?search=${encodeURIComponent(
        keyword
      )}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setEvents(data); // Lưu trữ tất cả sự kiện không có bộ lọc
          setFilteredEvents(data); // Đặt lại tất cả sự kiện vào ban đầu
          setIsLoading(false);
          setDateRange({ startDate: null, endDate: null }); // Reset dateRange
          setFilterOption("all"); // Reset filterOption về "Tất cả sự kiện"
          setResetFilter(false); // Đảm bảo reset khi không sử dụng bộ lọc
        })
        .catch((err) => {
          console.error("Lỗi khi lấy sự kiện:", err);
          setError("Không thể tải dữ liệu sự kiện. Vui lòng thử lại sau.");
          setIsLoading(false);
        });
    };

    if (keyword) {
      fetchEvents(keyword); // Fetch lại sự kiện khi từ khóa thay đổi
    }
  }, [keyword]); // Khi từ khóa thay đổi, dữ liệu sẽ được reset
  // Reset filterOption và filteredEvents khi từ khóa thay đổi
  useEffect(() => {
    if (keyword) {
      // Nếu từ khóa thay đổi, reset bộ lọc và hiển thị lại tất cả sự kiện
      setFilterOption("all");
      setFilteredEvents(events); // Đảm bảo khi tìm kiếm lại thì danh sách sự kiện sẽ được reset
    }
  }, [keyword, events]);

  const handleApplyDateFilter = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
    setResetFilter(false); // Ngừng reset sau khi áp dụng bộ lọc
  };

  const handleResetFilters = () => {
    setDateRange({ startDate: null, endDate: null });
    setFilteredEvents(events); // Đặt lại tất cả sự kiện
    setResetFilter(true); // Reset bộ lọc
  };

  const filteredByDate = filteredEvents.filter((event) => {
    const eventDate = new Date(event.date);
    const eventDateWithoutTime = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    );

    if (!dateRange.startDate || !dateRange.endDate) return true;

    const startDateWithoutTime = new Date(
      dateRange.startDate.getFullYear(),
      dateRange.startDate.getMonth(),
      dateRange.startDate.getDate()
    );
    const endDateWithoutTime = new Date(
      dateRange.endDate.getFullYear(),
      dateRange.endDate.getMonth(),
      dateRange.endDate.getDate()
    );

    return (
      eventDateWithoutTime >= startDateWithoutTime &&
      eventDateWithoutTime <= endDateWithoutTime
    );
  });

  return (
    <div className="search-results">
      <div className="calendar-filter-container">
        <CalendarFilter
          onApplyFilter={handleApplyDateFilter}
          onResetFilter={handleResetFilters}
          resetFilter={resetFilter}
          filterOption={filterOption} // Truyền filterOption vào CalendarFilter
          setFilterOption={setFilterOption} // Cung cấp setter để CalendarFilter có thể thay đổi filterOption
        />
      </div>
      <h1>Kết quả tìm kiếm cho: &quot;{keyword}&quot;</h1>
      {isLoading && <p>Đang tải sự kiện...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Hiển thị khi không có sự kiện nào sau khi tìm kiếm hoặc lọc */}

      {filteredByDate.length === 0 ? (
        <div className="no-results">
          <img
            src="https://ticketbox.vn/_next/image?url=%2F_next%2Fstatic%2Fimages%2Fempty.png&w=384&q=75"
            alt="No Results"
            className="no-results-image"
          />
          <div className="no-results-text">
            <p>Rất tiếc! Không tìm thấy kết quả nào</p>
            <p>
              Bạn hãy thử điều chỉnh lại bộ lọc, sử dụng các từ khóa phổ biến
              hơn hoặc khám phá các sự kiện nổi bật bên dưới
            </p>
          </div>
        </div>
      ) : (
        <div className="event-grid">
          {filteredByDate.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
