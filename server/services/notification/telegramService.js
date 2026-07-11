const axios = require("axios");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const sendTelegramMessage = async (
            chatId,
            message
        ) => {

    try {

        const response = await axios.post(TELEGRAM_API, {

            chat_id: chatId,

            text: message,

            parse_mode: "HTML",

            disable_web_page_preview: false,

        });

        return response.data;

    } catch (error) {

        console.error("Telegram Error:");

        if (error.response) {

            console.error(error.response.data);

        } else {

            console.error(error.message);

        }

        throw error;
    }
};

module.exports = {
    sendTelegramMessage,
};