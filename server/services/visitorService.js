const Visitor = require("../models/Visitor");

const reverseGeocode = async (latitude, longitude) => {

    console.log(
        "REVERSE GEOCODING STARTED:",
        latitude,
        longitude
    );

    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            {
                headers: {
                    "User-Agent":
                        "The-Multi-Bagger-Mess/1.0",
                },
            }
        );

        console.log(
            "NOMINATIM RESPONSE STATUS:",
            response.status
        );

        if (!response.ok) {

            throw new Error(
                `Reverse geocoding failed: ${response.status}`
            );

        }

        const data = await response.json();

        console.log(
            "NOMINATIM RESULT:",
            data.display_name
        );

        return data.display_name || "";

    } catch (error) {

        console.error(
            "REVERSE GEOCODING ERROR:",
            error
        );

        return "";

    }
};

const trackVisitor = async ({
    visitorId,
    ipAddress,
    browser,
    operatingSystem,
    deviceType,
    page,
}) => {

    let visitor = await Visitor.findOne({ visitorId });

    // First Visit
    if (!visitor) {

        try {

            visitor = await Visitor.create({
                visitorId,
                ipAddress,
                browser,
                operatingSystem,
                deviceType,

                pagesVisited: [page],

                visits: [
                    {
                        page,
                        timestamp: new Date(),
                    },
                ],
            });

            return {
                visitor,
                isNewVisitor: true,
            };

        } catch (error) {

            // Another request may have created
            // this visitor at the same time.
            if (error.code === 11000) {

                visitor = await Visitor.findOne({
                    visitorId,
                });

                if (visitor) {
                    return {
                        visitor,
                        isNewVisitor: true,
                    };
                }
            }

            throw error;
        }
    }

    // Returning Visitor

    visitor.ipAddress = ipAddress;
    visitor.browser = browser;
    visitor.operatingSystem = operatingSystem;
    visitor.deviceType = deviceType;

    const now = new Date();

    const lastVisit =
        visitor.visits[visitor.visits.length - 1];

    const isSamePage =
        lastVisit &&
        lastVisit.page === page;

    const withinCooldown =
        lastVisit &&
        (now - new Date(lastVisit.timestamp)) / 1000 < 30;

    if (!(isSamePage && withinCooldown)) {

        visitor.visitCount += 1;

        visitor.visits.push({
            page,
            timestamp: now,
        });

    }

    visitor.lastVisit = now;

    if (!visitor.pagesVisited.includes(page)) {

        visitor.pagesVisited.push(page);

    }

    await visitor.save();

    return visitor;
};

const getVisitorSummary = async () => {

    const totalVisitors = await Visitor.countDocuments();

    const totalVisits = await Visitor.aggregate([
        {
            $group: {
                _id: null,
                count: {
                    $sum: "$visitCount",
                },
            },
        },
    ]);

    const linkedRequests = await Visitor.countDocuments({
    request: { $ne: null },
});

const linkedOccupants = await Visitor.countDocuments({
    occupant: { $ne: null },
});

return {
    totalVisitors,

    totalVisits:
        totalVisits.length > 0
            ? totalVisits[0].count
            : 0,

    linkedRequests,

    linkedOccupants,
};
};

const getAllVisitors = async () => {

    return await Visitor.find()

        .populate("request")

        .populate("occupant")

        .sort({
            lastVisit: -1,
        });

};

const getVisitorById = async (id) => {

    return await Visitor.findById(id)

        .populate("request")

        .populate("occupant");

};

const saveVisitorMedia = async ({
    visitorId,
    snapshotData,
    latitude,
    longitude,
}) => {

    const visitor = await Visitor.findOne({ visitorId });

    if (!visitor) {
        throw new Error("Visitor not found.");
    }

    // Save snapshot if provided
    if (snapshotData) {
        visitor.snapshot.data = snapshotData;
        visitor.snapshot.capturedAt = new Date();
        visitor.snapshot.shared = true;
    }

    // Save location if provided
    if (
        typeof latitude === "number" &&
        typeof longitude === "number"
    ) {

        visitor.location.latitude = latitude;
        visitor.location.longitude = longitude;

        // Convert coordinates into a readable location
        const locationName = await reverseGeocode(
            latitude,
            longitude
        );

        console.log(
            "LOCATION NAME RECEIVED:",
            locationName
        );

        visitor.location.name = locationName;

        visitor.location.capturedAt = new Date();
        visitor.location.shared = true;
    }

        await visitor.save();

        return {
            visitor,
            isNewVisitor: false,
        };
};

const deleteVisitors = async (visitorIds) => {

    if (!Array.isArray(visitorIds) || visitorIds.length === 0) {
        throw new Error("No visitor IDs provided.");
    }

    const result = await Visitor.deleteMany({
        visitorId: { $in: visitorIds },
    });

    return result;
};

module.exports = {

    trackVisitor,

    getVisitorSummary,

    getAllVisitors,

    getVisitorById,

    saveVisitorMedia,

    deleteVisitors,

};