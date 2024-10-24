import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { validateLoginData, validateSignUpData } from "./utils/validation.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import userAuth from "./middlewares/auth.middlerware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to Parse JSON requests to JS Object
app.use(express.json());

// Middleware to Parse Cookies from the requests
app.use(cookieParser());

// Signup API - POST /signup - Register User to DB
app.post("/signup", async (req, res) => {
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
        await user.save();

        // Send Response back to client.
        res.status(200).send("User Added Successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err);
    }
});

// Login API - GET /login - Logged In User.
app.post("/login", async (req, res) => {
    try {
        // Validate of Data
        validateLoginData(req);

        // Find User
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials!");
        }

        // Hash and Compare Password
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            // Create a JWT Token
            const token = await user.getJWT();

            // Add the Token to Cookie
            res.cookie("token", token);

            // Send Response back to user
            res.status(200).send("User Logged In Successfully.");
        } else {
            res.status(400).send("Invalid Credentials!");
        }
    } catch (error) {
        res.status(400).send("Login Failed: " + error.message);
    }
});

// Profile API - GET /profile - Get User Profile and needs to verify JWT Token before passing to Request Handler.
app.get("/profile", userAuth, async (req, res) => {
    try {
        // Get user from Request as passed in auth middleware
        const { user } = req;
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

// Send Connection Request API - POST /sendConnectionRequest
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    // Sending a Connection Request
    console.log("Sending a Connection Request");

    res.status(200).send("Connection Request Send.");
});

connectDB()
    .then(() => {
        console.log("Connected to DB!");
        // Server Listening on Port
        app.listen(PORT || 8080, () => {
            console.log(`Listening on PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
