import React, { useState } from "react";
import "./SeatSelection.css";

export function SeatSelection() {
  // Sample seat data: Rows with seat availability (true: available, false: booked)
  const initialSeats = [
    [true, true, false, true, true],
    [true, false, true, false, true],
    [true, true, true, true, true],
    [false, true, true, false, false],
    [true, true, false, true, true],
  ];
  // State to track selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);
  // Handle seat click (toggle selection)
  const handleSeatClick = (rowIndex, seatIndex) => {
    const seatId = `${rowIndex}-${seatIndex}`;
    if (selectedSeats.includes(seatId)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  // Check if a seat is selected
  const isSeatSelected = (rowIndex, seatIndex) => {
    return selectedSeats.includes(`${rowIndex}-${seatIndex}`);
  };
  return (
    <div className="seat-selection-container mb-5 mt-5">
      <h3>Select Your Seats</h3>
      <div className="seat-grid">
        {initialSeats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((isAvailable, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${!isAvailable ? "booked" : ""} ${
                  isSeatSelected(rowIndex, seatIndex) ? "selected" : ""
                }`}
                onClick={() =>
                  isAvailable && handleSeatClick(rowIndex, seatIndex)
                }
              >
                {seatIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="seat-info">
        <p className="d-flex flex-column align-items-center">
          <span className="seat available"></span> Available
        </p>
        <p className="d-flex flex-column align-items-center">
          <span className="seat selected"></span> Selected
        </p>
        <p className="d-flex flex-column align-items-center">
          <span className="seat booked"></span> Booked
        </p>
      </div>
    </div>
  );
}
