import { useState } from "react";
import axios from "axios";

const apiUrl = "http://localhost:5000/api/";

export function useBooking() {
  const [bookingResponse, setBookingResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const bookSeats = async (eventId, userName, userEmail, seatsBooked) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}bookings`, {
        eventId,
        userName,
        userEmail,
        seatsBooked,
      });

      setBookingResponse(response.data);
      console.log("Booking successful:", response.data);
    } catch (err) {
      console.error("Booking failed:", err);
      setError("Failed to complete the booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    bookingResponse,
    error,
    loading,
    bookSeats,
  };
}

