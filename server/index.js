const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
const eventRoutes = require("./src/routes/event.route.js");
const bookingRoutes = require("./src/routes/booking.route.js");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // Cho phép tất cả các nguồn

app.use(express.json());

// Định tuyến API
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));