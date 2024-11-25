const Booking = require("../models/booking.model.js");
const Event = require("../models/event.model.js");
const {
  createPayPalOrder,
  capturePayPalOrder,
} = require("../utils/palypal.util.js");

// @desc Create a booking and generate a PayPal order
exports.createBooking = async (req, res) => {
  const { eventId, userName, userEmail, seatsBooked } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.availableSeats < seatsBooked) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    const totalPrice = event.price * seatsBooked;

    // Create a new booking with Pending payment status
    const booking = await Booking.create({
      eventId,
      userName,
      userEmail,
      seatsBooked,
      totalPrice,
      paymentStatus: "Pending",
    });

    // Create a PayPal order
    const paypalOrder = await createPayPalOrder(totalPrice);

    res.status(201).json({
      booking,
      paypalOrderID: paypalOrder.id,
      approvalLink: paypalOrder.links.find((link) => link.rel === "approve")
        .href,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Capture PayPal payment and update booking status
exports.capturePayment = async (req, res) => {
  const { orderID, bookingID } = req.body;

  try {
    const captureData = await capturePayPalOrder(orderID);

    const booking = await Booking.findById(bookingID);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.paymentStatus = "Completed";
    booking.transactionId = orderID;
    await booking.save();

    // Update event's available seats
    const event = await Event.findById(booking.eventId);
    event.availableSeats -= booking.seatsBooked;
    await event.save();

    res.status(200).json({ message: "Payment captured successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("eventId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get a single booking
exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id).populate("eventId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
