module.exports = ({

    request,

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

            text:
                request.status === "Approved"

                    ? "🔴 Reject"

                    : "🟢 Approve",

            callback_data:
                request.status === "Approved"

                    ? `reject_${request._id}`

                    : `approve_${request._id}`,

        },

    ]);

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