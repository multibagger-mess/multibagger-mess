const Request = require("../models/Request");
const SmsJob = require("../models/SmsJob");

const crypto = require("crypto");

const approvedSMSTemplate =
require("../templates/sms/approved");

const notificationService =
require("./notification");

const updateRequestStatus = async (

    requestId,

    status,

    options = {}

) => {

    const {

        sendTelegramNotification = true,

    } = options;

const request =
    await Request.findById(requestId);

if (!request) {

    throw new Error("Request not found.");

}

request.status = status;

if (status === "Approved") {

    const approvedDate = new Date();

    const expiryDate = new Date();

    expiryDate.setDate(
        expiryDate.getDate() + 5
    );

    const tokenExpiry = new Date();

    tokenExpiry.setDate(
        tokenExpiry.getDate() + 5
    );

    const token =
        crypto.randomBytes(32).toString("hex");

    request.status = "Approved";

    request.approvedAt = approvedDate;

    request.accessExpiresAt = expiryDate;

    request.accessToken = token;

    request.tokenExpiresAt = tokenExpiry;

    request.accessCount = 0;

    request.lastAccessedAt = null;

}

else {

    request.approvedAt = null;

    request.accessExpiresAt = null;

    request.accessToken = null;

    request.tokenExpiresAt = null;

    if (status === "Rejected") {

        request.rejectedAt = new Date();

    }

    else {

        request.rejectedAt = null;

    }

}

await request.save();

if (status === "Approved") {

    await SmsJob.create({

        phone: request.phoneNumber,

        message: approvedSMSTemplate(request),

    });

}

else if (status === "Rejected") {

    await SmsJob.create({

        phone: request.phoneNumber,

        message:
            `Hello ${request.name}, we regret to inform you that your request for The Multi-Bagger Mess has been rejected.`,

    });

}

let notificationResult = null;

try {

    if (status === "Approved") {

        notificationResult =
            await notificationService.notifyApproval(

                request,

                {

                    sendTelegram:

                        sendTelegramNotification,

                }

            );

    }

    else if (status === "Rejected") {

        notificationResult =
            await notificationService.notifyRejection(

                request,

                {

                    sendTelegram:

                        sendTelegramNotification,

                }

            );

    }

}

catch (error) {

    console.error(

        "Notification Failed:",

        error.message

    );

}

console.log(
    "Status:",
    status
);

console.log(
    "WhatsApp Link:",
    notificationResult?.whatsappLink
);

return {

    request,

    whatsappLink:
        notificationResult?.whatsappLink || null,

};

};

module.exports = {

    updateRequestStatus,

};