import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons"; // Import icon fa-calendar-days
import "./CalendarFilter.css";

const CalendarFilter = ({
  onApplyFilter,
  resetFilter,
  filterOption,
  setFilterOption,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false); // Trạng thái feedback "Lọc theo"
  const [isButtonActive, setIsButtonActive] = useState(false); // Trạng thái active của nút

  useEffect(() => {
    if (resetFilter) {
      setFilterOption("all"); // Reset về "Tất cả sự kiện" khi reset filter
      setSelectedDate(null);
      setShowFeedback(false); // Reset feedback
      setIsButtonActive(false); // Reset trạng thái active của nút
    }
  }, [resetFilter, setFilterOption]);

  const handleApplyFilter = () => {
    if (filterOption === "all") {
      onApplyFilter({ startDate: null, endDate: null });
    } else if (filterOption === "today") {
      const today = new Date();
      onApplyFilter({ startDate: today, endDate: today });
    } else if (filterOption === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      onApplyFilter({ startDate: tomorrow, endDate: tomorrow });
    } else if (filterOption === "weekend") {
      const weekend = getNextWeekend();
      onApplyFilter({ startDate: weekend.start, endDate: weekend.end });
    } else if (filterOption === "thisMonth") {
      const month = getThisMonth();
      onApplyFilter({ startDate: month.start, endDate: month.end });
    } else if (selectedDate) {
      onApplyFilter({
        startDate: new Date(selectedDate),
        endDate: new Date(selectedDate),
      });
    }

    // Ẩn dropdown và hiển thị feedback
    setShowSortOptions(false);
    setShowFeedback(true);
    setIsButtonActive(false); // Reset trạng thái nút sau khi áp dụng
  };

  const toggleButtonActive = () => {
    setIsButtonActive(!isButtonActive); // Chuyển đổi trạng thái của nút khi nhấn
  };

  const getNextWeekend = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + (6 - today.getDay())); // Saturday
    const end = new Date(start);
    end.setDate(start.getDate() + 1); // Sunday
    return { start, end };
  };

  const getThisMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { start, end };
  };

  return (
    <div className="calendar-filter">
      <button
        onClick={() => {
          toggleButtonActive();
          setShowSortOptions((prev) => !prev);
        }}
        className={`calendar-filter__sort-btn  ${
          isButtonActive ? "active" : ""
        }`}
      >
        {/* Thêm icon FontAwesome */}
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="calendar-filter__icon"
        />
        Sắp xếp theo ngày
      </button>

      {showSortOptions && (
        <div className="calendar-filter__sort-dropdown">
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)} // Cập nhật filterOption
            className="calendar-filter__select"
          >
            <option value="all">Tất cả sự kiện</option>
            <option value="today">Hôm nay</option>
            <option value="tomorrow">Ngày mai</option>
            <option value="weekend">Cuối tuần</option>
            <option value="thisMonth">Tháng này</option>
            <option value="custom">Ngày tùy chọn</option>
          </select>

          {filterOption === "custom" && (
            <div className="calendar-filter__custom-date-picker">
              <input
                type="date"
                value={
                  selectedDate ? selectedDate.toISOString().split("T")[0] : ""
                }
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="calendar-filter__date-input"
              />
            </div>
          )}

          <button
            onClick={handleApplyFilter}
            className="calendar-filter__apply-btn"
          >
            Áp dụng
          </button>
        </div>
      )}

      {showFeedback && (
        <div className="calendar-filter__feedback">
          <strong>Lọc theo:</strong>{" "}
          {filterOption === "all"
            ? "Tất cả sự kiện"
            : filterOption === "today"
            ? "Hôm nay"
            : filterOption === "tomorrow"
            ? "Ngày mai"
            : filterOption === "weekend"
            ? "Cuối tuần"
            : filterOption === "thisMonth"
            ? "Tháng này"
            : "Ngày tùy chọn"}
        </div>
      )}
    </div>
  );
};

CalendarFilter.propTypes = {
  onApplyFilter: PropTypes.func.isRequired,
  resetFilter: PropTypes.bool.isRequired,
  filterOption: PropTypes.string.isRequired,
  setFilterOption: PropTypes.func.isRequired,
};

export default CalendarFilter;
