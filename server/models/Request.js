const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"],
    },

   status: {
    type: String,
    enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Expired",
    ],
    default: "Pending",
},

approvedAt: {
    type: Date,
    default: null,
},

accessExpiresAt: {
    type: Date,
    default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);