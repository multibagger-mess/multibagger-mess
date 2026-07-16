const express = require("express");

const router = express.Router();

const {
    updateSmsJobResult
} = require("../controllers/gatewayResultController");

const {

    getPendingJobs,
    getGatewayStats,
    getRecentActivity

} = require("../controllers/gatewayController");

router.get(

    "/jobs",

    getPendingJobs

);

router.get(

    "/stats",

    getGatewayStats

);

router.get(

    "/activity",

    getRecentActivity

);

router.post(
    "/jobs/:id/result",
    updateSmsJobResult
);

module.exports = router;