const Request = require("../models/Request");

const notificationService =
require("../services/notification");

const REQUEST_CONFIG = require("../config/requestConfig");

const requestService =
require("../services/requestService");

// Create a new access request
const createRequest = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    // Check if both fields are provided
    if (!name || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required.",
      });
    }
    const latestRequest = await Request.findOne({ phoneNumber })
    .sort({ createdAt: -1 });

if (latestRequest) {

    if (latestRequest.status === "Pending") {

        return res.status(409).json({

            success: false,

            code: "REQUEST_ALREADY_PENDING",

            message:
                "Your request is already pending for approval. Please wait while the hostel administrator reviews your application. You will receive a notification once your request has been approved or rejected."

        });

    }

    if (latestRequest.status === "Approved") {

        return res.status(409).json({

            success: false,

            code: "REQUEST_ALREADY_APPROVED",

            message:
                "Your request has already been approved. You already have access to the hostel details."

        });

    }

    if (latestRequest.status === "Rejected") {

        const cooldownEnds = new Date(
            latestRequest.rejectedAt.getTime() +
            REQUEST_CONFIG.REJECTION_COOLDOWN_HOURS * 60 * 60 * 1000
        );

        if (new Date() < cooldownEnds) {

            return res.status(429).json({

    success: false,

    code: "REJECTION_COOLDOWN",

    message:
        "Your previous request was rejected.",

    cooldownHours:
        REQUEST_CONFIG.REJECTION_COOLDOWN_HOURS,

    cooldownEnds,

});

        }

    }

}
    // Save request to MongoDB
    const request = await Request.create({
      name,
      phoneNumber,
    });

    try {

    await notificationService.notifyNewRequest(request);

}

catch (error) {

    console.error(
        "Notification Failed:",
        error.message
    );

}

    res.status(201).json({
      success: true,
      message: "Access request submitted successfully.",
      data: request,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get all requests
const getRequests = async (req, res) => {

    try {

        const requests = await Request.find().sort({
            createdAt: -1,
        });

        const now = new Date();

        for (const request of requests) {

            if (
                request.status === "Approved" &&
                request.accessExpiresAt &&
                now > request.accessExpiresAt
            ) {

                request.status = "Expired";

                await request.save();

            }

        }

const data = requests.map((request) => {

    const requestObject = request.toObject();

    let daysRemaining = null;

    if (
        request.status === "Approved" &&
        request.accessExpiresAt
    ) {

        const millisecondsRemaining =
            request.accessExpiresAt - new Date();

        daysRemaining = Math.max(
            0,
            Math.ceil(
                millisecondsRemaining /
                (1000 * 60 * 60 * 24)
            )
        );

    }

    return {

        ...requestObject,

        daysRemaining,

    };

});

res.status(200).json({

    success: true,

    count: data.length,

    data,

});

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};
// Update request status
const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatus = [
              "Pending",
              "Approved",
              "Rejected",
              "Expired",
        ];

if (!allowedStatus.includes(status)) {
    return res.status(400).json({
        success: false,
        message: "Invalid status supplied.",
    });
}

const result =
    await requestService.updateRequestStatus(

        req.params.id,

        status

    );

return res.status(200).json({

    success: true,

    message: "Status updated successfully",

    data: result.request,

    whatsappLink:
        result.whatsappLink,

});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

  // Verify Access using Phone Number

const verifyRequest = async (req, res) => {

    try {

        const { phoneNumber } = req.body;

        if (!phoneNumber) {

            return res.status(400).json({

                success: false,

                message: "Phone number is required.",

            });

        }

        const request = await Request.findOne({

            phoneNumber,

        });

        if (!request) {

            return res.status(404).json({

                success: false,

                message: "No request found for this phone number.",

            });

        }

        if (request.status === "Pending") {

            return res.status(403).json({

                success: false,

                message: "Your request is still under review.",

            });

        }

        if (request.status === "Rejected") {

            return res.status(403).json({

                success: false,

                message: "Your request has been rejected.",

            });

        }

          // -------------------------------------
// Check whether approval has expired
// -------------------------------------

if (request.status === "Approved") {

    const today = new Date();

    if (
        request.accessExpiresAt &&
        today > request.accessExpiresAt
    ) {

        request.status = "Expired";

        await request.save();

        return res.status(403).json({

            success: false,

            message:
                "Your approval has expired. Please request access again.",

        });

    }

    // Days Remaining

    const millisecondsRemaining =
        request.accessExpiresAt - today;

    const daysRemaining = Math.ceil(
        millisecondsRemaining /
        (1000 * 60 * 60 * 24)
    );

    return res.status(200).json({

    success: true,

    message: "Access Granted",

    data: {
        name: request.name,
        phoneNumber: request.phoneNumber,
        status: request.status,
    },

    approvedAt: request.approvedAt,

    expiryDate: request.accessExpiresAt,

    daysRemaining,

});

}

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

const verifyAccessToken = async (req, res) => {

    try {

        const { token } = req.params;

        const request = await Request.findOne({

            accessToken: token,

        });

        if (!request) {

            return res.status(404).json({

                success: false,

                message: "Invalid access link.",

            });

        }

        if (

            request.status !== "Approved"

        ) {

            return res.status(403).json({

                success: false,

                message: "Access denied.",

            });

        }

        if (

            new Date() >

            request.tokenExpiresAt

        ) {

            request.status = "Expired";

            await request.save();

            return res.status(403).json({

                success: false,

                message: "Access link has expired.",

            });

        }

        request.accessCount += 1;

        request.lastAccessedAt = new Date();

        await request.save();

const today = new Date();

const millisecondsRemaining =
    request.accessExpiresAt - today;

const daysRemaining = Math.ceil(
    millisecondsRemaining /
    (1000 * 60 * 60 * 24)
);

return res.status(200).json({

    success: true,

    message: "Access Granted",

    data: {

        name: request.name,

        phoneNumber: request.phoneNumber,

        status: request.status,

    },

    approvedAt: request.approvedAt,

    expiryDate: request.accessExpiresAt,

    daysRemaining,

});

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

const deleteRequest = async (req, res) => {

    try {

        const request = await Request.findByIdAndDelete(
            req.params.id
        );

        if (!request) {

            return res.status(404).json({

                success: false,
                message: "Request not found."

            });

        }

        res.json({

            success: true,
            message: "Request deleted successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
  createRequest,
  getRequests,
  updateRequestStatus,
  verifyRequest,
  verifyAccessToken,
  deleteRequest,
};