import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to Parse JSON requests to JS Object
app.use(express.json());

// Signup API - POST /signup - Register User to DB
app.post("/signup", async (req, res) => {
    // Creating a new Instance of User Model
    const user = new User(req.body);

    try {
        // Save User Instance to Database
        await user.save();

        // Send Response back to client.
        res.status(200).send("User Added Successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err);
    }
});

// Find User API - GET /user - Finds user with email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        // Find User with given EmailID.
        const user = await User.find({ emailId: userEmail });
        if (user.length === 0) {
            res.status(404).send("User Not Found!");
        } else {
            res.status(200).send("User found:" + user);
        }
    } catch (error) {
        res.status(400).send("Something Went Wrong");
    }
});

// Feed API - GET /feed - Get All Users from the DB
app.get("/feed", async (req, res) => {
    try {
        // Find User with no filter, i.e. All Users.
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send("Something Went Wrong!");
    }
});

// Delete User - DELETE /user - Delete user from DB
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).send("User Deleted Successfully!");
    } catch (error) {
        res.status(400).send("Failed To Delete.");
    }
});

// Update User - PATCH /user - Update User Information in DB.
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        // API Level Validation : Data Sanitization
        const ALLOWED_UPDATES = [
            "photoUrl",
            "age",
            "skills",
            "gender",
            "about",
        ];

        // Check if Updates are allowed or not.
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if (!isUpdateAllowed) {
            throw new Error("Update Not Allowed!");
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10.");
        }

        // Any other data, which is not in Schema will get ignored. Ex: userId.
        await User.findByIdAndUpdate(userId, data, {
            // Explicitly Allow Validator to run on this request.
            runValidators: true,
        });
        res.status(200).send("User Updated Successfully!");
    } catch (error) {
        res.status(400).send("Update Failed: ", error);
    }
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
