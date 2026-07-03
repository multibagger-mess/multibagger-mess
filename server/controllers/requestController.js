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

        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found",
            });
        }

        request.status = status;

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

module.exports = {
  createRequest,
  getRequests,
  updateRequestStatus,
};