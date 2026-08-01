const crypto = require("crypto");

const Request = require("../models/Request");

const notificationService =
require("../services/notification");

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

    console.log(
        "Telegram Callback Received"
    );

    console.log(req.body);

    return res.sendStatus(200);

};

module.exports = {

    generateTelegramLink,
    handleTelegramCallback,

};