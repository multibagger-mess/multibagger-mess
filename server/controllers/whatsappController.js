const Request = require("../models/Request");

const {
    buildWhatsAppApprovalLink,
    buildWhatsAppRejectionLink,
} = require("../services/notification/whatsappService");

const getApprovalWhatsAppLink = async (req, res) => {

    try {

        const { id } = req.params;

        const request = await Request.findById(id);

        if (!request) {

            return res.status(404).json({

                success: false,

                message: "Request not found.",

            });

        }

        if (

            request.status !== "Approved" &&

            request.status !== "Rejected"

        ) {

            return res.status(400).json({

                success: false,

                message:
                    "WhatsApp message is available only for approved or rejected requests.",

            });

        }

        let whatsappLink;

if (request.status === "Approved") {

    const accessLink =
        `${process.env.CLIENT_URL}/access/${request.accessToken}`;

    whatsappLink =
        buildWhatsAppApprovalLink({

            name: request.name,

            phone: request.phoneNumber,

            accessLink,

        });

}

else {

    whatsappLink =
        buildWhatsAppRejectionLink({

            name: request.name,

            phone: request.phoneNumber,

        });

}

        res.json({

            success: true,

            whatsappLink,

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Unable to generate WhatsApp link.",

        });

    }

};

module.exports = {

    getApprovalWhatsAppLink,

};