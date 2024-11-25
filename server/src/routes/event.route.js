// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getLatestEvents,
} = require("../controllers/eventController");

// Route to create an event
router.post("/", createEvent);

// Route to get all events (with search, sort, and filter)
router.get("/", getEvents);

// Route to get the latest events
router.get("/latest", getLatestEvents);

// Route to get a single event by ID
router.get("/:id", getEventById);

// Route to update an event
router.put("/:id", updateEvent);

// Route to delete an event
router.delete("/:id", deleteEvent);

module.exports = router;
