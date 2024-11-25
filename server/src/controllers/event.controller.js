// controllers/eventController.js
const Event = require("../models/eventModel");

// @desc Create a new event
exports.createEvent = async (req, res) => {
  const {
    title,
    image,
    description,
    date,
    location,
    price,
    availableSeats,
    category,
  } = req.body;

  try {
    const event = await Event.create({
      title,
      image,
      description,
      date,
      location,
      price,
      availableSeats,
      category,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get all events with search and sort by category
exports.getEvents = async (req, res) => {
  const { search, category, sortBy = "date" } = req.query;

  try {
    const query = {};
    if (search) query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    if (category) query.category = category;

    const events = await Event.find(query).sort(sortBy); // Default sort by date
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get a single event by ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) throw new Error("Event not found");
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// @desc Update an event
exports.updateEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!event) throw new Error("Event not found");
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Delete an event
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) throw new Error("Event not found");
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// @desc Get the latest events
exports.getLatestEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }).limit(5); // Latest 5 events
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
