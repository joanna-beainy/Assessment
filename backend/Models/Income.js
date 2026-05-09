import mongoose from "mongoose";

const incomeSchema =  new mongoose.Schema(
    {
        source: {
            type: String,
            required: true
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

export default mongoose.model("Income", incomeSchema);