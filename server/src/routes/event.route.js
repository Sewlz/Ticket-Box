const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getLatestEvents,
} = require("../controllers/event.controller.js");

router.post("/", createEvent);

router.get("/", getEvents);

router.get("/latest", getLatestEvents);

router.get("/:id", getEventById);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
