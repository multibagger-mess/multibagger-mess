const express = require("express");

const router = express.Router();

const {

    getPendingJobs

} = require("../controllers/gatewayController");

router.get(

    "/jobs",

    getPendingJobs

);

module.exports = router;