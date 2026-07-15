const SmsJob = require("../models/SmsJob");

async function getNextPendingJob() {

  return await SmsJob.findOne({
    status: "PENDING",
  }).sort({
    createdAt: 1,
  });

}

async function markAsSent(jobId) {

  return await SmsJob.findByIdAndUpdate(

    jobId,

    {
      status: "SENT",
      sentAt: new Date(),
      error: null,
    },

    {
      new: true,
    }

  );

}

async function markAsFailed(jobId, error) {

  return await SmsJob.findByIdAndUpdate(

    jobId,

    {
      status: "FAILED",
      error,
    },

    {
      new: true,
    }

  );

}

module.exports = {

  getNextPendingJob,

  markAsSent,

  markAsFailed,

};