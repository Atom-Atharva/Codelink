import mongoose from "mongoose";

// Creating Schema for the User Model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    password: {
        type: String,
    },
});

// Creating Model from User Schema
export const User = mongoose.model("User", userSchema);
