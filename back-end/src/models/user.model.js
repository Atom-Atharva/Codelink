import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// Schema Methods
// Don't use Arrow Methods because "this" keyword works with normal functions and doesn't work with arrow functions.
userSchema.methods.getJWT = async function () {
    // Get Instance of Current User.
    const user = this;

    // Generate Token for the User.
    const token = await jwt.sign(
        { _id: user._id },
        process.env.SECRET_KEY_JWT,
        {
            expiresIn: "7d",
        }
    );

    // Return the Token
    return token;
};

// To verify the Password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const passwordHash = this.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    return isPasswordValid;
};

// Creating Model from User Schema
export const User = mongoose.model("User", userSchema);
