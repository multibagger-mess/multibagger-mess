const express = require("express");

const router = express.Router();

const {
    createRequest,
    getRequests,
    updateRequestStatus,
    verifyRequest,
    verifyAccessToken,
    deleteRequest,

} = require("../controllers/requestController");

const authenticateAdmin = require("../middlewares/authMiddleware");
/*AdminOnly*/
// GET /api/requests
router.get("/", authenticateAdmin, getRequests);
// PATCH /api/requests/:id
router.patch("/:id", authenticateAdmin, updateRequestStatus);

/*Public*/
// POST /api/requests
router.post("/", createRequest);
//POST /api/verify
router.post("/verify", verifyRequest);
//GET /api/verify
router.get("/access/:token", verifyAccessToken);
//delete /api/delete
router.delete("/:id", deleteRequest);

module.exports = router;