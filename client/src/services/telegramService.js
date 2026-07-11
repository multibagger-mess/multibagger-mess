import api from "./api";

const generateTelegramLink = async (phoneNumber) => {

    const response = await api.post(

        "/telegram/link",

        {

            phoneNumber,

        }

    );

    return response.data;

};

export default {

    generateTelegramLink,

};