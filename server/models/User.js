import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    occupant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Occupant",
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    mustChangePassword: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true,
}
);

export default mongoose.model("User", userSchema);