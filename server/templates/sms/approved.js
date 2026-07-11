const approvedSMSTemplate = (request) => {

    return `🏠 The Multi-Bagger Mess

Hello ${request.name},

Your request has been approved.

View Hostel Details:

${process.env.APP_URL}/access/${request.accessToken}

This link will expire in 5 days.

Thank you.`;

};

module.exports = approvedSMSTemplate;