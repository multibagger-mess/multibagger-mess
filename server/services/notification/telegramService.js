const axios = require("axios");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const TELEGRAM_API =
`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const sendTelegramMessage = async (

    chatId,

    message,

    replyMarkup = null

) => {

    try {

        const payload = {

            chat_id: chatId,

            text: message,

            parse_mode: "HTML",

            disable_web_page_preview: false,

        };

        if (replyMarkup) {

            payload.reply_markup = replyMarkup;

        }

        const response = await axios.post(

            TELEGRAM_API,

            payload

        );

        return response.data;

    }

    catch (error) {

        console.error("Telegram Error:");

        if (error.response) {

            console.error(error.response.data);

        }

        else {

            console.error(error.message);

        }

        throw error;

    }

};

const answerCallbackQuery = async (

    callbackQueryId,

    text

) => {

    return axios.post(

        `https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`,

        {

            callback_query_id: callbackQueryId,

            text,

        }

    );

};

const editTelegramMessage = async (

    chatId,

    messageId,

    text,

    replyMarkup = null

) => {

    const payload = {

        chat_id: chatId,

        message_id: messageId,

        text,

        parse_mode: "HTML",

    };

    if (replyMarkup) {

        payload.reply_markup = replyMarkup;

    }

    return axios.post(

        `https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`,

        payload

    );

};

module.exports = {

    sendTelegramMessage,

    answerCallbackQuery,

    editTelegramMessage,

};