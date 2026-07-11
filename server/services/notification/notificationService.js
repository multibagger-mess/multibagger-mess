const { sendTelegramMessage } = require("./telegramService");

const newRequestTemplate =
    require("../../templates/admin/newRequest");

const approvedTemplate =
    require("../../templates/admin/approved");

const rejectedTemplate =
    require("../../templates/admin/rejected");

const approvedSMSTemplate =
require("../../templates/sms/approved");

const { sendSMS } =
    require("./smsService");

const notifyNewRequest = async (request) => {

    const message =
        newRequestTemplate(request);

    await sendTelegramMessage(

    process.env.TELEGRAM_CHAT_ID,

    message

);

};

const notifyApproval = async (request) => {

    // ------------------------------------
    // Admin Telegram Notification
    // ------------------------------------

    const message =
        approvedTemplate(request);

    await sendTelegramMessage(

        process.env.TELEGRAM_CHAT_ID,

        message

    );

    // ------------------------------------
    // SMS Notification
    // (Android Gateway will be connected later)
    // ------------------------------------

    const smsMessage =
    approvedSMSTemplate(request);

await sendSMS(

    request.phoneNumber,

    smsMessage

);

};

const notifyRejection = async (request) => {

    const message =
        rejectedTemplate(request);

    await sendTelegramMessage(

    process.env.TELEGRAM_CHAT_ID,

    message

);

};

module.exports = {

    notifyNewRequest,

    notifyApproval,

    notifyRejection,

};