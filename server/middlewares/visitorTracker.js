import crypto from "crypto";
import Visitor from "../models/Visitor.js";
import UAParser from "ua-parser-js";

const visitorTracker = async (req, res, next) => {
    try {
        let visitorId = req.cookies?.visitorId;

        // Create a visitor ID if it doesn't exist
        if (!visitorId) {
            visitorId = crypto.randomUUID();

            res.cookie("visitorId", visitorId, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 365 * 5, // 5 years
            });
        }

        // Parse browser information
        const parser = new UAParser(req.headers["user-agent"]);
        const result = parser.getResult();

        const browser = result.browser.name || "Unknown";
        const operatingSystem = result.os.name || "Unknown";

        let deviceType = "Desktop";

        if (result.device.type === "mobile")
            deviceType = "Mobile";
        else if (result.device.type === "tablet")
            deviceType = "Tablet";

        const ipAddress =
            req.headers["x-forwarded-for"]?.split(",")[0] ||
            req.socket.remoteAddress ||
            "";

        let visitor = await Visitor.findOne({ visitorId });

        if (!visitor) {
            visitor = await Visitor.create({
                visitorId,
                ipAddress,
                browser,
                operatingSystem,
                deviceType,
                visits: [{ timestamp: new Date() }],
            });
        } else {
            visitor.ipAddress = ipAddress;
            visitor.browser = browser;
            visitor.operatingSystem = operatingSystem;
            visitor.deviceType = deviceType;
            visitor.lastVisit = new Date();
            visitor.visitCount += 1;
            visitor.visits.push({
                timestamp: new Date(),
            });

            await visitor.save();
        }

        req.visitor = visitor;

        next();
    } catch (error) {
        console.error("Visitor Tracking Error:", error);

        next();
    }
};

export default visitorTracker;