const express = require("express");

const router = express.Router();

const {

    heartbeat,

} = require("../controllers/gatewayStatusController");

router.post(

    "/heartbeat",

    heartbeat

);

module.exports = router;