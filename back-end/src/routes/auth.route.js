import express from "express";
import { validateLoginData, validateSignUpData } from "../utils/validation.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const authRouter = express.Router();
// Cookies Options
export const options = {
    httpOnly: true,
    // FOR DEV ENVIRONMENT
    // secure: true,
    // sameSite: "None",
    // partitioned: true,
    expires: new Date(Date.now() + 8 * 3600000),
};

// Signup API - POST /signup - Register User to DB
authRouter.post("/signup", async (req, res) => {
    try {
        // Validation of Data
        validateSignUpData(req);

        // Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new Instance of User Model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        // Save User Instance to Database
        const savedUser = await user.save();

        // return JWT Token with Cookie
        const token = await user.getJWT();

        // Add the Token to Cookie
        res.cookie("token", token, options);

        // Send Response back to client.
        res.status(200).json({
            message: "User Registered Successfully.",
            data: savedUser,
        });
    } catch (err) {
        res.status(400).send("Error saving the user:" + err);
    }
});

// Login API - POST /login - Logged In User.
authRouter.post("/login", async (req, res) => {
    try {
        // Validate of Data
        validateLoginData(req);

        // Find User
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId }).select();
        if (!user) {
            throw new Error("Invalid Credentials!");
        }

        // Hash and Compare Password
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            // Create a JWT Token
            const token = await user.getJWT();

            // Add the Token to Cookie
            res.cookie("token", token, options);

            // Send Response back to user
            res.status(200).json({
                message: "User Logged In Successfully.",
                data: user,
            });
        } else {
            res.status(400).send("Invalid Credentials!");
        }
    } catch (error) {
        res.status(400).send("Login Failed: " + error.message);
    }
});

// Logout API - POST /logout
authRouter.post("/logout", async (req, res) => {
    // Create a expired cookie with value null.
    // res.cookie("token", null, {
    //     expires: new Date(Date.now()),
    // }).send("Successfully Logged Out");

    // Clean up if necessary
    // Remove Cookies from the user's system.
    res.clearCookie("token").send("Logged Out.");
});

export default authRouter;
