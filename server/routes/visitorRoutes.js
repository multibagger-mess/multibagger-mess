const express = require("express");

const {
    track,
    summary,
    getVisitors,
    getVisitor,
    saveMedia,
    deleteVisitorsController,
} = require("../controllers/visitorController");

const authenticateAdmin = require("../middlewares/authMiddleware");

const router = express.Router();

// Track a visitor
router.post("/track", track);

// Dashboard summary
router.get("/summary", summary);

// Get all visitors
router.get("/", getVisitors);

// Save visitor snapshot and/or location
router.post("/media", saveMedia);

// Delete multiple visitors
// Admin authentication required

router.delete(
    "/bulk",
    authenticateAdmin,
    deleteVisitorsController
);

// Get one visitor
router.get("/:id", getVisitor);

module.exports = router;