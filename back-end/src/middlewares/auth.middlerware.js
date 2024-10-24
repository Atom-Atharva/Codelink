import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const userAuth = async (req, res, next) => {
    try {
        // Read the Token from Cookies
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Invalid Token");
        }

        // Validate the Token
        const decodedObj = await jwt.verify(token, process.env.SECRET_KEY_JWT);

        // Find the user
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found!");
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
};

export default userAuth;
