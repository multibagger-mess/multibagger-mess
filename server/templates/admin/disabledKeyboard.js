module.exports = {

    inline_keyboard: [

        [

            {

                text: "🚫 Request Deleted",

                callback_data: "deleted",

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