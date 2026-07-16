const GatewayStatus = require("../models/GatewayStatus");

// -----------------------------------------
// Receive Heartbeat
// -----------------------------------------

const heartbeat = async (req, res) => {

    try {

        let gateway = await GatewayStatus.findOne();

        if (!gateway) {

            gateway = await GatewayStatus.create({

                gatewayName: "Primary Gateway",

            });

        }

        gateway.isOnline = true;

        gateway.lastHeartbeat = new Date();

        await gateway.save();

        res.json({

            success: true,

            message: "Heartbeat received.",

            data: gateway,

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {

    heartbeat,

};