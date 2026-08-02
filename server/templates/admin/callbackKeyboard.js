module.exports = ({

    whatsappLink,

}) => {

    const keyboard = [];

    if (whatsappLink) {

        keyboard.push([

            {

                text: "📱 Send WhatsApp",

                url: whatsappLink,

            },

        ]);

    }

    keyboard.push([

        {

            text: "🌐 Open Dashboard",

            url: process.env.ADMIN_DASHBOARD_URL,

        },

    ]);

    return {

        inline_keyboard: keyboard,

    };

};