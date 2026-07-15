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

module.exports = {

    getPendingJobs

};