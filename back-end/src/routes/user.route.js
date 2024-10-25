import express from "express";
import userAuth from "../middlewares/auth.middlerware.js";
import { ConnectionRequest } from "../models/connectionRequest.model.js";
import { User } from "../models/user.model.js";

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Request API - GET /user/requests/received - Get All the Pending Connection Requests.
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

// Connection API - GET /user/connections - Get All the Connections of the User.
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

// Feed API - GET /user/feed - Get profiles of other users on the platform
userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        // User should see all cards except:
        // - His own Card
        // - His Connections
        // - Ignored People
        // - Already Send Connection Request

        const loggedInUser = req.user;

        // Get Params from URL
        const page = parseInt(req.query.page) || 1; // Convert to INT

        // Validate Limit (Upper Bound)
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit;

        // Get user's connection requests (send + received)
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ],
        }).select("fromUserId toUserId");

        // Use Set Data Structure for unique values.
        const hideUsersFromFeed = new Set();
        // Hide User IDs which are not required
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        // Get All users not in hideUserFromFeed List
        const users = await User.find({
            // Convert Set To Array
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } }, // Not in Array
                { _id: { $ne: loggedInUser._id } }, // Not Equal
            ],
        })
            .select(USER_SAFE_DATA)
            // Pagination Applied
            .skip(skip)
            .limit(limit);

        res.status(200).json({ message: "Feed Fetched!", data: users });
    } catch (error) {
        res.status(400).json({ message: "Error: " + error.message });
    }
});

export default userRouter;
