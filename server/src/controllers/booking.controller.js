const Booking = require("../models/booking.model.js");
const Event = require("../models/event.model.js");
const {
  createPayPalOrder,
  capturePayPalOrder,
} = require("../utils/palypal.util.js");

exports.createBooking = async (req, res) => {
  const { eventId, userName, userEmail, seatsBooked } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.availableSeats < seatsBooked) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    const totalPrice = event.price * seatsBooked;

    const booking = await Booking.create({
      eventId,
      userName,
      userEmail,
      seatsBooked,
      totalPrice,
      paymentStatus: "Pending",
    });

    const paypalOrder = await createPayPalOrder(totalPrice);

    res.status(201).json({
      booking,
      paypalOrderID: paypalOrder.id,
      approvalLink: paypalOrder.links.find((link) => link.rel === "approve")
        .href,
    });
  } catch (error) {
    console.log("🚀 ~ exports.createBooking= ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.capturePayment = async (req, res) => {
  const { orderID, bookingID } = req.body;

  if (!orderID || !bookingID) {
    return res.status(400).json({
      message: "orderID and bookingID are required",
    });
  }

  try {
    const captureData = await capturePayPalOrder(orderID);

    if (!captureData || captureData.status !== "COMPLETED") {
      return res.status(422).json({
        message: "Payment capture failed or not completed",
        details: captureData,
      });
    }

    const booking = await Booking.findById(bookingID);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "Completed";
    booking.transactionId = orderID;
    await booking.save();

    const event = await Event.findById(booking.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats < booking.seatsBooked) {
      return res.status(400).json({
        message: "Not enough available seats for this booking",
      });
    }

    event.availableSeats -= booking.seatsBooked;
    await event.save();

    return res.status(200).json({
      message: "Payment captured successfully",
      booking,
    });
  } catch (error) {
    console.error("🚀 ~ capturePayment error:", error);

    return res.status(500).json({
      message: "An error occurred while capturing the payment",
      error: error.message,
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("eventId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
