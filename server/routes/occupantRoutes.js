const express = require("express");

const router = express.Router();

const {

    addOccupant,
    getOccupants,
    updateOccupant,
    markOccupantLeft,
    restoreOccupant,
    getHostelAvailability,
    deleteOccupant,

} = require("../controllers/occupantController");

router.post("/", addOccupant);

router.get("/", getOccupants);

router.get("/availability", getHostelAvailability);

router.put("/:id", updateOccupant);

router.put("/:id/leave", markOccupantLeft);

router.put("/:id/restore", restoreOccupant);

router.delete("/:id", deleteOccupant);

module.exports = router;