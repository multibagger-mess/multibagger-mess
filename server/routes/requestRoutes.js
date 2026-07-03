const express = require("express");

const router = express.Router();

const {
    createRequest,
    getRequests,
    updateRequestStatus,
} = require("../controllers/requestController");

// GET /api/requests
router.get("/", getRequests);
// POST /api/requests
router.post("/", createRequest);
// PATCH /api/requests/:id
router.patch("/:id", updateRequestStatus);

module.exports = router;