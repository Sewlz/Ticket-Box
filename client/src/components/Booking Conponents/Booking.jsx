import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button
import "./style/Booking.css";
import { useParams } from "react-router-dom";
import { useBooking } from "../../hooks/useBooking";

export function Booking() {
  const { eventId } = useParams();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [seatsBooked, setSeatsBooked] = useState(1);
  const { bookingResponse, error, loading, bookSeats } = useBooking();
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    if (!userName || !userEmail || seatsBooked <= 0) {
      alert("All fields are required and seats must be greater than 0.");
      return false;
    }
    return true;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    bookSeats(eventId, userName, userEmail, seatsBooked);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    if (bookingResponse) {
      setShowModal(true);
    }
  }, [bookingResponse]);

  return (
    <div className="booking-container mt-5 mb-5">
      <h2>Book Your Event</h2>

      <form className="booking-form" onSubmit={handleBooking}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="seatsBooked">Seats:</label>
          <input
            type="number"
            id="seatsBooked"
            className="form-control"
            value={seatsBooked}
            onChange={(e) => setSeatsBooked(Number(e.target.value))}
            min="1"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success submit-btn"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Event ID: {bookingResponse?.booking.eventId}</p>
          <p>Total Price: {bookingResponse?.booking.totalPrice} đ</p>
          <p>Payment Status: {bookingResponse?.booking.paymentStatus}</p>
          <a
            href={bookingResponse?.approvalLink}
            target="_blank"
            rel="noreferrer"
          >
            Complete Payment via PayPal
          </a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
