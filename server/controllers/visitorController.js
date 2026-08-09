const UAParser = require("ua-parser-js");

const {
    trackVisitor,
    getVisitorSummary,
    getAllVisitors,
    getVisitorById,
    saveVisitorMedia,
    deleteVisitors,
} = require("../services/visitorService");

const track = async (req, res) => {

    try {

        const { visitorId, page } = req.body;

        if (!visitorId) {

            return res.status(400).json({
                success: false,
                message: "Visitor ID is required.",
            });

        }

        const parser =
            new UAParser(
                req.headers["user-agent"]
            );

        const result =
            parser.getResult();

        const browser =
            result.browser.name || "Unknown";

        const operatingSystem =
            result.os.name || "Unknown";

        let deviceType = "Desktop";

        if (result.device.type === "mobile") {

            deviceType = "Mobile";

        } else if (result.device.type === "tablet") {

            deviceType = "Tablet";

        }

        const ipAddress =
            req.headers["x-forwarded-for"]?.split(",")[0] ||
            req.socket.remoteAddress ||
            "";

        const visitorResult =
            await trackVisitor({
                visitorId,
                ipAddress,
                browser,
                operatingSystem,
                deviceType,
                page,
            });

            console.log("VISITOR MEDIA STATUS:", {
                isNewVisitor: visitorResult.isNewVisitor,
                hasSnapshot: visitorResult.hasSnapshot,
                hasLocation: visitorResult.hasLocation,
            });

        res.status(200).json({
            success: true,
            isNewVisitor:
                visitorResult.isNewVisitor,

            hasSnapshot:
                visitorResult.hasSnapshot,

            hasLocation:
                visitorResult.hasLocation,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to track visitor.",
        });

    }

};

const summary = async (req, res) => {

    try {

        const data = await getVisitorSummary();

        res.status(200).json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch visitor summary.",
        });

    }

};

const getVisitors = async (req, res) => {

    try {

        const visitors = await getAllVisitors();

        res.status(200).json(visitors);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch visitors.",
        });

    }

};

const getVisitor = async (req, res) => {

    try {

        const visitor = await getVisitorById(req.params.id);

        if (!visitor) {
            return res.status(404).json({
                success: false,
                message: "Visitor not found.",
            });
        }

        res.status(200).json(visitor);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch visitor.",
        });

    }

};

const saveMedia = async (req, res) => {

    try {

        const {
            visitorId,
            snapshotData,
            latitude,
            longitude,
        } = req.body;

        if (!visitorId) {

            return res.status(400).json({
                success: false,
                message: "Visitor ID is required.",
            });

        }

        // Validate latitude if provided
        if (
            latitude !== undefined &&
            latitude !== null &&
            (
                typeof latitude !== "number" ||
                latitude < -90 ||
                latitude > 90
            )
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid latitude.",
            });

        }

        // Validate longitude if provided
        if (
            longitude !== undefined &&
            longitude !== null &&
            (
                typeof longitude !== "number" ||
                longitude < -180 ||
                longitude > 180
            )
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid longitude.",
            });

        }

        const visitor = await saveVisitorMedia({
            visitorId,
            snapshotData,
            latitude,
            longitude,
        });

        res.status(200).json({
            success: true,
            message: "Visitor media information saved successfully.",
            visitor,
        });

    } catch (error) {

        console.error(error);

        if (error.message === "Visitor not found.") {

            return res.status(404).json({
                success: false,
                message: "Visitor not found.",
            });

        }

        res.status(500).json({
            success: false,
            message: "Failed to save visitor media information.",
        });

    }

};

const deleteVisitorsController = async (req, res) => {

    try {

        const { visitorIds } = req.body;

        if (
            !Array.isArray(visitorIds) ||
            visitorIds.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "No visitor IDs provided.",
            });
        }

        const result = await deleteVisitors(visitorIds);

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} visitor(s) deleted successfully.`,
            deletedCount: result.deletedCount,
        });

    } catch (error) {

        console.error(
            "Delete Visitors Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to delete visitors.",
        });

    }

};

module.exports = {

    track,

    summary,

    getVisitors,

    getVisitor,

    saveMedia,

    deleteVisitorsController,

};