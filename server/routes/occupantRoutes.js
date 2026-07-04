const express = require("express");

const router = express.Router();

const {
    addOccupant,
    getOccupants,
    updateOccupant,
} = require("../controllers/occupantController");

router.get("/", getOccupants);

router.post("/", addOccupant);

router.put("/:id", updateOccupant);

module.exports = router;