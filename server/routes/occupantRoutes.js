const express = require("express");

const router = express.Router();

const {
  getOccupants,
  addOccupant,
} = require("../controllers/occupantController");

router.get("/", getOccupants);

router.post("/", addOccupant);

module.exports = router;