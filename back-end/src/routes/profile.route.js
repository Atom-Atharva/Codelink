import express from "express";
import userAuth from "../middlewares/auth.middlerware.js";
import {
    validateEditProfileData,
    validatePasswordProfileData,
} from "../utils/validation.js";
import bcrypt from "bcrypt";

const profileRouter = express.Router();

// View API - GET /profile/view - Get User Profile and needs to verify JWT Token before passing to Request Handler.
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        // Get user from Request as passed in auth middleware
        const { user } = req;
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

// Edit API - PATCH /profile/edit - Update User Profile.
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        // Validate Request Data.
        const isValidToEdit = validateEditProfileData(req);
        if (!isValidToEdit) {
            throw new Error("Invalid Request.");
        }

        const loggedInUser = req.user;

        // Change Data for Logged In User
        Object.keys(req.body).forEach(
            (key) => (loggedInUser[key] = req.body[key])
        );

        // Save Data in DB, user.save() will also initiates validate functions
        await loggedInUser.save();

        // Send Data in form of JSON.
        res.status(200).json({
            message: `${loggedInUser.firstName}, Your Data Updated Successfully.`,
            data: loggedInUser,
        });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

// Password API - PATCH /profile/password - Forgot Password and Change Password.
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        // Validate Password
        validatePasswordProfileData(req);

        // Hash new Password
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        // Save User in DB.
        const loggedInUser = req.user;
        loggedInUser.password = passwordHash;
        await loggedInUser.save();

        res.status(200).json({ message: "Password Changed Successfully." });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

export default profileRouter;
