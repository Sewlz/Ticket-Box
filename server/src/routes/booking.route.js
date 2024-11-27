const express = require("express");
const {
  createBooking,
  capturePayment,
  getBookings,
  getBookingById,
} = require("../controllers/booking.controller.js");

const router = express.Router();

router.post("/", createBooking);

router.post("/capture", capturePayment);

router.get("/", getBookings);

router.get("/:id", getBookingById);

module.exports = router;
