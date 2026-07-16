const SmsJob = require("../models/SmsJob");

const updateSmsJobResult = async (req, res) => {
    try {

        const { id } = req.params;
        const { status, error } = req.body;

        const job = await SmsJob.findById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "SMS Job not found."
            });
        }

        job.status = status;

        if (status === "SENT") {
            job.sentAt = new Date();
            job.error = null;
        } else {
            job.error = error || "Unknown Error";
        }

        await job.save();

        res.json({
            success: true,
            message: "SMS Job updated."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

module.exports = {
    updateSmsJobResult
};