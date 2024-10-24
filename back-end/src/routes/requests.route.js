import express from "express";
import userAuth from "../middlewares/auth.middlerware.js";

const requestRouter = express.Router();

// Send Connection Request API - POST /sendConnectionRequest
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    // Sending a Connection Request
    console.log("Sending a Connection Request");

    res.status(200).send("Connection Request Send.");
});

export default requestRouter;
