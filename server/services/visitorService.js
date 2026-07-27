const Visitor = require("../models/Visitor");

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

        return visitor;
    }

    // Returning Visitor

    visitor.ipAddress = ipAddress;
    visitor.browser = browser;
    visitor.operatingSystem = operatingSystem;
    visitor.deviceType = deviceType;

    const now = new Date();

    const lastVisit = visitor.visits[visitor.visits.length - 1];

    const isSamePage =
        lastVisit && lastVisit.page === page;

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

module.exports = {

    trackVisitor,

    getVisitorSummary,

    getAllVisitors,

    getVisitorById,

};