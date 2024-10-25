import validator from "validator";
import { User } from "../models/user.model.js";
import { ConnectionRequest } from "../models/connectionRequest.model.js";

export const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong!");
    }
};

export const validateLoginData = (req) => {
    const { emailId, password } = req.body;

    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Enter Valid Email");
    } else if (!password) {
        throw new Error("Enter Password");
    }
};

export const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "skills",
        "age",
        "about",
        "gender",
        "photoUrl",
    ];

    // For Every Key check if it exist in allowed Fields or not
    const isEditAllowed = Object.keys(req.body).every((field) => {
        return allowedEditFields.includes(field);
    });
    if (req.body?.skills?.length > 10) {
        throw new Error("Number of Skills should not more than 10.");
    }

    return isEditAllowed;
};

export const validatePasswordProfileData = (req) => {
    // Validate Password
    if (!req.body.password || !validator.isStrongPassword(req.body.password)) {
        throw new Error("Required Valid Password.");
    }
};

export const validateSendRequestData = async (req) => {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // Validate Status Code
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status Type: " + status);
    }

    // Validate To User Id
    const toUser = await User.findById(toUserId);
    if (!toUser) {
        throw new Error("Invalid Receiver.");
    }

    // If there is an existing ConnectionRequest
    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId },
        ],
    });
    if (existingConnectionRequest) {
        throw new Error("Request Already Exist.");
    }

    // Validation of fromUser equals toUser is written in pre middleware at Schema Level.
    // Schema Level Validator (Kind of Middleware)
    // connectionRequestSchema.pre("save", function (next) {
    //     const connectionRequest = this;

    //     // Check if from User ID equals to User ID
    //     if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    //         throw new Error("Cannot Send Connection Request to Yourself!");
    //     }

    //     next();
    // });
};
