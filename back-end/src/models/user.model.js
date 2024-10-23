import mongoose from "mongoose";
import validator from "validator";

// Creating Schema for the User Model
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 20,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            // Custom Validator
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email Address: ", value);
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            lowercase: true,
            trim: true,
            // Validate Function for Custom Check (By default on new entries only)
            // To work on other requests, allow explicitly.
            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("Gender data is not valid");
                }
            },
        },
        photoUrl: {
            type: String,
            default:
                "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png",
            // Custom Validator
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Invalid Photo URL: " + value);
                }
            },
        },
        about: {
            type: String,
            default: "This is the default about of the user!",
            trim: true,
        },
        skills: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

// Creating Model from User Schema
export const User = mongoose.model("User", userSchema);
