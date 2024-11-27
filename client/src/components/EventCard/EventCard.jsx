import PropTypes from "prop-types"; // Import PropTypes
import "./EventCard.css";

function EventCard({ event }) {
  // Kiểm tra trạng thái dựa trên ngày hiện tại so với ngày sự kiện
  const currentDate = new Date();
  const eventDate = new Date(event.date);

  let status = "";
  if (eventDate < currentDate) {
    status = "Đã diễn ra"; // Sự kiện đã qua
  } else if (eventDate > currentDate) {
    status = "Còn diễn"; // Sự kiện chưa diễn ra
  }

  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      {status === "Đã diễn ra" && (
        <div className="event-status past">Đã diễn ra</div>
      )}
      {status === "Còn diễn" && (
        <div className="event-status ongoing">Còn diễn</div>
      )}
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-price">Từ {event.price.toLocaleString()}đ</p>
        <p className="event-date">
          <i
            className="fa-regular fa-calendar-days"
            style={{ marginRight: "5px" }}
          ></i>
          {new Date(event.date).toLocaleDateString("vi-VN")}
        </p>
      </div>
    </div>
  );
}

// PropTypes validation
EventCard.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
