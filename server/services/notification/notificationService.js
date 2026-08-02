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

const {
    buildWhatsAppApprovalLink,
    buildWhatsAppRejectionLink,
} = require("./whatsappService");

const notifyNewRequest = async (request) => {

    const message =
        newRequestTemplate(request);

    const replyMarkup = {

        inline_keyboard: [

            [

                {

                    text: "🟢 Approve",

                    callback_data: `approve_${request._id}`,

                },

                {

                    text: "🔴 Reject",

                    callback_data: `reject_${request._id}`,

                },

            ],

            [

                {

                    text: "🌐 Open Dashboard",

                    url: process.env.ADMIN_DASHBOARD_URL,

                },

            ],

        ],

    };

    await sendTelegramMessage(

        process.env.TELEGRAM_CHAT_ID,

        message,

        replyMarkup

    );

};

const notifyApproval = async (

    request,

    {

        sendTelegram = true,

    } = {}

) => {

    // ------------------------------------
    // Admin Telegram Notification
    // ------------------------------------

    const message =
        approvedTemplate(request);

    if (sendTelegram) {

        await sendTelegramMessage(

            process.env.TELEGRAM_CHAT_ID,

            message

        );

    }

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
    
// ------------------------------------
// Generate Access Link
// ------------------------------------

const accessLink =
`${process.env.CLIENT_URL}/access/${request.accessToken}`;

// ------------------------------------
// WhatsApp Link
// ------------------------------------

const whatsappLink =
buildWhatsAppApprovalLink({

    name: request.name,

    phone: request.phoneNumber,

    accessLink,

});

return {

    whatsappLink,

};

};

const notifyRejection = async (

    request,

    {

        sendTelegram = true,

    } = {}

) => {

    const message =
        rejectedTemplate(request);

    if (sendTelegram) {

        await sendTelegramMessage(

            process.env.TELEGRAM_CHAT_ID,

            message

        );

    }

    const whatsappLink =
        buildWhatsAppRejectionLink({

            name: request.name,

            phone: request.phoneNumber,

        });

    return {

        whatsappLink,

    };

};

module.exports = {

    notifyNewRequest,

    notifyApproval,

    notifyRejection,

};