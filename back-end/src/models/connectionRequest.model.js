import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            required: true,
            // Enum for fixed values to be chosen.
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type.`,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Compound Index
// 1 : Ascending
// -1 : Descending
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// Schema Level Validator (Kind of Middleware)
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    // Check if from User ID equals to User ID
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot Send Connection Request to Yourself!");
    }

    next();
});

export const ConnectionRequest = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);
