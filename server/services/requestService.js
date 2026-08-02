const Request = require("../models/Request");

const getRequestById = async (requestId) => {

    const request =
        await Request.findById(requestId);

    if (!request) {

        throw new Error("Request not found.");

    }

    return request;

};

module.exports = {

    getRequestById,

};