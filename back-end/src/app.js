import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routers
import requestRouter from "./routes/request.route.js";
import authRouter from "./routes/auth.route.js";
import profileRouter from "./routes/profile.route.js";

// Initializing dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to Parse JSON requests to JS Object
app.use(express.json());

// Middleware to Parse Cookies from the requests
app.use(cookieParser());

// Middlewares for Route Handlers, check line by line for correct request handler.
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
