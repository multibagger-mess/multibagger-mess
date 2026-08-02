const crypto = require("crypto");

const Request = require("../models/Request");

const {

    updateRequestStatus,

} = require("../services/requestService");

const {
    answerCallbackQuery,
    editTelegramMessage,
    sendTelegramMessage,
} = require("../services/notification/telegramService");

const callbackResult =
require("../templates/admin/callbackResult");

const callbackKeyboard =
require("../templates/admin/callbackKeyboard");

const deletedRequestTemplate =
require("../templates/admin/deletedRequest");

const disabledKeyboard =
require("../templates/admin/disabledKeyboard");

const generateTelegramLink = async (req, res) => {

    try {

        const { phoneNumber } = req.body;

        if (!phoneNumber) {

            return res.status(400).json({

                success: false,

                message: "Phone number is required."

            });

        }

        const request = await Request.findOne({

            phoneNumber,

        });

        if (!request) {

            return res.status(404).json({

                success: false,

                message: "No request found."

            });

        }

        const telegramLinkToken =
            crypto.randomBytes(32).toString("hex");

        const expiresAt = new Date();

        expiresAt.setMinutes(
            expiresAt.getMinutes() + 10
        );

        request.telegramLinkToken =
            telegramLinkToken;

        request.telegramLinkTokenExpiresAt =
            expiresAt;

        await request.save();

        return res.status(200).json({

            success: true,

            telegramUrl:
                `https://t.me/${process.env.TELEGRAM_BOT_USERNAME}?start=${telegramLinkToken}`

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

const handleTelegramCallback = async (req, res) => {

    try {

        if (!req.body.callback_query) {

            return res.sendStatus(200);

        }

        const callback =
            req.body.callback_query;

        const callbackId =
            callback.id;

        const chatId =
            callback.message.chat.id;

        const messageId =
            callback.message.message_id;

        const callbackData = callback.data;

        console.log("=========================");
        console.log("Callback Data:", callbackData);
        console.log("=========================");
                    

        // ------------------------------
        // Ignore disabled button
        // ------------------------------

        if (callbackData === "deleted") {

            console.log("INSIDE DELETED CALLBACK");

            await answerCallbackQuery(

                callbackId,

                "This request has already been deleted from Request Management.",

                true

            );

            return res.sendStatus(200);

        }

        const action =
            callbackData.split("_")[0];

        const requestId =
            callbackData.substring(
                action.length + 1
            );

        console.log(
            "Action:",
            action
        );

        console.log(
            "Request ID:",
            requestId
        );

        if (action === "approve") {

            await answerCallbackQuery(

                callbackId,

                "⏳ Processing..."

            );

                const result =
                await updateRequestStatus(

                    requestId,

                    "Approved",

                    {

                        sendTelegramNotification: false,

                    }

                );
                
                if (result.deleted) {

    try {

        await editTelegramMessage(

            chatId,

            messageId,

            callback.message.text,

            disabledKeyboard

        );

    }

    catch (error) {

        console.error(

            "Telegram Edit Failed:",

            error.response?.data ||

            error.message

        );

    }

    try {

        await sendTelegramMessage(

            chatId,

            deletedRequestTemplate()

        );

    }

    catch (error) {

        console.error(

            "Telegram Send Failed:",

            error.response?.data ||

            error.message

        );

    }

    return res.sendStatus(200);

}


            try {

                await editTelegramMessage(

                    chatId,

                    messageId,

                    callbackResult({

                        request: result.request,

                        status: "Approved",

                    }),

                    callbackKeyboard({

                        request: result.request,

                        whatsappLink:
                            result.whatsappLink,

                    })

                );

            }

            catch (error) {

                console.error(

                    "Unable to edit Telegram message:",

                    error.response?.data || error.message

                );

            }

            console.log(

                "Approved Successfully"

            );

        }

        else if (action === "reject") {

            await answerCallbackQuery(

                callbackId,

                "⏳ Processing..."

            );
            
            const result =
                await updateRequestStatus(

                    requestId,

                    "Rejected",

                    {

                        sendTelegramNotification: false,

                    }

                );

 if (result.deleted) {

    try {

        await editTelegramMessage(

            chatId,

            messageId,

            callback.message.text,

            disabledKeyboard

        );

    }

    catch (error) {

        console.error(

            "Telegram Edit Failed:",

            error.response?.data ||

            error.message

        );

    }

    try {

        await sendTelegramMessage(

            chatId,

            deletedRequestTemplate()

        );

    }

    catch (error) {

        console.error(

            "Telegram Send Failed:",

            error.response?.data ||

            error.message

        );

    }

    return res.sendStatus(200);

}

            try{

            await editTelegramMessage(

                chatId,

                messageId,

                callbackResult({

                    request: result.request,

                    status: "Rejected",

                }),

                callbackKeyboard({

                    request: result.request,

                    whatsappLink:
                        result.whatsappLink,

                })

            );
        }
        
        catch (error) {

            console.error(

                "Telegram Edit Failed:",

                error.response?.data ||

                error.message

            );

        }
            console.log(

                "Rejected Successfully"

            );

        }

        return res.sendStatus(200);

    }

catch (error) {

    console.error(

        error.response?.data ||

        error.message

    );

    return res.sendStatus(500);

}

};

module.exports = {

    generateTelegramLink,
    handleTelegramCallback,

};