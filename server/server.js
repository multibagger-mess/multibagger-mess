const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const requestRoutes = require("./routes/requestRoutes");
const occupantRoutes = require("./routes/occupantRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
connectDB();

// Middlewares
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use("/api/requests", requestRoutes);
app.use("/api/occupants", occupantRoutes);
app.use("/api/admin", adminRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("The Multi-Bagger Mess Backend is Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});