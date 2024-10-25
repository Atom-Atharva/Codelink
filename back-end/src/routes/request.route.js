import express from "express";
import userAuth from "../middlewares/auth.middlerware.js";
import { ConnectionRequest } from "../models/connectionRequest.model.js";
import { validateSendRequestData } from "../utils/validation.js";

const requestRouter = express.Router();

// Send Connection Request API - POST /request/send/:status/:toUserId
requestRouter.post(
    "/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
        try {
            // Validate Request
            await validateSendRequestData(req);

            // Create Instance of the Request
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;
            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });

            // Save Request inside DB.
            const data = await connectionRequest.save();

            res.status(200).json({ message: "Connection Request Send.", data });
        } catch (error) {
            res.status(400).send("Error: " + error.message);
        }
    }
);

export default requestRouter;
