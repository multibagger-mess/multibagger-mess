const express = require("express");

const router = express.Router();

const {
    createRequest,
    getRequests,
    updateRequestStatus,
    verifyRequest,
} = require("../controllers/requestController");

// GET /api/requests
router.get("/", getRequests);
// POST /api/requests
router.post("/", createRequest);
// PATCH /api/requests/:id
router.patch("/:id", updateRequestStatus);
//POST /api/verify
router.post("/verify", verifyRequest);

module.exports = router;