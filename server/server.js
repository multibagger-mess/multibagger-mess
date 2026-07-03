const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/requests", requestRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("The Multi-Bagger Mess Backend is Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});