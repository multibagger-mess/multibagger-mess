const express = require("express");

const router = express.Router();

const {

    addOccupant,
    getOccupants,
    updateOccupant,
    markOccupantLeft,
    restoreOccupant,

} = require("../controllers/occupantController");

router.post("/", addOccupant);

router.get("/", getOccupants);

router.put("/:id", updateOccupant);

router.put("/:id/leave", markOccupantLeft);

router.put("/:id/restore", restoreOccupant);

module.exports = router;