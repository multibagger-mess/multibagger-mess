const express = require("express");

const {
    track,
    summary,
    getVisitors,
    getVisitor,
} = require("../controllers/visitorController");

const router = express.Router();

// Track a visitor
router.post("/track", track);

// Dashboard summary
router.get("/summary", summary);

// Get all visitors
router.get("/", getVisitors);

// Get one visitor
router.get("/:id", getVisitor);

module.exports = router;