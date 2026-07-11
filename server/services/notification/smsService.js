const axios = require("axios");

const sendSMS = async (
    phoneNumber,
    message
) => {

    try {

        console.log("=================================");
        console.log("SMS SERVICE");
        console.log("Phone :", phoneNumber);
        console.log("Message :");
        console.log(message);
        console.log("=================================");

        /*
        Android Gateway Call
        (We'll implement this later)

        await axios.post(
            process.env.SMS_GATEWAY_URL,
            {
                apiKey: process.env.SMS_GATEWAY_API_KEY,
                phoneNumber,
                message,
            }
        );
        */

        return true;

    }

    catch (error) {

        console.error(
            "SMS Error:",
            error.message
        );

        return false;

    }

};

module.exports = {

    sendSMS,

};