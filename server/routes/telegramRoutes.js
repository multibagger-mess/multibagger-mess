const express = require("express");

const router = express.Router();

const {

    generateTelegramLink,

    handleTelegramCallback,

} = require("../controllers/telegramController");

router.post(

    "/link",

    generateTelegramLink

);

router.post(

    "/webhook",

    handleTelegramCallback

);

module.exports = router;