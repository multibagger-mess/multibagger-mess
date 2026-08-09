const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const requestRoutes = require("./routes/requestRoutes");
const occupantRoutes = require("./routes/occupantRoutes");
const adminRoutes = require("./routes/adminRoutes");
const telegramRoutes = require("./routes/telegramRoutes");
const gatewayRoutes = require("./routes/gatewayRoutes");
const gatewayStatusRoutes = require("./routes/gatewayStatusRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");


const app = express();
connectDB();

const notificationService =
require("./services/notification");

// Middlewares
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use("/api/requests", requestRoutes);
app.use("/api/occupants", occupantRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/telegram", telegramRoutes);
app.use("/api/gateway", gatewayRoutes);
app.use("/api/gateway", gatewayStatusRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/whatsapp", whatsappRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("The Multi-Bagger Mess Backend is Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});