import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        description: {
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

export default mongoose.model("Expense", expenseSchema)
