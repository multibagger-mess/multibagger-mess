const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
        },

        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const visitorSchema = new mongoose.Schema(
    {
        visitorId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        ipAddress: {
            type: String,
            default: "",
        },

        browser: {
            type: String,
            default: "",
        },

        operatingSystem: {
            type: String,
            default: "",
        },

        deviceType: {
            type: String,
            enum: ["Desktop", "Mobile", "Tablet", "Unknown"],
            default: "Unknown",
        },

        firstVisit: {
            type: Date,
            default: Date.now,
        },

        lastVisit: {
            type: Date,
            default: Date.now,
        },

        visitCount: {
            type: Number,
            default: 1,
        },

        pagesVisited: {
            type: [String],
            default: [],
        },

        visits: {
            type: [visitSchema],
            default: [],
        },

        request: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request",
            default: null,
        },

        occupant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Occupant",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Visitor", visitorSchema);