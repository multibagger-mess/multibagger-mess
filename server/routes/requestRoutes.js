const express = require("express");

const router = express.Router();

const {
    createRequest,
    getRequests,
    updateRequestStatus,
    verifyRequest,
    verifyAccessToken,
} = require("../controllers/requestController");

// GET /api/requests
router.get("/", getRequests);
// POST /api/requests
router.post("/", createRequest);
// PATCH /api/requests/:id
router.patch("/:id", updateRequestStatus);
//POST /api/verify
router.post("/verify", verifyRequest);
//GET /api/verify
router.get("/access/:token", verifyAccessToken);

module.exports = router;