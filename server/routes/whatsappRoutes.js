const express = require("express");

const router = express.Router();

const {

    getApprovalWhatsAppLink,

} = require("../controllers/whatsappController");

router.get(

    "/request/:id",

    getApprovalWhatsAppLink

);

module.exports = router;