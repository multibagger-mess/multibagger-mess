const SmsJob = require("../models/SmsJob");

// ------------------------------------------------
// Return all pending SMS jobs
// ------------------------------------------------

const getPendingJobs = async (req, res) => {

    try {

        const jobs = await SmsJob.find({

            status: "PENDING"

        }).sort({

            createdAt: 1

        });

        res.status(200).json({

            success: true,

            count: jobs.length,

            data: jobs

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ------------------------------------------------
// Gateway Statistics
// ------------------------------------------------

const getGatewayStats = async (req, res) => {

    try {

        const sent = await SmsJob.countDocuments({

            status: "SENT"

        });

        const pending = await SmsJob.countDocuments({

            status: "PENDING"

        });

        const failed = await SmsJob.countDocuments({

            status: "FAILED"

        });

        res.json({

            success: true,

            data: {

                sent,

                pending,

                failed

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ------------------------------------------------
// Recent SMS Activity
// ------------------------------------------------

const getRecentActivity = async (req, res) => {

    try {

        const jobs = await SmsJob.find()

            .sort({ updatedAt: -1 })

            .limit(10);

        res.json({

            success: true,

            data: jobs

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getPendingJobs,

    getGatewayStats,

    getRecentActivity

};