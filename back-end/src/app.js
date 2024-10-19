import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.post("/signup", async (req, res) => {
    const obj = {
        firstName: "Atharva",
        lastName: "Sugandhi",
        emailId: "admin@email.com",
        password: "Atom118",
    };

    // Creating a new Instance of User Model
    const user = new User(obj);

    try {
        // Save User Instance to Database
        await user.save();

        // Send Response back to client.
        res.status(200).send("User Added Successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err);
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
