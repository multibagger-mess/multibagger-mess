const express = require("express");

const router = express.Router();

const {

    generateTelegramLink,

} = require("../controllers/telegramController");

router.post(

    "/link",

    generateTelegramLink

);

module.exports = router;