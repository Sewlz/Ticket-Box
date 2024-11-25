// routes/bookingRoutes.js
const express = require("express");
const {
  createBooking,
  capturePayment,
  getBookings,
  getBookingById,
} = require("../controllers/bookingController");

const router = express.Router();

// Create a new booking and generate PayPal order
router.post("/", createBooking);

// Capture PayPal payment
router.post("/capture", capturePayment);

// Get all bookings
router.get("/", getBookings);

// Get a booking by ID
router.get("/:id", getBookingById);

module.exports = router;
