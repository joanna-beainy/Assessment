import mongoose from "mongoose";

const goalSchema =  new mongoose.Schema(
    {
        name: {
            type: String,
            requuired: true
        },
        amount: {
            type: Number,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }, {timestamps: true}
);

export default mongoose.model("Goal", goalSchema);