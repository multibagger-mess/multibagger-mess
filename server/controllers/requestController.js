const Request = require("../models/Request");

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
    const existingRequest = await Request.findOne({ phoneNumber });
    
    if (existingRequest && existingRequest.status === "Pending") {
    return res.status(400).json({
        success: false,
        message: "You already have a pending request.",
    });
}

if (existingRequest && existingRequest.status === "Approved") {
    return res.status(400).json({
        success: false,
        message: "Your request has already been approved.",
    });
}

if (existingRequest && existingRequest.status === "Rejected") {

    existingRequest.status = "Pending";
    existingRequest.name = name;

    await existingRequest.save();

    return res.status(200).json({
        success: true,
        message: "Request submitted again successfully.",
        data: existingRequest,
    });

}
    // Save request to MongoDB
    const request = await Request.create({
      name,
      phoneNumber,
    });

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
        const requests = await Request.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests,
        });

    } catch (error) {
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

        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found",
            });
        }

        request.status = status;

if (status === "Approved") {

    const approvedDate = new Date();

    const expiryDate = new Date();

    expiryDate.setDate(expiryDate.getDate() + 5);

    request.approvedAt = approvedDate;

    request.accessExpiresAt = expiryDate;

}

else {

    request.approvedAt = null;

    request.accessExpiresAt = null;

}

        await request.save();

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
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

module.exports = {
  createRequest,
  getRequests,
  updateRequestStatus,
  verifyRequest,
};