import React, { useEffect, useState } from "react";
import { Table, Pagination, Container } from "react-bootstrap";
import { useFetch } from "../../hooks/UseFetch";

const apiUrl = "http://localhost:5000/api/";

function BookingList() {
  const { data: bookings } = useFetch(`${apiUrl}bookings`);
  const { data: events } = useFetch(`${apiUrl}events`); // Fetch all events
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentBookings, setCurrentBookings] = useState([]);
  const itemsPerPage = 5;

  const eventMap = events
    ? events.reduce((map, event) => {
        map[event._id.$oid] = event.title;
        return map;
      }, {})
    : {};

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      setTotalPages(Math.ceil(bookings.length / itemsPerPage));
      setCurrentBookings(bookings.slice(0, itemsPerPage));
    } else {
      setTotalPages(1);
      setCurrentBookings([]);
    }
  }, [bookings]);

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      setCurrentBookings(bookings.slice(startIdx, endIdx));
    }
  }, [currentPage, bookings]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container>
      <h2>Booking List</h2>
      {bookings === null || events === null ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Name</th>
                <th>Email</th>
                <th>Seats Booked</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking, index) => (
                <tr key={booking._id.$oid}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{eventMap[booking.eventId.$oid] || "Unknown Event"}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.userEmail}</td>
                  <td>{booking.seatsBooked}</td>
                  <td>{booking.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </>
      )}
    </Container>
  );
}

export default BookingList;
