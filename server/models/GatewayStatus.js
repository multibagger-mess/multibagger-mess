const mongoose = require("mongoose");

const gatewayStatusSchema = new mongoose.Schema({

    gatewayName: {

        type: String,

        default: "Primary Gateway",

    },

    isOnline: {

        type: Boolean,

        default: false,

    },

    lastHeartbeat: {

        type: Date,

        default: null,

    },

});

module.exports = mongoose.model(
    "GatewayStatus",
    gatewayStatusSchema
);