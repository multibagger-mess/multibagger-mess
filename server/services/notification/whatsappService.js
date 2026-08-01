const approvalTemplate = require("../../templates/whatsapp/approval");
const rejectionTemplate = require("../../templates/whatsapp/rejection");

function buildWhatsAppApprovalLink({

    name,

    phone,

    accessLink,

}) {

    const message = approvalTemplate({

        name,

        accessLink,

        websiteUrl: process.env.PUBLIC_WEBSITE_URL,

    });

    return `https://api.whatsapp.com/send?phone=91${phone}&text=${encodeURIComponent(message)}`;return `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

}

function buildWhatsAppRejectionLink({

    name,

    phone,

}) {

    const message = rejectionTemplate({

        name,

        websiteUrl: process.env.PUBLIC_WEBSITE_URL,

    });

    return `https://api.whatsapp.com/send?phone=91${phone}&text=${encodeURIComponent(message)}`;

}

module.exports = {

    buildWhatsAppApprovalLink,

    buildWhatsAppRejectionLink,

};