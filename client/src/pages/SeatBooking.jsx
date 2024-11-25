import { Booking } from "../components/Booking Conponents/Booking/Booking";
import { SeatSelection } from "../components/Booking Conponents/SeatSelection/SeatSelection";
import "./styles/SeatBooking.css";
export function SeatBooking() {
  return (
    <div className="d-flex justify-content-center booking-container">
      <SeatSelection />
      <Booking />
    </div>
  );
}
