import express from "express";
import userAuth from "../middlewares/auth.middlerware.js";
import { ConnectionRequest } from "../models/connectionRequest.model.js";

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Request APIs - GET /user/requests/received - Get All the Pending Connection Requests.
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);

        res.status(200).json({
            message: "Request Fetched Successfully.",
            data: connectionRequest,
        });
    } catch (error) {
        res.status(400).json({ message: "Error: " + error.message });
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Find All the Requests which are accepted and having either fromUserId or toUserId == loggedInUserId._id
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ],
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        // Get data of other person.
        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id.equals(loggedInUser._id)) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.status(200).json({
            message: "Connections Fetched",
            data: data,
        });
    } catch (error) {
        res.status(400).json({ message: "Error" + error.message });
    }
});

export default userRouter;
